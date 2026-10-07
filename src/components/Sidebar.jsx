import React from 'react';
import { 
  Compass, Leaf, Target, Footprints, BookOpen, 
  Award, Activity, Book, FileText, Cpu, Settings, 
  ChevronLeft, ChevronRight
} from 'lucide-react';
import clsx from 'clsx';

export const NAV_GROUPS = [
  {
    title: 'EXPLORE',
    items: [
      { id: 'station', label: 'Field Station', subtitle: 'Main dashboard', icon: Compass },
      { id: 'plant-scout', label: 'Plant Scout', subtitle: 'Scan & identify flora', icon: Leaf },
      { id: 'quests', label: 'Quests', subtitle: 'Outdoor missions', icon: Target },
      { id: 'trails', label: 'Trails', subtitle: 'Curated walking routes', icon: Footprints }
    ]
  },
  {
    title: 'MY FIELD',
    items: [
      { id: 'codex', label: 'Field Codex', subtitle: 'Personal nature journal', icon: BookOpen },
      { id: 'achievements', label: 'Achievements', subtitle: 'Badges & milestones', icon: Award },
      { id: 'progress', label: 'My Progress', subtitle: 'Outdoor activity metrics', icon: Activity }
    ]
  },
  {
    title: 'LEARN',
    items: [
      { id: 'guide', label: 'Nature Guide', subtitle: 'Botanical knowledge', icon: Book },
      { id: 'stories', label: 'Field Stories', subtitle: 'Editorial observations', icon: FileText }
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'local-ai', label: 'Local AI', subtitle: 'Ollama & Gemma runtime', icon: Cpu },
      { id: 'settings', label: 'Settings', subtitle: 'Preferences & storage', icon: Settings }
    ]
  }
];

export default function Sidebar({
  activePage,
  onNavigate,
  collapsed,
  onToggleCollapse,
  ollamaStatus
}) {
  return (
    <aside 
      className={clsx(
        "hidden md:flex flex-col border-r border-[#1e3f2b]/35 bg-[#06150e]/82 backdrop-blur-2xl transition-all duration-300 z-30 shrink-0 select-none",
        collapsed ? "w-20" : "w-64 lg:w-72"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 sm:p-5 border-b border-[#1e3f2b]/35 flex items-start justify-between gap-2">
        {!collapsed ? (
          <div>
            <div className="flex items-center gap-2.5">
              <div className="bg-[#123a27] p-2 rounded-xl text-[#91b79a] border border-[#315c3b]/50 shadow-sm">
                <Compass className="w-5 h-5 text-[#91b79a]" />
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight text-[#f3f1e7] leading-none">
                  NATUREQUEST
                </h1>
                <span className="text-[9px] font-mono font-bold tracking-widest text-[#91b79a] uppercase mt-0.5 block">
                  FIELD EXPLORATION OS
                </span>
              </div>
            </div>

            {/* Model Telemetry Box */}
            <div className="mt-3.5 p-2.5 rounded-xl bg-[#081a11]/70 border border-[#1e3f2b]/50 font-mono text-[10px] space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className={clsx(
                  "w-1.5 h-1.5 rounded-full",
                  ollamaStatus.connected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                )}></span>
                <span className={clsx(
                  "font-bold",
                  ollamaStatus.connected ? "text-emerald-300" : "text-amber-300"
                )}>
                  {ollamaStatus.connected ? "OLLAMA CONNECTED" : "OLLAMA STANDBY"}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#d8c8a8]/80">
                <span>Gemma 3 4B</span>
                <span className="text-[#91b79a] font-semibold">LOCAL</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex flex-col items-center gap-3">
            <div className="bg-[#123a27] p-2 rounded-xl text-[#91b79a] border border-[#315c3b]/50">
              <Compass className="w-5 h-5" />
            </div>
            <span 
              className={clsx(
                "w-2 h-2 rounded-full", 
                ollamaStatus.connected ? "bg-emerald-400 animate-ping" : "bg-amber-400"
              )} 
              title={ollamaStatus.connected ? "Ollama Connected" : "Ollama Standby"}
            />
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-xl text-[#91b79a] hover:text-[#f3f1e7] hover:bg-[#123a27]/60 transition-colors cursor-pointer mt-0.5 shrink-0"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-hide">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-[10px] font-mono font-bold tracking-wider uppercase text-[#91b79a]/70 mb-1">
                {group.title}
              </h3>
            )}

            {group.items.map((item) => {
              const IconComp = item.icon;
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={clsx(
                    "w-full rounded-xl transition-all flex items-center gap-3 text-left group cursor-pointer relative",
                    collapsed ? "p-3 justify-center" : "px-3.5 py-2.5",
                    isActive
                      ? "bg-[#123a27]/80 border border-[#315c3b]/60 text-[#f3f1e7] shadow-md shadow-black/20"
                      : "border border-transparent hover:border-[#1e3f2b]/40 hover:bg-[#0c2417]/50 text-[#d8c8a8]/70 hover:text-[#f3f1e7]"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {/* Vertical Natural Moss Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#4f8a52] rounded-r-full shadow-[0_0_8px_rgba(79,138,82,0.6)]"></div>
                  )}

                  {/* Icon */}
                  <div className={clsx(
                    "p-1.5 rounded-lg transition-colors shrink-0",
                    isActive 
                      ? "text-emerald-300" 
                      : "text-[#91b79a]/70 group-hover:text-emerald-300"
                  )}>
                    <IconComp className="w-4 h-4" />
                  </div>

                  {/* Text (When expanded) */}
                  {!collapsed && (
                    <div className="min-w-0 flex-1">
                      <span className={clsx(
                        "text-xs font-bold tracking-wide block truncate leading-tight",
                        isActive ? "text-[#f3f1e7] font-black" : "text-[#d8c8a8]/90 group-hover:text-[#f3f1e7]"
                      )}>
                        {item.label}
                      </span>
                      <span className="text-[10px] text-[#91b79a]/60 truncate block mt-0.5 leading-none font-sans">
                        {item.subtitle}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Tagline */}
      {!collapsed && (
        <div className="p-3.5 border-t border-[#1e3f2b]/35 bg-[#05110b]/50 font-mono text-[10px] text-[#91b79a]/70 text-center">
          "Discover more outside."
        </div>
      )}
    </aside>
  );
}
