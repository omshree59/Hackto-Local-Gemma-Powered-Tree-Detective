import React, { useState, useEffect } from 'react';
import { Compass, CheckCircle, Pause, Play, X, EyeOff } from 'lucide-react';
import clsx from 'clsx';

export default function MissionActiveModal({
  mission,
  onComplete,
  onClose
}) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [zenMode, setZenMode] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className={clsx(
      "fixed inset-0 z-50 transition-all duration-700 flex flex-col items-center justify-between p-6 sm:p-12 select-none",
      zenMode 
        ? "bg-[#020704] text-[#91b79a]/40 cursor-pointer" 
        : "bg-[#040e08]/96 backdrop-blur-3xl text-[#f3f1e7]"
    )}>
      
      {/* Top Header Strip */}
      <div className={clsx(
        "relative z-10 w-full max-w-2xl flex items-center justify-between transition-opacity duration-500 font-mono text-xs",
        zenMode ? "opacity-20 hover:opacity-100" : "opacity-100"
      )}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-emerald-300 font-bold uppercase tracking-widest">MISSION ACTIVE</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setZenMode(prev => !prev)}
            className="px-3.5 py-1.5 rounded-xl bg-[#0c2417] border border-[#1e3f2b] text-[#d8c8a8] hover:text-[#f3f1e7] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>{zenMode ? 'Exit Zen' : 'Dim Screen'}</span>
          </button>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#91b79a] hover:text-[#f3f1e7] bg-[#0c2417] border border-[#1e3f2b] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Focus Area */}
      <div className="relative z-10 w-full max-w-xl text-center my-auto flex flex-col items-center">
        
        {/* Large Countdown/Stopwatch */}
        <div className="mb-6 font-mono">
          <span className="text-6xl sm:text-8xl font-black text-[#f3f1e7] tracking-tight drop-shadow-[0_0_25px_rgba(79,138,82,0.25)]">
            {formatTime(secondsElapsed)}
          </span>
          <span className="block text-[10px] tracking-widest uppercase text-[#91b79a] mt-2 font-bold">
            OUTDOOR OBSERVATION TIME
          </span>
        </div>

        {/* Objective Card */}
        <div className="w-full p-6 sm:p-8 rounded-3xl nature-surface-card text-left shadow-2xl space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-emerald-300 font-bold uppercase">
              {mission?.category || 'PLANT MISSION'}
            </span>
            <span className="text-[#91b79a]">0 / 1 Completed</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#f3f1e7] leading-snug">
            {mission?.task || mission?.objective || mission?.title}
          </h3>

          <p className="text-xs text-[#d8c8a8] leading-relaxed font-sans">
            "Explore nearby and observe without disturbing the plant."
          </p>
        </div>

        <p className="text-[11px] font-mono text-[#91b79a]/70 mt-6 max-w-md">
          The screen helps you discover the world. The world is the actual experience.
        </p>

      </div>

      {/* Bottom Minimal Controls */}
      <div className={clsx(
        "relative z-10 w-full max-w-md flex items-center justify-center gap-3 transition-opacity duration-500 font-mono text-xs",
        zenMode ? "opacity-30 hover:opacity-100" : "opacity-100"
      )}>
        <button
          onClick={() => setIsRunning(prev => !prev)}
          className="px-6 py-3.5 rounded-2xl bg-[#0c2417] hover:bg-[#123a27] text-[#f3f1e7] border border-[#1e3f2b] font-bold uppercase flex items-center gap-2 cursor-pointer transition-colors"
        >
          {isRunning ? <Pause className="w-4 h-4 text-[#91b79a]" /> : <Play className="w-4 h-4 text-emerald-300" />}
          <span>{isRunning ? 'Pause' : 'Resume'}</span>
        </button>

        <button
          onClick={() => onComplete(secondsElapsed)}
          className="px-8 py-3.5 rounded-2xl bg-[#245336] hover:bg-[#2d6844] active:scale-95 text-[#f3f1e7] font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-black/40 border border-[#4f8a52]/40 transition-all cursor-pointer"
        >
          <CheckCircle className="w-4 h-4 text-emerald-300" />
          <span>COMPLETE MISSION</span>
        </button>
      </div>

    </div>
  );
}
