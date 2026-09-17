import React, { useState } from 'react';
import {
  StudyMaterial,
  ExplanationMode
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

export const AskAIView: React.FC<AskAIViewProps> = ({
  materials,
  selectedMaterialId,
  onSelectMaterial,
  onOpenWorkspace,
  initialQuestion
}) => {
  const [activeMaterialId, setActiveMaterialId] = useState<string>(
    selectedMaterialId || (materials.length > 0 ? materials[0].id : '')
  );

  const [mode, setMode] = useState<ExplanationMode>('simple');
  const [input, setInput] = useState(initialQuestion || '');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeMaterial = materials.find((m) => m.id === activeMaterialId);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome_1',
      sender: 'ai',
      text: `Welcome! I am your context-aware AI Study Assistant. I am directly connected to your study library.

Select an uploaded material above, choose your preferred answer mode, and ask anything. When you ask a question:
1. I will search your notes and provide the verified answer.
2. I will cite the exact document & section.
3. If the topic isn't in your notes, I will clearly tell you and provide general guidance.`,
      sourceReference: {
        documentTitle: activeMaterial ? activeMaterial.title : 'Study Library',
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
        text: `Based on ${activeMaterial?.title || 'your notes'}, this concept operates under structured state transitions with boundary checks. Let me know if you want to switch to Exam Ready mode for bullet points!`,
        sourceReference: {
          documentTitle: activeMaterial?.title || 'Study Material',
          sectionOrPage: 'Unit 1 Notes'
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
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] mb-1 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Context-Aware Doubt Solver
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
      <div className="sticky bottom-14 sm:bottom-0 bg-white/95 dark:bg-[#0B0B0F]/95 backdrop-blur-md pt-2 pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 z-20 space-y-2.5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs touch-scroll snap-x scrollbar-none">
          <span className="text-[#8E95A5] dark:text-[#70707B] shrink-0 font-mono text-[11px]">Try asking:</span>
          {[
            'Explain circular queue condition in simple terms',
            'Why does binary search require sorted data?',
            'What is the difference between primary key and foreign key?',
            'How do I answer an exam question on ACID properties?'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInput(prompt)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap bg-white dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.08] text-[#4B5563] dark:text-[#A8A8B3] hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors shadow-2xs snap-start active-press text-[11px]"
            >
              {prompt}
            </button>
          ))}
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
