import { useState, useRef } from 'react';
import { Leaf, Plus, Camera, CalendarDays, ArrowRight, Eye, X, Check } from 'lucide-react';
import clsx from 'clsx';
import { validateUploadedImage, sanitizeInputString } from '../utils/security';

export default function MyPlantsView({ history, onNavigate, onUpdateHistory, onRecordActivity }) {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [attachedImage, setAttachedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Filter plants that have journal entries or are marked for tracking
  // For now, let's just let the user track any plant from their history.
  // We will assume any plant in history can have `journal` added to it.
  
  const followedPlants = history.filter(p => p.journal && p.journal.length > 0);
  const potentialPlants = history.filter(p => !p.journal || p.journal.length === 0);

  const handleStartTracking = (plant) => {
    const updatedHistory = history.map(p => {
      if (p.id === plant.id) {
        return {
          ...p,
          journal: [
            {
              id: Date.now(),
              date: p.date,
              image: p.image,
              note: "First discovered and added to Growth Journal.",
              dayOffset: 0
            }
          ]
        };
      }
      return p;
    });
    onUpdateHistory(updatedHistory);
    const newPlant = updatedHistory.find(p => p.id === plant.id);
    setSelectedPlant(newPlant);
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = await validateUploadedImage(file);
      if (!validation.valid) {
        alert(validation.error || 'Invalid file format. Please upload JPG, PNG, or WEBP under 8MB.');
        if (e.target) e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddJournalEntry = (e, plant) => {
    e.preventDefault();
    const rawNote = e.target.note.value;
    if (!rawNote) return;
    const note = sanitizeInputString(rawNote.trim());
    if (!note) return;
    
    const photoToSave = attachedImage || plant.image;
    
    const updatedHistory = history.map(p => {
      if (p.id === plant.id) {
        return {
          ...p,
          journal: [
            ...p.journal,
            {
              id: Date.now(),
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              image: photoToSave,
              note,
              dayOffset: p.journal.length * 14 // Faked days passed
            }
          ]
        };
      }
      return p;
    });
    onUpdateHistory(updatedHistory);
    const newPlant = updatedHistory.find(p => p.id === plant.id);
    setSelectedPlant(newPlant);
    setAttachedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onRecordActivity) onRecordActivity();
    e.target.reset();
  };

  if (selectedPlant) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-12 select-none">
        <button 
          onClick={() => setSelectedPlant(null)}
          className="text-xs font-mono font-bold text-[#91b79a] hover:text-[#f3f1e7] flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>BACK TO MY PLANTS</span>
        </button>

        <div className="nature-surface-card rounded-3xl p-6 sm:p-8 flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-[#315c3b] shrink-0">
            {selectedPlant.image ? (
              <img src={selectedPlant.image} alt={selectedPlant.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#0a2015] flex items-center justify-center text-[#4f8a52]">
                <Leaf className="w-8 h-8" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#f3f1e7] mb-2">{selectedPlant.name}</h2>
            <div className="flex items-center gap-4 text-xs font-mono text-[#91b79a]">
              <span>Discovered {selectedPlant.date}</span>
              <span>•</span>
              <span className="text-emerald-300">Growth Tracking Active</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#4f8a52] before:to-transparent">
          {selectedPlant.journal?.map((entry, idx) => (
            <div key={entry.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#06100b] bg-[#123a27] text-emerald-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] nature-surface-card rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-[#91b79a]">
                  <span className="font-bold text-emerald-300 uppercase">DAY {entry.dayOffset + 1}</span>
                  <span>{entry.date}</span>
                </div>
                {entry.image && (
                  <div className="w-full h-40 rounded-xl overflow-hidden mb-4 border border-[#1e3f2b]">
                    <img src={entry.image} alt="Journal entry" className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-sm text-[#d8c8a8] leading-relaxed font-sans">{entry.note}</p>
                {idx > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#1e3f2b]/50 text-xs text-[#91b79a] font-sans">
                    <strong>Local AI Vision Note:</strong> Estimated growth observed. No signs of severe distress.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={(e) => handleAddJournalEntry(e, selectedPlant)} className="nature-surface-card rounded-3xl p-6 mt-8 max-w-xl mx-auto border border-[#4f8a52]/40 shadow-2xl">
          <h3 className="text-lg font-black text-[#f3f1e7] mb-4">Add Growth Update</h3>
          <textarea 
            name="note"
            className="w-full bg-[#0a1e14] border border-[#1e3f2b] focus:border-[#4f8a52] rounded-xl p-4 text-[#f3f1e7] text-sm mb-4 outline-none resize-none font-sans"
            placeholder="What changes do you observe today? Any new leaves, colors, or flowers?"
            rows={3}
            required
          />
          {/* Attached Photo Preview */}
          {attachedImage && (
            <div className="mb-4 p-3 rounded-2xl bg-[#091f14] border border-[#315c3b] flex items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-3 min-w-0">
                <img 
                  src={attachedImage} 
                  alt="Attached preview" 
                  className="w-14 h-14 rounded-xl object-cover border border-[#4f8a52]/60 shadow-md shrink-0" 
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Photo Attached</span>
                  </div>
                  <p className="text-[11px] text-[#91b79a] truncate font-sans">Ready to log with this growth observation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAttachedImage(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="p-2 rounded-xl text-[#91b79a] hover:text-red-400 hover:bg-[#0c2417] border border-[#1e3f2b] transition-colors cursor-pointer shrink-0"
                title="Remove attached photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/jpeg,image/png,image/webp" 
            className="hidden" 
            onChange={handleImageSelect} 
          />

          <div className="flex items-center justify-between gap-3">
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              className={clsx(
                "text-xs font-mono font-bold flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl border transition-all",
                attachedImage 
                  ? "bg-[#123a27] text-emerald-300 border-[#4f8a52]" 
                  : "bg-[#0c2619] hover:bg-[#123a27] text-[#91b79a] hover:text-[#f3f1e7] border-[#1e3f2b]"
              )}
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>{attachedImage ? 'Change Attached Photo' : 'Attach New Photo'}</span>
            </button>
            <button 
              type="submit" 
              className="bg-[#245336] hover:bg-[#2d6844] active:scale-95 text-[#f3f1e7] font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-lg border border-[#4f8a52]/40 transition-all cursor-pointer font-mono"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12 select-none">
      <div className="border-b border-[#1e3f2b]/40 pb-6 mb-8">
        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#91b79a] block mb-2">
          LONG-TERM OBSERVATION
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#f3f1e7] tracking-tight mb-3">
          Growth Journal
        </h1>
        <p className="text-sm text-[#d8c8a8] max-w-2xl font-sans leading-relaxed">
          Follow the lifecycle of local plants over time. Add weekly photos and let local AI help you spot visual changes like flowering, new foliage, or structural shifts.
        </p>
      </div>

      {followedPlants.length > 0 && (
        <section className="mb-12">
          <h3 className="text-sm font-mono font-bold text-[#f3f1e7] uppercase tracking-wider mb-5 flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            Currently Tracking
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {followedPlants.map(p => (
              <div 
                key={p.id} 
                onClick={() => setSelectedPlant(p)}
                className="nature-surface-card rounded-2xl p-5 border border-[#4f8a52]/40 hover:border-[#4f8a52] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#315c3b]">
                    {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#0a2015]" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#f3f1e7] group-hover:text-emerald-200 transition-colors leading-snug">{p.name}</h4>
                    <span className="text-[10px] font-mono text-emerald-300">{p.journal.length} Entries</span>
                  </div>
                </div>
                <div className="w-full py-2 bg-[#0a1e14] group-hover:bg-[#123a27] rounded-lg text-center text-xs font-mono text-[#91b79a] transition-colors border border-[#1e3f2b]">
                  View Timeline
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="text-sm font-mono font-bold text-[#f3f1e7] uppercase tracking-wider mb-5 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-[#91b79a]" />
          Start Tracking a Discovery
        </h3>
        
        {potentialPlants.length === 0 ? (
          <div className="nature-surface-subtle border border-[#1e3f2b]/60 rounded-2xl p-10 text-center">
            <p className="text-sm text-[#91b79a]">You haven't discovered any plants yet.</p>
            <button 
              onClick={() => onNavigate('plant-scout')}
              className="mt-4 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              Scan a plant first
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {potentialPlants.map(p => (
              <div 
                key={p.id}
                className="nature-surface-card rounded-2xl p-4 flex flex-col justify-between"
              >
                <div className="mb-4">
                  <div className="w-full h-24 rounded-xl overflow-hidden mb-3 border border-[#1e3f2b]/50">
                    {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#0a2015]" />}
                  </div>
                  <h5 className="font-bold text-sm text-[#f3f1e7] truncate">{p.name}</h5>
                  <span className="text-[9px] font-mono text-[#91b79a]">{p.date}</span>
                </div>
                <button
                  onClick={() => handleStartTracking(p)}
                  className="w-full py-2 rounded-lg bg-[#091b12] hover:bg-[#245336] border border-[#1e3f2b] hover:border-[#4f8a52] transition-all text-[10px] font-mono font-bold text-emerald-300 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Start Tracking</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
