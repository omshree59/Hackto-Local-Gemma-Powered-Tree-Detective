import { useState, useMemo } from 'react';
import { 
  GitFork, 
  Leaf, 
  ChevronRight, 
  ChevronDown, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Search,
  Filter
} from 'lucide-react';
import clsx from 'clsx';

// Authoritative botanical evolutionary phylogeny taxonomy tree
const PHYLOGENY_DATA = {
  id: 'plantae',
  name: 'Plantae (Archaeplastida)',
  rank: 'Kingdom',
  era: '~1.6 Billion years ago (Mesoproterozoic)',
  description: 'Primary autotrophic viridiplantae with chlorophyll a and b, cellulose cell walls.',
  children: [
    {
      id: 'bryophytes',
      name: 'Bryophytes',
      rank: 'Non-Vascular Clade',
      era: '~470 Mya (Ordovician)',
      description: 'Primitive land plants lacking specialized xylem and phloem vascular tissue.',
      children: [
        {
          id: 'bryophyta',
          name: 'Bryophyta (True Mosses)',
          rank: 'Division',
          era: '~450 Mya',
          species: [
            {
              id: 'sphagnum',
              name: 'Peat Moss',
              scientific: 'Sphagnum palustre',
              family: 'Sphagnaceae',
              habitat: 'Wetlands, Bogs',
              discoveredKey: 'moss'
            }
          ]
        }
      ]
    },
    {
      id: 'tracheophytes',
      name: 'Tracheophytes',
      rank: 'Vascular Clade',
      era: '~430 Mya (Silurian)',
      description: 'Lignified vascular tissue (xylem/phloem) enabling upward vertical canopy growth.',
      children: [
        {
          id: 'pteridophytes',
          name: 'Polypodiopsida (Ferns)',
          rank: 'Class',
          era: '~360 Mya (Devonian)',
          description: 'Spore-dispersing vascular plants with fronds.',
          species: [
            {
              id: 'bracken-fern',
              name: 'Bracken Fern',
              scientific: 'Pteridium aquilinum',
              family: 'Dennstaedtiaceae',
              habitat: 'Open woodlands and heaths',
              discoveredKey: 'fern'
            }
          ]
        },
        {
          id: 'gymnosperms',
          name: 'Gymnospermae',
          rank: 'Seed Clade (Naked Seeds)',
          era: '~319 Mya (Carboniferous)',
          description: 'Seed-bearing vascular plants without floral perianth, bearing cones.',
          children: [
            {
              id: 'pinaceae',
              name: 'Pinaceae (Pine Family)',
              rank: 'Family',
              era: '~150 Mya (Late Jurassic)',
              species: [
                {
                  id: 'scots-pine',
                  name: 'Scots Pine',
                  scientific: 'Pinus sylvestris',
                  family: 'Pinaceae',
                  habitat: 'Montane forests, sandy soils',
                  discoveredKey: 'pine'
                },
                {
                  id: 'douglas-fir',
                  name: 'Douglas Fir',
                  scientific: 'Pseudotsuga menziesii',
                  family: 'Pinaceae',
                  habitat: 'Temperate coniferous canopies',
                  discoveredKey: 'fir'
                }
              ]
            }
          ]
        },
        {
          id: 'angiosperms',
          name: 'Angiosperms (Flowering Plants)',
          rank: 'Clade',
          era: '~135 Mya (Early Cretaceous)',
          description: 'Vascular seed plants with flowers, carpels enclosing ovules, and double fertilization.',
          children: [
            {
              id: 'monocots',
              name: 'Monocotyledons (Monocots)',
              rank: 'Clade',
              era: '~120 Mya (Early Cretaceous)',
              description: 'Single cotyledon embryo, parallel leaf venation, scattered vascular bundles.',
              children: [
                {
                  id: 'poaceae',
                  name: 'Poaceae (True Grasses & Bamboo)',
                  rank: 'Family',
                  era: '~66 Mya (Late Cretaceous)',
                  species: [
                    {
                      id: 'meadow-grass',
                      name: 'Kentucky Bluegrass',
                      scientific: 'Poa pratensis',
                      family: 'Poaceae',
                      habitat: 'Temperate grasslands',
                      discoveredKey: 'grass'
                    },
                    {
                      id: 'giant-bamboo',
                      name: 'Timber Bamboo',
                      scientific: 'Phyllostachys bambusoides',
                      family: 'Poaceae',
                      habitat: 'Riparian forests',
                      discoveredKey: 'bamboo'
                    }
                  ]
                },
                {
                  id: 'arecaceae',
                  name: 'Arecaceae (Palm Family)',
                  rank: 'Family',
                  era: '~80 Mya (Cretaceous)',
                  species: [
                    {
                      id: 'date-palm',
                      name: 'Date Palm',
                      scientific: 'Phoenix dactylifera',
                      family: 'Arecaceae',
                      habitat: 'Arid oases, subtropical climes',
                      discoveredKey: 'palm'
                    }
                  ]
                }
              ]
            },
            {
              id: 'eudicots',
              name: 'Eudicotyledons (Eudicots)',
              rank: 'Clade',
              era: '~125 Mya (Cretaceous)',
              description: 'Tricolpate pollen grain morphology, reticulate leaf venation, concentric vascular rings.',
              children: [
                {
                  id: 'rosids',
                  name: 'Rosidae (Rosids)',
                  rank: 'Subclass',
                  era: '~115 Mya',
                  children: [
                    {
                      id: 'fagaceae',
                      name: 'Fagaceae (Beech & Oak Family)',
                      rank: 'Family',
                      era: '~90 Mya',
                      species: [
                        {
                          id: 'english-oak',
                          name: 'English Oak',
                          scientific: 'Quercus robur',
                          family: 'Fagaceae',
                          habitat: 'Lowland deciduous woodland',
                          discoveredKey: 'oak'
                        }
                      ]
                    },
                    {
                      id: 'moraceae',
                      name: 'Moraceae (Mulberry & Fig Family)',
                      rank: 'Family',
                      era: '~75 Mya',
                      species: [
                        {
                          id: 'fiddle-leaf-fig',
                          name: 'Fiddle-Leaf Fig',
                          scientific: 'Ficus lyrata',
                          family: 'Moraceae',
                          habitat: 'Tropical lowland rainforest',
                          discoveredKey: 'fig'
                        }
                      ]
                    },
                    {
                      id: 'sapindaceae',
                      name: 'Sapindaceae (Soapberry & Maple)',
                      rank: 'Family',
                      era: '~70 Mya',
                      species: [
                        {
                          id: 'sugar-maple',
                          name: 'Sugar Maple',
                          scientific: 'Acer saccharum',
                          family: 'Sapindaceae',
                          habitat: 'Hardwood temperate forests',
                          discoveredKey: 'maple'
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 'asterids',
                  name: 'Asteridae (Asterids)',
                  rank: 'Subclass',
                  era: '~100 Mya',
                  children: [
                    {
                      id: 'asteraceae',
                      name: 'Asteraceae (Composite / Daisy Family)',
                      rank: 'Family',
                      era: '~50 Mya (Eocene)',
                      species: [
                        {
                          id: 'common-dandelion',
                          name: 'Common Dandelion',
                          scientific: 'Taraxacum officinale',
                          family: 'Asteraceae',
                          habitat: 'Meadows, roadsides, disturbed soils',
                          discoveredKey: 'dandelion'
                        },
                        {
                          id: 'wild-sunflower',
                          name: 'Common Sunflower',
                          scientific: 'Helianthus annuus',
                          family: 'Asteraceae',
                          habitat: 'Sunny open fields',
                          discoveredKey: 'sunflower'
                        }
                      ]
                    },
                    {
                      id: 'lamiaceae',
                      name: 'Lamiaceae (Mint & Sage Family)',
                      rank: 'Family',
                      era: '~60 Mya',
                      species: [
                        {
                          id: 'wild-mint',
                          name: 'Field Mint',
                          scientific: 'Mentha arvensis',
                          family: 'Lamiaceae',
                          habitat: 'Damp meadows and stream banks',
                          discoveredKey: 'mint'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export default function PhylogeneticTree({ history = [], onSelectSpecies }) {
  const [expandedNodes, setExpandedNodes] = useState({
    plantae: true,
    tracheophytes: true,
    angiosperms: true,
    eudicots: true,
    rosids: true
  });
  const [filterDiscoveredOnly, setFilterDiscoveredOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeaf, setSelectedLeaf] = useState(null);

  // Check if a species key is present in user's discovery history
  const discoveredNamesSet = useMemo(() => {
    const s = new Set();
    history.forEach(item => {
      if (item.name) s.add(item.name.toLowerCase());
      if (item.scientificName) s.add(item.scientificName.toLowerCase());
    });
    return s;
  }, [history]);

  const isSpeciesDiscovered = (species) => {
    const key = (species.discoveredKey || '').toLowerCase();
    const sc = (species.scientific || '').toLowerCase();
    const nm = (species.name || '').toLowerCase();
    
    for (const d of discoveredNamesSet) {
      if (d.includes(key) || d.includes(nm) || d.includes(sc)) return true;
    }
    return false;
  };

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const expandAll = () => {
    const all = {
      plantae: true,
      bryophytes: true,
      bryophyta: true,
      tracheophytes: true,
      pteridophytes: true,
      gymnosperms: true,
      pinaceae: true,
      angiosperms: true,
      monocots: true,
      poaceae: true,
      arecaceae: true,
      eudicots: true,
      rosids: true,
      fagaceae: true,
      moraceae: true,
      sapindaceae: true,
      asterids: true,
      asteraceae: true,
      lamiaceae: true
    };
    setExpandedNodes(all);
  };

  const collapseAll = () => {
    setExpandedNodes({ plantae: true });
  };

  // Render a clade / branch node recursively
  const renderNode = (node, depth = 0) => {
    const isExpanded = !!expandedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;
    const hasSpecies = node.species && node.species.length > 0;

    // Filter check
    let visibleSpecies = node.species || [];
    if (filterDiscoveredOnly) {
      visibleSpecies = visibleSpecies.filter(s => isSpeciesDiscovered(s));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      visibleSpecies = visibleSpecies.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.scientific.toLowerCase().includes(q) ||
        s.family.toLowerCase().includes(q)
      );
    }

    if (!hasChildren && visibleSpecies.length === 0 && (filterDiscoveredOnly || searchQuery)) {
      return null;
    }

    return (
      <div key={node.id} className="relative transition-all duration-300">
        {/* Node Bar */}
        <div 
          onClick={() => toggleNode(node.id)}
          className={clsx(
            "group flex items-center justify-between gap-3 p-3 rounded-2xl cursor-pointer border transition-all select-none my-1",
            depth === 0 ? "bg-[#0b2416] border-[#315c3b] shadow-lg text-[#f3f1e7]" :
            depth === 1 ? "bg-[#081e13]/90 border-[#1e3f2b] hover:border-[#315c3b]" :
            depth === 2 ? "bg-[#06170e]/80 border-[#183323] hover:border-[#245336]" :
            "bg-[#05130b]/70 border-[#12281b] hover:border-[#1e3f2b]"
          )}
          style={{ marginLeft: `${Math.min(depth * 18, 90)}px` }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <button 
              className="p-1 rounded-lg bg-[#123a27]/60 group-hover:bg-[#1a4e34] text-[#91b79a] group-hover:text-emerald-300 transition-colors"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>

            <GitFork className="w-4 h-4 text-emerald-400 shrink-0" />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-[#f3f1e7] truncate group-hover:text-emerald-200">
                  {node.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#123a27] text-emerald-300 border border-[#245336] uppercase tracking-wider shrink-0">
                  {node.rank}
                </span>
              </div>
              {node.era && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#91b79a]/80 mt-0.5">
                  <Clock className="w-3 h-3 text-amber-400/80 shrink-0" />
                  <span>{node.era}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono text-[#91b79a] hidden sm:inline">
              {hasChildren ? `${node.children.length} Clades` : `${visibleSpecies.length} Species`}
            </span>
          </div>
        </div>

        {/* Expanded Content: Sub-clades or Species leaves */}
        {isExpanded && (
          <div className="border-l-2 border-[#1e3f2b]/60 ml-4 sm:ml-6 pl-2 sm:pl-3 space-y-1.5 my-1">
            {node.description && (
              <p className="text-[11px] text-[#d8c8a8]/70 italic py-1 px-3 bg-[#081a11]/40 rounded-xl font-sans">
                {node.description}
              </p>
            )}

            {/* Child Clades */}
            {hasChildren && node.children.map(child => renderNode(child, depth + 1))}

            {/* Species Terminal Leaves */}
            {hasSpecies && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {visibleSpecies.map(sp => {
                  const discovered = isSpeciesDiscovered(sp);
                  return (
                    <div
                      key={sp.id}
                      onClick={() => {
                        setSelectedLeaf(sp);
                        if (onSelectSpecies) onSelectSpecies(sp);
                      }}
                      className={clsx(
                        "p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-left group",
                        discovered
                          ? "bg-[#0c2b1a] border-emerald-500/50 hover:border-emerald-400 shadow-md shadow-emerald-950/20"
                          : "bg-[#06140d]/60 border-[#183323] hover:border-[#245336] opacity-75 hover:opacity-100"
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={clsx(
                          "p-2 rounded-xl border shrink-0",
                          discovered 
                            ? "bg-emerald-900/60 border-emerald-500/60 text-emerald-300"
                            : "bg-[#102418] border-[#1e3f2b] text-[#91b79a]"
                        )}>
                          <Leaf className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-[#f3f1e7] truncate group-hover:text-emerald-200">
                            {sp.name}
                          </h5>
                          <span className="text-[10px] italic font-serif text-[#91b79a] block truncate">
                            {sp.scientific}
                          </span>
                          <span className="text-[9px] font-mono text-[#d8c8a8]/70 block mt-0.5">
                            {sp.family}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        {discovered ? (
                          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-600/40 px-2 py-0.5 rounded-lg">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>LOGGED</span>
                          </div>
                        ) : (
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">
                            UNSCOUTED
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Control Bar: Expand/Collapse, Search, Discovered Filter */}
      <div className="nature-surface-card rounded-3xl p-5 border border-[#1e3f2b]/60 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-[#91b79a] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lineage or species..."
            className="w-full bg-[#071910] border border-[#1e3f2b] rounded-xl pl-9 pr-3 py-2 text-xs text-[#f3f1e7] placeholder:text-[#91b79a]/60 focus:outline-none focus:border-emerald-500/70 font-mono"
          />
        </div>

        {/* Filter & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto font-mono text-xs">
          <button
            onClick={() => setFilterDiscoveredOnly(!filterDiscoveredOnly)}
            className={clsx(
              "px-3 py-2 rounded-xl border flex items-center gap-1.5 font-bold transition-colors cursor-pointer",
              filterDiscoveredOnly
                ? "bg-emerald-900/60 border-emerald-500 text-emerald-200"
                : "bg-[#081a11] border-[#1e3f2b] text-[#91b79a] hover:text-[#f3f1e7]"
            )}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{filterDiscoveredOnly ? "Showing Discovered" : "Show All Lineages"}</span>
          </button>

          <button
            onClick={expandAll}
            className="px-3 py-2 rounded-xl bg-[#081a11] hover:bg-[#123a27] border border-[#1e3f2b] text-[#d8c8a8] hover:text-[#f3f1e7] transition-colors cursor-pointer"
          >
            Expand All
          </button>

          <button
            onClick={collapseAll}
            className="px-3 py-2 rounded-xl bg-[#081a11] hover:bg-[#123a27] border border-[#1e3f2b] text-[#d8c8a8] hover:text-[#f3f1e7] transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Main Tree Explorer */}
      <div className="nature-surface-card rounded-[2.5rem] p-6 sm:p-8 border border-[#1e3f2b]/60 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e3f2b]/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-black font-mono uppercase text-[#f3f1e7]">
              Evolutionary Cladogram of Plant Life
            </h4>
          </div>
          <span className="text-[11px] font-mono text-[#91b79a]">
            Deep Time • APG IV Taxonomic Standard
          </span>
        </div>

        <div className="pt-2">
          {renderNode(PHYLOGENY_DATA, 0)}
        </div>
      </div>

      {/* Specimen Detail Modal / Popover */}
      {selectedLeaf && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedLeaf(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#081a11] border border-emerald-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 tracking-wider">
                  PHYLOGENETIC SPECIMEN
                </span>
                <h3 className="text-2xl font-black text-[#f3f1e7]">
                  {selectedLeaf.name}
                </h3>
                <span className="text-sm italic font-serif text-[#91b79a]">
                  {selectedLeaf.scientific}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-600/40 text-emerald-300">
                <Leaf className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#06140d] border border-[#1e3f2b]">
                <span className="text-[10px] text-[#91b79a] block">FAMILY</span>
                <strong className="text-[#f3f1e7]">{selectedLeaf.family}</strong>
              </div>
              <div className="p-3 rounded-xl bg-[#06140d] border border-[#1e3f2b]">
                <span className="text-[10px] text-[#91b79a] block">HABITAT</span>
                <strong className="text-[#f3f1e7]">{selectedLeaf.habitat}</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#05110a] border border-[#183323] space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>EVOLUTIONARY EMERGENCE</span>
              </div>
              <p className="text-[#d8c8a8] leading-relaxed font-sans">
                Descended from ancient Cretaceous flowering ancestors, utilizing specialized multicellular vascular architectures for terrestrial adaptation.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className={clsx(
                "text-xs font-mono font-bold px-3 py-1.5 rounded-xl border flex items-center gap-1.5",
                isSpeciesDiscovered(selectedLeaf)
                  ? "bg-emerald-950 text-emerald-300 border-emerald-500/50"
                  : "bg-zinc-900 text-zinc-400 border-zinc-700"
              )}>
                {isSpeciesDiscovered(selectedLeaf) ? "✓ Logged in Your Codex" : "○ Not Yet Discovered in Wild"}
              </span>

              <button
                onClick={() => setSelectedLeaf(null)}
                className="px-5 py-2.5 rounded-xl bg-[#123a27] hover:bg-[#1a4e34] text-[#f3f1e7] font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
