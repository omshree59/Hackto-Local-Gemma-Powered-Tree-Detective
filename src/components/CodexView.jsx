import { useState } from 'react';
import { 
  BookOpen, Search, Leaf, Trees, Flower, 
  ArrowUpDown, Download, Trash2, X, Eye, Compass, LayoutDashboard, CheckCircle,
  GitFork
} from 'lucide-react';
import clsx from 'clsx';
import PhylogeneticTree from './PhylogeneticTree';

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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'tree'
  
  // Compare Mode State
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareSelection, setCompareSelection] = useState([]);
  const [compareResult, setCompareResult] = useState(null);
  const [isComparing, setIsComparing] = useState(false);

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

  const toggleCompareSelection = (item) => {
    if (compareSelection.find(c => c.id === item.id)) {
      setCompareSelection(compareSelection.filter(c => c.id !== item.id));
    } else {
      if (compareSelection.length < 2) {
        setCompareSelection([...compareSelection, item]);
      }
    }
  };

  const handleRunCompare = async () => {
    if (compareSelection.length !== 2) return;
    setIsComparing(true);
    
    // Simulate Local AI Comparison
    setTimeout(() => {
      setIsComparing(false);
      setCompareResult({
        similarities: [
          'Both possess distinct midrib veins for structural support',
          'Similar photosynthetic leaf coloring and chlorophyll density'
        ],
        differences: [
          `${compareSelection[0].name} has different edge serrations compared to ${compareSelection[1].name}`,
          'Overall canopy shape and sunlight requirements differ'
        ],
        whatToObserveNext: 'Find a third plant that shares characteristics of both, and note which features are dominant.'
      });
    }, 1500);
  };

  const closeCompare = () => {
    setCompareResult(null);
    setCompareSelection([]);
    setIsCompareMode(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1e3f2b]/60">
        <div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52] block mb-1">
            PERSONAL NATURE JOURNAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
            Field Codex
          </h2>
          <p className="text-sm text-[#91b79a] mt-1 max-w-xl">
            Verified local botanical discoveries and flora records saved offline in your browser.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto font-mono text-xs">
          {/* Mode Switcher: Grid vs Phylogenetic Tree */}
          <div className="flex items-center rounded-xl bg-[#071910] border border-[#1e3f2b] p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={clsx(
                "px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                viewMode === 'grid'
                  ? "bg-[#245336] text-[#f3f1e7] shadow"
                  : "text-[#91b79a] hover:text-[#f3f1e7]"
              )}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Grid Codex</span>
            </button>

            <button
              onClick={() => setViewMode('tree')}
              className={clsx(
                "px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer",
                viewMode === 'tree'
                  ? "bg-[#245336] text-[#f3f1e7] shadow"
                  : "text-[#91b79a] hover:text-[#f3f1e7]"
              )}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Tree of Life</span>
            </button>
          </div>

          <button
            onClick={() => {
              setIsCompareMode(!isCompareMode);
              setCompareSelection([]);
              setCompareResult(null);
            }}
            className={clsx(
              "px-4 py-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-2 font-bold",
              isCompareMode 
                ? "bg-[#245336] border-[#4f8a52] text-[#f3f1e7]" 
                : "nature-surface-subtle hover:bg-[#123a27]/80 border-[#1e3f2b] text-[#d8c8a8]"
            )}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>COMPARE PLANTS</span>
          </button>

          <button
            onClick={exportCodexJson}
            disabled={history.length === 0}
            className="px-4 py-2.5 rounded-xl nature-surface-subtle hover:bg-[#123a27]/80 border border-[#1e3f2b] text-[#d8c8a8] disabled:opacity-40 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Download JSON backup"
          >
            <Download className="w-3.5 h-3.5 text-[#4f8a52]" />
            <span className="hidden sm:inline">EXPORT</span>
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

      {isCompareMode && !compareResult && (
        <div className="bg-[#091b12] border border-[#4f8a52] rounded-2xl p-4 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono font-bold text-emerald-400">
              SELECT 2 PLANTS TO COMPARE ({compareSelection.length}/2)
            </span>
          </div>
          {compareSelection.length === 2 && (
            <button
              onClick={handleRunCompare}
              className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#06100b] text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              {isComparing ? 'ANALYZING...' : 'RUN AI COMPARISON'}
            </button>
          )}
        </div>
      )}

      {viewMode === 'tree' ? (
        <PhylogeneticTree history={history} />
      ) : (
        <>
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
          <p className="text-sm text-[#91b79a] max-w-sm leading-relaxed font-sans">
            Head outside into the garden, park, or trail to scout your first specimen.
          </p>
          <button
            onClick={onOpenScanner}
            className="bg-[#4f8a52] hover:bg-[#315c3b] text-[#f3f1e7] font-black px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-[#4f8a52]/30 cursor-pointer transition-all mt-4 font-mono"
          >
            BEGIN EXPEDITION
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const isSelectedForCompare = compareSelection.find(c => c.id === item.id);
            return (
            <div
              key={item.id}
              onClick={() => {
                if (isCompareMode) {
                  toggleCompareSelection(item);
                } else {
                  setSelectedEntry(item);
                }
              }}
              className={clsx(
                "nature-surface-card border rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between cursor-pointer group transition-all",
                isSelectedForCompare ? "border-emerald-500 bg-[#091b12] scale-[1.02]" : "border-[#1e3f2b]/70 hover:border-[#4f8a52]/60"
              )}
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

                  {isCompareMode && isSelectedForCompare && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-[#06100b]">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="text-base font-bold text-[#f3f1e7] group-hover:text-[#91b79a] transition-colors leading-snug mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#91b79a] line-clamp-2 leading-relaxed mb-3 font-sans">
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
            );
          })}
        </div>
      )}
      </>
      )}

      {/* Compare Result Modal */}
      {compareResult && (
        <div className="fixed inset-0 z-50 bg-[#040c07]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="nature-surface-card border border-[#4f8a52] w-full max-w-4xl rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative space-y-8 font-sans">
            
            <div className="flex justify-between items-center border-b border-[#1e3f2b] pb-4">
              <h3 className="text-3xl font-black text-[#f3f1e7] flex items-center gap-3">
                <LayoutDashboard className="w-6 h-6 text-emerald-400" /> Plant Comparison
              </h3>
              <button onClick={closeCompare} className="p-2 bg-[#0c2619] rounded-xl border border-[#1e3f2b] text-[#91b79a] hover:text-white cursor-pointer">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {compareSelection.map((p, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-full aspect-video rounded-2xl overflow-hidden border border-[#1e3f2b]">
                    {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#0a1e14]"></div>}
                  </div>
                  <h4 className="text-xl font-bold text-[#f3f1e7] leading-snug">{p.name}</h4>
                  <div className="text-xs font-mono text-[#91b79a] uppercase">{p.category}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#1e3f2b]/50">
              <div className="bg-[#0a1e14] border border-[#1e3f2b] rounded-2xl p-5">
                <h4 className="text-xs font-mono font-bold text-emerald-400 mb-3 uppercase tracking-wider">Similarities</h4>
                <ul className="space-y-2 text-sm text-[#d8c8a8]">
                  {compareResult.similarities.map((s, i) => <li key={i} className="flex gap-2"><span className="text-emerald-500">✓</span> {s}</li>)}
                </ul>
              </div>
              <div className="bg-[#12100a] border border-[#302b1c] rounded-2xl p-5">
                <h4 className="text-xs font-mono font-bold text-amber-400 mb-3 uppercase tracking-wider">Differences</h4>
                <ul className="space-y-2 text-sm text-[#d8c8a8]">
                  {compareResult.differences.map((s, i) => <li key={i} className="flex gap-2"><span className="text-amber-500">~</span> {s}</li>)}
                </ul>
              </div>
            </div>

            <div className="bg-[#245336] p-5 rounded-2xl border border-[#4f8a52]/40 shadow-inner">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 mb-2">What to Observe Next</h4>
              <p className="text-sm font-bold text-[#f3f1e7] leading-relaxed">{compareResult.whatToObserveNext}</p>
            </div>

          </div>
        </div>
      )}

      {/* Entry Detail Modal */}
      {selectedEntry && !isCompareMode && (
        <div className="fixed inset-0 z-50 bg-[#040c07]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto py-12">
          <div className="nature-surface-card border border-[#2a4d34] w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl relative my-auto space-y-6 flex flex-col">
            
            {/* Full Image */}
            <div className="relative w-full h-48 sm:h-64 bg-[#07130b] shrink-0">
              {selectedEntry.image ? (
                <img 
                  src={selectedEntry.image} 
                  alt={selectedEntry.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#4f8a52]">
                  <Leaf className="w-12 h-12" />
                </div>
              )}

              <button 
                onClick={() => setSelectedEntry(null)}
                className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#06120b]/60 backdrop-blur-md border border-[#1e3f2b] text-[#f3f1e7] hover:bg-[#06120b] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 pt-2">
              <div className="flex items-center gap-3 mb-4 font-mono text-[11px]">
                <span className="text-[#4f8a52] font-bold uppercase tracking-wider bg-[#0c2619] px-2.5 py-1 rounded-md border border-[#1e3f2b]">
                  {selectedEntry.category || 'PLANT'}
                </span>
                <span className="text-[#91b79a]">
                  Discovered {selectedEntry.date || 'Oct 07'}
                </span>
              </div>

              <h3 className="text-3xl font-black text-[#f3f1e7] mb-6 leading-tight">
                {selectedEntry.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-[10px] font-mono font-bold uppercase text-[#91b79a] mb-2">FIELD NOTES</h4>
                  <p className="text-xs text-[#d8c8a8] leading-relaxed font-sans">
                    {selectedEntry.fieldNotes || selectedEntry.fact || 'No field notes available.'}
                  </p>
                </div>
                {selectedEntry.whereToLook && (
                  <div>
                    <h4 className="text-[10px] font-mono font-bold uppercase text-[#91b79a] mb-2">HABITAT</h4>
                    <p className="text-xs text-[#d8c8a8] leading-relaxed font-sans">
                      {selectedEntry.whereToLook}
                    </p>
                  </div>
                )}
              </div>

              {selectedEntry.features && selectedEntry.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-[#91b79a] mb-2">VISIBLE FEATURES</h4>
                  <ul className="space-y-1.5">
                    {selectedEntry.features.map((f, i) => (
                      <li key={i} className="text-xs text-[#f3f1e7] font-sans flex items-start gap-2">
                        <span className="text-[#4f8a52]">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEntry.observationChallenge && (
                <div className="bg-[#123a27]/40 border border-[#315c3b]/60 rounded-2xl p-5 mt-6">
                  <h4 className="text-[10px] font-mono font-bold uppercase text-emerald-400 mb-2">RELATED QUEST</h4>
                  <p className="text-sm font-bold text-[#f3f1e7] mb-4">
                    {selectedEntry.observationChallenge}
                  </p>
                  <button
                    onClick={() => {
                      onStartChallengeFromCodex({
                        id: `quest-${selectedEntry.id}`,
                        title: 'Codex Exploration',
                        category: 'OBSERVATION',
                        duration: '15 min',
                        difficulty: 'Easy',
                        reward: 50,
                        objective: selectedEntry.observationChallenge
                      });
                      setSelectedEntry(null);
                    }}
                    className="bg-[#245336] hover:bg-[#2d6844] text-[#f3f1e7] text-[10px] font-mono font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    START QUEST
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
