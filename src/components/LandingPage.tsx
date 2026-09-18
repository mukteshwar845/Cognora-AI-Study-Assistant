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
  GraduationCap,
  Menu,
  X,
  Compass,
  Check,
  Award,
  Search,
  Flame,
  TrendingUp,
  LogIn,
  Scale,
  Play,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { CognoraLogo } from './CognoraLogo';
import { SignInModal } from './SignInModal';
import { AboutModal } from './AboutModal';
import { PrivacyModal } from './PrivacyModal';
import { UserProfile } from '../types';

interface LandingPageProps {
  onStartStudying: () => void;
  currentUser?: UserProfile;
  onLoginSuccess?: (user: UserProfile) => void;
  onOpenUpload?: () => void;
  onExploreDemo?: () => void;
}

const DEMO_PREVIEWS: Record<string, {
  subject: string;
  badge: string;
  icon: string;
  material: string;
  summary: string;
  question: string;
  answer: string;
  citation: string;
  formula: string;
  formulaName: string;
  vivaQuestion: string;
}> = {
  stem: {
    subject: 'Physics',
    badge: 'STEM & Physical Sciences',
    icon: '⚛️',
    material: 'Physics — Kinematics & Newton’s Laws',
    summary: 'Derives core kinematic equations v = u + at, s = ut + ½at², v² = u² + 2as. Explains friction and momentum conservation.',
    question: 'How do I solve for distance under uniform acceleration when final velocity is given without time t?',
    answer: 'Use the third kinematic equation: v² = u² + 2as. Rearranging for displacement s gives: s = (v² - u²) / (2a). This eliminates the time parameter completely.',
    citation: 'Unit 2: Kinematics & Motion • Page 14',
    formula: 'v² = u² + 2as  ⟹  s = (v² - u²) / (2a)',
    formulaName: 'Third Equation of Motion',
    vivaQuestion: 'State Newton’s 2nd Law in terms of momentum (F = dp/dt) [2 Marks]'
  },
  bio: {
    subject: 'Biology',
    badge: 'Medical & Genetics',
    icon: '🧬',
    material: 'Cellular Biology & Genetics — Mitosis & DNA',
    summary: 'Covers stages of Mitosis (PMAT), chromosome condensation, spindle apparatus attachment, and Mendelian 9:3:3:1 ratio.',
    question: 'What is the critical checkpoint in Mitosis where spindle assembly is verified before anaphase?',
    answer: 'The M-Checkpoint (Spindle Assembly Checkpoint) occurs at the transition from metaphase to anaphase. It ensures all sister chromatids are correctly attached to kinetochore microtubules before separation.',
    citation: 'Chapter 4: Cell Division • Page 29',
    formula: '2^n possible gametes (n = number of heterozygous pairs)',
    formulaName: 'Independent Assortment Rule',
    vivaQuestion: 'Differentiate between Metaphase and Anaphase chromosome alignment [2 Marks]'
  },
  econ: {
    subject: 'Economics',
    badge: 'Commerce & Business',
    icon: '📊',
    material: 'Microeconomics — Price Elasticity & Market Pricing',
    summary: 'Formulates Midpoint Price Elasticity of Demand (PED), total revenue test, and consumer surplus under market equilibrium.',
    question: 'Why is the midpoint formula preferred over point elasticity for calculating percentage change in demand?',
    answer: 'The midpoint formula uses the average of initial and final values as the base denominator. This ensures the elasticity coefficient remains identical whether price moves upward or downward between two points.',
    citation: 'Unit 3: Elasticity & Market Theory • Page 42',
    formula: 'Ed = [ (Q2 - Q1) / ((Q1 + Q2) / 2) ] / [ (P2 - P1) / ((P1 + P2) / 2) ]',
    formulaName: 'Midpoint Price Elasticity Formula',
    vivaQuestion: 'What does |Ed| > 1 signify for a firm’s pricing strategy? [2 Marks]'
  },
  cs: {
    subject: 'Computer Science',
    badge: 'Tech & Engineering',
    icon: '💻',
    material: 'Data Structures — Stacks, Queues & Linked Lists',
    summary: 'Linear data structures with time-space asymptotic complexity. Circular queue overflow prevention and LIFO/FIFO operations.',
    question: 'Why does a circular queue require (rear + 1) % capacity == front for detecting full buffer condition?',
    answer: 'In an array of capacity N, leaving one slot unused avoids the ambiguity where front == rear could mean either empty or full. When (rear + 1) % N == front, the buffer is recognized as full in O(1) time.',
    citation: 'Unit 1: Stacks & Queues • Page 22',
    formula: 'next_index = (current_index + 1) % Capacity',
    formulaName: 'Circular Array Wrap-around Formula',
    vivaQuestion: 'Why is linked list insertion O(1) compared to array shifting O(n)? [2 Marks]'
  }
};

