import React, { useState } from 'react';
import { 
  Code, ShieldCheck, WifiOff, Cpu, Terminal, ArrowRight, 
  Share2, Check, ExternalLink, HardDrive, Globe, Zap, AlertTriangle
} from 'lucide-react';
import clsx from 'clsx';

export default function OpenInnovationView({ onCopyDevPost, copiedDevDraft }) {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal-950 via-stone-900 to-[#050805] border border-teal-700/50 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950 border border-teal-600/60 text-xs font-mono font-black uppercase tracking-widest text-teal-300 mb-4 shadow-inner">
            <Code className="w-4 h-4 text-teal-400" />
            HACKTOBERFEST 2026 • DEV CHALLENGE
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            OPEN INNOVATION &<br />
            <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-lime-300 bg-clip-text text-transparent">
              OFFLINE EDGE ARCHITECTURE
            </span>
          </h2>

          <p className="text-base sm:text-lg text-stone-300 font-sans leading-relaxed mb-8">
            "NatureQuest uses local open-weight AI because an outdoor tool should not require a permanent internet connection or send personal photos to a cloud provider."
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onCopyDevPost}
              className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4 text-stone-950" />
              <span>{copiedDevDraft ? 'COPIED TO CLIPBOARD!' : 'COPY DEV.TO ARTICLE TEMPLATE'}</span>
            </button>

            <a
              href="https://dev.to"
              target="_blank"
              rel="noreferrer"
              className="bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-700 px-6 py-3.5 rounded-2xl text-xs font-mono font-bold flex items-center gap-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-teal-400" />
              <span>DEV CHALLENGE BRIEF</span>
            </a>
          </div>
        </div>
      </section>

      {/* Core Architectural Diagram (Animated Node Flow) */}
      <section className="bg-stone-900/60 border border-stone-800 rounded-[2.5rem] p-8 sm:p-12 backdrop-blur-xl shadow-xl">
        <div className="mb-8">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 block mb-1">
            DATA PIPELINE SPECIFICATION
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Local Multi-Stage Inference Topology
          </h3>
          <p className="text-xs text-stone-400 font-mono mt-1">
            Zero packets cross the public internet. Local loopback socket via 127.0.0.1:11434.
          </p>
        </div>

        {/* The Animated Architecture Flow */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
          
          {/* Node 1: User / Sensor */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 text-center relative group">
            <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">NODE 01</span>
            <h5 className="text-sm font-bold text-white mb-1">USER & OPTICAL LENS</h5>
            <p className="text-[11px] text-stone-400">Raw trail photo capture</p>
          </div>

          <div className="hidden md:flex justify-center text-emerald-400 animate-pulse">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Node 2: NatureQuest Client */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 text-center relative group">
            <span className="text-[10px] font-mono text-teal-400 font-bold block mb-1">NODE 02</span>
            <h5 className="text-sm font-bold text-white mb-1">NATUREQUEST</h5>
            <p className="text-[11px] text-stone-400">Vite localhost reverse proxy</p>
          </div>

          <div className="hidden md:flex justify-center text-teal-400 animate-pulse">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Node 3: Ollama / Gemma 3 */}
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center relative group shadow-lg shadow-emerald-950/30">
            <span className="text-[10px] font-mono text-emerald-300 font-bold block mb-1">NODE 03</span>
            <h5 className="text-sm font-bold text-white mb-1">OLLAMA GEMMA 3 4B</h5>
            <p className="text-[11px] text-stone-300">Open-weight vision pass</p>
          </div>

          <div className="hidden md:flex justify-center text-emerald-400 animate-pulse">
            <ArrowRight className="w-5 h-5" />
          </div>

          {/* Node 4: Field Report */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 text-center relative group">
            <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">NODE 04</span>
            <h5 className="text-sm font-bold text-white mb-1">FIELD CODEX</h5>
            <p className="text-[11px] text-stone-400">Encrypted local client log</p>
          </div>

        </div>

        {/* Architecture Guarantees Checklist */}
        <div className="mt-8 pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs text-stone-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>✓ No Cloud AI</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>✓ No API Tokens</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>✓ Model Swappable</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>✓ 100% Offline Ready</span>
          </div>
        </div>
      </section>

      {/* Cloud AI vs NatureQuest Comparison Matrix */}
      <section className="bg-stone-900/60 border border-stone-800 rounded-[2.5rem] p-8 sm:p-12 backdrop-blur-xl shadow-xl">
        <div className="mb-8">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-teal-400 block mb-1">
            PARADIGM COMPARISON
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Proprietary Cloud API vs. NatureQuest Local Weights
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Closed Cloud AI Card */}
          <div className="p-7 rounded-3xl bg-stone-950/70 border border-stone-800/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 font-mono">
              <span className="text-xs font-bold text-stone-400 uppercase">CLOSED CLOUD AI</span>
              <span className="text-[10px] text-rose-400 font-bold bg-rose-950/40 px-2.5 py-0.5 rounded-full border border-rose-900/60">
                FRAGILE OUTDOORS
              </span>
            </div>

            <ul className="space-y-3 text-xs text-stone-400 font-mono">
              <li className="flex items-center gap-2 text-rose-300/80">
                <span>✗ Internet Required: Fails deep on forested trails</span>
              </li>
              <li className="flex items-center gap-2 text-rose-300/80">
                <span>✗ Cloud Processing: Photos sent to remote server silos</span>
              </li>
              <li className="flex items-center gap-2 text-rose-300/80">
                <span>✗ API Key Required: Sensitive secrets to manage</span>
              </li>
              <li className="flex items-center gap-2 text-rose-300/80">
                <span>✗ Metered Usage: Per-token cost barrier for users</span>
              </li>
              <li className="flex items-center gap-2 text-rose-300/80">
                <span>✗ Vendor Lock-in: Closed proprietary model behavior</span>
              </li>
            </ul>
          </div>

          {/* NatureQuest Open AI Card */}
          <div className="p-7 rounded-3xl bg-emerald-950/30 border border-emerald-500/50 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/80 font-mono">
              <span className="text-xs font-bold text-emerald-300 uppercase">NATUREQUEST (LOCAL GEMMA 3)</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
                TRAIL RESILIENT
              </span>
            </div>

            <ul className="space-y-3 text-xs text-stone-200 font-mono">
              <li className="flex items-center gap-2 text-emerald-400">
                <span>✓ Local Inference: Operates without a single cell tower</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-400">
                <span>✓ Absolute Privacy: Data remains on personal silicon</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-400">
                <span>✓ Zero Keys: Runs via localhost Ollama socket</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-400">
                <span>✓ Free Forever: Unlimited biodiversity taxonomic checks</span>
              </li>
              <li className="flex items-center gap-2 text-emerald-400">
                <span>✓ Open Weights: Model can be swapped or fine-tuned</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
}
