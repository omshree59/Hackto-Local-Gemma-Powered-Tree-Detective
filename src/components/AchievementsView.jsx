import React, { useState } from 'react';
import { 
  Award, Leaf, Compass, Target, Eye, 
  ShieldCheck, BookOpen, CheckCircle, Trophy,
  Camera, Sparkles, Trees, Flower, Lock, Check
} from 'lucide-react';
import clsx from 'clsx';
import { ACHIEVEMENTS_LIST, POPULAR_MILESTONE_SPECIES, getMilestoneStatus } from '../data/natureData';

const ICON_MAP = {
  Leaf, Compass, Target, Eye, ShieldCheck, BookOpen, Trophy
};

const CATEGORY_ICONS = {
  Tree: Trees,
  Flower: Flower,
  Plant: Leaf
};

export default function AchievementsView({
  history = [],
  xp = 0,
  level = 1,
  completedMissionsCount = 0,
  streak = 0,
  onOpenScanner
}) {
  const [activeTab, setActiveTab] = useState('SPECIES'); // 'SPECIES' or 'BADGES'
  const [speciesFilter, setSpeciesFilter] = useState('ALL');

  // Compute satisfied milestone species based on real user photos in history
  const milestoneStatuses = POPULAR_MILESTONE_SPECIES.map(species => ({
    ...species,
    ...getMilestoneStatus(species, history)
  }));

  const satisfiedCount = milestoneStatuses.filter(s => s.isSatisfied).length;
  const totalCount = POPULAR_MILESTONE_SPECIES.length;
  const speciesProgressPct = Math.round((satisfiedCount / totalCount) * 100);

  const filteredMilestones = milestoneStatuses.filter(item => {
    if (speciesFilter === 'SATISFIED') return item.isSatisfied;
    if (speciesFilter === 'UNDISCOVERED') return !item.isSatisfied;
    if (speciesFilter === 'TREES') return item.category === 'Tree';
    if (speciesFilter === 'FLOWERS') return item.category === 'Flower';
    if (speciesFilter === 'PLANTS') return item.category === 'Plant';
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans select-none">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#1e3f2b]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52] block mb-1">
            FIELD MILESTONES & ACHIEVEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
            Species Milestones & Badges
          </h2>
          <p className="text-sm text-[#91b79a] mt-1 font-sans">
            Track popular outdoor species and satisfy milestones only when you photograph them outside.
          </p>
        </div>

        {onOpenScanner && (
          <button
            onClick={onOpenScanner}
            className="self-start sm:self-auto px-5 py-3 rounded-2xl bg-[#245336] hover:bg-[#2d6844] text-[#f3f1e7] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border border-[#4f8a52]/40 shadow-lg cursor-pointer transition-all active:scale-95"
          >
            <Camera className="w-4 h-4 text-emerald-300" />
            <span>SCAN A SPECIES</span>
          </button>
        )}
      </div>

      {/* Top Progression Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 font-mono text-center">
        <div className="p-3.5 rounded-2xl nature-surface-card border border-[#1e3f2b]">
          <span className="text-[9px] text-[#91b79a] uppercase block mb-1">RANK TIER</span>
          <span className="text-lg font-black text-[#f3f1e7]">Tier {level}</span>
        </div>
        <div className="p-3.5 rounded-2xl nature-surface-card border border-[#1e3f2b]">
          <span className="text-[9px] text-[#91b79a] uppercase block mb-1">TOTAL XP</span>
          <span className="text-lg font-black text-emerald-300">{xp}</span>
        </div>
        <div className="p-3.5 rounded-2xl nature-surface-card border border-[#1e3f2b]">
          <span className="text-[9px] text-[#91b79a] uppercase block mb-1">SPECIES SATISFIED</span>
          <span className="text-lg font-black text-emerald-400">{satisfiedCount} / {totalCount}</span>
        </div>
        <div className="p-3.5 rounded-2xl nature-surface-card border border-[#1e3f2b]">
          <span className="text-[9px] text-[#91b79a] uppercase block mb-1">CODEX SPECIMENS</span>
          <span className="text-lg font-black text-[#d8c8a8]">{history.length}</span>
        </div>
        <div className="p-3.5 rounded-2xl nature-surface-card border border-[#1e3f2b] col-span-2 sm:col-span-1">
          <span className="text-[9px] text-[#91b79a] uppercase block mb-1">OUTDOOR STREAK</span>
          <span className="text-lg font-black text-amber-400">{streak} Days</span>
        </div>
      </div>

      {/* Main Mode Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[#1e3f2b]/40 pb-4 font-mono text-xs">
        <button
          onClick={() => setActiveTab('SPECIES')}
          className={`px-5 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'SPECIES'
              ? 'bg-[#245336] text-[#f3f1e7] shadow-lg border border-[#4f8a52]'
              : 'nature-surface-subtle text-[#91b79a] hover:text-[#f3f1e7] border border-[#1e3f2b]/60'
          }`}
        >
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Species Milestones ({satisfiedCount}/{totalCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('BADGES')}
          className={`px-5 py-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'BADGES'
              ? 'bg-[#245336] text-[#f3f1e7] shadow-lg border border-[#4f8a52]'
              : 'nature-surface-subtle text-[#91b79a] hover:text-[#f3f1e7] border border-[#1e3f2b]/60'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>General Badges ({ACHIEVEMENTS_LIST.length})</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SECTION 1: SPECIES MILESTONES (Satisfied Only When Photographed) */}
      {/* ============================================================== */}
      {activeTab === 'SPECIES' && (
        <div className="space-y-6">
          
          {/* Progress Overview Card */}
          <div className="p-6 rounded-3xl nature-surface-card border border-[#315c3b]/50 shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest block">
                  BOTANICAL EXPEDITION TARGETS
                </span>
                <h3 className="text-xl font-black text-[#f3f1e7]">
                  Popular Findable Species Checklist
                </h3>
              </div>
              <div className="font-mono text-xs text-right">
                <span className="text-emerald-300 font-bold text-sm">{satisfiedCount}</span>
                <span className="text-[#91b79a]"> of {totalCount} Species Photographed ({speciesProgressPct}%)</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-[#07160f] rounded-full overflow-hidden border border-[#1e3f2b]">
              <div 
                className="h-full bg-gradient-to-r from-[#245336] via-[#315c3b] to-[#4f8a52] transition-all duration-700 rounded-full"
                style={{ width: `${speciesProgressPct}%` }}
              />
            </div>

            <p className="text-xs text-[#d8c8a8] font-sans">
              To satisfy a milestone and claim its achievement badge, find the plant species in your neighborhood, park, or trail and scan a photo of it. Milestones cannot be unlocked without real photographic proof.
            </p>
          </div>

          {/* Sub-Filters */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            {[
              { id: 'ALL', label: 'All Species' },
              { id: 'TREES', label: 'Trees' },
              { id: 'FLOWERS', label: 'Flowers' },
              { id: 'PLANTS', label: 'Plants' },
              { id: 'SATISFIED', label: `Satisfied (${satisfiedCount})` },
              { id: 'UNDISCOVERED', label: `Undiscovered (${totalCount - satisfiedCount})` }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setSpeciesFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-lg uppercase font-bold transition-all cursor-pointer ${
                  speciesFilter === f.id
                    ? 'bg-[#0e2a1b] text-emerald-300 border border-emerald-500/60 shadow-sm'
                    : 'bg-[#081a11]/60 text-[#91b79a] hover:text-[#f3f1e7] border border-[#1e3f2b]/50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Species Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMilestones.map((species) => {
              const CatIcon = CATEGORY_ICONS[species.category] || Leaf;
              const { isSatisfied, matchedItem } = species;

              return (
                <div
                  key={species.id}
                  className={clsx(
                    "rounded-3xl border p-5 flex flex-col justify-between transition-all relative overflow-hidden",
                    isSatisfied
                      ? "nature-surface-card border-emerald-500/60 shadow-xl shadow-emerald-950/20"
                      : "nature-surface-subtle border-[#1e3f2b]/60 opacity-85 hover:opacity-100"
                  )}
                >
                  <div>
                    {/* Header: Status Pill & Reward */}
                    <div className="flex items-center justify-between mb-3.5 font-mono text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <CatIcon className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[#91b79a] uppercase font-bold">{species.category}</span>
                      </div>

                      {isSatisfied ? (
                        <span className="flex items-center gap-1 bg-emerald-950/90 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-700 font-bold uppercase">
                          <Check className="w-3 h-3 text-emerald-400" /> SATISFIED
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 bg-[#121c15] text-[#91b79a] px-2.5 py-1 rounded-full border border-[#1e3f2b]">
                          <Lock className="w-3 h-3 text-amber-500" /> TARGET
                        </span>
                      )}
                    </div>

                    {/* Satisfied User Image Thumbnail OR Placeholder Clue View */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#07160f] border border-[#1e3f2b] mb-4 flex items-center justify-center">
                      {isSatisfied && matchedItem?.image ? (
                        <>
                          <img 
                            src={matchedItem.image} 
                            alt={species.name} 
                            className="w-full h-full object-cover filter brightness-95"
                          />
                          <div className="absolute bottom-2 left-2 bg-[#06140d]/90 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-emerald-300 border border-[#1e3f2b]">
                            YOUR PHOTO EVIDENCE
                          </div>
                        </>
                      ) : (
                        <div className="p-4 text-center space-y-1">
                          <CatIcon className="w-8 h-8 text-[#1e3f2b] mx-auto" />
                          <span className="text-[10px] font-mono text-[#91b79a]/60 uppercase block">
                            AWAITING PHOTOGRAPH
                          </span>
                        </div>
                      )}

                      <div className="absolute top-2 right-2 bg-[#06140d]/85 backdrop-blur-md px-2 py-0.5 rounded font-mono text-[10px] text-emerald-300 font-bold border border-[#1e3f2b]">
                        +{species.reward} XP
                      </div>
                    </div>

                    {/* Species Name & Botanical Nomenclature */}
                    <div className="mb-2">
                      <h4 className="text-lg font-black text-[#f3f1e7] leading-tight">
                        {species.name}
                      </h4>
                      <span className="text-xs text-emerald-400/80 font-mono italic block">
                        {species.scientificName}
                      </span>
                    </div>

                    <p className="text-xs text-[#d8c8a8]/90 font-sans leading-relaxed mb-3">
                      {species.description}
                    </p>

                    {/* Clue Details */}
                    <div className="bg-[#081a11]/60 rounded-xl p-3 border border-[#1e3f2b]/40 text-[11px] space-y-1 font-sans">
                      <div className="text-[#91b79a]">
                        <span className="text-emerald-400 font-bold font-mono text-[10px]">WHERE TO LOOK: </span>
                        {species.whereToLook}
                      </div>
                      <div className="text-[#d8c8a8]">
                        <span className="text-emerald-400 font-bold font-mono text-[10px]">KEY CLUES: </span>
                        {species.keyFeatures.join(', ')}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-4 border-t border-[#1e3f2b]/40 mt-4 font-mono text-xs">
                    {isSatisfied ? (
                      <div className="flex items-center justify-between text-emerald-300">
                        <span className="text-[10px] uppercase font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          Discovery Claimed
                        </span>
                        <span className="text-[10px] text-[#91b79a]">
                          {matchedItem?.date || 'Recorded'}
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={onOpenScanner}
                        className="w-full py-2.5 bg-[#123a27] hover:bg-[#194e34] text-emerald-300 hover:text-white rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#315c3b]/60 transition-colors cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>FIND & PHOTOGRAPH</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* SECTION 2: GENERAL BADGES & HABIT ACHIEVEMENTS */}
      {/* ============================================================== */}
      {activeTab === 'BADGES' && (
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
      )}

    </div>
  );
}
