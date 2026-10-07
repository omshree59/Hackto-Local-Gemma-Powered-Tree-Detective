import React from 'react';
import { 
  Camera, Compass, Target, BookOpen, 
  Leaf, ArrowRight 
} from 'lucide-react';
import clsx from 'clsx';

export default function FieldStationView({
  activeMission,
  onStartQuest,
  onOpenScanner,
  onNavigate,
  recentPlants
}) {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12 select-none">
      
      {/* ============================================================== */}
      {/* HERO: FIELD STATION (CINEMATIC BOTANICAL HERO) */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden rounded-[2.5rem] nature-surface-card p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#91b79a] bg-[#123a27]/90 px-3.5 py-1 rounded-full border border-[#315c3b]/60 inline-block mb-3.5">
            FIELD STATION
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-[#f3f1e7] tracking-tight leading-[1.15] mb-3.5">
            Discover what is growing around you.
          </h1>

          <p className="text-sm sm:text-base text-[#d8c8a8] font-sans leading-relaxed mb-7 max-w-xl">
            Scan a plant you find outdoors, learn what you can observe, and turn discoveries into field quests.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={onOpenScanner}
              className="bg-[#245336] hover:bg-[#2d6844] active:scale-95 text-[#f3f1e7] font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-black/40 border border-[#4f8a52]/40 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4 text-emerald-300" />
              <span>SCAN A PLANT</span>
            </button>

            <button
              onClick={() => onNavigate('quests')}
              className="bg-[#0b1f16]/90 hover:bg-[#123a27] text-[#f3f1e7] border border-[#315c3b]/50 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Target className="w-4 h-4 text-[#91b79a]" />
              <span>VIEW QUESTS</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 1: ACTIVE QUEST */}
      {/* ============================================================== */}
      <section className="nature-surface-card rounded-[2rem] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-300 font-bold uppercase tracking-wider">ACTIVE QUEST</span>
            <span className="text-[#315c3b]">•</span>
            <span className="text-[#d8c8a8]">{activeMission?.category || 'PLANT OBSERVATION'}</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#91b79a]">
            <span>{activeMission?.duration || '15 MIN'}</span>
            <span>•</span>
            <span className="text-[#f3f1e7] font-bold">{activeMission?.difficulty || 'EASY'}</span>
            <span>•</span>
            <span className="text-emerald-300 font-bold">+{activeMission?.reward || 40} XP</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-black text-[#f3f1e7] leading-snug mb-2">
              {activeMission?.task || activeMission?.objective || activeMission?.title}
            </h3>
            <p className="text-xs text-[#d8c8a8]/80 font-sans leading-relaxed">
              {activeMission?.hint || 'Explore nearby and observe foliage with your own eyes before touching.'}
            </p>
          </div>

          <button
            onClick={() => onStartQuest(activeMission)}
            className="self-start md:self-auto bg-[#245336] hover:bg-[#2d6844] active:scale-95 text-[#f3f1e7] font-black px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-black/30 border border-[#4f8a52]/40 cursor-pointer transition-all shrink-0"
          >
            <Compass className="w-4 h-4 text-emerald-300" />
            <span>START QUEST</span>
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: RECENT DISCOVERIES & FIELD CODEX PREVIEW */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1e3f2b]/40">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#91b79a]">
              FIELD JOURNAL PREVIEW
            </span>
            <h3 className="text-xl font-black text-[#f3f1e7] tracking-tight">
              Recent Discoveries
            </h3>
          </div>

          <button
            onClick={() => onNavigate('codex')}
            className="text-xs font-mono font-bold text-emerald-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View Full Codex</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentPlants && recentPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {recentPlants.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                onClick={() => onNavigate('codex')}
                className="nature-surface-card rounded-2xl p-5 hover:border-[#4f8a52]/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 font-mono text-[10px]">
                    <span className="text-emerald-300 font-bold uppercase">{item.category}</span>
                    <span className="text-[#91b79a]">{item.confidence} Confidence</span>
                  </div>
                  <h4 className="text-base font-bold text-[#f3f1e7] group-hover:text-emerald-200 transition-colors leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#d8c8a8]/80 line-clamp-2 mt-2 leading-relaxed font-sans">
                    {item.fieldNotes}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1e3f2b]/40 mt-4 flex items-center justify-between text-[10px] font-mono text-[#91b79a]">
                  <span>{item.date}</span>
                  <span className="text-emerald-300 font-bold">+{item.xp || 50} XP</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="nature-surface-subtle border border-[#1e3f2b]/60 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="p-3 bg-[#0c2619] rounded-xl text-[#4f8a52]">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-sm text-[#91b79a] max-w-sm">
              Your field notebook is empty. Start your expedition by scanning a local plant.
            </p>
            <button
              onClick={() => onNavigate('plant-scout')}
              className="text-xs font-mono font-bold text-emerald-300 hover:underline mt-2 cursor-pointer"
            >
              Open Plant Scout
            </button>
          </div>
        )}
      </section>

    </div>
  );
}
