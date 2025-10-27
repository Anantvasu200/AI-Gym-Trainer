import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import ollama from "ollama";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL || "http://localhost:5173", methods: ["GET", "POST"] },
});

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "pNInz6obpgDQGcFmaJgB";

// ========== PERFORMANCE OPTIMIZATION ==========

// Cache for recent feedback to avoid redundant processing
const feedbackCache = new Map();
const CACHE_DURATION = 3000; // 3 seconds

// Session tracking for personalized feedback
const userSessions = new Map();

// Rate limiting to prevent API spam
const rateLimiter = new Map();
const RATE_LIMIT_MS = 2000; // Min 2 seconds between requests

// ========== ENHANCED POSE ANALYSIS ==========

function calculateAngle(a, b, c) {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
}

function analyzePoseDetails(landmarks, exercise) {
    if (!Array.isArray(landmarks) || landmarks.length < 33) {
        return { valid: false, message: "No valid pose detected." };
    }

    const parts = {
        nose: landmarks[0],
        leftShoulder: landmarks[11],
        rightShoulder: landmarks[12],
        leftElbow: landmarks[13],
        rightElbow: landmarks[14],
        leftWrist: landmarks[15],
        rightWrist: landmarks[16],
        leftHip: landmarks[23],
        rightHip: landmarks[24],
        leftKnee: landmarks[25],
        rightKnee: landmarks[26],
        leftAnkle: landmarks[27],
        rightAnkle: landmarks[28],
    };

    // Calculate key metrics
    const leftElbowAngle = calculateAngle(parts.leftShoulder, parts.leftElbow, parts.leftWrist);
    const rightElbowAngle = calculateAngle(parts.rightShoulder, parts.rightElbow, parts.rightWrist);
    const leftKneeAngle = calculateAngle(parts.leftHip, parts.leftKnee, parts.leftAnkle);
    const rightKneeAngle = calculateAngle(parts.rightHip, parts.rightKnee, parts.rightAnkle);
    const leftHipAngle = calculateAngle(parts.leftShoulder, parts.leftHip, parts.leftKnee);
    const rightHipAngle = calculateAngle(parts.rightShoulder, parts.rightHip, parts.rightKnee);

    // Back alignment (vertical distance between shoulders and hips)
    const backAlignment = Math.abs(
        (parts.leftShoulder.y + parts.rightShoulder.y) / 2 - (parts.leftHip.y + parts.rightHip.y) / 2
    );

    // Shoulder level (should be equal)
    const shoulderLevel = Math.abs(parts.leftShoulder.y - parts.rightShoulder.y);

    // Hip level
    const hipLevel = Math.abs(parts.leftHip.y - parts.rightHip.y);

    return {
        valid: true,
        angles: {
            leftElbow: leftElbowAngle.toFixed(0),
            rightElbow: rightElbowAngle.toFixed(0),
            leftKnee: leftKneeAngle.toFixed(0),
            rightKnee: rightKneeAngle.toFixed(0),
            leftHip: leftHipAngle.toFixed(0),
            rightHip: rightHipAngle.toFixed(0),
        },
        alignment: {
            back: backAlignment.toFixed(2),
            shoulders: shoulderLevel.toFixed(2),
            hips: hipLevel.toFixed(2),
        },
        positions: parts,
    };
}

function generateExercisePrompt(exercise, analysis) {
    const { angles, alignment } = analysis;

    const exerciseContext = {
        squat: `SQUAT CHECK:
- Knee angle: ${angles.leftKnee}° (ideal: 90-110°)
- Hip angle: ${angles.leftHip}° (should be similar to knee)
- Back alignment: ${alignment.back} (lower is straighter)
- Hip level: ${alignment.hips} (should be <0.05)`,
        
        pushup: `PUSH-UP CHECK:
- Elbow angle: ${angles.leftElbow}° (full rep: 90° down, 170° up)
- Back alignment: ${alignment.back} (should stay flat ~0.3-0.4)
- Shoulder level: ${alignment.shoulders} (should be <0.03)
- Hip position: Should align with shoulders`,
        
        plank: `PLANK CHECK:
- Back alignment: ${alignment.back} (should be flat ~0.3-0.4)
- Hip angle: ${angles.leftHip}° (ideal: 170-180°, no sagging)
- Shoulder position: Should be directly over elbows/wrists
- Body should form straight line`,
        
        lunge: `LUNGE CHECK:
- Front knee angle: ${angles.leftKnee}° (ideal: 90°)
- Back knee angle: ${angles.rightKnee}° (should be ~90° when lowered)
- Hip level: ${alignment.hips} (should be even)
- Front knee should not pass toes`,
    };

    const context = exerciseContext[exercise.toLowerCase()] || `
Exercise: ${exercise}
Key angles: Elbow ${angles.leftElbow}°, Knee ${angles.leftKnee}°, Hip ${angles.leftHip}°
Alignment: Back ${alignment.back}, Shoulders ${alignment.shoulders}`;

    return `You're a gym trainer watching ${exercise}. Be direct and energetic.

${context}

Give ONE of these:
1. If form is WRONG: Point out the WORST issue + quick fix (10-15 words max)
2. If form is GOOD: Short encouragement (5-8 words)

Examples:
- "Knees caving in! Push them outward!"
- "Back's rounding! Chest up, core tight!"
- "Perfect depth! That's the way!"
- "Elbows flaring! Tuck them in closer!"

Your call:`;
}

