import React, { useState } from 'react';
import { 
  Cpu, Terminal, ShieldCheck, WifiOff, RefreshCw, 
  CheckCircle, AlertTriangle, ArrowRight
} from 'lucide-react';
import clsx from 'clsx';

export default function LocalAiView({ ollamaStatus, onRecheckOllama }) {
  const [isPinging, setIsPinging] = useState(false);
  const [pingResult, setPingResult] = useState(null);

  const testPing = async () => {
    setIsPinging(true);
    setPingResult(null);
    try {
      const res = await fetch('/api/ollama/api/tags');
      if (res.ok) {
        const data = await res.json();
        setPingResult({
          success: true,
          message: `Ollama response 200 OK. Found ${data.models?.length || 0} local model(s).`,
          models: data.models?.map(m => m.name) || []
        });
        onRecheckOllama();
      } else {
        setPingResult({
          success: false,
          message: `Ollama responded with status ${res.status}.`
        });
      }
    } catch (err) {
      setPingResult({
        success: false,
        message: 'Could not connect to local daemon at 127.0.0.1:11434.'
      });
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-4xl mx-auto pb-12 font-sans">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#1e3f2b]/60">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#4f8a52] block mb-1">
          LOCAL INFERENCE ENVIRONMENT
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight">
          LOCAL AI ARCHITECTURE
        </h2>
        <p className="text-sm text-[#91b79a] mt-1 font-sans">
          Technical specifications for offline open-weight vision execution.
        </p>
      </div>

      {/* Main Status Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        <div className="p-6 rounded-3xl nature-surface-card border border-[#1e3f2b]">
          <span className="text-[10px] font-mono text-[#91b79a] uppercase tracking-wider block mb-2">
            OLLAMA DAEMON STATUS
          </span>
          <div className="flex items-center gap-2">
            <span className={clsx(
              "w-2.5 h-2.5 rounded-full",
              ollamaStatus.connected ? "bg-[#4f8a52] animate-pulse" : "bg-amber-400"
            )}></span>
            <span className="text-xl font-bold font-mono text-[#f3f1e7]">
              {ollamaStatus.connected ? "CONNECTED" : "OFFLINE"}
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#91b79a] mt-2 block">
            Socket: 127.0.0.1:11434
          </span>
        </div>

        <div className="p-6 rounded-3xl nature-surface-card border border-[#1e3f2b]">
          <span className="text-[10px] font-mono text-[#91b79a] uppercase tracking-wider block mb-2">
            PRIMARY VISION MODEL
          </span>
          <div className="text-xl font-bold font-mono text-[#4f8a52]">
            Gemma 3 (4B)
          </div>
          <span className="text-[11px] font-mono text-[#91b79a] mt-2 block">
            Format: GGUF Q4_K_M
          </span>
        </div>

        <div className="p-6 rounded-3xl nature-surface-card border border-[#1e3f2b]">
          <span className="text-[10px] font-mono text-[#91b79a] uppercase tracking-wider block mb-2">
            CLOUD AI DEPENDENCY
          </span>
          <div className="text-xl font-bold font-mono text-[#d8c8a8]">
            0% / NOT USED
          </div>
          <span className="text-[11px] font-mono text-[#91b79a] mt-2 block">
            Zero external API calls
          </span>
        </div>

      </div>

      {/* Narrative Explanation */}
      <div className="p-8 rounded-[2.5rem] nature-surface-card border border-[#1e3f2b] space-y-4">
        <h3 className="text-xl font-bold text-[#f3f1e7] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#4f8a52]" />
          How NatureQuest Executes AI Locally
        </h3>
        <p className="text-sm text-[#f3f1e7]/90 leading-relaxed font-sans">
          NatureQuest runs visual analysis through a locally installed open-weight model. Images are processed through your local Ollama environment rather than a remote AI service.
        </p>
        <p className="text-xs text-[#91b79a] leading-relaxed font-mono">
          When you scan a plant, the photo is converted into a tensor in browser RAM and sent strictly to the localhost endpoint. The model extracts visible morphological features and formats a structured JSON response without telemetry.
        </p>
      </div>

      {/* Live Socket Diagnostic Ping */}
      <div className="p-6 rounded-3xl nature-surface-subtle border border-[#1e3f2b] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-[#f3f1e7] font-mono">
              DIAGNOSTIC SOCKET CHECK
            </h4>
            <p className="text-xs text-[#91b79a]">
              Test connection to local Ollama runtime through Vite proxy.
            </p>
          </div>

          <button
            onClick={testPing}
            disabled={isPinging}
            className="px-5 py-2.5 rounded-xl bg-[#4f8a52] hover:bg-[#315c3b] text-[#f3f1e7] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all self-start sm:self-auto"
          >
            {isPinging ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#f3f1e7]" /> : <Terminal className="w-3.5 h-3.5" />}
            <span>{isPinging ? 'TESTING...' : 'PING 127.0.0.1:11434'}</span>
          </button>
        </div>

        {pingResult && (
          <div className={clsx(
            "p-3.5 rounded-xl border font-mono text-xs",
            pingResult.success ? "bg-[#0c2619] border-[#4f8a52] text-[#f3f1e7]" : "bg-rose-950/40 border-rose-800 text-rose-200"
          )}>
            <div className="flex items-center gap-2 font-bold mb-1">
              {pingResult.success ? <CheckCircle className="w-4 h-4 text-[#4f8a52]" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
              <span>{pingResult.success ? 'CONNECTION VERIFIED' : 'SOCKET UNREACHABLE'}</span>
            </div>
            <p>{pingResult.message}</p>
            {pingResult.models && pingResult.models.length > 0 && (
              <div className="mt-2 text-[11px] text-[#91b79a]">
                Installed Models: {pingResult.models.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
