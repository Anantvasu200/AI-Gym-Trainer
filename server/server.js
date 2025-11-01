import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import ollama from "ollama";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL || "http://localhost:5173", methods: ["GET", "POST"] },
});

// ========== INSTANT FEEDBACK SYSTEM ==========

const userSessions = new Map();
const INSTANT_FEEDBACK_RATE = 3000; // 3s between instant feedback

// Pre-defined smart feedback based on angle analysis
const FEEDBACK_LIBRARY = {
    squat: {
        good: [
            "Perfect depth! Keep it up!",
            "Great form! Crushing it!",
            "Solid squat! Nice work!",
            "Excellent depth! Beast mode!",
            "Perfect! That's the way!"
        ],
        kneesBad: [
            "Knees caving in! Push them out!",
            "Knees too far forward! Back more!",
            "Watch those knees! Stay aligned!"
        ],
        depthBad: [
            "Go deeper! Below parallel!",
            "Not deep enough! Lower down!",
            "Quarter squat! Go full depth!"
        ],
        backBad: [
            "Back rounding! Chest up!",
            "Keep that back straight! Core tight!",
            "Chest up! Don't lean forward!"
        ]
    },
    pushup: {
        good: [
            "Perfect pushup! Strong!",
            "Full range! Awesome!",
            "Great form! Keep going!",
            "Solid! That's the way!"
        ],
        elbowsBad: [
            "Elbows flaring! Tuck them in!",
            "Elbows too wide! Closer to body!",
            "Tuck those elbows! 45 degrees!"
        ],
        depthBad: [
            "Go lower! Chest to ground!",
            "Half rep! Go all the way down!",
            "Full range! Touch the floor!"
        ],
        hipsBad: [
            "Hips sagging! Plank position!",
            "Core tight! Straight line!",
            "Don't let hips drop! Engage core!"
        ]
    },
    plank: {
        good: [
            "Perfect plank! Hold it!",
            "Straight as an arrow! Great!",
            "Solid form! Keep holding!",
            "Rock solid! Amazing!"
        ],
        hipsBad: [
            "Hips too high! Lower them!",
            "Hips sagging! Lift them up!",
            "Straight line! Adjust hips!"
        ]
    },
    lunge: {
        good: [
            "Perfect lunge! Balanced!",
            "Great depth! Strong!",
            "Solid form! Keep it up!",
            "Excellent! That's it!"
        ],
        kneeBad: [
            "Front knee over toes! Back more!",
            "Back knee higher! 90 degrees!",
            "Watch that front knee position!"
        ]
    },
    default: {
        good: [
            "Good form! Keep going!",
            "Looking strong! Nice!",
            "Great work! Keep pushing!",
            "Solid! Keep it up!"
        ],
        bad: [
            "Adjust your form!",
            "Watch your posture!",
            "Focus on form!",
            "Slow down, check form!"
        ]
    }
};

// ========== ANGLE CALCULATION ==========

function calculateAngle(a, b, c) {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
}

