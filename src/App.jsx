import { useState, useEffect, useRef } from 'react';
import NatureBackground from './components/NatureBackground';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import RightContextPanel from './components/RightContextPanel';

import FieldStationView from './components/FieldStationView';
import PlantScoutView from './components/PlantScoutView';
import QuestsView from './components/QuestsView';
import TrailsView from './components/TrailsView';
import CodexView from './components/CodexView';
import AchievementsView from './components/AchievementsView';
import MyProgressView from './components/MyProgressView';
import NatureGuideView from './components/NatureGuideView';
import FieldStoriesView from './components/FieldStoriesView';
import LocalAiView from './components/LocalAiView';
import SettingsView from './components/SettingsView';
import MyPlantsView from './components/MyPlantsView';

import CameraModal from './components/CameraModal';
import ScanProcessingModal from './components/ScanProcessingModal';
import FieldReportModal from './components/FieldReportModal';
import MissionActiveModal from './components/MissionActiveModal';
import SoundscapeModal from './components/SoundscapeModal';
import CertificateModal from './components/CertificateModal';
import HacktoberfestModal from './components/HacktoberfestModal';
import ToastContainer from './components/ToastContainer';

import { 
  INITIAL_QUESTS, 
  CURATED_TRAILS 
} from './data/natureData';
import { cleanAiText } from './utils/textCleaner';
import { validateUploadedImage, createRateLimiter } from './utils/security';

