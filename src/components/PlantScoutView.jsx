import { Camera, Upload, Zap, Eye, RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import { SAMPLE_TEST_PLANTS } from '../data/natureData';
import ElectricLogo from './ElectricLogo';
import OpticalHudScanner from './OpticalHudScanner';

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
    <div className="space-y-10 animate-in fade-in duration-500 max-w-4xl mx-auto pb-12 select-none">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#1e3f2b]/40">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#91b79a] block mb-1">
          LOCAL BOTANICAL INTELLIGENCE
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
          PLANT SCOUT
        </h2>
        <p className="text-sm text-[#d8c8a8] mt-1 font-sans">
          "Identify and understand what you discover."
        </p>
      </div>

      {/* Main Scanner Container */}
      <div className="nature-surface-card rounded-[2.5rem] p-7 sm:p-10 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs pb-4 border-b border-[#1e3f2b]/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[#f3f1e7] font-bold">MULTIMODAL TENSOR INGESTION</span>
          </div>
          <span className="text-[#91b79a] text-[11px]">OLLAMA • GEMMA 3 (4B)</span>
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
              ? "border-[#4f8a52]/60 bg-[#081a11]/90" 
              : "border-[#1e3f2b]/60 bg-[#07160f]/60 hover:border-[#4f8a52]/50 hover:bg-[#091d14]/70"
          )}
        >
          {selectedFilePreview ? (
            <div className="w-full flex flex-col items-center gap-5">
              <div className="w-full max-w-lg">
                <OpticalHudScanner 
                  imageSrc={selectedFilePreview} 
                  plantName={selectedFileRaw?.name || 'Field Botanical Specimen'} 
                />
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-[#d8c8a8]">
                <span>Loaded: <strong>{selectedFileRaw?.name || 'Camera Snapshot'}</strong></span>
                <button
                  onClick={() => onSelectFile(null)}
                  className="text-[#91b79a] hover:text-rose-400 underline cursor-pointer"
                >
                  Clear Photo
                </button>
              </div>

              <button
                onClick={onTriggerAnalyze}
                disabled={isProcessing}
                className="bg-[#245336] hover:bg-[#2d6844] active:scale-95 disabled:opacity-40 text-[#f3f1e7] font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-black/40 border border-[#4f8a52]/40 transition-all cursor-pointer mt-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
                    <span>ANALYZING LOCALLY...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-emerald-300" />
                    <span>ANALYZE LOCALLY</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 max-w-md">
              <div className="w-28 h-28 relative rounded-3xl bg-[#0a2015] border border-[#1e3f2b] p-1 shadow-inner overflow-hidden cursor-crosshair group">
                <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-400/20 transition-all duration-300" />
                <ElectricLogo
                  src="/nature-leaf.svg"
                  color="#bbf7d0"
                  glowColor="#22c55e"
                  scale={0.76}
                  strands={4}
                  bend={0.6}
                  crackle={1.3}
                  arcs={1}
                  speed={2.2}
                  interactive={true}
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#f3f1e7] mb-1">
                  Ready for outdoor plant analysis
                </h3>
                <p className="text-xs text-[#d8c8a8]/80 leading-relaxed font-sans">
                  Photograph foliage, blossoms, or tree bark. Drag and drop file here, open device camera, or browse local photos.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onOpenScanner}
                  className="px-6 py-3 rounded-xl bg-[#245336] hover:bg-[#2d6844] text-[#f3f1e7] text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg border border-[#4f8a52]/40 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-emerald-300" />
                  <span>OPEN CAMERA</span>
                </button>

                <label className="px-6 py-3 rounded-xl bg-[#0b1f16] hover:bg-[#123a27] border border-[#315c3b]/60 text-[#f3f1e7] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-[#91b79a]" />
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

              <p className="text-[10px] font-mono text-[#91b79a]/70 mt-2">
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
        <div className="pt-6 border-t border-[#1e3f2b]/40">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-[#f3f1e7] font-bold uppercase flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              DESKTOP VERIFICATION SAMPLES
            </span>
            <span className="text-[#91b79a]/70 text-[10px]">CLICK TO RUN GEMMA 3 LOCALLY</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SAMPLE_TEST_PLANTS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onTriggerSampleTest(sample)}
                className="p-3.5 rounded-2xl bg-[#081a11]/75 hover:bg-[#0e2c1d] border border-[#1e3f2b]/50 hover:border-[#4f8a52]/60 text-left transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-mono text-emerald-300 block">{sample.category}</span>
                <h5 className="text-xs font-bold text-[#f3f1e7] group-hover:text-emerald-200 truncate mt-0.5">
                  {sample.name}
                </h5>
                <span className="text-[10px] font-mono text-[#d8c8a8]/70 mt-1 block">+{sample.xp} XP</span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
