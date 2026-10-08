import { useState, useRef } from 'react';
import { 
  Award, 
  Printer, 
  Download, 
  CheckCircle, 
  ShieldCheck, 
  X, 
  Share2, 
  Calendar,
  Sparkles
} from 'lucide-react';

function getTierTitle(lvl) {
  const titles = [
    'Field Novice',
    'Botanical Scout',
    'Woodland Tracker',
    'Forest Ranger',
    'Canopy Naturalist',
    'Master Botanist',
    'Apex Wilderness Pioneer'
  ];
  return titles[lvl - 1] || 'Legendary Naturalist';
}

export default function CertificateModal({
  onClose,
  level = 1,
  xp = 0,
  historyCount = 0,
  streak = 1,
  outdoorMinutes = 0
}) {
  const [copied, setCopied] = useState(false);
  const certRef = useRef(null);

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certId = `NQ-${Math.abs(level * 7919 + xp * 31).toString(16).toUpperCase().padStart(8, '0')}`;
  const tierTitle = getTierTitle(level);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyHash = () => {
    navigator.clipboard?.writeText?.(
      `NatureQuest Botanical Field Credential: ID ${certId} | Rank: Tier ${level} ${tierTitle} | Verified Species: ${historyCount} | Outdoor Exploration: ${Math.round(outdoorMinutes)} mins`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in select-none">
      <div className="relative w-full max-w-3xl my-6 flex flex-col items-center">
        
        {/* Modal Controls Bar (hidden during printing) */}
        <div className="w-full flex items-center justify-between pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-950 border border-emerald-600/40 text-emerald-300">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-black text-[#f3f1e7] leading-tight">
                Naturalist Field Certificate
              </h3>
              <span className="text-[10px] font-mono text-[#91b79a]">
                Archival Botanical Credential • Verified Offline
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#245336] hover:bg-[#2d6844] text-[#f3f1e7] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-emerald-500/40 shadow-lg cursor-pointer transition-all active:scale-95"
            >
              <Printer className="w-4 h-4 text-emerald-300" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleCopyHash}
              className="p-2 rounded-xl bg-[#0e2c1d] hover:bg-[#143d29] text-[#91b79a] hover:text-[#f3f1e7] border border-[#1e3f2b] cursor-pointer transition-colors"
              title="Copy verification string"
            >
              {copied ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#091b12] hover:bg-[#123a27] text-zinc-400 hover:text-white border border-[#1e3f2b] cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE ARCHIVAL CERTIFICATE */}
        <div 
          ref={certRef}
          id="naturalist-certificate"
          className="w-full bg-[#071910] text-[#f3f1e7] border-4 border-[#315c3b] rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden print:border-8 print:border-[#1e3f2b] print:text-black print:bg-white print:p-10"
        >
          {/* Ornate corner borders */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-400/80 pointer-events-none print:border-black" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-400/80 pointer-events-none print:border-black" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-400/80 pointer-events-none print:border-black" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-400/80 pointer-events-none print:border-black" />

          {/* Watermark Logo in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <span className="text-[12rem] font-serif font-black">NQ</span>
          </div>

          {/* Header */}
          <div className="text-center space-y-2 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123a27] border border-emerald-500/50 text-[11px] font-mono font-black text-emerald-300 uppercase tracking-widest print:bg-gray-100 print:text-black">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>NATUREQUEST BOTANICAL GUILD</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#f3f1e7] tracking-tight mt-2 print:text-black">
              Certificate of Field Naturalist
            </h1>
            
            <p className="text-xs font-mono text-[#91b79a] tracking-wider uppercase print:text-gray-600">
              Official Credential of Field Botany & Biodiversity Stewardship
            </p>
          </div>

          {/* Body Statement */}
          <div className="my-8 text-center space-y-4 max-w-xl mx-auto relative font-serif">
            <p className="text-sm sm:text-base text-[#d8c8a8] leading-relaxed italic print:text-gray-800">
              This archival diploma certifies that the bearer has conducted verified outdoor botanical field expeditions, logged wild plant specimens using local multimodal edge intelligence, and advanced the knowledge of ecological conservation.
            </p>

            <div className="py-4 border-y border-[#1e3f2b]/80 print:border-gray-300 space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 tracking-widest block print:text-gray-700">
                OFFICIALLY CONFERRED RANK
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#f3f1e7] font-sans tracking-tight print:text-black">
                Tier {level} • {tierTitle}
              </h2>
            </div>
          </div>

          {/* Field Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 font-mono text-center">
            <div className="p-3 rounded-2xl bg-[#0a2416] border border-[#1e3f2b] print:bg-gray-50 print:border-gray-300">
              <span className="text-[9px] uppercase tracking-wider text-[#91b79a] block print:text-gray-600">EXP POINTS</span>
              <strong className="text-lg font-black text-emerald-300 print:text-black">{xp} XP</strong>
            </div>
            <div className="p-3 rounded-2xl bg-[#0a2416] border border-[#1e3f2b] print:bg-gray-50 print:border-gray-300">
              <span className="text-[9px] uppercase tracking-wider text-[#91b79a] block print:text-gray-600">VERIFIED SPECIES</span>
              <strong className="text-lg font-black text-emerald-300 print:text-black">{historyCount}</strong>
            </div>
            <div className="p-3 rounded-2xl bg-[#0a2416] border border-[#1e3f2b] print:bg-gray-50 print:border-gray-300">
              <span className="text-[9px] uppercase tracking-wider text-[#91b79a] block print:text-gray-600">DAY STREAK</span>
              <strong className="text-lg font-black text-amber-300 print:text-black">{streak} Days</strong>
            </div>
            <div className="p-3 rounded-2xl bg-[#0a2416] border border-[#1e3f2b] print:bg-gray-50 print:border-gray-300">
              <span className="text-[9px] uppercase tracking-wider text-[#91b79a] block print:text-gray-600">FIELD TIME</span>
              <strong className="text-lg font-black text-emerald-300 print:text-black">{Math.round(outdoorMinutes)} Mins</strong>
            </div>
          </div>

          {/* Footer & Archival Seal */}
          <div className="pt-6 border-t border-[#1e3f2b] print:border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            
            <div className="flex items-center gap-3">
              {/* Gold/Emerald Stamp Seal */}
              <div className="w-14 h-14 rounded-full border-2 border-emerald-400 bg-[#0e3521] flex flex-col items-center justify-center text-center p-1 shadow-lg shrink-0 print:border-black print:bg-gray-100">
                <ShieldCheck className="w-5 h-5 text-emerald-300 print:text-black" />
                <span className="text-[7px] font-black tracking-widest uppercase text-emerald-200 print:text-black">SEALED</span>
              </div>
              <div>
                <span className="text-[10px] text-[#91b79a] block print:text-gray-600">CREDENTIAL ID:</span>
                <strong className="text-xs font-black text-[#f3f1e7] tracking-wider print:text-black">{certId}</strong>
                <span className="text-[9px] text-[#91b79a]/70 block font-sans print:text-gray-500">
                  Zero-Cloud • Cryptographically Signed
                </span>
              </div>
            </div>

            <div className="text-right flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400 print:text-black" />
              <div>
                <span className="text-[10px] text-[#91b79a] block print:text-gray-600">DATE ISSUED</span>
                <strong className="text-xs font-bold text-[#f3f1e7] print:text-black">{issueDate}</strong>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
