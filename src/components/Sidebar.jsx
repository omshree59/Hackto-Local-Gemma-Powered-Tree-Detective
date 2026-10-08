import { 
  Compass, Leaf, Target, Footprints, BookOpen, 
  Award, Activity, Book, FileText, Cpu, Settings, 
  ChevronLeft, ChevronRight, Camera, Play
} from 'lucide-react';
import clsx from 'clsx';
import TrueFocus from './TrueFocus';
import RotatingText from './RotatingText';

const NAV_GROUPS = [
  {
    title: 'EXPLORE',
    items: [
      { 
        id: 'station', 
        label: 'Field Station', 
        subtitle: 'Main expedition hub',
        subtitles: ['Main expedition hub', 'Live Flora Sensors', 'Bio-Electric Station'],
        icon: Compass 
      },
      { 
        id: 'plant-scout', 
        label: 'Plant Scout', 
        subtitle: 'Scan & classify flora',
        subtitles: ['Scan & classify flora', 'Multimodal Vision AI', 'Gemma 3 Diagnostics'],
        icon: Leaf 
      },
      { 
        id: 'quests', 
        label: 'Quests', 
        subtitle: 'Sensory outdoor tasks',
        subtitles: ['Sensory outdoor tasks', 'Daily Field Challenges', 'Earn Botanical XP'],
        icon: Target 
      },
      { 
        id: 'trails', 
        label: 'Trails', 
        subtitle: 'Curated nature circuits',
        subtitles: ['Curated nature circuits', 'Park Trail Guides', 'GPS Expedition Loops'],
        icon: Footprints 
      }
    ]
  },
  {
    title: 'MY FIELD',
    items: [
      { 
        id: 'codex', 
        label: 'Field Codex', 
        subtitle: 'Personal plant journal',
        subtitles: ['Personal plant journal', 'Offline Flora Database', 'Verified Botanical Logs'],
        icon: BookOpen, 
        badge: 'history' 
      },
      { 
        id: 'achievements', 
        label: 'Achievements', 
        subtitle: 'Badges & milestones',
        subtitles: ['Badges & milestones', 'Naturalist Medals', 'Rank Up Expeditions'],
        icon: Award 
      },
      { 
        id: 'progress', 
        label: 'My Progress', 
        subtitle: 'Time outdoors & logs',
        subtitles: ['Time outdoors & logs', 'Observation Heatmap', 'Streak Tracking'],
        icon: Activity 
      },
      { 
        id: 'my-plants', 
        label: 'My Plants', 
        subtitle: 'Growth timeline',
        subtitles: ['Growth timeline', 'Saved Herbarium', 'Specimen Lifecycle'],
        icon: Leaf 
      }
    ]
  },
  {
    title: 'LEARN',
    items: [
      { 
        id: 'guide', 
        label: 'Nature Guide', 
        subtitle: 'Botanical field primers',
        subtitles: ['Botanical field primers', 'Leaf & Bark Keys', 'Edible & Medicinal Notes'],
        icon: Book 
      },
      { 
        id: 'stories', 
        label: 'Field Stories', 
        subtitle: 'Naturalist essays',
        subtitles: ['Naturalist essays', 'Field Log Archives', 'Wilderness Chronicles'],
        icon: FileText 
      }
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { 
        id: 'local-ai', 
        label: 'Local AI', 
        subtitle: 'Gemma 3 daemon specs',
        subtitles: ['Gemma 3 daemon specs', 'Zero-Cloud Multimodal', 'Private On-Device Engine'],
        icon: Cpu 
      },
      { 
        id: 'settings', 
        label: 'Settings', 
        subtitle: 'Offline data & controls',
        subtitles: ['Offline data & controls', 'Cache & Storage Sync', 'Hardware Acceleration'],
        icon: Settings 
      }
    ]
  }
];

