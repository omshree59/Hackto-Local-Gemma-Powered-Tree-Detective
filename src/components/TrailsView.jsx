import React, { useState } from 'react';
import { 
  Footprints, MapPin, Clock, ShieldCheck, CheckCircle, 
  Bookmark, ArrowRight, Info, AlertTriangle, Compass
} from 'lucide-react';
import clsx from 'clsx';
import { CURATED_TRAILS } from '../data/natureData';

export default function TrailsView({
  trails = CURATED_TRAILS,
  onStartTrailMission,
  onToggleSaveTrail,
  onToggleCompleteTrail
}) {
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState('ALL');

  const filteredTrails = trails.filter(t => 
    filterDifficulty === 'ALL' ? true : t.difficulty.toUpperCase() === filterDifficulty
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400">
              LOCAL TRAIL GUIDE • CURATED DATA
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            NATURE TRAILS & WALKS
          </h2>
          <p className="text-sm text-stone-400 mt-1 font-sans">
            Curated offline walking routes and botanical exploration circuits.
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2 font-mono text-xs self-start md:self-auto">
          {['ALL', 'EASY', 'MODERATE'].map(d => (
            <button
              key={d}
              onClick={() => setFilterDifficulty(d)}
              className={clsx(
                "px-3.5 py-1.5 rounded-xl uppercase font-bold transition-all cursor-pointer",
                filterDifficulty === d
                  ? "bg-emerald-500 text-stone-950 shadow-md"
                  : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Offline Guarantee Banner */}
      <div className="p-4 rounded-2xl bg-stone-900/40 border border-stone-800/80 flex items-start gap-3 font-mono text-xs text-stone-400">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Offline Route Storage:</strong> NatureQuest intentionally avoids cloud Mapbox/Google Maps APIs to safeguard personal geo-privacy on the trail. All routes below are verified locally.
        </p>
      </div>

      {/* Trails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTrails.map((trail) => (
          <div 
            key={trail.id}
            className={clsx(
              "rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group",
              trail.completed 
                ? "bg-stone-900/40 border-stone-800/80" 
                : "bg-stone-900/60 border-stone-800 hover:border-emerald-500/50"
            )}
          >
            <div>
              
              {/* Header Strip */}
              <div className="flex items-center justify-between mb-3 font-mono text-[11px]">
                <span className="text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-800/60">
                  {trail.difficulty}
                </span>

                <div className="flex items-center gap-3 text-stone-400">
                  <span>{trail.distance}</span>
                  <span>•</span>
                  <span>{trail.duration}</span>
                </div>
              </div>

              {/* Trail Title & Area */}
              <h3 className="text-xl font-bold text-white mb-1 leading-snug group-hover:text-emerald-300 transition-colors">
                {trail.name}
              </h3>
              <span className="text-xs font-mono text-stone-400 block mb-3">
                {trail.area}
              </span>

              {/* Terrain & Best For */}
              <div className="space-y-1.5 text-xs text-stone-300 font-sans mb-4">
                <p><strong>Terrain:</strong> {trail.terrain}</p>
                <p><strong>Best for:</strong> {trail.bestFor}</p>
              </div>

              {/* Plant Highlights Badges */}
              {trail.plantHighlights && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {trail.plantHighlights.map((ph, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-mono text-stone-400 bg-stone-950 px-2 py-0.5 rounded-md border border-stone-800"
                    >
                      🌿 {ph}
                    </span>
                  ))}
                </div>
              )}

            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between gap-3">
              <button
                onClick={() => onStartTrailMission(trail)}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
              >
                <Compass className="w-4 h-4 text-stone-950" />
                <span>START TRAIL MISSION</span>
              </button>

              <button
                onClick={() => setSelectedTrail(trail)}
                className="p-3 bg-stone-950 hover:bg-stone-800 text-stone-300 rounded-xl border border-stone-800 transition-colors cursor-pointer text-xs font-mono"
                title="View Trail Details & Safety Notes"
              >
                Details
              </button>

              <button
                onClick={() => onToggleCompleteTrail(trail.id)}
                className={clsx(
                  "p-3 rounded-xl border transition-colors cursor-pointer",
                  trail.completed 
                    ? "bg-emerald-950 text-emerald-400 border-emerald-800" 
                    : "bg-stone-950 text-stone-500 border-stone-800 hover:text-stone-300"
                )}
                title={trail.completed ? "Marked as Completed" : "Mark as Completed"}
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Trail Details Modal */}
      {selectedTrail && (
        <div className="fixed inset-0 z-50 bg-[#040604]/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-[#080b08] border border-stone-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5 font-sans">
            <div className="flex items-start justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
                  {selectedTrail.area}
                </span>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  {selectedTrail.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedTrail(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white bg-stone-900 border border-stone-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center p-3 rounded-2xl bg-stone-950 border border-stone-800">
              <div>
                <span className="text-stone-500 block text-[10px]">DISTANCE</span>
                <span className="text-white font-bold">{selectedTrail.distance}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">DURATION</span>
                <span className="text-white font-bold">{selectedTrail.duration}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">DIFFICULTY</span>
                <span className="text-emerald-400 font-bold">{selectedTrail.difficulty}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div>
                <strong className="text-white block font-mono text-[11px] mb-0.5">TERRAIN & CONDITIONS:</strong>
                <p>{selectedTrail.terrain}</p>
              </div>
              <div>
                <strong className="text-white block font-mono text-[11px] mb-0.5">ECOLOGICAL HIGHLIGHTS:</strong>
                <p>{selectedTrail.bestFor}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-amber-200/90 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[11px] font-mono uppercase text-amber-300">FIELD SAFETY ADVISORY:</strong>
                  <p className="mt-0.5 leading-relaxed">{selectedTrail.safetyNotes}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onStartTrailMission(selectedTrail);
                setSelectedTrail(null);
              }}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              START TRAIL EXPLORATION
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
