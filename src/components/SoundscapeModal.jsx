import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Wind, CloudRain, Waves, Sparkles, X, Sliders } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function SoundscapeModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(soundEngine.isPlaying);
  const [activePreset, setActivePreset] = useState('canopy-breeze');
  const [volumes, setVolumes] = useState({
    wind: 0.35,
    rain: 0.0,
    stream: 0.25,
    crickets: 0.15,
    birds: 0.2
  });

  useEffect(() => {
    const t = setTimeout(() => {
      setIsPlaying(soundEngine.isPlaying);
    }, 0);
    return () => clearTimeout(t);
  }, [isOpen]);

  const togglePlay = () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      soundEngine.play();
      setIsPlaying(true);
    }
  };

  const handlePresetSelect = (presetKey) => {
    setActivePreset(presetKey);
    soundEngine.setPreset(presetKey);
    // sync local state with preset
    const presets = {
      'canopy-breeze': { wind: 0.45, rain: 0.0, stream: 0.2, crickets: 0.08, birds: 0.35 },
      'misty-rain': { wind: 0.25, rain: 0.5, stream: 0.35, crickets: 0.0, birds: 0.05 },
      'summer-dusk': { wind: 0.15, rain: 0.0, stream: 0.1, crickets: 0.45, birds: 0.1 },
      'creek-trail': { wind: 0.2, rain: 0.0, stream: 0.6, crickets: 0.15, birds: 0.25 }
    };
    if (presets[presetKey]) {
      setVolumes({ ...presets[presetKey] });
    }
    if (!isPlaying) {
      soundEngine.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (channel, val) => {
    const v = parseFloat(val);
    setVolumes(prev => ({ ...prev, [channel]: v }));
    soundEngine.setChannelVolume(channel, v);
    if (!isPlaying && v > 0) {
      soundEngine.play();
      setIsPlaying(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#040e08]/85 backdrop-blur-xl flex items-center justify-center p-4 select-none animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg nature-surface-card rounded-[2.5rem] p-6 sm:p-8 border border-emerald-500/40 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e3f2b] pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border transition-all ${
              isPlaying 
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.3)]' 
                : 'bg-[#091a10] border-[#1e3f2b] text-[#91b79a]'
            }`}>
              {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-400/90 block">
                BIO-ACOUSTIC SYNTHESIZER
              </span>
              <h3 className="text-xl font-black text-[#f3f1e7] tracking-tight">
                Nature Soundscapes
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#91b79a] hover:text-[#f3f1e7] bg-[#0c2417] border border-[#1e3f2b] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Master Play/Pause Switch */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#071910] border border-emerald-600/30 shadow-inner">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#f3f1e7] block font-mono">
              Procedural Web Audio Engine
            </span>
            <span className="text-[10px] text-emerald-400/80 font-mono block">
              100% Offline Synthesis • Zero MP3 Audio Downloads
            </span>
          </div>

          <button
            onClick={togglePlay}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
              isPlaying 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50' 
                : 'bg-[#153e26] hover:bg-[#1f5636] text-[#f3f1e7]'
            }`}
          >
            {isPlaying ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>MUTE AMBIENCE</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-300" />
                <span>ACTIVATE AUDIO</span>
              </>
            )}
          </button>
        </div>

        {/* Atmosphere Presets */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-[#91b79a] uppercase tracking-wider block">
            ECOSYSTEM PRESETS
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: 'canopy-breeze', label: 'Canopy Breeze', desc: 'Pine wind & birds', icon: Wind },
              { id: 'misty-rain', label: 'Misty Rainforest', desc: 'Gentle leaves rain', icon: CloudRain },
              { id: 'creek-trail', label: 'Babbling Creek', desc: 'Flowing brook', icon: Waves },
              { id: 'summer-dusk', label: 'Summer Dusk', desc: 'Crickets & wind', icon: Sparkles }
            ].map(p => {
              const IconComp = p.icon;
              const isActive = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePresetSelect(p.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                    isActive 
                      ? 'bg-[#103321] border-emerald-500/70 shadow-[0_0_12px_rgba(74,222,128,0.2)]' 
                      : 'bg-[#081a10] border-[#1e3f2b]/60 hover:bg-[#0c2417] text-[#91b79a]'
                  }`}
                >
                  <IconComp className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-emerald-300' : 'text-[#91b79a]'}`} />
                  <div>
                    <span className={`text-xs font-bold block ${isActive ? 'text-emerald-200' : 'text-[#f3f1e7]'}`}>
                      {p.label}
                    </span>
                    <span className="text-[10px] text-[#91b79a]/70 font-sans block mt-0.5">
                      {p.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Individual Channel Faders */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#91b79a] uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-emerald-400" />
              ACOUSTIC CHANNEL MIXER
            </span>
            <span className="text-[10px] font-mono text-emerald-400/80">
              REALTIME LFO SYNTHESIS
            </span>
          </div>

          <div className="space-y-2 bg-[#06160e] p-4 rounded-2xl border border-[#1e3f2b]">
            {[
              { id: 'wind', label: 'Canopy Wind', icon: Wind },
              { id: 'rain', label: 'Foliage Rain', icon: CloudRain },
              { id: 'stream', label: 'Alpine Stream', icon: Waves },
              { id: 'crickets', label: 'Dusk Crickets', icon: Sparkles },
              { id: 'birds', label: 'Forest Birds', icon: Wind }
            ].map(ch => (
              <div key={ch.id} className="flex items-center justify-between gap-3 text-xs font-mono">
                <span className="text-[#d8c8a8] w-28 truncate">{ch.label}</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volumes[ch.id]}
                  onChange={e => handleVolumeChange(ch.id, e.target.value)}
                  className="flex-1 accent-emerald-500 cursor-pointer h-1.5 bg-[#0e2719] rounded-lg"
                />
                <span className="text-[#91b79a] w-8 text-right font-bold text-[10px]">
                  {Math.round(volumes[ch.id] * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
