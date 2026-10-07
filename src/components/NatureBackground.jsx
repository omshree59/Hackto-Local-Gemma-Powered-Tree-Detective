import React, { useState, useEffect } from 'react';

// Curated cinematic nature environments for each page
const ENVIRONMENTS = {
  'station': {
    // Lush green forest with sunlight filtering through tree canopies
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(34, 197, 94, 0.08)',
    mood: 'Lush Forest Canopy'
  },
  'plant-scout': {
    // Macro botanical leaves with soft bokeh
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(52, 211, 153, 0.09)',
    mood: 'Botanical Macro'
  },
  'quests': {
    // Forest trail / footpath extending into the distance
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(16, 185, 129, 0.08)',
    mood: 'Woodland Pathway'
  },
  'trails': {
    // Mountain greenery & winding path
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(45, 212, 191, 0.08)',
    mood: 'Mountain Trail'
  },
  'codex': {
    // Botanical pressed leaves & rich fern understory
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(16, 185, 129, 0.08)',
    mood: 'Fern Understory'
  },
  'achievements': {
    // Morning sunbeams filtering through morning forest
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(234, 179, 8, 0.08)',
    mood: 'Sunrise Woodland'
  },
  'progress': {
    // Serene misty mountain forest ridge
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(20, 184, 166, 0.08)',
    mood: 'Wilderness Ridge'
  },
  'guide': {
    // Soft meadow & vibrant wild flora
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(34, 197, 94, 0.08)',
    mood: 'Wild Flora Meadow'
  },
  'stories': {
    // Ancient towering oak canopy & forest light
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(52, 211, 153, 0.07)',
    mood: 'Old Growth Forest'
  },
  'local-ai': {
    // Subdued deep woodland evergreen foliage
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(20, 184, 166, 0.06)',
    mood: 'Deep Woodland'
  },
  'settings': {
    // Calm mossy rock & peaceful stream
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(16, 185, 129, 0.06)',
    mood: 'Mossy Forest'
  }
};

export default function NatureBackground({ activePage = 'station', isScanning = false }) {
  const [currentBg, setCurrentBg] = useState(ENVIRONMENTS.station.image);
  const [prevBg, setPrevBg] = useState(null);
  const [isCrossfading, setIsCrossfading] = useState(false);

  // Time of day subtle atmosphere tint
  const [timeOfDay, setTimeOfDay] = useState('day');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 9) setTimeOfDay('morning');
    else if (hour >= 9 && hour < 17) setTimeOfDay('day');
    else if (hour >= 17 && hour < 20) setTimeOfDay('evening');
    else setTimeOfDay('night');
  }, []);

  useEffect(() => {
    const targetEnv = ENVIRONMENTS[activePage] || ENVIRONMENTS.station;
    const newImage = targetEnv.image;

    if (newImage !== currentBg) {
      setPrevBg(currentBg);
      setCurrentBg(newImage);
      setIsCrossfading(true);

      const timer = setTimeout(() => {
        setIsCrossfading(false);
        setPrevBg(null);
      }, 900);

      return () => clearTimeout(timer);
    }
  }, [activePage, currentBg]);

  const activeEnv = ENVIRONMENTS[activePage] || ENVIRONMENTS.station;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      
      {/* Fallback solid organic forest color */}
      <div className="absolute inset-0 bg-[#07130c]" />

      {/* Layer 1: Previous Background during smooth crossfade */}
      {prevBg && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-100 transform scale-100"
          style={{ backgroundImage: `url(${prevBg})` }}
        />
      )}

      {/* Layer 1: Current Background with crossfade fade-in & slow parallax zoom */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform ${
          isScanning ? 'filter blur-md brightness-75 scale-105' : 'scale-100'
        } ${isCrossfading ? 'opacity-0 animate-fade-in' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${currentBg})` }}
      />

      {/* Layer 2: Multi-stop Dark Gradient Vignette Overlay to ensure 100% text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06110a]/75 via-[#06120b]/82 to-[#040c07]/96 transition-colors duration-1000" />

      {/* Layer 2b: Lateral vignette for wide screens */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050e08]/85 via-transparent to-[#050e08]/85" />

      {/* Layer 3: Soft Nature Atmospheric Radial Glow */}
      <div 
        className="absolute top-1/4 left-1/3 w-[800px] h-[800px] rounded-full blur-[160px] opacity-40 transition-colors duration-1000 pointer-events-none"
        style={{ background: activeEnv.ambientGlow }}
      />

      {/* Layer 3b: Time-of-day subtle atmospheric tint overlay */}
      {timeOfDay === 'morning' && (
        <div className="absolute inset-0 bg-amber-500/5 mix-blend-soft-light" />
      )}
      {timeOfDay === 'evening' && (
        <div className="absolute inset-0 bg-amber-600/7 mix-blend-color-dodge" />
      )}
      {timeOfDay === 'night' && (
        <div className="absolute inset-0 bg-blue-950/15 mix-blend-multiply" />
      )}

      {/* Layer 4: Extremely subtle natural light motes / golden forest dust */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="w-2 h-2 rounded-full bg-amber-200/50 absolute top-[15%] left-[25%] blur-[1px] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-300/40 absolute top-[40%] left-[70%] blur-[1px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="w-2.5 h-2.5 rounded-full bg-lime-200/30 absolute top-[70%] left-[30%] blur-[2px] animate-[pulse_7s_ease-in-out_infinite]" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-200/40 absolute top-[85%] left-[80%] blur-[1px] animate-[pulse_9s_ease-in-out_infinite]" />
      </div>

    </div>
  );
}
