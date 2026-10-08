/**
 * NatureQuest Bio-Acoustic Nature Soundscape Engine
 * 100% Offline Synthesized Audio using Browser Web Audio API.
 * Zero external MP3/WAV files required.
 * Generates procedural binaural wind, rainfall, babbling brook, crickets, and birdsong.
 */

class SoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    
    this.channels = {
      wind: { gain: null, nodes: null, volume: 0.35 },
      rain: { gain: null, nodes: null, volume: 0.0 },
      stream: { gain: null, nodes: null, volume: 0.25 },
      crickets: { gain: null, nodes: null, volume: 0.15 },
      birds: { gain: null, timer: null, volume: 0.25 }
    };

    this.onStateChangeCallbacks = new Set();
  }

  subscribe(cb) {
    this.onStateChangeCallbacks.add(cb);
    return () => this.onStateChangeCallbacks.delete(cb);
  }

  notify() {
    for (const cb of this.onStateChangeCallbacks) {
      try { cb(this.isPlaying); } catch {}
    }
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      console.warn('Web Audio API not supported in this environment.');
      return;
    }
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Initialize channel gain buses
    for (const key of Object.keys(this.channels)) {
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(this.channels[key].volume, this.ctx.currentTime);
      g.connect(this.masterGain);
      this.channels[key].gain = g;
    }
  }

  /**
   * Generates organic Pink Noise using Paul Kellet's filter algorithm
   * Much more soothing and natural for environmental sounds than white noise.
   */
  createPinkNoiseBuffer(seconds = 4) {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * seconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  startWind() {
    if (!this.ctx || !this.channels.wind.gain) return;
    const buffer = this.createPinkNoiseBuffer(5);
    if (!buffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Resonant bandpass filter mimicking forest canopy air movement
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(380, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    // Slow sinusoidal LFO simulating gentle gusts of wind
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime); // ~6.6 second gust cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(220, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(this.channels.wind.gain);

    noise.start();
    lfo.start();

    this.channels.wind.nodes = { noise, lfo, filter, lfoGain };
  }

  startRain() {
    if (!this.ctx || !this.channels.rain.gain) return;
    const buffer = this.createPinkNoiseBuffer(4);
    if (!buffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Lowpass filter for soothing raindrop patter on woodland leaves
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.0, this.ctx.currentTime);

    // Subtle drop flutter
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(3.5, this.ctx.currentTime);

    const flutterGain = this.ctx.createGain();
    flutterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    lfo.connect(flutterGain.gain);

    noise.connect(filter);
    filter.connect(flutterGain);
    flutterGain.connect(this.channels.rain.gain);

    noise.start();
    lfo.start();

    this.channels.rain.nodes = { noise, lfo, filter, flutterGain };
  }

  startStream() {
    if (!this.ctx || !this.channels.stream.gain) return;
    const buffer = this.createPinkNoiseBuffer(4);
    if (!buffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Dual bandpass filters producing watery gurgle harmonics
    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(540, this.ctx.currentTime);
    filter1.Q.setValueAtTime(4.0, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.7, this.ctx.currentTime);

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(160, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter1.frequency);

    noise.connect(filter1);
    filter1.connect(this.channels.stream.gain);

    noise.start();
    lfo.start();

    this.channels.stream.nodes = { noise, lfo, filter1, lfoGain };
  }

  startCrickets() {
    if (!this.ctx || !this.channels.crickets.gain) return;
    
    // Dual close-frequency sines producing metallic biological acoustic beating
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(4520, this.ctx.currentTime);
    osc2.frequency.setValueAtTime(4570, this.ctx.currentTime);

    // Pulse gate node to chop continuous tone into cricket chirp bursts
    const gateGain = this.ctx.createGain();
    gateGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

    // Modulator oscillator creating chirp rhythm
    const mod = this.ctx.createOscillator();
    mod.type = 'square';
    mod.frequency.setValueAtTime(6.0, this.ctx.currentTime); // 6 chirps per second

    const modScale = this.ctx.createGain();
    modScale.gain.setValueAtTime(0.5, this.ctx.currentTime);
    mod.connect(modScale);
    modScale.connect(gateGain.gain);

    osc1.connect(gateGain);
    osc2.connect(gateGain);
    gateGain.connect(this.channels.crickets.gain);

    osc1.start();
    osc2.start();
    mod.start();

    this.channels.crickets.nodes = { osc1, osc2, mod, gateGain, modScale };
  }

  scheduleBirdChirp() {
    if (!this.isPlaying || !this.ctx || !this.channels.birds.gain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const chirpGain = this.ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 2600 + Math.random() * 900;
      
      // Multi-step pitch inflection (warble)
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 750, now + 0.07);
      osc.frequency.exponentialRampToValueAtTime(baseFreq - 150, now + 0.14);
      osc.frequency.exponentialRampToValueAtTime(baseFreq + 500, now + 0.22);

      // Envelope shaping
      chirpGain.gain.setValueAtTime(0.0001, now);
      chirpGain.gain.linearRampToValueAtTime(0.22, now + 0.04);
      chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(chirpGain);
      chirpGain.connect(this.channels.birds.gain);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}

    // Random interval between 2.2 and 4.8 seconds for natural stochastic rhythm
    const delay = 2200 + Math.random() * 2600;
    this.channels.birds.timer = setTimeout(() => {
      this.scheduleBirdChirp();
    }, delay);
  }

  stopAllNodes() {
    // Wind
    if (this.channels.wind.nodes) {
      try {
        this.channels.wind.nodes.noise.stop();
        this.channels.wind.nodes.noise.disconnect();
        this.channels.wind.nodes.lfo.stop();
        this.channels.wind.nodes.lfo.disconnect();
      } catch {}
      this.channels.wind.nodes = null;
    }

    // Rain
    if (this.channels.rain.nodes) {
      try {
        this.channels.rain.nodes.noise.stop();
        this.channels.rain.nodes.noise.disconnect();
        this.channels.rain.nodes.lfo.stop();
        this.channels.rain.nodes.lfo.disconnect();
      } catch {}
      this.channels.rain.nodes = null;
    }

    // Stream
    if (this.channels.stream.nodes) {
      try {
        this.channels.stream.nodes.noise.stop();
        this.channels.stream.nodes.noise.disconnect();
        this.channels.stream.nodes.lfo.stop();
        this.channels.stream.nodes.lfo.disconnect();
      } catch {}
      this.channels.stream.nodes = null;
    }

    // Crickets
    if (this.channels.crickets.nodes) {
      try {
        this.channels.crickets.nodes.osc1.stop();
        this.channels.crickets.nodes.osc1.disconnect();
        this.channels.crickets.nodes.osc2.stop();
        this.channels.crickets.nodes.osc2.disconnect();
        this.channels.crickets.nodes.mod.stop();
        this.channels.crickets.nodes.mod.disconnect();
      } catch {}
      this.channels.crickets.nodes = null;
    }

    // Birds
    if (this.channels.birds.timer) {
      clearTimeout(this.channels.birds.timer);
      this.channels.birds.timer = null;
    }
  }

  async play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (err) {
        console.warn('AudioContext resume error:', err);
      }
    }

    // Stop any stale nodes first to prevent multiple overlapping loops
    this.stopAllNodes();

    this.isPlaying = true;
    this.startWind();
    this.startRain();
    this.startStream();
    this.startCrickets();
    this.scheduleBirdChirp();
    this.notify();
  }

  stop() {
    if (!this.ctx) return;
    this.isPlaying = false;
    this.stopAllNodes();

    if (this.ctx && this.ctx.state === 'running') {
      try {
        this.ctx.suspend();
      } catch {}
    }
    this.notify();
  }

  setChannelVolume(channel, volume) {
    if (!this.channels[channel]) return;
    const v = Math.max(0, Math.min(1, volume));
    this.channels[channel].volume = v;

    if (this.channels[channel].gain && this.ctx) {
      try {
        this.channels[channel].gain.gain.setValueAtTime(v, this.ctx.currentTime);
      } catch {}
    }
  }

  setPreset(name) {
    const presets = {
      'canopy-breeze': { wind: 0.45, rain: 0.0, stream: 0.2, crickets: 0.08, birds: 0.35 },
      'misty-rain': { wind: 0.25, rain: 0.5, stream: 0.35, crickets: 0.0, birds: 0.05 },
      'summer-dusk': { wind: 0.15, rain: 0.0, stream: 0.1, crickets: 0.45, birds: 0.1 },
      'creek-trail': { wind: 0.2, rain: 0.0, stream: 0.6, crickets: 0.15, birds: 0.25 }
    };

    const p = presets[name];
    if (!p) return;
    for (const [k, v] of Object.entries(p)) {
      this.setChannelVolume(k, v);
    }
  }
}

export const soundEngine = new SoundscapeEngine();
