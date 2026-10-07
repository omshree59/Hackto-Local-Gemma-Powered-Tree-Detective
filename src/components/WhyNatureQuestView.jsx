import { Eye, Compass, WifiOff, ArrowRight } from 'lucide-react';

export default function WhyNatureQuestView({ onStartExploring }) {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-4xl mx-auto py-4">
      
      {/* Editorial Opening Statement */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400">
          PHILOSOPHY & MANIFESTO
        </span>
        
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
          Most technology is designed to keep you looking at a screen.
        </h2>
        
        <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          NatureQuest is designed to make the screen the shortest part of the experience.
        </p>
      </div>

      {/* The 3 Pillars of NatureQuest */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        {/* Pillar 1: Discover */}
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-400 flex items-center justify-center mb-6 shadow-inner">
              <Eye className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono font-black text-emerald-400 uppercase tracking-widest block mb-2">
              01 • DISCOVER
            </span>
            <h4 className="text-xl font-bold text-white mb-3">
              Understand What Surrounds You
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              Use local vision intelligence to unlock the scientific taxonomy of trees, insect adaptations, and soil ecologies outside your door.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-stone-800/80 font-mono text-[10px] text-stone-300">
            KNOWLEDGE AS INVITATION
          </div>
        </div>

        {/* Pillar 2: Explore */}
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-teal-950/60 border border-teal-800/80 text-teal-400 flex items-center justify-center mb-6 shadow-inner">
              <Compass className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono font-black text-teal-400 uppercase tracking-widest block mb-2">
              02 • EXPLORE
            </span>
            <h4 className="text-xl font-bold text-white mb-3">
              Turn Observations Into Quests
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              Every identified specimen triggers an outdoor mission. Discovery leads directly to purposeful movement across natural terrain.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-stone-800/80 font-mono text-[10px] text-stone-300">
            CURIOSITY AS ADVENTURE
          </div>
        </div>

        {/* Pillar 3: Disconnect */}
        <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-800/80 text-amber-400 flex items-center justify-center mb-6 shadow-inner">
              <WifiOff className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest block mb-2">
              03 • DISCONNECT
            </span>
            <h4 className="text-xl font-bold text-white mb-3">
              Put Down The Phone and Go
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              Start the timer, pocket your device, and allow your senses to engage directly with leaves, breeze, soil scents, and bird frequencies.
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-stone-800/80 font-mono text-[10px] text-stone-300">
            THE REAL WORLD AS THE PRODUCT
          </div>
        </div>

      </div>

      {/* Invitation Call to Action */}
      <div className="text-center pt-8">
        <button
          onClick={onStartExploring}
          className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black px-8 py-4 rounded-2xl text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-xl shadow-emerald-500/20 cursor-pointer active:scale-95 transition-all"
        >
          <span>BEGIN YOUR FIELD EXPEDITION</span>
          <ArrowRight className="w-4 h-4 text-stone-950" />
        </button>
      </div>

    </div>
  );
}
