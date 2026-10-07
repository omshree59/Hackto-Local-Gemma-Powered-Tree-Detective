import React, { useState } from 'react';
import { 
  Camera, Menu, X, Award, ChevronDown, 
  Cpu, WifiOff, User
} from 'lucide-react';
import clsx from 'clsx';

const PAGE_TITLES = {
  'station': 'Field Station',
  'plant-scout': 'Plant Scout',
  'quests': 'Field Quests',
  'trails': 'Local Trails',
  'codex': 'Field Codex',
  'achievements': 'Achievements',
  'progress': 'My Progress',
  'guide': 'Nature Guide',
  'stories': 'Field Stories',
  'local-ai': 'Local AI System',
  'settings': 'Settings'
};

export default function TopNav({
  activePage,
  onOpenMobileMenu,
  mobileMenuOpen,
  xp,
  level,
  ollamaStatus,
  onOpenScanner
}) {
  const [statusPopoverOpen, setStatusPopoverOpen] = useState(false);
  const xpProgress = xp % 200;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#06110a]/72 backdrop-blur-2xl border-b border-[#1e3f2b]/35 transition-all select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Toggle & Current Page Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-[#91b79a] hover:text-[#f3f1e7] hover:bg-[#123a27]/50 transition-colors cursor-pointer"
            aria-label="Toggle Mobile Drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#91b79a] uppercase hidden sm:block">
              NATUREQUEST
            </span>
            <h2 className="text-lg sm:text-xl font-black text-[#f3f1e7] tracking-tight leading-tight">
              {PAGE_TITLES[activePage] || 'Field Station'}
            </h2>
          </div>
        </div>

        {/* Center / Status Indicator with Popover */}
        <div className="relative">
          <button
            onClick={() => setStatusPopoverOpen(prev => !prev)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081a11]/80 border border-[#1e3f2b]/45 hover:border-[#315c3b]/60 font-mono text-[11px] transition-all cursor-pointer"
            title="View local AI runtime status"
          >
            <span className={clsx(
              "w-2 h-2 rounded-full shrink-0",
              ollamaStatus.connected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            )}></span>
            <span className={clsx(
              "font-bold hidden sm:inline",
              ollamaStatus.connected ? "text-emerald-300" : "text-amber-300"
            )}>
              {ollamaStatus.connected ? "OLLAMA CONNECTED" : "OLLAMA STANDBY"}
            </span>
            <span className="text-[#91b79a]/80 hidden md:inline">• Gemma 3 4B</span>
            <span className="text-[#4f8a52] font-bold hidden lg:inline">• LOCAL</span>
            <ChevronDown className="w-3 h-3 text-[#91b79a] ml-0.5" />
          </button>

          {/* Status Details Popover */}
          {statusPopoverOpen && (
            <div 
              onMouseLeave={() => setStatusPopoverOpen(false)}
              className="absolute top-10 left-1/2 -translate-x-1/2 w-72 bg-[#081a11]/95 border border-[#1e3f2b] rounded-2xl p-4 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 text-xs font-mono space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#1e3f2b] pb-2">
                <span className="text-[#f3f1e7] font-bold">LOCAL AI STATUS</span>
                <span className={clsx("font-bold text-[10px]", ollamaStatus.connected ? "text-emerald-400" : "text-amber-400")}>
                  {ollamaStatus.connected ? "ONLINE" : "DISCONNECTED"}
                </span>
              </div>
              <div className="space-y-1.5 text-[11px] text-[#d8c8a8]">
                <div className="flex justify-between">
                  <span>Host Endpoint:</span>
                  <span className="text-[#f3f1e7]">127.0.0.1:11434</span>
                </div>
                <div className="flex justify-between">
                  <span>Vision Model:</span>
                  <span className="text-emerald-300 font-bold">Gemma 3 4B</span>
                </div>
                <div className="flex justify-between">
                  <span>Cloud Dependency:</span>
                  <span className="text-[#91b79a] font-bold">0% / Zero</span>
                </div>
              </div>
              <p className="text-[10px] text-[#91b79a] font-sans leading-relaxed pt-2 border-t border-[#1e3f2b]/80">
                NatureQuest runs multimodal vision inference strictly inside your local Ollama environment. No photos leave your machine.
              </p>
            </div>
          )}
        </div>

        {/* Right: XP / Current Rank / Scan Plant CTA */}
        <div className="flex items-center gap-3">
          
          {/* XP & Current Rank Pill */}
          <div className="hidden sm:flex items-center gap-2.5 bg-[#081a11]/80 border border-[#1e3f2b]/45 px-3 py-1.5 rounded-2xl font-mono">
            <div className="bg-[#123a27] text-emerald-300 p-1 rounded-xl">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div className="text-left leading-none">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black text-[#f3f1e7]">Tier {level}</span>
                <span className="text-[10px] font-bold text-emerald-300">{xp} XP</span>
              </div>
              <div className="w-16 h-1 bg-[#123a27] rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#315c3b] to-[#4f8a52]"
                  style={{ width: `${(xpProgress / 200) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Primary Action Button: SCAN PLANT */}
          <button
            onClick={onOpenScanner}
            className="bg-[#245336] hover:bg-[#2d6844] active:scale-95 text-[#f3f1e7] font-black px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-black/30 border border-[#4f8a52]/40 transition-all cursor-pointer"
          >
            <Camera className="w-4 h-4 text-emerald-300" />
            <span>SCAN PLANT</span>
          </button>
        </div>

      </div>
    </header>
  );
}
