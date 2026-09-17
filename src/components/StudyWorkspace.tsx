import React, { useState, useEffect } from 'react';
import {
  StudyMaterial
} from '../types';
import {
  BookOpen,
  FileText,
  Bookmark,
  Layers,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Send,
  Star,
  Zap,
  Tag,
  ArrowRight,
  RotateCw,
  Lightbulb,
  Check,
  Copy,
  Maximize2,
  Minimize2,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Type
} from 'lucide-react';

interface StudyWorkspaceProps {
  material: StudyMaterial;
  onUpdateMaterial: (updated: StudyMaterial) => void;
  onStartExam: (material: StudyMaterial) => void;
  onAskAIGlobal: (prefillQuestion?: string) => void;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
}

type WorkspaceTab =
  | 'overview'
  | 'summary'
  | 'short_notes'
  | 'key_concepts'
  | 'questions'
  | 'quiz'
  | 'flashcards'
  | 'formulas'
  | 'definitions'
  | 'ask_ai';

export const StudyWorkspace: React.FC<StudyWorkspaceProps> = ({
  material,
  onUpdateMaterial,
  onStartExam,
  isFocusMode = false,
  onToggleFocusMode
}) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('overview');

  // Focus Mode Timer & Display State
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(25);
  const [isLargeText, setIsLargeText] = useState<boolean>(false);

  // Timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerActive) {
      setIsTimerActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timerSeconds]);

  // Keyboard shortcut: Esc exits focus mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode && onToggleFocusMode) {
        onToggleFocusMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode, onToggleFocusMode]);

  const handleResetTimer = (minutes = timerDuration) => {
    setIsTimerActive(false);
    setTimerDuration(minutes);
    setTimerSeconds(minutes * 60);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Flashcard state
  const [currentFcIndex, setCurrentFcIndex] = useState(0);
  const [isFcFlipped, setIsFcFlipped] = useState(false);
  const [fcFilter, setFcFilter] = useState<'all' | 'difficult'>('all');

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | string[]>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Ask AI state within workspace
  const [askInput, setAskInput] = useState('');
  const [askMode, setAskMode] = useState<'simple' | 'detailed' | 'exam_ready' | 'eli10' | 'example'>('simple');
  const [chatMessages, setChatMessages] = useState<
    Array<{
      sender: 'user' | 'ai';
      text: string;
      citation?: string;
      isGeneral?: boolean;
    }>
  >([
    {
      sender: 'ai',
      text: `Hello! I am your AI Study Tutor for **${material.title}**. Every answer I give is grounded directly in this document. Select an explanation mode below and ask me any doubt!`,
      citation: `${material.title} (Overview)`
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Toggle definition important
  const toggleDefinitionImportant = (defId: string) => {
    const updatedDefs = material.definitions.map((d) =>
      d.id === defId ? { ...d, isImportant: !d.isImportant } : d
    );
    onUpdateMaterial({ ...material, definitions: updatedDefs });
  };

  // Toggle flashcard difficulty
  const toggleFlashcardDifficult = (fcId: string) => {
    const updated = material.flashcards.map((f) =>
      f.id === fcId ? { ...f, isDifficult: !f.isDifficult } : f
    );
    onUpdateMaterial({ ...material, flashcards: updated });
  };

  const markFlashcardStatus = (fcId: string, status: 'learning' | 'mastered') => {
    const updated = material.flashcards.map((f) =>
      f.id === fcId ? { ...f, status } : f
    );
    onUpdateMaterial({ ...material, flashcards: updated });
    setIsFcFlipped(false);
    if (currentFcIndex < filteredFlashcards.length - 1) {
      setCurrentFcIndex((prev) => prev + 1);
    }
  };

  const filteredFlashcards = material.flashcards.filter((fc) =>
    fcFilter === 'difficult' ? fc.isDifficult : true
  );

  // Ask AI handler
  const handleAskSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!askInput.trim() || isAiLoading) return;

    const userQ = askInput.trim();
    setAskInput('');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userQ }]);
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/ai/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userQ,
          mode: askMode,
          documentContext: {
            title: material.title,
            subject: material.subject,
            contentText: material.rawText || material.summary.detailed,
            summary: material.summary
          }
        })
      });
      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.text,
          citation: data.sourceReference
            ? `${data.sourceReference.documentTitle} (${data.sourceReference.sectionOrPage})`
            : undefined,
          isGeneral: data.isGeneralKnowledge
        }
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `According to your uploaded ${material.title} notes, this concept follows the core properties outlined in the summary. Check the Short Notes tab for full formula and step-by-step breakdown!`,
          citation: `${material.title} (Core Notes)`
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const workspaceTabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'short_notes', label: 'Short Notes', icon: Bookmark },
    { id: 'key_concepts', label: 'Key Concepts', icon: Lightbulb },
    { id: 'questions', label: 'Questions & Answers', icon: HelpCircle },
    { id: 'quiz', label: 'Quiz', icon: CheckCircle2 },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'formulas', label: 'Formulas', icon: Sparkles },
    { id: 'definitions', label: 'Definitions', icon: Tag },
    { id: 'ask_ai', label: 'Ask AI', icon: Sparkles }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Focus Mode Sticky Banner */}
      {isFocusMode ? (
        <div className="sticky top-2 z-30 p-3 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#131318]/95 backdrop-blur-md border border-[#E2E4E9] dark:border-white/[0.08] shadow-md space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3">
            {/* Left: Zen Indicator & Document Title */}
            <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2.5 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 font-mono shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Focus Mode
                </span>
                <div className="truncate max-w-[150px] sm:max-w-xs">
                  <span className="font-heading font-bold text-sm text-[#111827] dark:text-[#F5F5F7] truncate block">
                    {material.title}
                  </span>
                </div>
              </div>

              {/* Exit button for mobile quick access */}
              <button
                onClick={onToggleFocusMode}
                className="sm:hidden px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-[#111827] dark:bg-white text-white dark:text-[#111827] flex items-center gap-1 shrink-0 active-press"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>

            {/* Center: Built-in Study Pomodoro Timer */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-2 bg-[#F1F3F8] dark:bg-[#19191F] px-3 py-1.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <Timer className="w-3.5 h-3.5 text-[#8E95A5] dark:text-[#70707B]" />
                <span className="font-mono font-bold text-sm text-[#111827] dark:text-[#F5F5F7] tabular-nums">
                  {formatTimer(timerSeconds)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsTimerActive(!isTimerActive)}
                  className="p-1 rounded-lg hover:bg-stone-200 dark:hover:bg-[#202027] text-[#4B5563] dark:text-[#A8A8B3] transition-colors"
                  title={isTimerActive ? 'Pause timer' : 'Start focus timer'}
                >
                  {isTimerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleResetTimer(timerDuration)}
                  className="p-1 rounded-lg hover:bg-stone-200 dark:hover:bg-[#202027] text-[#8E95A5] hover:text-[#111827] dark:hover:text-[#F5F5F7] transition-colors"
                  title="Reset timer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
              <div className="h-3 w-px bg-stone-300 dark:bg-stone-700 mx-0.5" />
              <div className="flex items-center gap-1">
                {[15, 25, 45].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => handleResetTimer(mins)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                      timerDuration === mins
                        ? 'bg-[#4F46E5] text-white'
                        : 'text-[#8E95A5] hover:text-[#111827] dark:hover:text-[#F5F5F7]'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Controls & Exit Focus Mode (desktop) */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setIsLargeText(!isLargeText)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                  isLargeText
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-[#4F46E5] dark:text-[#818CF8]'
                    : 'bg-[#F7F8FC] dark:bg-[#19191F] border-[#E2E4E9] dark:border-white/[0.08] text-[#4B5563] dark:text-[#A8A8B3] hover:bg-[#F1F3F8]'
                }`}
                title="Toggle Reading Font Size"
              >
                <Type className="w-3.5 h-3.5" />
                <span>{isLargeText ? 'Large' : 'Normal'}</span>
              </button>

              <button
                id="exit-focus-mode-btn"
                onClick={onToggleFocusMode}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#111827] hover:bg-stone-800 dark:bg-white dark:hover:bg-stone-100 text-white dark:text-[#111827] shadow-xs flex items-center gap-1.5 transition-all active-press"
                title="Exit Focus Mode (Esc)"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Focus</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-stone-800 dark:bg-stone-200 text-stone-300 dark:text-stone-700">
                  Esc
                </kbd>
              </button>
            </div>
          </div>

          {/* Focus Mode Workspace Tab Bar */}
          <div className="pt-2 border-t border-[#E2E4E9] dark:border-white/[0.08] flex items-center gap-1.5 overflow-x-auto pb-1 touch-scroll snap-x scrollbar-none text-xs font-medium">
            {workspaceTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as WorkspaceTab)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap flex items-center gap-1.5 transition-all snap-start cursor-pointer active-press ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] font-semibold'
                      : 'text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-[#F5F5F7] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4F46E5] dark:text-[#818CF8]' : ''}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Workspace Top Banner */
        <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] uppercase tracking-wider font-mono">
                  {material.subject}
                </span>
                <span className="text-xs text-[#8E95A5] dark:text-[#70707B]">&bull;</span>
                <span className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                  {material.chapter}
                </span>
                <span className="text-xs text-[#8E95A5] dark:text-[#70707B]">&bull;</span>
                <span className="text-xs text-[#8E95A5] dark:text-[#70707B] font-mono">
                  {material.fileSize}
                </span>
              </div>

              <h1 className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
                {material.title}
              </h1>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] max-w-2xl">
                {material.summary.tldr}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
              <button
                id="workspace-focus-mode-btn"
                onClick={onToggleFocusMode}
                className="flex-1 sm:flex-initial min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#F1F3F8] hover:bg-stone-200 dark:bg-[#19191F] dark:hover:bg-[#202027] text-[#111827] dark:text-[#F5F5F7] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs flex items-center justify-center gap-1.5 transition-all active-press"
                title="Enter Focus Mode (Hides sidebars, navbar, and distractions)"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#4F46E5] dark:text-[#818CF8]" />
                <span>Focus Mode</span>
              </button>

              <button
                onClick={() => onStartExam(material)}
                className="flex-1 sm:flex-initial min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white shadow-xs flex items-center justify-center gap-1.5 transition-all active-press"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Practice Exam</span>
              </button>
              <button
                onClick={() => {
                  onUpdateMaterial({ ...material, isFavorite: !material.isFavorite });
                }}
                className={`min-h-[42px] min-w-[42px] p-2 rounded-xl border flex items-center justify-center transition-colors active-press ${
                  material.isFavorite
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-600'
                    : 'bg-[#F7F8FC] dark:bg-[#19191F] border-[#E2E4E9] dark:border-white/[0.08] text-[#8E95A5] dark:text-[#70707B]'
                }`}
                title="Toggle Favorite"
                aria-label="Toggle Favorite"
              >
                <Star className={`w-4 h-4 ${material.isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Workspace Tab Bar */}
          <div className="mt-5 pt-3.5 border-t border-[#E2E4E9] dark:border-white/[0.08] flex items-center gap-1.5 overflow-x-auto pb-1 touch-scroll snap-x scrollbar-none text-xs font-medium">
            {workspaceTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as WorkspaceTab)}
                  className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all snap-start cursor-pointer active-press ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] font-semibold'
                      : 'text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-[#F5F5F7] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4F46E5] dark:text-[#818CF8]' : ''}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content Container */}
      <div className={`space-y-6 ${isLargeText ? 'text-base' : ''}`}>
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className={`${isFocusMode ? 'max-w-3xl mx-auto' : 'grid grid-cols-1 lg:grid-cols-3 gap-6'}`}>
            <div className={`${isFocusMode ? 'w-full' : 'lg:col-span-2'} space-y-6`}>
              {/* TL;DR card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4F46E5] dark:text-[#818CF8] font-mono">
                  <Sparkles className="w-4 h-4" />
                  Executive Summary (TL;DR)
                </div>
                <p className="text-sm text-[#111827] dark:text-[#F5F5F7] leading-relaxed">
                  {material.summary.tldr}
                </p>
                <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed pt-2 border-t border-[#E2E4E9]/60 dark:border-white/[0.06]">
                  {material.summary.detailed}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3 shadow-xs">
                <h3 className="font-heading font-semibold text-base text-[#111827] dark:text-[#F5F5F7]">
                  📌 Core Takeaways
                </h3>
                <ul className="space-y-2.5">
                  {material.summary.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right sidebar: Ranked Important Topics & Quick Action */}
            {!isFocusMode && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-4 shadow-xs">
                  <h3 className="font-heading font-semibold text-base text-[#111827] dark:text-[#F5F5F7]">
                    🔥 Most Important Topics
                  </h3>
                  <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                    Ranked by recurrence in past papers and exam syllabus weightage:
                  </p>

                  <div className="space-y-3">
                    {material.summary.importantTopics.map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-[#111827] dark:text-[#F5F5F7]">
                            {item.topic}
                          </span>
                          <span className="text-[#8E95A5] dark:text-[#70707B] font-mono">
                            {item.relevanceScore}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-[#E2E4E9] dark:bg-[#202027] overflow-hidden">
                          <div
                            className="h-full bg-[#4F46E5] dark:bg-[#6366F1] rounded-full"
                            style={{ width: `${item.relevanceScore}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-200 dark:border-indigo-500/20 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#4F46E5] dark:text-[#818CF8]">
                    <Zap className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8]" />
                    Study Acceleration
                  </div>
                  <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
                    Start a timed mock exam or practice with {material.flashcards.length} flashcards generated from this material.
                  </p>
                  <div className="pt-1 flex gap-2">
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className="flex-1 py-2 rounded-xl text-xs font-medium bg-white dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8] text-[#111827] dark:text-[#F5F5F7] transition-colors"
                    >
                      Quick Quiz
                    </button>
                    <button
                      onClick={() => setActiveTab('flashcards')}
                      className="flex-1 py-2 rounded-xl text-xs font-medium bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white transition-colors"
                    >
                      Flashcards
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DETAILED SUMMARY */}
        {activeTab === 'summary' && (
          <div className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-6 ${isFocusMode ? 'max-w-3xl mx-auto shadow-sm' : 'shadow-xs'}`}>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#111827] dark:text-[#F5F5F7] mb-2">
                📄 Comprehensive Material Summary
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                Extracted and structured directly from {material.title}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.06] space-y-2">
              <div className="text-xs font-bold text-[#4F46E5] dark:text-[#818CF8] uppercase tracking-wider font-mono">
                TL;DR Snapshot
              </div>
              <p className="text-sm font-medium text-[#111827] dark:text-[#F5F5F7] leading-relaxed">
                {material.summary.tldr}
              </p>
            </div>

            <div className="space-y-3 text-sm text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
              <h3 className="font-heading font-semibold text-base text-[#111827] dark:text-[#F5F5F7]">
                Detailed Analysis
              </h3>
              <p className="whitespace-pre-line leading-relaxed">{material.summary.detailed}</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E2E4E9] dark:border-white/[0.08]">
              <h3 className="font-heading font-semibold text-base text-[#111827] dark:text-[#F5F5F7]">
                Key Takeaways
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {material.summary.keyTakeaways.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.06] flex items-start gap-2.5 text-xs text-[#4B5563] dark:text-[#A8A8B3]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SHORT NOTES */}
        {activeTab === 'short_notes' && (
          <div className="space-y-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-[#111827] dark:text-[#F5F5F7]">
                📝 Exam-Ready Short Notes
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                High-yield summaries designed for rapid pre-exam revision
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {material.shortNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7]">
                      {note.title}
                    </h3>
                    {note.timeComplexity && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]">
                        {note.timeComplexity}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
                    {note.definition}
                  </p>

                  {note.conditions && note.conditions.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#E2E4E9]/60 dark:border-white/[0.04]">
                      <div className="text-[11px] font-semibold text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono">
                        Important Conditions:
                      </div>
                      <ul className="space-y-1">
                        {note.conditions.map((cond, i) => (
                          <li key={i} className="text-xs text-[#4B5563] dark:text-[#A8A8B3] flex items-start gap-1.5">
                            <span className="text-[#4F46E5] dark:text-[#818CF8] font-bold">•</span>
                            <span>{cond}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {note.examTip && (
                    <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300">
                      <span className="font-bold">Exam Tip: </span>
                      {note.examTip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: KEY CONCEPTS */}
        {activeTab === 'key_concepts' && (
          <div className="space-y-4">
            <div>
              <h2 className="font-heading font-bold text-xl text-[#111827] dark:text-[#F5F5F7]">
                🧠 Key Concepts & Foundations
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                Core mental models and theoretical mechanisms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {material.keyConcepts.map((kc, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-2.5 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 uppercase tracking-wider font-mono">
                      {kc.category}
                    </span>
                    <h3 className="font-heading font-semibold text-base text-[#111827] dark:text-[#F5F5F7]">
                      {kc.title}
                    </h3>
                    <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
                      {kc.explanation}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('ask_ai');
                      setAskInput(`Can you explain ${kc.title} with a deep dive?`);
                    }}
                    className="pt-2 text-xs font-medium text-[#4F46E5] dark:text-[#818CF8] hover:underline flex items-center gap-1"
                  >
                    Ask AI to expand <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: QUESTIONS & ANSWERS */}
        {activeTab === 'questions' && (
          <div className={`space-y-4 ${isFocusMode ? 'max-w-3xl mx-auto' : ''}`}>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#111827] dark:text-[#F5F5F7]">
                ❓ Exam-Oriented Questions & Answers
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                Model answers structured for semester and viva examinations
              </p>
            </div>

            <div className="space-y-4">
              {material.questions.map((qa, i) => (
                <div
                  key={qa.id || i}
                  className="p-6 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-heading font-semibold text-base text-[#111827] dark:text-[#F5F5F7] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] flex items-center justify-center text-xs font-bold font-mono">
                        {i + 1}
                      </span>
                      {qa.question}
                    </h3>
                    {qa.marks && (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] shrink-0 font-mono">
                        {qa.marks} Marks
                      </span>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.06] text-xs text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed space-y-1.5">
                    <div className="text-[11px] font-bold text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono">
                      Model Answer:
                    </div>
                    <p className="whitespace-pre-line">{qa.answer}</p>
                  </div>

                  {qa.examType && (
                    <div className="text-[11px] text-[#8E95A5] dark:text-[#70707B]">
                      Typical context: {qa.examType}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: QUIZ */}
        {activeTab === 'quiz' && (
          <div className={`p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-6 ${isFocusMode ? 'max-w-2xl mx-auto shadow-sm' : 'shadow-xs'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-xl text-[#111827] dark:text-[#F5F5F7]">
                  🧪 Material Quiz ({material.quizzes.length} Questions)
                </h2>
                <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                  Test your understanding before taking the full timed exam
                </p>
              </div>

              {quizSubmitted && (
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setQuizSubmitted(false);
                    setCurrentQuizIndex(0);
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium border border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]"
                >
                  Retake Quiz
                </button>
              )}
            </div>

            {material.quizzes.length > 0 ? (
              <div className="space-y-6">
                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-[#E2E4E9] dark:bg-[#202027] overflow-hidden">
                  <div
                    className="h-full bg-[#4F46E5] dark:bg-[#6366F1] transition-all duration-300"
                    style={{
                      width: `${((currentQuizIndex + 1) / material.quizzes.length) * 100}%`
                    }}
                  />
                </div>

                {/* Active Question */}
                {(() => {
                  const q = material.quizzes[currentQuizIndex];
                  const currentAns = selectedAnswers[currentQuizIndex];

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-[#8E95A5] dark:text-[#70707B]">
                        <span>
                          Question {currentQuizIndex + 1} of {material.quizzes.length}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#F1F3F8] dark:bg-[#19191F] uppercase font-mono text-[10px]">
                          {q.difficulty} &bull; {q.topic}
                        </span>
                      </div>

                      <h3 className="font-heading font-semibold text-lg text-[#111827] dark:text-[#F5F5F7]">
                        {q.question}
                      </h3>

                      {/* Options */}
                      <div className="space-y-2.5">
                        {q.options?.map((opt, optIdx) => {
                          const isSelected = Array.isArray(currentAns)
                            ? currentAns.includes(opt)
                            : currentAns === opt;

                          let btnStyle =
                            'bg-[#F7F8FC] dark:bg-[#19191F] border-[#E2E4E9] dark:border-white/[0.08] text-[#111827] dark:text-[#F5F5F7] hover:border-indigo-400';

                          if (quizSubmitted) {
                            const isCorrect = Array.isArray(q.correctAnswer)
                              ? q.correctAnswer.includes(opt)
                              : q.correctAnswer === opt;
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-red-50 dark:bg-red-950/50 border-red-500 text-red-700 dark:text-red-300';
                            }
                          } else if (isSelected) {
                            btnStyle = 'bg-indigo-50 dark:bg-indigo-950/60 border-[#4F46E5] dark:border-[#818CF8] text-[#4F46E5] dark:text-[#818CF8] font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => {
                                if (q.type === 'multiple_answer') {
                                  const prevArr = Array.isArray(currentAns) ? currentAns : [];
                                  const nextArr = prevArr.includes(opt)
                                    ? prevArr.filter((item) => item !== opt)
                                    : [...prevArr, opt];
                                  setSelectedAnswers({ ...selectedAnswers, [currentQuizIndex]: nextArr });
                                } else {
                                  setSelectedAnswers({ ...selectedAnswers, [currentQuizIndex]: opt });
                                }
                              }}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && Array.isArray(q.correctAnswer) ? (
                                q.correctAnswer.includes(opt) && (
                                  <Check className="w-4 h-4 text-emerald-500" />
                                )
                              ) : quizSubmitted && q.correctAnswer === opt ? (
                                <Check className="w-4 h-4 text-emerald-500" />
                              ) : null}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation if submitted */}
                      {quizSubmitted && (
                        <div className="p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.06] text-xs space-y-1">
                          <div className="font-bold text-[#111827] dark:text-[#F5F5F7]">
                            Explanation:
                          </div>
                          <p className="text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      )}

                      {/* Navigation buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#E2E4E9] dark:border-white/[0.08]">
                        <button
                          disabled={currentQuizIndex === 0}
                          onClick={() => setCurrentQuizIndex((p) => Math.max(0, p - 1))}
                          className="px-4 py-2 rounded-xl text-xs font-medium border border-[#E2E4E9] dark:border-white/[0.08] disabled:opacity-40 hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]"
                        >
                          Previous
                        </button>

                        {currentQuizIndex < material.quizzes.length - 1 ? (
                          <button
                            onClick={() => setCurrentQuizIndex((p) => p + 1)}
                            className="px-4 py-2 rounded-xl text-xs font-medium bg-[#4F46E5] text-white hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8]"
                          >
                            Next
                          </button>
                        ) : !quizSubmitted ? (
                          <button
                            onClick={() => setQuizSubmitted(true)}
                            className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                          >
                            Submit Answers
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <p className="text-xs text-[#8E95A5] dark:text-[#70707B]">No quizzes generated for this material yet.</p>
            )}
          </div>
        )}

        {/* TAB 7: FLASHCARDS */}
        {activeTab === 'flashcards' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-heading font-bold text-xl text-[#111827] dark:text-[#F5F5F7]">
                  🃏 Spaced Repetition Flashcards
                </h2>
                <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                  Tap to reveal answer. Mark difficult cards for accelerated recall.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setFcFilter('all');
                    setCurrentFcIndex(0);
                    setIsFcFlipped(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    fcFilter === 'all'
                      ? 'bg-[#4F46E5] dark:bg-[#6366F1] text-white'
                      : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]'
                  }`}
                >
                  All ({material.flashcards.length})
                </button>
                <button
                  onClick={() => {
                    setFcFilter('difficult');
                    setCurrentFcIndex(0);
                    setIsFcFlipped(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    fcFilter === 'difficult'
                      ? 'bg-amber-600 text-white'
                      : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]'
                  }`}
                >
                  Difficult Only ({material.flashcards.filter((f) => f.isDifficult).length})
                </button>
              </div>
            </div>

            {filteredFlashcards.length > 0 ? (
              <div className="max-w-xl mx-auto space-y-6">
                <div className="flex items-center justify-between text-xs text-[#8E95A5] dark:text-[#70707B]">
                  <span>
                    Card {currentFcIndex + 1} of {filteredFlashcards.length}
                  </span>
                  <span className="font-mono text-[10px] uppercase">
                    {filteredFlashcards[currentFcIndex].topic}
                  </span>
                </div>

                {/* Interactive 3D Flip Card */}
                <div
                  onClick={() => setIsFcFlipped(!isFcFlipped)}
                  className="perspective-1000 w-full h-72 cursor-pointer select-none"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                      isFcFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden p-8 rounded-3xl bg-white dark:bg-[#131318] border-2 border-[#E2E4E9] dark:border-white/[0.08] shadow-xs flex flex-col justify-between items-center text-center">
                      <div className="flex items-center justify-between w-full text-xs text-[#8E95A5] dark:text-[#70707B]">
                        <span className="font-mono uppercase font-semibold">QUESTION</span>
                        {filteredFlashcards[currentFcIndex].isDifficult && (
                          <span className="flex items-center gap-1 text-amber-500 font-medium">
                            <Star className="w-3 h-3 fill-current" /> Difficult
                          </span>
                        )}
                      </div>

                      <div className="font-heading font-semibold text-xl sm:text-2xl text-[#111827] dark:text-[#F5F5F7] px-4 leading-snug">
                        {filteredFlashcards[currentFcIndex].front}
                      </div>

                      <div className="text-xs text-[#8E95A5] dark:text-[#70707B] flex items-center gap-1">
                        <RotateCw className="w-3.5 h-3.5" /> Tap to reveal answer
                      </div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 p-8 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800/80 shadow-xs flex flex-col justify-between items-center text-center">
                      <div className="flex items-center justify-between w-full text-xs text-[#4F46E5] dark:text-[#818CF8] font-mono uppercase font-semibold">
                        <span>ANSWER</span>
                        <span>{filteredFlashcards[currentFcIndex].topic}</span>
                      </div>

                      <div className="text-base sm:text-lg font-medium text-[#111827] dark:text-[#F5F5F7] px-4 leading-relaxed">
                        {filteredFlashcards[currentFcIndex].back}
                      </div>

                      <div className="text-xs text-[#8E95A5] dark:text-[#70707B]">
                        Tap to flip back
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spaced-Repetition Feedback Buttons */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() =>
                      toggleFlashcardDifficult(filteredFlashcards[currentFcIndex].id)
                    }
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      filteredFlashcards[currentFcIndex].isDifficult
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300'
                        : 'bg-white dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8]'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5" />
                    {filteredFlashcards[currentFcIndex].isDifficult ? 'Marked Difficult' : 'Mark Difficult'}
                  </button>

                  <button
                    onClick={() =>
                      markFlashcardStatus(filteredFlashcards[currentFcIndex].id, 'mastered')
                    }
                    className="px-4 py-2 rounded-xl text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Know it
                  </button>

                  <button
                    onClick={() => {
                      setIsFcFlipped(false);
                      if (currentFcIndex < filteredFlashcards.length - 1) {
                        setCurrentFcIndex((p) => p + 1);
                      } else {
                        setCurrentFcIndex(0);
                      }
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-medium border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] hover:bg-[#F1F3F8] shadow-xs"
                  >
                    Next Card &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#8E95A5] dark:text-[#70707B] text-center py-8">
                No flashcards match the selected filter.
              </p>
            )}
          </div>
        )}

        {/* TAB 8: FORMULAS */}
        {activeTab === 'formulas' && (
          <div className={`space-y-4 ${isFocusMode ? 'max-w-4xl mx-auto' : ''}`}>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#111827] dark:text-[#F5F5F7]">
                📐 Mathematical & Algorithmic Formulas
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                Extracted equations without hallucinations
              </p>
            </div>

            {material.hasFormulas && material.formulas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {material.formulas.map((f) => (
                  <div
                    key={f.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-semibold text-sm text-[#111827] dark:text-[#F5F5F7]">
                        {f.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[#8E95A5] dark:text-[#70707B]">
                        {f.subject}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F7F8FC] dark:bg-[#19191F] font-mono text-sm font-semibold text-[#4F46E5] dark:text-[#818CF8] border border-[#E2E4E9] dark:border-white/[0.06] flex items-center justify-between">
                      <code>{f.formula}</code>
                      <button
                        onClick={() => copyToClipboard(f.formula, 999)}
                        className="text-[#8E95A5] hover:text-[#111827] dark:hover:text-[#F5F5F7]"
                        title="Copy formula"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 rounded-2xl bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.08] text-center space-y-2">
                <p className="text-sm font-medium text-[#111827] dark:text-[#F5F5F7]">
                  No important formulas detected in this material.
                </p>
                <p className="text-xs text-[#8E95A5] dark:text-[#70707B]">
                  Formulas are strictly extracted from authentic content without hallucination.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 9: IMPORTANT DEFINITIONS */}
        {activeTab === 'definitions' && (
          <div className={`space-y-4 ${isFocusMode ? 'max-w-4xl mx-auto' : ''}`}>
            <div>
              <h2 className="font-heading font-bold text-xl text-[#111827] dark:text-[#F5F5F7]">
                💡 Important Definitions
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                Key academic terms. Star items to mark them as high priority.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {material.definitions.map((def) => (
                <div
                  key={def.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-2.5 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7]">
                        {def.term}
                      </span>
                      <button
                        onClick={() => toggleDefinitionImportant(def.id)}
                        className={`p-1 rounded-md transition-colors ${
                          def.isImportant ? 'text-amber-500' : 'text-[#8E95A5] hover:text-[#111827] dark:hover:text-[#F5F5F7]'
                        }`}
                        title="Mark Important"
                      >
                        <Star className={`w-4 h-4 ${def.isImportant ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
                      {def.definition}
                    </p>
                  </div>

                  {def.category && (
                    <div className="pt-2 border-t border-[#E2E4E9]/60 dark:border-white/[0.04] text-[11px] text-[#8E95A5] dark:text-[#70707B] font-mono">
                      Category: {def.category}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: ASK AI (CONTEXT-AWARE DOUBT SOLVER) */}
        {activeTab === 'ask_ai' && (
          <div className={`rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] overflow-hidden flex flex-col h-[640px] ${isFocusMode ? 'max-w-3xl mx-auto shadow-sm' : 'shadow-xs'}`}>
            {/* Header / Answer Mode Selector */}
            <div className="p-4 border-b border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8]" />
                <span className="font-heading font-semibold text-sm text-[#111827] dark:text-[#F5F5F7]">
                  Doubt Solver &bull; Grounded in {material.title}
                </span>
              </div>

              {/* Modes */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                {[
                  { id: 'simple', label: '🧑🎓 Simple' },
                  { id: 'detailed', label: '📚 Detailed' },
                  { id: 'exam_ready', label: '⚡ Exam Ready' },
                  { id: 'eli10', label: '🧒 ELI10' },
                  { id: 'example', label: '💻 With Example' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setAskMode(m.id as any)}
                    className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all font-mono ${
                      askMode === m.id
                        ? 'bg-[#4F46E5] dark:bg-[#6366F1] text-white font-medium shadow-xs'
                        : 'bg-[#F1F3F8] dark:bg-[#202027] text-[#4B5563] dark:text-[#A8A8B3] hover:bg-stone-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat message list */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-white dark:bg-[#0B0B0F]">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                      msg.sender === 'user'
                        ? 'bg-[#4F46E5] text-white rounded-br-xs shadow-xs'
                        : 'bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.06] text-[#111827] dark:text-[#F5F5F7] rounded-bl-xs'
                    }`}
                  >
                    {msg.citation && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10 text-[11px] font-mono text-[#4F46E5] dark:text-[#818CF8] border border-indigo-200/50 dark:border-indigo-500/20">
                        📖 Source: {msg.citation}
                      </div>
                    )}
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {msg.sender === 'ai' && (
                      <div className="pt-2 flex items-center justify-between text-[10px] text-[#8E95A5] dark:text-[#70707B]">
                        <span>AI Study Assistant</span>
                        <button
                          onClick={() => copyToClipboard(msg.text, idx)}
                          className="hover:text-[#111827] dark:hover:text-white flex items-center gap-1"
                        >
                          {copiedIndex === idx ? (
                            <span className="text-emerald-500">Copied!</span>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="p-4 rounded-2xl bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.06] text-xs text-[#4B5563] dark:text-[#A8A8B3] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 animate-spin text-[#4F46E5] dark:text-[#818CF8]" />
                    Searching document & synthesizing answer...
                  </div>
                </div>
              )}
            </div>

            {/* Prompt suggestions & Input */}
            <div className="p-4 border-t border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#131318] space-y-3">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
                <span className="text-[#8E95A5] dark:text-[#70707B] shrink-0 font-mono">Suggestions:</span>
                {[
                  'Explain in simple words',
                  'What is the time complexity?',
                  'How would this appear on an exam?',
                  'Give me a code or step-by-step example'
                ].map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAskInput(sug);
                    }}
                    className="px-2.5 py-1 rounded-full whitespace-nowrap bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] hover:bg-stone-200 dark:hover:bg-[#202027] transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              <form onSubmit={handleAskSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={askInput}
                  onChange={(e) => setAskInput(e.target.value)}
                  placeholder={`Ask anything about ${material.title}...`}
                  className="flex-1 text-xs px-4 py-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-[#4F46E5] outline-hidden shadow-2xs"
                />
                <button
                  type="submit"
                  disabled={!askInput.trim() || isAiLoading}
                  className="p-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white disabled:opacity-50 transition-colors shadow-xs active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
