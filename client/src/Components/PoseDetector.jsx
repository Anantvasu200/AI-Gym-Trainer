import React, { useRef, useEffect, useState } from "react";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import io from "socket.io-client";
import {
  Activity,
  Zap,
  WifiOff,
  Wifi,
  Dumbbell,
  Volume2,
  VolumeX,
  ChevronDown,
  User,
  MessageSquare,
} from "lucide-react";

// ========== ENHANCED TTS HANDLER ==========
class VoiceFeedbackHandler {
  constructor() {
    this.synth = window.speechSynthesis;
    this.currentUtterance = null;
    this.voices = [];
    this.selectedVoice = null;
    this.isEnabled = true;
    this.loadVoices();
    
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }
  
  loadVoices() {
    this.voices = this.synth.getVoices();
    this.selectedVoice = this.voices.find(voice => 
      voice.lang.startsWith('en') && !voice.name.includes('Female')
    ) || this.voices[0];
  }
  
  speak(text) {
    if (!this.isEnabled || !text) return;
    this.stop();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.selectedVoice;
    utterance.rate = 1.15;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';
    
    this.currentUtterance = utterance;
    setTimeout(() => this.synth.speak(utterance), 50);
  }
  
  stop() {
    if (this.synth.speaking) this.synth.cancel();
  }
  
  toggle() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) this.stop();
    return this.isEnabled;
  }
}

const PoseDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const voiceHandlerRef = useRef(null);
  
  const [fps, setFps] = useState(0);
  const [isHumanDetected, setIsHumanDetected] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState("None");
  const [llmFeedback, setLlmFeedback] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stats, setStats] = useState({ reps: 0, goodReps: 0, accuracy: 0 });
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const exercises = [
    "None",
    "Squats",
    "Push-ups",
    "Lunges",
    "Plank",
    "Jumping Jacks",
    "Burpees",
    "Mountain Climbers",
    "High Knees",
    "Sit-ups",
  ];

  // Initialize TTS
  useEffect(() => {
    voiceHandlerRef.current = new VoiceFeedbackHandler();
    return () => voiceHandlerRef.current?.stop();
  }, []);

  // Socket connection
  useEffect(() => {
    socketRef.current = io("http://localhost:3001", { 
      transports: ["websocket"],
      reconnection: true,
    });

    socketRef.current.on("connect", () => {
      console.log("✓ Connected");
      setSocketConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      console.log("✗ Disconnected");
      setSocketConnected(false);
    });

    socketRef.current.on("llm_feedback", (data) => {
      const { feedback, stats: newStats } = data;
      console.log("📥", feedback);
      
      setLlmFeedback(feedback);
      if (newStats) setStats(newStats);
      
      if (voiceHandlerRef.current) {
        voiceHandlerRef.current.speak(feedback);
      }
    });

    return () => socketRef.current?.disconnect();
  }, []);

  // MediaPipe Pose - OPTIMIZED FOR 60FPS
  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,           // Reduced from 2 to 1 for speed
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,  // Slightly lower for speed
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      if (!canvasRef.current) return;
      
      const canvasCtx = canvasRef.current.getContext("2d");
      
      // OPTIMIZED RESOLUTION: 1280x720 (HD) instead of 1920x1080
      if (canvasRef.current.width !== 1280) {
        canvasRef.current.width = 1280;
        canvasRef.current.height = 720;
      }
      
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, 1280, 720);
      
      // Draw video
      canvasCtx.drawImage(results.image, 0, 0, 1280, 720);

      if (results.poseLandmarks) {
        setIsHumanDetected(true);
        
        // Thinner lines for better performance
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 3,  // Reduced from 5
        });
        drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "#FF0000",
          lineWidth: 1,  // Reduced from 2
          radius: 4,     // Reduced from 7
        });

        // Send to backend (throttled by server)
        if (socketRef.current && socketConnected && selectedExercise !== "None") {
          socketRef.current.emit("pose_data", {
            exercise: selectedExercise,
            landmarks: results.poseLandmarks,
          });
        }
      } else {
        setIsHumanDetected(false);
      }

      canvasCtx.restore();
    });

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          const start = performance.now();
          await pose.send({ image: videoRef.current });
          const end = performance.now();
          setFps(Math.round(1000 / (end - start)));
        },
        width: 1280,   // Reduced from 1920
        height: 720,   // Reduced from 1080
        facingMode: "user"
      });
      camera.start();
    }
  }, [socketConnected, selectedExercise]);

  const toggleVoice = () => {
    if (voiceHandlerRef.current) {
      const enabled = voiceHandlerRef.current.toggle();
      setVoiceEnabled(enabled);
    }
  };

  const speakFeedback = () => {
    if (llmFeedback && voiceHandlerRef.current) {
      voiceHandlerRef.current.speak(llmFeedback);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gray-900 overflow-hidden">
      {/* HEADER */}
      <header className="absolute top-0 left-0 right-0 h-16 bg-black/60 backdrop-blur-md border-b border-gray-700 z-40">
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg lg:text-xl font-bold text-white">
              AI Gym Trainer ⚡
            </h1>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/60 rounded-full">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs lg:text-sm text-white font-semibold">{fps} fps</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/60 rounded-full">
              {socketConnected ? (
                <Wifi className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-red-400" />
              )}
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/60 rounded-full">
              <User className={`w-3.5 h-3.5 ${isHumanDetected ? 'text-green-400' : 'text-gray-500'}`} />
            </div>
            
            <button
              onClick={toggleVoice}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
                voiceEnabled ? 'bg-green-600/80 hover:bg-green-600' : 'bg-gray-700/80 hover:bg-gray-700'
              }`}
            >
              {voiceEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-white" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="absolute inset-0 top-16 flex">
        {/* VIDEO */}
        <div className="flex-1 relative bg-black">
          <video ref={videoRef} className="hidden" autoPlay playsInline muted />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* EXERCISE SELECTOR */}
          <div className="absolute top-4 right-4 z-30">
            <div className="dropdown-container relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-52 bg-black/70 backdrop-blur-md text-white px-4 py-2.5 rounded-lg flex items-center justify-between hover:bg-black/80 transition-all border border-gray-600"
              >
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-pink-400" />
                  <span className="text-sm font-medium truncate">{selectedExercise}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-52 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl max-h-72 overflow-y-auto z-50">
                  {exercises.map((exercise) => (
                    <button
                      key={exercise}
                      onClick={() => {
                        setSelectedExercise(exercise);
                        setIsDropdownOpen(false);
                        setLlmFeedback("");
                        setStats({ reps: 0, goodReps: 0, accuracy: 0 });
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm ${
                        selectedExercise === exercise
                          ? "bg-pink-600/20 text-pink-400 border-l-2 border-pink-400"
                          : "text-gray-300"
                      }`}
                    >
                      <Dumbbell className="w-3 h-3" />
                      <span className="truncate">{exercise}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* INSTANT MODE BADGE */}
          <div className="absolute top-4 left-4 bg-green-600/80 backdrop-blur-md rounded-lg px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs text-white font-medium">⚡ Instant Mode</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 max-w-md mx-auto bg-black/60 backdrop-blur-md rounded-lg p-2.5 border border-gray-700">
            <p className="text-xs text-gray-300 text-center">
              💡 Stand 2-3 meters away • Instant smart feedback!
            </p>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-80 lg:w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-white">AI Coach</h2>
              </div>
            </div>

            <div className="flex-1 bg-gray-900/50 rounded-lg p-4 border border-gray-700 flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {llmFeedback || (
                    <span className="text-gray-500 italic">
                      {selectedExercise === "None" 
                        ? "Select an exercise to begin..." 
                        : "Start moving to get feedback..."}
                    </span>
                  )}
                </p>
              </div>

              {llmFeedback && (
                <button
                  onClick={speakFeedback}
                  disabled={!voiceEnabled}
                  className={`mt-3 w-full px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium ${
                    voiceEnabled
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  {voiceEnabled ? 'Repeat Feedback' : 'Voice Disabled'}
                </button>
              )}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400">Reps</p>
                <p className="text-2xl font-bold text-white">{stats.reps}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400">Good</p>
                <p className="text-2xl font-bold text-green-400">{stats.goodReps}</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400">Form</p>
                <p className="text-2xl font-bold text-cyan-400">{stats.accuracy}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoseDetector;