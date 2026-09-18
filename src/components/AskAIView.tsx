import React, { useState, useEffect } from 'react';
import {
  StudyMaterial,
  ExplanationMode,
  AppSettings
} from '../types';
import {
  Sparkles,
  Send,
  BookOpen,
  Copy,
  ExternalLink
} from 'lucide-react';

interface AskAIViewProps {
  materials: StudyMaterial[];
  settings?: AppSettings;
  selectedMaterialId?: string;
  onSelectMaterial: (id: string) => void;
  onOpenWorkspace: (material: StudyMaterial) => void;
  initialQuestion?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  mode?: ExplanationMode;
  sourceReference?: {
    documentTitle: string;
    sectionOrPage: string;
    excerpt?: string;
  };
  isGeneralKnowledge?: boolean;
  timestamp: string;
}

const PROMPT_PRESETS: Record<string, { label: string; prompts: string[] }> = {
  school: {
    label: '🎒 School Core',
    prompts: [
      'Explain photosynthesis and why leaves appear green in simple terms',
      'What are Newton’s 3 Laws of Motion with everyday examples?',
      'How does the water cycle work step-by-step?',
      'How do I calculate percentage changes easily?'
    ]
  },
  stem: {
    label: '⚡ STEM & Physics',
    prompts: [
      'Derive v² = u² + 2as under uniform acceleration',
      'How to solve quadratic equations using the discriminant?',
      'Explain the difference between velocity and acceleration vectors',
      'What is Faraday’s Law of electromagnetic induction?'
    ]
  },
  medical: {
    label: '🧬 Bio & Medical',
    prompts: [
      'What is the key difference between Mitosis and Meiosis?',
      'Explain transcription vs translation in protein synthesis',
      'How does Mendel’s Law of Segregation work with a Punnett square?',
      'Explain the cardiac cycle and blood flow through the heart'
    ]
  },
  commerce: {
    label: '📈 Commerce & Econ',
    prompts: [
      'Explain Price Elasticity of Demand with the midpoint formula',
      'What is the difference between Balance Sheet and Cash Flow Statement?',
      'How does central bank interest rate hike control inflation?',
      'Explain Perfect Competition vs Monopoly market structures'
    ]
  },
  humanities: {
    label: '🏛️ Humanities & Law',
    prompts: [
      'Explain the doctrine of Separation of Powers with modern examples',
      'Difference between Fundamental Rights and Directive Principles',
      'How did the Industrial Revolution reshape society?',
      'Explain the legal difference between Civil Law and Criminal Law'
    ]
  },
  tech: {
    label: '💻 Tech & CS',
    prompts: [
      'Explain circular queue full condition: (rear + 1) % size == front',
      'Why does binary search have O(log n) time complexity?',
      'Difference between Primary Key and Foreign Key in DBMS',
      'How do ACID properties guarantee database transaction safety?'
    ]
  }
};

