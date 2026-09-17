import React from 'react';
import {
  X,
  Brain,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  GraduationCap,
  Heart,
  Target
} from 'lucide-react';
import { CognoraLogo } from './CognoraLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartStudying?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onStartStudying
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="dark fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-[#0F1118] border-t sm:border border-white/[0.12] rounded-t-3xl sm:rounded-3xl max-w-2xl w-full shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(79,70,229,0.18)] overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] pb-safe text-stone-200 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        {/* Glow ambient background inside modal */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mobile Drag Handle */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden relative z-10">
          <div className="w-12 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between relative z-10 bg-[#0F1118]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <CognoraLogo size="sm" showSubtitle={false} theme="dark" />
            <div>
              <h2 className="font-heading font-bold text-base text-white">
                About Cognora AI
              </h2>
              <p className="text-[11px] text-stone-400">
                Your materials. Your knowledge. Your AI tutor.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed relative z-10">
          {/* Mission Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-[#141727] to-[#0E1019] border border-indigo-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.35)] space-y-2.5 relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10.5px] font-semibold font-mono uppercase">
              <Sparkles className="w-3 h-3 text-indigo-400" /> Our Mission
            </div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-white">
              Bridging the gap between messy study materials and academic mastery.
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Every semester, students drown in hundreds of slides, dense textbook chapters, and fragmented lecture notes. Cognora was built to transform any academic document into an interactive, high-yield study suite in seconds.
            </p>
          </div>

          {/* Three Core Pillars */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-stone-400 font-mono">
              The Three Core Pillars
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#141624] border border-white/[0.08] space-y-2 hover:border-indigo-500/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="font-heading font-bold text-xs text-white">
                  Zero Hallucinations
                </div>
                <p className="text-[11px] leading-relaxed text-stone-400">
                  Every explanation, summary, and formula is verified and grounded strictly in your uploaded materials with exact citations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141624] border border-white/[0.08] space-y-2 hover:border-emerald-500/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="font-heading font-bold text-xs text-white">
                  Active Recall Engine
                </div>
                <p className="text-[11px] leading-relaxed text-stone-400">
                  Automatically builds multi-tier flashcards, topic quizzes, and short revision sheets optimized for spaced repetition.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141624] border border-white/[0.08] space-y-2 hover:border-amber-500/40 transition-all">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div className="font-heading font-bold text-xs text-white">
                  Timed Exam Mode
                </div>
                <p className="text-[11px] leading-relaxed text-stone-400">
                  Simulates strict university examination conditions with countdown timers and AI diagnostic performance breakdowns.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Integrity & Student First */}
          <div className="p-4 rounded-xl bg-[#141624]/60 border border-white/[0.06] space-y-1.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-indigo-300 font-mono">
              Academic Integrity & Standards
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Cognora is an academic study companion, not a shortcut. We encourage active problem-solving through targeted flashcards, doubt clarification, and diagnostic mock tests designed to strengthen conceptual understanding rather than promoting rote memorization.
            </p>
          </div>

          {/* Key Facts */}
          <div className="p-4 rounded-xl bg-[#121420] border border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div>
              <div className="font-heading font-extrabold text-lg text-indigo-400">100%</div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider">Grounded in Docs</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-lg text-emerald-400">0s</div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider">Downtime Fallbacks</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-lg text-violet-400">5+</div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider">File Types Supported</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-lg text-amber-400">Safe</div>
              <div className="text-[10px] text-stone-400 uppercase tracking-wider">Private & Secure</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-[#0A0B10] flex items-center justify-between relative z-10">
          <span className="text-[11px] text-stone-400 font-mono">
            Version 2.0 &bull; 2026
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-white/[0.12] hover:bg-white/[0.08] text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            {onStartStudying && (
              <button
                onClick={() => {
                  onClose();
                  onStartStudying();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 hover:brightness-110 text-white shadow-[0_4px_12px_rgba(79,70,229,0.4)] transition-all cursor-pointer"
              >
                Start Studying Free
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
