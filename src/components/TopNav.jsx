import { useState } from 'react';
import { Camera, Menu, X, Award, Flame, ArrowRight, ChevronDown } from 'lucide-react';
import ParticleText from './ParticleText';

const PAGE_TITLES = {
  'station': 'Field Station',
  'plant-scout': 'Plant Scout',
  'quests': 'Field Quests',
  'trails': 'Local Trails',
  'codex': 'Field Codex',
  'achievements': 'Achievements',
  'progress': 'My Progress',
  'my-plants': 'Growth Journal',
  'guide': 'Nature Guide',
  'stories': 'Field Stories',
  'local-ai': 'Local AI System',
  'settings': 'Settings'
};

function getTierTitle(lvl) {
  const titles = [
    'Field Novice',
    'Botanical Scout',
    'Woodland Tracker',
    'Forest Ranger',
    'Canopy Naturalist',
    'Master Botanist',
    'Apex Wilderness Pioneer'
  ];
  return titles[lvl - 1] || 'Legendary Naturalist';
}

export default function TopNav({
  activePage,
  onOpenMobileMenu,
  mobileMenuOpen,
  xp = 0,
  level = 1,
  streak = 4,
  onOpenScanner,
  onNavigate
}) {
  const [tierPopoverOpen, setTierPopoverOpen] = useState(false);
  const [streakPopoverOpen, setStreakPopoverOpen] = useState(false);

  const xpProgress = xp % 200;
  const xpRemaining = 200 - xpProgress;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#06110a]/80 backdrop-blur-2xl border-b border-[#1e3f2b]/35 transition-all select-none">
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

        {/* Center / NatureQuest ParticleText */}
        <div className="flex items-center justify-center flex-1 max-w-[240px] sm:max-w-[360px] md:max-w-[440px] h-14 relative overflow-hidden mx-auto select-none">
          <ParticleText
            text="NatureQuest"
            particleSize={2.6}
            density={2.2}
            color="#ffffff"
            highlightColor="#4ade80"
            scatter={60}
            gatherDuration={1200}
            stagger={280}
            pointerRepel={38}
            repelRadius={90}
            idleDrift={0.5}
            trigger="hover"
            fontSize="2.1rem"
            fontWeight={900}
            fontFamily="inherit"
            glow={true}
            className="w-full h-full min-h-0 cursor-pointer"
            style={{ height: 56, minHeight: 56 }}
          />
        </div>

        {/* Right: Active Fire Streak + Clickable Tier Section + Scan Plant CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Active Participation Streak with Animated Fire */}
          <div className="relative">
            <button
              onClick={() => {
                setStreakPopoverOpen(prev => !prev);
                setTierPopoverOpen(false);
              }}
              className="flex items-center gap-2 bg-[#131b0e]/90 hover:bg-[#1a2512] active:scale-95 border border-amber-900/50 hover:border-amber-500/70 px-3 py-1.5 rounded-2xl font-mono transition-all cursor-pointer group shadow-sm shadow-amber-950/20"
              title="Click to view your active participation streak"
            >
              <div className="p-1 rounded-xl bg-amber-950/60 text-amber-400 group-hover:scale-110 transition-transform">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              </div>
              <div className="text-left leading-none">
                <span className="text-[11px] font-black text-amber-300 block">{streak} {streak === 1 ? 'Day' : 'Days'}</span>
                <span className="text-[8px] font-bold text-amber-400/80 tracking-wider hidden sm:block uppercase">STREAK</span>
              </div>
            </button>

            {/* Streak Popover */}
            {streakPopoverOpen && (
              <div 
                onMouseLeave={() => setStreakPopoverOpen(false)}
                className="absolute top-11 right-0 w-72 bg-[#09150d]/98 border border-amber-600/40 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 text-xs font-mono space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#1e3f2b] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-xl bg-amber-950/70 border border-amber-600/50">
                      <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase block">ACTIVE STREAK</span>
                      <h4 className="text-base font-black text-[#f3f1e7]">{streak} Consecutive Days</h4>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#d8c8a8] font-sans leading-relaxed">
                  Your flame burns bright! You are actively participating by scanning plants, completing outdoor quests, and recording field observations.
                </p>

                <div className="p-3 rounded-2xl bg-[#081a11] border border-[#1e3f2b] text-[10px] text-[#91b79a] font-sans">
                  Keep active today to maintain your consecutive day streak and earn bonus naturalist XP.
                </div>

                <button
                  onClick={() => {
                    setStreakPopoverOpen(false);
                    if (onNavigate) onNavigate('progress');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#1d2712] hover:bg-[#283818] border border-amber-600/50 text-amber-200 text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>View Progress Stats</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Clickable Tier Section */}
          <div className="relative">
            <button
              onClick={() => {
                setTierPopoverOpen(prev => !prev);
                setStreakPopoverOpen(false);
              }}
              className="hidden sm:flex items-center gap-2.5 bg-[#081a11]/90 hover:bg-[#0e2c1d] active:scale-95 border border-[#1e3f2b]/60 hover:border-emerald-500/70 px-3 py-1.5 rounded-2xl font-mono transition-all cursor-pointer group shadow-sm"
              title="Click to view Tier details & achievements"
            >
              <div className="bg-[#123a27] text-emerald-300 p-1 rounded-xl group-hover:scale-105 transition-transform">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-black text-[#f3f1e7] group-hover:text-emerald-200">Tier {level}</span>
                  <span className="text-[10px] font-bold text-emerald-300">{xp} XP</span>
                </div>
                <div className="w-16 h-1 bg-[#123a27] rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#315c3b] to-[#4f8a52]"
                    style={{ width: `${(xpProgress / 200) * 100}%` }}
                  />
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-[#91b79a] group-hover:text-emerald-300 ml-0.5 transition-colors" />
            </button>

            {/* Clickable Tier Details Dropdown / Popover */}
            {tierPopoverOpen && (
              <div 
                onMouseLeave={() => setTierPopoverOpen(false)}
                className="absolute top-11 right-0 w-80 bg-[#081a11]/98 border border-[#315c3b] rounded-3xl p-5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 text-xs font-mono space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#1e3f2b] pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 block uppercase">BOTANIST RANK</span>
                    <h4 className="text-base font-black text-[#f3f1e7]">Tier {level} • {getTierTitle(level)}</h4>
                  </div>
                  <div className="p-2 rounded-2xl bg-[#123a27] text-emerald-300 border border-[#315c3b]">
                    <Award className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#91b79a]">Progress to Tier {level + 1}:</span>
                    <span className="text-emerald-300 font-bold">{xpProgress} / 200 XP</span>
                  </div>
                  <div className="w-full h-2 bg-[#0c2417] rounded-full overflow-hidden border border-[#1e3f2b]">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
                      style={{ width: `${(xpProgress / 200) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-[#91b79a] block text-right">
                    {xpRemaining} XP needed for next rank
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#0c2417] border border-[#1e3f2b] space-y-1 text-[11px] font-sans">
                  <span className="font-mono text-[10px] font-bold text-emerald-400 block uppercase">FIELD PRIVILEGES</span>
                  <p className="text-[#d8c8a8] leading-relaxed">
                    Full offline vision inference with Gemma 3 4B, 15 species milestones, sensory outdoor quests, and growth tracking.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <button
                    onClick={() => {
                      setTierPopoverOpen(false);
                      if (onNavigate) onNavigate('achievements');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#123a27] hover:bg-[#1a4e34] border border-emerald-500/40 text-emerald-200 font-bold uppercase transition-colors cursor-pointer text-center"
                  >
                    Achievements
                  </button>
                  <button
                    onClick={() => {
                      setTierPopoverOpen(false);
                      if (onNavigate) onNavigate('progress');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#091b12] hover:bg-[#123a27] border border-[#1e3f2b] text-[#d8c8a8] hover:text-[#f3f1e7] font-bold uppercase transition-colors cursor-pointer text-center"
                  >
                    My Stats
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button: SCAN PLANT */}
          <button
            onClick={onOpenScanner}
            className="bg-[#245336] hover:bg-[#2d6844] active:scale-95 text-[#f3f1e7] font-black px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-black/30 border border-[#4f8a52]/40 transition-all cursor-pointer font-mono"
          >
            <Camera className="w-4 h-4 text-emerald-300" />
            <span className="hidden xs:inline">SCAN PLANT</span>
          </button>
        </div>

      {/* Click-away backdrop for active popovers */}
      {(tierPopoverOpen || streakPopoverOpen) && (
        <div 
          className="fixed inset-0 z-30 bg-transparent"
          onClick={() => {
            setTierPopoverOpen(false);
            setStreakPopoverOpen(false);
          }}
        />
      )}

      </div>
    </header>
  );
}
