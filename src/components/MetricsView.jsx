import React from 'react';
import { 
  Trophy, Clock, Footprints, Compass, Leaf, Sparkles, 
  WifiOff, Award, CheckCircle, ShieldCheck, Flame, Layers
} from 'lucide-react';
import clsx from 'clsx';
import { BADGES } from '../data/datasets';

const ICON_MAP = {
  Footprints, Compass, Leaf, Sparkles, WifiOff, Trophy
};

export default function MetricsView({
  history,
  xp,
  level,
  outdoorMinutes = 45,
  completedMissionsCount = 4,
  streak = 3,
  longestStreak = 5
}) {
  const uniqueCategories = new Set(history.map(h => (h.category || '').toUpperCase()));

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400">
            FIELD ACTIVITY METRICS
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
          OUTDOOR MILESTONES
        </h2>
        <p className="text-sm text-stone-400 mt-1 font-sans">
          Curated metrics focused on real-world exploration rather than screen time.
        </p>
      </div>

      {/* Primary Outdoor Activity Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Outdoor Minutes */}
        <div className="bg-gradient-to-br from-stone-900/60 to-[#070a07] border border-stone-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-300 block mb-2">
              OUTDOOR MINUTES
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                {outdoorMinutes}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">MIN</span>
            </div>
          </div>
          <span className="text-[11px] text-stone-300 mt-4 block">
            Time spent disconnected on trails
          </span>
        </div>

        {/* Metric 2: Field Discoveries */}
        <div className="bg-gradient-to-br from-stone-900/60 to-[#070a07] border border-stone-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-300 block mb-2">
              FIELD DISCOVERIES
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight">
                {history.length}
              </span>
              <span className="text-xs font-mono text-stone-300 font-bold">LOGGED</span>
            </div>
          </div>
          <span className="text-[11px] text-stone-300 mt-4 block">
            Specimens verified via Gemma 3
          </span>
        </div>

        {/* Metric 3: Missions Completed */}
        <div className="bg-gradient-to-br from-stone-900/60 to-[#070a07] border border-stone-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-300 block mb-2">
              MISSIONS COMPLETED
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-mono text-teal-300 tracking-tight">
                {completedMissionsCount}
              </span>
              <span className="text-xs font-mono text-stone-300 font-bold">TASKS</span>
            </div>
          </div>
          <span className="text-[11px] text-stone-300 mt-4 block">
            Realized outdoor exploration quests
          </span>
        </div>

        {/* Metric 4: Outdoor Streak */}
        <div className="bg-gradient-to-br from-stone-900/60 to-[#070a07] border border-stone-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-300 block mb-2">
              OUTDOOR STREAK
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-mono text-amber-400 tracking-tight">
                {streak}
              </span>
              <span className="text-xs font-mono text-amber-300 font-bold">DAYS</span>
            </div>
          </div>
          <span className="text-[11px] text-stone-300 mt-4 block">
            Longest record: {longestStreak} consecutive days
          </span>
        </div>

      </div>

      {/* Explorer Progression & Categories Explored */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Level Progression */}
        <div className="lg:col-span-5 bg-stone-900/50 border border-stone-800 rounded-[2.5rem] p-7 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              RANGER TIER PROGRESSION
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {xp} TOTAL XP
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-stone-950/70 border border-stone-800 text-center space-y-2">
            <span className="text-[10px] font-mono text-stone-300 uppercase tracking-widest block">
              CURRENT FIELD RANK
            </span>
            <h3 className="text-2xl font-black text-white">
              Tier {level} Field Naturalist
            </h3>
            <p className="text-xs text-stone-300 font-sans">
              Awarded for active biological surveying on untamed paths.
            </p>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between text-stone-400">
              <span>Next Rank: Tier {level + 1}</span>
              <span className="text-emerald-400 font-bold">{200 - (xp % 200)} XP Remaining</span>
            </div>
            <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-800">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                style={{ width: `${((xp % 200) / 200) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Explored Biodiversity Categories */}
        <div className="lg:col-span-7 bg-stone-900/50 border border-stone-800 rounded-[2.5rem] p-7 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              EXPLORED BIODIVERSITY CATEGORIES
            </span>
            <span className="text-xs font-mono text-teal-400 font-bold">
              {uniqueCategories.size} / 5 FAMILIES
            </span>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Trees & Forest Canopy', key: 'TREE', max: 6 },
              { label: 'Wildflowers & Flora', key: 'FLOWER', max: 6 },
              { label: 'Insects & Pollinators', key: 'INSECT', max: 6 },
              { label: 'Avian Species & Feathers', key: 'BIRD', max: 6 },
              { label: 'Rocks & Minerals', key: 'ROCK', max: 6 }
            ].map(cat => {
              const count = history.filter(h => (h.category || '').toUpperCase() === cat.key).length;
              const pct = Math.min((count / cat.max) * 100, 100);

              return (
                <div key={cat.key} className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-stone-300">
                    <span>{cat.label}</span>
                    <span className="text-stone-300">{count} / {cat.max} logged</span>
                  </div>
                  <div className="h-2 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-800">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Achievement Badges Grid */}
      <section className="bg-stone-900/40 border border-stone-800 rounded-[2.5rem] p-8 sm:p-10 backdrop-blur-xl shadow-xl">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400">
              EXPLORER FIELD HONORS
            </span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight mt-1">
            ACHIEVEMENT BADGES
          </h3>
          <p className="text-xs text-stone-400 mt-1 font-sans">
            Unlocked through real observation habits and outdoor curiosity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BADGES.map((b) => {
            const IconComp = ICON_MAP[b.icon] || Trophy;
            const isUnlocked = b.condition(history, xp, completedMissionsCount, streak);

            return (
              <div
                key={b.id}
                className={clsx(
                  "p-5 rounded-2xl border transition-all flex items-start gap-4 backdrop-blur-sm",
                  isUnlocked
                    ? "bg-stone-950/80 border-emerald-500/50 shadow-lg shadow-emerald-950/20"
                    : "bg-stone-950/30 border-stone-800/80 opacity-50"
                )}
              >
                <div className={clsx(
                  "p-3 rounded-xl shrink-0 border",
                  isUnlocked 
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" 
                    : "bg-stone-900 text-stone-600 border-stone-800"
                )}>
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h5 className="text-xs font-black font-mono tracking-wider text-white truncate">
                      {b.title}
                    </h5>
                    {isUnlocked && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </div>
                  <p className="text-xs text-stone-400 font-sans leading-snug">
                    {b.subtitle}
                  </p>
                  <span className={clsx(
                    "text-[10px] font-mono font-bold tracking-widest uppercase block mt-2",
                    isUnlocked ? "text-emerald-400" : "text-stone-600"
                  )}>
                    {isUnlocked ? "HONOR UNLOCKED" : "LOCKED"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
