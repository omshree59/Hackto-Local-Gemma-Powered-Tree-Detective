import React, { useState, useEffect } from 'react';
import { Compass, CheckCircle, Pause, Play, X, EyeOff, ShieldAlert, ListChecks } from 'lucide-react';
import clsx from 'clsx';

export default function MissionActiveModal({
  mission,
  onComplete,
  onClose
}) {
  const [isPrepPhase, setIsPrepPhase] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [zenMode, setZenMode] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && !isPrepPhase) {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isPrepPhase]);

  const handleStartFieldMode = () => {
    setIsPrepPhase(false);
    setIsRunning(true);
  };

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (isPrepPhase) {
    return (
      <div className="fixed inset-0 z-50 bg-[#040e08]/96 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300 font-sans select-none">
        <div className="relative w-full max-w-xl nature-surface-card rounded-[2.5rem] p-6 sm:p-9 shadow-2xl my-auto border border-[#4f8a52]/40">
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl text-[#91b79a] hover:text-[#f3f1e7] bg-[#0c2417] border border-[#1e3f2b] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 block mb-2">
            EXPEDITION PREP
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#f3f1e7] tracking-tight mb-8">
            Before You Step Outside
          </h2>

          <div className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#081a11] border border-[#1e3f2b]">
                <span className="text-[#91b79a] block mb-1">TIME</span>
                <span className="text-[#f3f1e7] font-bold text-sm">{mission?.duration || '15 min'}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#081a11] border border-[#1e3f2b]">
                <span className="text-[#91b79a] block mb-1">DIFFICULTY</span>
                <span className="text-[#f3f1e7] font-bold text-sm">{mission?.difficulty || 'Easy'}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0a1e14] border border-[#1e3f2b]/60">
              <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                <ListChecks className="w-3.5 h-3.5" /> CHECKLIST
              </h4>
              <ul className="space-y-2 text-[#d8c8a8] font-sans">
                <li className="flex gap-2">
                  <span className="text-emerald-500">✓</span> 
                  <span>Water & comfortable shoes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">✓</span> 
                  <span>Fully charged device (Offline AI ready)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">✓</span> 
                  <span>{mission?.equipment || 'Curious eyes and open mind'}</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#123a27]/40 to-[#0e2c1d]/40 border border-[#315c3b]/60">
              <h4 className="text-emerald-300 font-bold mb-2 uppercase tracking-wider text-[10px]">
                WHAT TO LOOK FOR
              </h4>
              <p className="text-[#f3f1e7] font-sans text-sm font-bold leading-relaxed">
                {mission?.objective || 'Explore the immediate area.'}
              </p>
              <p className="text-[#91b79a] font-sans mt-2">
                Tip: {mission?.hint || 'Take your time and observe closely.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-amber-400 font-bold mb-1 uppercase tracking-wider text-[10px]">SAFETY</h4>
                <p className="text-amber-200/90 font-sans leading-relaxed">
                  {mission?.safetyNote || 'Stay aware of your surroundings. Do not touch or consume unknown plants.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={handleStartFieldMode}
              className="w-full py-4 rounded-xl bg-[#245336] hover:bg-[#2d6844] active:scale-95 text-[#f3f1e7] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-black/30 border border-[#4f8a52]/40 transition-all cursor-pointer font-mono"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>START EXPLORING</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Field Mode View
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
          <span className="text-emerald-300 font-bold uppercase tracking-widest">FIELD MODE</span>
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
        <div className="w-full p-6 sm:p-8 rounded-3xl nature-surface-card text-left shadow-2xl space-y-4 border-2 border-emerald-500/30">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-emerald-300 font-bold uppercase tracking-wider">
              {mission?.category || 'PLANT MISSION'}
            </span>
            <span className="text-[#91b79a]">0 / 1 Completed</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-[#f3f1e7] leading-snug">
            {mission?.objective || mission?.title}
          </h3>

          <p className="text-sm text-[#d8c8a8] leading-relaxed font-sans font-bold uppercase tracking-widest border-t border-[#1e3f2b]/60 pt-4 mt-4 text-center">
            OBSERVE WITHOUT DISTURBING THE PLANT.
          </p>
        </div>

      </div>

      {/* Bottom Minimal Controls */}
      <div className={clsx(
        "relative z-10 w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-3 transition-opacity duration-500 font-mono text-xs",
        zenMode ? "opacity-30 hover:opacity-100" : "opacity-100"
      )}>
        <button
          onClick={() => setIsRunning(prev => !prev)}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#0c2417] hover:bg-[#123a27] text-[#f3f1e7] border border-[#1e3f2b] font-bold uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          {isRunning ? <Pause className="w-4 h-4 text-[#91b79a]" /> : <Play className="w-4 h-4 text-emerald-300" />}
          <span>{isRunning ? 'Pause' : 'Resume'}</span>
        </button>

        <button
          onClick={() => onComplete(secondsElapsed)}
          className="w-full sm:flex-1 px-8 py-4 rounded-2xl bg-[#245336] hover:bg-[#2d6844] active:scale-95 text-[#f3f1e7] font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-black/40 border border-[#4f8a52]/40 transition-all cursor-pointer"
        >
          <CheckCircle className="w-4 h-4 text-emerald-300" />
          <span>COMPLETE MISSION</span>
        </button>
      </div>

    </div>
  );
}
