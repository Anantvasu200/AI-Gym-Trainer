// src/Components/PoseDetector.jsx
import React, { useRef, useEffect, useState } from "react";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import {
  Activity,
  Zap,
  Target,
  WifiOff,
} from "lucide-react";

const PoseDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [fps, setFps] = useState(0);
  const [keypoints, setKeypoints] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isHumanDetected, setIsHumanDetected] = useState(false);

  useEffect(() => {
    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      canvasCtx.save();
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      if (results.poseLandmarks) {
        setIsHumanDetected(true);
        setKeypoints(results.poseLandmarks.length);

        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 3,
        });
        drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "#FF0000",
          lineWidth: 1,
        });
      } else {
        setIsHumanDetected(false);
      }

      canvasCtx.restore();
    });

    if (typeof videoRef.current !== "undefined" && videoRef.current !== null) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          const start = performance.now();
          await pose.send({ image: videoRef.current });
          const end = performance.now();
          setFps(Math.round(1000 / (end - start)));
        },
        width: 640,
        height: 480,
      });
      camera.start();
      setIsConnected(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="relative border-2 border-gray-400 shadow-xl rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          playsInline
          muted
        ></video>

        <canvas
          ref={canvasRef}
          className="relative z-10"
          width="640"
          height="480"
        ></canvas>

        <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm text-gray-700 text-sm px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {isHumanDetected ? (
              <>
                <Target className="text-pink-500" size={18} />
                <span className="font-semibold text-pink-600">
                  TARGET ACQUIRED
                </span>
              </>
            ) : (
              <>
                <Activity className="text-gray-400" size={18} />
                <span>No human detected</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Zap size={16} />
              <span>FPS {fps}</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity size={16} />
              <span>
                Keypoints {keypoints} / 33
              </span>
            </div>
            <div className="flex items-center gap-1">
              {isConnected ? (
                <span className="text-green-600">Online</span>
              ) : (
                <>
                  <WifiOff size={16} className="text-red-500" />
                  <span>Offline</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mt-3 text-sm">
        💡 Tip: Stand 2–3 meters from the camera in good lighting for best detection.
      </p>
    </div>
  );
};

export default PoseDetector;
