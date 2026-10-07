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
      <div className="pb-6 border-b border-stone-800">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 block mb-1">
          SYSTEM PREFERENCES
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          SETTINGS
        </h2>
        <p className="text-sm text-stone-400 mt-1">
          Configure offline data storage, visual density, and privacy controls.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Appearance & Motion Section */}
        <section className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-5">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            APPEARANCE & MOTION
          </h3>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800">
              <div>
                <span className="text-stone-200 font-bold block">Reduced Motion</span>
                <span className="text-stone-400 text-[11px] font-sans">Disable background laser scanner & particle animations</span>
              </div>
              <button
                onClick={() => setReducedMotion(prev => !prev)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${reducedMotion ? 'bg-emerald-500' : 'bg-stone-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-stone-950 absolute top-1 transition-transform ${reducedMotion ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800">
              <div>
                <span className="text-stone-200 font-bold block">Outdoor High-Contrast Reticle</span>
                <span className="text-stone-400 text-[11px] font-sans">Enhance card border visibility under direct trail sunlight</span>
              </div>
              <button
                onClick={() => setHighContrast(prev => !prev)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${highContrast ? 'bg-emerald-500' : 'bg-stone-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-stone-950 absolute top-1 transition-transform ${highContrast ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </section>

        {/* Local Storage & Data Management */}
        <section className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-5">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            LOCAL DATA & STORAGE
          </h3>

          <p className="text-xs text-stone-400 font-sans leading-relaxed">
            All discoveries, XP scores, and active quests are stored strictly in your browser's persistent WebStorage. No cloud backups or remote synchronizations occur.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExportBackup}
              className="px-5 py-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>EXPORT CODEX BACKUP (JSON)</span>
            </button>

            <button
              onClick={onClearCodex}
              className="px-5 py-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer"
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
          <p className="text-xs text-stone-400 font-sans leading-relaxed">
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
                className="px-4 py-2.5 rounded-xl bg-stone-900 text-stone-300 font-mono text-xs cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-rose-950 border border-rose-900/60 text-rose-300 font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
            >
              RESET ALL PROGRESS
            </button>
          )}
        </section>

      </div>

    </div>
  );
}