function analyzePoseAndGiveFeedback(landmarks, exercise) {
    if (!Array.isArray(landmarks) || landmarks.length < 33) {
        return { feedback: "Step into frame!", isGood: false };
    }

    const parts = {
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

    const angles = {
        leftElbow: calculateAngle(parts.leftShoulder, parts.leftElbow, parts.leftWrist),
        rightElbow: calculateAngle(parts.rightShoulder, parts.rightElbow, parts.rightWrist),
        leftKnee: calculateAngle(parts.leftHip, parts.leftKnee, parts.leftAnkle),
        rightKnee: calculateAngle(parts.rightHip, parts.rightKnee, parts.rightAnkle),
        leftHip: calculateAngle(parts.leftShoulder, parts.leftHip, parts.leftKnee),
        rightHip: calculateAngle(parts.rightShoulder, parts.rightHip, parts.rightKnee),
    };

    const backAlignment = Math.abs(
        (parts.leftShoulder.y + parts.rightShoulder.y) / 2 - (parts.leftHip.y + parts.rightHip.y) / 2
    );
    const hipLevel = Math.abs(parts.leftHip.y - parts.rightHip.y);

    const exerciseLower = exercise.toLowerCase();
    let feedback = "";
    let isGood = true;

    // SQUAT ANALYSIS
    if (exerciseLower.includes('squat')) {
        const kneeAngle = Math.min(angles.leftKnee, angles.rightKnee);
        const hipAngle = Math.min(angles.leftHip, angles.rightHip);
        
        if (kneeAngle < 70 || kneeAngle > 120) {
            feedback = randomFrom(FEEDBACK_LIBRARY.squat.kneesBad);
            isGood = false;
        } else if (kneeAngle > 110) {
            feedback = randomFrom(FEEDBACK_LIBRARY.squat.depthBad);
            isGood = false;
        } else if (backAlignment > 0.5) {
            feedback = randomFrom(FEEDBACK_LIBRARY.squat.backBad);
            isGood = false;
        } else {
            feedback = randomFrom(FEEDBACK_LIBRARY.squat.good);
            isGood = true;
        }
    }
    // PUSHUP ANALYSIS
    else if (exerciseLower.includes('push')) {
        const elbowAngle = Math.min(angles.leftElbow, angles.rightElbow);
        
        if (elbowAngle > 160) {
            feedback = "Start position! Go down!";
            isGood = false;
        } else if (elbowAngle < 70 || elbowAngle > 110) {
            feedback = randomFrom(FEEDBACK_LIBRARY.pushup.depthBad);
            isGood = false;
        } else if (backAlignment > 0.5) {
            feedback = randomFrom(FEEDBACK_LIBRARY.pushup.hipsBad);
            isGood = false;
        } else {
            feedback = randomFrom(FEEDBACK_LIBRARY.pushup.good);
            isGood = true;
        }
    }
    // PLANK ANALYSIS
    else if (exerciseLower.includes('plank')) {
        const hipAngle = Math.min(angles.leftHip, angles.rightHip);
        
        if (hipAngle < 160) {
            feedback = randomFrom(FEEDBACK_LIBRARY.plank.hipsBad);
            isGood = false;
        } else if (backAlignment > 0.5) {
            feedback = "Hips too high! Lower down!";
            isGood = false;
        } else {
            feedback = randomFrom(FEEDBACK_LIBRARY.plank.good);
            isGood = true;
        }
    }
    // LUNGE ANALYSIS
    else if (exerciseLower.includes('lunge')) {
        const frontKnee = Math.min(angles.leftKnee, angles.rightKnee);
        
        if (frontKnee < 70 || frontKnee > 110) {
            feedback = randomFrom(FEEDBACK_LIBRARY.lunge.kneeBad);
            isGood = false;
        } else {
            feedback = randomFrom(FEEDBACK_LIBRARY.lunge.good);
            isGood = true;
        }
    }
    // DEFAULT
    else {
        feedback = randomFrom(FEEDBACK_LIBRARY.default.good);
        isGood = true;
    }

    return { feedback, isGood, angles };
}

function randomFrom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// ========== SOCKET HANDLERS ==========

io.on("connection", (socket) => {
    console.log("✓ Client connected:", socket.id);
    
    userSessions.set(socket.id, {
        repCount: 0,
        goodReps: 0,
        startTime: Date.now(),
        lastFeedbackTime: 0,
        exercise: null,
    });

    socket.on("pose_data", async (data) => {
        try {
            const { exercise, landmarks } = data;
            const session = userSessions.get(socket.id);
            
            if (!session.exercise) session.exercise = exercise;

            // Rate limiting for instant feedback
            const now = Date.now();
            if (now - session.lastFeedbackTime < INSTANT_FEEDBACK_RATE) {
                return;
            }
            session.lastFeedbackTime = now;

            // INSTANT ANALYSIS
            const result = analyzePoseAndGiveFeedback(landmarks, exercise);
            
            // Update stats
            session.repCount++;
            if (result.isGood) {
                session.goodReps++;
            }

            console.log(`✅ [${session.repCount}] INSTANT: ${result.feedback}`);

            socket.emit("llm_feedback", { 
                feedback: result.feedback,
                useBrowserTTS: true,
                stats: {
                    reps: session.repCount,
                    goodReps: session.goodReps,
                    accuracy: ((session.goodReps / session.repCount) * 100).toFixed(0),
                }
            });

        } catch (err) {
            console.error("❌ Error:", err.message);
            socket.emit("llm_feedback", { 
                feedback: "Keep going!",
                useBrowserTTS: true
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
        console.log("✗ Client disconnected:", socket.id);
        userSessions.delete(socket.id);
    });
});

// ========== API ENDPOINTS ==========

app.get("/health", (req, res) => {
    res.json({ 
        status: "ok", 
        timestamp: new Date().toISOString(),
        activeSessions: userSessions.size,
        mode: "instant-feedback",
        feedbackRate: `${INSTANT_FEEDBACK_RATE}ms`,
    });
});

// START SERVER
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`\n⚡ AI Gym Trainer Server (INSTANT MODE)`);
    console.log(`📡 Port: ${PORT}`);
    console.log(`⏱️  Feedback every: ${INSTANT_FEEDBACK_RATE}ms`);
    console.log(`🧠 Mode: Rule-based instant feedback`);
    console.log(`🔊 Voice: Browser TTS\n`);
    console.log(`Health: http://localhost:${PORT}/health\n`);
    console.log(`💡 No LLM delays - instant smart feedback!\n`);
});