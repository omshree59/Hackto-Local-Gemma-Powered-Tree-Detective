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
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1e3f2b]/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4f8a52]"></span>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52]">
              LOCAL TRAIL GUIDE • CURATED DATA
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight mt-1">
            NATURE TRAILS & WALKS
          </h2>
          <p className="text-sm text-[#91b79a] mt-1">
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
                  ? "bg-[#4f8a52] text-[#f3f1e7] shadow-lg shadow-[#4f8a52]/20 border border-[#4f8a52]"
                  : "nature-surface-subtle text-[#91b79a] hover:text-[#f3f1e7] border border-[#1e3f2b]/60"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Offline Guarantee Banner */}
      <div className="p-4 rounded-2xl nature-surface-subtle border border-[#1e3f2b]/80 flex items-start gap-3 font-mono text-xs text-[#91b79a]">
        <Info className="w-4 h-4 text-[#4f8a52] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#f3f1e7]">Offline Route Storage:</strong> NatureQuest intentionally avoids cloud Mapbox/Google Maps APIs to safeguard personal geo-privacy on the trail. All routes below are verified locally.
        </p>
      </div>

      {/* Trails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTrails.map((trail) => (
          <div 
            key={trail.id}
            className={clsx(
              "rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between relative overflow-hidden group",
              trail.completed 
                ? "nature-surface-subtle border-[#1e3f2b]/60 opacity-80" 
                : "nature-surface-card border-[#1e3f2b]/80 hover:border-[#4f8a52]/60"
            )}
          >
            <div>
              
              {/* Header Strip */}
              <div className="flex items-center justify-between mb-3 font-mono text-[11px]">
                <span className="text-[#4f8a52] font-bold uppercase tracking-wider bg-[#0c2619] px-2.5 py-0.5 rounded-md border border-[#1e3f2b]">
                  {trail.difficulty}
                </span>

                <div className="flex items-center gap-3 text-[#91b79a]">
                  <span>{trail.distance}</span>
                  <span>•</span>
                  <span>{trail.duration}</span>
                </div>
              </div>

              {/* Trail Title & Area */}
              <h3 className="text-xl font-bold text-[#f3f1e7] mb-1 leading-snug group-hover:text-[#91b79a] transition-colors">
                {trail.name}
              </h3>
              <span className="text-xs font-mono text-[#d8c8a8] block mb-3">
                {trail.area}
              </span>

              {/* Terrain & Best For */}
              <div className="space-y-1.5 text-xs text-[#f3f1e7]/90 font-sans mb-4">
                <p><strong className="text-[#91b79a]">Terrain:</strong> {trail.terrain}</p>
                <p><strong className="text-[#91b79a]">Best for:</strong> {trail.bestFor}</p>
              </div>

              {/* Plant Highlights Badges */}
              {trail.plantHighlights && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {trail.plantHighlights.map((ph, idx) => (
                    <span 
                      key={idx}
                      className="text-[10px] font-mono text-[#91b79a] bg-[#07170e] px-2 py-0.5 rounded-md border border-[#1e3f2b]"
                    >
                      🌿 {ph}
                    </span>
                  ))}
                </div>
              )}

            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#1e3f2b]/60 flex items-center justify-between gap-3">
              <button
                onClick={() => onStartTrailMission(trail)}
                className="flex-1 py-3 bg-[#4f8a52] hover:bg-[#315c3b] active:scale-95 text-[#f3f1e7] text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#4f8a52]/20"
              >
                <Compass className="w-4 h-4 text-[#f3f1e7]" />
                <span>START TRAIL MISSION</span>
              </button>

              <button
                onClick={() => setSelectedTrail(trail)}
                className="p-3 nature-surface-subtle hover:bg-[#123a27]/80 text-[#d8c8a8] rounded-xl border border-[#1e3f2b] transition-colors cursor-pointer text-xs font-mono"
                title="View Trail Details & Safety Notes"
              >
                Details
              </button>

              <button
                onClick={() => onToggleCompleteTrail(trail.id)}
                className={clsx(
                  "p-3 rounded-xl border transition-colors cursor-pointer",
                  trail.completed 
                    ? "bg-[#0c2619] text-[#4f8a52] border-[#4f8a52]" 
                    : "nature-surface-subtle text-[#91b79a] border-[#1e3f2b] hover:text-[#f3f1e7]"
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
        <div className="fixed inset-0 z-50 bg-[#040c07]/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="nature-surface-card border border-[#2a4d34] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-5 font-sans">
            <div className="flex items-start justify-between border-b border-[#1e3f2b] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#4f8a52] uppercase font-bold block">
                  {selectedTrail.area}
                </span>
                <h3 className="text-2xl font-black text-[#f3f1e7] mt-0.5">
                  {selectedTrail.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedTrail(null)}
                className="p-1.5 rounded-lg text-[#91b79a] hover:text-white bg-[#0a1f14] border border-[#1e3f2b] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center p-3 rounded-2xl bg-[#07170e] border border-[#1e3f2b]">
              <div>
                <span className="text-[#91b79a] block text-[10px]">DISTANCE</span>
                <span className="text-[#f3f1e7] font-bold">{selectedTrail.distance}</span>
              </div>
              <div>
                <span className="text-[#91b79a] block text-[10px]">DURATION</span>
                <span className="text-[#f3f1e7] font-bold">{selectedTrail.duration}</span>
              </div>
              <div>
                <span className="text-[#91b79a] block text-[10px]">DIFFICULTY</span>
                <span className="text-[#4f8a52] font-bold">{selectedTrail.difficulty}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#f3f1e7]">
              <div>
                <strong className="text-[#91b79a] block font-mono text-[11px] mb-0.5">TERRAIN & CONDITIONS:</strong>
                <p>{selectedTrail.terrain}</p>
              </div>
              <div>
                <strong className="text-[#91b79a] block font-mono text-[11px] mb-0.5">ECOLOGICAL HIGHLIGHTS:</strong>
                <p>{selectedTrail.bestFor}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/50 text-[#d8c8a8] text-xs flex items-start gap-2.5">
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
              className="w-full py-3.5 bg-[#4f8a52] hover:bg-[#315c3b] text-[#f3f1e7] font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#4f8a52]/30 cursor-pointer transition-all"
            >
              START TRAIL EXPLORATION
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
