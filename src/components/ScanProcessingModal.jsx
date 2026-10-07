import React, { useState, useEffect } from 'react';
import { Cpu, RefreshCw, Leaf, Sparkles, Heart, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';

const PROCESSING_STAGES = [
  { step: '01', title: 'PHOTO RECEIVED', subtitle: 'Ingesting botanical optical buffer into memory' },
  { step: '02', title: 'CHECKING IMAGE', subtitle: 'Validating natural lighting and foliage clarity' },
  { step: '03', title: 'ANALYZING VISUAL FEATURES', subtitle: 'Extracting leaf venation & botanical morphology' },
  { step: '04', title: 'RUNNING GEMMA 3', subtitle: 'Executing multimodal weights via local Ollama' },
  { step: '05', title: 'GENERATING FIELD NOTES', subtitle: 'Synthesizing ecological observations & challenge' },
  { step: '06', title: 'FIELD REPORT READY', subtitle: 'Formatting structured field journal entry' }
];

const COMPLIMENTS_AND_TIPS = [
  {
    afterSeconds: 0,
    headline: 'Analyzing your outdoor specimen...',
    compliment: 'Great job stepping outside to discover nature today.'
  },
  {
    afterSeconds: 4,
    headline: 'Hang in there! Deep vision processing in progress.',
    compliment: 'Patience is a true naturalist virtue. Gemma 3 4B is carefully reading leaf structures.'
  },
  {
    afterSeconds: 9,
    headline: 'Almost there! Running purely on your device.',
    compliment: 'Stay with us! Local offline AI keeps all your photos 100% private with zero cloud tracking.'
  },
  {
    afterSeconds: 15,
    headline: 'Synthesizing your field report & mission...',
    compliment: 'Thank you for hanging in there! Local neural inference takes a few extra moments of computing power.'
  },
  {
    afterSeconds: 22,
    headline: 'Finalizing ecological observations...',
    compliment: 'You are doing amazing. Your personal codex entry will be ready in just a moment.'
  }
];

export default function ScanProcessingModal({
  currentStageIndex = 0,
  imagePreviewUrl
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Timer to track elapsed processing duration
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentStage = PROCESSING_STAGES[Math.min(currentStageIndex, PROCESSING_STAGES.length - 1)];
  const progressPercent = Math.min(100, Math.max(10, ((currentStageIndex + 1) / PROCESSING_STAGES.length) * 100));

  // Find the appropriate compliment based on elapsed time
  const activeEncouragement = [...COMPLIMENTS_AND_TIPS]
    .reverse()
    .find(item => elapsedSeconds >= item.afterSeconds) || COMPLIMENTS_AND_TIPS[0];

  // SVG Circular progress mathematics
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 bg-[#040d08]/94 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-300 font-sans">
      
      {/* Frame Container */}
      <div className="relative w-full max-w-lg nature-surface-card rounded-[2.5rem] p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.85)] overflow-hidden font-mono space-y-5">
        
        {/* Subtle Organic Framing Corners */}
        <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#4f8a52]/80 pointer-events-none"></div>
        <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#4f8a52]/80 pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#4f8a52]/80 pointer-events-none"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#4f8a52]/80 pointer-events-none"></div>

        {/* Header Strip */}
        <div className="flex items-center justify-between border-b border-[#1e3f2b]/40 pb-3 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-300 font-bold uppercase tracking-wider">LOCAL PLANT ANALYSIS</span>
          </div>
          <span className="text-[#91b79a]">GEMMA 3 (4B) • {elapsedSeconds}s</span>
        </div>

        {/* Viewfinder Specimen Frame with Circular Pulse Overlay */}
        <div className="relative rounded-2xl overflow-hidden bg-[#07160f] border border-[#1e3f2b] aspect-video max-h-[190px] flex items-center justify-center">
          {imagePreviewUrl ? (
            <img 
              src={imagePreviewUrl} 
              alt="Scanning specimen" 
              className="w-full h-full object-cover filter brightness-90"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#91b79a]">
              <Leaf className="w-8 h-8 text-emerald-400 animate-pulse" />
              <span className="text-xs">SENSOR BUFFER ACTIVE</span>
            </div>
          )}

          {/* Gentle Organic Light Sweep Line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#4f8a52] to-transparent shadow-[0_0_12px_rgba(79,138,82,0.8)] animate-[bounce_2.8s_infinite] pointer-events-none"></div>

          {/* Metadata Tag */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] bg-[#06140d]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#1e3f2b]/50 text-[#d8c8a8]">
            <span>INPUT: FIELD PHOTO</span>
            <span className="text-emerald-300 font-bold">DEVICE INFERENCE</span>
          </div>
        </div>

        {/* CIRCULAR LOADING INDICATOR & STAGE DETAILS */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#081a11]/80 border border-[#1e3f2b]/60 rounded-2xl p-4">
          
          {/* Animated Circular Progress Spinner */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            
            {/* Spinning ambient outer glow ring */}
            <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-spin [animation-duration:6s]"></div>
            
            <svg className="w-20 h-20 -rotate-90 transform">
              {/* Background Track Circle */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="text-[#0e2a1b]"
                strokeWidth="5"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Dynamic Animated Progress Circle */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="text-emerald-400 transition-all duration-700 ease-out"
                strokeWidth="5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Center Icon & Pulse */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <Leaf className="w-5 h-5 text-emerald-300 animate-pulse" />
              <span className="text-[9px] font-bold text-emerald-400 mt-0.5">
                {Math.round(progressPercent)}%
              </span>
            </div>
          </div>

          {/* Current Stage Information */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">
              STAGE {currentStage.step} OF 06
            </span>
            <h3 className="text-base font-black text-[#f3f1e7] tracking-tight font-sans leading-snug">
              {currentStage.title}
            </h3>
            <p className="text-xs text-[#d8c8a8]/80 font-sans mt-0.5 line-clamp-2">
              {currentStage.subtitle}
            </p>
          </div>

        </div>

        {/* ENCOURAGING COMPLIMENT & PATIENCE MESSAGE (APPEARS & UPDATES DYNAMICALLY) */}
        <div className="p-3.5 rounded-2xl bg-[#0c2417]/80 border border-emerald-500/30 text-left space-y-1 transition-all">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-300 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{activeEncouragement.headline}</span>
          </div>
          <p className="text-xs text-[#d8c8a8] font-sans leading-relaxed">
            {activeEncouragement.compliment}
          </p>
        </div>

        {/* Local Guarantee Badge */}
        <div className="flex items-center justify-between text-[10px] text-[#91b79a] pt-1 border-t border-[#1e3f2b]/40">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Local Neural Tensor Flow</span>
          </div>
          <span className="text-emerald-300 font-bold">100% PRIVATE & OFFLINE</span>
        </div>

      </div>
    </div>
  );
}
