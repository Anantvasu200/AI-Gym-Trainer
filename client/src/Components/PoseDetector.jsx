import React, { useRef, useEffect, useState } from "react";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import io from "socket.io-client";
import {
  Activity,
  Zap,
  Target,
  WifiOff,
  Wifi,
  Dumbbell,
  Volume2,
  ChevronDown,
  User,
  MessageSquare,
} from "lucide-react";
import Button from "./Button";

const PoseDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  const [fps, setFps] = useState(0);
  const [isHumanDetected, setIsHumanDetected] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [backendUrl, setBackendUrl] = useState("http://localhost:3001");
  const [selectedExercise, setSelectedExercise] = useState("None");
  const [llmFeedback, setLlmFeedback] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Extended exercise list
  const exercises = [
    "None",
    "Squats",
    "Push-ups",
    "Jumping Jacks",
    "Lunges",
    "Burpees",
    "Plank",
    "Mountain Climbers",
    "High Knees",
    "Sit-ups",
    "Wall Sits",
    "Tricep Dips",
    "Leg Raises",
    "Bridge",
    "Side Plank",
    "Calf Raises",
    "Shoulder Press",
    "Bicep Curls",
    "Deadlifts",
    "Pull-ups",
  ];

  // ✅ Socket.IO connection
  useEffect(() => {
    socketRef.current = io(backendUrl, { transports: ["websocket"] });

    socketRef.current.on("connect", () => setSocketConnected(true));
    socketRef.current.on("disconnect", () => setSocketConnected(false));

    socketRef.current.on("llm_feedback", (data) => {
      setLlmFeedback(data.feedback);
      speakText(data.feedback);
    });

    return () => socketRef.current.disconnect();
  }, [backendUrl]);

  // ✅ MediaPipe Pose setup with HD quality
  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 2, // Maximum quality
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });

    pose.onResults((results) => {
      if (!canvasRef.current) return;
      
      const canvasCtx = canvasRef.current.getContext("2d");
      
      // Set canvas to HD resolution
      if (canvasRef.current.width !== 1920) {
        canvasRef.current.width = 1920;
        canvasRef.current.height = 1080;
      }
      
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Enable image smoothing for better quality
      canvasCtx.imageSmoothingEnabled = true;
      canvasCtx.imageSmoothingQuality = 'high';
      
      // Draw video frame
      canvasCtx.drawImage(
        results.image, 
        0, 
        0, 
        canvasRef.current.width, 
        canvasRef.current.height
      );

      if (results.poseLandmarks) {
        setIsHumanDetected(true);
        
        // Draw with higher quality
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "#FF0000",
          lineWidth: 2,
          radius: 7,
        });

        // Send to backend
        if (socketRef.current && socketConnected && selectedExercise !== "None") {
          socketRef.current.emit("pose_data", {
            exercise: selectedExercise,
            landmarks: results.poseLandmarks,
            timestamp: Date.now(),
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
        width: 1920,  // Full HD
        height: 1080,
        facingMode: "user"
      });
      camera.start();
    }
  }, [socketConnected, selectedExercise]);

  // 🔊 Speak text aloud
  const speakText = (text) => {
    const synth = window.speechSynthesis;
    if (!synth || !text) return;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1.0;
    utter.pitch = 1.0;
    synth.speak(utter);
  };

  // Close dropdown when clicking outside
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
      {/* FIXED HEADER */}
      <header className="absolute top-0 left-0 right-0 h-16 bg-black/60 backdrop-blur-md border-b border-gray-700 z-40">
        <div className="h-full px-4 lg:px-6 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg lg:text-xl font-bold text-white">
               AI-Gym-Trainer
            </h1>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/60 rounded-full">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs lg:text-sm text-white font-semibold">{fps}</span>
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
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT - NO SCROLL */}
      <div className="absolute inset-0 top-16 flex">
        {/* VIDEO AREA */}
        <div className="flex-1 relative bg-black">
          <video
            ref={videoRef}
            className="hidden"
            autoPlay
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-contain"
            style={{ imageRendering: 'high-quality' }}
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

          {/* TIP */}
          <div className="absolute bottom-4 left-4 right-4 max-w-md mx-auto bg-black/60 backdrop-blur-md rounded-lg p-2.5 border border-gray-700">
            <p className="text-xs text-gray-300 text-center">
              💡 Stand 2-3 meters from camera for best tracking
            </p>
          </div>
        </div>

        {/* SIDEBAR - FIXED HEIGHT */}
        <div className="w-80 lg:w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* AI FEEDBACK SECTION */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">AI Coach</h2>
            </div>

            {/* Feedback Box */}
            <div className="flex-1 bg-gray-900/50 rounded-lg p-4 border border-gray-700 flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <p className="text-sm text-gray-300 leading-relaxed">
                  {llmFeedback || (
                    <span className="text-gray-500 italic">
                      Select an exercise and start moving...
                    </span>
                  )}
                </p>
              </div>

              {llmFeedback && (
                <button
                  onClick={() => speakText(llmFeedback)}
                  className="mt-3 w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Volume2 className="w-4 h-4" />
                  Listen
                </button>
              )}
            </div>

            {/* STATS - FIXED AT BOTTOM */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400">Reps</p>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                <p className="text-xs text-gray-400">Form</p>
                <p className="text-2xl font-bold text-green-400">--</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoseDetector;