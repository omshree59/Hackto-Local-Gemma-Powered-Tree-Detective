import { useState } from 'react';
import { Clock, ArrowRight, X } from 'lucide-react';
import clsx from 'clsx';
import { NATURE_GUIDE_ARTICLES } from '../data/natureData';

const CATEGORIES = ['ALL', 'SHOWCASE', 'LEAVES', 'TREES', 'FLOWERS', 'SAFETY'];

export default function NatureGuideView() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeArticle, setActiveArticle] = useState(null);

  const filtered = NATURE_GUIDE_ARTICLES.filter(a => 
    selectedCategory === 'ALL' ? true : a.category.toUpperCase() === selectedCategory
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1e3f2b]/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4f8a52]"></span>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52]">
              BOTANICAL KNOWLEDGE BASE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight mt-1">
            NATURE GUIDE
          </h2>
          <p className="text-sm text-[#91b79a] mt-1 font-sans">
            Offline educational primers on leaf morphology, bark fissures, and field observation ethics.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs self-start md:self-auto">
          {CATEGORIES.map(cat => (
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
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((article) => (
          <div
            key={article.id}
            onClick={() => setActiveArticle(article)}
            className="nature-surface-card border border-[#1e3f2b]/80 hover:border-[#4f8a52]/60 rounded-3xl p-7 shadow-xl flex flex-col justify-between cursor-pointer group transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono mb-3">
                <span className="text-[#4f8a52] font-bold uppercase tracking-wider bg-[#0c2619] px-2.5 py-0.5 rounded-md border border-[#1e3f2b]">
                  {article.category}
                </span>
                <span className="text-[#91b79a] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </span>
              </div>

              {article.image && (
                <div className="w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-[#1e3f2b] bg-[#05110a]">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy"
                  />
                </div>
              )}

              <h3 className="text-xl font-bold text-[#f3f1e7] group-hover:text-[#91b79a] transition-colors leading-snug mb-3">
                {article.title}
              </h3>

              <p className="text-xs text-[#91b79a] font-sans leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-5 border-t border-[#1e3f2b]/60 mt-6 flex items-center justify-between text-xs font-mono text-[#4f8a52] font-bold">
              <span>Read Guide Primer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-[#040c07]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="nature-surface-card border border-[#2a4d34] w-full max-w-2xl rounded-3xl p-6 sm:p-10 shadow-2xl relative my-auto space-y-6">
            <div className="flex items-start justify-between border-b border-[#1e3f2b] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#4f8a52] uppercase font-bold block mb-1">
                  {activeArticle.category} • {activeArticle.readTime} READ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#f3f1e7] leading-tight">
                  {activeArticle.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-xl text-[#91b79a] hover:text-white bg-[#0a1f14] border border-[#1e3f2b] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeArticle.image && (
              <div className="w-full rounded-2xl overflow-hidden border border-[#1e3f2b] bg-[#05110a] max-h-64 flex items-center justify-center">
                <img 
                  src={activeArticle.image} 
                  alt={activeArticle.title} 
                  className="w-full h-auto max-h-64 object-contain" 
                />
              </div>
            )}

            <div className="text-xs sm:text-sm text-[#f3f1e7]/90 leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {activeArticle.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h4 key={idx} className="text-base font-bold text-[#4f8a52] pt-2 font-mono">
                      {paragraph.replace('### ', '')}
                    </h4>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#1e3f2b] flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-[#4f8a52] hover:bg-[#315c3b] text-[#f3f1e7] text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
              >
                Close Primer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
