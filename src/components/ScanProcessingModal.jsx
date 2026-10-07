import React from 'react';
import { Cpu, RefreshCw, Leaf } from 'lucide-react';
import clsx from 'clsx';

const PROCESSING_STAGES = [
  { step: '01', title: 'PHOTO RECEIVED', subtitle: 'Ingesting botanical optical buffer into memory' },
  { step: '02', title: 'CHECKING IMAGE', subtitle: 'Validating natural lighting and foliage clarity' },
  { step: '03', title: 'ANALYZING VISUAL FEATURES', subtitle: 'Extracting leaf venation & botanical morphology' },
  { step: '04', title: 'RUNNING GEMMA 3', subtitle: 'Executing multimodal weights via local Ollama' },
  { step: '05', title: 'GENERATING FIELD NOTES', subtitle: 'Synthesizing ecological observations & challenge' },
  { step: '06', title: 'FIELD REPORT READY', subtitle: 'Formatting structured field journal entry' }
];

export default function ScanProcessingModal({
  currentStageIndex = 0,
  imagePreviewUrl
}) {
  const currentStage = PROCESSING_STAGES[Math.min(currentStageIndex, PROCESSING_STAGES.length - 1)];
  const progressPercent = ((currentStageIndex + 1) / PROCESSING_STAGES.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-[#040d08]/92 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-300">
      
      {/* Frame Container */}
      <div className="relative w-full max-w-lg nature-surface-card rounded-[2.5rem] p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden font-mono">
        
        {/* Subtle Organic Framing Corners */}
        <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#4f8a52]/80"></div>
        <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#4f8a52]/80"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#4f8a52]/80"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#4f8a52]/80"></div>

        {/* Header Strip */}
        <div className="flex items-center justify-between border-b border-[#1e3f2b]/40 pb-3 mb-5 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-300 font-bold uppercase tracking-wider">LOCAL PLANT ANALYSIS</span>
          </div>
          <span className="text-[#91b79a]">GEMMA 3 (4B)</span>
        </div>

        {/* Viewfinder Specimen Frame */}
        <div className="relative rounded-2xl overflow-hidden bg-[#07160f] border border-[#1e3f2b] aspect-video max-h-[220px] flex items-center justify-center mb-6">
          {imagePreviewUrl ? (
            <img 
              src={imagePreviewUrl} 
              alt="Scanning specimen" 
              className="w-full h-full object-cover filter brightness-95"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#91b79a]">
              <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
              <span className="text-xs">SENSOR BUFFER ACTIVE</span>
            </div>
          )}

          {/* Gentle Organic Light Sweep Line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#4f8a52] to-transparent shadow-[0_0_12px_rgba(79,138,82,0.8)] animate-[bounce_2.8s_infinite]"></div>

          {/* Metadata Tag */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] bg-[#06140d]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#1e3f2b]/50 text-[#d8c8a8]">
            <span>INPUT: FIELD PHOTO</span>
            <span className="text-emerald-300">SOCKET: 127.0.0.1:11434</span>
          </div>
        </div>

        {/* Rotating Stage Display */}
        <div className="text-center space-y-1 mb-6">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">
            STAGE {currentStage.step} OF 06
          </span>
          <h3 className="text-lg font-black text-[#f3f1e7] tracking-tight font-sans">
            {currentStage.title}
          </h3>
          <p className="text-xs text-[#d8c8a8]/80 font-sans">
            {currentStage.subtitle}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="h-1.5 w-full bg-[#07160f] rounded-full overflow-hidden border border-[#1e3f2b]">
            <div 
              className="h-full bg-gradient-to-r from-[#245336] via-[#315c3b] to-[#4f8a52] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Local Guarantee Badge */}
        <div className="flex items-center justify-between text-[10px] text-[#91b79a] pt-2 border-t border-[#1e3f2b]/40">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Running locally via Ollama</span>
          </div>
          <span className="text-emerald-300 font-bold">100% PRIVATE & OFFLINE</span>
        </div>

      </div>
    </div>
  );
}
