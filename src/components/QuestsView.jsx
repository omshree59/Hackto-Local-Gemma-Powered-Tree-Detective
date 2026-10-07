import React, { useState } from 'react';
import { 
  Target, Dices, Compass, Clock, Award, CheckCircle, 
  ArrowRight, Sparkles, Plus, Flame, ShieldCheck, Footprints
} from 'lucide-react';
import clsx from 'clsx';
import { QUEST_CATEGORIES, INITIAL_QUESTS, RANDOM_EXPEDITIONS } from '../data/datasets';

export default function QuestsView({
  activeMission,
  onSetActiveMission,
  onStartTouchGrass,
  quests = INITIAL_QUESTS,
  onCreateCustomQuest
}) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [randomExpedition, setRandomExpedition] = useState(null);
  const [isGeneratingRandom, setIsGeneratingRandom] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);

  // Custom Quest form fields
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState('NATURE');
  const [customDuration, setCustomDuration] = useState('30 MIN');
  const [customDifficulty, setCustomDifficulty] = useState('EASY');
  const [customReward, setCustomReward] = useState(80);
  const [customObjective, setCustomObjective] = useState('');
  const [customHint, setCustomHint] = useState('');

  const filteredQuests = quests.filter(q => 
    selectedCategory === 'ALL' ? true : q.category.toUpperCase() === selectedCategory
  );

  const handleGenerateRandom = () => {
    setIsGeneratingRandom(true);
    setRandomExpedition(null);

    setTimeout(() => {
      const pick = RANDOM_EXPEDITIONS[Math.floor(Math.random() * RANDOM_EXPEDITIONS.length)];
      setRandomExpedition(pick);
      setIsGeneratingRandom(false);
    }, 1200);
  };

  const handleCreateCustom = (e) => {
    e.preventDefault();
    if (!customTitle.trim() || !customObjective.trim()) return;

    const newQuest = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim(),
      category: customCategory,
      duration: customDuration,
      difficulty: customDifficulty,
      reward: Number(customReward) || 60,
      equipment: 'Field curiosity',
      objective: customObjective.trim(),
      hint: customHint.trim() || 'Custom local trail objective.',
      completed: false
    };

    onCreateCustomQuest(newQuest);
    setCustomModalOpen(false);
    setCustomTitle('');
    setCustomObjective('');
    setCustomHint('');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400">
              EXPEDITION DIRECTIVES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            FIELD QUESTS
          </h2>
          <p className="text-sm text-stone-400 mt-1 font-sans">
            "Small reasons to step outside."
          </p>
        </div>

        <button
          onClick={() => setCustomModalOpen(true)}
          className="self-start md:self-auto bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 px-5 py-3 rounded-2xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow-md"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>+ CUSTOM MISSION</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* SIGNATURE FEATURE: RANDOM EXPEDITION GENERATOR */}
      {/* ============================================================== */}
      <section className="bg-gradient-to-br from-[#0c140c] via-[#091009] to-[#050805] border border-emerald-500/40 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-[10px] font-mono font-bold text-emerald-300 mb-4">
            <Dices className="w-4 h-4 text-emerald-400" />
            <span>AI FIELD ARBITER • GEMMA 3</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-3">
            DON'T KNOW WHAT TO DO?<br />
            <span className="text-emerald-400">LET THE FIELD GUIDE DECIDE.</span>
          </h3>

          <p className="text-sm text-stone-300 mb-6 font-sans leading-relaxed">
            Let offline Gemma 3 assemble a randomized micro-adventure based on sensory curiosity, duration, and local observation challenges.
          </p>

          <button
            onClick={handleGenerateRandom}
            disabled={isGeneratingRandom}
            className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 text-xs font-black uppercase tracking-wider px-7 py-4 rounded-2xl flex items-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer disabled:opacity-50"
          >
            <Dices className={clsx("w-4 h-4 text-stone-950", isGeneratingRandom && "animate-spin")} />
            <span>{isGeneratingRandom ? 'SYNTHESIZING DIRECTIVE...' : 'GENERATE RANDOM EXPEDITION'}</span>
          </button>
        </div>

        {/* Generated Random Expedition Reveal Card */}
        {randomExpedition && (
          <div className="mt-8 pt-8 border-t border-stone-800/80 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-stone-950/80 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3 font-mono text-xs">
                <span className="text-emerald-400 font-bold uppercase tracking-wider">
                  TODAY'S RANDOM EXPEDITION
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-stone-300">{randomExpedition.duration}</span>
                  <span className="text-stone-600">•</span>
                  <span className="text-stone-300">{randomExpedition.difficulty}</span>
                  <span className="text-stone-600">•</span>
                  <span className="text-emerald-400 font-bold">+{randomExpedition.reward} XP</span>
                </div>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
                "{randomExpedition.title}"
              </h4>

              <p className="text-sm text-stone-200 leading-relaxed mb-3">
                <strong>Your Challenge:</strong> {randomExpedition.challenge}
              </p>

              {randomExpedition.bonus && (
                <p className="text-xs text-amber-300/90 font-mono mb-6 bg-amber-950/20 p-3 rounded-xl border border-amber-900/30">
                  ✦ Bonus Objective: {randomExpedition.bonus}
                </p>
              )}

              <button
                onClick={() => {
                  onSetActiveMission({
                    id: `rand-${Date.now()}`,
                    task: randomExpedition.challenge,
                    title: randomExpedition.title,
                    reward: randomExpedition.reward,
                    category: randomExpedition.category,
                    hint: randomExpedition.bonus
                  });
                  onStartTouchGrass();
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-stone-950" />
                <span>START THIS EXPEDITION</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Category Filter Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {QUEST_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={clsx(
              "px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer",
              selectedCategory === cat
                ? "bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20"
                : "bg-stone-900/80 text-stone-400 hover:text-stone-200 border border-stone-800"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quests Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuests.map((quest) => {
          const isActive = activeMission?.id === quest.id || activeMission?.task === quest.objective;

          return (
            <div 
              key={quest.id}
              className={clsx(
                "rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group",
                isActive 
                  ? "bg-gradient-to-br from-emerald-950/40 via-stone-900/90 to-[#070a07] border-emerald-500/80 shadow-2xl" 
                  : "bg-stone-900/50 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/80"
              )}
            >
              <div>
                
                {/* Meta Header */}
                <div className="flex items-center justify-between mb-3 font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-800/60">
                    {quest.category}
                  </span>
                  
                  <div className="flex items-center gap-2 text-stone-400">
                    <span>{quest.duration}</span>
                    <span>•</span>
                    <span className="text-stone-300 font-semibold">{quest.difficulty}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">+{quest.reward} XP</span>
                  </div>
                </div>

                {/* Title & Objective */}
                <h4 className="text-xl font-bold text-white mb-2 leading-snug">
                  {quest.title}
                </h4>

                <p className="text-xs text-stone-300 leading-relaxed mb-3">
                  {quest.objective}
                </p>

                {/* Equipment & Hint */}
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 text-[11px] text-stone-400 mb-6 space-y-1">
                  <div>
                    <span className="text-stone-500 font-mono">EQUIPMENT: </span>
                    <span className="text-stone-300">{quest.equipment || 'Sensible footwear'}</span>
                  </div>
                  {quest.hint && (
                    <div className="italic text-stone-400 text-[10px]">
                      "{quest.hint}"
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                {isActive ? (
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> ACTIVE MISSION
                  </span>
                ) : (
                  <button
                    onClick={() => onSetActiveMission({
                      id: quest.id,
                      task: quest.objective,
                      title: quest.title,
                      reward: quest.reward,
                      category: quest.category,
                      hint: quest.hint
                    })}
                    className="w-full py-3 bg-stone-950 hover:bg-emerald-500 hover:text-stone-950 text-stone-200 text-xs font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-stone-800 hover:border-emerald-500"
                  >
                    <span>SET AS ACTIVE</span>
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
          <div className="bg-[#080b08] border border-stone-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-black text-white mb-1">Create Custom Trail Mission</h3>
            <p className="text-xs text-stone-400 mb-6 font-mono">Define a localized outdoor objective for your terrain</p>

            <form onSubmit={handleCreateCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-stone-300 uppercase mb-1">
                  Mission Title
                </label>
                <input 
                  type="text"
                  placeholder="e.g. The Ancient Oak Canopy Hunt"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-stone-300 uppercase mb-1">
                  Outdoor Objective Description
                </label>
                <textarea 
                  rows={3}
                  placeholder="Describe what the explorer must discover or do outside..."
                  value={customObjective}
                  onChange={(e) => setCustomObjective(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-stone-400 uppercase mb-1">
                    Category
                  </label>
                  <select 
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-xs text-stone-200 font-mono"
                  >
                    {QUEST_CATEGORIES.filter(c => c !== 'ALL').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-stone-400 uppercase mb-1">
                    XP Reward
                  </label>
                  <input 
                    type="number"
                    min="30"
                    max="200"
                    value={customReward}
                    onChange={(e) => setCustomReward(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2 text-xs text-stone-200 font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCustomModalOpen(false)}
                  className="px-4 py-2 text-xs font-mono text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider"
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
