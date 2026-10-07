import React, { useState } from 'react';
import { Book, Clock, ArrowRight, ShieldCheck, Leaf, Trees, Flower, X } from 'lucide-react';
import clsx from 'clsx';
import { NATURE_GUIDE_ARTICLES } from '../data/natureData';

const CATEGORIES = ['ALL', 'LEAVES', 'TREES', 'FLOWERS', 'SAFETY'];

export default function NatureGuideView() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeArticle, setActiveArticle] = useState(null);

  const filtered = NATURE_GUIDE_ARTICLES.filter(a => 
    selectedCategory === 'ALL' ? true : a.category.toUpperCase() === selectedCategory
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400">
              BOTANICAL KNOWLEDGE BASE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            NATURE GUIDE
          </h2>
          <p className="text-sm text-stone-400 mt-1 font-sans">
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
                  ? "bg-emerald-500 text-stone-950 shadow-md"
                  : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
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
            className="bg-stone-900/60 border border-stone-800 hover:border-emerald-500/50 rounded-3xl p-7 shadow-xl backdrop-blur-xl flex flex-col justify-between cursor-pointer group transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono mb-3">
                <span className="text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-800/60">
                  {article.category}
                </span>
                <span className="text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-3">
                {article.title}
              </h3>

              <p className="text-xs text-stone-300 font-sans leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-5 border-t border-stone-800/80 mt-6 flex items-center justify-between text-xs font-mono text-emerald-400 font-bold">
              <span>Read Guide Primer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-[#040604]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#080b08] border border-stone-800 w-full max-w-2xl rounded-3xl p-6 sm:p-10 shadow-2xl relative my-auto space-y-6">
            <div className="flex items-start justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                  {activeArticle.category} • {activeArticle.readTime} READ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {activeArticle.title}
                </h3>
              </div>
              <button 
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-white bg-stone-900 border border-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="prose prose-invert prose-emerald text-xs sm:text-sm text-stone-300 leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {activeArticle.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h4 key={idx} className="text-base font-bold text-emerald-300 pt-2 font-mono">
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

            <div className="pt-4 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-mono font-bold uppercase"
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
