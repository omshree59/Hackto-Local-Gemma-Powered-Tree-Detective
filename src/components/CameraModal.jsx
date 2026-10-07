import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, Check, RefreshCw, AlertTriangle, Upload, RotateCcw } from 'lucide-react';

export default function CameraModal({
  onCapture,
  onClose,
  onFallbackUpload
}) {
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);
  const [facingMode, setFacingMode] = useState('environment');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let currentStream = null;

    const startCamera = async () => {
      setIsInitializing(true);
      setCameraError('');

      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera device access is not supported in this browser environment.');
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });

        currentStream = mediaStream;
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(err => console.error("Video stream playback error:", err));
        }
      } catch (err) {
        setCameraError(err.message || 'Camera permission denied or lens unavailable.');
      } finally {
        setIsInitializing(false);
      }
    };

    startCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const toggleCameraFacing = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
  };

  const retakeSnapshot = () => {
    setCapturedImage(null);
  };

  const confirmUsePhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#040e08]/95 backdrop-blur-3xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-300 select-none">
      
      {/* Top Header */}
      <div className="w-full max-w-2xl flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-[#f3f1e7] font-bold uppercase tracking-wider">FIELD CAMERA</span>
          <span className="text-[#91b79a]">• OPTICAL SENSOR</span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl text-[#91b79a] hover:text-[#f3f1e7] bg-[#0c2417] border border-[#1e3f2b] transition-colors cursor-pointer"
          title="Cancel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Viewfinder Frame */}
      <div className="relative w-full max-w-2xl flex-1 max-h-[580px] my-4 rounded-3xl overflow-hidden bg-[#07160f] border border-[#1e3f2b] shadow-2xl flex items-center justify-center">
        
        {/* Optical Focus Corners (Subtle Leaf Green) */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#4f8a52] z-20 pointer-events-none"></div>
        <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#4f8a52] z-20 pointer-events-none"></div>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#4f8a52] z-20 pointer-events-none"></div>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#4f8a52] z-20 pointer-events-none"></div>

        {/* Scan Reticle Targeting Center */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="w-24 h-24 border border-[#4f8a52]/40 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-[#4f8a52] rounded-full"></div>
          </div>
        </div>

        {/* Instruction Eyebrow */}
        <div className="absolute top-4 inset-x-0 flex justify-center z-20 pointer-events-none">
          <span className="bg-[#06120b]/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#1e3f2b]/60 text-xs font-mono text-[#f3f1e7]">
            Frame the plant clearly.
          </span>
        </div>

        {/* Live Video or Captured Snapshot or Error State */}
        {capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Captured Plant" 
            className="w-full h-full object-cover object-center"
          />
        ) : cameraError ? (
          <div className="p-8 text-center max-w-md space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/40 border border-amber-800 text-amber-300 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#f3f1e7] mb-1">Camera Sensor Unavailable</h4>
              <p className="text-xs text-[#d8c8a8] leading-relaxed font-mono">
                {cameraError}
              </p>
            </div>
            <button
              onClick={onFallbackUpload}
              className="bg-[#245336] hover:bg-[#2d6844] text-[#f3f1e7] font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 mx-auto cursor-pointer border border-[#4f8a52]/40"
            >
              <Upload className="w-4 h-4 text-emerald-300" />
              <span>Choose Photo From Drive</span>
            </button>
          </div>
        ) : isInitializing ? (
          <div className="flex flex-col items-center gap-3 text-[#91b79a] font-mono text-xs">
            <RefreshCw className="w-6 h-6 animate-spin text-emerald-400" />
            <span>ACTIVATING OPTICAL LENS...</span>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            playsInline 
            autoPlay 
            muted 
            className="w-full h-full object-cover"
          />
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Bottom Shutter Controls */}
      <div className="w-full max-w-2xl flex items-center justify-between px-6">
        <button
          onClick={onClose}
          className="text-xs font-mono font-bold text-[#91b79a] hover:text-[#f3f1e7] px-4 py-2 cursor-pointer"
        >
          CANCEL
        </button>

        {capturedImage ? (
          <div className="flex items-center gap-4">
            <button
              onClick={retakeSnapshot}
              className="px-5 py-3 rounded-xl bg-[#0c2417] border border-[#1e3f2b] text-[#f3f1e7] text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
            >
              RETAKE
            </button>
            <button
              onClick={confirmUsePhoto}
              className="px-8 py-3.5 rounded-2xl bg-[#245336] hover:bg-[#2d6844] text-[#f3f1e7] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-black/40 border border-[#4f8a52]/40 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 text-emerald-300" />
              <span>ANALYZE PLANT</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <button
              onClick={toggleCameraFacing}
              disabled={!!cameraError || isInitializing}
              className="p-3 rounded-full bg-[#0c2417] text-[#91b79a] hover:text-[#f3f1e7] border border-[#1e3f2b] transition-colors cursor-pointer disabled:opacity-30"
              title="Switch Camera Facing (Front / Back)"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={takeSnapshot}
              disabled={!!cameraError || isInitializing}
              className="w-20 h-20 rounded-full border-4 border-[#4f8a52]/80 bg-[#07160f] flex items-center justify-center shadow-2xl active:scale-95 transition-transform disabled:opacity-40 cursor-pointer"
              title="Capture Photo"
            >
              <div className="w-14 h-14 rounded-full bg-[#245336] hover:bg-[#2d6844]"></div>
            </button>

            <button
              onClick={onFallbackUpload}
              className="p-3 rounded-full bg-[#0c2417] text-[#91b79a] hover:text-[#f3f1e7] border border-[#1e3f2b] transition-colors cursor-pointer"
              title="Upload from device"
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="w-16"></div>
      </div>

    </div>
  );
}
