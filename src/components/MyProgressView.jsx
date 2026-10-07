import React from 'react';
import { 
  Activity, Clock, Leaf, Target, Award, 
  BookOpen, Footprints, Flame, CheckCircle, 
  Map
} from 'lucide-react';
import clsx from 'clsx';

export default function MyProgressView({
  history,
  xp,
  level,
  outdoorMinutes = 45,
  completedMissionsCount = 4,
  trailsCompleted = 0,
  streak = 3,
  longestStreak = 5
}) {
  const categoriesCount = {
    Tree: history.filter(h => (h.category || '').toLowerCase() === 'tree').length,
    Flower: history.filter(h => (h.category || '').toLowerCase() === 'flower').length,
    Plant: history.filter(h => !['tree', 'flower'].includes((h.category || '').toLowerCase())).length
  };

  const totalDiscovered = history.length;
  
  // Fake calculation for Biodiversity score based on discoveries
  const uniqueCount = Math.min(totalDiscovered * 4, 100);
  const biodiversityScore = Math.min(Math.floor((categoriesCount.Tree * 15 + categoriesCount.Flower * 10 + categoriesCount.Plant * 5) * 1.2), 100);
  const categoriesExplored = [categoriesCount.Tree > 0, categoriesCount.Flower > 0, categoriesCount.Plant > 0, history.some(h => (h.category || '').toLowerCase().includes('leaf'))].filter(Boolean).length;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans select-none">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#1e3f2b]/60">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52] block mb-1">
          PERSONAL REFLECTION
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
          My Progress
        </h2>
        <p className="text-sm text-[#91b79a] mt-1 max-w-2xl">
          Simple field metrics reflecting real-world time spent discovering plants outside. The goal is to spend less time on the screen and more time exploring.
        </p>
      </div>

      {/* ============================================================== */}
      {/* FIELD PASSPORT */}
      {/* ============================================================== */}
      <section className="nature-surface-card border border-[#4f8a52]/30 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 pointer-events-none">
          <Award className="w-96 h-96 text-emerald-400" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#91b79a] block mb-2">
                OFFICIAL RECORD
              </span>
              <h3 className="text-4xl font-black text-[#f3f1e7] flex items-center gap-3">
                Field Passport
              </h3>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-[#91b79a] uppercase mb-1">Rank</div>
              <div className="text-2xl font-black text-emerald-400">Tier {level} Naturalist</div>
              <div className="text-sm font-mono text-[#f3f1e7] mt-1">{xp} XP Total</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 font-mono text-sm border-t border-[#1e3f2b]/50 pt-8 mb-8">
            <div>
              <div className="text-[10px] text-[#91b79a] mb-1">PLANTS</div>
              <div className="text-2xl font-black text-[#f3f1e7]">{totalDiscovered}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#91b79a] mb-1">QUESTS</div>
              <div className="text-2xl font-black text-[#f3f1e7]">{completedMissionsCount}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#91b79a] mb-1">TRAILS</div>
              <div className="text-2xl font-black text-[#f3f1e7]">{trailsCompleted}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#91b79a] mb-1">MINUTES OUT</div>
              <div className="text-2xl font-black text-[#f3f1e7]">{outdoorMinutes}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#91b79a] mb-1">STREAK</div>
              <div className="text-2xl font-black text-amber-400">{streak}</div>
            </div>
            <div>
              <div className="text-[10px] text-[#91b79a] mb-1">MAX STREAK</div>
              <div className="text-2xl font-black text-[#f3f1e7]">{longestStreak}</div>
            </div>
          </div>

          <div className="border-t border-[#1e3f2b]/50 pt-6">
            <span className="text-[10px] text-[#91b79a] uppercase tracking-widest block mb-4">DISCOVERY STAMPS</span>
            <div className="flex flex-wrap gap-4">
              <div className={clsx("w-20 h-20 rounded-full border-4 flex items-center justify-center font-black uppercase text-xs rotate-[-5deg]", categoriesCount.Tree > 0 ? "border-emerald-600/60 text-emerald-500/80" : "border-[#1e3f2b]/40 text-[#1e3f2b]/40")}>
                TREE
              </div>
              <div className={clsx("w-20 h-20 rounded-full border-4 flex items-center justify-center font-black uppercase text-xs rotate-[12deg]", categoriesCount.Flower > 0 ? "border-rose-600/60 text-rose-500/80" : "border-[#1e3f2b]/40 text-[#1e3f2b]/40")}>
                FLOWER
              </div>
              <div className={clsx("w-20 h-20 rounded-full border-4 flex items-center justify-center font-black uppercase text-xs rotate-[4deg]", history.length > 0 ? "border-amber-600/60 text-amber-500/80" : "border-[#1e3f2b]/40 text-[#1e3f2b]/40")}>
                LEAF
              </div>
              <div className={clsx("w-20 h-20 rounded-full border-4 flex items-center justify-center font-black uppercase text-xs rotate-[-15deg]", categoriesCount.Plant > 0 ? "border-indigo-600/60 text-indigo-500/80" : "border-[#1e3f2b]/40 text-[#1e3f2b]/40")}>
                PLANT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* BIODIVERSITY PROFILE */}
      {/* ============================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 nature-surface-card rounded-[2rem] p-8 border border-[#1e3f2b]/60">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#91b79a] block mb-6">
            YOUR EXPLORATION PROFILE
          </span>
          
          <div className="space-y-6 font-mono text-xs">
            <div className="flex justify-between items-end border-b border-[#1e3f2b]/50 pb-2">
              <span className="text-[#f3f1e7] text-base">Trees</span>
              <span className="text-emerald-400 text-xl font-black">{categoriesCount.Tree}</span>
            </div>
            <div className="flex justify-between items-end border-b border-[#1e3f2b]/50 pb-2">
              <span className="text-[#f3f1e7] text-base">Flowers</span>
              <span className="text-emerald-400 text-xl font-black">{categoriesCount.Flower}</span>
            </div>
            <div className="flex justify-between items-end border-b border-[#1e3f2b]/50 pb-2">
              <span className="text-[#f3f1e7] text-base">Other plants</span>
              <span className="text-emerald-400 text-xl font-black">{categoriesCount.Plant}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1e3f2b]/40 flex items-center justify-between font-mono text-sm">
            <div className="text-[#91b79a]">Categories explored:</div>
            <div className="text-[#f3f1e7] font-bold">{categoriesExplored} / 8</div>
          </div>
        </div>

        <div className="md:col-span-5 nature-surface-card rounded-[2rem] p-8 border border-[#1e3f2b]/60 flex flex-col justify-center items-center text-center">
          <div className="w-32 h-32 rounded-full border-8 border-[#0c2619] flex items-center justify-center mb-6 relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="56" fill="none" stroke="#1e3f2b" strokeWidth="8" />
              <circle 
                cx="60" cy="60" r="56" fill="none" stroke="#4f8a52" strokeWidth="8" 
                strokeDasharray="351.8" 
                strokeDashoffset={351.8 - (351.8 * biodiversityScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="text-4xl font-black text-[#f3f1e7]">{biodiversityScore}</span>
          </div>
          <h4 className="text-lg font-bold text-[#f3f1e7] mb-1">Biodiversity</h4>
          <span className="text-[10px] font-sans text-[#91b79a] uppercase tracking-wider">
            Personal exploration score
          </span>
          <p className="text-[10px] text-[#91b79a]/60 mt-4 max-w-[200px] leading-tight">
            *This is a personal metric to encourage exploration, not a scientific measurement of the local ecosystem.
          </p>
        </div>
      </section>

    </div>
  );
}
