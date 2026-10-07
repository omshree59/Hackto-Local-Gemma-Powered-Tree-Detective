import React, { useState } from 'react';
import { 
  BookOpen, Search, SlidersHorizontal, Leaf, Trees, 
  Flower, Bug, Bird, Mountain, Download, Trash2, ArrowUpDown
} from 'lucide-react';
import clsx from 'clsx';

const CATEGORY_ICONS = {
  tree: Trees,
  flower: Flower,
  insect: Bug,
  bird: Bird,
  rock: Mountain,
  other: Leaf
};

export default function CodexView({
  history,
  onOpenScanner,
  onClearHistory
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'xp' | 'category'

  const categories = ['ALL', 'TREE', 'FLOWER', 'INSECT', 'BIRD', 'ROCK'];

  // Filter
  const filtered = history.filter(item => {
    const matchesCat = selectedCategory === 'ALL' 
      ? true 
      : (item.category || '').toUpperCase() === selectedCategory;
    const matchesSearch = 
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.fact || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.features && item.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'xp') return (b.earned || 0) - (a.earned || 0);
    if (sortBy === 'category') return (a.category || '').localeCompare(b.category || '');
    return (b.id || 0) - (a.id || 0); // newest default
  });

  const exportCodexJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `naturequest_codex_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400">
              OFFLINE TAXONOMIC JOURNAL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            FIELD CODEX
          </h2>
          <p className="text-sm text-stone-400 mt-1 font-sans">
            Your personal local repository of verified biodiversity discoveries.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs">
          <button
            onClick={exportCodexJson}
            disabled={history.length === 0}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 disabled:opacity-40 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Export local discoveries as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT JSON</span>
          </button>

          {history.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Clear all local codex discoveries?')) onClearHistory();
              }}
              className="p-2.5 rounded-xl bg-stone-900 hover:bg-rose-950 text-stone-400 hover:text-rose-300 border border-stone-800 transition-colors cursor-pointer"
              title="Reset Journal"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter, Search & Sort Control Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer",
                selectedCategory === cat
                  ? "bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20"
                  : "bg-stone-900/80 text-stone-400 hover:text-stone-200 border border-stone-800"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Inputs */}
        <div className="flex items-center gap-3">
          
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search taxonomy or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900/90 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-stone-900/90 border border-stone-800 px-3 py-2 rounded-xl text-xs font-mono text-stone-300 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none text-stone-300 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="xp">Highest XP</option>
              <option value="category">By Category</option>
            </select>
          </div>

        </div>

      </div>

      {/* Main Codex Content */}
      {sorted.length === 0 ? (
        <div className="rounded-[2.5rem] border border-dashed border-stone-800 p-12 sm:p-20 text-center flex flex-col items-center justify-center bg-stone-950/40">
          <div className="w-20 h-20 rounded-3xl bg-stone-900 border border-stone-800 text-stone-600 flex items-center justify-center mb-6">
            <Leaf className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-stone-200 tracking-tight">
            Your field notebook is empty.
          </h3>
          <p className="text-sm text-stone-400 max-w-md mt-2 mb-8 leading-relaxed font-sans">
            Go outside and find your first specimen. Step out your door, photograph bark, leaves, or a pollinator, and log it locally.
          </p>
          <button
            onClick={onOpenScanner}
            className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            BEGIN EXPEDITION
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((item) => {
            const catKey = (item.category || 'other').toLowerCase();
            const IconComponent = CATEGORY_ICONS[catKey] || Leaf;

            return (
              <div 
                key={item.id}
                className="bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Category & XP Header */}
                  <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-800/60 flex items-center gap-1.5">
                      <IconComponent className="w-3 h-3" />
                      {item.category}
                    </span>
                    <span className="text-emerald-300 font-black text-xs">
                      +{item.earned || 40} XP
                    </span>
                  </div>

                  {/* Identification Title */}
                  <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-emerald-300 transition-colors">
                    {item.name}
                  </h4>

                  {/* Features Badges */}
                  {item.features && item.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] font-mono text-stone-400 bg-stone-950 px-2 py-0.5 rounded-md border border-stone-800">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Ecological Notes Quote */}
                  <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 my-3">
                    <p className="text-xs text-stone-300 italic leading-relaxed">
                      "{item.fact || item.field_notes || 'Morphology verified via local Gemma 3 tensor analysis.'}"
                    </p>
                  </div>

                  {item.challengeCompleted && (
                    <p className="text-[11px] font-mono text-emerald-400/90 mb-4">
                      ✓ Mission: {item.challengeCompleted}
                    </p>
                  )}

                </div>

                {/* Footer Metadata */}
                <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between text-[10px] font-mono text-stone-300">
                  <span>DISCOVERED: {item.date || 'Today'}</span>
                  <span>{item.time || 'Field Entry'}</span>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