export default function Sidebar({
  activePage,
  onNavigate,
  collapsed,
  onToggleCollapse,
  ollamaStatus,
  xp = 0,
  level = 1,
  historyCount = 0,
  activeMission,
  onStartQuest,
  onOpenScanner
}) {
  const xpInTier = xp % 200;
  const xpPct = Math.min((xpInTier / 200) * 100, 100);

  return (
    <aside 
      className={clsx(
        "hidden md:flex flex-col h-full border-r border-[#1e3f2b]/40 bg-[#06150e] transition-all duration-300 z-30 shrink-0 select-none shadow-2xl relative",
        collapsed ? "w-20" : "w-64 lg:w-72"
      )}
    >
      {/* 1. Sidebar Header */}
      <div className="p-3.5 border-b border-[#1e3f2b]/40 flex items-center justify-between gap-2 shrink-0 bg-[#06150e]">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="bg-[#0f3020] p-2 rounded-xl text-[#4f8a52] border border-[#1e3f2b] shadow-inner shrink-0">
              <Compass className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-black tracking-tight text-[#f3f1e7] leading-none glow-text-mint">
                  NATUREQUEST
                </h1>
                <span className="text-[8px] font-mono font-bold text-emerald-300 bg-[#0c2619] px-1.5 py-0.5 rounded border border-emerald-500/40 glow-text-emerald-sm">
                  OS
                </span>
              </div>
              <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-400 uppercase mt-0.5 block truncate glow-text-emerald-sm">
                FIELD INTELLIGENCE
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex flex-col items-center">
            <div className="bg-[#0f3020] p-2 rounded-xl text-emerald-400 border border-[#1e3f2b]">
              <Compass className="w-5 h-5" />
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-xl text-[#91b79a] hover:text-[#f3f1e7] hover:bg-[#123a27]/60 transition-colors cursor-pointer shrink-0"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. Unified Scrollable Nav Section (Clean & Non-overlapping) */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-3.5 scrollbar-nature">
        
        {/* Quick Local AI Status Pill */}
        {!collapsed ? (
          <div className="px-0.5">
            <div className="p-2 rounded-xl bg-[#081a11] border border-emerald-600/30 font-mono text-[10px] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className={clsx(
                  "w-1.5 h-1.5 rounded-full shrink-0",
                  ollamaStatus?.connected ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                )}></span>
                <span className={clsx(
                  "font-bold truncate text-[10.5px]",
                  ollamaStatus?.connected ? "text-emerald-300 glow-text-emerald-sm" : "text-amber-300 glow-text-amber"
                )}>
                  {ollamaStatus?.connected ? "Gemma 3 (4B)" : "Ollama Standby"}
                </span>
              </div>
              <span className="text-[9px] text-emerald-300 font-bold uppercase bg-[#0c2619] px-1.5 py-0.5 rounded border border-emerald-500/40 shrink-0 glow-text-emerald-sm">
                LOCAL
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center pb-1">
            <span 
              className={clsx(
                "w-2 h-2 rounded-full",
                ollamaStatus?.connected ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" : "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              )}
              title={ollamaStatus?.connected ? "Ollama Connected" : "Ollama Standby"}
            />
          </div>
        )}

        {/* Navigation Categories */}
        {NAV_GROUPS.map((group, groupIdx) => (
          <div key={group.title} className="space-y-1">
            {!collapsed && (
              <div className="flex items-center justify-between px-2 pt-1 mb-0.5">
                <span className="text-[9px] font-mono font-black tracking-wider uppercase text-emerald-400/90 glow-text-emerald-sm">
                  {group.title}
                </span>
                <span className="text-[8px] font-mono font-bold text-emerald-500/70">
                  {group.items.length}
                </span>
              </div>
            )}

            <div className="space-y-0.5">
              {group.items.map((item, itemIdx) => {
                const IconComp = item.icon;
                const isActive = activePage === item.id;
                const itemOffset = groupIdx * 4 + itemIdx;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={clsx(
                      "w-full rounded-xl transition-all flex items-center text-left group cursor-pointer relative",
                      collapsed ? "p-2.5 justify-center" : "px-3 py-2 gap-2.5",
                      isActive
                        ? "bg-[#123a27] border border-emerald-500/60 text-[#f3f1e7] shadow-[0_0_16px_rgba(34,197,94,0.2)]"
                        : "border border-transparent hover:border-[#1e3f2b]/60 hover:bg-[#0c2417]/60 text-[#d8c8a8] hover:text-[#f3f1e7]"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {/* Active Accent Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-400 rounded-r-full shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                    )}

                    {/* Icon */}
                    <div className={clsx(
                      "p-1 rounded-lg transition-colors shrink-0",
                      isActive 
                        ? "text-emerald-300 bg-[#0c2619] shadow-[0_0_8px_rgba(74,222,128,0.5)]" 
                        : "text-emerald-400/70 group-hover:text-emerald-300"
                    )}>
                      <IconComp className="w-4 h-4" />
                    </div>

                    {/* Text Details (Expanded) */}
                    {!collapsed && (
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className={clsx(
                            "text-xs font-bold tracking-tight truncate leading-tight transition-all",
                            isActive 
                              ? "text-emerald-200 glow-text-mint font-extrabold" 
                              : "text-[#f3f1e7] group-hover:text-emerald-200 group-hover:glow-text-emerald-sm"
                          )}>
                            {item.label}
                          </span>

                          {/* Dynamic Badges */}
                          {item.badge === 'history' && historyCount > 0 && (
                            <span className="text-[9px] font-mono font-bold text-emerald-300 glow-text-emerald-sm bg-[#0c2619] px-1.5 py-0.5 rounded-md border border-emerald-500/40">
                              {historyCount}
                            </span>
                          )}
                        </div>

                        {/* Glowing RotatingText Subtitle */}
                        <div className="h-3.5 overflow-hidden flex items-center mt-0.5 w-full">
                          <RotatingText
                            texts={item.subtitles || [item.subtitle]}
                            rotationInterval={2600 + (itemOffset % 5) * 350}
                            staggerDuration={0.02}
                            staggerFrom="first"
                            mainClassName="text-[10px] font-semibold tracking-wide leading-none"
                            splitLevelClassName="overflow-hidden"
                            elementLevelClassName={clsx(
                              "transition-all",
                              isActive 
                                ? "text-emerald-300 glow-text-mint-sm font-bold" 
                                : "text-emerald-400/80 group-hover:text-emerald-300 glow-text-emerald-sm"
                            )}
                            transition={{ type: "spring", damping: 25, stiffness: 350 }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* In-Flow Expedition Widgets (Natural Scrolling, No Overlap!) */}
        {!collapsed && (
          <div className="pt-3 border-t border-[#1e3f2b]/40 space-y-2.5 pb-3">
            
            {/* Active Mission Mini Card */}
            {activeMission && (
              <div className="p-2.5 rounded-xl bg-[#081a11] border border-emerald-600/30 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="text-emerald-400 font-bold uppercase flex items-center gap-1 glow-text-emerald-sm">
                    <Target className="w-3 h-3 text-emerald-400" />
                    ACTIVE MISSION
                  </span>
                  <span className="text-emerald-300 font-bold glow-text-emerald-sm">
                    +{activeMission.reward || 50} XP
                  </span>
                </div>

                <p className="text-[11px] font-bold text-[#f3f1e7] leading-tight line-clamp-1 glow-text-mint-sm">
                  {activeMission.title || activeMission.task}
                </p>

                {onStartQuest && (
                  <button
                    onClick={() => onStartQuest(activeMission)}
                    className="w-full py-1.5 bg-[#123a27] hover:bg-[#194e34] text-emerald-300 hover:text-[#f3f1e7] rounded-lg text-[10px] font-mono font-bold uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-600/30 glow-text-emerald-sm"
                  >
                    <Play className="w-2.5 h-2.5 text-emerald-400" />
                    <span>LAUNCH OUTDOOR MODE</span>
                  </button>
                )}
              </div>
            )}

            {/* Expedition Level & Progress Bar */}
            <div className="p-2.5 rounded-xl bg-[#07170e] border border-emerald-600/30 space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-200 font-bold glow-text-mint-sm">
                  Tier {level} Naturalist
                </span>
                <span className="text-emerald-300 font-semibold glow-text-emerald-sm">
                  {xpInTier}/200 XP
                </span>
              </div>

              <div className="h-1.5 w-full bg-[#05110b] rounded-full overflow-hidden border border-[#1e3f2b]/50">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.7)]"
                  style={{ width: `${xpPct}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[9px] text-emerald-400/80 pt-0.5 glow-text-emerald-sm">
                <span>{historyCount} Specimen{historyCount === 1 ? '' : 's'}</span>
                <span>Zero Cloud AI</span>
              </div>
            </div>

            {/* Quick Plant Scan CTA */}
            {onOpenScanner && (
              <button
                onClick={onOpenScanner}
                className="w-full py-2 bg-[#2d6844] hover:bg-[#388255] text-[#f3f1e7] rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer transition-all active:scale-[0.98] border border-emerald-500/40"
                title="Scan specimen with optical camera"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <TrueFocus
                  sentence="SCAN THE PLANT"
                  blurAmount={1.5}
                  borderColor="#86efac"
                  glowColor="rgba(134, 239, 172, 0.7)"
                  animationDuration={0.45}
                  pauseBetweenAnimations={0.9}
                  wordClassName="text-[11px] font-mono font-black tracking-wider text-[#f3f1e7] glow-text-mint-sm"
                />
              </button>
            )}

          </div>
        )}

      </div>

      {/* 3. Sleek, Non-Obtrusive Pinned Footer */}
      <div className="px-3 py-2.5 border-t border-[#1e3f2b]/40 bg-[#06150e] shrink-0 text-center">
        {!collapsed ? (
          <div className="flex items-center justify-between text-[9px] font-mono text-emerald-400/80">
            <span className="flex items-center gap-1.5 glow-text-emerald-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.9)] animate-pulse"></span>
              OFFLINE READY
            </span>
            <span className="glow-text-emerald-sm">NO TELEMETRY</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {onOpenScanner && (
              <button
                onClick={onOpenScanner}
                className="p-2 rounded-xl bg-[#4f8a52] hover:bg-[#315c3b] text-[#f3f1e7] cursor-pointer shadow-md"
                title="Scan Specimen"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

    </aside>
  );
}
