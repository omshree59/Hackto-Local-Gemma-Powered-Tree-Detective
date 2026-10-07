import React, { useState } from 'react';
import { 
  Target, Compass, Clock, Award, CheckCircle, 
  ArrowRight, Plus, Sparkles, RefreshCw, Wand2, Zap
} from 'lucide-react';
import clsx from 'clsx';
import { INITIAL_QUESTS } from '../data/natureData';
import { cleanAiText } from '../utils/textCleaner';

const FILTERS = ['ALL', 'PLANTS', 'OBSERVATION', 'WALK', 'DISCOVERY', 'PHOTOGRAPHY'];

export default function QuestsView({
  activeMission,
  onStartQuest,
  quests = INITIAL_QUESTS,
  onCreateCustomQuest,
  ollamaStatus
}) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [isGeneratingAiQuest, setIsGeneratingAiQuest] = useState(false);

  // AI Generator Inputs
  const [aiTime, setAiTime] = useState('15 min');
  const [aiDifficulty, setAiDifficulty] = useState('Easy');
  const [aiInterest, setAiInterest] = useState('Plants');

  const filtered = quests.filter(q => 
    selectedFilter === 'ALL' ? true : q.category.toUpperCase() === selectedFilter
  );

  const generateWithAi = async (isSurprise = false) => {
    setIsGeneratingAiQuest(true);

    try {
      let prompt;
      if (isSurprise) {
        prompt = `You are an offline nature exploration master. Generate ONE SURPRISE plant exploration quest. Make it creative but safe.
Write all text in natural, plain human conversational English without asterisks (no ** or *), without hashtags (no #), and without markdown symbols.
Respond strictly in JSON matching this schema:
{
  "title": "Creative surprise title in plain text",
  "category": "DISCOVERY",
  "duration": "30 min",
  "difficulty": "Medium",
  "reward": 100,
  "objective": "A 1-sentence actionable plant discovery challenge in plain text",
  "hint": "1 short tip where to look in plain text",
  "safetyNote": "Be careful outdoors."
}`;
      } else {
        prompt = `You are an offline nature exploration master. Generate ONE outdoor exploration quest.
Parameters:
Time: ${aiTime}
Difficulty: ${aiDifficulty}
Interest/Category: ${aiInterest}

Write all text in natural, plain human conversational English without asterisks (no ** or *), without hashtags (no #), and without markdown symbols.
Respond strictly in JSON matching this schema:
{
  "title": "Short catchy title matching parameters in plain text",
  "category": "${aiInterest.toUpperCase()}",
  "duration": "${aiTime}",
  "difficulty": "${aiDifficulty}",
  "reward": 80,
  "objective": "A 1-sentence actionable plant discovery challenge in plain text",
  "hint": "1 short tip where to look in plain text",
  "safetyNote": "Safety tip."
}`;
      }

      let questData = null;

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
          questData = JSON.parse(raw.response);
        }
      }

      if (!questData) {
        // Fallback if Ollama fails/disconnected
        questData = {
          title: isSurprise ? 'The 30-Minute Leaf Detective' : `${aiInterest} Expedition`,
          category: isSurprise ? 'DISCOVERY' : aiInterest.toUpperCase(),
          duration: isSurprise ? '30 min' : aiTime,
          difficulty: isSurprise ? 'Medium' : aiDifficulty,
          reward: isSurprise ? 100 : 80,
          objective: isSurprise ? 'Find 3 different leaf shapes and one leaf larger than your hand.' : `Explore your local area focusing on ${aiInterest.toLowerCase()}.`,
          hint: 'Look closely at the groundcover and low-hanging branches.',
          safetyNote: 'Watch your step on uneven terrain.'
        };
      }

      const generated = {
        id: `ai-${Date.now()}`,
        title: cleanAiText(questData.title),
        category: cleanAiText(questData.category) || 'PLANTS',
        duration: cleanAiText(questData.duration) || '20 min',
        difficulty: cleanAiText(questData.difficulty) || 'Easy',
        reward: questData.reward || 60,
        equipment: 'Curious eyes',
        objective: cleanAiText(questData.objective),
        hint: cleanAiText(questData.hint),
        progress: '0 / 1 complete',
        completed: false
      };

      onCreateCustomQuest(generated);
      if (!isSurprise) {
        setAiModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAiQuest(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto pb-12 font-sans select-none relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1e3f2b]/40">
        <div>
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#91b79a] block mb-1">
            OUTDOOR MISSIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
            Quests
          </h2>
          <p className="text-sm text-[#d8c8a8] mt-1">
            Small missions that get you outside.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto font-mono">
          <button
            onClick={() => generateWithAi(true)}
            disabled={isGeneratingAiQuest}
            className="px-4 py-2.5 rounded-xl bg-[#0b1f16] hover:bg-[#123a27] border border-[#315c3b]/60 text-emerald-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
          >
            {isGeneratingAiQuest ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>SURPRISE ME</span>
          </button>

          <button
            onClick={() => setAiModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#245336] hover:bg-[#2d6844] active:scale-95 text-[#f3f1e7] text-[11px] font-black uppercase tracking-wider flex items-center gap-2 shadow-lg border border-[#4f8a52]/40 transition-all cursor-pointer"
          >
            <Wand2 className="w-4 h-4 text-emerald-300" />
            <span>CREATE FIELD MISSION</span>
          </button>
        </div>
      </div>

      {/* AI Quest Generator Modal */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#040e08]/92 backdrop-blur-3xl flex items-center justify-center p-4">
          <div className="nature-surface-card rounded-[2.5rem] w-full max-w-lg p-8 border border-[#4f8a52]/40 shadow-2xl relative">
            <h3 className="text-2xl font-black text-[#f3f1e7] mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              Generate Mission
            </h3>
            <p className="text-[#91b79a] text-sm mb-6 font-sans">
              Local AI will create a personalized outdoor exploration quest based on your preferences.
            </p>

            <div className="space-y-5 font-mono text-xs">
              <div>
                <label className="text-emerald-400 font-bold block mb-2">TIME AVAILABLE</label>
                <div className="flex gap-2">
                  {['15 min', '30 min', '45 min', '60 min'].map(t => (
                    <button 
                      key={t} onClick={() => setAiTime(t)}
                      className={clsx("px-3 py-2 rounded-lg border transition-colors cursor-pointer", aiTime === t ? "bg-[#123a27] border-[#4f8a52] text-[#f3f1e7]" : "bg-[#081a11] border-[#1e3f2b] text-[#91b79a]")}
                    >{t}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-emerald-400 font-bold block mb-2">DIFFICULTY</label>
                <div className="flex gap-2">
                  {['Easy', 'Medium', 'Adventure'].map(d => (
                    <button 
                      key={d} onClick={() => setAiDifficulty(d)}
                      className={clsx("px-3 py-2 rounded-lg border transition-colors cursor-pointer", aiDifficulty === d ? "bg-[#123a27] border-[#4f8a52] text-[#f3f1e7]" : "bg-[#081a11] border-[#1e3f2b] text-[#91b79a]")}
                    >{d}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-emerald-400 font-bold block mb-2">PRIMARY INTEREST</label>
                <div className="flex flex-wrap gap-2">
                  {['Plants', 'Observation', 'Photography', 'Exploration'].map(i => (
                    <button 
                      key={i} onClick={() => setAiInterest(i)}
                      className={clsx("px-3 py-2 rounded-lg border transition-colors cursor-pointer", aiInterest === i ? "bg-[#123a27] border-[#4f8a52] text-[#f3f1e7]" : "bg-[#081a11] border-[#1e3f2b] text-[#91b79a]")}
                    >{i.toUpperCase()}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={() => generateWithAi(false)}
                disabled={isGeneratingAiQuest}
                className="flex-1 py-3 bg-[#245336] hover:bg-[#2d6844] text-[#f3f1e7] text-xs font-black uppercase rounded-xl border border-[#4f8a52]/40 transition-colors cursor-pointer flex items-center justify-center gap-2 font-mono"
              >
                {isGeneratingAiQuest ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                <span>{isGeneratingAiQuest ? 'GENERATING...' : 'GENERATE WITH LOCAL AI'}</span>
              </button>
              <button
                onClick={() => setAiModalOpen(false)}
                className="px-5 py-3 rounded-xl bg-[#081a11] hover:bg-[#0c2619] border border-[#1e3f2b] text-[#91b79a] text-xs font-bold font-mono cursor-pointer transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide font-mono text-[10px]">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={clsx(
              "px-4 py-2 rounded-full font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer",
              selectedFilter === f 
                ? "bg-[#4f8a52] text-white shadow-md" 
                : "bg-[#081a11] text-[#91b79a] hover:bg-[#0e2c1d] border border-[#1e3f2b]"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Active Quest (if any) */}
      {activeMission && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <h3 className="text-sm font-mono font-bold text-emerald-300 uppercase tracking-wider">Currently Active</h3>
          </div>

          <div className="nature-surface-card rounded-2xl p-6 border-l-4 border-l-emerald-500 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-[#91b79a] mb-2">
                <span className="text-emerald-300 font-bold uppercase">{activeMission.category}</span>
                <span>•</span>
                <span>{activeMission.duration}</span>
                <span>•</span>
                <span>{activeMission.difficulty}</span>
              </div>
              <h4 className="text-xl font-bold text-[#f3f1e7] mb-1 leading-snug">{activeMission.title}</h4>
              <p className="text-sm text-[#d8c8a8] max-w-xl font-sans">{activeMission.objective}</p>
            </div>
            
            <button
              onClick={() => onStartQuest(activeMission)}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#06100b] text-xs font-black uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
            >
              <Compass className="w-4 h-4" />
              <span>ENTER FIELD MODE</span>
            </button>
          </div>
        </section>
      )}

      {/* Quest Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(q => {
          const isActive = activeMission?.id === q.id;
          return (
            <div 
              key={q.id}
              className={clsx(
                "rounded-2xl p-6 transition-all flex flex-col justify-between group h-full",
                isActive
                  ? "bg-[#0b1f16] border border-emerald-500/50 shadow-[0_0_15px_rgba(79,138,82,0.15)]"
                  : "nature-surface-card border border-[#1e3f2b]/40 hover:border-[#4f8a52]/60"
              )}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] mb-3">
                  <span className={clsx("font-bold uppercase tracking-wider", isActive ? "text-emerald-400" : "text-[#4f8a52]")}>
                    {q.category}
                  </span>
                  <div className="flex items-center gap-2 text-[#91b79a]">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {q.duration}</span>
                    <span>•</span>
                    <span>{q.difficulty}</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-[#f3f1e7] mb-2 leading-snug">
                  {q.title}
                </h4>
                
                <p className="text-xs text-[#d8c8a8]/80 leading-relaxed font-sans mb-4">
                  {q.objective}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1e3f2b]/40 mt-auto flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-300">
                  +{q.reward} XP
                </span>
                {isActive ? (
                  <span className="font-mono text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <Compass className="w-3 h-3" /> ACTIVE
                  </span>
                ) : (
                  <button
                    onClick={() => onStartQuest(q)}
                    className="text-[10px] font-mono font-bold bg-[#091b12] hover:bg-[#123a27] text-[#f3f1e7] px-3 py-1.5 rounded-lg border border-[#1e3f2b] transition-colors cursor-pointer"
                  >
                    START
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
