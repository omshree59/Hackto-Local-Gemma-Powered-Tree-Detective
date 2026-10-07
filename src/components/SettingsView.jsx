import React, { useState } from 'react';
import { 
  Settings, Trash2, Download, RefreshCw, 
  ShieldCheck, Eye, EyeOff, CheckCircle, Database
} from 'lucide-react';

export default function SettingsView({
  onClearCodex,
  onResetProgress,
  onExportBackup
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-4xl mx-auto pb-12 font-sans select-none">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#1e3f2b]/60">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52] block mb-1">
          SYSTEM PREFERENCES
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
          Settings & Privacy Center
        </h2>
        <p className="text-sm text-[#91b79a] mt-1">
          Configure offline data storage, visual density, and privacy controls.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Privacy Center */}
        <section className="nature-surface-card border border-[#4f8a52]/50 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <ShieldCheck className="w-48 h-48 text-emerald-400" />
          </div>

          <div className="relative z-10">
            <h3 className="text-lg font-black text-[#f3f1e7] font-sans flex items-center gap-2 mb-2">
              YOUR DATA STAYS LOCAL
            </h3>
            <p className="text-sm text-[#91b79a] font-sans max-w-xl mb-6">
              NatureQuest is designed to protect your privacy and ensure offline availability. All data and processing happens on this device.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm mb-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#081a11]/80 border border-[#1e3f2b]">
                <span className="text-[#91b79a]">Photos</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> Local</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#081a11]/80 border border-[#1e3f2b]">
                <span className="text-[#91b79a]">Field Codex</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> Local</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#081a11]/80 border border-[#1e3f2b]">
                <span className="text-[#91b79a]">Progress</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> Local</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#081a11]/80 border border-[#1e3f2b]">
                <span className="text-[#91b79a]">AI Processing</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> Local</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0c2619]/50 border border-[#1e3f2b]/60 space-y-3 font-mono text-sm mb-8">
              <div className="flex items-center justify-between">
                <span className="text-[#d8c8a8]">Cloud uploads:</span>
                <span className="text-[#f3f1e7] font-bold">None</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#d8c8a8]">External AI:</span>
                <span className="text-[#f3f1e7] font-bold">None</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#1e3f2b]/50">
              {confirmClear ? (
                <div className="flex items-center gap-3 w-full sm:w-auto p-2 bg-[#123a27] rounded-xl border border-[#4f8a52]">
                  <span className="text-xs font-mono text-[#f3f1e7] pl-2 font-bold uppercase">Are you sure?</span>
                  <button
                    onClick={() => {
                      onClearCodex();
                      setConfirmClear(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase cursor-pointer"
                  >
                    Yes, Clear
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="px-4 py-2 rounded-lg bg-[#081a11] hover:bg-[#0c2619] text-[#91b79a] font-mono text-xs cursor-pointer border border-[#1e3f2b]"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClear(true)}
                  className="px-5 py-3 rounded-xl bg-[#0c2619] hover:bg-[#123a27] border border-[#1e3f2b] hover:border-amber-600/50 text-[#91b79a] hover:text-amber-400 text-xs font-mono font-bold uppercase flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>CLEAR LOCAL DATA</span>
                </button>
              )}

              {confirmReset ? (
                <div className="flex items-center gap-3 w-full sm:w-auto p-2 bg-rose-950/40 rounded-xl border border-rose-900/60">
                  <span className="text-xs font-mono text-rose-300 pl-2 font-bold uppercase">Reset entire app?</span>
                  <button
                    onClick={() => {
                      onResetProgress();
                      setConfirmReset(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase cursor-pointer"
                  >
                    Yes, Reset
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-4 py-2 rounded-lg bg-[#081a11] hover:bg-[#0c2619] text-[#91b79a] font-mono text-xs cursor-pointer border border-[#1e3f2b]"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="px-5 py-3 rounded-xl bg-[#0c2619] hover:bg-rose-950/40 border border-[#1e3f2b] hover:border-rose-900/60 text-[#91b79a] hover:text-rose-400 text-xs font-mono font-bold uppercase flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>RESET APPLICATION</span>
                </button>
              )}
            </div>
          </div>
        </section>
        
        {/* Appearance & Motion Section */}
        <section className="nature-surface-card border border-[#1e3f2b] rounded-3xl p-6 sm:p-8 space-y-5">
          <h3 className="text-base font-bold text-[#f3f1e7] font-mono flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#4f8a52]" />
            APPEARANCE & ACCESSIBILITY
          </h3>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#07170e] border border-[#1e3f2b]">
              <div>
                <span className="text-[#f3f1e7] font-bold block">Reduced Motion</span>
                <span className="text-[#91b79a] text-[11px] font-sans">Minimize background transitions and scanner animations</span>
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

      </div>

    </div>
  );
}
