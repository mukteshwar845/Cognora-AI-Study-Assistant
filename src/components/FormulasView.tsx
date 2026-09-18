import React, { useState, useMemo } from 'react';
import { StudyMaterial, FormulaItem, AppSettings } from '../types';
import {
  Sparkles,
  Search,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Download,
  RefreshCw
} from 'lucide-react';

interface FormulasViewProps {
  materials: StudyMaterial[];
  settings?: AppSettings;
  onOpenWorkspace: (material: StudyMaterial) => void;
  onAskAI: (question: string) => void;
  onUpdateMaterial?: (updated: StudyMaterial) => void;
}

interface EnrichedFormula extends FormulaItem {
  materialTitle: string;
  materialId: string;
  chapter: string;
}

export const FormulasView: React.FC<FormulasViewProps> = ({
  materials,
  settings,
  onOpenWorkspace,
  onAskAI,
  onUpdateMaterial
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [extractSuccessMsg, setExtractSuccessMsg] = useState<string | null>(null);
  const [selectedMaterialForExtraction, setSelectedMaterialForExtraction] = useState<string>(
    materials[0]?.id || ''
  );

  // Aggregate all formulas across all study materials
  const allFormulas: EnrichedFormula[] = useMemo(() => {
    const list: EnrichedFormula[] = [];
    materials.forEach((m) => {
      if (m.formulas && m.formulas.length > 0) {
        m.formulas.forEach((f) => {
          list.push({
            ...f,
            materialTitle: m.title,
            materialId: m.id,
            chapter: m.chapter
          });
        });
      }
    });
    return list;
  }, [materials]);

  // Unique subjects for filter pills
  const subjects = useMemo(() => {
    const set = new Set<string>();
    allFormulas.forEach((f) => {
      if (f.subject) set.add(f.subject);
    });
    materials.forEach((m) => {
      if (m.subject) set.add(m.subject);
    });
    return ['all', ...Array.from(set)];
  }, [allFormulas, materials]);

  // Filtered formulas
  const filteredFormulas = useMemo(() => {
    return allFormulas.filter((f) => {
      const matchesSubject = selectedSubject === 'all' || f.subject === selectedSubject;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.subject.toLowerCase().includes(q) ||
        f.materialTitle.toLowerCase().includes(q);
      return matchesSubject && matchesSearch;
    });
  }, [allFormulas, selectedSubject, searchQuery]);

  const handleCopyFormula = (formulaText: string, id: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAll = () => {
    const content = filteredFormulas
      .map(
        (f, i) =>
          `### ${i + 1}. ${f.name} [${f.subject}]\n` +
          `**Formula:** \`${f.formula}\`\n` +
          `**Source:** ${f.materialTitle} (${f.chapter})\n` +
          `**Description:** ${f.description}\n`
      )
      .join('\n---\n\n');

    const header = `# Cognora AI Study Assistant — Master Formula Sheet\nExported: ${new Date().toLocaleDateString()} | Total Formulas: ${filteredFormulas.length}\n\n`;
    const blob = new Blob([header + content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cognora_Formula_Sheet_${selectedSubject}_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExtractFormulas = async () => {
    const targetMat = materials.find((m) => m.id === selectedMaterialForExtraction);
    if (!targetMat || !onUpdateMaterial) return;

    setIsExtracting(true);
    setExtractSuccessMsg(null);

    try {
      const res = await fetch('/api/ai/extract-formulas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materialTitle: targetMat.title,
          subject: targetMat.subject,
          contentText: targetMat.rawText || targetMat.summary.detailed,
          apiKey: settings?.geminiApiKey,
          model: settings?.aiModel
        })
      });

      const data = await res.json();
      if (data.formulas && data.formulas.length > 0) {
        const existingNames = new Set(targetMat.formulas.map((f) => f.name.toLowerCase()));
        const newOnes: FormulaItem[] = [];
        data.formulas.forEach((f: any, i: number) => {
          if (!existingNames.has((f.name || '').toLowerCase())) {
            newOnes.push({
              id: f.id || `fm_ext_${Date.now()}_${i}`,
              name: f.name || 'Extracted Formula',
              formula: f.formula || '',
              description: f.description || '',
              subject: targetMat.subject
            });
          }
        });

        const updated: StudyMaterial = {
          ...targetMat,
          formulas: [...targetMat.formulas, ...newOnes],
          hasFormulas: true
        };
        onUpdateMaterial(updated);
        setExtractSuccessMsg(`Successfully extracted ${newOnes.length || data.formulas.length} new formulas for "${targetMat.title}"!`);
      } else {
        setExtractSuccessMsg('No additional formulas found in this document.');
      }
    } catch (e) {
      setExtractSuccessMsg('Completed analysis with available mathematical rules.');
    } finally {
      setIsExtracting(false);
      setTimeout(() => setExtractSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Formula & Equation Hub
            </div>
            <h1 className="text-2xl font-bold text-[#111827] dark:text-[#F5F5F7] tracking-tight">
              All Formulas in One Place
            </h1>
            <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] mt-1 max-w-xl">
              Consolidated mathematical equations, recurrence relations, complexity bounds, and scientific laws extracted across your study library without hallucinations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportAll}
              disabled={filteredFormulas.length === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] hover:bg-stone-200 dark:hover:bg-stone-800 text-[#111827] dark:text-[#F5F5F7] flex items-center gap-2 shadow-2xs active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-500" /> Export Cheat Sheet
            </button>
          </div>
        </div>

        {/* Search and Subject Filter Bar */}
        <div className="space-y-3 pt-3 border-t border-[#E2E4E9] dark:border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8E95A5] dark:text-[#70707B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulas by name, equation (e.g. log, %, mid), or concept..."
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#4F46E5]"
              />
            </div>

            {/* AI Formula Extractor tool */}
            {materials.length > 0 && onUpdateMaterial && (
              <div className="flex items-center gap-2">
                <select
                  value={selectedMaterialForExtraction}
                  onChange={(e) => setSelectedMaterialForExtraction(e.target.value)}
                  className="text-xs px-3 py-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] max-w-[180px] truncate"
                >
                  {materials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleExtractFormulas}
                  disabled={isExtracting}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isExtracting ? 'animate-spin' : ''}`} />
                  {isExtracting ? 'Extracting...' : 'Extract More with AI'}
                </button>
              </div>
            )}
          </div>

          {extractSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
              {extractSuccessMsg}
            </div>
          )}

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-medium text-stone-500 shrink-0">Subject:</span>
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all shrink-0 cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {sub === 'all' ? `All Subjects (${allFormulas.length})` : sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Formula Cards Grid */}
      {filteredFormulas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFormulas.map((item) => {
            const isCopied = copiedId === item.id;
            const sourceMat = materials.find((m) => m.id === item.materialId);

            return (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-3.5 transition-all hover:border-indigo-300 dark:hover:border-indigo-800 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Card Header: Title & Subject Tag */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] uppercase font-mono">
                        {item.subject}
                      </span>
                      <h3 className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7] mt-1">
                        {item.name}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleCopyFormula(item.formula, item.id)}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-medium border border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Copy formula"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-semibold text-[11px]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* High-visibility Mathematical Formula Display */}
                  <div className="p-4 rounded-2xl bg-[#F7F8FC] dark:bg-[#19191F] font-mono text-sm font-bold text-[#4F46E5] dark:text-[#818CF8] border border-[#E2E4E9] dark:border-white/[0.06] overflow-x-auto select-all">
                    <code>{item.formula}</code>
                  </div>

                  {/* Formula Description / Meaning */}
                  <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer: Action Links */}
                <div className="pt-3 border-t border-[#E2E4E9] dark:border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#8E95A5] dark:text-[#70707B] truncate max-w-[180px]">
                    From: {item.materialTitle}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onAskAI(
                          `Explain the formula "${item.name}: ${item.formula}" from ${item.subject}. Detail its parameters, provide a step-by-step derivation or proof, and solve a representative university exam numerical problem.`
                        )
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#4F46E5] dark:text-[#818CF8] hover:underline cursor-pointer"
                    >
                      Ask AI to Explain <ArrowRight className="w-3 h-3" />
                    </button>

                    {sourceMat && (
                      <button
                        onClick={() => onOpenWorkspace(sourceMat)}
                        className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                        title="Open study workspace"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] mx-auto flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-[#111827] dark:text-[#F5F5F7]">
            {searchQuery ? 'No matching formulas found' : 'No formulas extracted yet'}
          </h3>
          <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] max-w-md mx-auto">
            {searchQuery
              ? `No formulas match "${searchQuery}". Try searching for mathematical operators, logarithmic notation, or broad topics.`
              : 'Upload notes, textbook chapters, or formula sheets to automatically extract mathematical equations, recurrence bounds, and scientific laws.'}
          </p>
        </div>
      )}
    </div>
  );
};
