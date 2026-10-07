import React from 'react';
import { 
  CheckCircle, AlertTriangle, ArrowRight, BookOpen, 
  Leaf, Trees, Flower, RefreshCw, Compass, MapPin
} from 'lucide-react';

const CATEGORY_ICONS = {
  tree: Trees,
  flower: Flower,
  plant: Leaf,
  other: Leaf
};

export default function FieldReportModal({
  report,
  imagePreviewUrl,
  onStartChallenge,
  onSaveCodex,
  onScanAnother,
  isSaved
}) {
  if (!report) return null;

  const catKey = (report.category || 'plant').toLowerCase();
  const IconComp = CATEGORY_ICONS[catKey] || Leaf;

  return (
    <div className="fixed inset-0 z-50 bg-[#040604]/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300 font-sans">
      
      <div className="relative w-full max-w-2xl bg-[#080b08] border border-stone-800 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_0_90px_rgba(0,0,0,0.95)] my-auto overflow-hidden">
        
        {/* Header Eyebrow */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-6 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-bold uppercase tracking-wider text-emerald-400">
              FIELD IDENTIFICATION
            </span>
          </div>

          <span className="text-stone-300 bg-stone-900 px-3 py-1 rounded-full border border-stone-800">
            CONFIDENCE: {report.confidence || 'MODERATE'}
          </span>
        </div>

        {/* Specimen Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shrink-0 shadow-xl">
            {imagePreviewUrl ? (
              <img 
                src={imagePreviewUrl} 
                alt="Identified Specimen" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-emerald-400 bg-emerald-950/20">
                <IconComp className="w-10 h-10" />
              </div>
            )}
            <div className="absolute top-1.5 left-1.5 bg-[#080b08]/80 backdrop-blur-md p-1.5 rounded-lg border border-stone-800 text-emerald-400">
              <IconComp className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-400">
              LIKELY IDENTIFICATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5 leading-tight">
              {report.name || report.identification || 'Wild Flora Specimen'}
            </h3>
            <span className="inline-block mt-1 text-[11px] font-mono text-stone-300 bg-stone-900 px-2 py-0.5 rounded-md border border-stone-800">
              CATEGORY: {report.category || 'PLANT'}
            </span>
          </div>

          <div className="self-start sm:self-center bg-emerald-950/60 border border-emerald-800/80 px-4 py-2 rounded-2xl text-center shrink-0 font-mono">
            <span className="block text-[10px] text-emerald-400 uppercase">REWARD</span>
            <span className="text-lg font-black text-white">+{report.xp || 50} XP</span>
          </div>
        </div>

        {/* Visible Features */}
        {report.features && report.features.length > 0 && (
          <div className="mb-5">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 mb-2">
              VISIBLE FEATURES
            </h4>
            <div className="flex flex-wrap gap-2">
              {report.features.map((f, i) => (
                <span 
                  key={i}
                  className="text-xs text-stone-300 bg-stone-900/80 border border-stone-800 px-3 py-1 rounded-xl"
                >
                  • {f}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Field Notes & Where To Look */}
        <div className="bg-stone-950/70 border border-stone-800/80 rounded-2xl p-5 mb-5 space-y-3 text-xs leading-relaxed">
          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase text-emerald-400 mb-1">
              FIELD NOTES
            </h4>
            <p className="text-stone-200 font-sans">
              {report.fieldNotes || report.fact || 'Botanical features analyzed locally using open-weight vision inference.'}
            </p>
          </div>

          {report.whereToLook && (
            <div className="pt-2 border-t border-stone-800/60">
              <h4 className="text-[10px] font-mono font-bold uppercase text-teal-400 mb-1">
                WHERE TO LOOK (HABITAT)
              </h4>
              <p className="text-stone-300 font-sans">
                {report.whereToLook}
              </p>
            </div>
          )}
        </div>

        {/* Observation Challenge */}
        {(report.observationChallenge || report.nextChallenge) && (
          <div className="bg-gradient-to-r from-emerald-950/40 via-stone-900/60 to-teal-950/40 border border-emerald-500/30 rounded-2xl p-5 mb-5 flex items-start gap-4">
            <div className="bg-emerald-500 p-2 rounded-xl text-stone-950 shrink-0 mt-0.5">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5">
                <span className="text-emerald-400">OBSERVATION CHALLENGE</span>
                <span className="text-emerald-300">+50 XP</span>
              </div>
              <p className="text-sm font-bold text-white leading-snug">
                {report.observationChallenge || report.nextChallenge}
              </p>
            </div>
          </div>
        )}

        {/* Plant Safety Note */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-950/30 border border-amber-900/40 text-[11px] text-amber-300/90 mb-6">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {report.safetyNote || 'AI identification is an estimate. Do not consume or handle a plant based solely on this result.'}
          </span>
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onStartChallenge}
            className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <span>START QUEST</span>
            <ArrowRight className="w-4 h-4 text-stone-950" />
          </button>

          <button
            onClick={onSaveCodex}
            disabled={isSaved}
            className={clsx(
              "w-full sm:flex-1 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer",
              isSaved
                ? "bg-stone-900 border-stone-800 text-emerald-400 cursor-default"
                : "bg-stone-900 hover:bg-stone-800 border-stone-700 text-stone-200"
            )}
          >
            {isSaved ? <CheckCircle className="w-4 h-4" /> : <BookOpen className="w-4 h-4 text-emerald-400" />}
            <span>{isSaved ? 'SAVED TO CODEX' : 'SAVE TO CODEX'}</span>
          </button>

          <button
            onClick={onScanAnother}
            className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-stone-950 hover:bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-mono font-bold uppercase cursor-pointer"
          >
            SCAN ANOTHER
          </button>
        </div>

      </div>
    </div>
  );
}
