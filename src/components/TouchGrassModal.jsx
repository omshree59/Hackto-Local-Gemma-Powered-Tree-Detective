import React, { useState, useEffect } from 'react';
import { 
  Flame, CheckCircle, Pause, Play, X, EyeOff, Sparkles, 
  Compass, Award, ArrowRight, ShieldCheck
} from 'lucide-react';
import clsx from 'clsx';

export default function TouchGrassModal({
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

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className={clsx(
      "fixed inset-0 z-50 transition-all duration-700 flex flex-col items-center justify-between p-6 sm:p-12",
      zenMode 
        ? "bg-[#030403] text-stone-500 cursor-pointer" 
        : "bg-[#050705]/95 backdrop-blur-3xl text-stone-100"
    )}>
      
      {/* Background Breathing Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={clsx(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000",
          zenMode 
            ? "w-[400px] h-[400px] bg-emerald-950/5 blur-[160px]" 
            : "w-[600px] h-[600px] bg-emerald-900/15 blur-[140px] animate-pulse"
        )}></div>
      </div>

      {/* Top Status Strip */}
      <div className={clsx(
        "relative z-10 w-full max-w-3xl flex items-center justify-between transition-opacity duration-500",
        zenMode ? "opacity-20 hover:opacity-100" : "opacity-100"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
            EXPEDITION ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setZenMode(prev => !prev)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-stone-900/60 border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-1.5"
            title="Dim display to minimize screen distraction"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>{zenMode ? 'Exit Zen' : 'Zen Dimmer'}</span>
          </button>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white bg-stone-900/60 border border-stone-800 transition-colors"
            title="Leave expedition session"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Centerpiece: The Philosophy & Objective */}
      <div className="relative z-10 w-full max-w-2xl text-center flex flex-col items-center my-auto">
        
        {/* Large Timer Display */}
        <div className="mb-4">
          <span className="text-6xl sm:text-8xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            {formatTime(secondsElapsed)}
          </span>
          <span className="block text-xs font-mono uppercase tracking-widest text-stone-400 mt-2 font-bold">
            OUTDOOR SESSION TIME
          </span>
        </div>

        {/* The Core Touch Grass Mandate */}
        <div className={clsx(
          "transition-all duration-700 my-4",
          zenMode ? "opacity-40" : "opacity-100"
        )}>
          <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-700/60 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-emerald-300 mb-4 shadow-inner">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            TOUCH GRASS DIRECTIVE
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-stone-100 max-w-xl mx-auto leading-snug">
            "Your screen has done its job. <span className="text-emerald-400">Now go.</span>"
          </h2>

          <div className="mt-6 p-6 rounded-3xl bg-stone-900/50 border border-stone-800/80 backdrop-blur-xl text-left max-w-lg mx-auto shadow-2xl">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-400 uppercase tracking-wider mb-2">
              <span>ACTIVE MISSION</span>
              <span className="text-emerald-400">+{mission.reward || 50} XP</span>
            </div>
            <p className="text-base font-bold text-white leading-relaxed">
              {mission.task || mission.title || mission.objective}
            </p>
            {mission.hint && (
              <p className="text-xs text-stone-400 mt-2 italic">
                Tip: {mission.hint}
              </p>
            )}
          </div>
        </div>

        {/* Minimal Philosophical Reminder */}
        <p className="text-xs text-stone-400 max-w-md mx-auto mt-4 font-mono">
          The best interface is the one you stop looking at. Look up at trees, sky, or footpath.
        </p>

      </div>

      {/* Bottom Minimal Controls */}
      <div className={clsx(
        "relative z-10 w-full max-w-lg flex flex-col sm:flex-row items-center justify-center gap-3 transition-opacity duration-500",
        zenMode ? "opacity-30 hover:opacity-100" : "opacity-100"
      )}>
        <button
          onClick={() => setIsRunning(prev => !prev)}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
          <span>{isRunning ? 'Pause Timer' : 'Resume'}</span>
        </button>

        <button
          onClick={() => onComplete(secondsElapsed)}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
        >
          <CheckCircle className="w-4 h-4 text-stone-950" />
          <span>Complete Mission</span>
        </button>
      </div>

    </div>
  );
}
