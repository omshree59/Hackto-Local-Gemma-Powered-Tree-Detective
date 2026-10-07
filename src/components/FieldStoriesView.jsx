import React, { useState } from 'react';
import { FileText, Clock, ArrowRight, X } from 'lucide-react';
import { FIELD_STORIES } from '../data/natureData';

export default function FieldStoriesView() {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#1e3f2b]/60">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52] block mb-1">
          NATURE JOURNALISM
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
          FIELD STORIES
        </h2>
        <p className="text-sm text-[#91b79a] mt-1">
          "The tree you walk past every day." Short essays on sensory curiosity and natural history.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FIELD_STORIES.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="nature-surface-card border border-[#1e3f2b]/80 hover:border-[#4f8a52]/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between cursor-pointer group transition-all"
          >
            <div>
              {/* Story Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#07130b]">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                />
                <div className="absolute top-3 left-3 bg-[#06140c]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-mono font-bold uppercase text-[#4f8a52] border border-[#1e3f2b]">
                  {story.category}
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6">
                <span className="text-[10px] font-mono text-[#91b79a] flex items-center gap-1 mb-2">
                  <Clock className="w-3 h-3 text-[#4f8a52]" /> {story.readTime}
                </span>

                <h3 className="text-lg font-bold text-[#f3f1e7] group-hover:text-[#91b79a] transition-colors leading-snug mb-3">
                  {story.title}
                </h3>

                <p className="text-xs text-[#91b79a] font-sans leading-relaxed line-clamp-3">
                  {story.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs font-mono text-[#4f8a52] font-bold border-t border-[#1e3f2b]/40 mt-4 pt-4">
              <span>Read Essay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Story Reader Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-[#040c07]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="nature-surface-card border border-[#2a4d34] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-auto space-y-6">
            
            <div className="relative aspect-video max-h-[260px] w-full overflow-hidden bg-[#07130b]">
              <img 
                src={activeStory.image} 
                alt={activeStory.title} 
                className="w-full h-full object-cover filter brightness-90"
              />
              <button 
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-[#91b79a] hover:text-white bg-[#06140c]/80 backdrop-blur-md border border-[#1e3f2b] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 pt-0 space-y-5">
              <div>
                <span className="text-[10px] font-mono text-[#4f8a52] uppercase font-bold block mb-1">
                  {activeStory.category} • {activeStory.readTime} READ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#f3f1e7] leading-tight">
                  {activeStory.title}
                </h3>
              </div>

              <div className="text-xs sm:text-sm text-[#f3f1e7]/90 leading-relaxed space-y-4 max-h-[50vh] overflow-y-auto pr-2 font-sans">
                {activeStory.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-[#1e3f2b] flex justify-end">
                <button
                  onClick={() => setActiveStory(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#4f8a52] hover:bg-[#315c3b] text-[#f3f1e7] text-xs font-mono font-bold uppercase cursor-pointer transition-colors"
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
