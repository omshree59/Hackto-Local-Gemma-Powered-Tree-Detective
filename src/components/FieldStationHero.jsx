import React from 'react';
import { 
  Camera, Compass, Target, Upload, Zap, WifiOff, ShieldCheck, 
  Sparkles, CheckCircle, Flame, Eye, ArrowRight, RefreshCw, Cpu
} from 'lucide-react';
import clsx from 'clsx';
import { SAMPLE_SPECIMENS } from '../data/datasets';

export default function FieldStationHero({
  activeMission,
  onOpenScanner,
  onOpenQuests,
  onStartTouchGrass,
  onChangeMission,
  onCompleteActiveMission,
  selectedFilePreview,
  selectedFileRaw,
  onSelectFile,
  onTriggerAnalyze,
  onTriggerSampleTest,
  isProcessing,
  errorMsg
}) {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* ============================================================== */}
      {/* SECTION 1 — STORYTELLING HERO */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#070b07] via-[#090e09] to-[#040604] border border-stone-800/90 p-8 sm:p-12 shadow-2xl">
        
        {/* Subtle Background Field-Scanner Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-emerald-500/20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-emerald-500/15"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-emerald-500/10"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-3xl">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-[11px] font-mono font-bold text-emerald-300 mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>FIELD EXPLORATION INTELLIGENCE</span>
          </div>

          {/* Large Bold Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Step Away From The Screen.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
              Touch Grass.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans max-w-2xl mb-8">
            Point your camera at the world around you. Local Gemma vision turns what you discover into field knowledge, challenges, and outdoor quests — without sending your photos to the cloud.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={onOpenScanner}
              className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-black px-7 py-4 rounded-2xl flex items-center gap-2.5 text-xs uppercase tracking-wider shadow-xl shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4 text-stone-950" />
              <span>SCAN SOMETHING</span>
            </button>

            <button
              onClick={onOpenQuests}
              className="bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700/80 px-7 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>EXPLORE QUESTS</span>
            </button>
          </div>

          {/* Status Row */}
          <div className="pt-6 border-t border-stone-800/80 flex flex-wrap items-center gap-6 font-mono text-[11px] text-stone-400">
            <div className="flex items-center gap-2 text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>LOCAL AI</span>
            </div>
            <span className="text-stone-700">•</span>
            <div className="flex items-center gap-2 text-stone-300">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>NO CLOUD</span>
            </div>
            <span className="text-stone-700">•</span>
            <div className="flex items-center gap-2 text-stone-300">
              <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
              <span>OFFLINE READY</span>
            </div>
          </div>

        </div>

      </section>

      {/* ============================================================== */}
      {/* SECTION 2 — ACTIVE FIELD MISSION CARD */}
      {/* ============================================================== */}
      <section className="bg-gradient-to-br from-stone-900/70 to-[#070a07] border border-stone-800/90 rounded-[2.5rem] p-7 sm:p-10 shadow-2xl relative overflow-hidden group">
        
        {/* Subtle Circular Radar-Style Animation */}
        <div className="absolute right-[-40px] top-[-40px] w-80 h-80 pointer-events-none opacity-10">
          <div className="w-full h-full rounded-full border-2 border-emerald-400 animate-[spin_12s_linear_infinite] flex items-center justify-center">
            <div className="w-2/3 h-2/3 rounded-full border border-dashed border-emerald-400 flex items-center justify-center">
              <div className="w-1/3 h-1/3 rounded-full border border-emerald-400"></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/80">
                ACTIVE FIELD MISSION
              </span>
              <span className="text-xs font-mono font-bold text-stone-400 bg-stone-950 px-2.5 py-0.5 rounded-full border border-stone-800">
                {activeMission?.category || activeMission?.guild || 'BOTANIST'}
              </span>
              <span className="text-xs font-mono font-black text-emerald-300 bg-emerald-950/40 px-3 py-0.5 rounded-full border border-emerald-800/50">
                +{activeMission?.reward || 40} XP
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug mb-3">
              {activeMission?.task || activeMission?.title || 'Find a flower with five petals.'}
            </h3>

            {activeMission?.hint && (
              <p className="text-xs text-stone-400 italic mb-4 font-sans">
                Field Directive: {activeMission?.hint}
              </p>
            )}

            {/* Progress Counter */}
            <div className="flex items-center gap-3 text-xs font-mono text-stone-400">
              <span className="font-bold text-stone-300">PROGRESS:</span>
              <div className="w-36 h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                <div className="h-full bg-emerald-500 w-2/3 transition-all"></div>
              </div>
              <span className="text-emerald-400 font-bold">2 / 3 Discoveries</span>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={onChangeMission}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-stone-950 hover:bg-stone-900 border border-stone-800 text-stone-300 text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
            >
              CHANGE MISSION
            </button>
            <button
              onClick={onStartTouchGrass}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Flame className="w-4 h-4 text-stone-950" />
              <span>START EXPEDITION</span>
            </button>
            <button
              onClick={onCompleteActiveMission}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-stone-900 hover:bg-emerald-950 hover:text-emerald-300 border border-stone-800 text-stone-400 text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
              title="Manually log completion"
            >
              COMPLETE
            </button>
          </div>

        </div>

      </section>

      {/* ============================================================== */}
      {/* SECTION 3 — SPECIMEN ANALYSIS TERMINAL */}
      {/* ============================================================== */}
      <section className="bg-gradient-to-br from-stone-900/60 to-[#070a07] border border-stone-800/90 rounded-[2.5rem] p-7 sm:p-10 shadow-2xl relative">
        
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800/80 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400">
                SPECIMEN ANALYSIS TERMINAL
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight mt-1">
              Local Visual Intelligence
            </h3>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-stone-300 bg-stone-950/80 px-4 py-2 rounded-2xl border border-stone-800 self-start sm:self-auto">
            <span>OLLAMA</span>
            <span className="text-stone-600">•</span>
            <span className="text-emerald-400 font-bold">GEMMA 3 4B</span>
            <span className="text-stone-600">•</span>
            <span>LOCAL PROCESSING</span>
          </div>
        </div>

        {/* Bring Something You Discovered Dropzone */}
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) onSelectFile(file);
          }}
          className={clsx(
            "relative rounded-3xl border-2 border-dashed transition-all p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-[320px]",
            selectedFilePreview 
              ? "border-emerald-500/50 bg-stone-950/80" 
              : "border-stone-800 bg-stone-950/40 hover:border-emerald-500/40 hover:bg-stone-900/30"
          )}
        >
          {selectedFilePreview ? (
            <div className="w-full flex flex-col items-center gap-5">
              <div className="relative rounded-2xl overflow-hidden border border-stone-700 shadow-2xl max-h-[260px] max-w-md">
                <img 
                  src={selectedFilePreview} 
                  alt="Discovered Specimen" 
                  className="w-full h-full object-cover max-h-[260px]"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-stone-300">
                  Ready: <strong>{selectedFileRaw?.name || 'Trail Capture'}</strong>
                </span>
                <button
                  onClick={() => onSelectFile(null)}
                  className="text-xs font-mono text-stone-400 hover:text-rose-400 underline"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 max-w-md">
              <div className="w-16 h-16 rounded-2xl bg-stone-900 border border-stone-800 text-emerald-400 flex items-center justify-center shadow-inner">
                <Camera className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-1">
                  Bring something you discovered.
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed font-sans">
                  Drop a field photo here, activate your device camera, or choose a file from your offline drive.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onOpenScanner}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md"
                >
                  <Camera className="w-4 h-4 text-stone-950" />
                  <span>OPEN CAMERA</span>
                </button>

                <label className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>CHOOSE LOCAL IMAGE</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onSelectFile(file);
                    }}
                  />
                </label>
              </div>

              <p className="text-[10px] font-mono text-stone-400 mt-2">
                ACCEPTED FORMATS: JPG, PNG, WEBP • MAX 25MB • ZERO CLOUD INGESTION
              </p>
            </div>
          )}
        </div>

        {/* Trigger Analyze Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>LOCAL VISION TENSOR PIPELINE READY</span>
          </div>

          <button
            onClick={onTriggerAnalyze}
            disabled={!selectedFileRaw || isProcessing}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                <span>ANALYZING WITH GEMMA 3...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-stone-950" />
                <span>ANALYZE SPECIMEN</span>
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-4 rounded-2xl bg-rose-950/40 border border-rose-900/60 text-xs font-mono text-rose-300">
            ⚠ {errorMsg}
          </div>
        )}

        {/* Desktop Trial Specimen Quick Tests */}
        <div className="mt-8 pt-8 border-t border-stone-800/80">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold text-stone-300 uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal-400" />
              DESKTOP VERIFICATION SPECIMENS
            </span>
            <span className="text-[10px] font-mono text-stone-400">NO CAMERA? CLICK TO TEST LOCAL GEMMA</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SAMPLE_SPECIMENS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onTriggerSampleTest(sample)}
                className="p-3.5 rounded-2xl bg-stone-950/60 hover:bg-stone-900 border border-stone-800 hover:border-emerald-500/50 text-left transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 block mb-1">
                    {sample.category}
                  </span>
                  <h5 className="text-xs font-bold text-stone-200 group-hover:text-white leading-snug">
                    {sample.name}
                  </h5>
                </div>
                <span className="text-[10px] font-mono text-stone-400 mt-2 block">
                  +{sample.xp} XP Test
                </span>
              </button>
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}
