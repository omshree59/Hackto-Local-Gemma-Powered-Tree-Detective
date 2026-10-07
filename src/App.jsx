import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Compass, Award, CheckCircle, RefreshCw, WifiOff, MapPin, 
  Leaf, Sparkles, BookOpen, Info, ChevronRight, Trees, Bug, Bird, 
  Flower, Mountain, ShieldCheck, Cpu, Target, Trophy, Code, Search, 
  SlidersHorizontal, Layers, ExternalLink, Zap, Check, Share2, 
  FileText, Flame, Globe, Activity, HardDrive, Terminal, ArrowRight, Eye, Play, Upload
} from 'lucide-react';
import clsx from 'clsx';
import Squares from './components/Squares';

const processSteps = [
  "Connecting to local Ollama instance (127.0.0.1:11434)...",
  "Loading Gemma 3 (4B) vision weights into local memory...",
  "Running zero-cloud neural vision inference on specimen...",
  "Extracting morphological traits & taxonomy classification...",
  "Verifying field mission completion criteria...",
  "Storing ecological discovery to encrypted offline codex..."
];

const PRESET_QUESTS = [
  {
    id: 'bot-1',
    guild: 'Botanist',
    task: 'Find a wildflower with five distinct petals.',
    targetType: 'Flower',
    reward: 50,
    difficulty: 'Easy',
    hint: 'Look near meadow edges, gardens, or sunny trail clearings.'
  },
  {
    id: 'bot-2',
    guild: 'Botanist',
    task: 'Locate a compound leaf with serrated or jagged edges.',
    targetType: 'Tree',
    reward: 45,
    difficulty: 'Moderate',
    hint: 'Common in ash, walnut, rose, and sumac varieties.'
  },
  {
    id: 'ent-1',
    guild: 'Entomologist',
    task: 'Photograph an active pollinator (bee, butterfly, or hoverfly) on flora.',
    targetType: 'Insect',
    reward: 60,
    difficulty: 'Moderate',
    hint: 'Patience is key! Stay still near flowering shrubs in the sunlight.'
  },
  {
    id: 'ent-2',
    guild: 'Entomologist',
    task: 'Find an insect camouflage pattern or textured exoskeleton.',
    targetType: 'Insect',
    reward: 55,
    difficulty: 'Hard',
    hint: 'Check decaying tree stumps or underside of damp stones.'
  },
  {
    id: 'geo-1',
    guild: 'Geologist',
    task: 'Identify a smooth water-carved river stone or layered sedimentary rock.',
    targetType: 'Rock',
    reward: 40,
    difficulty: 'Easy',
    hint: 'Look along creeks, riverbanks, or gravel trail transitions.'
  },
  {
    id: 'geo-2',
    guild: 'Geologist',
    task: 'Find dark igneous or quartz-veined metamorphic mineral formation.',
    targetType: 'Rock',
    reward: 65,
    difficulty: 'Hard',
    hint: 'Examine bedrock outcroppings, cliffs, or dried streambeds.'
  },
  {
    id: 'orn-1',
    guild: 'Ornithologist',
    task: 'Photograph a perching songbird or naturally fallen flight feather.',
    targetType: 'Bird',
    reward: 70,
    difficulty: 'Expert',
    hint: 'Keep binoculars or camera ready at morning dawn or dusk feeding hours.'
  },
  {
    id: 'myco-1',
    guild: 'Forager',
    task: 'Locate shelf fungus or tree moss thriving on decaying bark.',
    targetType: 'Tree',
    reward: 50,
    difficulty: 'Moderate',
    hint: 'Deep shaded forest floors, northern faces of mature trees.'
  }
];

// Sample offline fallback specimens for desktop verification
const SAMPLE_SPECIMENS = [
  {
    title: 'Autumn Oak Leaf',
    category: 'Tree',
    name: 'Quercus robur (English Oak)',
    fact: 'Oak leaves contain tannins that protect them from insect predation and slow their decomposition, enriching forest topsoil.',
    reward: 45,
    svgColor: '#10b981'
  },
  {
    title: 'Wild Violet Bloom',
    category: 'Flower',
    name: 'Viola sororia (Common Meadow Violet)',
    fact: 'Wild violets possess bilateral symmetry with five distinct petals, serving as a primary early spring food source for native solitary bees.',
    reward: 50,
    svgColor: '#8b5cf6'
  },
  {
    title: 'Striped Field Cricket',
    category: 'Insect',
    name: 'Gryllus pennsylvanicus (Fall Field Cricket)',
    fact: 'Crickets chirp at a rate proportional to outdoor ambient temperature, a phenomenon known mathematically as Dolbear\'s Law.',
    reward: 55,
    svgColor: '#f59e0b'
  },
  {
    title: 'Riverbed Granite Pebble',
    category: 'Rock',
    name: 'Quartz-Feldspar Granite',
    fact: 'This plutonic igneous rock formed millions of years ago deep within continental crust before being smoothed by continuous river erosion.',
    reward: 40,
    svgColor: '#06b6d4'
  }
];

