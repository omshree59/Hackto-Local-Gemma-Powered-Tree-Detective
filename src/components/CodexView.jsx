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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1e3f2b]/60">
        <div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52] block mb-1">
            PERSONAL NATURE JOURNAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
            FIELD CODEX
          </h2>
          <p className="text-sm text-[#91b79a] mt-1">
            Verified local botanical discoveries and flora records saved offline in your browser.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs">
          <button
            onClick={exportCodexJson}
            disabled={history.length === 0}
            className="px-4 py-2.5 rounded-xl nature-surface-subtle hover:bg-[#123a27]/80 border border-[#1e3f2b] text-[#d8c8a8] disabled:opacity-40 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download JSON backup"
          >
            <Download className="w-3.5 h-3.5 text-[#4f8a52]" />
            <span>EXPORT JSON</span>
          </button>

          {history.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Clear all stored Field Codex discoveries?')) onClearHistory();
              }}
              className="p-2.5 rounded-xl nature-surface-subtle hover:bg-rose-950/80 text-[#91b79a] hover:text-rose-300 border border-[#1e3f2b] transition-colors cursor-pointer"
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
                  ? "bg-[#4f8a52] text-[#f3f1e7] shadow-lg shadow-[#4f8a52]/20 border border-[#4f8a52]"
                  : "nature-surface-subtle text-[#91b79a] hover:text-[#f3f1e7] border border-[#1e3f2b]/60"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#91b79a] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search plant or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full nature-surface-subtle border border-[#1e3f2b] rounded-xl pl-10 pr-4 py-2 text-xs text-[#f3f1e7] placeholder:text-[#91b79a]/60 focus:outline-none focus:border-[#4f8a52]"
          />
        </div>

      </div>

      {/* Main Grid View */}
      {filtered.length === 0 ? (
        <div className="rounded-[2.5rem] border border-dashed border-[#1e3f2b] p-12 sm:p-20 text-center flex flex-col items-center justify-center nature-surface-subtle space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#091b12] border border-[#1e3f2b] text-[#4f8a52] flex items-center justify-center">
            <Leaf className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-[#f3f1e7]">
            Your field notebook is empty.
          </h3>
          <p className="text-sm text-[#91b79a] max-w-sm leading-relaxed">
            Head outside into the garden, park, or trail to scout your first specimen.
          </p>
          <button
            onClick={onOpenScanner}
            className="bg-[#4f8a52] hover:bg-[#315c3b] text-[#f3f1e7] font-black px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-[#4f8a52]/30 cursor-pointer transition-all"
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
              className="nature-surface-card border border-[#1e3f2b]/70 hover:border-[#4f8a52]/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between cursor-pointer group transition-all"
            >
              <div>
                {/* Specimen Photograph Preview */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#07130b]">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#4f8a52] bg-[#0c2217]">
                      <Leaf className="w-8 h-8" />
                    </div>
                  )}

                  <div className="absolute top-3 left-3 bg-[#06140c]/85 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase text-[#91b79a] border border-[#1e3f2b]">
                    {item.category}
                  </div>

                  <div className="absolute top-3 right-3 bg-[#06140c]/85 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-mono text-[#d8c8a8] border border-[#1e3f2b]">
                    {item.confidence || 'Moderate'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="text-base font-bold text-[#f3f1e7] group-hover:text-[#91b79a] transition-colors leading-snug mb-1">
                    {item.name}
                  </h4>

                  <p className="text-xs text-[#91b79a] line-clamp-2 leading-relaxed mb-3">
                    {item.fieldNotes || item.fact}
                  </p>
                </div>
              </div>

              {/* Bottom Strip */}
              <div className="p-5 pt-0 border-t border-[#1e3f2b]/50 flex items-center justify-between text-[10px] font-mono text-[#91b79a] mt-2 pt-3">
                <span>{item.date || 'Oct 07'}</span>
                <span className="text-[#4f8a52] font-bold">+{item.xp || item.earned || 50} XP</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 bg-[#040c07]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="nature-surface-card border border-[#2a4d34] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-auto space-y-6">
            
            {/* Full Image */}
            <div className="relative aspect-video max-h-[260px] w-full overflow-hidden bg-[#07130b]">
              {selectedEntry.image ? (
                <img 
                  src={selectedEntry.image} 
                  alt={selectedEntry.name} 
                  className="w-full h-full object-cover filter brightness-95"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#4f8a52] bg-[#0c2217]">
                  <Leaf className="w-12 h-12" />
                </div>
              )}
              <button 
                onClick={() => setSelectedEntry(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-[#f3f1e7] hover:text-white bg-[#06140c]/80 backdrop-blur-md border border-[#1e3f2b] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 pt-0 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#4f8a52] uppercase font-bold block mb-1">
                    {selectedEntry.category} • {selectedEntry.confidence || 'Moderate'} CONFIDENCE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#f3f1e7] leading-tight">
                    {selectedEntry.name}
                  </h3>
                </div>
                <span className="text-sm font-mono font-bold text-[#4f8a52] bg-[#0c2619] px-3 py-1 rounded-xl border border-[#1e3f2b]">
                  +{selectedEntry.xp || selectedEntry.earned || 50} XP
                </span>
              </div>

              {/* Visible Features */}
              {selectedEntry.features && selectedEntry.features.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-[#91b79a]">
                    VISIBLE FEATURES
                  </h4>
                  <ul className="text-xs text-[#d8c8a8] space-y-1 font-mono">
                    {selectedEntry.features.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* AI Field Notes */}
              <div className="p-4 rounded-2xl bg-[#07180e]/90 border border-[#1e3f2b] space-y-1">
                <h4 className="text-[10px] font-mono font-bold uppercase text-[#4f8a52]">
                  FIELD NOTES
                </h4>
                <p className="text-xs text-[#f3f1e7] leading-relaxed">
                  {selectedEntry.fieldNotes || selectedEntry.fact}
                </p>
              </div>

              {/* Observation Challenge */}
              {(selectedEntry.observationChallenge || selectedEntry.nextChallenge) && (
                <div className="p-4 rounded-2xl bg-[#0d281a]/80 border border-[#315c3b]/60 space-y-1">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-[#91b79a]">
                    OBSERVATION CHALLENGE
                  </h4>
                  <p className="text-xs text-[#f3f1e7] leading-relaxed font-semibold">
                    {selectedEntry.observationChallenge || selectedEntry.nextChallenge}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-[#1e3f2b]/60 flex items-center justify-between font-mono text-[11px] text-[#91b79a]">
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
                  className="px-5 py-2.5 rounded-xl bg-[#4f8a52] hover:bg-[#315c3b] text-[#f3f1e7] font-bold uppercase cursor-pointer transition-colors"
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
