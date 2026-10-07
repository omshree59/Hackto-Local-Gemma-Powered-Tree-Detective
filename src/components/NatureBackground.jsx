import React, { useState, useEffect, useRef } from 'react';

// Curated cinematic nature environments for each page
const ENVIRONMENTS = {
  'station': {
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(34, 197, 94, 0.12)',
    sporeColor: 'rgba(167, 243, 208, 0.85)',
    mood: 'Lush Forest Canopy'
  },
  'plant-scout': {
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(52, 211, 153, 0.14)',
    sporeColor: 'rgba(110, 231, 183, 0.9)',
    mood: 'Botanical Macro'
  },
  'quests': {
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(16, 185, 129, 0.12)',
    sporeColor: 'rgba(253, 230, 138, 0.85)',
    mood: 'Woodland Pathway'
  },
  'trails': {
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(45, 212, 191, 0.12)',
    sporeColor: 'rgba(153, 246, 228, 0.85)',
    mood: 'Mountain Trail'
  },
  'codex': {
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(16, 185, 129, 0.12)',
    sporeColor: 'rgba(187, 247, 208, 0.85)',
    mood: 'Fern Understory'
  },
  'achievements': {
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(234, 179, 8, 0.14)',
    sporeColor: 'rgba(254, 240, 138, 0.9)',
    mood: 'Sunrise Woodland'
  },
  'progress': {
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(20, 184, 166, 0.12)',
    sporeColor: 'rgba(167, 243, 208, 0.85)',
    mood: 'Wilderness Ridge'
  },
  'my-plants': {
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(74, 222, 128, 0.12)',
    sporeColor: 'rgba(187, 247, 208, 0.85)',
    mood: 'Greenhouse & Seedlings'
  },
  'guide': {
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(34, 197, 94, 0.12)',
    sporeColor: 'rgba(254, 240, 138, 0.85)',
    mood: 'Wild Flora Meadow'
  },
  'stories': {
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(52, 211, 153, 0.11)',
    sporeColor: 'rgba(253, 230, 138, 0.8)',
    mood: 'Old Growth Forest'
  },
  'local-ai': {
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(20, 184, 166, 0.10)',
    sporeColor: 'rgba(153, 246, 228, 0.8)',
    mood: 'Deep Woodland'
  },
  'settings': {
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=2000&q=85',
    ambientGlow: 'rgba(16, 185, 129, 0.10)',
    sporeColor: 'rgba(167, 243, 208, 0.75)',
    mood: 'Mossy Forest'
  }
};

