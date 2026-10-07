import React from 'react';
import { 
  CheckCircle, AlertTriangle, ArrowRight, BookOpen, 
  Leaf, Trees, Flower, RefreshCw, Compass, Eye, HeartPulse
} from 'lucide-react';
import clsx from 'clsx';

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
    <div className="fixed inset-0 z-50 bg-[#040e08]/92 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300 font-sans select-none py-12">
      
      <div className="relative w-full max-w-2xl nature-surface-card rounded-[2.5rem] p-6 sm:p-9 shadow-[0_20px_80px_rgba(0,0,0,0.85)] my-auto">
        
        {/* Header Eyebrow */}
        <div className="flex items-center justify-between border-b border-[#1e3f2b]/40 pb-4 mb-6 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-bold uppercase tracking-wider text-emerald-300">
              FIELD IDENTIFICATION REPORT
            </span>
          </div>

          <span className="text-[#f3f1e7] bg-[#0c2417] px-3 py-1 rounded-full border border-[#315c3b]/60">
            CONFIDENCE: {report.confidence || 'MODERATE'}
          </span>
        </div>

        {/* Hero Plant Photograph Section (Visual Hero) */}
        <div className="relative rounded-2xl overflow-hidden aspect-video max-h-[260px] w-full bg-[#07160f] border border-[#1e3f2b] shadow-xl mb-6">
          {imagePreviewUrl ? (
            <img 
              src={imagePreviewUrl} 
              alt="Identified Specimen" 
              className="w-full h-full object-cover filter brightness-95"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-emerald-400 bg-[#0a1e14]">
              <IconComp className="w-12 h-12" />
            </div>
          )}

          <div className="absolute top-3 left-3 bg-[#06120b]/85 backdrop-blur-md px-3 py-1 rounded-lg border border-[#1e3f2b]/60 flex items-center gap-1.5 text-[10px] font-mono text-[#91b79a]">
            <IconComp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="uppercase font-bold">{report.category || 'PLANT'}</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-[#06120b]/85 backdrop-blur-md px-3 py-1 rounded-lg border border-[#1e3f2b]/60 font-mono text-xs text-emerald-300 font-bold">
            +{report.xp || 50} XP DISCOVERY
          </div>
        </div>

        {/* Identification Heading */}
        <div className="mb-6">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#91b79a]">
            LIKELY IDENTIFICATION
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#f3f1e7] tracking-tight mt-0.5 leading-tight">
            {report.name || report.identification || 'Wild Flora Specimen'}
          </h3>
        </div>

        {/* WHY THIS MATCH? (Visual Reasoning) */}
        {report.visualEvidence && report.visualEvidence.length > 0 && (
          <div className="mb-5 bg-[#0a1e14]/50 border border-[#1e3f2b]/40 rounded-2xl p-4">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#91b79a] mb-3 flex items-center gap-1.5">
              <Eye className="w-3 h-3 text-emerald-400" /> WHY THIS MATCH?
            </h4>
            <div className="space-y-1.5 font-sans text-xs text-[#d8c8a8]">
              {report.visualEvidence.map((ev, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5 font-bold">✓</span>
                  <span>{ev}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLANT CONDITION */}
        {report.plantCondition && (
          <div className="mb-5 bg-[#0a1e14]/50 border border-[#1e3f2b]/40 rounded-2xl p-4">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#91b79a] mb-2 flex items-center gap-1.5">
              <HeartPulse className="w-3 h-3 text-amber-400" /> PLANT CONDITION
            </h4>
            <p className="font-sans text-sm text-[#f3f1e7] leading-relaxed mb-1">{report.plantCondition}</p>
            <p className="text-[9px] font-mono text-[#91b79a]/70">Visual estimate only. This is not a scientific diagnosis.</p>
          </div>
        )}

        {/* Field Notes */}
        <div className="mb-5 bg-[#0a1e14]/50 border border-[#1e3f2b]/40 rounded-2xl p-4">
          <h4 className="text-[10px] font-mono font-bold uppercase text-emerald-400 mb-2">
            FIELD NOTES
          </h4>
          <p className="text-[#d8c8a8] font-sans text-xs leading-relaxed">
            {report.fieldNotes || 'Botanical features analyzed locally using open-weight vision inference.'}
          </p>
        </div>

        {/* WHAT TO OBSERVE NEXT */}
        {report.whatToObserveNext && report.whatToObserveNext.length > 0 && (
          <div className="mb-6 border-l-2 border-emerald-500 pl-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#f3f1e7] mb-2">
              WHAT TO OBSERVE NEXT
            </h4>
            <ul className="space-y-2 font-sans text-sm text-[#d8c8a8]">
              {report.whatToObserveNext.map((obs, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">{i + 1}.</span>
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Observation Challenge */}
        {(report.observationChallenge || report.nextChallenge) && (
          <div className="bg-gradient-to-r from-[#123a27]/60 to-[#0e2c1d]/60 border border-[#315c3b]/60 rounded-2xl p-5 mb-5 flex items-start gap-4 shadow-lg">
            <div className="bg-[#245336] p-2 rounded-xl text-[#f3f1e7] shrink-0 mt-0.5 border border-[#4f8a52]/40">
              <Compass className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5">
                <span className="text-emerald-300">OBSERVATION CHALLENGE</span>
                <span className="text-[#91b79a]">+50 XP</span>
              </div>
              <p className="text-sm font-bold text-[#f3f1e7] leading-snug">
                {report.observationChallenge || report.nextChallenge}
              </p>
            </div>
          </div>
        )}

        {/* Plant Safety Note */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-[11px] text-amber-200/90 mb-6 font-sans">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {report.safetyNote || 'AI identification is an estimate. Do not consume or handle a plant based solely on this result.'}
          </span>
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 font-mono">
          <button
            onClick={onStartChallenge}
            className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#245336] hover:bg-[#2d6844] active:scale-95 text-[#f3f1e7] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-black/30 border border-[#4f8a52]/40 cursor-pointer transition-all"
          >
            <span>START QUEST</span>
            <ArrowRight className="w-4 h-4 text-[#f3f1e7]" />
          </button>

          <button
            onClick={onSaveCodex}
            disabled={isSaved}
            className={clsx(
              "w-full sm:flex-1 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all cursor-pointer",
              isSaved
                ? "bg-[#0c2417] border-[#1e3f2b] text-emerald-300 cursor-default"
                : "bg-[#081a11] hover:bg-[#0e2c1d] border-[#1e3f2b] text-[#f3f1e7]"
            )}
          >
            {isSaved ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <BookOpen className="w-4 h-4 text-emerald-300" />}
            <span>{isSaved ? 'SAVED TO CODEX' : 'SAVE TO CODEX'}</span>
          </button>

          <button
            onClick={onScanAnother}
            className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-[#06140d] hover:bg-[#0a2015] border border-[#1e3f2b] text-[#91b79a] hover:text-[#f3f1e7] text-xs font-bold uppercase cursor-pointer transition-colors"
          >
            SCAN ANOTHER
          </button>
        </div>

      </div>
    </div>
  );
}
