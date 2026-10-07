import React from 'react';
import { ShieldCheck, Cpu, WifiOff, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

const STAGES = [
  { step: '01', title: 'CAPTURE RECEIVED', subtitle: 'Ingesting 24-bit raw optical array' },
  { step: '02', title: 'LOCAL VISION ONLINE', subtitle: 'Mounting Gemma 3 (4B) vision encoder weights' },
  { step: '03', title: 'ANALYZING VISUAL FEATURES', subtitle: 'Segmenting morphological foliage & vein contours' },
  { step: '04', title: 'IDENTIFYING SPECIMEN', subtitle: 'Correlating taxonomy with local biological index' },
  { step: '05', title: 'GENERATING FIELD NOTES', subtitle: 'Synthesizing ecological observations & next quest' },
  { step: '06', title: 'FIELD REPORT READY', subtitle: 'Formatting structured offline intelligence' }
];

export default function ScanProcessingModal({
  currentStageIndex = 0,
  imagePreviewUrl,
  modelName = "gemma3:4b"
}) {
  const currentStage = STAGES[Math.min(currentStageIndex, STAGES.length - 1)];
  const progressPercent = ((currentStageIndex + 1) / STAGES.length) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-[#040604]/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      
      {/* Background Reticle Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Main Terminal Frame */}
      <div className="relative w-full max-w-lg bg-[#080b08] border border-stone-800 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Optical Corner Reticles */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald-500/80"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-emerald-500/80"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald-500/80"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-500/80"></div>

        {/* Header Telemetry Strip */}
        <div className="flex items-center justify-between border-b border-stone-800/80 pb-4 mb-6 font-mono text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold uppercase tracking-wider text-emerald-400">
              LOCAL FIELD ANALYSIS
            </span>
          </div>
          <div className="flex items-center gap-2 text-stone-300">
            <WifiOff className="w-3 h-3 text-teal-400" />
            <span>ZERO CLOUD RELAY</span>
          </div>
        </div>

        {/* Viewfinder Specimen Frame with Scanning Laser Bar */}
        <div className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800/80 aspect-video max-h-[220px] flex items-center justify-center mb-6 group">
          {imagePreviewUrl ? (
            <img 
              src={imagePreviewUrl} 
              alt="Scanning Specimen" 
              className="w-full h-full object-cover filter brightness-90 contrast-105"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-stone-600">
              <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
              <span className="text-xs font-mono">OPTICAL SENSOR ACTIVE</span>
            </div>
          )}

          {/* Animated Scanning Laser Line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-[bounce_2.5s_infinite]"></div>
          
          {/* Internal Viewfinder Crosshairs */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-16 h-16 border border-emerald-500/30 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-400/80 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Floating Metadata Overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-stone-300 bg-[#080b08]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-800/80">
            <span>RES: 4096x2304 TENSOR</span>
            <span className="text-emerald-400">ENGINE: GEMMA 3 (4B)</span>
          </div>
        </div>

        {/* Stepped Stage Display */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-[10px] font-mono font-bold text-emerald-300 mb-1">
            <span>PHASE {currentStage.step} OF 06</span>
          </div>
          <h3 className="text-lg font-black tracking-tight text-white font-mono">
            {currentStage.title}
          </h3>
          <p className="text-xs text-stone-400 font-mono">
            {currentStage.subtitle}
          </p>
        </div>

        {/* Progress Bar with Precision Percentage */}
        <div className="space-y-2 mb-6">
          <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden border border-stone-800">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-stone-300">
            <span>NEURAL WEIGHTS LOCAL</span>
            <span className="text-emerald-400 font-bold">{Math.round(progressPercent)}% COMPLETE</span>
          </div>
        </div>

        {/* Model & Privacy Guarantee Footnote */}
        <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 flex items-center justify-between text-[10px] font-mono text-stone-400">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ollama Host: 127.0.0.1:11434</span>
          </div>
          <span className="text-emerald-400 font-bold">100% PRIVATE</span>
        </div>

      </div>
    </div>
  );
}
