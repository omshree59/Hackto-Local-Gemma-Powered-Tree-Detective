import React, { useState } from 'react';
import { 
  Target, Compass, Clock, Award, CheckCircle, 
  ArrowRight, Plus, Sparkles, RefreshCw
} from 'lucide-react';
import clsx from 'clsx';
import { INITIAL_QUESTS } from '../data/natureData';

const FILTERS = ['ALL', 'PLANTS', 'OBSERVATION', 'WALK', 'DISCOVERY', 'PHOTOGRAPHY'];

export default function QuestsView({
  activeMission,
  onStartQuest,
  quests = INITIAL_QUESTS,
  onCreateCustomQuest,
  ollamaStatus
}) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [isGeneratingAiQuest, setIsGeneratingAiQuest] = useState(false);

  // Form state
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState('PLANTS');
  const [customDuration, setCustomDuration] = useState('20 min');
  const [customDifficulty, setCustomDifficulty] = useState('Easy');
  const [customReward, setCustomReward] = useState(50);
  const [customObjective, setCustomObjective] = useState('');
  const [customHint, setCustomHint] = useState('');

  const filtered = quests.filter(q => 
    selectedFilter === 'ALL' ? true : q.category.toUpperCase() === selectedFilter
  );

  const handleGenerateLocalQuest = async () => {
    setIsGeneratingAiQuest(true);

    try {
      const prompt = `You are an offline nature exploration master. Generate ONE concise plant exploration quest for an outdoor walker.
Respond strictly in JSON matching this schema:
{
  "title": "Short catchy title",
  "category": "PLANTS",
  "duration": "20 min",
  "difficulty": "Easy",
  "reward": 60,
  "objective": "A 1-sentence actionable plant discovery challenge",
  "hint": "1 short tip where to look"
}`;

      let questData = null;

      if (ollamaStatus.connected) {
        const res = await fetch('/api/ollama/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'gemma3:4b',
            prompt,
            stream: false,
            format: 'json'
          })
        });
        if (res.ok) {
          const raw = await res.json();
          questData = JSON.parse(raw.response);
        }
      }

      if (!questData) {
        // Fallback local generated template
        questData = {
          title: 'The Vein Network Survey',
          category: 'OBSERVATION',
          duration: '15 min',
          difficulty: 'Easy',
          reward: 55,
          objective: 'Find a fallen leaf and trace its primary and secondary branching veins with your eyes.',
          hint: 'Hold the leaf up against the sunlight to reveal translucent vascular bundles.'
        };
      }

      const generated = {
        id: `ai-${Date.now()}`,
        title: questData.title,
        category: questData.category || 'PLANTS',
        duration: questData.duration || '20 min',
        difficulty: questData.difficulty || 'Easy',
        reward: questData.reward || 60,
        equipment: 'Curious eyes',
        objective: questData.objective,
        hint: questData.hint,
        progress: '0 / 1 complete',
        completed: false
      };

      onCreateCustomQuest(generated);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAiQuest(false);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customTitle.trim() || !customObjective.trim()) return;

    const newQ = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim(),
      category: customCategory,
      duration: customDuration,
      difficulty: customDifficulty,
      reward: Number(customReward) || 50,
      equipment: 'Sensible shoes',
      objective: customObjective.trim(),
      hint: customHint.trim() || 'Outdoor plant observation challenge.',
      progress: '0 / 1 complete',
      completed: false
    };

    onCreateCustomQuest(newQ);
    setCustomModalOpen(false);
    setCustomTitle('');
    setCustomObjective('');
    setCustomHint('');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 block mb-1">
            FIELD MISSIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            QUESTS
          </h2>
          <p className="text-sm text-stone-400 mt-1">
            "Small missions that get you outside."
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleGenerateLocalQuest}
            disabled={isGeneratingAiQuest}
            className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
          >
            {isGeneratingAiQuest ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
            <span>{isGeneratingAiQuest ? 'SYNTHESIZING...' : 'GENERATE AI QUEST'}</span>
          </button>

          <button
            onClick={() => setCustomModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono font-bold uppercase flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>CREATE QUEST</span>
          </button>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={clsx(
              "px-3.5 py-1.5 rounded-xl uppercase font-bold transition-all cursor-pointer",
              selectedFilter === f
                ? "bg-emerald-500 text-stone-950 shadow-md"
                : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Quest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((quest) => {
          const isActive = activeMission?.id === quest.id || activeMission?.task === quest.objective;

          return (
            <div
              key={quest.id}
              className={clsx(
                "rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between backdrop-blur-xl relative",
                isActive
                  ? "bg-stone-900/90 border-emerald-500/60 shadow-xl shadow-emerald-950/20"
                  : "bg-stone-900/50 border-stone-800 hover:border-stone-700"
              )}
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-800/60">
                    {quest.category}
                  </span>
                  <div className="flex items-center gap-2 text-stone-400">
                    <span>{quest.duration}</span>
                    <span>•</span>
                    <span className="text-stone-300 font-bold">{quest.difficulty}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">+{quest.reward} XP</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {quest.title}
                </h3>

                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  {quest.objective}
                </p>

                {quest.hint && (
                  <p className="text-[11px] text-stone-400 italic mb-6 bg-stone-950/60 p-3 rounded-xl border border-stone-800/80">
                    💡 Tip: {quest.hint}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                {isActive ? (
                  <button
                    onClick={() => onStartQuest(quest)}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
                  >
                    <Compass className="w-4 h-4 text-stone-950" />
                    <span>LAUNCH OUTDOOR MODE</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onStartQuest(quest)}
                    className="w-full py-3 bg-stone-950 hover:bg-stone-900 text-stone-300 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-stone-800 hover:border-emerald-500"
                  >
                    <span>START THIS QUEST</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Quest Creator Modal */}
      {customModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#040604]/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-[#080b08] border border-stone-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <h3 className="text-xl font-black text-white">Create Outdoor Plant Quest</h3>
            <p className="text-xs text-stone-400 font-mono">Design a localized botanical challenge for your neighborhood.</p>

            <form onSubmit={handleCustomSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-stone-300 font-bold uppercase mb-1">Quest Title</label>
                <input
                  type="text"
                  placeholder="e.g. Find 3 Alternate-Leaved Shrubs"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-300 font-bold uppercase mb-1">Objective Description</label>
                <textarea
                  rows={3}
                  placeholder="What must the explorer observe in nature?"
                  value={customObjective}
                  onChange={(e) => setCustomObjective(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-200 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 uppercase text-[10px] mb-1">Category</label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-stone-200"
                  >
                    {FILTERS.filter(f => f !== 'ALL').map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-400 uppercase text-[10px] mb-1">XP Reward</label>
                  <input
                    type="number"
                    min="20"
                    max="150"
                    value={customReward}
                    onChange={(e) => setCustomReward(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2 text-stone-200"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCustomModalOpen(false)}
                  className="px-4 py-2 text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Activate Quest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
