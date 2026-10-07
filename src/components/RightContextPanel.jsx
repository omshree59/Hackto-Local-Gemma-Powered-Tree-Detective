import React from 'react';
import { 
  Compass, Flame, ShieldCheck, WifiOff, Trees, Flower, 
  Bug, Mountain, Bird, Leaf, ArrowRight, Activity, Award
} from 'lucide-react';
import clsx from 'clsx';

const CATEGORY_ICONS = {
  tree: Trees,
  flower: Flower,
  insect: Bug,
  bird: Bird,
  rock: Mountain,
  other: Leaf
};

export default function RightContextPanel({
  activeMission,
  onStartTouchGrass,
  recentDiscoveries,
  onViewCodex,
  ollamaStatus
}) {
  return (
    <aside className="hidden 2xl:flex flex-col w-80 shrink-0 border-l border-stone-800/80 bg-[#070907]/60 backdrop-blur-xl p-5 space-y-6 overflow-y-auto scrollbar-hide">
      
      {/* Field Radar / Active Mission Summary */}
      <div className="bg-stone-900/60 border border-stone-800/90 rounded-3xl p-5 shadow-xl relative overflow-hidden group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            FIELD RADAR
          </span>
          <span className="text-xs font-mono font-bold text-emerald-300">
            +{activeMission?.reward || 40} XP
          </span>
        </div>

        <h4 className="text-sm font-bold text-white leading-snug mb-2">
          {activeMission?.task || activeMission?.title || 'Explore Nearby Green Space'}
        </h4>

        <p className="text-[11px] text-stone-400 leading-relaxed mb-4">
          {activeMission?.hint || 'Keep your phone in your pocket until you locate the specimen.'}
        </p>

        <button
          onClick={onStartTouchGrass}
          className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 hover:text-stone-950 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Flame className="w-3.5 h-3.5" />
          <span>START TOUCH GRASS</span>
        </button>
      </div>

      {/* System Telemetry & Offline Guarantee */}
      <div className="bg-stone-900/40 border border-stone-800/80 rounded-3xl p-5 space-y-3 font-mono text-[11px]">
        <div className="flex items-center justify-between text-stone-300 pb-2 border-b border-stone-800/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            LOCAL SYSTEM STATUS
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <WifiOff className="w-3 h-3" /> OFFLINE
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-stone-400">Ollama Daemon:</span>
          <span className={ollamaStatus.connected ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
            {ollamaStatus.connected ? "127.0.0.1:11434" : "STANDBY"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-stone-400">Inference Core:</span>
          <span className="text-stone-200 font-bold">Gemma 3 (4B)</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-stone-400">External Cloud:</span>
          <span className="text-emerald-400 font-bold">0% / NONE</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-stone-400">Local Journal:</span>
          <span className="text-teal-400 font-bold">Encrypted WebStorage</span>
        </div>
      </div>

      {/* Recent Discovered Specimens Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-300 px-1">
          <span>RECENT CODEX LOGS</span>
          <button 
            onClick={onViewCodex}
            className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            All Logs →
          </button>
        </div>

        {recentDiscoveries.length === 0 ? (
          <div className="p-4 rounded-2xl bg-stone-900/30 border border-stone-800/60 text-center text-xs text-stone-400">
            No specimens logged yet.
          </div>
        ) : (
          <div className="space-y-2">
            {recentDiscoveries.slice(0, 3).map((item) => {
              const IconComp = CATEGORY_ICONS[(item.category || '').toLowerCase()] || Leaf;
              return (
                <div 
                  key={item.id}
                  className="p-3 rounded-2xl bg-stone-900/40 border border-stone-800/70 hover:border-emerald-600/40 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="p-2 rounded-xl bg-stone-950 text-emerald-400 border border-stone-800 shrink-0">
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                      <span className="text-[10px] font-mono text-stone-400 uppercase">{item.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">
                    +{item.earned} XP
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Leave No Trace Pledge */}
      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-[11px] text-emerald-300/80 space-y-1">
        <span className="font-bold text-emerald-300 block font-mono">FIELD PLEDGE</span>
        <p className="leading-relaxed">
          Take only photographs. Leave only footsteps. Respect wild habitats.
        </p>
      </div>

    </aside>
  );
}
