import { 
  Compass, Leaf, Target, Footprints, BookOpen, 
  Award, Activity, Book, FileText, Cpu, Settings, 
  ChevronLeft, ChevronRight, Camera, Play
} from 'lucide-react';
import clsx from 'clsx';
import TrueFocus from './TrueFocus';

const NAV_GROUPS = [
  {
    title: 'EXPLORE',
    items: [
      { id: 'station', label: 'Field Station', subtitle: 'Main expedition hub', icon: Compass },
      { id: 'plant-scout', label: 'Plant Scout', subtitle: 'Scan & classify flora', icon: Leaf },
      { id: 'quests', label: 'Quests', subtitle: 'Sensory outdoor tasks', icon: Target },
      { id: 'trails', label: 'Trails', subtitle: 'Curated nature circuits', icon: Footprints }
    ]
  },
  {
    title: 'MY FIELD',
    items: [
      { id: 'codex', label: 'Field Codex', subtitle: 'Personal plant journal', icon: BookOpen, badge: 'history' },
      { id: 'achievements', label: 'Achievements', subtitle: 'Badges & milestones', icon: Award },
      { id: 'progress', label: 'My Progress', subtitle: 'Time outdoors & logs', icon: Activity },
      { id: 'my-plants', label: 'My Plants', subtitle: 'Growth timeline', icon: Leaf }
    ]
  },
  {
    title: 'LEARN',
    items: [
      { id: 'guide', label: 'Nature Guide', subtitle: 'Botanical field primers', icon: Book },
      { id: 'stories', label: 'Field Stories', subtitle: 'Naturalist essays', icon: FileText }
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'local-ai', label: 'Local AI', subtitle: 'Gemma 3 daemon specs', icon: Cpu },
      { id: 'settings', label: 'Settings', subtitle: 'Offline data & controls', icon: Settings }
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
              <Compass className="w-5 h-5 text-[#91b79a]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-black tracking-tight text-[#f3f1e7] leading-none">
                  NATUREQUEST
                </h1>
                <span className="text-[8px] font-mono font-bold text-[#4f8a52] bg-[#0c2619] px-1.5 py-0.5 rounded border border-[#1e3f2b]">
                  OS
                </span>
              </div>
              <span className="text-[9px] font-mono font-semibold tracking-wider text-[#91b79a]/80 uppercase mt-0.5 block truncate">
                FIELD INTELLIGENCE
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex flex-col items-center">
            <div className="bg-[#0f3020] p-2 rounded-xl text-[#91b79a] border border-[#1e3f2b]">
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
            <div className="p-2 rounded-xl bg-[#081a11] border border-[#1e3f2b]/60 font-mono text-[10px] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className={clsx(
                  "w-1.5 h-1.5 rounded-full shrink-0",
                  ollamaStatus?.connected ? "bg-[#4f8a52] animate-pulse" : "bg-amber-400"
                )}></span>
                <span className="text-[#f3f1e7] font-bold truncate">
                  {ollamaStatus?.connected ? "Gemma 3 (4B)" : "Ollama Standby"}
                </span>
              </div>
              <span className="text-[9px] text-[#91b79a] font-bold uppercase bg-[#0c2619] px-1.5 py-0.5 rounded border border-[#1e3f2b] shrink-0">
                LOCAL
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center pb-1">
            <span 
              className={clsx(
                "w-2 h-2 rounded-full",
                ollamaStatus?.connected ? "bg-[#4f8a52] animate-pulse" : "bg-amber-400"
              )}
              title={ollamaStatus?.connected ? "Ollama Connected" : "Ollama Standby"}
            />
          </div>
        )}

        {/* Navigation Categories */}
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            {!collapsed && (
              <div className="flex items-center justify-between px-2 pt-1 mb-0.5">
                <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-[#91b79a]/60">
                  {group.title}
                </span>
                <span className="text-[8px] font-mono text-[#91b79a]/40">
                  {group.items.length}
                </span>
              </div>
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const IconComp = item.icon;
                const isActive = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={clsx(
                      "w-full rounded-xl transition-all flex items-center text-left group cursor-pointer relative",
                      collapsed ? "p-2.5 justify-center" : "px-3 py-2 gap-2.5",
                      isActive
                        ? "bg-[#123a27] border border-[#315c3b]/70 text-[#f3f1e7] shadow-sm"
                        : "border border-transparent hover:border-[#1e3f2b]/40 hover:bg-[#0c2417]/50 text-[#d8c8a8]/85 hover:text-[#f3f1e7]"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {/* Active Accent Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#4f8a52] rounded-r-full shadow-[0_0_8px_rgba(79,138,82,0.7)]" />
                    )}

                    {/* Icon */}
                    <div className={clsx(
                      "p-1 rounded-lg transition-colors shrink-0",
                      isActive 
                        ? "text-[#4f8a52] bg-[#0c2619]" 
                        : "text-[#91b79a]/70 group-hover:text-[#4f8a52]"
                    )}>
                      <IconComp className="w-4 h-4" />
                    </div>

                    {/* Text Details (Expanded) */}
                    {!collapsed && (
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className={clsx(
                            "text-xs font-bold tracking-tight truncate leading-tight",
                            isActive ? "text-[#f3f1e7]" : "text-[#d8c8a8] group-hover:text-[#f3f1e7]"
                          )}>
                            {item.label}
                          </span>

                          {/* Dynamic Badges */}
                          {item.badge === 'history' && historyCount > 0 && (
                            <span className="text-[9px] font-mono font-bold text-[#4f8a52] bg-[#0c2619] px-1.5 py-0.2 rounded-md border border-[#1e3f2b]">
                              {historyCount}
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] text-[#91b79a]/60 truncate block mt-0.5 leading-none font-sans">
                          {item.subtitle}
                        </span>
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
              <div className="p-2.5 rounded-xl bg-[#081a11] border border-[#1e3f2b] space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="text-[#91b79a] font-bold uppercase flex items-center gap-1">
                    <Target className="w-3 h-3 text-[#4f8a52]" />
                    ACTIVE MISSION
                  </span>
                  <span className="text-[#4f8a52] font-bold">
                    +{activeMission.reward || 50} XP
                  </span>
                </div>

                <p className="text-[11px] font-bold text-[#f3f1e7] leading-tight line-clamp-1">
                  {activeMission.title || activeMission.task}
                </p>

                {onStartQuest && (
                  <button
                    onClick={() => onStartQuest(activeMission)}
                    className="w-full py-1.5 bg-[#123a27] hover:bg-[#194e34] text-[#91b79a] hover:text-[#f3f1e7] rounded-lg text-[10px] font-mono font-bold uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#1e3f2b]"
                  >
                    <Play className="w-2.5 h-2.5 text-[#4f8a52]" />
                    <span>LAUNCH OUTDOOR MODE</span>
                  </button>
                )}
              </div>
            )}

            {/* Expedition Level & Progress Bar */}
            <div className="p-2.5 rounded-xl bg-[#07170e] border border-[#1e3f2b]/60 space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-[#f3f1e7] font-bold">
                  Tier {level} Naturalist
                </span>
                <span className="text-[#4f8a52] font-semibold">
                  {xpInTier}/200 XP
                </span>
              </div>

              <div className="h-1.5 w-full bg-[#05110b] rounded-full overflow-hidden border border-[#1e3f2b]/50">
                <div 
                  className="h-full bg-gradient-to-r from-[#315c3b] to-[#4f8a52] transition-all duration-500 rounded-full"
                  style={{ width: `${xpPct}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[9px] text-[#91b79a]/70 pt-0.5">
                <span>{historyCount} Specimen{historyCount === 1 ? '' : 's'}</span>
                <span>Zero Cloud AI</span>
              </div>
            </div>

            {/* Quick Plant Scan CTA */}
            {onOpenScanner && (
              <button
                onClick={onOpenScanner}
                className="w-full py-2 bg-[#4f8a52] hover:bg-[#315c3b] text-[#f3f1e7] rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#4f8a52]/20 cursor-pointer transition-all active:scale-[0.98]"
                title="Scan specimen with optical camera"
              >
                <Camera className="w-3.5 h-3.5 text-[#f3f1e7] shrink-0" />
                <TrueFocus
                  sentence="SCAN THE PLANT"
                  blurAmount={1.5}
                  borderColor="#86efac"
                  glowColor="rgba(134, 239, 172, 0.7)"
                  animationDuration={0.45}
                  pauseBetweenAnimations={0.9}
                  wordClassName="text-[11px] font-mono font-black tracking-wider text-[#f3f1e7]"
                />
              </button>
            )}

          </div>
        )}

      </div>

      {/* 3. Sleek, Non-Obtrusive Pinned Footer */}
      <div className="px-3 py-2.5 border-t border-[#1e3f2b]/40 bg-[#06150e] shrink-0 text-center">
        {!collapsed ? (
          <div className="flex items-center justify-between text-[9px] font-mono text-[#91b79a]/70">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              OFFLINE READY
            </span>
            <span>NO TELEMETRY</span>
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