// ========== VOICE GENERATION WITH CACHING ==========

async function generateVoiceFeedback(text, filename = "feedback.mp3") {
    const outputPath = path.join(publicDir, filename);
    
    // Check cache first
    const cached = feedbackCache.get(text);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log("Using cached audio");
        return cached.url;
    }

    try {
        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
            {
                method: "POST",
                headers: {
                    "xi-api-key": ELEVENLABS_API_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text,
                    model_id: "eleven_turbo_v2_5",
                    voice_settings: {
                        stability: 0.4,
                        similarity_boost: 0.8,
                        style: 0.5,
                        use_speaker_boost: true,
                    },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`ElevenLabs error: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        fs.writeFileSync(outputPath, Buffer.from(buffer));
        
        const audioUrl = `/audio/${filename}`;
        feedbackCache.set(text, { url: audioUrl, timestamp: Date.now() });
        
        return audioUrl;
    } catch (err) {
        console.error("Voice generation error:", err.message);
        return null;
    }
}

app.use("/audio", express.static(publicDir));

// ========== SOCKET HANDLERS ==========

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    
    // Initialize user session
    userSessions.set(socket.id, {
        repCount: 0,
        goodReps: 0,
        startTime: Date.now(),
        lastFeedback: null,
        exercise: null,
    });

    socket.on("pose_data", async (data) => {
        try {
            // Rate limiting
            const lastRequest = rateLimiter.get(socket.id);
            if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_MS) {
                return; // Skip this frame
            }
            rateLimiter.set(socket.id, Date.now());

            const { exercise, landmarks } = data;
            const session = userSessions.get(socket.id);
            
            if (!session.exercise) session.exercise = exercise;

            const analysis = analyzePoseDetails(landmarks, exercise);
            
            if (!analysis.valid) {
                socket.emit("llm_feedback", { 
                    feedback: "Can't see you clearly. Step back a bit!", 
                    audioUrl: null 
                });
                return;
            }

            const prompt = generateExercisePrompt(exercise, analysis);

            const response = await ollama.chat({
                model: "llama3.2:3b",
                messages: [{ role: "user", content: prompt }],
                options: {
                    temperature: 0.7,
                    top_p: 0.9,
                    num_predict: 50, // Limit response length
                },
            });

            let feedback = response.message?.content?.trim() || "Keep pushing!";
            
            // Track stats
            session.repCount++;
            if (feedback.toLowerCase().includes("good") || 
                feedback.toLowerCase().includes("nice") ||
                feedback.toLowerCase().includes("perfect")) {
                session.goodReps++;
            }

            console.log(`Feedback [${session.repCount}]: ${feedback}`);

            const audioUrl = await generateVoiceFeedback(
                feedback, 
                `feedback-${socket.id}-${Date.now()}.mp3`
            );

            socket.emit("llm_feedback", { 
                feedback, 
                audioUrl,
                stats: {
                    reps: session.repCount,
                    goodReps: session.goodReps,
                    accuracy: ((session.goodReps / session.repCount) * 100).toFixed(0),
                }
            });

        } catch (err) {
            console.error("Error:", err.message);
            socket.emit("llm_feedback", { 
                feedback: "Technical issue. Keep going!", 
                audioUrl: null 
            });
        }
    });

    socket.on("request_summary", () => {
        const session = userSessions.get(socket.id);
        if (session && session.repCount > 0) {
            const duration = Math.floor((Date.now() - session.startTime) / 1000);
            socket.emit("workout_summary", {
                exercise: session.exercise,
                totalReps: session.repCount,
                goodReps: session.goodReps,
                accuracy: ((session.goodReps / session.repCount) * 100).toFixed(1),
                duration: `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`,
            });
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        userSessions.delete(socket.id);
        rateLimiter.delete(socket.id);
    });
});

// ========== API ENDPOINTS ==========

app.get("/health", (req, res) => {
    res.json({ 
        status: "ok", 
        timestamp: new Date().toISOString(),
        activeSessions: userSessions.size,
    });
});

app.get("/voices", async (req, res) => {
    try {
        const response = await fetch("https://api.elevenlabs.io/v1/voices", {
            headers: { "xi-api-key": ELEVENLABS_API_KEY },
        });
        const data = await response.json();
        res.json(data.voices.map(v => ({
            name: v.name,
            voice_id: v.voice_id,
            category: v.category,
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ========== START SERVER ==========

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`AI Gym Trainer Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});