import { useState } from 'react';
import { Scan, Crosshair } from 'lucide-react';

export default function OpticalHudScanner({ imageSrc, plantName = 'Flora Specimen' }) {
  const [hudActive, setHudActive] = useState(false);
  const [filterMode, setFilterMode] = useState('normal'); // 'normal' | 'chlorophyll' | 'venation'

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#315c3b] shadow-2xl max-h-[340px] max-w-md w-full mx-auto select-none group">
      
      {/* Base Image with dynamic SVG/CSS filters */}
      <img 
        src={imageSrc} 
        alt={plantName} 
        className={`w-full h-full object-cover max-h-[340px] transition-all duration-500 ${
          filterMode === 'chlorophyll' 
            ? 'contrast-150 saturate-200 hue-rotate-15 brightness-95' 
            : filterMode === 'venation' 
              ? 'invert contrast-200 grayscale' 
              : ''
        }`}
      />

      {/* Sci-Fi Botanical HUD Overlay */}
      {hudActive && (
        <div className="absolute inset-0 pointer-events-none border-2 border-emerald-400/40 font-mono text-[9px] flex flex-col justify-between p-3.5 bg-emerald-950/20 backdrop-contrast-125 animate-in fade-in duration-300">
          
          {/* Top Bar with coordinates */}
          <div className="flex items-center justify-between text-emerald-300">
            <div className="flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/40">
              <Crosshair className="w-3 h-3 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>OPTICAL BOTANICAL HUD v2.4</span>
            </div>
            <span className="bg-black/60 px-2 py-0.5 rounded border border-emerald-500/40 text-emerald-400">
              SPECTRUM: {filterMode.toUpperCase()}
            </span>
          </div>

          {/* Center Targeting Reticle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-28 h-28 border border-emerald-400/60 rounded-full flex items-center justify-center relative animate-pulse">
              <div className="w-16 h-16 border border-emerald-300/40 rounded-full" />
              <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full shadow-[0_0_8px_rgba(74,222,128,1)]" />
              <div className="absolute -top-3 text-[8px] text-emerald-300 font-bold bg-black/70 px-1 rounded">
                FOCUS LOCK
              </div>
            </div>
            {/* Animated Laser Scan Bar */}
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_10px_rgba(74,222,128,1)] animate-bounce" style={{ animationDuration: '2.5s' }} />
          </div>

          {/* Bottom Diagnostic Metrics */}
          <div className="flex items-end justify-between text-emerald-300 z-10">
            <div className="bg-black/70 p-2 rounded-xl border border-emerald-500/40 space-y-0.5 max-w-[180px]">
              <div className="flex justify-between gap-2">
                <span className="text-[#91b79a]">CHLOROPHYLL:</span>
                <span className="font-bold text-emerald-300">89.4% POSITIVE</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#91b79a]">VENATION:</span>
                <span className="font-bold text-emerald-300">PINNATE RETICULATE</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#91b79a]">SYMMETRY:</span>
                <span className="font-bold text-emerald-300">BILATERAL (94%)</span>
              </div>
            </div>

            <div className="bg-black/70 px-2.5 py-1.5 rounded-xl border border-emerald-500/40 text-right">
              <span className="text-[8px] text-[#91b79a] block">AI VISION TENSOR</span>
              <span className="font-bold text-emerald-400 text-xs">READY FOR LOG</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Interactive Controls */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-20">
        <button
          type="button"
          onClick={() => setHudActive(prev => !prev)}
          className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shadow-lg ${
            hudActive 
              ? 'bg-emerald-600 text-white border border-emerald-400 shadow-emerald-950/60' 
              : 'bg-black/70 text-[#91b79a] hover:text-[#f3f1e7] border border-[#315c3b]/80'
          }`}
          title="Toggle Optical Botanical HUD"
        >
          <Scan className="w-3 h-3 text-emerald-300" />
          <span>{hudActive ? 'HUD ACTIVE' : 'BOTANICAL HUD'}</span>
        </button>

        {hudActive && (
          <div className="flex items-center gap-1 bg-black/80 p-0.5 rounded-xl border border-emerald-500/50 backdrop-blur-md animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setFilterMode('normal')}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-mono cursor-pointer ${
                filterMode === 'normal' ? 'bg-emerald-700 text-white font-bold' : 'text-[#91b79a]'
              }`}
            >
              RGB
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('chlorophyll')}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-mono cursor-pointer ${
                filterMode === 'chlorophyll' ? 'bg-emerald-700 text-white font-bold' : 'text-[#91b79a]'
              }`}
            >
              CHLORO
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('venation')}
              className={`px-2 py-0.5 rounded-lg text-[9px] font-mono cursor-pointer ${
                filterMode === 'venation' ? 'bg-emerald-700 text-white font-bold' : 'text-[#91b79a]'
              }`}
            >
              VEINS
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
