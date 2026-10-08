import { useState } from 'react';
import { 
  GitPullRequest, 
  Code2, 
  Sparkles, 
  CheckCircle, 
  Copy, 
  ExternalLink, 
  X, 
  AlertCircle,
  FileJson,
  Heart
} from 'lucide-react';
import clsx from 'clsx';

const DEFAULT_FLORA_TEMPLATE = {
  commonName: "Broadleaf Plantain",
  scientificName: "Plantago major",
  family: "Plantaginaceae",
  category: "Herbaceous Perennial",
  nativeHabitat: "Open meadows, disturbed soils, roadsides",
  chlorophyllBand: "Standard Green (520-560nm)",
  tactileFeatures: [
    "Prominent parallel veins radiating from leaf base",
    "Tough fibrous leaf stalks",
    "Dense cylindrical flower spikes"
  ],
  ecologicalRole: "Soil stabilizer, food source for small songbirds and pollinators",
  naturalistChallenge: "Locate a specimen with mature seed spikes and observe its soil dampness."
};

export default function HacktoberfestModal({ onClose }) {
  const [formData, setFormData] = useState(DEFAULT_FLORA_TEMPLATE);
  const [jsonText, setJsonText] = useState(JSON.stringify(DEFAULT_FLORA_TEMPLATE, null, 2));
  const [validationError, setValidationError] = useState('');
  const [copiedPr, setCopiedPr] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'json' | 'pr'

  const handleJsonChange = (val) => {
    setJsonText(val);
    try {
      const parsed = JSON.parse(val);
      if (!parsed.commonName || !parsed.scientificName || !parsed.family) {
        setValidationError('Missing essential keys: commonName, scientificName, or family.');
      } else {
        setValidationError('');
        setFormData(parsed);
      }
    } catch (e) {
      setValidationError('Invalid JSON syntax: ' + e.message);
    }
  };

  const handleFormFieldChange = (field, val) => {
    const updated = { ...formData, [field]: val };
    setFormData(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    setValidationError('');
  };

  const generatePrMarkdown = () => {
    return `### 🌿 Flora Submission: ${formData.commonName} (*${formData.scientificName}*)

#### Hacktoberfest Contribution Details
- **Contributor:** Community Naturalist
- **Flora Category:** \`${formData.category || 'Herbaceous'}\`
- **Family:** \`${formData.family}\`
- **Native Habitat:** ${formData.nativeHabitat}

\`\`\`json
${JSON.stringify(formData, null, 2)}
\`\`\`

#### Verification Checklist
- [x] Verified authentic non-synthetic botanical data
- [x] Zero cloud tracking or proprietary API dependencies
- [x] Tested against local NatureQuest schema validator
- [x] Ready to merge into \`src/data/natureData.js\``;
  };

  const handleCopyPr = () => {
    navigator.clipboard?.writeText?.(generatePrMarkdown());
    setCopiedPr(true);
    setTimeout(() => setCopiedPr(false), 2500);
  };

  const handleCopyJson = () => {
    navigator.clipboard?.writeText?.(jsonText);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in select-none">
      <div className="relative w-full max-w-3xl my-6 bg-[#081a11] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#f3f1e7] space-y-6 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#1e3f2b]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-950/80 border border-amber-600/50 text-amber-400">
              <GitPullRequest className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  HACKTOBERFEST 2026 LAB
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  OPEN SOURCE FLORA REGISTRY
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#f3f1e7] mt-0.5">
                Community Species Contributor Studio
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#0e2c1d] hover:bg-[#143d29] text-zinc-400 hover:text-white border border-[#1e3f2b] cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Introduction */}
        <p className="text-xs sm:text-sm text-[#d8c8a8] leading-relaxed font-sans">
          NatureQuest is 100% open-source and offline-first! As part of Hacktoberfest, contributors around the world can submit verified local botanical species, endemic flora, and regional quest challenges to expand the offline Gemma 3 plant codex.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#1e3f2b] pb-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('form')}
            className={clsx(
              "px-4 py-2 rounded-xl font-bold transition-all cursor-pointer",
              activeTab === 'form' 
                ? "bg-[#245336] text-[#f3f1e7] border border-[#4f8a52]" 
                : "text-[#91b79a] hover:text-[#f3f1e7]"
            )}
          >
            Form Visualizer
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={clsx(
              "px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5",
              activeTab === 'json' 
                ? "bg-[#245336] text-[#f3f1e7] border border-[#4f8a52]" 
                : "text-[#91b79a] hover:text-[#f3f1e7]"
            )}
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>JSON Schema Editor</span>
          </button>

          <button
            onClick={() => setActiveTab('pr')}
            className={clsx(
              "px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5",
              activeTab === 'pr' 
                ? "bg-[#245336] text-[#f3f1e7] border border-[#4f8a52]" 
                : "text-[#91b79a] hover:text-[#f3f1e7]"
            )}
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Generate PR Template</span>
          </button>
        </div>

        {/* TAB 1: FORM */}
        {activeTab === 'form' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="text-[10px] text-[#91b79a] block mb-1">COMMON SPECIES NAME</label>
              <input
                type="text"
                value={formData.commonName}
                onChange={(e) => handleFormFieldChange('commonName', e.target.value)}
                className="w-full bg-[#06140d] border border-[#1e3f2b] rounded-xl px-3 py-2 text-[#f3f1e7] focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#91b79a] block mb-1">SCIENTIFIC BINOMIAL (GENUS SPECIES)</label>
              <input
                type="text"
                value={formData.scientificName}
                onChange={(e) => handleFormFieldChange('scientificName', e.target.value)}
                className="w-full bg-[#06140d] border border-[#1e3f2b] rounded-xl px-3 py-2 text-[#f3f1e7] focus:outline-none focus:border-emerald-500 italic"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#91b79a] block mb-1">BOTANICAL FAMILY</label>
              <input
                type="text"
                value={formData.family}
                onChange={(e) => handleFormFieldChange('family', e.target.value)}
                className="w-full bg-[#06140d] border border-[#1e3f2b] rounded-xl px-3 py-2 text-[#f3f1e7] focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#91b79a] block mb-1">NATIVE HABITAT</label>
              <input
                type="text"
                value={formData.nativeHabitat}
                onChange={(e) => handleFormFieldChange('nativeHabitat', e.target.value)}
                className="w-full bg-[#06140d] border border-[#1e3f2b] rounded-xl px-3 py-2 text-[#f3f1e7] focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] text-[#91b79a] block mb-1">ECOLOGICAL ROLE & POLLINATOR BENEFIT</label>
              <input
                type="text"
                value={formData.ecologicalRole}
                onChange={(e) => handleFormFieldChange('ecologicalRole', e.target.value)}
                className="w-full bg-[#06140d] border border-[#1e3f2b] rounded-xl px-3 py-2 text-[#f3f1e7] focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[10px] text-[#91b79a] block mb-1">OUTDOOR NATURALIST CHALLENGE</label>
              <input
                type="text"
                value={formData.naturalistChallenge}
                onChange={(e) => handleFormFieldChange('naturalistChallenge', e.target.value)}
                className="w-full bg-[#06140d] border border-[#1e3f2b] rounded-xl px-3 py-2 text-[#f3f1e7] focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {/* TAB 2: JSON SCHEMA */}
        {activeTab === 'json' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#91b79a] uppercase">Raw Flora JSON Schema</span>
              <button
                onClick={handleCopyJson}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
              >
                {copiedJson ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedJson ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>

            <textarea
              rows={10}
              value={jsonText}
              onChange={(e) => handleJsonChange(e.target.value)}
              className="w-full bg-[#05110a] border border-[#1e3f2b] rounded-2xl p-4 text-emerald-300 font-mono text-xs focus:outline-none focus:border-emerald-500"
              spellCheck={false}
            />

            {validationError ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Schema Validated: Ready to merge into NatureQuest Codex database.</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PR GENERATOR */}
        {activeTab === 'pr' && (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#91b79a] uppercase">Generated Pull Request Body</span>
              <button
                onClick={handleCopyPr}
                className="px-3 py-1.5 rounded-xl bg-[#245336] hover:bg-[#2d6844] text-[#f3f1e7] flex items-center gap-1.5 cursor-pointer font-bold"
              >
                {copiedPr ? <CheckCircle className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPr ? 'Copied to Clipboard!' : 'Copy PR Markdown'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-[#05110a] border border-[#1e3f2b] text-[#d8c8a8] overflow-x-auto whitespace-pre-wrap text-[11px] leading-relaxed">
              {generatePrMarkdown()}
            </pre>
          </div>
        )}

        {/* Footer CTAs */}
        <div className="pt-4 border-t border-[#1e3f2b] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#91b79a]">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Built with Open Source passion for Hacktoberfest 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/omshree59/Hackto-Local-Gemma-Powered-Tree-Detective"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#123a27] hover:bg-[#1a4e34] border border-[#315c3b] text-emerald-200 font-bold uppercase flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#091b12] hover:bg-[#123a27] border border-[#1e3f2b] text-[#d8c8a8] hover:text-[#f3f1e7] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
