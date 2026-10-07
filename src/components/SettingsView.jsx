import React, { useState } from 'react';
import { 
  Settings, Trash2, Download, RefreshCw, 
  ShieldCheck, Eye, EyeOff, CheckCircle
} from 'lucide-react';

export default function SettingsView({
  onClearCodex,
  onResetProgress,
  onExportBackup
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-4xl mx-auto pb-12 font-sans">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#1e3f2b]/60">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52] block mb-1">
          SYSTEM PREFERENCES
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
          SETTINGS
        </h2>
        <p className="text-sm text-[#91b79a] mt-1">
          Configure offline data storage, visual density, and privacy controls.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Appearance & Motion Section */}
        <section className="nature-surface-card border border-[#1e3f2b] rounded-3xl p-6 sm:p-8 space-y-5">
          <h3 className="text-base font-bold text-[#f3f1e7] font-mono flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#4f8a52]" />
            APPEARANCE & MOTION
          </h3>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#07170e] border border-[#1e3f2b]">
              <div>
                <span className="text-[#f3f1e7] font-bold block">Reduced Motion</span>
                <span className="text-[#91b79a] text-[11px] font-sans">Disable background laser scanner & particle animations</span>
              </div>
              <button
                onClick={() => setReducedMotion(prev => !prev)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${reducedMotion ? 'bg-[#4f8a52]' : 'bg-[#0d2619]'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-[#f3f1e7] absolute top-1 transition-transform ${reducedMotion ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#07170e] border border-[#1e3f2b]">
              <div>
                <span className="text-[#f3f1e7] font-bold block">Outdoor High-Contrast Reticle</span>
                <span className="text-[#91b79a] text-[11px] font-sans">Enhance card border visibility under direct trail sunlight</span>
              </div>
              <button
                onClick={() => setHighContrast(prev => !prev)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${highContrast ? 'bg-[#4f8a52]' : 'bg-[#0d2619]'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-[#f3f1e7] absolute top-1 transition-transform ${highContrast ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </section>

        {/* Local Storage & Data Management */}
        <section className="nature-surface-card border border-[#1e3f2b] rounded-3xl p-6 sm:p-8 space-y-5">
          <h3 className="text-base font-bold text-[#f3f1e7] font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4f8a52]" />
            LOCAL DATA & STORAGE
          </h3>

          <p className="text-xs text-[#91b79a] font-sans leading-relaxed">
            All discoveries, XP scores, and active quests are stored strictly in your browser's persistent WebStorage. No cloud backups or remote synchronizations occur.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExportBackup}
              className="px-5 py-3 rounded-xl nature-surface-subtle hover:bg-[#123a27]/80 border border-[#1e3f2b] text-[#d8c8a8] text-xs font-mono font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#4f8a52]" />
              <span>EXPORT CODEX BACKUP (JSON)</span>
            </button>

            <button
              onClick={onClearCodex}
              className="px-5 py-3 rounded-xl nature-surface-subtle hover:bg-[#123a27]/80 border border-[#1e3f2b] text-[#91b79a] text-xs font-mono font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-amber-400" />
              <span>CLEAR FIELD CODEX</span>
            </button>
          </div>
        </section>

        {/* Danger Zone: Reset Everything */}
        <section className="bg-rose-950/20 border border-rose-900/40 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-rose-300 font-mono">
            RESET EXPEDITION DATA
          </h3>
          <p className="text-xs text-[#91b79a] font-sans leading-relaxed">
            Reset all XP, level ranks, quest completions, and stored discoveries back to initial defaults. This action cannot be undone.
          </p>

          {confirmReset ? (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase cursor-pointer"
              >
                CONFIRM RESET
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-4 py-2.5 rounded-xl nature-surface-subtle text-[#91b79a] font-mono text-xs cursor-pointer border border-[#1e3f2b]"
              >
                CANCEL
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="px-5 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-900/60 text-rose-300 font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
            >
              RESET ALL PROGRESS
            </button>
          )}
        </section>

      </div>

    </div>
  );
}
