import React from 'react';
import { 
  Camera, Compass, Target, Footprints, BookOpen, 
  Leaf, Trees, Flower, ArrowRight, Upload, Zap, 
  CheckCircle, ShieldCheck, Clock, MapPin, Eye
} from 'lucide-react';
import clsx from 'clsx';
import { SAMPLE_TEST_PLANTS } from '../data/natureData';

export default function FieldStationView({
  activeMission,
  onStartQuest,
  onOpenScanner,
  onNavigate,
  recentPlants,
  questsPreview,
  trailsPreview,
  onSelectFile,
  selectedFilePreview,
  onTriggerAnalyze,
  onTriggerSampleTest,
  isProcessing
}) {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12">
      
      {/* ============================================================== */}
      {/* HERO: FIELD STATION */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#080d08] via-[#060a06] to-[#040604] border border-stone-800/80 p-7 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <span className="text-[10px] font-mono font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/80 inline-block mb-3">
            FIELD STATION
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15] mb-3">
            Discover what is growing around you.
          </h1>

          <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed mb-6">
            Scan a plant you find outdoors, learn what you can observe, and turn discoveries into field quests.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenScanner}
              className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4 text-stone-950" />
              <span>SCAN A PLANT</span>
            </button>

            <button
              onClick={() => onNavigate('quests')}
              className="bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700/80 px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Target className="w-4 h-4 text-emerald-400" />
              <span>VIEW QUESTS</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 1: ACTIVE QUEST */}
      {/* ============================================================== */}
      <section className="bg-stone-900/60 border border-stone-800/90 rounded-[2rem] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-emerald-400 font-bold uppercase tracking-wider">ACTIVE QUEST</span>
            <span className="text-stone-600">•</span>
            <span className="text-stone-300">{activeMission?.category || 'PLANT OBSERVATION'}</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-stone-400">
            <span>{activeMission?.duration || '15 MIN'}</span>
            <span>•</span>
            <span className="text-stone-300 font-bold">{activeMission?.difficulty || 'EASY'}</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">+{activeMission?.reward || 40} XP</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug mb-2">
              {activeMission?.task || activeMission?.objective || activeMission?.title}
            </h3>
            <p className="text-xs text-stone-400 font-sans leading-relaxed">
              {activeMission?.hint || 'Explore nearby and observe foliage with your own eyes before touching.'}
            </p>
          </div>

          <button
            onClick={() => onStartQuest(activeMission)}
            className="self-start md:self-auto bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 font-black px-7 py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all shrink-0"
          >
            <Compass className="w-4 h-4 text-stone-950" />
            <span>START QUEST</span>
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: PLANT SCANNER (PLANT SCOUT) */}
      {/* ============================================================== */}
      <section className="bg-gradient-to-br from-stone-900/50 to-[#070a07] border border-stone-800/90 rounded-[2.5rem] p-7 sm:p-10 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-stone-800 mb-6 font-mono text-xs">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block mb-0.5">
              PRIMARY FEATURE
            </span>
            <h3 className="text-2xl font-black text-white font-sans">
              PLANT SCOUT
            </h3>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-stone-300 bg-stone-950/80 px-3.5 py-1.5 rounded-xl border border-stone-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>LOCAL AI • PROCESSING ON DEVICE</span>
          </div>
        </div>

        {/* Dropzone Container */}
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) onSelectFile(file);
          }}
          className={clsx(
            "relative rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center flex flex-col items-center justify-center transition-all",
            selectedFilePreview 
              ? "border-emerald-500/50 bg-stone-950/80" 
              : "border-stone-800 bg-stone-950/40 hover:border-emerald-500/40 hover:bg-stone-900/30"
          )}
        >
          {selectedFilePreview ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-stone-700 shadow-2xl max-h-[240px] max-w-sm">
                <img 
                  src={selectedFilePreview} 
                  alt="Captured plant discovery" 
                  className="w-full h-full object-cover max-h-[240px]"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onTriggerAnalyze}
                  disabled={isProcessing}
                  className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-stone-950" />
                  <span>ANALYZE LOCALLY</span>
                </button>
                <button
                  onClick={() => onSelectFile(null)}
                  className="text-xs font-mono text-stone-400 hover:text-rose-400 px-3 py-2 underline"
                >
                  Clear Photo
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 max-w-md">
              <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-800 text-emerald-400 flex items-center justify-center shadow-inner">
                <Leaf className="w-7 h-7" />
              </div>

              <h4 className="text-lg font-bold text-white">
                Bring a discovery from the field.
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed font-sans">
                Photograph a leaf, blossom, or bark outdoors. Drag & drop image here or open your camera.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onOpenScanner}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-stone-950" />
                  <span>OPEN CAMERA</span>
                </button>

                <label className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>CHOOSE PHOTO</span>
                  <input 
                    type="file" 
                    accept="image/jpeg,image/png,image/webp" 
                    className="hidden" 
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onSelectFile(f);
                    }}
                  />
                </label>
              </div>

              <span className="text-[10px] font-mono text-stone-400 mt-2">
                SUPPORTED: JPG • PNG • WEBP
              </span>
            </div>
          )}
        </div>

        {/* Desktop Trial Specimen Quick Tests */}
        <div className="mt-6 pt-6 border-t border-stone-800/80">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-stone-300 font-bold uppercase flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-teal-400" />
              DESKTOP VERIFICATION SAMPLES
            </span>
            <span className="text-stone-400 text-[10px]">NO CAMERA? TEST GEMMA 3 HERE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SAMPLE_TEST_PLANTS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => onTriggerSampleTest(sample)}
                className="p-3 rounded-2xl bg-stone-950/60 hover:bg-stone-900 border border-stone-800 hover:border-emerald-500/50 text-left transition-all cursor-pointer group"
              >
                <span className="text-[10px] font-mono text-emerald-400 block">{sample.category}</span>
                <h5 className="text-xs font-bold text-stone-200 group-hover:text-white truncate mt-0.5">
                  {sample.name}
                </h5>
                <span className="text-[10px] font-mono text-stone-400 mt-1 block">+{sample.xp} XP</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: RECENT DISCOVERIES & FIELD CODEX PREVIEW */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-800">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              FIELD JOURNAL PREVIEW
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">
              Recent Discoveries
            </h3>
          </div>

          <button
            onClick={() => onNavigate('codex')}
            className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View Full Codex</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {recentPlants.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              onClick={() => onNavigate('codex')}
              className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-5 shadow-lg hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2 font-mono text-[10px]">
                  <span className="text-emerald-400 font-bold uppercase">{item.category}</span>
                  <span className="text-stone-300">{item.confidence} Confidence</span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {item.name}
                </h4>
                <p className="text-xs text-stone-400 line-clamp-2 mt-2 leading-relaxed font-sans">
                  {item.fieldNotes}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/60 mt-4 flex items-center justify-between text-[10px] font-mono text-stone-300">
                <span>{item.date}</span>
                <span className="text-emerald-400 font-bold">+{item.xp || 50} XP</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: QUESTS PREVIEW */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-800">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              OUTDOOR MISSIONS
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">
              Recommended Quests
            </h3>
          </div>

          <button
            onClick={() => onNavigate('quests')}
            className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>All Quests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {questsPreview.slice(0, 3).map((q) => (
            <div 
              key={q.id}
              className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-2">
                  <span className="text-emerald-400 font-bold uppercase">{q.category}</span>
                  <span>{q.duration} • {q.difficulty}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  {q.title}
                </h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed mb-4">
                  {q.objective}
                </p>
              </div>

              <button
                onClick={() => onStartQuest(q)}
                className="w-full py-2.5 rounded-xl bg-stone-950 hover:bg-emerald-500 hover:text-stone-950 text-stone-300 text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-2 border border-stone-800 hover:border-emerald-500 cursor-pointer"
              >
                <span>Start Mission</span>
                <span className="text-emerald-400 group-hover:text-stone-950 font-normal">+{q.reward} XP</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: TRAILS PREVIEW */}
      {/* ============================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-800">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              LOCAL TRAIL GUIDE
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">
              Curated Walking Routes
            </h3>
          </div>

          <button
            onClick={() => onNavigate('trails')}
            className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Browse All Trails</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {trailsPreview.slice(0, 2).map((trail) => (
            <div 
              key={trail.id}
              onClick={() => onNavigate('trails')}
              className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 shadow-lg hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-2">
                  <span className="text-stone-300 font-semibold">{trail.area}</span>
                  <span className="text-emerald-400 font-bold">{trail.distance} • {trail.duration}</span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                  {trail.name}
                </h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed mb-3">
                  Terrain: {trail.terrain}
                </p>
                <div className="text-[11px] text-stone-300 font-sans">
                  <strong>Best for:</strong> {trail.bestFor}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800/60 mt-4 flex items-center justify-between text-[10px] font-mono text-stone-400">
                <span>DIFFICULTY: {trail.difficulty.toUpperCase()}</span>
                <span className="text-emerald-400 font-bold group-hover:underline">View Trail Route →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