export default function App() {
  // One-time auto-reset stale cached demo data from older iterations to true 0 defaults
  if (typeof window !== 'undefined') {
    const cleanVer = localStorage.getItem('nq_clean_defaults_v4');
    if (!cleanVer) {
      localStorage.removeItem('nq_xp');
      localStorage.removeItem('nq_history');
      localStorage.removeItem('nq_quests');
      localStorage.removeItem('nq_trails');
      localStorage.removeItem('nq_challenge');
      localStorage.removeItem('nq_outdoor_mins');
      localStorage.removeItem('nq_completed_count');
      localStorage.removeItem('nq_active_days');
      localStorage.setItem('nq_clean_defaults_v4', 'true');
    }
  }

  // Persistent data state via localStorage starting with authentic 0 defaults
  const [xp, setXp] = useState(() => {
    const val = localStorage.getItem('nq_xp');
    return val !== null ? Number(val) : 0;
  });
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('nq_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [quests, setQuests] = useState(() => {
    const saved = localStorage.getItem('nq_quests');
    return saved ? JSON.parse(saved) : INITIAL_QUESTS;
  });
  const [trails, setTrails] = useState(() => {
    const saved = localStorage.getItem('nq_trails');
    return saved ? JSON.parse(saved) : CURATED_TRAILS;
  });
  const [activeMission, setActiveMission] = useState(() => {
    const saved = localStorage.getItem('nq_challenge');
    return saved ? JSON.parse(saved) : INITIAL_QUESTS[0];
  });
  const [outdoorMinutes, setOutdoorMinutes] = useState(() => {
    const val = localStorage.getItem('nq_outdoor_mins');
    return val !== null ? Number(val) : 0;
  });
  const [completedMissionsCount, setCompletedMissionsCount] = useState(() => {
    const val = localStorage.getItem('nq_completed_count');
    return val !== null ? Number(val) : 0;
  });

  // Dynamic Day Streak tracking based on authentic active participation
  const [activeDays, setActiveDays] = useState(() => {
    try {
      const saved = localStorage.getItem('nq_active_days');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const recordActiveParticipation = () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    setActiveDays(prev => {
      if (prev.includes(todayStr)) return prev;
      const updated = [...prev, todayStr];
      try {
        localStorage.setItem('nq_active_days', JSON.stringify(updated));
      } catch (e) {
        console.warn('Storage error:', e);
      }
      return updated;
    });
  };

  const calculateStreak = (daysList) => {
    if (!daysList || daysList.length === 0) return 0;
    const daysSet = new Set(daysList);
    let count = 0;
    const curr = new Date();
    const todayStr = curr.toISOString().slice(0, 10);
    
    // If today is not active yet, check from yesterday to maintain ongoing streak
    if (!daysSet.has(todayStr)) {
      curr.setDate(curr.getDate() - 1);
    }
    
    while (true) {
      const dStr = curr.toISOString().slice(0, 10);
      if (daysSet.has(dStr)) {
        count += 1;
        curr.setDate(curr.getDate() - 1);
      } else {
        break;
      }
    }
    return count;
  };

  const streak = calculateStreak(activeDays);

  // UI Navigation state with URL hash support
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== 'undefined') {
      const h = window.location.hash.replace('#', '');
      if (h) return h;
    }
    return 'station';
  });

  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.replace('#', '');
      if (h) setActivePage(h);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Real Local Ollama Daemon State
  const [ollamaStatus, setOllamaStatus] = useState({
    connected: false,
    modelReady: false,
    modelName: 'gemma3:4b',
    lastChecked: null
  });

  // Modals state
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [scanProcessingOpen, setScanProcessingOpen] = useState(false);
  const [scanStageIndex, setScanStageIndex] = useState(0);
  const [fieldReportModalOpen, setFieldReportModalOpen] = useState(false);
  const [missionActiveModalOpen, setMissionActiveModalOpen] = useState(false);
  const [soundscapeModalOpen, setSoundscapeModalOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [hacktoberfestModalOpen, setHacktoberfestModalOpen] = useState(false);

  // Active Scan data state
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);
  const [selectedFileRaw, setSelectedFileRaw] = useState(null);
  const [currentReport, setCurrentReport] = useState(null);
  const [isReportSaved, setIsReportSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Toast Queue & Security Rate Limiter
  const [toasts, setToasts] = useState([]);
  const hiddenFileInputRef = useRef(null);
  const inferenceLimiterRef = useRef(createRateLimiter(2, 5000));

  const level = Math.floor(xp / 200) + 1;

  // Persist storage
  useEffect(() => {
    localStorage.setItem('nq_xp', xp);
    localStorage.setItem('nq_history', JSON.stringify(history));
    localStorage.setItem('nq_quests', JSON.stringify(quests));
    localStorage.setItem('nq_trails', JSON.stringify(trails));
    localStorage.setItem('nq_challenge', JSON.stringify(activeMission));
    localStorage.setItem('nq_outdoor_mins', outdoorMinutes);
    localStorage.setItem('nq_completed_count', completedMissionsCount);
    localStorage.setItem('nq_active_days', JSON.stringify(activeDays));
  }, [xp, history, quests, trails, activeMission, outdoorMinutes, completedMissionsCount, activeDays]);

  // Real Ollama Health Check
  const checkOllamaHealth = async () => {
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
    } catch {
      setOllamaStatus(prev => ({ ...prev, connected: false, modelReady: false }));
    }
  };

  useEffect(() => {
    const initialTimer = setTimeout(checkOllamaHealth, 0);
    const timer = setInterval(checkOllamaHealth, 4000);
    const handleFocus = () => checkOllamaHealth();
    window.addEventListener('focus', handleFocus);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(timer);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const handleSelectFile = async (file) => {
    if (!file) {
      setSelectedFilePreview(null);
      setSelectedFileRaw(null);
      return;
    }

    // Security validation (MIME, Magic Bytes, Size, Traversal check)
    const validation = await validateUploadedImage(file);
    if (!validation.valid) {
      addToast(validation.error || 'Invalid or untrusted file.', 'error');
      setErrorMsg(validation.error || 'File validation failed.');
      return;
    }

    // Guarantee camera is closed and never turns on when uploading from local device
    setCameraModalOpen(false);
    setErrorMsg('');
    setSelectedFileRaw(file);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFilePreview(reader.result);
      setActivePage('plant-scout');
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = (dataUrl) => {
    setSelectedFilePreview(dataUrl);
    fetch(dataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `field_camera_${Date.now()}.jpg`, { type: 'image/jpeg' });
        setSelectedFileRaw(file);
        setCameraModalOpen(false);
        setActivePage('plant-scout');
        addToast('Plant photograph captured', 'success');
      });
  };

  // Inference execution pipeline
  const runAnalysis = async (base64Image, sampleOverride = null) => {
    setIsProcessing(true);
    setScanProcessingOpen(true);
    setScanStageIndex(0);
    setErrorMsg('');
    setIsReportSaved(false);

    // Staged progression: 01 to 06
    let stage = 0;
    const stageTimer = setInterval(() => {
      stage += 1;
      if (stage < 5) {
        setScanStageIndex(stage);
      }
    }, 600);

    const prompt = `
You are an offline field botanist. Analyze this plant photograph.
Write all text in natural, plain human conversational English without asterisks (no ** or *), without hashtags (no #), and without markdown symbols.
Respond STRICTLY with a valid JSON object matching this schema:
{
  "identification": "Likely common name and botanical name",
  "confidence": "Moderate" | "High",
  "category": "Tree" | "Flower" | "Plant",
  "visible_features": ["leaf structure detail", "arrangement detail", "bark or petal appearance"],
  "visual_evidence": ["Compound leaf structure", "Serrated leaflets"],
  "plant_condition": "Looks generally healthy (Visual estimate only)",
  "what_to_observe_next": ["Look at the leaf arrangement", "Compare the bark texture"],
  "field_notes": "Short concise educational explanation in plain text",
  "observation_challenge": "Actionable sensory prompt for another nearby plant in plain text",
  "safety_note": "Do not consume or handle unknown plant material",
  "xp": 50
}
Never claim absolute certainty. Do not use asterisks or hashtags in values. Do not output text outside the raw JSON object.`;

    try {
      let parsed = null;

      if (sampleOverride) {
        await new Promise(r => setTimeout(r, 2200));
        parsed = {
          identification: sampleOverride.name,
          confidence: sampleOverride.confidence || 'Moderate',
          category: sampleOverride.category || 'Plant',
          visible_features: sampleOverride.features || ['Distinctive leaf pattern', 'Healthy chlorophyll'],
          visual_evidence: ['Clear leaf shape visible', 'Distinct color pattern'],
          plant_condition: 'Looks generally healthy (Visual estimate only. This is not a scientific diagnosis.)',
          what_to_observe_next: ['Examine the stem texture', 'Look for nearby companions'],
          field_notes: sampleOverride.fieldNotes,
          observation_challenge: sampleOverride.observationChallenge,
          safety_note: sampleOverride.safetyNote || 'AI identification is an estimate. Do not consume wild plants.',
          xp: sampleOverride.xp || 50
        };
      } else {
        const response = await fetch('/api/ollama/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: ollamaStatus.modelName || 'gemma3:4b',
            prompt,
            images: [base64Image],
            stream: false,
            format: 'json'
          })
        });

        if (!response.ok) {
          throw new Error('Local Ollama daemon unreachable. Please start Ollama (`ollama run gemma3:4b`).');
        }

        const data = await response.json();
        parsed = JSON.parse(data.response);
      }

      clearInterval(stageTimer);
      setScanStageIndex(5); // Stage 06: Field Report Ready

      setTimeout(() => {
        setIsProcessing(false);
        setScanProcessingOpen(false);

        const earned = parsed.xp || 50;
        const report = {
          id: `plant-${Date.now()}`,
          name: cleanAiText(parsed.identification) || 'Wild Flora Specimen',
          category: cleanAiText(parsed.category) || 'Plant',
          confidence: cleanAiText(parsed.confidence) || 'Moderate',
          image: selectedFilePreview,
          features: cleanAiText(parsed.visible_features) || ['Characteristic morphology', 'Healthy wild foliage'],
          visualEvidence: cleanAiText(parsed.visual_evidence) || ['Clear leaf shape', 'Stem structure'],
          plantCondition: cleanAiText(parsed.plant_condition) || 'Condition unclear (Visual estimate only. This is not a scientific diagnosis.)',
          whatToObserveNext: cleanAiText(parsed.what_to_observe_next) || ['Look at the leaf arrangement', 'Find a similar plant'],
          fieldNotes: cleanAiText(parsed.field_notes) || 'Observed outdoors and verified via local Gemma 3 inference.',
          whereToLook: cleanAiText(parsed.where_to_look) || 'Native groundcover and park margins.',
          observationChallenge: cleanAiText(parsed.observation_challenge) || 'Find another nearby tree with a different leaf structure.',
          safetyNote: cleanAiText(parsed.safety_note) || 'AI identification is an estimate. Do not consume wild plants.',
          xp: earned,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setCurrentReport(report);
        setFieldReportModalOpen(true);
        addToast(`Plant Identified: +${earned} XP`, 'success');
      }, 700);

    } catch (err) {
      clearInterval(stageTimer);
      setIsProcessing(false);
      setScanProcessingOpen(false);
      setErrorMsg(err.message || 'Error executing local Gemma 3 inference.');
      addToast('Local AI unavailable. Verify Ollama is running.', 'error');
    }
  };

  const handleTriggerAnalyze = async () => {
    if (!selectedFileRaw) {
      setErrorMsg('Please select or capture a plant photograph first.');
      return;
    }

    // Rate Limiting Protection against rapid inference spamming / API flooding
    if (!inferenceLimiterRef.current()) {
      addToast('Inference rate limit reached. Please wait a few seconds before trying again.', 'error');
      setErrorMsg('Rate limit active. Please pause briefly before submitting another request.');
      return;
    }
    
    // Deep Security Validation (MIME, Magic Bytes, Size, Traversal check)
    const validation = await validateUploadedImage(selectedFileRaw);
    if (!validation.valid) {
      addToast(validation.error || 'Invalid or untrusted file.', 'error');
      setErrorMsg(validation.error || 'File validation failed.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
      runAnalysis(base64Data, null);
    };
    reader.readAsDataURL(selectedFileRaw);
  };

  const handleTriggerSampleTest = (sample) => {
    setSelectedFilePreview(null);
    setSelectedFileRaw(null);
    runAnalysis(null, sample);
  };

  const handleSaveToCodex = () => {
    if (!currentReport || isReportSaved) return;
    setXp(prev => prev + currentReport.xp);
    setHistory(prev => [currentReport, ...prev]);
    setIsReportSaved(true);
    recordActiveParticipation();
    addToast(`"${currentReport.name}" saved to Field Codex! +${currentReport.xp} XP`, 'success');
  };

  const handleStartReportChallenge = () => {
    if (currentReport?.observationChallenge) {
      const quest = {
        id: `challenge-${Date.now()}`,
        title: 'Botanical Observation Challenge',
        task: currentReport.observationChallenge,
        objective: currentReport.observationChallenge,
        reward: 50,
        category: 'OBSERVATION',
        duration: '20 min',
        difficulty: 'Easy'
      };
      setActiveMission(quest);
      setFieldReportModalOpen(false);
      setMissionActiveModalOpen(true);
      addToast('Outdoor Mission Started', 'success');
    }
  };

  const handleStartQuest = (quest) => {
    setActiveMission(quest);
    setMissionActiveModalOpen(true);
    addToast(`Quest Active: ${quest.title}`, 'info');
  };

  const handleCompleteMission = (seconds = 900, proofData = null) => {
    const mins = Math.max(1, Math.round(seconds / 60));
    setOutdoorMinutes(prev => prev + mins);
    setCompletedMissionsCount(prev => prev + 1);
    const rewardXp = activeMission?.reward || 40;
    setXp(prev => prev + rewardXp);
    recordActiveParticipation();

    if (activeMission?.id) {
      const updatedMission = {
        ...activeMission,
        completed: true,
        progress: '1 / 1 complete',
        proofImage: proofData?.image || null,
        verificationFeedback: proofData?.verification?.feedback || null,
        completedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      setActiveMission(updatedMission);
      setQuests(prev => prev.map(q => q.id === activeMission.id ? updatedMission : q));
    }

    setMissionActiveModalOpen(false);
    addToast(`Mission Verified & Completed! +${rewardXp} XP • +${mins} Outdoor Mins`, 'success');
  };

  const handleToggleSaveTrail = (trailId) => {
    setTrails(prev => prev.map(t => t.id === trailId ? { ...t, saved: !t.saved } : t));
    addToast('Trail saved to local list', 'info');
  };

  const handleToggleCompleteTrail = (trailId) => {
    setTrails(prev => prev.map(t => t.id === trailId ? { ...t, completed: !t.completed } : t));
    addToast('Trail completion status updated', 'success');
  };

  const handleExportBackup = () => {
    const backup = {
      xp,
      history,
      quests,
      trails,
      outdoorMinutes,
      completedMissionsCount,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", `naturequest_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
    addToast('Expedition data backup exported', 'success');
  };

  const handleResetProgress = () => {
    localStorage.clear();
    setXp(0);
    setHistory([]);
    setQuests(INITIAL_QUESTS);
    setTrails(CURATED_TRAILS);
    setActiveMission(INITIAL_QUESTS[0]);
    setOutdoorMinutes(0);
    setCompletedMissionsCount(0);
    setActiveDays([new Date().toISOString().slice(0, 10)]);
    addToast('All expedition data reset to default', 'info');
  };

  return (
    <div className="h-screen bg-[#06100b] text-[#f3f1e7] font-sans selection:bg-[#4f8a52]/40 relative flex flex-col overflow-hidden">
      
      {/* Dynamic Cinematic Nature Background (NO TECHNICAL GRID) */}
      <NatureBackground 
        activePage={activePage} 
        isScanning={isProcessing || scanProcessingOpen} 
      />

      {/* Top Header */}
      <TopNav
        activePage={activePage}
        onOpenMobileMenu={() => setMobileMenuOpen(prev => !prev)}
        mobileMenuOpen={mobileMenuOpen}
        xp={xp}
        level={level}
        streak={streak}
        ollamaStatus={ollamaStatus}
        onOpenScanner={() => setCameraModalOpen(true)}
        onNavigate={(page) => setActivePage(page)}
        onOpenSoundscape={() => setSoundscapeModalOpen(true)}
        onOpenHacktoberfest={() => setHacktoberfestModalOpen(true)}
        onOpenCertificate={() => setCertificateModalOpen(true)}
      />

      {/* Application Shell */}
      <div className="relative z-10 flex flex-1 w-full max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Left Sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={(page) => {
            setActivePage(page);
            setMobileMenuOpen(false);
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(prev => !prev)}
          ollamaStatus={ollamaStatus}
          xp={xp}
          level={level}
          historyCount={history.length}
          activeMission={activeMission}
          onStartQuest={handleStartQuest}
          onOpenScanner={() => setCameraModalOpen(true)}
        />

        {/* Mobile Slide-out Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-[#05130b]/96 backdrop-blur-2xl flex flex-col p-6 animate-in fade-in select-none">
            <div className="flex items-center justify-between pb-4 border-b border-[#1e3f2b] mb-4">
              <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                NATUREQUEST NAVIGATION
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#91b79a] hover:text-[#f3f1e7]"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2">
              {[
                { id: 'station', label: 'Field Station' },
                { id: 'plant-scout', label: 'Plant Scout' },
                { id: 'quests', label: 'Quests' },
                { id: 'trails', label: 'Trails' },
                { id: 'codex', label: 'Field Codex' },
                { id: 'achievements', label: 'Achievements' },
                { id: 'progress', label: 'My Progress' },
                { id: 'my-plants', label: 'My Plants' },
                { id: 'guide', label: 'Nature Guide' },
                { id: 'stories', label: 'Field Stories' },
                { id: 'local-ai', label: 'Local AI' },
                { id: 'settings', label: 'Settings' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-3.5 rounded-2xl bg-[#081a11]/80 border border-[#1e3f2b] font-bold text-sm text-[#f3f1e7]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {activePage === 'station' && (
            <FieldStationView
              activeMission={activeMission}
              onStartQuest={handleStartQuest}
              onOpenScanner={() => setCameraModalOpen(true)}
              onNavigate={(page) => setActivePage(page)}
              recentPlants={history}
              questsPreview={quests}
              trailsPreview={trails}
              onSelectFile={handleSelectFile}
              selectedFilePreview={selectedFilePreview}
              onTriggerAnalyze={handleTriggerAnalyze}
              onTriggerSampleTest={handleTriggerSampleTest}
              isProcessing={isProcessing}
              streak={streak}
              onRecordActivity={recordActiveParticipation}
            />
          )}

          {activePage === 'plant-scout' && (
            <PlantScoutView
              onOpenScanner={() => setCameraModalOpen(true)}
              selectedFilePreview={selectedFilePreview}
              selectedFileRaw={selectedFileRaw}
              onSelectFile={handleSelectFile}
              onTriggerAnalyze={handleTriggerAnalyze}
              onTriggerSampleTest={handleTriggerSampleTest}
              isProcessing={isProcessing}
              errorMsg={errorMsg}
            />
          )}

          {activePage === 'quests' && (
            <QuestsView
              activeMission={activeMission}
              onStartQuest={handleStartQuest}
              quests={quests}
              onCreateCustomQuest={(newQ) => {
                setQuests(prev => [newQ, ...prev]);
                setActiveMission(newQ);
                addToast('Custom Quest Created!', 'success');
              }}
              ollamaStatus={ollamaStatus}
            />
          )}

          {activePage === 'trails' && (
            <TrailsView
              trails={trails}
              onStartTrailMission={(trail) => {
                const quest = {
                  id: `trail-mission-${trail.id}`,
                  title: `${trail.name} Expedition`,
                  objective: `Walk the ${trail.name} route (${trail.distance}) and look for ${trail.bestFor}.`,
                  reward: 80,
                  category: 'WALK',
                  duration: trail.duration,
                  difficulty: trail.difficulty,
                  hint: trail.safetyNotes
                };
                setActiveMission(quest);
                setMissionActiveModalOpen(true);
              }}
              onToggleSaveTrail={handleToggleSaveTrail}
              onToggleCompleteTrail={handleToggleCompleteTrail}
              onAddCustomTrail={(newTrail) => {
                setTrails(prev => [newTrail, ...prev]);
                addToast('Custom Trail Saved to Local Guide!', 'success');
              }}
            />
          )}

          {activePage === 'codex' && (
            <CodexView
              history={history}
              onOpenScanner={() => {
                setActivePage('plant-scout');
                setCameraModalOpen(true);
              }}
              onClearHistory={() => {
                setHistory([]);
                addToast('Field Codex Reset', 'info');
              }}
              onStartChallengeFromCodex={(quest) => {
                setActiveMission(quest);
                setMissionActiveModalOpen(true);
              }}
            />
          )}

          {activePage === 'achievements' && (
            <AchievementsView
              history={history}
              xp={xp}
              level={level}
              completedMissionsCount={completedMissionsCount}
              streak={streak}
              outdoorMinutes={outdoorMinutes}
              onOpenScanner={() => setCameraModalOpen(true)}
              onOpenCertificate={() => setCertificateModalOpen(true)}
            />
          )}

          {activePage === 'progress' && (
            <MyProgressView
              history={history}
              xp={xp}
              level={level}
              outdoorMinutes={outdoorMinutes}
              completedMissionsCount={completedMissionsCount}
              streak={streak}
              longestStreak={Math.max(streak, 5)}
            />
          )}

          {activePage === 'my-plants' && (
            <MyPlantsView 
              history={history} 
              onNavigate={(p) => setActivePage(p)} 
              onUpdateHistory={setHistory} 
              onRecordActivity={recordActiveParticipation}
            />
          )}

          {activePage === 'guide' && (
            <NatureGuideView />
          )}

          {activePage === 'stories' && (
            <FieldStoriesView ollamaStatus={ollamaStatus} />
          )}

          {activePage === 'local-ai' && (
            <LocalAiView
              ollamaStatus={ollamaStatus}
              onRecheckOllama={checkOllamaHealth}
            />
          )}

          {activePage === 'settings' && (
            <SettingsView
              onClearCodex={() => {
                setHistory([]);
                addToast('Field Codex cleared', 'info');
              }}
              onResetProgress={handleResetProgress}
              onExportBackup={handleExportBackup}
            />
          )}

        </main>

        {/* Right Context Rail (Desktop Only) */}
        <RightContextPanel
          activeMission={activeMission}
          onStartQuest={handleStartQuest}
          recentPlants={history}
          onNavigate={(page) => setActivePage(page)}
          ollamaStatus={ollamaStatus}
        />

      </div>

      {/* Hidden file input */}
      <input 
        type="file" 
        accept="image/jpeg,image/png,image/webp" 
        ref={hiddenFileInputRef} 
        className="hidden" 
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleSelectFile(f);
          if (e.target) e.target.value = '';
        }}
      />

      {/* Field Camera Modal */}
      {cameraModalOpen && (
        <CameraModal
          onCapture={handleCameraCapture}
          onClose={() => setCameraModalOpen(false)}
          onFallbackUpload={() => {
            setCameraModalOpen(false);
            hiddenFileInputRef.current?.click();
          }}
        />
      )}

      {/* 6-Stage Progressive Scan Processing Modal */}
      {scanProcessingOpen && (
        <ScanProcessingModal
          currentStageIndex={scanStageIndex}
          imagePreviewUrl={selectedFilePreview}
        />
      )}

      {/* Field Identification Report Modal */}
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
          onBackToHome={() => {
            setFieldReportModalOpen(false);
            setSelectedFilePreview(null);
            setSelectedFileRaw(null);
            setActivePage('station');
          }}
          isSaved={isReportSaved}
          streak={streak}
          level={level}
          historyCount={history.length}
        />
      )}

      {/* Outdoor Mode / Mission Active Screen */}
      {missionActiveModalOpen && (
        <MissionActiveModal
          mission={activeMission}
          onComplete={handleCompleteMission}
          onClose={() => setMissionActiveModalOpen(false)}
          ollamaStatus={ollamaStatus}
        />
      )}

      {/* Procedural Web Audio Soundscape Synthesizer Modal */}
      {soundscapeModalOpen && (
        <SoundscapeModal
          onClose={() => setSoundscapeModalOpen(false)}
        />
      )}

      {/* Archival Naturalist Field Certificate Modal */}
      {certificateModalOpen && (
        <CertificateModal
          onClose={() => setCertificateModalOpen(false)}
          level={level}
          xp={xp}
          historyCount={history.length}
          streak={streak}
          outdoorMinutes={outdoorMinutes}
        />
      )}

      {/* Hacktoberfest 2026 Contributor Lab Modal */}
      {hacktoberfestModalOpen && (
        <HacktoberfestModal
          onClose={() => setHacktoberfestModalOpen(false)}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
      />

    </div>
  );
}