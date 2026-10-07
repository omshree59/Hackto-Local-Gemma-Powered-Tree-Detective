import React from 'react';
import { 
  Compass, Award, Camera, WifiOff, CheckCircle, AlertTriangle, 
  Menu, X, Sparkles, Flame, ShieldCheck, Activity, Target, BookOpen, Trophy, Info
} from 'lucide-react';
import clsx from 'clsx';

export default function TopNav({
  activeTab,
  setActiveTab,
  xp,
  level,
  ollamaStatus,
  onOpenScanner,
  onOpenMobileMenu,
  mobileMenuOpen
}) {
  const xpProgress = xp % 200;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070907]/90 backdrop-blur-2xl border-b border-stone-800/80 transition-all">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Subtitle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div 
            onClick={() => setActiveTab('station')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-stone-950" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-[#070907] rounded-full animate-ping opacity-75"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  NATUREQUEST
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-black tracking-widest uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 font-mono">
                  v2.0
                </span>
              </div>
              <span className="block text-[10px] font-bold tracking-widest text-stone-400 uppercase font-mono">
                FIELD EXPLORATION OS
              </span>
            </div>
          </div>
        </div>

        {/* Center: Real Offline & Model Telemetry Status */}
        <div className="hidden xl:flex items-center gap-3 px-4 py-1.5 rounded-full bg-stone-900/60 border border-stone-800/80 font-mono text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className={clsx(
              "w-2 h-2 rounded-full",
              ollamaStatus.connected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            )}></span>
            <span className={ollamaStatus.connected ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
              {ollamaStatus.connected ? "OLLAMA CONNECTED" : "OLLAMA STANDBY"}
            </span>
          </div>

          <span className="text-stone-600">•</span>

          <div className="flex items-center gap-1 text-stone-300">
            <span className="text-stone-500">MODEL:</span>
            <span className="font-bold text-emerald-300">GEMMA 3 4B</span>
          </div>

          <span className="text-stone-600">•</span>

          <div className="flex items-center gap-1 text-teal-300">
            <WifiOff className="w-3 h-3" />
            <span>OFFLINE READY</span>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-950/80 p-1.5 rounded-2xl border border-stone-800/80 backdrop-blur-md">
          {[
            { id: 'station', label: 'Field Station', icon: Activity },
            { id: 'quests', label: 'Quests', icon: Target },
            { id: 'codex', label: 'Field Codex', icon: BookOpen },
            { id: 'metrics', label: 'Metrics & Badges', icon: Trophy },
            { id: 'touch-grass', label: 'TOUCH GRASS', icon: Flame, special: true },
            { id: 'open-innovation', label: 'Open AI', icon: ShieldCheck }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
                activeTab === tab.id
                  ? tab.special 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-stone-950 font-black shadow-lg shadow-emerald-500/25" 
                    : "bg-emerald-600 text-stone-950 shadow-md shadow-emerald-600/20"
                  : tab.special
                    ? "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40"
                    : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"
              )}
            >
              <tab.icon className={clsx("w-3.5 h-3.5", tab.special && activeTab !== tab.id && "text-emerald-400 animate-pulse")} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Right: User Progression & Primary Action */}
        <div className="flex items-center gap-3">
          
          {/* Ranger Level Pill */}
          <div className="hidden sm:flex items-center gap-2.5 bg-stone-900/80 border border-stone-800/80 px-3.5 py-2 rounded-2xl shadow-inner">
            <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-xl border border-emerald-500/30">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-left font-mono">
              <div className="flex items-center gap-2 leading-none">
                <span className="text-xs font-black text-white">Tier {level} Ranger</span>
                <span className="text-[11px] font-bold text-emerald-400">{xp} XP</span>
              </div>
              <div className="w-20 h-1 bg-stone-800 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                  style={{ width: `${(xpProgress / 200) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Primary CTA: Scan Specimen */}
          <button
            onClick={onOpenScanner}
            className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-black px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Camera className="w-4 h-4 text-stone-950" />
            <span className="font-bold">SCAN SPECIMEN</span>
          </button>
        </div>

      </div>
    </header>
  );
}