const EDUCATION_TIERS_LANDING = [
  {
    tier: 'Minor & Middle School',
    level: 'Grades 1-8',
    icon: '🎒',
    accent: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    title: 'Intuitive Foundations & Science',
    desc: 'Uses beginner-friendly ELI10 metaphors, real-world analogies, step-by-step arithmetic explanations, and visual cards to make core subjects easy and fun.',
    subjects: ['General Science', 'Mathematics & Fractions', 'Social Studies', 'Grammar']
  },
  {
    tier: 'High School & Boards',
    level: 'Grades 9-12',
    icon: '🏫',
    accent: 'border-blue-500/30 text-blue-300 bg-blue-500/10',
    title: 'Board Exam Mastery & STEM',
    desc: 'Bridges school curricula to board excellence with high-yield 2/5/10-mark questions, numerical derivations, formula sheets, and practice drills.',
    subjects: ['Physics (Mechanics)', 'Chemistry (Organic)', 'Calculus & Algebra', 'Biology']
  },
  {
    tier: 'Undergraduate (UG / College)',
    level: 'Bachelors Degree',
    icon: '🎓',
    accent: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
    title: 'University Semester Excellence',
    desc: 'Built for Engineering (B.Tech), Medicine (MBBS), Commerce (B.Com/BBA), Science, and Law with syllabus breakdown and past-paper patterns.',
    subjects: ['Data Structures & DBMS', 'Micro & Macroeconomics', 'Biochemistry', 'Business Law']
  },
  {
    tier: 'Postgraduate (PG / Masters)',
    level: 'Masters & Doctorate',
    icon: '🏛️',
    accent: 'border-purple-500/30 text-purple-300 bg-purple-500/10',
    title: 'Research & Advanced Theory',
    desc: 'Tailored for rigorous academic papers, complex mathematical proofs, case analysis, dissertation review, and graduate seminar synthesis.',
    subjects: ['Distributed Systems & AI', 'Financial Econometrics', 'Constitutional Law', 'Genomics']
  },
  {
    tier: 'Competitive Exam Aspirants',
    level: 'JEE • NEET • UPSC • SAT • GRE',
    icon: '🎯',
    accent: 'border-rose-500/30 text-rose-300 bg-rose-500/10',
    title: 'Speed, Accuracy & High-Yield Recall',
    desc: 'Timed mock test simulations, negative marking calculators, speed-accuracy diagnostics, formula recall sheets, and rapid doubt clearance.',
    subjects: ['JEE Advanced Math', 'NEET Biology Drills', 'UPSC Polity & Civics', 'GRE Quantitative']
  },
  {
    tier: 'Professional & Lifelong',
    level: 'Certifications & Upskilling',
    icon: '💼',
    accent: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10',
    title: 'Practical Execution & Frameworks',
    desc: 'Fast-track technical upskilling, case study breakdowns, industry certification prep (AWS, PMP, CFA, Bar exams), and hands-on problem sets.',
    subjects: ['System Architecture', 'Corporate Finance', 'Regulatory Compliance', 'Executive Prep']
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartStudying,
  currentUser,
  onLoginSuccess
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [signInInitialMode, setSignInInitialMode] = useState<'signin' | 'signup'>('signin');
  const [activeDemoTab, setActiveDemoTab] = useState<string>('stem');
  const [interactiveQuizAnswer, setInteractiveQuizAnswer] = useState<string | null>(null);

  const activeDemo = DEMO_PREVIEWS[activeDemoTab] || DEMO_PREVIEWS.stem;

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
    <div className="dark min-h-screen bg-[#07080D] text-stone-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200 antialiased relative overflow-x-hidden">
      {/* Dynamic Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] w-[650px] h-[650px] bg-indigo-600/12 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[30%] right-[-8%] w-[550px] h-[550px] bg-violet-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
        {/* Subtle engineering grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. MODERN STICKY NAVBAR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07080D]/85 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-3">
            <CognoraLogo
              size="md"
              subtitle="Universal AI Study Suite"
              theme="dark"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-stone-300">
            <button
              onClick={() => scrollToSection('education-tiers')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>All Educations</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">New</span>
            </button>
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
              Live Demo
            </button>
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleOpenSignIn('signin')}
              className="px-3 py-1.5 text-xs font-semibold text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-400" />
              <span>Log in</span>
            </button>

            <button
              onClick={onStartStudying}
              className="px-4 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md hover:shadow-indigo-500/25 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
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
          <div className="md:hidden border-b border-white/[0.08] bg-[#0C0E15] px-6 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-3 text-sm font-medium text-stone-300">
              <button
                onClick={() => scrollToSection('education-tiers')}
                className="text-left py-1 hover:text-white cursor-pointer flex items-center justify-between"
              >
                <span>All Educations & Grades</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">K-12 to PG</span>
              </button>
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
                Live Demo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAboutOpen(true);
                }}
                className="text-left py-1 hover:text-white cursor-pointer"
              >
                About Cognora
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsPrivacyOpen(true);
                }}
                className="text-left py-1 hover:text-white cursor-pointer"
              >
                Privacy & Data Security
              </button>
            </div>
            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
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
                  onStartStudying();
                }}
                className="py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md text-center flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Launch Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. HERO SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Eye-catching badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-medium mb-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Universal AI Study Assistant & Doubt Solver</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Powerful Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight max-w-5xl leading-[1.08] text-white mb-6">
          Turn Any Study Material Into Your{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Personal AI Tutor.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-stone-300 max-w-3xl leading-relaxed mb-9 font-normal">
          Designed for all students—from <strong>Middle School &amp; High School</strong> to <strong>Undergraduate, Postgraduate, and Competitive Exams</strong>. Upload textbooks, PDFs, slides, or notes. Get verified summaries, formulas, 2/5/10-mark questions, quizzes, and grounded citations with zero hallucinations.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
          <button
            onClick={onStartStudying}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-[0_10px_30px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(79,70,229,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer select-none group"
          >
            <span>Start Studying Free</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('interactive-previews')}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm sm:text-base font-semibold text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Play className="w-4 h-4 text-indigo-400 fill-indigo-400/40" />
            <span>Explore Live Demos</span>
          </button>
        </div>

        {/* Micro Credibility Trust Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Grounded in Your Notes</span>
          </div>
          <span className="hidden sm:inline text-stone-600">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Exact Page &amp; Section Citations</span>
          </div>
          <span className="hidden sm:inline text-stone-600">•</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>For STEM, Medicine, Commerce &amp; Arts</span>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            3. INTERACTIVE HIGH-FIDELITY APP SHOWCASE MOCKUP
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-14 w-full max-w-5xl rounded-3xl bg-gradient-to-b from-white/10 to-white/[0.02] p-2 sm:p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(79,70,229,0.15)] border border-white/[0.12] backdrop-blur-2xl">
          <div className="rounded-2xl bg-[#0E1017] border border-white/[0.08] overflow-hidden text-left shadow-2xl">
            {/* Mockup Top Window Bar */}
            <div className="px-4 py-3 bg-[#131520] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-stone-400 hidden sm:inline">
                  Cognora Workspace — Intelligent Academic Suite
                </span>
              </div>

              {/* Subject demo switcher */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {Object.entries(DEMO_PREVIEWS).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setActiveDemoTab(key)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeDemoTab === key
                        ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                        : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{item.icon}</span> <span className="hidden sm:inline">{item.subject}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mockup Interactive Body */}
            <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start bg-gradient-to-b from-[#0E1017] to-[#0A0C12]">
              {/* Left Column: Active Document & Doubt Solver */}
              <div className="lg:col-span-7 space-y-4">
                {/* Active Material Header */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center font-bold shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{activeDemo.material}</div>
                      <div className="text-[11px] text-stone-400 truncate">{activeDemo.badge}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shrink-0">
                    Grounded
                  </span>
                </div>

                {/* Question and Answer Simulation */}
                <div className="space-y-3">
                  {/* User Query */}
                  <div className="p-3.5 rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-xs text-indigo-100 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      Q
                    </span>
                    <p className="leading-relaxed">{activeDemo.question}</p>
                  </div>

                  {/* AI Tutor Response with Citation */}
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-stone-200 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-indigo-300 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        AI Verified Explanation
                      </span>
                      <span className="text-emerald-400 font-semibold">100% Match</span>
                    </div>

                    <p className="text-stone-300 leading-relaxed text-xs sm:text-[13px]">{activeDemo.answer}</p>

                    {/* Exact Citation Badge */}
                    <div className="p-2.5 rounded-lg bg-[#07080D] border border-white/[0.06] flex items-center justify-between text-[11px] text-stone-400 font-mono">
                      <span className="flex items-center gap-1.5 text-indigo-300">
                        <BookOpen className="w-3 h-3 text-indigo-400" />
                        Source: {activeDemo.citation}
                      </span>
                      <span className="text-stone-500 hidden sm:inline">Context Grounded</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Formulas & Exam Questions */}
              <div className="lg:col-span-5 space-y-3.5">
                {/* Working Formula Card */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 uppercase font-mono font-bold">
                    <span>Extracted Formula</span>
                    <span className="text-indigo-400">Hub Ready</span>
                  </div>
                  <div className="text-xs font-semibold text-white">{activeDemo.formulaName}</div>
                  <div className="p-2.5 rounded-lg bg-[#07080D] border border-white/[0.08] font-mono text-xs text-indigo-300 font-bold overflow-x-auto">
                    <code>{activeDemo.formula}</code>
                  </div>
                </div>

                {/* Important Exam Question Card */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 uppercase font-mono font-bold">
                    <span>High-Yield Question</span>
                    <span className="text-amber-400 font-semibold">Exam Probable</span>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed font-medium">
                    {activeDemo.vivaQuestion}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Includes Expected Examiner Points</span>
                    <span className="text-indigo-400 font-semibold cursor-pointer hover:underline">Reveal Answer &rarr;</span>
                  </div>
                </div>

                {/* Quick Launch CTA */}
                <button
                  onClick={onStartStudying}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>Open This Subject in Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. ALL EDUCATIONS & GRADES SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="education-tiers" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2 font-mono">
            UNIVERSAL ACADEMIC COVERAGE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Built for Every Education Tier &amp; Subject
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            Cognora dynamically tunes its pedagogy, explanation depth, question formats, and formula indexing to match your academic level.
          </p>
        </div>

        {/* 6 Education Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EDUCATION_TIERS_LANDING.map((tier) => (
            <div
              key={tier.tier}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#131622] to-[#0D0F18] border border-white/[0.08] hover:border-indigo-400/40 shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10 inline-block shadow-xs">
                    {tier.icon}
                  </span>
                  <span className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full border ${tier.accent}`}>
                    {tier.level}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                    {tier.tier}
                  </h3>
                  <div className="text-xs text-indigo-400/90 font-medium mt-0.5">
                    {tier.title}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {tier.desc}
                </p>
              </div>

              {/* Sample subjects enrolled */}
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] space-y-1.5">
                <div className="text-[10px] font-mono text-stone-400 uppercase font-semibold">Example Modules:</div>
                <div className="flex flex-wrap gap-1.5">
                  {tier.subjects.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-stone-300 border border-white/[0.06]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. CONNECTED 3-STEP WORKFLOW
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2 font-mono">
            HOW COGNORA WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            From Raw Notes to Exam Mastery in 3 Steps
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            No complex prompt engineering required. Drop your files and let Cognora organize your study path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 relative">
          {/* STEP 01 */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#141624] to-[#0D0F18] border border-white/[0.08] hover:border-indigo-400/40 shadow-lg flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono font-extrabold text-2xl text-indigo-400">01</span>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <UploadCloud className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">Upload Any Document</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Drop your lecture PDFs, PowerPoint slides, typed notes, syllabus outlines, or scanned textbook chapters in seconds.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-stone-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>PDF • DOCX • PPTX • Images • Text</span>
            </div>
          </div>

          {/* STEP 02 */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#141624] to-[#0D0F18] border border-white/[0.08] hover:border-violet-400/40 shadow-lg flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono font-extrabold text-2xl text-violet-400">02</span>
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Brain className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">Automated Knowledge Synthesis</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Cognora extracts equations, isolates critical definitions, generates 2/5/10-mark questions, and builds memory flashcards.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-violet-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Formulas, Summaries &amp; Questions</span>
            </div>
          </div>

          {/* STEP 03 */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-[#141624] to-[#0D0F18] border border-white/[0.08] hover:border-emerald-400/40 shadow-lg flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono font-extrabold text-2xl text-emerald-400">03</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">Practice &amp; Ace Exams</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Clear doubts with exact page citations, solve adaptive quizzes, practice timed mock exams, and pinpoint weak topics before test day.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Target 90%+ Exam Readiness</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. FEATURE SHOWCASE (BENTO GRID)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="features" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2 font-mono">
            COMPREHENSIVE ENGINE SUITE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Everything You Need to Study Smarter
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            A cohesive suite of academic tools tailored directly to coursework and high-stakes examination prep.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Context-Aware AI Tutor (Span 2 cols) */}
          <div className="md:col-span-2 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#151825] to-[#0D0F18] border border-white/[0.08] hover:border-indigo-400/40 shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/25">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2 flex items-center gap-2">
                <span>Context-Aware AI Tutor</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Grounding
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                Ask any doubt and receive verified answers grounded directly in your uploaded notes. Features 5 explanation styles: <strong>Simple (ELI10)</strong>, <strong>Detailed Academic</strong>, <strong>Exam-Ready Bullet Points</strong>, <strong>Analogies</strong>, and <strong>Code Walkthroughs</strong>.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#090A0F] border border-white/[0.06] text-xs font-mono text-indigo-300 flex items-center justify-between">
              <span>Cites exact document, page &amp; formula</span>
              <span className="text-emerald-400">✓ Zero Hallucinations</span>
            </div>
          </div>

          {/* Card 2: Formulas & Rules Hub */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#151825] to-[#0D0F18] border border-white/[0.08] hover:border-violet-400/40 shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-400 flex items-center justify-center mb-4 border border-violet-500/25">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                All Formulas in One Place
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Centralized mathematical equations, scientific laws, economic elasticity formulas, and complexity bounds with 1-click copy and cheat-sheet export.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-violet-300 flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Multi-disciplinary Formula Index</span>
            </div>
          </div>

          {/* Card 3: Important Questions Engine */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#151825] to-[#0D0F18] border border-white/[0.08] hover:border-amber-400/40 shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/25">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Important Questions Hub
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Granular categorization into 2-mark definitions, 5-mark conceptual derivations, and 10-mark long questions with Expected Examiner Points.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-amber-300 flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Active Recall Hidden Answers</span>
            </div>
          </div>

          {/* Card 4: AI Adaptive Quiz Generator */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#151825] to-[#0D0F18] border border-white/[0.08] hover:border-emerald-400/40 shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/25">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Adaptive Quiz Engine
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Synthesizes MCQs, multiple-answer checks, and true/false drills with difficulty filters and detailed reasoning for every question.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-emerald-300 flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Save custom quizzes to library</span>
            </div>
          </div>

          {/* Card 5: Interactive Flashcards */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#151825] to-[#0D0F18] border border-white/[0.08] hover:border-pink-400/40 shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center mb-4 border border-pink-500/25">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Active Recall Flashcards
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Harness scientifically proven active recall with 3D flip cards, difficulty tiers, and spaced repetition tracking.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-pink-300 flex items-center gap-1.5 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mastery status breakdown</span>
            </div>
          </div>

          {/* Card 6: Realistic Timed Exam Simulation (Span 2 cols) */}
          <div className="md:col-span-2 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#151825] to-[#0D0F18] border border-white/[0.08] hover:border-indigo-400/40 shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/25">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2 flex items-center gap-2">
                <span>Timed Exam Mode</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Simulation
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                Replicate university examination conditions with countdown timers, question palettes, flagging for review, automated submission, and diagnostic scorecards identifying weak areas.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-[#090A0F] border border-white/[0.06] text-xs font-mono text-emerald-400 flex items-center justify-between">
              <span>Full exam hall conditions</span>
              <span>Countdown Timer &bull; Auto-Grading</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. INTERACTIVE PREVIEW & QUIZ CHALLENGE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="interactive-previews" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-2 font-mono">
            EXPERIENCE THE POWER
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            See Cognora in Action
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            Try an interactive doubt query or answer a mock exam challenge right here.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Live Doubt Simulator */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#131522] to-[#0A0C12] border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                  Interactive Doubt Solver
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Preview
              </span>
            </div>

            <h3 className="font-heading font-bold text-xl text-white">
              Instant Verified Answers Grounded in Your Notes
            </h3>

            {/* Chat preview box */}
            <div className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.06] space-y-3 font-sans">
              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-stone-700 text-stone-200 flex items-center justify-center font-bold text-[10px] shrink-0">
                  U
                </div>
                <div className="p-3 rounded-xl bg-[#161824] border border-white/[0.06] text-stone-200 leading-relaxed">
                  Explain the midpoint price elasticity formula and why economists prefer it.
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  AI
                </div>
                <div className="p-3.5 rounded-xl bg-[#121422] border border-indigo-500/30 text-stone-200 space-y-2">
                  <p className="text-stone-300 leading-relaxed text-xs">
                    From your notes (<strong className="text-white">Microeconomics_Unit3.pdf</strong>):
                  </p>
                  <p className="text-stone-200 leading-relaxed">
                    The midpoint formula calculates elasticity by dividing percentage change in quantity by percentage change in price, using average initial and final values. This ensures identical results whether moving up or down the demand curve.
                  </p>
                  <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-indigo-300 font-mono">
                    <span>📖 Microeconomics_Unit3.pdf &bull; Page 42</span>
                    <span className="text-emerald-400">100% Citing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-stone-400">
              <span>Supports 5 explanation styles including ELI10 and Exam Ready.</span>
            </div>
          </div>

          {/* Interactive Exam Challenge Box */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#131522] to-[#0A0C12] border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Mock Exam Challenge
                </span>
              </div>
              <div className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                00:44:12
              </div>
            </div>

            <h3 className="font-heading font-bold text-xl text-white">
              Try a Real Academic Practice Question
            </h3>

            <div className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <span>Physics &bull; Kinematics</span>
                <span className="text-indigo-400">Q 8 / 25</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-200 font-medium leading-relaxed">
                A particle starts from rest (u = 0) with uniform acceleration a = 4 m/s². What is its velocity after traveling a distance of 18 meters?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { id: 'a', text: 'A. 12 m/s', correct: true },
                  { id: 'b', text: 'B. 9 m/s', correct: false },
                  { id: 'c', text: 'C. 16 m/s', correct: false },
                  { id: 'd', text: 'D. 24 m/s', correct: false },
                ].map((opt) => {
                  const isChosen = interactiveQuizAnswer === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setInteractiveQuizAnswer(opt.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isChosen
                          ? opt.correct
                            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold'
                            : 'bg-rose-950/50 border-rose-500 text-rose-200 font-bold'
                          : 'bg-[#141620] border-white/[0.06] text-stone-300 hover:border-indigo-400'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isChosen && (opt.correct ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-rose-400" />)}
                    </button>
                  );
                })}
              </div>

              {interactiveQuizAnswer && (
                <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-300 font-mono leading-relaxed">
                  ✓ Explanation: v² = u² + 2as = 0 + 2(4)(18) = 144  ⟹  v = √144 = 12 m/s.
                </div>
              )}
            </div>

            <button
              onClick={onStartStudying}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>Take Full Timed Mock Exam</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. FINAL CALL TO ACTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#141624] via-[#0E1018] to-[#090A0F] border border-indigo-500/30 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),0_12px_32px_rgba(79,70,229,0.25)] overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block mb-4 font-mono">
            JOIN FOCUSED LEARNERS WORLDWIDE
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight max-w-2xl mx-auto mb-4">
            Your Notes Are Waiting. Turn Them Into High Grades.
          </h2>

          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Upload your materials in seconds. No complex setups, zero hallucinations, and personalized for your exact education level.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onStartStudying}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-[0_10px_30px_-5px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>Start Studying Free Now</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. CLEAN MODERN FOOTER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#05060A] pt-14 pb-12 px-4 sm:px-6 lg:px-8 text-stone-400">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Col 1 & 2: Brand & Trust */}
            <div className="lg:col-span-2 space-y-4">
              <CognoraLogo
                size="md"
                subtitle="Universal AI Study Suite"
                theme="dark"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
              <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
                Cognora transforms lecture slides, textbooks, and notes into active recall flashcards, timed exam simulations, formula hub sheets, and document-grounded AI tutoring.
              </p>

              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-medium text-indigo-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>100% Student Data Confidentiality &amp; Protection</span>
                </div>
              </div>
            </div>

            {/* Col 3: Platform */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-stone-200">
                Platform
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button onClick={() => scrollToSection('education-tiers')} className="text-stone-400 hover:text-white transition-colors cursor-pointer text-left">
                    All Educations (K-12 to PG)
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="text-stone-400 hover:text-white transition-colors cursor-pointer text-left">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('features')} className="text-stone-400 hover:text-white transition-colors cursor-pointer text-left">
                    Core Engines
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('interactive-previews')} className="text-stone-400 hover:text-white transition-colors cursor-pointer text-left">
                    Interactive Demos
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Mission & Integrity */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-stone-200">
                Academic Mission
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button onClick={() => setIsAboutOpen(true)} className="text-stone-400 hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <span>About Cognora</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">Mission</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsAboutOpen(true)} className="text-stone-400 hover:text-white transition-colors cursor-pointer text-left">
                    Active Recall Methodology
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsAboutOpen(true)} className="text-stone-400 hover:text-white transition-colors cursor-pointer text-left">
                    Zero-Hallucination Grounding
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 5: Privacy */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-stone-200">
                Privacy &amp; Security
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button onClick={() => setIsPrivacyOpen(true)} className="text-stone-400 hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5">
                    <span>Privacy Policy</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Protected</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsPrivacyOpen(true)} className="text-stone-400 hover:text-white transition-colors cursor-pointer text-left">
                    Zero AI Model Training
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsPrivacyOpen(true)} className="text-stone-400 hover:text-white transition-colors cursor-pointer text-left">
                    Local Device Encryption
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span>&copy; 2026 Cognora AI Study Assistant. Built for focused learners worldwide.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-stone-400">
              <button onClick={() => setIsAboutOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                About
              </button>
              <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                Privacy
              </button>
              <button onClick={() => handleOpenSignIn('signin')} className="hover:text-white transition-colors cursor-pointer text-indigo-400 font-semibold">
                Log in
              </button>
              <button onClick={onStartStudying} className="hover:text-white transition-colors cursor-pointer text-stone-200 font-bold">
                Launch App &rarr;
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
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

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onStartStudying={onStartStudying}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
};
