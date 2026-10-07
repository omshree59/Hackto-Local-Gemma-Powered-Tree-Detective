import React from 'react';
import { 
  Leaf, Camera, Upload, Zap, Eye, RefreshCw, 
  ShieldCheck, AlertTriangle, Cpu
} from 'lucide-react';
import clsx from 'clsx';
import { SAMPLE_TEST_PLANTS } from '../data/natureData';

export default function PlantScoutView({
  onOpenScanner,
  selectedFilePreview,
  selectedFileRaw,
  onSelectFile,
  onTriggerAnalyze,
  onTriggerSampleTest,
  isProcessing,
  errorMsg
}) {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 block mb-1">
          LOCAL VISION ENGINE
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          PLANT SCOUT
        </h2>
        <p className="text-sm text-stone-400 mt-1 font-sans">
          "Identify and understand what you discover."
        </p>
      </div>

      {/* Main Scanner Container */}
      <div className="bg-gradient-to-br from-stone-900/60 to-[#070a07] border border-stone-800/90 rounded-[2.5rem] p-7 sm:p-10 shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white font-bold">MULTIMODAL TENSOR INGESTION</span>
          </div>
          <span className="text-stone-400 text-[11px]">OLLAMA • GEMMA 3 (4B)</span>
        </div>

        {/* Dropzone & Preview Box */}
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) onSelectFile(f);
          }}
          className={clsx(
            "relative rounded-3xl border-2 border-dashed p-8 sm:p-14 text-center flex flex-col items-center justify-center transition-all min-h-[340px]",
            selectedFilePreview 
              ? "border-emerald-500/50 bg-stone-950/80" 
              : "border-stone-800 bg-stone-950/40 hover:border-emerald-500/40"
          )}
        >
          {selectedFilePreview ? (
            <div className="w-full flex flex-col items-center gap-5">
              <div className="relative rounded-2xl overflow-hidden border border-stone-700 shadow-2xl max-h-[300px] max-w-md">
                <img 
                  src={selectedFilePreview} 
                  alt="Field capture preview" 
                  className="w-full h-full object-cover max-h-[300px]"
                />
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-stone-300">
                <span>Loaded: <strong>{selectedFileRaw?.name || 'Camera Capture'}</strong></span>
                <button
                  onClick={() => onSelectFile(null)}
                  className="text-stone-400 hover:text-rose-400 underline cursor-pointer"
                >
                  Clear Photo
                </button>
              </div>

              <button
                onClick={onTriggerAnalyze}
                disabled={isProcessing}
                className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:opacity-40 text-stone-950 font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer mt-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                    <span>ANALYZING LOCALLY...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-stone-950" />
                    <span>ANALYZE LOCALLY</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 max-w-md">
              <div className="w-16 h-16 rounded-3xl bg-stone-900 border border-stone-800 text-emerald-400 flex items-center justify-center shadow-inner">
                <Leaf className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Ready for outdoor plant analysis
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed font-sans">
                  Photograph foliage, blossoms, or tree bark. Drag and drop file here, open device camera, or browse local photos.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onOpenScanner}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-stone-950" />
                  <span>OPEN CAMERA</span>
                </button>

                <label className="px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>CHOOSE LOCAL IMAGE</span>
                  <input 
                    type="file" 
                    accept="image/jpeg,image/png,image/webp" 
                    className="hidden" 
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onSelectFile(f);
                    }}
                  />
                </label>
              </div>

              <p className="text-[10px] font-mono text-stone-400 mt-2">
                ACCEPTED FORMATS: JPG, PNG, WEBP • ZERO EXTERNAL CLOUD TRANSMISSION
              </p>
            </div>
          )}
        </div>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-900 text-rose-300 font-mono text-xs">
            ⚠ {errorMsg}
          </div>
        )}

        {/* Desktop Trial Specimen Quick Tests */}
        <div className="pt-6 border-t border-stone-800/80">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-stone-300 font-bold uppercase flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-teal-400" />
              DESKTOP VERIFICATION SAMPLES
            </span>
            <span className="text-stone-400 text-[10px]">CLICK TO RUN GEMMA 3 LOCALLY</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SAMPLE_TEST_PLANTS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onTriggerSampleTest(sample)}
                className="p-3.5 rounded-2xl bg-stone-950/70 hover:bg-stone-900 border border-stone-800 hover:border-emerald-500/50 text-left transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-mono text-emerald-400 block">{sample.category}</span>
                <h5 className="text-xs font-bold text-stone-200 group-hover:text-white truncate mt-0.5">
                  {sample.name}
                </h5>
                <span className="text-[10px] font-mono text-stone-400 mt-1 block">+{sample.xp} XP</span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
