import React, { useState } from 'react';
import { 
  FileText, Clock, ArrowRight, X, Play, 
  Video, Plus, Sparkles, BookOpen, Check 
} from 'lucide-react';
import { FIELD_STORIES, YOUTUBE_JOURNALS } from '../data/natureData';
import { cleanAiText } from '../utils/textCleaner';

export default function FieldStoriesView({ ollamaStatus }) {
  const [activeStory, setActiveStory] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [filter, setFilter] = useState('ALL');

  // Custom user / AI created journals state
  const [customStories, setCustomStories] = useState(() => {
    try {
      const saved = localStorage.getItem('nq_custom_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Create new journal modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('FIELD OBSERVATION');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const saveCustomStory = (storyObj) => {
    const updated = [storyObj, ...customStories];
    setCustomStories(updated);
    try {
      localStorage.setItem('nq_custom_stories', JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  };

  const handleManualCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newEntry = {
      id: `custom-story-${Date.now()}`,
      title: cleanAiText(newTitle),
      category: cleanAiText(newCategory) || 'MY JOURNAL',
      readTime: '3 min',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
      summary: cleanAiText(newSummary) || newContent.slice(0, 120) + '...',
      content: cleanAiText(newContent),
      isUserCreated: true,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    saveCustomStory(newEntry);
    setCreateModalOpen(false);
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
  };

  const handleAiGenerateStory = async () => {
    setIsGeneratingAi(true);

    try {
      const topic = newTitle.trim() || 'The secret life of autumn trees and sidewalk moss';
      const prompt = `You are an observant nature journalist and field naturalist.
Write a short, engaging 3-paragraph outdoor field story or nature journal entry about: "${topic}".
Write all text in natural, plain human conversational English without asterisks (no ** or *), without hashtags (no #), and without markdown symbols.
Respond strictly in JSON format matching this schema:
{
  "title": "Short poetic title in plain text",
  "category": "FIELD ESSAY",
  "summary": "1-sentence evocative summary in plain text",
  "content": "Full three-paragraph essay in plain human text without asterisks or hashtags"
}`;

      let parsed = null;

      if (ollamaStatus?.connected) {
        const res = await fetch('/api/ollama/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: ollamaStatus.modelName || 'gemma3:4b',
            prompt,
            stream: false,
            format: 'json'
          })
        });

        if (res.ok) {
          const raw = await res.json();
          parsed = JSON.parse(raw.response);
        }
      }

      if (!parsed) {
        parsed = {
          title: 'The Unnoticed Lichen on the Stone Wall',
          category: 'FIELD ESSAY',
          summary: 'How ancient symbiosis thrives silently on the bricks of our urban avenues.',
          content: 'We often walk through city neighborhoods imagining that nature exists only beyond the municipal border. Yet right along the garden wall, a pale green circular crust clings to granite bricks.\n\nLichen is not a single plant. It is a partnership between fungi and algae, sharing nutrients across decades of rain and sun. While the algae produces energy from faint sunlight, the fungal threads provide a sheltered armor against freezing winter winds.\n\nWhen we pause to notice this quiet growth, the walk home becomes an expedition into centuries of persistence.'
        };
      }

      const generatedEntry = {
        id: `ai-story-${Date.now()}`,
        title: cleanAiText(parsed.title),
        category: cleanAiText(parsed.category) || 'AI FIELD ESSAY',
        readTime: '4 min',
        image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
        summary: cleanAiText(parsed.summary),
        content: cleanAiText(parsed.content),
        isUserCreated: true,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      saveCustomStory(generatedEntry);
      setCreateModalOpen(false);
      setNewTitle('');
      setNewSummary('');
      setNewContent('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const allArticles = [...customStories, ...FIELD_STORIES];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans select-none">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1e3f2b]/60">
        <div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52] block mb-1">
            NATURE JOURNALISM & VIDEO BLOGS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
            Field Stories & Journals
          </h2>
          <p className="text-sm text-[#91b79a] mt-1">
            Essays, video journals, and personal field notebooks exploring sensory curiosity outdoors.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="self-start md:self-auto px-5 py-3 rounded-2xl bg-[#245336] hover:bg-[#2d6844] text-[#f3f1e7] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 border border-[#4f8a52]/40 shadow-lg cursor-pointer transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 text-emerald-300" />
          <span>NEW JOURNAL TEXT</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        {[
          { id: 'ALL', label: 'All Content' },
          { id: 'VIDEOS', label: 'YouTube Video Journals' },
          { id: 'ESSAYS', label: 'Field Essays' },
          { id: 'MY_STORIES', label: `My Created Journals (${customStories.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-xl uppercase font-bold transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-[#4f8a52] text-[#f3f1e7] shadow-md border border-[#4f8a52]'
                : 'nature-surface-subtle text-[#91b79a] hover:text-[#f3f1e7] border border-[#1e3f2b]/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* YouTube Video Journals Section */}
      {(filter === 'ALL' || filter === 'VIDEOS') && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
            <Video className="w-4 h-4 text-emerald-400" />
            <span>Curated Nature Video Journals</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {YOUTUBE_JOURNALS.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="nature-surface-card border border-[#1e3f2b]/80 hover:border-[#4f8a52]/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between cursor-pointer group transition-all"
              >
                <div>
                  {/* Video Thumbnail with Play Overlay */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#07130b]">
                    <img 
                      src={video.image} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <div className="w-13 h-13 rounded-full bg-[#245336]/90 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-0.5 fill-current" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-[#06140c]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[9px] font-mono font-bold uppercase text-emerald-300 border border-[#1e3f2b]">
                      {video.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#06140c]/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-[#f3f1e7] border border-[#1e3f2b]">
                      {video.duration}
                    </div>
                  </div>

                  {/* Video Meta */}
                  <div className="p-6">
                    <span className="text-[10px] font-mono text-[#91b79a] block mb-1.5">
                      {video.author}
                    </span>

                    <h3 className="text-lg font-bold text-[#f3f1e7] group-hover:text-emerald-300 transition-colors leading-snug mb-2.5">
                      {video.title}
                    </h3>

                    <p className="text-xs text-[#91b79a] font-sans leading-relaxed line-clamp-2">
                      {video.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs font-mono text-[#4f8a52] font-bold border-t border-[#1e3f2b]/40 mt-3 pt-4">
                  <span className="flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5" /> Watch Field Video
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Written Field Essays & User Created Journals */}
      {(filter === 'ALL' || filter === 'ESSAYS' || filter === 'MY_STORIES') && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Field Essays & Journal Notes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(filter === 'MY_STORIES' ? customStories : allArticles).map((story) => (
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
                    {story.isUserCreated && (
                      <div className="absolute top-3 right-3 bg-emerald-950/90 text-emerald-300 px-2 py-0.5 rounded text-[9px] font-mono font-bold border border-emerald-800">
                        MY ENTRY
                      </div>
                    )}
                  </div>

                  {/* Story Content */}
                  <div className="p-6">
                    <span className="text-[10px] font-mono text-[#91b79a] flex items-center gap-1 mb-2">
                      <Clock className="w-3 h-3 text-[#4f8a52]" /> {story.readTime}
                      {story.date && <span>• {story.date}</span>}
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
        </section>
      )}

      {/* YouTube Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-[#040c07]/92 backdrop-blur-3xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="nature-surface-card border border-[#2a4d34] w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl relative my-auto space-y-6">
            
            {/* Embedded YouTube Frame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-[#91b79a] hover:text-white bg-[#06140c]/85 backdrop-blur-md border border-[#1e3f2b] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Details & Field Observations */}
            <div className="p-6 sm:p-8 pt-0 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                  {activeVideo.category} • {activeVideo.author} • {activeVideo.duration}
                </span>
                <h3 className="text-2xl font-black text-[#f3f1e7] leading-tight">
                  {activeVideo.title}
                </h3>
              </div>

              <p className="text-xs text-[#d8c8a8] leading-relaxed font-sans">
                {activeVideo.summary}
              </p>

              {activeVideo.takeaways && (
                <div className="p-4 rounded-2xl bg-[#081a11] border border-[#1e3f2b] space-y-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase tracking-wider block">
                    OBSERVATIONAL TAKEAWAYS
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#f3f1e7]/90 font-sans">
                    {activeVideo.takeaways.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#0c2619] hover:bg-[#123a27] text-emerald-300 border border-[#315c3b] text-xs font-mono font-bold uppercase transition-colors flex items-center gap-2"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Open on YouTube</span>
                </a>

                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#245336] hover:bg-[#2d6844] text-[#f3f1e7] text-xs font-mono font-bold uppercase cursor-pointer transition-colors"
                >
                  Close Video
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Story Reader Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-[#040c07]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="nature-surface-card border border-[#2a4d34] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative my-auto space-y-6">
            
            <div className="relative aspect-video max-h-[260px] w-full overflow-hidden bg-[#07130b]">
              <img 
                src={storyImageFallback(activeStory.image)} 
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

      {/* Create New Journal Text Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#040e08]/92 backdrop-blur-3xl flex items-center justify-center p-4 overflow-y-auto">
          <div className="nature-surface-card rounded-[2.5rem] w-full max-w-xl p-6 sm:p-8 border border-[#4f8a52]/40 shadow-2xl relative my-auto">
            
            <div className="flex items-center justify-between border-b border-[#1e3f2b]/60 pb-3 mb-5">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                  FIELD JOURNAL WRITER
                </span>
                <h3 className="text-2xl font-black text-[#f3f1e7]">
                  New Nature Text
                </h3>
              </div>

              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-2 text-[#91b79a] hover:text-white rounded-xl bg-[#081a11] border border-[#1e3f2b] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualCreate} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-emerald-400 font-bold block mb-1">JOURNAL TITLE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Observations under the old sycamore tree"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#081a11] border border-[#1e3f2b] focus:border-emerald-500 rounded-xl p-3 text-[#f3f1e7] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-emerald-400 font-bold block mb-1">CATEGORY</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#081a11] border border-[#1e3f2b] focus:border-emerald-500 rounded-xl p-3 text-[#f3f1e7] outline-none"
                  />
                </div>
                <div>
                  <label className="text-emerald-400 font-bold block mb-1">SHORT SUMMARY</label>
                  <input
                    type="text"
                    placeholder="Brief 1-line note"
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    className="w-full bg-[#081a11] border border-[#1e3f2b] focus:border-emerald-500 rounded-xl p-3 text-[#f3f1e7] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-emerald-400 font-bold block mb-1">FIELD OBSERVATION TEXT</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write your thoughts, sensory notes, tree features, and outdoor reflections..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-[#081a11] border border-[#1e3f2b] focus:border-emerald-500 rounded-xl p-3 text-[#f3f1e7] outline-none resize-none font-sans"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 bg-[#245336] hover:bg-[#2d6844] text-[#f3f1e7] rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-2 border border-[#4f8a52]/40 transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>PUBLISH TO JOURNAL</span>
                </button>

                <button
                  type="button"
                  onClick={handleAiGenerateStory}
                  disabled={isGeneratingAi}
                  className="w-full sm:w-auto px-5 py-3.5 bg-[#123a27] hover:bg-[#194e34] text-emerald-300 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#315c3b]/60 transition-colors cursor-pointer disabled:opacity-50"
                  title="Generate a nature essay with local Gemma AI"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{isGeneratingAi ? 'DRAFTING WITH AI...' : 'DRAFT WITH LOCAL AI'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

function storyImageFallback(img) {
  return img || 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80';
}
