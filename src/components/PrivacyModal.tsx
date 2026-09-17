import React from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  EyeOff,
  Server,
  FileCheck,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { CognoraLogo } from './CognoraLogo';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const sections = [
    {
      icon: ShieldCheck,
      title: '1. 100% Student Data Ownership',
      text: 'All course notes, textbook extracts, lecture slide decks, syllabus outlines, and study cards uploaded to Cognora remain 100% your intellectual property. We claim zero copyright or ownership over your content.'
    },
    {
      icon: EyeOff,
      title: '2. Zero Training on Your Documents',
      text: 'We never use your notes, uploaded documents, test scores, or AI doubt queries to train public foundation models or language models. Your files are isolated strictly to your own personal learning workspace.'
    },
    {
      icon: Server,
      title: '3. Scoped Ephemeral Analysis',
      text: 'When you upload material, our backend extracts text and structured knowledge solely to generate your personal study summaries, quizzes, and flashcards. No unauthorized third party has access to your academic records.'
    },
    {
      icon: Trash2,
      title: '4. Immediate Permanent Deletion',
      text: 'You have full autonomy over your data. Deleting a document from "My Library" instantly purges its raw text, generated flashcards, quizzes, and associated doubt contexts from the system.'
    },
    {
      icon: Lock,
      title: '5. End-to-End Transit Encryption',
      text: 'All data in transit between your browser and our backend is protected using modern HTTPS with TLS 1.3 encryption, ensuring confidentiality on campus Wi-Fi and public networks.'
    },
    {
      icon: FileCheck,
      title: '6. No Third-Party Ad Trackers',
      text: 'Cognora does not monetize through behavioral advertising or sell student information to data brokers. There are zero tracking pixels or third-party ad networks embedded in the platform.'
    }
  ];

  return (
    <div
      className="dark fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-[#0F1118] border-t sm:border border-white/[0.12] rounded-t-3xl sm:rounded-3xl max-w-2xl w-full shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh] pb-safe text-stone-200 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        {/* Glow ambient background inside modal */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Mobile Drag Handle */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden relative z-10">
          <div className="w-12 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between relative z-10 bg-[#0F1118]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-white">
                Privacy Policy & Student Data Protection
              </h2>
              <p className="text-[11px] text-stone-400">
                Last updated: January 2026 &bull; Strict Student Privacy Guarantee
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
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-stone-300 leading-relaxed relative z-10">
          {/* Privacy Guarantee Pill */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 flex items-start gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-heading font-bold text-xs text-white">Our Core Privacy Promise</div>
              <p className="text-xs text-emerald-200/90 mt-0.5 leading-relaxed">
                We believe your course notes, homework, and test preparation are strictly personal. Cognora never sells your data, never displays third-party ads, and never uses student uploads to train external AI models.
              </p>
            </div>
          </div>

          {/* Clauses List */}
          <div className="space-y-3">
            {sections.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#141624] border border-white/[0.08] space-y-1.5 hover:border-white/[0.15] transition-colors"
                >
                  <div className="flex items-center gap-2 font-heading font-bold text-xs text-white">
                    <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed pl-6">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Contact & DPO */}
          <div className="p-4 rounded-xl bg-[#121420] border border-white/[0.08] space-y-1.5 text-xs">
            <div className="font-heading font-semibold text-white">
              Questions regarding your privacy?
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              For student data export requests, deletion verification, or questions regarding academic data privacy, reach our dedicated privacy team at{' '}
              <a href="mailto:privacy@cognora.study" className="text-indigo-400 hover:text-indigo-300 font-medium underline">
                privacy@cognora.study
              </a>.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-[#0A0B10] flex items-center justify-between relative z-10">
          <span className="text-[11px] text-emerald-400 font-mono font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            GDPR & Student Privacy Compliant
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 to-indigo-600 hover:brightness-110 text-white shadow-[0_4px_12px_rgba(79,70,229,0.4)] transition-all cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
