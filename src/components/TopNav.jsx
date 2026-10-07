import React, { useState } from 'react';
import { 
  Camera, Menu, X, Award, ChevronDown, 
  ShieldCheck, Cpu, WifiOff, Info, User
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
    <header className="sticky top-0 z-40 w-full bg-[#070907]/90 backdrop-blur-2xl border-b border-stone-800/80 transition-all select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Toggle & Current Page Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="md:hidden p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 transition-colors cursor-pointer"
            aria-label="Toggle Mobile Drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase hidden sm:block">
              NATUREQUEST
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight">
              {PAGE_TITLES[activePage] || 'Field Station'}
            </h2>
          </div>
        </div>

        {/* Center / Status Indicator with Popover */}
        <div className="relative">
          <button
            onClick={() => setStatusPopoverOpen(prev => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/80 border border-stone-800 hover:border-stone-700 font-mono text-[11px] transition-all cursor-pointer"
            title="View local AI runtime status"
          >
            <span className={clsx(
              "w-2 h-2 rounded-full shrink-0",
              ollamaStatus.connected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            )}></span>
            <span className={clsx(
              "font-bold hidden sm:inline",
              ollamaStatus.connected ? "text-emerald-400" : "text-amber-400"
            )}>
              {ollamaStatus.connected ? "OLLAMA CONNECTED" : "OLLAMA STANDBY"}
            </span>
            <span className="text-stone-400 hidden md:inline">• Gemma 3 4B</span>
            <span className="text-teal-400 font-bold hidden lg:inline">• LOCAL</span>
            <ChevronDown className="w-3 h-3 text-stone-400 ml-0.5" />
          </button>

          {/* Status Details Popover */}
          {statusPopoverOpen && (
            <div 
              onMouseLeave={() => setStatusPopoverOpen(false)}
              className="absolute top-10 left-1/2 -translate-x-1/2 w-72 bg-[#0a0d0a] border border-stone-800 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 text-xs font-mono space-y-3"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <span className="text-stone-300 font-bold">LOCAL AI STATUS</span>
                <span className={clsx("font-bold text-[10px]", ollamaStatus.connected ? "text-emerald-400" : "text-amber-400")}>
                  {ollamaStatus.connected ? "ONLINE" : "DISCONNECTED"}
                </span>
              </div>
              <div className="space-y-1.5 text-[11px] text-stone-400">
                <div className="flex justify-between">
                  <span>Host Endpoint:</span>
                  <span className="text-stone-200">127.0.0.1:11434</span>
                </div>
                <div className="flex justify-between">
                  <span>Vision Model:</span>
                  <span className="text-emerald-400 font-bold">Gemma 3 4B</span>
                </div>
                <div className="flex justify-between">
                  <span>Cloud Dependency:</span>
                  <span className="text-teal-400 font-bold">0% / Zero</span>
                </div>
              </div>
              <p className="text-[10px] text-stone-400 font-sans leading-relaxed pt-2 border-t border-stone-800/80">
                NatureQuest runs multimodal vision inference strictly inside your local Ollama environment. No photos leave your machine.
              </p>
            </div>
          )}
        </div>

        {/* Right: XP / Current Rank / Profile / Scan Plant CTA */}
        <div className="flex items-center gap-3">
          
          {/* XP & Current Rank Pill */}
          <div className="hidden sm:flex items-center gap-2.5 bg-stone-900/80 border border-stone-800 px-3 py-1.5 rounded-2xl shadow-inner font-mono">
            <div className="bg-emerald-500/20 text-emerald-400 p-1 rounded-xl">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div className="text-left leading-none">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black text-white">Tier {level}</span>
                <span className="text-[10px] font-bold text-emerald-400">{xp} XP</span>
              </div>
              <div className="w-16 h-1 bg-stone-800 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  style={{ width: `${(xpProgress / 200) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Primary Action Button: SCAN PLANT */}
          <button
            onClick={onOpenScanner}
            className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-black px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Camera className="w-4 h-4 text-stone-950" />
            <span>SCAN PLANT</span>
          </button>
        </div>

      </div>
    </header>
  );
}
