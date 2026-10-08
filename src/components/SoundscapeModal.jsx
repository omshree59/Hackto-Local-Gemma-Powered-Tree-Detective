import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Wind, CloudRain, Waves, Sparkles, X, Sliders, Music } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function SoundscapeModal({ isOpen = true, onClose }) {
  const [isPlaying, setIsPlaying] = useState(soundEngine.isPlaying);
  const [activePreset, setActivePreset] = useState('canopy-breeze');
  const [volumes, setVolumes] = useState({
    wind: soundEngine.channels.wind.volume,
    rain: soundEngine.channels.rain.volume,
    stream: soundEngine.channels.stream.volume,
    crickets: soundEngine.channels.crickets.volume,
    birds: soundEngine.channels.birds.volume
  });

  useEffect(() => {
    // Subscribe to engine playing state changes
    const unsub = soundEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    // Sync initially
    const t = setTimeout(() => {
      setIsPlaying(soundEngine.isPlaying);
    }, 0);
    return () => {
      clearTimeout(t);
      unsub();
    };
  }, []);

  const togglePlay = async () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      await soundEngine.play();
      setIsPlaying(true);
    }
  };

  const handlePresetSelect = async (presetKey) => {
    setActivePreset(presetKey);
    soundEngine.setPreset(presetKey);
    
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
      await soundEngine.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = async (channel, val) => {
    const v = parseFloat(val);
    setVolumes(prev => ({ ...prev, [channel]: v }));
    soundEngine.setChannelVolume(channel, v);

    if (!isPlaying && v > 0) {
      await soundEngine.play();
      setIsPlaying(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#040e08]/85 backdrop-blur-xl flex items-center justify-center p-4 select-none animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg nature-surface-card rounded-[2.5rem] p-6 sm:p-8 border-2 border-emerald-500/50 shadow-2xl space-y-6 animate-in zoom-in-95"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1e3f2b] pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl border transition-all ${
              isPlaying 
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.4)]' 
                : 'bg-[#091a10] border-[#1e3f2b] text-[#91b79a]'
            }`}>
              {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse text-emerald-300" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-400 block">
                  BIO-ACOUSTIC SYNTHESIZER
                </span>
                {isPlaying && (
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                    LIVE
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-[#f3f1e7] tracking-tight">
                Nature Soundscapes
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#91b79a] hover:text-[#f3f1e7] bg-[#0c2417] border border-[#1e3f2b] transition-colors cursor-pointer"
            aria-label="Close soundscape"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Master Play/Pause Switch */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[#071910] border border-emerald-600/40 shadow-inner">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-[#f3f1e7] block font-mono">
              Procedural Web Audio Engine
            </span>
            <span className="text-[10px] text-emerald-400 font-mono block">
              100% Offline • Zero External MP3 Downloads
            </span>
          </div>

          <button
            onClick={togglePlay}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 ${
              isPlaying 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50' 
                : 'bg-[#153e26] hover:bg-[#1f5636] text-[#f3f1e7] border border-emerald-500/40'
            }`}
          >
            {isPlaying ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>MUTE AUDIO</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-300" />
                <span>START SOUNDSCAPE</span>
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
              { id: 'canopy-breeze', label: 'Canopy Breeze', desc: 'Pine wind & birdsong', icon: Wind },
              { id: 'misty-rain', label: 'Misty Rainforest', desc: 'Rain on woodland leaves', icon: CloudRain },
              { id: 'creek-trail', label: 'Babbling Creek', desc: 'Flowing brook & stream', icon: Waves },
              { id: 'summer-dusk', label: 'Summer Dusk', desc: 'Crickets & soft gusts', icon: Sparkles }
            ].map(p => {
              const IconComp = p.icon;
              const isActive = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePresetSelect(p.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                    isActive 
                      ? 'bg-[#103321] border-emerald-500/80 shadow-[0_0_12px_rgba(74,222,128,0.25)]' 
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
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-[#91b79a] uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-emerald-400" />
              ACOUSTIC CHANNEL MIXER
            </span>
            <span className="text-[10px] font-mono text-emerald-400/80">
              REAL-TIME SYNTHESIS
            </span>
          </div>

          <div className="space-y-2.5 bg-[#06160e] p-4 rounded-2xl border border-[#1e3f2b]">
            {[
              { id: 'wind', label: 'Canopy Wind', icon: Wind },
              { id: 'rain', label: 'Foliage Rain', icon: CloudRain },
              { id: 'stream', label: 'Alpine Stream', icon: Waves },
              { id: 'crickets', label: 'Dusk Crickets', icon: Sparkles },
              { id: 'birds', label: 'Forest Birds', icon: Music }
            ].map(ch => (
              <div key={ch.id} className="flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 w-28 shrink-0">
                  <span className="text-[#d8c8a8] truncate">{ch.label}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volumes[ch.id] || 0}
                  onChange={e => handleVolumeChange(ch.id, e.target.value)}
                  className="flex-1 accent-emerald-500 cursor-pointer h-2 bg-[#0e2719] rounded-lg"
                />
                <span className="text-emerald-300 w-10 text-right font-bold text-[11px]">
                  {Math.round((volumes[ch.id] || 0) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
