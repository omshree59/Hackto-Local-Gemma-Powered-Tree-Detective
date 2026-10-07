import React from 'react';
import { 
  Target, Cpu, WifiOff, Leaf, Trees, Flower, ArrowRight
} from 'lucide-react';

export default function RightContextPanel({
  activeMission,
  onStartQuest,
  recentPlants,
  onNavigate,
  ollamaStatus
}) {
  const latestDiscovery = recentPlants?.[0];

  return (
    <aside className="hidden 2xl:flex flex-col w-72 shrink-0 border-l border-stone-800/80 bg-[#070907]/60 backdrop-blur-xl p-5 space-y-5 overflow-y-auto select-none">
      
      {/* Current Quest Preview */}
      <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span className="text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            CURRENT QUEST
          </span>
          <span className="text-emerald-300 font-bold">
            +{activeMission?.reward || 40} XP
          </span>
        </div>

        <h4 className="text-xs font-bold text-white leading-snug">
          {activeMission?.task || activeMission?.objective || activeMission?.title}
        </h4>

        <div className="space-y-1 font-mono text-[10px] text-stone-400">
          <div className="flex justify-between">
            <span>PROGRESS</span>
            <span className="text-stone-300">Active</span>
          </div>
          <div className="h-1.5 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-800">
            <div className="h-full bg-emerald-500 w-1/2"></div>
          </div>
        </div>

        <button
          onClick={() => onStartQuest(activeMission)}
          className="w-full py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 hover:text-stone-950 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold uppercase transition-all cursor-pointer"
        >
          START OUTDOOR MODE
        </button>
      </div>

      {/* Local AI Status Pill Card */}
      <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-4 font-mono text-[10px] space-y-2">
        <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
          <span className="text-stone-400 font-bold uppercase">LOCAL AI STATUS</span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <WifiOff className="w-3 h-3" /> NO CLOUD
          </span>
        </div>

        <div className="flex items-center justify-between text-stone-300">
          <span className="text-stone-400">Daemon:</span>
          <span className={ollamaStatus.connected ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
            {ollamaStatus.connected ? "127.0.0.1:11434" : "STANDBY"}
          </span>
        </div>

        <div className="flex items-center justify-between text-stone-300">
          <span className="text-stone-400">Model:</span>
          <span>Gemma 3 4B</span>
        </div>
      </div>

      {/* Recent Discovery Preview */}
      {latestDiscovery && (
        <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="text-stone-400 font-bold uppercase">RECENT DISCOVERY</span>
            <button 
              onClick={() => onNavigate('codex')}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              Codex →
            </button>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="p-2 rounded-xl bg-stone-950 text-emerald-400 border border-stone-800 shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-white truncate">{latestDiscovery.name}</h5>
              <span className="text-[10px] font-mono text-emerald-400">{latestDiscovery.category}</span>
            </div>
          </div>
        </div>
      )}

      {/* Field Ethic Reminder */}
      <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 text-[10px] font-mono text-stone-400 leading-relaxed">
        "Leave no trace. Observe living plants without picking foliage or compacting root zones."
      </div>

    </aside>
  );
}