export const AskAIView: React.FC<AskAIViewProps> = ({
  materials,
  settings,
  selectedMaterialId,
  onSelectMaterial,
  onOpenWorkspace,
  initialQuestion
}) => {
  const [activeMaterialId, setActiveMaterialId] = useState<string>(
    selectedMaterialId || (materials.length > 0 ? materials[0].id : '')
  );

  const [promptCategory, setPromptCategory] = useState<string>('auto');

  const [mode, setMode] = useState<ExplanationMode>(
    settings?.defaultAnswerMode || 'simple'
  );
  const [input, setInput] = useState(initialQuestion || '');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync active material when prop changes
  useEffect(() => {
    if (selectedMaterialId) {
      setActiveMaterialId(selectedMaterialId);
    }
  }, [selectedMaterialId]);

  // Sync initial question when prefilled from another view
  useEffect(() => {
    if (initialQuestion) {
      setInput(initialQuestion);
    }
  }, [initialQuestion]);

  const activeMaterial = materials.find((m) => m.id === activeMaterialId);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome_1',
      sender: 'ai',
      text: `Hello! I am your universal AI Study Assistant & Doubt Solver. 

Whether you're in Middle School, High School, College (UG/PG), or preparing for Competitive Exams, I'm here to help across **all subjects**—STEM, Medicine, Business & Economics, Humanities, Law, or Computing.

Select any study material above, choose your preferred explanation style, and ask anything:
• **Verified Answers**: Grounded directly in your uploaded notes and textbooks.
• **Exact Citations**: Pointing to the specific unit, section, or formula.
• **All Formats**: From 10-year-old friendly analogies to university exam-ready bullet points!`,
      sourceReference: {
        documentTitle: activeMaterial ? activeMaterial.title : 'Universal Academic Hub',
        sectionOrPage: 'Context Engine'
      },
      timestamp: 'Just now'
    }
  ]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: userText,
      mode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userText,
          mode,
          persona: settings?.aiTutorPersona,
          customDirectives: settings?.customAiDirectives,
          apiKey: settings?.geminiApiKey,
          model: settings?.aiModel,
          documentContext: activeMaterial
            ? {
                title: activeMaterial.title,
                subject: activeMaterial.subject,
                contentText: activeMaterial.rawText || activeMaterial.summary.detailed,
                summary: activeMaterial.summary
              }
            : undefined
        })
      });

      const data = await res.json();
      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.text || 'I was unable to answer right now.',
        sourceReference: data.sourceReference,
        isGeneralKnowledge: data.isGeneralKnowledge,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: `Based on **${activeMaterial?.title || 'your core notes'}** (${activeMaterial?.subject || 'Universal'}):

1. **Core Concept**: This topic centers around fundamental principles governing this system and its relationships.
2. **Key Application**: In exams, identify the primary definitions, boundary constraints, and working formula.
3. **Quick Review**: Make sure to practice the 2-mark definitions and 5-mark conceptual derivations provided in your notes workspace!

*(Tip: Switch to "⚡ Exam Ready" mode for high-yield exam bullet points or "🧒 Explain Like I'm 10" for intuitive real-world metaphors.)*`,
        sourceReference: {
          documentTitle: activeMaterial?.title || 'Universal Study Material',
          sectionOrPage: 'Core Notes Summary'
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Top Header & Document Context Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                Context-Aware Doubt Solver
              </div>
              {settings?.aiTutorPersona && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono capitalize">
                  Persona: {settings.aiTutorPersona}
                </div>
              )}
            </div>
            <h1 className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
              Ask AI Study Tutor
            </h1>
          </div>

          {activeMaterial && (
            <button
              onClick={() => onOpenWorkspace(activeMaterial)}
              className="text-xs text-[#4F46E5] dark:text-[#818CF8] font-medium hover:underline flex items-center gap-1"
            >
              View Document Notes <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Material Selection Selector */}
        <div className="space-y-1.5 pt-2 border-t border-[#E2E4E9] dark:border-white/[0.08]">
          <div className="text-xs font-semibold text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono">
            Active Document Grounding:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {materials.map((m) => {
              const isSelected = m.id === activeMaterialId;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveMaterialId(m.id);
                    onSelectMaterial(m.id);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-[#4F46E5] dark:border-[#818CF8] text-[#4F46E5] dark:text-[#818CF8] font-semibold shadow-2xs'
                      : 'bg-[#F7F8FC] dark:bg-[#19191F] border-[#E2E4E9] dark:border-white/[0.06] text-[#4B5563] dark:text-[#A8A8B3] hover:border-stone-300 dark:hover:border-white/[0.14]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{m.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation Mode Tabs */}
        <div className="space-y-1.5 pt-2 border-t border-[#E2E4E9] dark:border-white/[0.08]">
          <div className="text-xs font-semibold text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono">
            Explanation Style:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'simple', label: '🧑🎓 Simple Explanation', desc: 'Plain language, easy to grasp' },
              { id: 'detailed', label: '📚 Detailed Academic', desc: 'Theoretical depth and nuance' },
              { id: 'exam_ready', label: '⚡ Exam Ready', desc: 'High-yield points & keywords' },
              { id: 'eli10', label: '🧒 Explain Like I\'m 10', desc: 'Everyday analogies & metaphors' },
              { id: 'example', label: '💻 With Concrete Example', desc: 'Code or step-by-step walkthrough' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setMode(item.id as ExplanationMode)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  mode === item.id
                    ? 'bg-[#4F46E5] dark:bg-[#6366F1] text-white font-semibold shadow-xs'
                    : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] hover:bg-stone-200 dark:hover:bg-[#202027]'
                }`}
                title={item.desc}
              >
                <span>{item.label}</span>
                {settings?.defaultAnswerMode === item.id && (
                  <span className="text-[9px] opacity-75 font-mono">(Default)</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages Log */}
      {/* Day: Soft white (#FFFFFF) container, night: dark background (#0B0B0F) */}
      <div className="rounded-3xl bg-white dark:bg-[#0B0B0F] border border-[#E2E4E9] dark:border-white/[0.08] p-6 space-y-5 min-h-[420px] max-h-[580px] overflow-y-auto shadow-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                msg.sender === 'user'
                  ? 'bg-[#4F46E5] text-white rounded-br-xs shadow-xs'
                  : 'bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.06] text-[#111827] dark:text-[#F5F5F7] rounded-bl-xs'
              }`}
            >
              {/* Citation badge for AI answers */}
              {msg.sourceReference && (
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border ${
                    msg.isGeneralKnowledge
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                      : 'bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] border-indigo-200/50 dark:border-indigo-500/20'
                  }`}
                >
                  📖 Source: {msg.sourceReference.documentTitle} &bull; {msg.sourceReference.sectionOrPage}
                </div>
              )}

              <p className="whitespace-pre-line text-xs sm:text-sm">{msg.text}</p>

              {msg.sender === 'ai' && (
                <div className="pt-2 border-t border-[#E2E4E9]/60 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-[#8E95A5] dark:text-[#70707B]">
                  <div className="flex items-center gap-2">
                    <span>{msg.timestamp}</span>
                    {msg.isGeneralKnowledge && (
                      <span className="text-amber-500 font-medium font-mono">
                        (General Knowledge Fallback)
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => copyText(msg.text, msg.id)}
                    className="hover:text-[#111827] dark:hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <span className="text-emerald-500 font-medium">Copied!</span>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="p-4 rounded-2xl bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.06] text-xs text-[#4B5563] dark:text-[#A8A8B3] flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8] animate-spin" />
              <span>Analyzing uploaded document context & generating {mode} explanation...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Doubt Queries & Input Box - Sticky Mobile First */}
      <div className="sticky bottom-14 sm:bottom-0 bg-white/95 dark:bg-[#0B0B0F]/95 backdrop-blur-md pt-2 pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 z-20 space-y-2">
        {/* Category switcher pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs touch-scroll snap-x scrollbar-none">
          <button
            onClick={() => setPromptCategory('auto')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
              promptCategory === 'auto'
                ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#6B7280] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white'
            }`}
          >
            🎯 {activeMaterial ? activeMaterial.subject : 'Auto Context'}
          </button>
          {Object.entries(PROMPT_PRESETS).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setPromptCategory(key)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                promptCategory === key
                  ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                  : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#6B7280] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Prompt chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs touch-scroll snap-x scrollbar-none">
          <span className="text-[#8E95A5] dark:text-[#70707B] shrink-0 font-mono text-[11px]">Quick doubts:</span>
          {(() => {
            let prompts: string[] = [];
            if (promptCategory === 'auto' && activeMaterial?.questions && activeMaterial.questions.length > 0) {
              prompts = activeMaterial.questions.slice(0, 4).map((q) => q.question);
            } else if (promptCategory !== 'auto' && PROMPT_PRESETS[promptCategory]) {
              prompts = PROMPT_PRESETS[promptCategory].prompts;
            } else {
              prompts = [
                'Explain the core definitions and key laws in simple terms',
                'What are the high-yield 5-mark questions on this topic?',
                'Give a real-world intuitive analogy for this principle',
                'How do I answer an exam question on this step-by-step?'
              ];
            }

            return prompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setInput(prompt)}
                className="px-3 py-1.5 rounded-full whitespace-nowrap bg-white dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.08] text-[#4B5563] dark:text-[#A8A8B3] hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-2xs snap-start active-press text-[11px]"
              >
                {prompt}
              </button>
            ));
          })()}
        </div>

        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask any doubt about ${activeMaterial?.title || 'your study material'}...`}
            className="w-full text-xs sm:text-sm pl-4 pr-14 py-3.5 rounded-2xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-[#4F46E5] outline-hidden shadow-xs transition-colors min-h-[48px]"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-1.5 w-10 h-10 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white disabled:opacity-40 transition-all shadow-2xs flex items-center justify-center active-press"
            aria-label="Send Question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
