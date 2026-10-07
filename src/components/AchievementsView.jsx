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
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 block mb-1">
          FIELD PROGRESSION
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          FIELD ACHIEVEMENTS
        </h2>
        <p className="text-sm text-stone-400 mt-1 font-sans">
          Milestones unlocked through real-world botanical curiosity and outdoor habits.
        </p>
      </div>

      {/* Top Progression Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 font-mono text-center">
        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
          <span className="text-[10px] text-stone-400 uppercase block mb-1">RANK TIER</span>
          <span className="text-xl font-black text-white">Tier {level}</span>
        </div>
        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
          <span className="text-[10px] text-stone-400 uppercase block mb-1">TOTAL XP</span>
          <span className="text-xl font-black text-emerald-400">{xp}</span>
        </div>
        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
          <span className="text-[10px] text-stone-400 uppercase block mb-1">PLANTS DISCOVERED</span>
          <span className="text-xl font-black text-teal-300">{history.length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
          <span className="text-[10px] text-stone-400 uppercase block mb-1">MISSIONS DONE</span>
          <span className="text-xl font-black text-white">{completedMissionsCount}</span>
        </div>
        <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 col-span-2 sm:col-span-1">
          <span className="text-[10px] text-stone-400 uppercase block mb-1">STREAK</span>
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
                "p-6 rounded-3xl border transition-all flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group",
                unlocked
                  ? "bg-stone-900/70 border-emerald-500/50 shadow-xl shadow-emerald-950/20"
                  : "bg-stone-900/30 border-stone-800/80 opacity-60 hover:opacity-80"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={clsx(
                    "p-3 rounded-2xl border transition-colors",
                    unlocked 
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" 
                      : "bg-stone-950 text-stone-600 border-stone-800"
                  )}>
                    <IconComp className="w-6 h-6" />
                  </div>

                  {unlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/80">
                      <CheckCircle className="w-3 h-3" /> UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-stone-300 bg-stone-950 px-2.5 py-1 rounded-full border border-stone-800">
                      LOCKED
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {ach.title}
                </h3>
                <p className="text-xs text-stone-400 font-sans leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="flex justify-between text-stone-400">
                  <span>PROGRESS</span>
                  <span className={unlocked ? "text-emerald-400 font-bold" : "text-stone-300"}>
                    {currentProgress} / {target}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-700" 
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
