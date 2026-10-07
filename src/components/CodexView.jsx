import React, { useState } from 'react';
import { 
  BookOpen, Search, Leaf, Trees, Flower, 
  ArrowUpDown, Download, Trash2, X, Eye, Compass
} from 'lucide-react';
import clsx from 'clsx';

const CATEGORY_FILTERS = ['ALL', 'TREES', 'FLOWERS', 'PLANTS'];

export default function CodexView({
  history,
  onOpenScanner,
  onClearHistory,
  onStartChallengeFromCodex
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const filtered = history.filter(item => {
    const cat = (item.category || '').toUpperCase();
    let matchesCat = true;
    if (selectedCategory === 'TREES') matchesCat = cat === 'TREE' || cat.includes('TREE');
    else if (selectedCategory === 'FLOWERS') matchesCat = cat === 'FLOWER';
    else if (selectedCategory === 'PLANTS') matchesCat = !['TREE', 'FLOWER'].includes(cat) || cat === 'PLANT';

    const matchesSearch = 
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.fieldNotes || item.fact || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.features && item.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCat && matchesSearch;
  });

  const exportCodexJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", `naturequest_codex_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 block mb-1">
            PERSONAL NATURE JOURNAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            FIELD CODEX
          </h2>
          <p className="text-sm text-stone-400 mt-1">
            Verified local plant and flora records stored offline in your browser.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs">
          <button
            onClick={exportCodexJson}
            disabled={history.length === 0}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 disabled:opacity-40 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download JSON backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT JSON</span>
          </button>

          {history.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Clear all stored Field Codex discoveries?')) onClearHistory();
              }}
              className="p-2.5 rounded-xl bg-stone-900 hover:bg-rose-950 text-stone-400 hover:text-rose-300 border border-stone-800 transition-colors cursor-pointer"
              title="Clear journal"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-mono text-xs">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                "px-3.5 py-1.5 rounded-xl uppercase font-bold transition-all cursor-pointer",
                selectedCategory === cat
                  ? "bg-emerald-500 text-stone-950 shadow-md"
                  : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search plant or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-900/90 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

      </div>

      {/* Main Grid View */}
      {filtered.length === 0 ? (
        <div className="rounded-[2.5rem] border border-dashed border-stone-800 p-12 sm:p-20 text-center flex flex-col items-center justify-center bg-stone-950/40 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-900 border border-stone-800 text-stone-600 flex items-center justify-center">
            <Leaf className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-white">
            Your field notebook is empty.
          </h3>
          <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
            Go outside and find your first specimen.
          </p>
          <button
            onClick={onOpenScanner}
            className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            BEGIN EXPEDITION
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedEntry(item)}
              className="bg-stone-900/60 border border-stone-800 hover:border-emerald-500/50 rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl flex flex-col justify-between cursor-pointer group transition-all"
            >
              <div>
                {/* Specimen Photograph Preview */}
                <div className="relative aspect-video w-full overflow-hidden bg-stone-950">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-400 bg-emerald-950/20">
                      <Leaf className="w-8 h-8" />
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-[#060806]/85 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase text-emerald-400 border border-stone-800">
                    {item.category}
                  </div>

                  <div className="absolute top-3 right-3 bg-[#060806]/85 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-mono text-stone-300 border border-stone-800">
                    {item.confidence || 'Moderate'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-1">
                    {item.name}
                  </h4>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-3">
                    {item.fieldNotes || item.fact}
                  </p>
                </div>
              </div>

              {/* Bottom Strip */}
              <div className="p-5 pt-0 border-t border-stone-800/50 flex items-center justify-between text-[10px] font-mono text-stone-400 mt-2 pt-3">
                <span>{item.date || 'Oct 07'}</span>
                <span className="text-emerald-400 font-bold">+{item.xp || item.earned || 50} XP</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 bg-[#040604]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#080b08] border border-stone-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-auto space-y-6">
            
            {/* Full Image */}
            <div className="relative aspect-video max-h-[260px] w-full overflow-hidden bg-stone-950">
              {selectedEntry.image ? (
                <img 
                  src={selectedEntry.image} 
                  alt={selectedEntry.name} 
                  className="w-full h-full object-cover filter brightness-95"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-emerald-400 bg-emerald-950/20">
                  <Leaf className="w-12 h-12" />
                </div>
              )}
              <button 
                onClick={() => setSelectedEntry(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-stone-200 hover:text-white bg-[#060806]/80 backdrop-blur-md border border-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 pt-0 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                    {selectedEntry.category} • {selectedEntry.confidence || 'Moderate'} CONFIDENCE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {selectedEntry.name}
                  </h3>
                </div>
                <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800">
                  +{selectedEntry.xp || selectedEntry.earned || 50} XP
                </span>
              </div>

              {/* Visible Features */}
              {selectedEntry.features && selectedEntry.features.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-stone-400">
                    VISIBLE FEATURES
                  </h4>
                  <ul className="text-xs text-stone-300 space-y-1 font-mono">
                    {selectedEntry.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* AI Field Notes */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1">
                <h4 className="text-[10px] font-mono font-bold uppercase text-emerald-400">
                  FIELD NOTES
                </h4>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {selectedEntry.fieldNotes || selectedEntry.fact}
                </p>
              </div>

              {/* Observation Challenge */}
              {(selectedEntry.observationChallenge || selectedEntry.nextChallenge) && (
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 space-y-1">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-teal-300">
                    OBSERVATION CHALLENGE
                  </h4>
                  <p className="text-xs text-stone-200 leading-relaxed font-semibold">
                    {selectedEntry.observationChallenge || selectedEntry.nextChallenge}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between font-mono text-[11px] text-stone-400">
                <span>DISCOVERED: {selectedEntry.date || 'Today'}</span>
                
                <button
                  onClick={() => {
                    if (selectedEntry.observationChallenge || selectedEntry.nextChallenge) {
                      onStartChallengeFromCodex({
                        id: `codex-chal-${Date.now()}`,
                        task: selectedEntry.observationChallenge || selectedEntry.nextChallenge,
                        reward: 50,
                        category: selectedEntry.category || 'PLANTS'
                      });
                      setSelectedEntry(null);
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold uppercase cursor-pointer"
                >
                  START QUEST FROM SPECIMEN
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
