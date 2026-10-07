import React from 'react';
import { Target, Leaf, ArrowRight, WifiOff } from 'lucide-react';

export default function RightContextPanel({
  activeMission,
  onStartQuest,
  recentPlants,
  onNavigate,
  ollamaStatus
}) {
  const latestDiscovery = recentPlants?.[0];

  return (
    <aside className="hidden 2xl:flex flex-col w-72 shrink-0 border-l border-[#1e3f2b]/35 bg-[#07160f]/65 backdrop-blur-xl p-5 space-y-5 overflow-y-auto select-none">
      
      {/* Current Quest Preview */}
      <div className="nature-surface-card rounded-3xl p-5 space-y-3">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span className="text-[#91b79a] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            CURRENT QUEST
          </span>
          <span className="text-emerald-300 font-bold">
            +{activeMission?.reward || 40} XP
          </span>
        </div>

        <h4 className="text-xs font-bold text-[#f3f1e7] leading-snug">
          {activeMission?.task || activeMission?.objective || activeMission?.title}
        </h4>

        <div className="space-y-1 font-mono text-[10px] text-[#d8c8a8]/80">
          <div className="flex justify-between">
            <span>PROGRESS</span>
            <span className="text-emerald-300">Active</span>
          </div>
          <div className="h-1.5 w-full bg-[#081a11] rounded-full overflow-hidden border border-[#1e3f2b]/50">
            <div className="h-full bg-[#4f8a52] w-1/2"></div>
          </div>
        </div>

        <button
          onClick={() => onStartQuest(activeMission)}
          className="w-full py-2.5 rounded-xl bg-[#123a27] hover:bg-[#194e34] border border-[#315c3b]/60 text-emerald-300 text-[11px] font-mono font-bold uppercase transition-all cursor-pointer"
        >
          START OUTDOOR MODE
        </button>
      </div>

      {/* Local AI Status Pill Card */}
      <div className="nature-surface-subtle rounded-2xl p-4 font-mono text-[10px] space-y-2">
        <div className="flex items-center justify-between border-b border-[#1e3f2b]/40 pb-2">
          <span className="text-[#91b79a] font-bold uppercase">LOCAL AI STATUS</span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <WifiOff className="w-3 h-3" /> NO CLOUD
          </span>
        </div>

        <div className="flex items-center justify-between text-[#d8c8a8]">
          <span className="text-[#91b79a]/70">Daemon:</span>
          <span className={ollamaStatus.connected ? "text-emerald-300 font-bold" : "text-amber-300 font-bold"}>
            {ollamaStatus.connected ? "127.0.0.1:11434" : "STANDBY"}
          </span>
        </div>

        <div className="flex items-center justify-between text-[#d8c8a8]">
          <span className="text-[#91b79a]/70">Model:</span>
          <span>Gemma 3 4B</span>
        </div>
      </div>

      {/* Recent Discovery Preview */}
      {latestDiscovery && (
        <div className="nature-surface-subtle rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="text-[#91b79a] font-bold uppercase">RECENT DISCOVERY</span>
            <button 
              onClick={() => onNavigate('codex')}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              Codex →
            </button>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="p-2 rounded-xl bg-[#0a1e14] text-emerald-400 border border-[#1e3f2b] shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-[#f3f1e7] truncate">{latestDiscovery.name}</h5>
              <span className="text-[10px] font-mono text-[#91b79a]">{latestDiscovery.category}</span>
            </div>
          </div>
        </div>
      )}

      {/* Field Ethic Reminder */}
      <div className="p-3.5 rounded-2xl bg-[#081a11]/60 border border-[#1e3f2b]/35 text-[10px] font-mono text-[#91b79a]/80 leading-relaxed">
        "Leave no trace. Observe living plants without picking foliage or compacting root zones."
      </div>

    </aside>
  );
}
