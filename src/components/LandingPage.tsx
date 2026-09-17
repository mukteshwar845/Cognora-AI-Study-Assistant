import React, { useState } from 'react';
import {
  Sparkles,
  UploadCloud,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  ShieldCheck,
  Zap,
  FileText,
  Brain,
  Calendar,
  BarChart3,
  Bookmark,
  ChevronRight,
  FileCheck2,
  GraduationCap,
  Menu,
  X,
  Compass,
  Check,
  Award,
  Search,
  MessageSquare,
  Flame,
  TrendingUp,
  Share2,
  Lock,
  LogIn
} from 'lucide-react';
import { CognoraLogo } from './CognoraLogo';
import { SignInModal } from './SignInModal';
import { UserProfile } from '../types';

interface LandingPageProps {
  onStartStudying: () => void;
  currentUser?: UserProfile;
  onLoginSuccess?: (user: UserProfile) => void;
  onOpenUpload?: () => void;
  onExploreDemo?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartStudying,
  currentUser,
  onLoginSuccess
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [signInInitialMode, setSignInInitialMode] = useState<'signin' | 'signup'>('signin');
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'tutor' | 'summary' | 'flashcards' | 'quiz'>('tutor');
  const [interactiveQuizChoice, setInteractiveQuizChoice] = useState<number | null>(1);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSignIn = (mode: 'signin' | 'signup') => {
    setSignInInitialMode(mode);
    setIsSignInOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-stone-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200 antialiased relative overflow-x-hidden">
      {/* Background Ambience - Subtle, deep engineered atmosphere without distracting noise */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] right-[-5%] w-[500px] h-[500px] bg-violet-950/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[550px] h-[550px] bg-indigo-950/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. NAVBAR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#090A0F]/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <CognoraLogo
            size="md"
            subtitle="AI Study Assistant"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-stone-300">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('interactive-previews')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Interactive Demos
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleOpenSignIn('signin')}
              className="px-2.5 py-1 text-[10.5px] font-medium tracking-wide text-indigo-200 hover:text-white rounded-md bg-gradient-to-b from-indigo-500/20 to-indigo-600/10 border border-indigo-500/30 hover:border-indigo-400/60 shadow-[0_1px_3px_rgba(79,70,229,0.2)] hover:shadow-[0_2px_6px_rgba(79,70,229,0.35)] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogIn className="w-2.5 h-2.5 text-indigo-400" />
              <span>Log in</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/[0.08] bg-[#0E1017] px-6 py-5 space-y-4">
            <div className="flex flex-col space-y-3 text-sm font-medium text-stone-300">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-left py-1 hover:text-white cursor-pointer"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-left py-1 hover:text-white cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('interactive-previews')}
                className="text-left py-1 hover:text-white cursor-pointer"
              >
                Interactive Demos
              </button>
            </div>
            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenSignIn('signin');
                  }}
                  className="py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white border border-white/10 text-center flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Log in</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenSignIn('signup');
                  }}
                  className="py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white border border-white/10 text-center flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Sign Up</span>
                </button>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartStudying();
                }}
                className="relative w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-700 border-t border-indigo-300/40 shadow-[0_3px_0_0_#3730a3,0_8px_16px_rgba(79,70,229,0.35)] hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_0_#3730a3] text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none"
              >
                <span>Launch Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. HERO SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Confident, Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight max-w-4xl leading-[1.08] text-white mb-6">
          Turn Your Study Material{' '}
          <span className="block mt-1 bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-300 bg-clip-text text-transparent">
            Into Your Personal AI Tutor.
          </span>
        </h1>

        {/* Concise Supporting Description */}
        <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed mb-8">
          Upload your notes, PDFs, lectures, or study materials. Get summaries,
          quizzes, flashcards, exam questions, and context-aware answers grounded
          in your own content.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-10">
          <button
            onClick={onStartStudying}
            className="relative w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-700 border-t border-indigo-300/50 shadow-[0_6px_0_0_#3730a3,0_16px_30px_-4px_rgba(79,70,229,0.5)] hover:shadow-[0_8px_0_0_#3730a3,0_22px_36px_-4px_rgba(79,70,229,0.65)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-[5px] active:shadow-[0_1px_0_0_#3730a3,0_6px_12px_rgba(79,70,229,0.35)] transition-all flex items-center justify-center gap-2.5 cursor-pointer group select-none"
          >
            <span>Start Studying Free</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Micro Credibility Trust Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Grounded in Your Documents</span>
          </div>
          <span className="hidden sm:inline text-stone-600">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Exact Page & Section Citations</span>
          </div>
          <span className="hidden sm:inline text-stone-600">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Data Hallucinations</span>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. PRODUCT VISUAL BELOW THE HERO
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-24 w-full">
        {/* Floating App Preview Container with Glass Frame & 3D Elevation */}
        <div className="rounded-2xl border border-white/[0.12] bg-[#0E1017]/90 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_10px_30px_rgba(79,70,229,0.2)] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7),0_15px_35px_rgba(79,70,229,0.25)]">
          {/* Mock Window Title Bar */}
          <div className="px-4 py-3 border-b border-white/[0.08] bg-[#0A0B10] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-stone-400 truncate">
                Cognora &mdash; Study Workspace &bull; Data_Structures_Unit1.pdf
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-stone-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Engine Active</span>
            </div>
          </div>

          {/* Document Sub-Header Strip */}
          <div className="px-5 py-3.5 bg-[#12141D] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
                DS
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-white flex items-center gap-2">
                  <span>Data Structures &amp; Algorithms &mdash; Unit 1</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Exam in 12 Days
                  </span>
                </div>
                <div className="text-[11px] text-stone-400">
                  Chapter 3: Graph Traversal, BFS/DFS &amp; Binary Search &bull; 42 Pages
                </div>
              </div>
            </div>

            {/* Interactive Preview Tabs with 3D button feel */}
            <div className="flex items-center gap-1.5 bg-[#0A0B10] p-1 rounded-xl border border-white/[0.08] text-xs font-medium">
              {[
                { id: 'tutor', label: 'AI Tutor', icon: Sparkles },
                { id: 'summary', label: 'Summary', icon: FileText },
                { id: 'flashcards', label: 'Flashcards (22)', icon: Layers },
                { id: 'quiz', label: 'Quiz (14)', icon: CheckCircle2 }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activePreviewTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePreviewTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                      isActive
                        ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-[0_2px_0_0_#3730a3,0_4px_10px_rgba(79,70,229,0.35)] border-t border-indigo-300/40'
                        : 'text-stone-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <Icon className={`w-3 h-3 ${isActive ? 'text-indigo-200' : 'text-stone-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workspace Body Simulation */}
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0E1017]">
            {/* Left Col: Context-Grounded AI Doubt Solver Dialogue or Tab View (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              {activePreviewTab === 'tutor' && (
                <>
                  {/* Student Question Message */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-stone-700 flex items-center justify-center text-[11px] font-semibold text-white shrink-0 mt-0.5">
                      MG
                    </div>
                    <div className="p-3.5 rounded-2xl rounded-tl-sm bg-[#161922] border border-white/[0.07] text-xs text-stone-200 leading-relaxed max-w-lg shadow-sm">
                      <p className="font-semibold text-stone-400 text-[10px] uppercase tracking-wider mb-1">
                        Student Question
                      </p>
                      Explain binary search simply, why is its time complexity O(log n), and what is the key condition?
                    </div>
                  </div>

                  {/* AI Tutor Response with Citation */}
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm shadow-indigo-500/30">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 p-4 rounded-2xl rounded-tl-sm bg-[#141724] border border-indigo-500/30 text-xs text-stone-200 space-y-2.5 shadow-md">
                      <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                        <span className="text-[11px] font-semibold text-indigo-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          Cognora Context-Aware AI Tutor
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Context Grounded
                        </span>
                      </div>

                      <p className="leading-relaxed">
                        <strong className="text-white">Core Principle:</strong> Binary search repeatedly cuts the search space in half. At every step, it checks the middle element:
                      </p>

                      <div className="p-2.5 rounded-lg bg-[#0A0B10] border border-white/[0.06] font-mono text-[11px] text-indigo-300">
                        mid = low + (high - low) / 2
                      </div>

                      <p className="leading-relaxed text-stone-300">
                        <strong className="text-white">Why O(log n):</strong> Because each iteration eliminates 50% of the remaining array, an array of size <span className="font-mono text-indigo-200">n</span> requires at most <span className="font-mono text-indigo-200">log₂(n)</span> comparisons.
                      </p>

                      {/* Strict Document Citation Badge */}
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 text-indigo-300 font-medium">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Source: Data_Structures_Unit1.pdf &bull; Page 14 (Section 3.2)</span>
                        </div>
                        <span className="text-[10px] text-stone-400">Excerpt verified</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activePreviewTab === 'summary' && (
                <div className="p-4 rounded-2xl bg-[#141724] border border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-indigo-400" />
                      Executive Exam Revision Notes
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">Synthesized in 1.4s</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-200">
                    <div className="p-2.5 rounded-xl bg-[#0B0C12] border border-white/[0.05]">
                      <strong className="text-indigo-200 block mb-1">1. Preconditions &amp; Invariants:</strong>
                      Binary search requires strict monotonic ordering. Unsorted data degrades to linear scan O(n).
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B0C12] border border-white/[0.05]">
                      <strong className="text-emerald-200 block mb-1">2. Complexity Guarantees:</strong>
                      Worst case: O(log n) comparisons. Space complexity: O(1) iterative, O(log n) recursive call stack.
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B0C12] border border-white/[0.05]">
                      <strong className="text-amber-200 block mb-1">3. Frequent Exam Trap:</strong>
                      Beware integer overflow with <code>(low + high) / 2</code>. Always implement <code>low + (high - low) / 2</code>.
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'flashcards' && (
                <div className="p-4 rounded-2xl bg-[#141724] border border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <span className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-violet-400" />
                      Active Spaced-Repetition Deck
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">22 Cards in Unit 1</span>
                  </div>
                  <p className="text-xs text-stone-300">
                    Tap the flashcard on the right side to test the interactive 3D rotation flip and recall algorithm answers!
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#0B0C12] border border-white/[0.05]">
                      <span className="text-stone-400 text-[10px] block">Due for review today:</span>
                      <span className="font-bold text-white text-sm">7 Cards</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#0B0C12] border border-white/[0.05]">
                      <span className="text-stone-400 text-[10px] block">Mastered this week:</span>
                      <span className="font-bold text-emerald-400 text-sm">15 Cards</span>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'quiz' && (
                <div className="p-4 rounded-2xl bg-[#141724] border border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      AI Diagnostic Exam Practice
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">Instant Grading</span>
                  </div>
                  <p className="text-xs text-stone-300">
                    Questions are dynamically synthesized directly from textbook paragraphs, professor slides, and unit syllabi.
                  </p>
                  <div className="p-3 rounded-xl bg-[#0B0C12] border border-white/[0.05] text-xs text-stone-300 flex items-center justify-between">
                    <span>Average accuracy on Unit 1:</span>
                    <span className="font-bold text-indigo-400 font-mono">88% (Proficient)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: 3D Active Flashcard & Fast Quiz Interactive Snapshot (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {/* Snapshot 1: Interactive 3D Active Recall Flashcard */}
              <div className="perspective-[800px]">
                <div
                  onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                  className={`relative p-4 rounded-xl cursor-pointer select-none transition-all duration-500 [transform-style:preserve-3d] ${
                    flashcardFlipped ? '[transform:rotateY(180deg)]' : ''
                  } bg-gradient-to-b from-[#171926] to-[#10121D] border-t border-t-white/[0.16] border-b border-b-black/60 border-x border-x-white/[0.08] shadow-[0_6px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_25px_rgba(79,70,229,0.25)] hover:-translate-y-0.5 group`}
                >
                  {/* Front Face */}
                  <div className={`${flashcardFlipped ? 'invisible' : 'block'}`}>
                    <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2">
                      <span className="flex items-center gap-1.5 font-medium text-stone-300">
                        <Layers className="w-3.5 h-3.5 text-violet-400" />
                        Active Recall Flashcard
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/25 flex items-center gap-1">
                        <span>Card 7/22</span>
                        <span className="text-[9px] text-stone-400">&bull; Tap 3D Flip</span>
                      </span>
                    </div>
                    <div className="font-heading font-semibold text-xs text-white mb-2.5">
                      Q: What condition is strictly required before applying Binary Search?
                    </div>
                    <div className="p-2 rounded-lg bg-[#0A0B10]/90 border border-white/[0.06] text-[11px] text-stone-400 flex items-center justify-between">
                      <span>Click to reveal answer in 3D</span>
                      <span className="text-[10px] font-mono text-indigo-400 font-semibold">↺ Flip Card</span>
                    </div>
                  </div>

                  {/* Back Face (Answer) */}
                  <div className={`[transform:rotateY(180deg)] ${flashcardFlipped ? 'block' : 'hidden'}`}>
                    <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2">
                      <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Verified Answer
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">↺ Tap to Flip Back</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0A0B10] border border-emerald-500/30 text-[11px] text-emerald-300 mb-2 leading-relaxed">
                      The input array or list <strong>must be sorted in monotonic order</strong>. Time complexity is <strong>O(log n)</strong>.
                    </div>
                    <div className="text-[10px] text-stone-400 flex items-center justify-between">
                      <span>Source: Page 14 (Section 3.2)</span>
                      <span className="text-emerald-400 font-semibold">&#10003; Mastered</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Snapshot 2: Interactive Micro Quiz */}
              <div className="p-4 rounded-xl bg-gradient-to-b from-[#151724] to-[#0F111A] border-t border-t-white/[0.14] border-b border-b-black/50 border-x border-x-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2">
                  <span className="flex items-center gap-1.5 font-medium text-stone-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    AI-Generated Exam Practice
                  </span>
                  <span className="text-[10px] text-indigo-400 font-mono">1 Mark MCQ</span>
                </div>
                <p className="text-xs text-stone-200 font-medium mb-2.5">
                  Which algorithm detects cycles in a directed graph using DFS?
                </p>
                <div className="space-y-1.5">
                  {[
                    { id: 0, text: "Kruskal's Minimum Spanning Tree" },
                    { id: 1, text: "Tarjan's / 3-Coloring (Back-Edge Detection)" },
                    { id: 2, text: "Dijkstra's Shortest Path" }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setInteractiveQuizChoice(opt.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] border transition-all flex items-center justify-between cursor-pointer select-none ${
                        interactiveQuizChoice === opt.id
                          ? opt.id === 1
                            ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 font-medium shadow-[0_1px_3px_rgba(16,185,129,0.2)]'
                            : 'bg-red-950/30 border-red-500/50 text-red-200 shadow-[0_1px_3px_rgba(239,68,68,0.2)]'
                          : 'bg-[#0A0B10] border-white/[0.06] text-stone-300 hover:bg-white/5 active:translate-y-0.5'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {interactiveQuizChoice === opt.id && opt.id === 1 && (
                        <Check className="w-3 h-3 text-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. CONNECTED 3-STEP JOURNEY
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.07]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">
            INTELLIGENT 3-STEP WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            How Cognora Transforms Your Material
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            From raw unformatted lecture notes to active exam mastery in seconds.
          </p>
        </div>

        {/* Connected Visual 3-Step Journey */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Subtle connection line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[18%] right-[18%] h-[1px] bg-gradient-to-r from-indigo-500/20 via-indigo-500/50 to-indigo-500/20 -translate-y-6 pointer-events-none" />

          {/* STEP 01 */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#151825] to-[#0E1018] border-t border-t-white/[0.16] border-b border-b-black/60 border-x border-x-white/[0.08] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 hover:shadow-[0_18px_36px_-6px_rgba(0,0,0,0.7),0_4px_16px_rgba(79,70,229,0.25)] hover:border-t-indigo-400/50 transition-all duration-200 flex flex-col relative group">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono font-extrabold text-2xl text-indigo-400/80 group-hover:text-indigo-400 transition-colors">
                01
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_2px_6px_rgba(79,70,229,0.25)]">
                <UploadCloud className="w-5 h-5" />
              </div>
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">
              Bring Your Learning Material
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed flex-1">
              Drop your lecture PDFs, professor presentation slides, typed notes, syllabus outlines, or scanned study sheets.
            </p>
            <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center gap-2 text-xs font-mono text-stone-400">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>PDF &bull; PPTX &bull; DOCX &bull; TXT</span>
            </div>
          </div>

          {/* STEP 02 */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#151825] to-[#0E1018] border-t border-t-white/[0.16] border-b border-b-black/60 border-x border-x-white/[0.08] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 hover:shadow-[0_18px_36px_-6px_rgba(0,0,0,0.7),0_4px_16px_rgba(79,70,229,0.25)] hover:border-t-violet-400/50 transition-all duration-200 flex flex-col relative group">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono font-extrabold text-2xl text-violet-400/80 group-hover:text-violet-400 transition-colors">
                02
              </span>
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-[0_2px_6px_rgba(139,92,246,0.25)]">
                <Brain className="w-5 h-5" />
              </div>
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">
              Structured Knowledge Synthesis
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed flex-1">
              Cognora parses your text, extracts critical formulas, isolates definitions, maps core concepts, and auto-builds memory flashcards.
            </p>
            <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Formula sheets, Flashcards &amp; Notes</span>
            </div>
          </div>

          {/* STEP 03 */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#151825] to-[#0E1018] border-t border-t-white/[0.16] border-b border-b-black/60 border-x border-x-white/[0.08] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 hover:shadow-[0_18px_36px_-6px_rgba(0,0,0,0.7),0_4px_16px_rgba(79,70,229,0.25)] hover:border-t-emerald-400/50 transition-all duration-200 flex flex-col relative group">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono font-extrabold text-2xl text-emerald-400/80 group-hover:text-emerald-400 transition-colors">
                03
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_2px_6px_rgba(16,185,129,0.25)]">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">
              Practice, Revise &amp; Ace Exams
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed flex-1">
              Ask doubts with exact document page citations, solve adaptive quizzes, practice timed mock exams, and target your weak topics.
            </p>
            <div className="mt-6 pt-4 border-t border-white/[0.07] flex items-center gap-2 text-xs font-mono text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Target 90%+ Exam Readiness</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. FEATURE SHOWCASE (Bento-style layout)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="features" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.07]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">
            BUILT FOR SERIOUS ACADEMIC WORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Everything You Need to Study Smarter
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            A cohesive suite of tools tailored directly to university coursework and high-stakes examination prep.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Card 1: Context-Aware AI Tutor (Span 2 cols on md/lg) */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-b from-[#141724] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.65),0_3px_12px_rgba(79,70,229,0.2)] hover:border-t-indigo-400/50 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4 shadow-[0_2px_6px_rgba(79,70,229,0.25)]">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2 flex items-center gap-2">
                Context-Aware AI Tutor
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Grounding
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Ask questions and receive instant answers grounded directly in your uploaded materials. Features 5 explanation modes: Simple (ELI5), Detailed, Exam-Ready, Analogies, and Code.
              </p>
            </div>
          </div>

          {/* Card 2: Smart Notes & Summaries */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141724] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.65),0_3px_12px_rgba(79,70,229,0.2)] hover:border-t-violet-400/50 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-400 flex items-center justify-center mb-4 shadow-[0_2px_6px_rgba(139,92,246,0.25)]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">
                Smart Notes &amp; Summaries
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Convert long lectures and 80-page PDFs into concise TL;DR revision notes, key takeaways, and bulleted exam tips.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-stone-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
              <span>Hierarchical concept breakdown</span>
            </div>
          </div>

          {/* Card 3: AI Quiz Generator */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141724] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.65),0_3px_12px_rgba(79,70,229,0.2)] hover:border-t-emerald-400/50 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4 shadow-[0_2px_6px_rgba(16,185,129,0.25)]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">
                AI Quiz Generator
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Generate custom MCQs, multiple-choice, and true/false questions tailored to your exact document chapters with instant pedagogical feedback.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-stone-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant rationale &amp; scoring</span>
            </div>
          </div>

          {/* Card 4: Interactive Flashcards */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141724] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.65),0_3px_12px_rgba(79,70,229,0.2)] hover:border-t-amber-400/50 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 shadow-[0_2px_6px_rgba(245,158,11,0.25)]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">
                Interactive Flashcards
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Harness active recall to solidify retention with 3D card flips, difficulty filtering, and mastery status tracking.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-stone-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Spaced repetition readiness</span>
            </div>
          </div>

          {/* Card 5: Formula & Definition Extraction */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141724] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.65),0_3px_12px_rgba(79,70,229,0.2)] hover:border-t-rose-400/50 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-4 shadow-[0_2px_6px_rgba(244,63,94,0.25)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">
                Formula &amp; Definitions
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Automatically identifies equations, scientific formulas, and terminology into clean copyable cheat sheets.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-stone-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
              <span>One-click clipboard copy</span>
            </div>
          </div>

          {/* Card 6: Timed Exam Mode (Span 2 cols on lg) */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-b from-[#141724] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.65),0_3px_12px_rgba(79,70,229,0.2)] hover:border-t-indigo-400/50 transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4 shadow-[0_2px_6px_rgba(79,70,229,0.25)]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2 flex items-center gap-2">
                Timed Exam Mode
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Simulation
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                Practice realistic university exam conditions with countdown timers, question palettes, flagging for review, auto-submission, and deep AI diagnostic reports.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#090A0F] border border-white/[0.06] text-xs font-mono text-emerald-400 flex items-center shadow-inner">
              <span>Time: 00:45:00 &bull; 30 Questions</span>
            </div>
          </div>

          {/* Card 7: Progress Analytics */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141724] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.65),0_3px_12px_rgba(79,70,229,0.2)] hover:border-t-cyan-400/50 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-4 shadow-[0_2px_6px_rgba(6,182,212,0.25)]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">
                Progress Analytics
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Understand your study streaks, quiz accuracy trends, and pinpoint exact weak topics requiring revision before test day.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-stone-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personalized mastery score</span>
            </div>
          </div>

          {/* Card 8: Personalized Study Planner */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141724] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.65),0_3px_12px_rgba(79,70,229,0.2)] hover:border-t-teal-400/50 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center mb-4 shadow-[0_2px_6px_rgba(20,184,166,0.25)]">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-white mb-2">
                Adaptive Study Planner
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Generates a timetable based on target exam dates, daily available hours, subject difficulty, and weak topics.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-stone-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              <span>Syncs with exam countdown</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. "FROM MATERIAL TO MASTERY" PIPELINE FLOW
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.07]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">
            FROM RAW DOCUMENT TO EXAM SUCCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            The Material-to-Mastery Pipeline
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            See how Cognora progressively elevates your study notes into concrete academic confidence.
          </p>
        </div>

        {/* Pipeline Visual Stages with 3D pill relief */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {[
            { id: 'upload', step: '01', title: 'YOUR MATERIAL', desc: 'Raw Notes & PDFs', icon: UploadCloud },
            { id: 'ai', step: '02', title: 'AI PARSES IT', desc: 'Synthesizes Context', icon: Brain },
            { id: 'study', step: '03', title: 'STUDY CONTENT', desc: 'Summaries & Cheatsheets', icon: FileText },
            { id: 'recall', step: '04', title: 'ACTIVE RECALL', desc: 'Spaced Flashcards', icon: Layers },
            { id: 'exam', step: '05', title: 'EXAM PRACTICE', desc: 'Timed Mock Tests', icon: Clock },
            { id: 'mastery', step: '06', title: 'BETTER SCORES', desc: 'Exam Readiness', icon: Award }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-gradient-to-b from-[#151724] to-[#0E1018] border-t border-t-white/[0.12] border-b border-b-black/50 border-x border-x-white/[0.07] shadow-[0_4px_12px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(79,70,229,0.2)] transition-all flex flex-col items-center text-center relative overflow-hidden"
              >
                <span className="text-[10px] font-mono text-indigo-400 font-bold mb-1">
                  STAGE {item.step}
                </span>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center my-2 shadow-inner">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-heading font-bold text-xs text-white uppercase tracking-wider">
                  {item.title}
                </span>
                <span className="text-[11px] text-stone-400 mt-0.5">
                  {item.desc}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. AI CHAT & EXAM PREVIEWS SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="interactive-previews" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.07]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* SECTION 9: AI CHAT PREVIEW */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#141624] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_12px_32px_-6px_rgba(0,0,0,0.55)] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-heading">
                  Context-Aware Doubt Solver
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Context grounded
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
              Ask Questions. Get Answers From Your Material.
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              Cognora doesn&apos;t give generic web answers. Every reply quotes and cites the exact page and section from your uploaded slides.
            </p>

            {/* Chat Box Container */}
            <div className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.07] space-y-4 shadow-inner">
              {/* Question */}
              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-stone-700 text-stone-200 flex items-center justify-center font-bold text-[10px] shrink-0">
                  U
                </div>
                <div className="p-3 rounded-xl bg-[#161824] border border-white/[0.06] text-stone-200">
                  Explain leaf node splitting in B+ Trees in simple terms.
                </div>
              </div>

              {/* Answer */}
              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  AI
                </div>
                <div className="p-3.5 rounded-xl bg-[#121422] border border-indigo-500/30 text-stone-200 space-y-2">
                  <p className="leading-relaxed">
                    Based on your uploaded lecture notes (<strong className="text-white">DBMS_Unit3_Indexing.pdf</strong>):
                  </p>
                  <p className="text-stone-300 leading-relaxed">
                    When a leaf node exceeds order <span className="font-mono text-indigo-300">M</span>, it splits into two leaf nodes. The first <span className="font-mono text-indigo-300">⌈M/2⌉</span> keys stay left, the rest go right, and a copy of the smallest right key is promoted to the parent.
                  </p>

                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-indigo-300 font-mono">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      DBMS_Unit3_Indexing.pdf &bull; Page 18
                    </span>
                    <span className="text-stone-400">100% matched</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 10: EXAM MODE & ANALYTICS PREVIEW */}
          <div className="space-y-6">
            {/* Exam Mode Interactive Preview */}
            <div className="p-7 rounded-2xl bg-gradient-to-b from-[#141624] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_12px_32px_-6px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-heading">
                    Mock Exam Simulation
                  </span>
                </div>
                <div className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  00:42:17
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                <span className="font-semibold text-white">Mock Exam &mdash; Data Structures</span>
                <span className="font-mono text-indigo-400">Question 12 / 30</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-4">
                <div className="w-[40%] h-full bg-indigo-500 rounded-full" />
              </div>

              <div className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.06] mb-4">
                <p className="text-xs text-stone-200 font-medium mb-3">
                  What is the space complexity of an iterative Breadth First Search (BFS) on a balanced binary tree of N nodes?
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-[#141620] border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
                    <span>A. O(N) at leaf level</span>
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="p-2 rounded-lg bg-[#141620] border border-white/[0.06] text-stone-400">
                    B. O(1) constant
                  </div>
                </div>
              </div>

              {/* Small Diagnostic Results Preview */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-[#090A0F] border border-white/[0.06]">
                  <div className="font-heading font-extrabold text-base text-white">88%</div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Score</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#090A0F] border border-white/[0.06]">
                  <div className="font-heading font-extrabold text-base text-emerald-400">92%</div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Accuracy</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#090A0F] border border-white/[0.06]">
                  <div className="font-heading font-extrabold text-base text-indigo-400">+14m</div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider">Pacing Delta</div>
                </div>
              </div>
            </div>

            {/* SECTION 11: PROGRESS & ANALYTICS MINI CARD */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141624] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-bold text-stone-200 uppercase tracking-wider font-heading">
                    Study Streak &amp; Target Mastery
                  </span>
                </div>
                <span className="text-xs font-semibold text-orange-400 flex items-center gap-1">
                  7-Day Streak
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-300">Data Structures</span>
                    <span className="font-mono text-indigo-400 font-bold">85%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="w-[85%] h-full bg-indigo-500 rounded-full" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-stone-300">DBMS</span>
                    <span className="font-mono text-emerald-400 font-bold">78%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="w-[78%] h-full bg-emerald-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          12. TRUST / VALUE SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.07]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2">
            PEDAGOGICAL DESIGN
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Built Around How Students Actually Learn
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            Cognora relies on scientifically validated learning principles &mdash; not passive re-reading.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141624] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:border-t-indigo-400/50 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shadow-[0_2px_6px_rgba(79,70,229,0.2)]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-white">
              Active Recall
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Practice retrieving information through testing and flashcard prompts instead of passive, low-retention highlighting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141624] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:border-t-violet-400/50 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center shadow-[0_2px_6px_rgba(139,92,246,0.2)]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-white">
              Personalized Learning
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Study schedules and quiz generators adapt dynamically to your identified weak topics, enrolled subjects, and exam dates.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141624] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:border-t-emerald-400/50 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shadow-[0_2px_6px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-white">
              Context-Aware Grounding
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Strict document grounding guarantees explanations match your professor&apos;s curriculum without inaccurate hallucinations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141624] to-[#0E1018] border-t border-t-white/[0.14] border-b border-b-black/60 border-x border-x-white/[0.07] shadow-[0_8px_20px_-4px_rgba(0,0,0,0.45)] hover:-translate-y-1 hover:border-t-amber-400/50 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shadow-[0_2px_6px_rgba(245,158,11,0.2)]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-white">
              Exam Preparation
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Realistic timed simulations replicate high-pressure exams so you walk into test halls confident and fully prepared.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          13. FINAL CTA SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#141624] to-[#0D0F18] border-t border-t-indigo-400/40 border-b border-b-black/80 border-x border-indigo-500/30 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),0_12px_32px_rgba(79,70,229,0.25)] overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-4">
            BEGIN YOUR STUDY REVOLUTION
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight max-w-2xl mx-auto mb-4">
            Your Notes Are Waiting. Let&apos;s Start Learning.
          </h2>

          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Upload your first study material and let AI turn it into a personalized study experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onStartStudying}
              className="relative w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-bold text-white bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-700 border-t border-indigo-300/50 shadow-[0_6px_0_0_#3730a3,0_16px_30px_-4px_rgba(79,70,229,0.5)] hover:shadow-[0_8px_0_0_#3730a3,0_22px_36px_-4px_rgba(79,70,229,0.65)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-[5px] active:shadow-[0_1px_0_0_#3730a3,0_6px_12px_rgba(79,70,229,0.35)] transition-all flex items-center justify-center gap-2.5 cursor-pointer group select-none"
            >
              <span>Start Studying Free</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FOOTER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="relative z-10 border-t border-white/[0.07] py-10 px-4 sm:px-6 lg:px-8 bg-[#07080C] text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CognoraLogo
              size="sm"
              subtitle="AI Study Assistant"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-stone-400">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('interactive-previews')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Interactive Demos
            </button>
            <button
              onClick={() => handleOpenSignIn('signin')}
              className="hover:text-white transition-colors cursor-pointer text-indigo-400 font-semibold"
            >
              Log in
            </button>
            <button
              onClick={() => handleOpenSignIn('signup')}
              className="hover:text-white transition-colors cursor-pointer text-stone-300"
            >
              Create Account
            </button>
          </div>

          <div className="text-stone-400">
            &copy; 2026 Cognora &bull; Your Materials. Your Knowledge. Your AI Tutor.
          </div>
        </div>
      </footer>

      {/* Sign In / Login Authentication Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        initialMode={signInInitialMode}
        currentUser={currentUser}
        onSuccess={(authProfile) => {
          if (onLoginSuccess) {
            onLoginSuccess(authProfile);
          } else {
            onStartStudying();
          }
        }}
      />
    </div>
  );
};
