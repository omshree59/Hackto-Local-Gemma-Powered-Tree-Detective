import React, { useState, useEffect, useRef } from 'react';
import { Camera, Compass, Award, CheckCircle, RefreshCw, WifiOff, MapPin } from 'lucide-react';

export default function App() {
  const [xp, setXp] = useState(() => Number(localStorage.getItem('nq_xp')) || 0);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('nq_history') || '[]'));
  const [activeChallenge, setActiveChallenge] = useState(() => 
    JSON.parse(localStorage.getItem('nq_challenge') || '{"task": "Find any green leaf or tree bark to begin your journey.", "targetType": "Any", "reward": 50}')
  );
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('nq_xp', xp);
    localStorage.setItem('nq_history', JSON.stringify(history));
    localStorage.setItem('nq_challenge', JSON.stringify(activeChallenge));
  }, [xp, history, activeChallenge]);

  const handleImageCapture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setErrorMsg('');
    setIsProcessing(true);
    setCurrentResult(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1];
      await analyzeImageLocally(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImageLocally = async (base64Image) => {
    const prompt = `
You are an offline nature exploration game master. Analyze this nature photo.
Respond STRICTLY with a valid JSON object matching this schema:
{
  "name": "Common name of plant, tree, bug, or rock",
  "category": "Tree" | "Flower" | "Insect" | "Rock" | "Bird" | "Other",
  "fact": "A short, engaging 1-sentence ecological fact",
  "challengeMet": true,
  "nextChallenge": {
    "task": "A short, actionable outdoor quest to find next (e.g., 'Find a flower with 5 petals' or 'Spot rough dark tree bark')",
    "targetType": "Specimen category",
    "reward": 40
  }
}
Set "challengeMet" to true if the specimen matches or makes progress toward the active challenge: "${activeChallenge.task}".
Do not include markdown blocks or text outside the JSON.`;

    try {
      // Points to our Vite proxy -> http://127.0.0.1:11434/api/generate
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
        throw new Error('Ollama service unreachable. Ensure Ollama is running.');
      }
      
      const data = await response.json();
      const parsed = JSON.parse(data.response);
      setCurrentResult(parsed);

      const baseXP = 30;
      const bonusXP = parsed.challengeMet ? activeChallenge.reward : 0;
      const totalEarned = baseXP + bonusXP;

      setXp(prev => prev + totalEarned);
      setHistory(prev => [
        { 
          name: parsed.name, 
          category: parsed.category, 
          earned: totalEarned, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        },
        ...prev
      ]);

      if (parsed.nextChallenge?.task) {
        setActiveChallenge(parsed.nextChallenge);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error processing image locally.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-stone-900 text-stone-100 flex flex-col p-4 font-sans select-none">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-stone-800 pb-3 mb-4">
        <div>
          <h1 className="text-xl font-black text-emerald-400 flex items-center gap-1.5">
            <Compass className="w-5 h-5" /> NatureQuest
          </h1>
          <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
            <WifiOff className="w-3.5 h-3.5 text-emerald-500" /> Fully Offline Engine
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-700/50 px-3 py-1 rounded-full">
          <Award className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-bold text-emerald-200">{xp} XP</span>
        </div>
      </header>

      {/* Quest Card */}
      <section className="bg-stone-800/80 border border-stone-700 rounded-2xl p-4 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Current Quest
          </span>
          <span className="text-xs font-semibold text-emerald-300">+{activeChallenge.reward} XP</span>
        </div>
        <p className="text-sm text-stone-200 leading-snug">{activeChallenge.task}</p>
      </section>

      {/* Camera Trigger */}
      <section className="mb-4">
        <input 
          type="file" 
          accept="image/*" 
          capture="environment" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleImageCapture}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-800 disabled:text-stone-500 text-white font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-6 h-6 animate-spin text-emerald-300" />
              <span className="text-xs tracking-wide">Gemma is analyzing specimen...</span>
            </>
          ) : (
            <>
              <Camera className="w-6 h-6" />
              <span className="text-sm">Capture Specimen</span>
            </>
          )}
        </button>
        {errorMsg && <p className="text-xs text-rose-400 mt-2 text-center bg-rose-950/40 p-2 rounded-lg border border-rose-900">{errorMsg}</p>}
      </section>

      {/* Discovery Card */}
      {currentResult && (
        <section className="bg-stone-800 border border-emerald-700/60 rounded-2xl p-4 mb-4 shadow-md animate-in fade-in">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs text-emerald-400 font-semibold uppercase">{currentResult.category}</span>
              <h2 className="text-lg font-bold text-white leading-tight">{currentResult.name}</h2>
            </div>
            {currentResult.challengeMet && (
              <span className="flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Quest Complete
              </span>
            )}
          </div>
          <p className="text-xs text-stone-300 italic mb-1">"{currentResult.fact}"</p>
        </section>
      )}

      {/* Specimen Log */}
      <section className="flex-1 overflow-y-auto">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Logged Discoveries</h3>
        {history.length === 0 ? (
          <div className="text-xs text-stone-500 text-center py-8 border border-dashed border-stone-800 rounded-xl">
            No specimens discovered yet.<br />Step outside and photograph leaves, flowers, or rocks!
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((item, idx) => (
              <div key={idx} className="bg-stone-800/50 border border-stone-800 px-3 py-2 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <span className="font-medium text-stone-200">{item.name}</span>
                  <span className="text-stone-500 ml-1.5">({item.category})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-stone-500 text-[10px]">{item.time}</span>
                  <span className="text-emerald-400 font-bold">+{item.earned} XP</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}