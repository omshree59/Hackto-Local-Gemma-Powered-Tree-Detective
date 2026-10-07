import React, { useState } from 'react';
import { FileText, Clock, ArrowRight, X } from 'lucide-react';
import { FIELD_STORIES } from '../data/natureData';

export default function FieldStoriesView() {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="pb-6 border-b border-stone-800">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 block mb-1">
          NATURE JOURNALISM
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          FIELD STORIES
        </h2>
        <p className="text-sm text-stone-400 mt-1 font-sans">
          "The tree you walk past every day." Short essays on sensory curiosity and natural history.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FIELD_STORIES.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="bg-stone-900/60 border border-stone-800 hover:border-emerald-500/50 rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl flex flex-col justify-between cursor-pointer group transition-all"
          >
            <div>
              {/* Story Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-950">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute top-3 left-3 bg-[#060806]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-mono font-bold uppercase text-emerald-400 border border-stone-800">
                  {story.category}
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6">
                <span className="text-[10px] font-mono text-stone-400 flex items-center gap-1 mb-2">
                  <Clock className="w-3 h-3" /> {story.readTime}
                </span>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-3">
                  {story.title}
                </h3>

                <p className="text-xs text-stone-400 font-sans leading-relaxed line-clamp-3">
                  {story.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-mono text-emerald-400 font-bold border-t border-stone-800/40 mt-4 pt-4">
              <span>Read Essay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Story Reader Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-[#040604]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#080b08] border border-stone-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-auto space-y-6">
            
            <div className="relative aspect-video max-h-[260px] w-full overflow-hidden bg-stone-950">
              <img 
                src={activeStory.image} 
                alt={activeStory.title} 
                className="w-full h-full object-cover filter brightness-90"
              />
              <button 
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-stone-200 hover:text-white bg-[#060806]/80 backdrop-blur-md border border-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 pt-0 space-y-5">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                  {activeStory.category} • {activeStory.readTime} READ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {activeStory.title}
                </h3>
              </div>

              <div className="prose prose-invert prose-emerald text-xs sm:text-sm text-stone-300 leading-relaxed space-y-4 max-h-[50vh] overflow-y-auto pr-2 font-sans">
                {activeStory.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-800 flex justify-end">
                <button
                  onClick={() => setActiveStory(null)}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-mono font-bold uppercase cursor-pointer"
                >
                  Close Story
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
