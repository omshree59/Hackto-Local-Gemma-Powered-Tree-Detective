import React, { useState, useEffect, useRef } from 'react';
import Squares from './components/Squares';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import RightContextPanel from './components/RightContextPanel';
import FieldStationHero from './components/FieldStationHero';
import QuestsView from './components/QuestsView';
import CodexView from './components/CodexView';
import MetricsView from './components/MetricsView';
import OpenInnovationView from './components/OpenInnovationView';
import WhyNatureQuestView from './components/WhyNatureQuestView';
import CameraModal from './components/CameraModal';
import ScanProcessingModal from './components/ScanProcessingModal';
import FieldReportModal from './components/FieldReportModal';
import TouchGrassModal from './components/TouchGrassModal';
import ToastContainer from './components/ToastContainer';

import { 
  INITIAL_QUESTS, 
  INITIAL_DISCOVERIES, 
  SAMPLE_SPECIMENS,
  ACTIVITIES 
} from './data/datasets';

export default function App() {
  // Persistence state
  const [xp, setXp] = useState(() => Number(localStorage.getItem('nq_xp')) || 140);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('nq_history');
    return saved ? JSON.parse(saved) : INITIAL_DISCOVERIES;
  });
  const [quests, setQuests] = useState(() => {
    const saved = localStorage.getItem('nq_quests');
    return saved ? JSON.parse(saved) : INITIAL_QUESTS;
  });
  const [activeMission, setActiveMission] = useState(() => {
    const saved = localStorage.getItem('nq_challenge');
    return saved ? JSON.parse(saved) : INITIAL_QUESTS[2]; // Default: The Five-Petal Bloom
  });
  const [outdoorMinutes, setOutdoorMinutes] = useState(() => {
    return Number(localStorage.getItem('nq_outdoor_mins')) || 45;
  });
  const [completedMissionsCount, setCompletedMissionsCount] = useState(() => {
    return Number(localStorage.getItem('nq_completed_count')) || 3;
  });

  // Navigation & UI Layout state
  const [activeTab, setActiveTab] = useState('station');
  const [selectedActivity, setSelectedActivity] = useState('station');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Real Ollama Connectivity State
  const [ollamaStatus, setOllamaStatus] = useState({
    connected: false,
    modelReady: false,
    modelName: 'gemma3:4b',
    lastChecked: null
  });

  // Modals & Overlay state
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [scanProcessingOpen, setScanProcessingOpen] = useState(false);
  const [scanStageIndex, setScanStageIndex] = useState(0);
  const [fieldReportModalOpen, setFieldReportModalOpen] = useState(false);
  const [touchGrassModalOpen, setTouchGrassModalOpen] = useState(false);

  // Active Scan State
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);
  const [selectedFileRaw, setSelectedFileRaw] = useState(null);
  const [currentReport, setCurrentReport] = useState(null);
  const [isReportSaved, setIsReportSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Toasts queue
  const [toasts, setToasts] = useState([]);
  const [copiedDevDraft, setCopiedDevDraft] = useState(false);

  const fileInputHiddenRef = useRef(null);

  const level = Math.floor(xp / 200) + 1;

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('nq_xp', xp);
    localStorage.setItem('nq_history', JSON.stringify(history));
    localStorage.setItem('nq_quests', JSON.stringify(quests));
    localStorage.setItem('nq_challenge', JSON.stringify(activeMission));
    localStorage.setItem('nq_outdoor_mins', outdoorMinutes);
    localStorage.setItem('nq_completed_count', completedMissionsCount);
  }, [xp, history, quests, activeMission, outdoorMinutes, completedMissionsCount]);

  // Real Ollama Health Check Heartbeat
  useEffect(() => {
    const checkOllama = async () => {
      try {
        const res = await fetch('/api/ollama/api/tags');
        if (res.ok) {
          const data = await res.json();
          const hasGemma = data.models?.some(m => m.name.includes('gemma3') || m.name.includes('gemma'));
          setOllamaStatus({
            connected: true,
            modelReady: hasGemma || (data.models && data.models.length > 0),
            modelName: hasGemma ? 'gemma3:4b' : (data.models?.[0]?.name || 'gemma3:4b'),
            lastChecked: Date.now()
          });
        } else {
          setOllamaStatus(prev => ({ ...prev, connected: false, modelReady: false }));
        }
      } catch (err) {
        setOllamaStatus(prev => ({ ...prev, connected: false, modelReady: false }));
      }
    };

    checkOllama();
    const interval = setInterval(checkOllama, 30000);
    return () => clearInterval(interval);
  }, []);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleSelectFile = (file) => {
    if (!file) {
      setSelectedFilePreview(null);
      setSelectedFileRaw(null);
      return;
    }
    setErrorMsg('');
    setSelectedFileRaw(file);
    const reader = new FileReader();
    reader.onload = () => setSelectedFilePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = (dataUrl) => {
    setSelectedFilePreview(dataUrl);
    // Convert dataURL to mock file for pipeline
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `trail_capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
        setSelectedFileRaw(file);
        setCameraModalOpen(false);
        addToast('Optical snapshot ready for local analysis', 'success');
      });
  };

  const runAnalysisPipeline = async (base64Image, fallbackData = null) => {
    setIsProcessing(true);
    setScanProcessingOpen(true);
    setScanStageIndex(0);
    setErrorMsg('');
    setIsReportSaved(false);

    // Staged cinematic sequence: 01 to 06
    let stage = 0;
    const stageTimer = setInterval(() => {
      stage += 1;
      if (stage < 5) {
        setScanStageIndex(stage);
      }
    }, 600);

    const prompt = `
You are an offline wilderness nature exploration game master and field biologist. Analyze this nature photo.
Respond STRICTLY with a valid JSON object matching this schema:
{
  "identification": "Common and scientific name of plant, tree, bug, bird, or rock",
  "confidence": "MODERATE" | "HIGH",
  "category": "TREE" | "FLOWER" | "INSECT" | "ROCK" | "BIRD" | "OTHER",
  "visible_features": ["Feature 1", "Feature 2", "Feature 3"],
  "field_notes": "A short, engaging 1-2 sentence ecological or geological fact",
  "observation": "A specific sensory observation for the user to look closer at",
  "next_challenge": "A short, actionable outdoor quest to find next in this ecosystem",
  "safety_note": "A safety reminder for outdoor handling",
  "xp": 50
}
Active challenge context: "${activeMission?.task || activeMission?.objective || 'Find something in nature'}".
Do not output markdown blocks or conversational text outside the raw JSON object.`;

    try {
      let parsed = null;

      if (fallbackData) {
        // Desktop test sample simulation
        await new Promise(res => setTimeout(res, 2200));
        parsed = {
          identification: fallbackData.name,
          confidence: fallbackData.confidence || 'HIGH',
          category: fallbackData.category,
          visible_features: fallbackData.features || ['Characteristic morphology', 'Wild specimen structure'],
          field_notes: fallbackData.fact,
          observation: fallbackData.observation,
          next_challenge: fallbackData.nextChallenge,
          safety_note: fallbackData.safetyNote || 'Do not consume or handle wild species without field expertise.',
          xp: fallbackData.xp || 50
        };
      } else {
        // Genuine call to Ollama Gemma 3 instance
        const response = await fetch('/api/ollama/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: ollamaStatus.modelName || 'gemma3:4b',
            prompt: prompt,
            images: [base64Image],
            stream: false,
            format: 'json'
          })
        });

        if (!response.ok) {
          throw new Error('Local Ollama daemon unreachable. Ensure Ollama is running (`ollama run gemma3:4b`).');
        }

        const data = await response.json();
        parsed = JSON.parse(data.response);
      }

      clearInterval(stageTimer);
      setScanStageIndex(5); // Stage 06: Field Report Ready

      setTimeout(() => {
        setIsProcessing(false);
        setScanProcessingOpen(false);

        const earnedXp = parsed.xp || 50;
        const report = {
          id: Date.now(),
          name: parsed.identification || parsed.name || 'Wilderness Specimen',
          category: parsed.category || 'OTHER',
          confidence: parsed.confidence || 'VISUAL ESTIMATE (MODERATE)',
          features: parsed.visible_features || parsed.features || ['Distinctive leaf pattern', 'Healthy pigmentation'],
          fact: parsed.field_notes || parsed.fact || 'Ecological observations recorded locally.',
          observation: parsed.observation || 'Take a closer look at the leaf venation or surface texture.',
          nextChallenge: parsed.next_challenge || parsed.nextChallenge || 'Find another specimen with contrasting texture.',
          safetyNote: parsed.safety_note || parsed.safetyNote || 'Observe wildlife with respect; leave no trace.',
          earned: earnedXp,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setCurrentReport(report);
        setFieldReportModalOpen(true);
        addToast(`Gemma 3 Identification Complete: +${earnedXp} XP`, 'success');
      }, 700);

    } catch (err) {
      clearInterval(stageTimer);
      setIsProcessing(false);
      setScanProcessingOpen(false);
      setErrorMsg(err.message || 'Error processing local image with Gemma 3.');
      addToast('Local inference failed. Check Ollama daemon.', 'error');
    }
  };

  const handleTriggerAnalyze = () => {
    if (!selectedFileRaw) {
      setErrorMsg('Please select or capture a specimen photo first.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
      runAnalysisPipeline(base64Data, null);
    };
    reader.readAsDataURL(selectedFileRaw);
  };

  const handleTriggerSampleTest = (sample) => {
    setSelectedFilePreview(null);
    setSelectedFileRaw(null);
    runAnalysisPipeline(null, sample);
  };

  const handleSaveToCodex = () => {
    if (!currentReport || isReportSaved) return;

    setXp(prev => prev + currentReport.earned);
    setHistory(prev => [currentReport, ...prev]);
    setIsReportSaved(true);
    addToast(`"${currentReport.name}" saved to Field Codex! +${currentReport.earned} XP`, 'success');
  };

  const handleStartReportChallenge = () => {
    if (currentReport?.nextChallenge) {
      const nextMission = {
        id: `challenge-${Date.now()}`,
        task: currentReport.nextChallenge,
        title: 'Ecological Follow-Up Challenge',
        reward: 50,
        category: currentReport.category || 'NATURE',
        hint: currentReport.observation
      };
      setActiveMission(nextMission);
      setFieldReportModalOpen(false);
      setTouchGrassModalOpen(true);
      addToast('Field Challenge Activated in Touch Grass Mode', 'success');
    }
  };

  const handleCompleteActiveMission = (secondsElapsed = 1200) => {
    const mins = Math.max(1, Math.round(secondsElapsed / 60));
    setOutdoorMinutes(prev => prev + mins);
    setCompletedMissionsCount(prev => prev + 1);
    setXp(prev => prev + (activeMission.reward || 50));
    setTouchGrassModalOpen(false);
    addToast(`Mission Complete! +${activeMission.reward || 50} XP • +${mins} Outdoor Mins`, 'success');
  };

  const handleSelectSidebarActivity = (actId) => {
    setSelectedActivity(actId);
    setMobileMenuOpen(false);

    if (actId === 'station') {
      setActiveTab('station');
    } else if (actId === 'random') {
      setActiveTab('quests');
      addToast('Switched to Quest Center for Random Expedition', 'info');
    } else {
      // Find discipline and switch to relevant mission or tab
      const activity = ACTIVITIES.find(a => a.id === actId);
      if (activity) {
        setActiveMission({
          id: `act-${actId}`,
          title: activity.title,
          task: `Focus your field session on ${activity.discipline}: ${activity.desc}`,
          reward: parseInt(activity.reward) || 50,
          category: activity.discipline.toUpperCase(),
          hint: 'Observe with all five senses.'
        });
        setActiveTab('station');
        addToast(`Module Activated: ${activity.title} (${activity.discipline})`, 'info');
      }
    }
  };

  const copyDevPost = () => {
    const draftText = `---
title: NatureQuest: Touching Grass with Offline Gemma 3 on the Trail
published: true
tags: hacktoberfest, devchallenge, ai, opensource
cover_image: https://raw.githubusercontent.com/dev2/hero.png
---

## 🌲 The Philosophy: Touch Grass
In an era where technology commands continuous screen time, **NatureQuest** flips the script: **The screen is the shortest part of the experience.**

Built for the **DEV Challenge: Touch Grass** during **Hacktoberfest 2026**.

## ⚡ Why Open Innovation Matters
- **100% Trail-Ready (Zero Signal):** Deep in old-growth forests, cellular networks don't exist. NatureQuest runs **Gemma 3 (4B)** directly on device via **Ollama**.
- **Absolute Privacy:** Your geo-coordinates and high-resolution trail photographs never leave your laptop.
- **Zero API Ingestion Costs:** Run unlimited taxonomic vision passes without a corporate credit card.

Built with React, Tailwind CSS, Ollama, and Gemma 3.
`;
    navigator.clipboard.writeText(draftText);
    setCopiedDevDraft(true);
    setTimeout(() => setCopiedDevDraft(false), 3000);
    addToast('Dev.to Markdown Article Copied to Clipboard!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#060806] text-stone-100 font-sans selection:bg-emerald-500/30 relative flex flex-col overflow-x-hidden">
      
      {/* ReactBits Squares Full-Canvas Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
        <Squares 
          direction="diagonal"
          speed={0.2}
          squareSize={44}
          borderColor="#065f46" 
          hoverFillColor="#047857"
        />
      </div>

      {/* Ambient Radial Glowing Wilderness Cones */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[20%] w-[700px] h-[700px] bg-emerald-950/25 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[700px] h-[700px] bg-teal-950/20 rounded-full blur-[180px]" />
      </div>

      {/* Top Refined Status Bar */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'touch-grass') {
            setTouchGrassModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        xp={xp}
        level={level}
        ollamaStatus={ollamaStatus}
        onOpenScanner={() => setCameraModalOpen(true)}
        onOpenMobileMenu={() => setMobileMenuOpen(prev => !prev)}
        mobileMenuOpen={mobileMenuOpen}
      />

      {/* Application Shell: Sidebar + Main Content + Context Panel */}
      <div className="relative z-10 flex flex-1 w-full max-w-[1600px] mx-auto">
        
        {/* Left Sidebar (Activities Navigation) */}
        <Sidebar
          selectedActivity={selectedActivity}
          onSelectActivity={handleSelectSidebarActivity}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
        />

        {/* Mobile Slide-out Drawer for Activities */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-[#040604]/90 backdrop-blur-2xl flex flex-col p-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
              <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                EXPEDITION ACTIVITIES
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2">
              {ACTIVITIES.map(a => (
                <button
                  key={a.id}
                  onClick={() => handleSelectSidebarActivity(a.id)}
                  className="w-full text-left p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800 flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-xs font-bold text-white uppercase">{a.title}</h5>
                    <p className="text-[11px] text-stone-400">{a.desc}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">{a.reward}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {activeTab === 'station' && (
            <FieldStationHero
              activeMission={activeMission}
              onOpenScanner={() => setCameraModalOpen(true)}
              onOpenQuests={() => setActiveTab('quests')}
              onStartTouchGrass={() => setTouchGrassModalOpen(true)}
              onChangeMission={() => setActiveTab('quests')}
              onCompleteActiveMission={() => handleCompleteActiveMission(1200)}
              selectedFilePreview={selectedFilePreview}
              selectedFileRaw={selectedFileRaw}
              onSelectFile={handleSelectFile}
              onTriggerAnalyze={handleTriggerAnalyze}
              onTriggerSampleTest={handleTriggerSampleTest}
              isProcessing={isProcessing}
              errorMsg={errorMsg}
            />
          )}

          {activeTab === 'quests' && (
            <QuestsView
              activeMission={activeMission}
              onSetActiveMission={(quest) => {
                setActiveMission(quest);
                setActiveTab('station');
                addToast(`Active Mission: ${quest.task || quest.title}`, 'info');
              }}
              onStartTouchGrass={() => setTouchGrassModalOpen(true)}
              quests={quests}
              onCreateCustomQuest={(newQ) => {
                setQuests(prev => [newQ, ...prev]);
                setActiveMission(newQ);
                setActiveTab('station');
                addToast('Custom Quest Activated!', 'success');
              }}
            />
          )}

          {activeTab === 'codex' && (
            <CodexView
              history={history}
              onOpenScanner={() => {
                setActiveTab('station');
                setCameraModalOpen(true);
              }}
              onClearHistory={() => {
                setHistory([]);
                addToast('Field Codex Reset', 'info');
              }}
            />
          )}

          {activeTab === 'metrics' && (
            <MetricsView
              history={history}
              xp={xp}
              level={level}
              outdoorMinutes={outdoorMinutes}
              completedMissionsCount={completedMissionsCount}
              streak={3}
              longestStreak={5}
            />
          )}

          {activeTab === 'open-innovation' && (
            <OpenInnovationView
              onCopyDevPost={copyDevPost}
              copiedDevDraft={copiedDevDraft}
            />
          )}

          {activeTab === 'why' && (
            <WhyNatureQuestView
              onStartExploring={() => {
                setActiveTab('station');
                setTouchGrassModalOpen(true);
              }}
            />
          )}

        </main>

        {/* Right Context Panel (Desktop Only) */}
        <RightContextPanel
          activeMission={activeMission}
          onStartTouchGrass={() => setTouchGrassModalOpen(true)}
          recentDiscoveries={history}
          onViewCodex={() => setActiveTab('codex')}
          ollamaStatus={ollamaStatus}
        />

      </div>

      {/* Hidden File Input for fallback uploads */}
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputHiddenRef} 
        className="hidden" 
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleSelectFile(file);
        }}
      />

      {/* Camera Capture Modal */}
      {cameraModalOpen && (
        <CameraModal
          onCapture={handleCameraCapture}
          onClose={() => setCameraModalOpen(false)}
          onFallbackUpload={() => {
            setCameraModalOpen(false);
            fileInputHiddenRef.current?.click();
          }}
        />
      )}

      {/* Scientific Scan Processing Sequence (2-4s) */}
      {scanProcessingOpen && (
        <ScanProcessingModal
          currentStageIndex={scanStageIndex}
          imagePreviewUrl={selectedFilePreview}
          modelName={ollamaStatus.modelName}
        />
      )}

      {/* Detailed Field Identification Report Modal */}
      {fieldReportModalOpen && (
        <FieldReportModal
          report={currentReport}
          imagePreviewUrl={selectedFilePreview}
          onStartChallenge={handleStartReportChallenge}
          onSaveCodex={handleSaveToCodex}
          onScanAnother={() => {
            setFieldReportModalOpen(false);
            setSelectedFilePreview(null);
            setSelectedFileRaw(null);
            setCameraModalOpen(true);
          }}
          isSaved={isReportSaved}
        />
      )}

      {/* Full-Screen Touch Grass Mode */}
      {touchGrassModalOpen && (
        <TouchGrassModal
          mission={activeMission}
          onComplete={handleCompleteActiveMission}
          onClose={() => setTouchGrassModalOpen(false)}
        />
      )}

      {/* Toast Notification Queue */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
      />

    </div>
  );
}