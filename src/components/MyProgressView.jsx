import React from 'react';
import { 
  Activity, Clock, Leaf, Target, Award, 
  BookOpen, Footprints, Flame, CheckCircle
} from 'lucide-react';

export default function MyProgressView({
  history,
  xp,
  level,
  outdoorMinutes = 45,
  completedMissionsCount = 4,
  streak = 3,
  longestStreak = 5
}) {
  const categoriesCount = {
    Tree: history.filter(h => (h.category || '').toLowerCase() === 'tree').length,
    Flower: history.filter(h => (h.category || '').toLowerCase() === 'flower').length,
    Plant: history.filter(h => !['tree', 'flower'].includes((h.category || '').toLowerCase())).length
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#1e3f2b]/60">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52] block mb-1">
          PERSONAL REFLECTION
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
          MY PROGRESS
        </h2>
        <p className="text-sm text-[#91b79a] mt-1">
          Simple field metrics reflecting real-world time spent discovering plants outside.
        </p>
      </div>

      {/* Main Bento Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 font-mono">
        
        <div className="nature-surface-card border border-[#1e3f2b] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[#91b79a] uppercase tracking-wider block mb-2">OUTDOOR MINUTES</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[#f3f1e7]">{outdoorMinutes}</span>
              <span className="text-xs text-[#4f8a52] font-bold">MIN</span>
            </div>
          </div>
          <p className="text-[11px] text-[#91b79a] font-sans mt-4">
            Unplugged trail exploration
          </p>
        </div>

        <div className="nature-surface-card border border-[#1e3f2b] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[#91b79a] uppercase tracking-wider block mb-2">PLANTS LOGGED</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[#4f8a52]">{history.length}</span>
              <span className="text-xs text-[#d8c8a8] font-bold">SPECIES</span>
            </div>
          </div>
          <p className="text-[11px] text-[#91b79a] font-sans mt-4">
            Verified local field entries
          </p>
        </div>

        <div className="nature-surface-card border border-[#1e3f2b] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[#91b79a] uppercase tracking-wider block mb-2">QUESTS COMPLETED</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-[#d8c8a8]">{completedMissionsCount}</span>
              <span className="text-xs text-[#91b79a] font-bold">MISSIONS</span>
            </div>
          </div>
          <p className="text-[11px] text-[#91b79a] font-sans mt-4">
            Finished sensory quests
          </p>
        </div>

        <div className="nature-surface-card border border-[#1e3f2b] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[#91b79a] uppercase tracking-wider block mb-2">ACTIVE STREAK</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-amber-400">{streak}</span>
              <span className="text-xs text-amber-300 font-bold">DAYS</span>
            </div>
          </div>
          <p className="text-[11px] text-[#91b79a] font-sans mt-4">
            Longest recorded: {longestStreak} days
          </p>
        </div>

      </div>

      {/* Breakdown: Botanical Families Surveyed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-6 nature-surface-card border border-[#1e3f2b] rounded-[2rem] p-7 space-y-6">
          <h3 className="text-base font-bold text-[#f3f1e7] font-mono flex items-center gap-2">
            <Leaf className="w-4 h-4 text-[#4f8a52]" />
            BOTANICAL CATEGORY RATIOS
          </h3>

          <div className="space-y-4 font-mono text-xs">
            {[
              { name: 'Trees & Woody Shrubs', count: categoriesCount.Tree, max: 10, color: 'from-[#4f8a52] to-[#91b79a]' },
              { name: 'Wildflowers & Blossoms', count: categoriesCount.Flower, max: 10, color: 'from-[#91b79a] to-[#d8c8a8]' },
              { name: 'Herbaceous Plants & Ferns', count: categoriesCount.Plant, max: 10, color: 'from-[#315c3b] to-[#4f8a52]' }
            ].map(cat => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-[#f3f1e7]">
                  <span>{cat.name}</span>
                  <span className="text-[#91b79a]">{cat.count} recorded</span>
                </div>
                <div className="h-2 w-full bg-[#06140c] rounded-full overflow-hidden border border-[#1e3f2b]">
                  <div 
                    className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-700`}
                    style={{ width: `${Math.min((cat.count / cat.max) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 nature-surface-card border border-[#1e3f2b] rounded-[2rem] p-7 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#4f8a52] block mb-1">
              EXPEDITION PHILOSOPHY
            </span>
            <h3 className="text-lg font-bold text-[#f3f1e7] leading-snug">
              "The screen is the tool. The outdoors is the product."
            </h3>
            <p className="text-xs text-[#91b79a] font-sans leading-relaxed mt-2">
              NatureQuest does not track your screen time to keep you hooked. Every metric here measures your transition away from digital noise into physical botanical reality.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#06140c]/90 border border-[#1e3f2b] font-mono text-xs space-y-1">
            <div className="flex justify-between text-[#f3f1e7]">
              <span>CURRENT EXPEDITION TIER:</span>
              <span className="text-[#4f8a52] font-bold">Tier {level} Naturalist</span>
            </div>
            <div className="flex justify-between text-[#91b79a]">
              <span>FIELD CODEX ENTRIES:</span>
              <span>{history.length} Records</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
