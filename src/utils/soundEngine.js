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
      wind: { gain: null, node: null, volume: 0.35 },
      rain: { gain: null, node: null, volume: 0.0 },
      stream: { gain: null, node: null, volume: 0.25 },
      crickets: { gain: null, node: null, volume: 0.15 },
      birds: { gain: null, timer: null, volume: 0.2 }
    };
  }

  init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Initialize channels
    for (const key of Object.keys(this.channels)) {
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(this.channels[key].volume, this.ctx.currentTime);
      g.connect(this.masterGain);
      this.channels[key].gain = g;
    }
  }

  createNoiseBuffer(seconds = 3) {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * seconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  startWind() {
    if (!this.ctx) return;
    const buffer = this.createNoiseBuffer(5);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter to simulate tree canopy wind
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(420, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // LFO to modulate wind gusting
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime); // 0.18 Hz slow gusts
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(260, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(this.channels.wind.gain);

    noise.start();
    lfo.start();
    this.channels.wind.node = { noise, lfo };
  }

  startRain() {
    if (!this.ctx) return;
    const buffer = this.createNoiseBuffer(4);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.channels.rain.gain);
    noise.start();
    this.channels.rain.node = noise;
  }

  startStream() {
    if (!this.ctx) return;
    const buffer = this.createNoiseBuffer(4);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.2, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.8, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(this.channels.stream.gain);
    noise.start();
    lfo.start();
    this.channels.stream.node = { noise, lfo };
  }

  startCrickets() {
    if (!this.ctx) return;
    // Oscillators creating delicate cricket resonance
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(4600, this.ctx.currentTime);
    osc2.frequency.setValueAtTime(4650, this.ctx.currentTime);

    // Fast chirping modulation
    const mod = this.ctx.createOscillator();
    mod.frequency.setValueAtTime(18, this.ctx.currentTime);
    const modGain = this.ctx.createGain();
    modGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    mod.connect(modGain.gain);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(4600, this.ctx.currentTime);
    filter.Q.setValueAtTime(8, this.ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(modGain);
    modGain.connect(this.channels.crickets.gain);

    osc1.start();
    osc2.start();
    mod.start();
    this.channels.crickets.node = { osc1, osc2, mod };
  }

  scheduleBirdChirp() {
    if (!this.isPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const baseFreq = 2800 + Math.random() * 800;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq - 200, now + 0.16);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 400, now + 0.24);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18 * this.channels.birds.volume, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.channels.birds.gain);

    osc.start(now);
    osc.stop(now + 0.3);

    // Schedule next chirp randomly in 2.5 to 5.5 seconds
    const delay = 2500 + Math.random() * 3000;
    this.channels.birds.timer = setTimeout(() => {
      this.scheduleBirdChirp();
    }, delay);
  }

  play() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.startWind();
    this.startRain();
    this.startStream();
    this.startCrickets();
    this.scheduleBirdChirp();
  }

  stop() {
    if (!this.isPlaying || !this.ctx) return;
    this.isPlaying = false;
    if (this.channels.birds.timer) {
      clearTimeout(this.channels.birds.timer);
    }
    if (this.ctx.state === 'running') {
      this.ctx.suspend();
    }
  }

  setChannelVolume(channel, volume) {
    if (!this.channels[channel]) return;
    this.channels[channel].volume = Math.max(0, Math.min(1, volume));
    if (this.channels[channel].gain && this.ctx) {
      this.channels[channel].gain.gain.setValueAtTime(
        this.channels[channel].volume,
        this.ctx.currentTime
      );
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
