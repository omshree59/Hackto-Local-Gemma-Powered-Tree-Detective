import React from 'react';
import { Cpu, WifiOff, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

const PROCESSING_STAGES = [
  { step: '01', title: 'PHOTO RECEIVED', subtitle: 'Mounting optical buffer into memory' },
  { step: '02', title: 'CHECKING IMAGE', subtitle: 'Validating format and focus parameters' },
  { step: '03', title: 'ANALYZING VISUAL FEATURES', subtitle: 'Extracting leaf venation & botanical morphology' },
  { step: '04', title: 'RUNNING GEMMA 3', subtitle: 'Executing multimodal weights via local Ollama' },
  { step: '05', title: 'GENERATING FIELD NOTES', subtitle: 'Synthesizing ecological observations & challenge' },
  { step: '06', title: 'FIELD REPORT READY', subtitle: 'Structuring output into field format' }
];

export default function ScanProcessingModal({
  currentStageIndex = 0,
  imagePreviewUrl
}) {
  const currentStage = PROCESSING_STAGES[Math.min(currentStageIndex, PROCESSING_STAGES.length - 1)];
  const progressPercent = ((currentStageIndex + 1) / PROCESSING_STAGES.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-[#040604]/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-300">
      
      {/* Background Reticle Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Frame Container */}
      <div className="relative w-full max-w-lg bg-[#080b08] border border-stone-800 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden font-mono">
        
        {/* Focus Brackets */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald-500/80"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-emerald-500/80"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald-500/80"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-500/80"></div>

        {/* Header Strip */}
        <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 mb-5 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider">LOCAL PLANT ANALYSIS</span>
          </div>
          <span className="text-stone-300">GEMMA 3 (4B)</span>
        </div>

        {/* Viewfinder Specimen Frame */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 aspect-video max-h-[220px] flex items-center justify-center mb-6">
          {imagePreviewUrl ? (
            <img 
              src={imagePreviewUrl} 
              alt="Scanning specimen" 
              className="w-full h-full object-cover filter brightness-90 contrast-105"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-stone-500">
              <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
              <span className="text-xs">SENSOR BUFFER ACTIVE</span>
            </div>
          )}

          {/* Scanning Line Animation */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.9)] animate-[bounce_2.5s_infinite]"></div>

          {/* Metadata Tag */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] bg-[#080b08]/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-800 text-stone-300">
            <span>INPUT: LOCAL BUFFER</span>
            <span className="text-emerald-400">HOST: 127.0.0.1:11434</span>
          </div>
        </div>

        {/* Rotating Stage Display */}
        <div className="text-center space-y-1 mb-6">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">
            STAGE {currentStage.step} OF 06
          </span>
          <h3 className="text-lg font-black text-white tracking-tight">
            {currentStage.title}
          </h3>
          <p className="text-xs text-stone-400">
            {currentStage.subtitle}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden border border-stone-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Local Guarantee Badge */}
        <div className="flex items-center justify-between text-[10px] text-stone-400 pt-2 border-t border-stone-800/80">
          <div className="flex items-center gap-1.5 text-stone-300">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Running locally via Ollama</span>
          </div>
          <span className="text-emerald-400 font-bold">NO CLOUD CONNECTION</span>
        </div>

      </div>
    </div>
  );
}