export default function App() {
  const [xp, setXp] = useState(() => Number(localStorage.getItem('nq_xp')) || 140);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('nq_history');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 1711000001,
        name: 'Quercus velutina (Black Oak)',
        category: 'Tree',
        fact: 'The inner bark contains quercitron, a rich yellow pigment historically used as natural textile dye.',
        earned: 45,
        time: '09:15 AM',
        date: 'Oct 06, 2026'
      },
      {
        id: 1711000002,
        name: 'Papilio polyxenes (Black Swallowtail)',
        category: 'Insect',
        fact: 'Caterpillars of this species mimic bird droppings when young before developing bright aposematic warning coloration.',
        earned: 60,
        time: '11:42 AM',
        date: 'Oct 06, 2026'
      }
    ];
  });

  const [activeChallenge, setActiveChallenge] = useState(() => {
    const saved = localStorage.getItem('nq_challenge');
    if (saved) return JSON.parse(saved);
    return PRESET_QUESTS[0];
  });

  const [activeTab, setActiveTab] = useState('station'); // 'station', 'guilds', 'codex', 'metrics', 'hacktoberfest'
  const [selectedGuildFilter, setSelectedGuildFilter] = useState('All');
  const [codexCategoryFilter, setCodexCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom Quest State
  const [customTask, setCustomTask] = useState('');
  const [customCategory, setCustomCategory] = useState('Botanist');
  const [customReward, setCustomReward] = useState(50);
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Scanner State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [currentResult, setCurrentResult] = useState(null);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);
  const [selectedFileRaw, setSelectedFileRaw] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedDevDraft, setCopiedDevDraft] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const level = Math.floor(xp / 200) + 1;
  const xpProgress = xp % 200;
  const xpNeeded = 200 - xpProgress;

  useEffect(() => {
    localStorage.setItem('nq_xp', xp);
    localStorage.setItem('nq_history', JSON.stringify(history));
    localStorage.setItem('nq_challenge', JSON.stringify(activeChallenge));
  }, [xp, history, activeChallenge]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    setErrorMsg('');
    setSelectedFileRaw(file);
    const reader = new FileReader();
    reader.onload = () => setSelectedFilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const triggerAnalyze = async () => {
    if (!selectedFileRaw) {
      setErrorMsg('Please select or capture a specimen photo first.');
      return;
    }
    setErrorMsg('');
    setIsProcessing(true);
    setCurrentResult(null);
    setShowResultPopup(false);
    setProcessingStep(0);

    const stepInterval = setInterval(() => {
      setProcessingStep(prev => (prev < processSteps.length - 1 ? prev + 1 : prev));
    }, 1100);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1];
      await analyzeImageLocally(base64Data, stepInterval);
    };
    reader.readAsDataURL(selectedFileRaw);
  };

  const triggerSampleTest = (sample) => {
    setErrorMsg('');
    setIsProcessing(true);
    setCurrentResult(null);
    setShowResultPopup(false);
    setProcessingStep(0);

    const stepInterval = setInterval(() => {
      setProcessingStep(prev => (prev < processSteps.length - 1 ? prev + 1 : prev));
    }, 1000);

    // Simulate full local offline parsing pipeline for rapid testing
    setTimeout(() => {
      clearInterval(stepInterval);
      setProcessingStep(processSteps.length - 1);

      setTimeout(() => {
        setIsProcessing(false);
        const parsed = {
          name: sample.name,
          category: sample.category,
          fact: sample.fact,
          challengeMet: sample.category.toLowerCase() === (activeChallenge.targetType || '').toLowerCase() || activeChallenge.targetType === 'Any'
        };

        const baseXP = 35;
        const bonusXP = parsed.challengeMet ? (activeChallenge.reward || 40) : 10;
        const totalEarned = baseXP + bonusXP;

        setCurrentResult({ ...parsed, earned: totalEarned });
        setShowResultPopup(true);

        setXp(prev => prev + totalEarned);
        setHistory(prev => [
          {
            id: Date.now(),
            name: parsed.name,
            category: parsed.category,
            fact: parsed.fact,
            earned: totalEarned,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
          },
          ...prev
        ]);
        showToast(`+${totalEarned} XP Logged in Codex!`);
      }, 700);
    }, 3800);
  };

  const analyzeImageLocally = async (base64Image, stepInterval) => {
    const prompt = `
You are an offline wilderness nature exploration game master. Analyze this nature photo.
Respond STRICTLY with a valid JSON object matching this schema:
{
  "name": "Common and scientific name of plant, tree, bug, bird, or rock",
  "category": "Tree" | "Flower" | "Insect" | "Rock" | "Bird" | "Other",
  "fact": "A short, engaging 1-sentence ecological/geological fact",
  "challengeMet": true,
  "nextChallenge": {
    "task": "A short, actionable outdoor quest to find next",
    "targetType": "Specimen category",
    "reward": 45,
    "guild": "Botanist" | "Entomologist" | "Geologist" | "Ornithologist" | "Forager",
    "difficulty": "Moderate"
  }
}
Set "challengeMet" to true if the specimen matches or makes progress toward the active challenge: "${activeChallenge.task}".
Do not include markdown codeblocks or text outside the raw JSON.`;

    try {
      const response = await fetch('/api/ollama/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'gemma3:4b',
          prompt: prompt,
          images: [base64Image],
          stream: false,
          format: 'json'
        })
      });

      if (!response.ok) {
        throw new Error('Local Ollama instance unreachable. Verify Ollama is running `ollama run gemma3:4b`.');
      }

      const data = await response.json();
      const parsed = JSON.parse(data.response);

      clearInterval(stepInterval);
      setProcessingStep(processSteps.length - 1);

      setTimeout(() => {
        setIsProcessing(false);
        const baseXP = 35;
        const bonusXP = parsed.challengeMet ? (activeChallenge.reward || 50) : 10;
        const totalEarned = baseXP + bonusXP;

        setCurrentResult({ ...parsed, earned: totalEarned });
        setShowResultPopup(true);

        setXp(prev => prev + totalEarned);
        setHistory(prev => [
          {
            id: Date.now(),
            name: parsed.name,
            category: parsed.category,
            fact: parsed.fact,
            earned: totalEarned,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
          },
          ...prev
        ]);

        if (parsed.nextChallenge?.task) {
          setActiveChallenge({
            ...parsed.nextChallenge,
            id: `gen-${Date.now()}`
          });
        }
        showToast(`+${totalEarned} XP Logged in Codex!`);
      }, 700);

    } catch (err) {
      clearInterval(stepInterval);
      setIsProcessing(false);
      setErrorMsg(err.message || 'Error executing local Gemma 3 offline inference.');
    }
  };

  const getCategoryIcon = (category, className = "w-5 h-5") => {
    switch (category?.toLowerCase()) {
      case 'tree': return <Trees className={className} />;
      case 'flower': return <Flower className={className} />;
      case 'insect': return <Bug className={className} />;
      case 'bird': return <Bird className={className} />;
      case 'rock': return <Mountain className={className} />;
      default: return <Leaf className={className} />;
    }
  };

  const filteredQuests = PRESET_QUESTS.filter(q => 
    selectedGuildFilter === 'All' ? true : q.guild.toLowerCase() === selectedGuildFilter.toLowerCase()
  );

  const filteredCodex = history.filter(item => {
    const matchesCat = codexCategoryFilter === 'All' ? true : item.category?.toLowerCase() === codexCategoryFilter.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.fact && item.fact.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleActivateQuest = (quest) => {
    setActiveChallenge(quest);
    setActiveTab('station');
    showToast(`Active Mission Set: "${quest.task}"`);
  };

  const handleCreateCustomQuest = (e) => {
    e.preventDefault();
    if (!customTask.trim()) return;
    const newQuest = {
      id: `custom-${Date.now()}`,
      guild: customCategory,
      task: customTask.trim(),
      targetType: customCategory === 'Botanist' ? 'Tree' : customCategory === 'Entomologist' ? 'Insect' : customCategory === 'Geologist' ? 'Rock' : 'Any',
      reward: Number(customReward) || 50,
      difficulty: 'Custom',
      hint: 'User defined local trail objective.'
    };
    setActiveChallenge(newQuest);
    setShowCustomModal(false);
    setCustomTask('');
    setActiveTab('station');
    showToast('Custom Trail Quest Activated!');
  };

  const copyDevPostDraft = () => {
    const draftText = `---
title: NatureQuest: Touching Grass with Offline Gemma 3 on the Trail
published: true
tags: hacktoberfest, devchallenge, ai, opensource
cover_image: https://raw.githubusercontent.com/dev2/hero.png
---

## 🌲 The Philosophy: Touch Grass
In an era where software commands our continuous gaze, **NatureQuest** flips the script: **The screen is the shortest part of the experience.**

NatureQuest is an offline nature exploration game master built for the **DEV Challenge: Touch Grass** during **Hacktoberfest 2026**.

## ⚡ Why Open Innovation Matters
- **100% Trail-Ready (Zero Signal):** Deep in old-growth forests, cellular towers don't exist. NatureQuest runs **Gemma 3 (4B)** directly on device via **Ollama**.
- **Absolute Privacy:** Your geo-coordinates and high-resolution trail photographs never leave your laptop or phone.
- **Zero API Ingestion Costs:** Run unlimited taxonomic vision passes without a corporate credit card.

Built with React, Tailwind CSS, Ollama, and Gemma 3.
`;
    navigator.clipboard.writeText(draftText);
    setCopiedDevDraft(true);
    setTimeout(() => setCopiedDevDraft(false), 3000);
    showToast('Dev.to Markdown Article Copied to Clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-stone-100 font-sans selection:bg-emerald-500/30 relative overflow-x-hidden flex flex-col">
      
      {/* Full-screen ReactBits Squares Canvas Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
        <Squares 
          direction="diagonal"
          speed={0.25}
          squareSize={42}
          borderColor="#10b981" 
          hoverFillColor="#059669"
        />
      </div>

      {/* Ambient Lighting Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-emerald-950/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[700px] h-[700px] bg-teal-950/20 rounded-full blur-[160px]" />
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOP DESKTOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full bg-[#050505]/80 backdrop-blur-2xl border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Offline Pill */}
          <div className="flex items-center gap-4">
            <div 
              onClick={() => setActiveTab('station')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-stone-950" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-white bg-clip-text text-transparent">
                  NatureQuest
                </span>
                <span className="block text-[10px] font-bold tracking-widest text-stone-500 uppercase">
                  Field Exploration OS
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-stone-800">
              <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Gemma 3:4b (Offline)
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold text-teal-300 bg-teal-950/40 border border-teal-800/40 px-2.5 py-1 rounded-full">
                <Code className="w-3 h-3" /> Hacktoberfest '26
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-stone-900/60 p-1.5 rounded-2xl border border-stone-800/80 backdrop-blur-xl">
            <button
              onClick={() => setActiveTab('station')}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                activeTab === 'station' ? "bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/20" : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"
              )}
            >
              <Activity className="w-4 h-4" /> Field Station
            </button>
            <button
              onClick={() => setActiveTab('guilds')}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                activeTab === 'guilds' ? "bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/20" : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"
              )}
            >
              <Target className="w-4 h-4" /> Quest Guilds
            </button>
            <button
              onClick={() => setActiveTab('codex')}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all relative",
                activeTab === 'codex' ? "bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/20" : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"
              )}
            >
              <BookOpen className="w-4 h-4" /> Field Codex
              {history.length > 0 && (
                <span className={clsx("px-1.5 py-0.2 rounded-full text-[10px] font-black", activeTab === 'codex' ? "bg-stone-950 text-emerald-400" : "bg-emerald-950 text-emerald-400 border border-emerald-800")}>
                  {history.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                activeTab === 'metrics' ? "bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/20" : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"
              )}
            >
              <Trophy className="w-4 h-4" /> Metrics & Badges
            </button>
            <button
              onClick={() => setActiveTab('hacktoberfest')}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                activeTab === 'hacktoberfest' ? "bg-teal-500 text-stone-950 shadow-lg shadow-teal-500/20" : "text-teal-400 hover:text-teal-300 hover:bg-teal-950/40"
              )}
            >
              <Flame className="w-4 h-4 text-amber-400" /> Touch Grass
            </button>
          </nav>

          {/* Right Action: Level Pill & Quick Scan CTA */}
          <div className="flex items-center gap-3">
            <div className="bg-stone-900/80 border border-stone-800 px-3.5 py-2 rounded-2xl flex items-center gap-3 shadow-inner">
              <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-xl border border-emerald-500/30">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white">Tier {level} Ranger</span>
                  <span className="text-[11px] font-bold text-emerald-400">{xp} XP</span>
                </div>
                <div className="w-24 h-1 bg-stone-800 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" 
                    style={{ width: `${(xpProgress / 200) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab('station');
                fileInputRef.current?.click();
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Scan Specimen</span>
            </button>
          </div>

        </div>

        {/* Mobile / Tablet Horizontal Scroll Tab Bar */}
        <div className="lg:hidden flex items-center gap-2 px-4 py-2.5 overflow-x-auto border-t border-stone-800/50 bg-[#050505]/95 scrollbar-hide">
          {[
            { id: 'station', label: 'Field Station', icon: Activity },
            { id: 'guilds', label: 'Quests', icon: Target },
            { id: 'codex', label: `Codex (${history.length})`, icon: BookOpen },
            { id: 'metrics', label: 'Metrics', icon: Trophy },
            { id: 'hacktoberfest', label: 'Touch Grass Hub', icon: Flame }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all",
                activeTab === tab.id ? "bg-emerald-500 text-stone-950" : "bg-stone-900 text-stone-400"
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN WEBSITE VIEWPORT */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ============================================================== */}
        {/* TAB 1: FIELD STATION & SPECIMEN LAB */}
        {/* ============================================================== */}
        {activeTab === 'station' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Hero Banner Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-emerald-950/70 via-stone-900/80 to-teal-950/50 border border-stone-800/80 p-8 shadow-2xl backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full"></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-900/40 border border-emerald-700/50 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 mb-3 shadow-inner">
                    <WifiOff className="w-3.5 h-3.5 text-emerald-400" />
                    Off-Grid Wilderness Mode Active
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Step Away from the Screen. <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Touch Grass.</span>
                  </h1>
                  <p className="text-stone-300 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
                    Point your camera at trees, pollinators, river stones, or wild flora. Local Gemma 3 vision verifies your outdoor findings in seconds with zero cloud dependency.
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('guilds')}
                    className="bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Target className="w-4 h-4 text-emerald-400" /> Browse Quests
                  </button>
                  <button
                    onClick={() => setActiveTab('hacktoberfest')}
                    className="bg-teal-950 hover:bg-teal-900 text-teal-200 border border-teal-800 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
                  >
                    <Info className="w-4 h-4 text-teal-400" /> Architecture
                  </button>
                </div>
              </div>
            </div>

            {/* Main 2-Column Desktop Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Active Field Mission & Explorer Protocol */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Active Mission Card */}
                <div className="bg-gradient-to-br from-stone-900/90 to-[#0a0a0a]/90 border border-stone-800 rounded-[2rem] p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-emerald-800/60 transition-all">
                  <div className="absolute top-0 right-0 p-6 opacity-5">
                    <Target className="w-48 h-48 text-emerald-400" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Active Field Mission
                      </span>
                      <span className="text-xs font-semibold text-stone-400 bg-stone-950 px-2.5 py-0.5 rounded-full border border-stone-800">
                        {activeChallenge.guild || 'Botanist'}
                      </span>
                    </div>

                    <span className="bg-emerald-500/20 text-emerald-300 text-xs font-black px-3 py-1 rounded-full border border-emerald-500/30 shadow-sm">
                      +{activeChallenge.reward} XP Bounty
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-3 relative z-10">
                    {activeChallenge.task}
                  </h3>

                  {activeChallenge.hint && (
                    <p className="text-xs text-stone-400 italic mb-6 relative z-10 bg-stone-950/60 p-3 rounded-xl border border-stone-800/80">
                      💡 Ranger Hint: {activeChallenge.hint}
                    </p>
                  )}

                  <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between relative z-10">
                    <button
                      onClick={() => setActiveTab('guilds')}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                    >
                      Change Mission <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowCustomModal(true)}
                      className="text-xs font-bold text-stone-400 hover:text-stone-200 transition-colors"
                    >
                      + Custom Quest
                    </button>
                  </div>
                </div>

                {/* Trail Guidelines & Local AI Guarantee */}
                <div className="bg-stone-900/60 border border-stone-800/80 rounded-[2rem] p-6 shadow-xl backdrop-blur-xl space-y-4">
                  <h4 className="text-sm font-black uppercase tracking-wider text-stone-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Field Naturalist Protocol
                  </h4>
                  <ul className="space-y-3 text-xs text-stone-400 font-medium leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Leave No Trace:</strong> Photograph specimens in their natural habitat without picking leaves or disturbing wildlife nests.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Optimal Vision Macro:</strong> Hold camera 6–12 inches from bark or leaf veins with natural sun exposure.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Zero Server Relay:</strong> Photos remain in browser RAM & device storage; no telemetry leaves the trail.</span>
                    </li>
                  </ul>
                </div>

                {/* Instant Desktop Test Specimens */}
                <div className="bg-stone-900/40 border border-stone-800/60 rounded-[2rem] p-6 shadow-xl backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-stone-300 flex items-center gap-2">
                      <Eye className="w-4 h-4 text-teal-400" /> Desktop Simulation Lab
                    </h4>
                    <span className="text-[10px] text-stone-500 font-bold uppercase">No Camera? Test Here</span>
                  </div>
                  <p className="text-xs text-stone-400 mb-4">
                    Testing on a desktop without an immediate outdoor photo? Click a botanical specimen to simulate an offline Gemma 3 inference:
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {SAMPLE_SPECIMENS.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => triggerSampleTest(s)}
                        className="bg-stone-950 hover:bg-stone-800 border border-stone-800 hover:border-emerald-600/50 p-3 rounded-xl text-left transition-all group flex flex-col justify-between cursor-pointer"
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="text-xs font-bold text-stone-200 group-hover:text-emerald-300">
                            {s.title}
                          </span>
                          {getCategoryIcon(s.category, "w-3.5 h-3.5 text-emerald-400")}
                        </div>
                        <span className="text-[10px] font-semibold text-stone-500">+{s.reward} XP Bounty</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Specimen Scanner Station (Proper Web Upload / Dropzone) */}
              <div className="lg:col-span-7">
                <div className="bg-gradient-to-br from-stone-900/80 to-[#0a0a0a]/90 border border-stone-800 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl relative">
                  
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Camera className="w-5 h-5 text-emerald-400" /> Specimen Analysis Terminal
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5">Upload high-res trail photo or capture directly with device lens</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input 
                        type="file" 
                        accept="image/*" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={(e) => handleFileSelect(e.target.files?.[0])}
                      />
                      <input 
                        type="file" 
                        accept="image/*" 
                        capture="environment" 
                        ref={cameraInputRef} 
                        className="hidden" 
                        onChange={(e) => handleFileSelect(e.target.files?.[0])}
                      />
                    </div>
                  </div>

                  {/* Dropzone & Preview Box */}
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleFileSelect(e.dataTransfer.files?.[0]);
                    }}
                    className={clsx(
                      "relative rounded-[2rem] border-2 border-dashed transition-all p-8 flex flex-col items-center justify-center text-center min-h-[340px]",
                      selectedFilePreview ? "border-emerald-500/50 bg-stone-950/60" : "border-stone-700/80 bg-stone-950/40 hover:border-emerald-500/50 hover:bg-stone-900/40"
                    )}
                  >
                    {selectedFilePreview ? (
                      <div className="w-full flex flex-col items-center gap-4">
                        <div className="relative group rounded-2xl overflow-hidden border border-stone-700 shadow-2xl max-h-[260px] max-w-sm">
                          <img 
                            src={selectedFilePreview} 
                            alt="Selected Specimen Preview" 
                            className="w-full h-full object-cover object-center max-h-[260px]"
                          />
                          <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="bg-stone-900 text-stone-200 text-xs font-bold px-3 py-1.5 rounded-xl border border-stone-700 hover:bg-stone-800"
                            >
                              Replace Image
                            </button>
                            <button
                              onClick={() => {
                                setSelectedFilePreview(null);
                                setSelectedFileRaw(null);
                              }}
                              className="bg-rose-950/80 text-rose-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-rose-800 hover:bg-rose-900"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                        <div className="text-xs text-stone-400">
                          File loaded: <span className="font-semibold text-stone-200">{selectedFileRaw?.name || 'Trail Photo'}</span> ({Math.round((selectedFileRaw?.size || 0) / 1024)} KB)
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="bg-stone-900/80 p-5 rounded-3xl border border-stone-800 text-emerald-400 shadow-inner">
                          <Upload className="w-10 h-10" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-stone-200">
                            Drag & Drop trail photo here, or browse files
                          </p>
                          <p className="text-xs text-stone-500 mt-1">
                            Supports JPG, PNG, WEBP from DSLR or mobile camera
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-stone-800 hover:bg-stone-700 text-stone-100 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border border-stone-600 transition-all cursor-pointer shadow-md"
                          >
                            <Upload className="w-4 h-4" /> Browse Local File
                          </button>
                          <button
                            onClick={() => cameraInputRef.current?.click()}
                            className="bg-emerald-950 hover:bg-emerald-900 text-emerald-300 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border border-emerald-800 transition-all cursor-pointer shadow-md"
                          >
                            <Camera className="w-4 h-4" /> Open Camera Lens
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Action Bar */}
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Cpu className="w-4 h-4 text-emerald-500" />
                      <span>Target Engine: <strong>Gemma 3:4b (Vision)</strong></span>
                    </div>

                    <button
                      onClick={triggerAnalyze}
                      disabled={isProcessing || !selectedFileRaw}
                      className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-black px-8 py-4 rounded-2xl flex items-center justify-center gap-3 text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Processing Locally...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>Run Offline Vision Scan</span>
                        </>
                      )}
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="mt-6 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs p-4 rounded-2xl shadow-xl flex items-start gap-3 animate-in fade-in">
                      <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Offline Inference Notice</p>
                        <p className="mt-0.5">{errorMsg}</p>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: QUEST GUILDS (CATEGORIZED MISSIONS HUB) */}
        {/* ============================================================== */}
        {activeTab === 'guilds' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div>
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <Target className="w-7 h-7 text-emerald-400" /> Outdoor Quest Guilds
                </h2>
                <p className="text-sm text-stone-400 mt-1">
                  Choose your outdoor expedition focus. Each guild trains distinct field observation abilities.
                </p>
              </div>

              <button
                onClick={() => setShowCustomModal(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black px-5 py-3 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 self-start md:self-auto shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                + Create Custom Trail Quest
              </button>
            </div>

            {/* Guild Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Botanist', 'Entomologist', 'Geologist', 'Ornithologist', 'Forager'].map(guild => (
                <button
                  key={guild}
                  onClick={() => setSelectedGuildFilter(guild)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all",
                    selectedGuildFilter === guild 
                      ? "bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20" 
                      : "bg-stone-900/80 text-stone-400 hover:text-stone-200 border border-stone-800"
                  )}
                >
                  {guild}
                </button>
              ))}
            </div>

            {/* Quests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuests.map(q => {
                const isActive = activeChallenge.id === q.id || activeChallenge.task === q.task;
                return (
                  <div 
                    key={q.id}
                    className={clsx(
                      "rounded-3xl p-6 border transition-all flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group",
                      isActive 
                        ? "bg-gradient-to-br from-emerald-950/60 to-stone-900/90 border-emerald-500 shadow-xl shadow-emerald-950/30" 
                        : "bg-stone-900/50 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/80"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          {q.guild}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-stone-400 bg-stone-950 px-2 py-0.5 rounded-md border border-stone-800">
                            {q.difficulty}
                          </span>
                          <span className="text-xs font-black text-emerald-300">+{q.reward} XP</span>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                        {q.task}
                      </h4>

                      <p className="text-xs text-stone-400 italic mb-6">
                        "{q.hint}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-800/60 flex items-center justify-between">
                      {isActive ? (
                        <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4" /> Active Challenge
                        </span>
                      ) : (
                        <button
                          onClick={() => handleActivateQuest(q)}
                          className="w-full py-2.5 bg-stone-800 hover:bg-emerald-600 hover:text-stone-950 text-stone-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          Activate This Quest <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: NATURE CODEX (SPECIMEN DISCOVERIES ARCHIVE) */}
        {/* ============================================================== */}
        {activeTab === 'codex' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div>
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <BookOpen className="w-7 h-7 text-emerald-400" /> Field Discovery Codex
                </h2>
                <p className="text-sm text-stone-400 mt-1">
                  Taxonomic catalog of all biological and geological specimens verified by offline Gemma 3.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3.5 py-1.5 rounded-xl">
                  {history.length} Logged Specimens
                </span>
                {history.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Clear discovery history?')) {
                        setHistory([]);
                        showToast('Codex Reset');
                      }
                    }}
                    className="text-xs text-stone-500 hover:text-rose-400 underline font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {['All', 'Tree', 'Flower', 'Insect', 'Bird', 'Rock'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCodexCategoryFilter(cat)}
                    className={clsx(
                      "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                      codexCategoryFilter === cat 
                        ? "bg-emerald-500 text-stone-950 shadow-md" 
                        : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search specimen or fact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Codex Cards Gallery */}
            {filteredCodex.length === 0 ? (
              <div className="rounded-[2.5rem] border border-dashed border-stone-800 p-16 text-center flex flex-col items-center justify-center">
                <Leaf className="w-16 h-16 text-stone-700 mb-4" />
                <h4 className="text-xl font-bold text-stone-300">No Specimens Matching Filters</h4>
                <p className="text-sm text-stone-500 max-w-md mt-1 mb-6">
                  Head outside on your local trail, photograph a specimen with the Field Station scanner, and log your findings.
                </p>
                <button
                  onClick={() => setActiveTab('station')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider"
                >
                  Return to Scanner
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCodex.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 shadow-xl backdrop-blur-xl hover:border-emerald-700/50 hover:bg-stone-900/90 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-stone-950 p-3 rounded-2xl border border-stone-800 text-emerald-400 group-hover:scale-105 transition-transform shadow-inner">
                            {getCategoryIcon(item.category, "w-6 h-6")}
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400/90">
                              {item.category}
                            </span>
                            <h4 className="text-lg font-bold text-white leading-tight mt-0.5">
                              {item.name}
                            </h4>
                          </div>
                        </div>

                        <span className="text-xs font-black text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-800/60 shrink-0">
                          +{item.earned} XP
                        </span>
                      </div>

                      <div className="bg-stone-950/50 rounded-2xl p-4 border border-stone-800/60 my-3">
                        <p className="text-xs text-stone-300 italic leading-relaxed">
                          "{item.fact}"
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500 font-semibold">
                      <span>Logged on {item.date}</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: METRICS & BADGES (EXPLORER METRICS) */}
        {/* ============================================================== */}
        {activeTab === 'metrics' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            <div className="pb-6 border-b border-stone-800">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                <Trophy className="w-7 h-7 text-amber-400" /> Explorer Progress & Badges
              </h2>
              <p className="text-sm text-stone-400 mt-1">
                Field metrics compiled locally. Celebrate your outdoor biodiversity milestones.
              </p>
            </div>

            {/* Bento Grid Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">Total Field XP</span>
                <span className="text-4xl font-black text-emerald-400 tracking-tight">{xp}</span>
                <span className="block text-[11px] text-stone-400 mt-2 font-medium">{xpNeeded} XP to Tier {level + 1}</span>
              </div>

              <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">Codex Discoveries</span>
                <span className="text-4xl font-black text-teal-300 tracking-tight">{history.length}</span>
                <span className="block text-[11px] text-stone-400 mt-2 font-medium">Logged specimens</span>
              </div>

              <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">Ranger Rank</span>
                <span className="text-4xl font-black text-amber-400 tracking-tight">Tier {level}</span>
                <span className="block text-[11px] text-stone-400 mt-2 font-medium">Field Naturalist</span>
              </div>

              <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest block mb-1">Offline Security</span>
                <span className="text-4xl font-black text-indigo-400 tracking-tight">100%</span>
                <span className="block text-[11px] text-stone-400 mt-2 font-medium">Zero Cloud Footprint</span>
              </div>
            </div>

            {/* Category Breakdown & Badges */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Category Breakdown */}
              <div className="lg:col-span-6 bg-stone-900/60 border border-stone-800 rounded-[2rem] p-7 backdrop-blur-xl shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" /> Specimen Taxonomy Breakdown
                </h3>

                <div className="space-y-5">
                  {['Tree', 'Flower', 'Insect', 'Bird', 'Rock'].map(cat => {
                    const count = history.filter(h => h.category?.toLowerCase() === cat.toLowerCase()).length;
                    const maxGoal = 8;
                    const pct = Math.min((count / maxGoal) * 100, 100);
                    return (
                      <div key={cat}>
                        <div className="flex justify-between text-xs font-bold text-stone-300 mb-2">
                          <span className="flex items-center gap-2">
                            {getCategoryIcon(cat, "w-4 h-4 text-emerald-400")} {cat} Guild
                          </span>
                          <span>{count} / {maxGoal} logged</span>
                        </div>
                        <div className="h-2.5 bg-stone-950 rounded-full overflow-hidden border border-stone-800/80">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="lg:col-span-6 bg-stone-900/60 border border-stone-800 rounded-[2rem] p-7 backdrop-blur-xl shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> Unlockable Field Badges
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'First Observation', desc: 'Identify 1 specimen', unlocked: history.length >= 1 },
                    { title: 'Leaf Whisperer', desc: 'Log 2 Tree/Flora items', unlocked: history.filter(h => ['tree','flower'].includes(h.category?.toLowerCase())).length >= 2 },
                    { title: 'Off-Grid Ranger', desc: 'Execute local inference', unlocked: true },
                    { title: 'Macro Explorer', desc: 'Log an Insect specimen', unlocked: history.some(h => h.category?.toLowerCase() === 'insect') },
                    { title: 'Trail Master', desc: 'Reach 200+ XP', unlocked: xp >= 200 },
                    { title: 'Touch Grass Certified', desc: 'Complete 3 Field Missions', unlocked: history.length >= 3 }
                  ].map((badge, idx) => (
                    <div 
                      key={idx}
                      className={clsx(
                        "p-4 rounded-2xl border flex flex-col justify-between transition-all",
                        badge.unlocked 
                          ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300" 
                          : "bg-stone-950/40 border-stone-800/80 text-stone-600 opacity-60"
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold">{badge.title}</span>
                          {badge.unlocked && <Check className="w-4 h-4 text-emerald-400" />}
                        </div>
                        <p className="text-[11px] text-stone-400">{badge.desc}</p>
                      </div>
                      <span className={clsx("text-[10px] font-black uppercase tracking-wider mt-3", badge.unlocked ? "text-emerald-400" : "text-stone-600")}>
                        {badge.unlocked ? 'Unlocked' : 'Locked'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: HACKTOBERFEST 2026: TOUCH GRASS & OPEN-SOURCE AI HUB */}
        {/* ============================================================== */}
        {activeTab === 'hacktoberfest' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            
            {/* Hackathon Hero Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal-950 via-stone-900 to-[#0a0a0a] border border-teal-700/50 p-8 sm:p-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="inline-flex items-center gap-2 bg-teal-950 border border-teal-600/60 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-teal-300 mb-4 shadow-inner">
                <Code className="w-4 h-4 text-teal-400" />
                Hacktoberfest 2026 DEV Challenge
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                This Week's Theme: <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-lime-300 bg-clip-text text-transparent">Touch Grass</span>
              </h2>

              <p className="text-stone-300 text-base sm:text-lg max-w-3xl leading-relaxed mb-6 font-medium">
                Build something with open-weight models or open-source AI that gets people off the screen and into the world. 
                <span className="block mt-2 text-teal-200/90 font-semibold italic">
                  "The best builds here should make the screen the shortest part of the experience."
                </span>
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={copyDevPostDraft}
                  className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  {copiedDevDraft ? 'Copied to Clipboard!' : 'Copy DEV.to Submission Template'}
                </button>
                <a
                  href="https://dev.to"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 px-6 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> View DEV Challenge Rules
                </a>
              </div>
            </div>

            {/* Why Open Innovation Matters Grid */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-teal-400" /> Why Open Innovation Matters for NatureQuest
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-7 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="bg-stone-950 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-400 border border-stone-800 mb-4 shadow-inner">
                      <WifiOff className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Runs Completely Offline</h4>
                    <p className="text-xs text-stone-400 leading-relaxed font-medium">
                      Cloud-based vision models instantly fail on remote backcountry trails where LTE/5G is nonexistent. By packing open-weight <strong>Gemma 3</strong> via <strong>Ollama</strong>, NatureQuest works on alpine summits and deep valleys without a single cellular packet.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-800/80 text-[11px] font-bold text-emerald-400">
                    ✓ Verified Offline Engine
                  </div>
                </div>

                <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-7 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="bg-stone-950 w-12 h-12 rounded-2xl flex items-center justify-center text-teal-400 border border-stone-800 mb-4 shadow-inner">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Absolute Data Sovereignty</h4>
                    <p className="text-xs text-stone-400 leading-relaxed font-medium">
                      High-resolution biodiversity photos frequently contain sensitive GPS metadata or private property details. With an open architecture, your photos and coordinates are never uploaded to commercial advertising servers or closed corporate silos.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-800/80 text-[11px] font-bold text-teal-400">
                    ✓ Zero Remote Telemetry
                  </div>
                </div>

                <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-7 backdrop-blur-xl shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="bg-stone-950 w-12 h-12 rounded-2xl flex items-center justify-center text-amber-400 border border-stone-800 mb-4 shadow-inner">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Zero Inference Cost</h4>
                    <p className="text-xs text-stone-400 leading-relaxed font-medium">
                      Closed proprietary vision APIs charge per-image tokens that turn outdoor education into an ongoing utility bill. Open weights democratize wildlife education for students, park rangers, and hikers forever at $0 marginal cost.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-stone-800/80 text-[11px] font-bold text-amber-400">
                    ✓ 100% Free & Swappable Weights
                  </div>
                </div>

              </div>
            </div>

            {/* Architectural Flow Diagram Card */}
            <div className="bg-stone-900/60 border border-stone-800 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" /> Offline Edge Architecture
              </h3>
              <p className="text-xs text-stone-400 mb-8">
                How NatureQuest processes high-resolution specimen photos on consumer hardware without the cloud:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                {[
                  { step: '01', title: 'Sensor Ingestion', tech: 'Browser Camera / File API', desc: 'Direct raw photo capture on trail without network calls' },
                  { step: '02', title: 'Localhost Bridge', tech: 'Vite Reverse Proxy', desc: 'Routes /api/ollama strictly to 127.0.0.1:11434 on laptop' },
                  { step: '03', title: 'Neural Vision Pass', tech: 'Ollama Gemma 3:4b', desc: 'Open-weight multimodal vision extracts botanical morphology' },
                  { step: '04', title: 'Localhost Codex', tech: 'Structured JSON & WebStorage', desc: 'XP calculation, quest progression, encrypted client log' }
                ].map((node, i) => (
                  <div key={i} className="bg-stone-950 p-5 rounded-2xl border border-stone-800 relative">
                    <span className="text-2xl font-black text-stone-700 block mb-2">{node.step}</span>
                    <h5 className="text-sm font-bold text-white mb-1">{node.title}</h5>
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block mb-2">{node.tech}</span>
                    <p className="text-xs text-stone-400 leading-relaxed">{node.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-stone-800/80 bg-[#050505]/90 py-8 px-4 sm:px-6 lg:px-8 mt-12 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-stone-300">NatureQuest</span>
            <span>— Built for Hacktoberfest 2026: Touch Grass</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Powered by <strong>Gemma 3</strong></span>
            <span>•</span>
            <span>Hosted via <strong>Ollama</strong></span>
            <span>•</span>
            <span>100% Offline</span>
          </div>
        </div>
      </footer>

      {/* ============================================================== */}
      {/* PROCESSING OVERLAY (FULL SCREEN WITH TIME DELAY STEPS) */}
      {/* ============================================================== */}
      <div className={clsx(
        "fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 transition-all duration-700",
        isProcessing ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <div className="w-32 h-32 border-4 border-stone-900 rounded-full animate-[spin_4s_linear_infinite]"></div>
          <div className="w-32 h-32 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin absolute inset-0 shadow-[0_0_40px_rgba(16,185,129,0.4)]"></div>
          <Leaf className="w-12 h-12 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
        </div>
        
        <div className="mt-10 h-12 overflow-hidden relative w-full max-w-lg text-center">
          {processSteps.map((step, idx) => (
            <div 
              key={idx}
              className={clsx(
                "absolute inset-0 flex items-center justify-center text-sm sm:text-base font-bold tracking-wide transition-all duration-500",
                idx === processingStep ? "opacity-100 translate-y-0 text-emerald-300" : 
                idx < processingStep ? "opacity-0 -translate-y-full text-stone-700" : "opacity-0 translate-y-full text-stone-700"
              )}
            >
              {step}
            </div>
          ))}
        </div>
        
        <div className="mt-8 w-72 sm:w-96 h-2 bg-stone-900 rounded-full overflow-hidden border border-stone-800 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-lime-400 transition-all duration-[1100ms] ease-linear shadow-[0_0_15px_rgba(16,185,129,0.6)]"
            style={{ width: `${(processingStep / (processSteps.length - 1)) * 100}%` }}
          />
        </div>

        <p className="mt-4 text-xs font-semibold text-stone-500 uppercase tracking-widest">
          Step {processingStep + 1} of {processSteps.length} • Local Gemma 3
        </p>
      </div>

      {/* ============================================================== */}
      {/* CELEBRATION DISCOVERY POPUP MODAL */}
      {/* ============================================================== */}
      <div className={clsx(
        "fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 transition-all duration-700",
        showResultPopup ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {currentResult && (
          <div className={clsx(
            "bg-gradient-to-b from-stone-900 to-[#0a0a0a] border border-stone-700 w-full max-w-lg rounded-[2.5rem] p-8 sm:p-10 shadow-[0_0_90px_rgba(0,0,0,0.95)] transition-all duration-700 ease-out transform backdrop-blur-3xl relative overflow-hidden",
            showResultPopup ? "scale-100 translate-y-0 opacity-100" : "scale-90 translate-y-16 opacity-0"
          )}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full"></div>
            
            <div className="flex justify-center -mt-16 mb-6 relative z-10">
              <div className="bg-stone-950 p-3 rounded-[2rem] shadow-2xl border border-stone-800">
                <div className="bg-emerald-500/20 p-5 rounded-[1.5rem] text-emerald-400 shadow-[inset_0_0_20px_rgba(16,185,129,0.3)]">
                  {getCategoryIcon(currentResult.category, "w-10 h-10")}
                </div>
              </div>
            </div>
            
            <div className="text-center mb-6 relative z-10">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                {currentResult.category} Specimen Identified
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-4 mb-2 tracking-tight">
                {currentResult.name}
              </h3>
              <p className="text-sm text-stone-300 italic leading-relaxed font-medium bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80 my-3">
                "{currentResult.fact}"
              </p>
            </div>

            {currentResult.challengeMet ? (
              <div className="bg-gradient-to-r from-emerald-950/70 to-teal-950/70 border border-emerald-500/50 rounded-2xl p-4 mb-6 flex items-center gap-4 relative overflow-hidden shadow-lg">
                <div className="bg-emerald-500 text-stone-950 rounded-full p-2 shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-0.5">
                    Field Mission Complete!
                  </p>
                  <p className="text-sm font-bold text-white">
                    +{currentResult.earned} XP Bounty Awarded
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-inner">
                <span className="text-sm font-semibold text-stone-300">Biodiversity Catalog Bonus</span>
                <span className="text-sm font-black text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                  +{currentResult.earned} XP
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10">
              <button 
                onClick={() => {
                  setShowResultPopup(false);
                  setActiveTab('codex');
                }}
                className="w-full sm:w-1/2 py-4 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-2xl transition-all text-sm"
              >
                View in Codex
              </button>
              <button 
                onClick={() => setShowResultPopup(false)}
                className="w-full sm:w-1/2 py-4 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black rounded-2xl transition-all shadow-lg shadow-emerald-600/30 text-sm uppercase tracking-wider"
              >
                Next Trail Quest
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* CUSTOM QUEST CREATOR MODAL */}
      {/* ============================================================== */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-[#050505]/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-1">Create Custom Trail Mission</h3>
            <p className="text-xs text-stone-400 mb-6">Define a unique challenge for your local ecosystem</p>

            <form onSubmit={handleCreateCustomQuest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                  Mission Task Description
                </label>
                <input 
                  type="text"
                  placeholder="e.g., Locate pine cone with open scales"
                  value={customTask}
                  onChange={(e) => setCustomTask(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-sm text-stone-200 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    Guild Discipline
                  </label>
                  <select 
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Botanist">Botanist (Flora)</option>
                    <option value="Entomologist">Entomologist (Insects)</option>
                    <option value="Geologist">Geologist (Rocks)</option>
                    <option value="Ornithologist">Ornithologist (Birds)</option>
                    <option value="Forager">Forager (Fungi/Moss)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider mb-1.5">
                    XP Bounty
                  </label>
                  <input 
                    type="number"
                    min="20"
                    max="150"
                    value={customReward}
                    onChange={(e) => setCustomReward(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-sm text-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 text-xs font-bold text-stone-400 hover:text-stone-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20"
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