export default function NatureBackground({ activePage = 'station', isScanning = false }) {
  const [currentBg, setCurrentBg] = useState(ENVIRONMENTS.station.image);
  const [prevBg, setPrevBg] = useState(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('day');

  const canvasRef = useRef(null);

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
      }, 950);

      return () => clearTimeout(timer);
    }
  }, [activePage, currentBg]);

  // Floating Bioluminescent Spores & Pollen Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle setup
    const particleCount = 42;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        angle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.015 + 0.005,
        swayWidth: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        colorType: Math.random() > 0.4 ? 'gold' : 'emerald'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        // Organic sinusoidal floating movement
        p.angle += p.swaySpeed;
        p.y -= p.speedY;
        p.x += Math.sin(p.angle) * p.swayWidth + p.speedX;

        // Oscillate brightness/glow
        const dynamicAlpha = Math.max(0.1, Math.min(0.85, p.alpha + Math.sin(p.angle * 1.8) * 0.25));

        // Wrap around borders
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Soft radial gradient for glowing spore effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        if (p.colorType === 'gold') {
          gradient.addColorStop(0, `rgba(254, 240, 138, ${dynamicAlpha})`);
          gradient.addColorStop(0.5, `rgba(234, 179, 8, ${dynamicAlpha * 0.4})`);
          gradient.addColorStop(1, 'rgba(234, 179, 8, 0)');
        } else {
          gradient.addColorStop(0, `rgba(167, 243, 208, ${dynamicAlpha})`);
          gradient.addColorStop(0.5, `rgba(52, 211, 153, ${dynamicAlpha * 0.4})`);
          gradient.addColorStop(1, 'rgba(52, 211, 153, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeEnv = ENVIRONMENTS[activePage] || ENVIRONMENTS.station;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      
      {/* Fallback solid organic forest ground color */}
      <div className="absolute inset-0 bg-[#06110a]" />

      {/* Layer 1: Previous Background during smooth crossfade */}
      {prevBg && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-100 animate-nature-pan"
          style={{ backgroundImage: `url(${prevBg})` }}
        />
      )}

      {/* Layer 1: Current Background with Continuous Breathing Nature Ken Burns Motion */}
      <div 
        className={`absolute inset-0 bg-cover bg-center animate-nature-pan transition-all duration-1000 ease-out ${
          isScanning ? 'filter blur-md brightness-75' : ''
        } ${isCrossfading ? 'opacity-0 animate-fade-in' : 'opacity-100'}`}
        style={{ backgroundImage: `url(${currentBg})` }}
      />

      {/* Layer 2: Volumetric Canopy God-Rays / Sunlight Beams Filtering Through Leaves */}
      <div className="absolute -top-1/4 -left-1/4 w-[160%] h-[160%] pointer-events-none opacity-25 animate-god-rays">
        <div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(115deg, rgba(254, 243, 199, 0.18) 0%, rgba(167, 243, 208, 0.12) 20%, transparent 45%, rgba(254, 243, 199, 0.15) 55%, transparent 75%, rgba(167, 243, 208, 0.1) 85%, transparent 100%)'
          }}
        />
      </div>

      {/* Layer 3: Organic Drifting Forest Mist / Canopy Fog (Dual Speed) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Slow Mist Layer */}
        <div 
          className="absolute -inset-x-1/2 bottom-0 h-3/4 opacity-30 animate-mist-slow"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(52, 211, 153, 0.18), transparent 70%)'
          }}
        />
        {/* Fast Mist Layer */}
        <div 
          className="absolute -inset-x-1/2 top-1/4 h-2/3 opacity-25 animate-mist-fast"
          style={{
            background: 'radial-gradient(ellipse 65% 45% at 50% 50%, rgba(16, 185, 129, 0.14), transparent 65%)'
          }}
        />
      </div>

      {/* Layer 4: Floating Bioluminescent Forest Spores & Pollen Particle Simulation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Layer 5: Multi-stop Dark Gradient Vignette Overlay to ensure 100% crystal text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06110a]/80 via-[#06120b]/85 to-[#040c07]/98 transition-colors duration-1000" />

      {/* Layer 5b: Lateral vignette for wide screens */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050e08]/90 via-transparent to-[#050e08]/90" />

      {/* Layer 6: Soft Nature Atmospheric Radial Glow matching section theme */}
      <div 
        className="absolute top-1/4 left-1/3 w-[850px] h-[850px] rounded-full blur-[170px] opacity-45 transition-colors duration-1000 pointer-events-none"
        style={{ background: activeEnv.ambientGlow }}
      />

      {/* Layer 7: Time-of-day subtle atmospheric tint overlay */}
      {timeOfDay === 'morning' && (
        <div className="absolute inset-0 bg-amber-500/5 mix-blend-soft-light pointer-events-none" />
      )}
      {timeOfDay === 'evening' && (
        <div className="absolute inset-0 bg-amber-600/7 mix-blend-color-dodge pointer-events-none" />
      )}
      {timeOfDay === 'night' && (
        <div className="absolute inset-0 bg-blue-950/15 mix-blend-multiply pointer-events-none" />
      )}

      {/* Layer 8: Gentle Botanical Canopy Branch Silhouette Accent in top corner */}
      <div className="absolute -top-12 -left-12 w-64 h-64 pointer-events-none opacity-20 animate-foliage-sway">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full text-emerald-950">
          <path d="M10,0 C30,40 50,70 110,85 C140,92 180,95 200,90 C185,115 150,135 110,120 C80,108 55,85 30,50 C15,30 5,15 0,0 Z" />
          <path d="M40,25 C60,45 95,55 125,50 C95,65 70,75 45,60 Z" />
          <path d="M70,55 C90,80 135,90 160,80 C130,100 100,105 75,90 Z" />
        </svg>
      </div>

    </div>
  );
}
