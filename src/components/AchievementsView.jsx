import React from 'react';
import { 
  Award, Leaf, Compass, Target, Eye, 
  ShieldCheck, BookOpen, CheckCircle, Trophy
} from 'lucide-react';
import clsx from 'clsx';
import { ACHIEVEMENTS_LIST } from '../data/natureData';

const ICON_MAP = {
  Leaf, Compass, Target, Eye, ShieldCheck, BookOpen, Trophy
};

export default function AchievementsView({
  history,
  xp,
  level,
  completedMissionsCount = 4,
  streak = 3
}) {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#1e3f2b]/60">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52] block mb-1">
          FIELD PROGRESSION
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
          FIELD ACHIEVEMENTS
        </h2>
        <p className="text-sm text-[#91b79a] mt-1 font-sans">
          Milestones unlocked through real-world botanical curiosity and outdoor habits.
        </p>
      </div>

      {/* Top Progression Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-mono text-center">
        <div className="p-4 rounded-2xl nature-surface-card border border-[#1e3f2b]">
          <span className="text-[10px] text-[#91b79a] uppercase block mb-1">RANK TIER</span>
          <span className="text-xl font-black text-[#f3f1e7]">Tier {level}</span>
        </div>
        <div className="p-4 rounded-2xl nature-surface-card border border-[#1e3f2b]">
          <span className="text-[10px] text-[#91b79a] uppercase block mb-1">TOTAL XP</span>
          <span className="text-xl font-black text-[#4f8a52]">{xp}</span>
        </div>
        <div className="p-4 rounded-2xl nature-surface-card border border-[#1e3f2b]">
          <span className="text-[10px] text-[#91b79a] uppercase block mb-1">PLANTS DISCOVERED</span>
          <span className="text-xl font-black text-[#d8c8a8]">{history.length}</span>
        </div>
        <div className="p-4 rounded-2xl nature-surface-card border border-[#1e3f2b]">
          <span className="text-[10px] text-[#91b79a] uppercase block mb-1">MISSIONS DONE</span>
          <span className="text-xl font-black text-[#f3f1e7]">{completedMissionsCount}</span>
        </div>
        <div className="p-4 rounded-2xl nature-surface-card border border-[#1e3f2b] col-span-2 sm:col-span-1">
          <span className="text-[10px] text-[#91b79a] uppercase block mb-1">STREAK</span>
          <span className="text-xl font-black text-amber-400">{streak} Days</span>
        </div>
      </div>

      {/* Achievement Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS_LIST.map((ach) => {
          const IconComp = ICON_MAP[ach.icon] || Award;
          const unlocked = ach.isUnlocked(history, completedMissionsCount);
          const currentProgress = ach.progress(history, completedMissionsCount);
          const target = ach.target;
          const pct = Math.min((currentProgress / target) * 100, 100);

          return (
            <div
              key={ach.id}
              className={clsx(
                "p-6 rounded-3xl border transition-all flex flex-col justify-between relative overflow-hidden group",
                unlocked
                  ? "nature-surface-card border-[#4f8a52]/60 shadow-xl shadow-[#0c2619]/40"
                  : "nature-surface-subtle border-[#1e3f2b]/50 opacity-70 hover:opacity-90"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={clsx(
                    "p-3 rounded-2xl border transition-colors",
                    unlocked 
                      ? "bg-[#0c2619] text-[#4f8a52] border-[#4f8a52]/40" 
                      : "bg-[#06140c] text-[#91b79a]/50 border-[#1e3f2b]"
                  )}>
                    <IconComp className="w-6 h-6" />
                  </div>

                  {unlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-[#4f8a52] bg-[#0c2619] px-2.5 py-1 rounded-full border border-[#4f8a52]">
                      <CheckCircle className="w-3 h-3" /> UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-[#91b79a] bg-[#06140c] px-2.5 py-1 rounded-full border border-[#1e3f2b]">
                      LOCKED
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#f3f1e7] mb-1">
                  {ach.title}
                </h3>
                <p className="text-xs text-[#91b79a] font-sans leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between text-[#91b79a]">
                  <span>PROGRESS</span>
                  <span className={unlocked ? "text-[#4f8a52] font-bold" : "text-[#d8c8a8]"}>
                    {currentProgress} / {target}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#06140c] rounded-full overflow-hidden border border-[#1e3f2b]">
                  <div 
                    className="h-full bg-[#4f8a52] transition-all duration-700" 
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
