import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight
} from 'lucide-react';
import { CognoraLogo } from './CognoraLogo';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  currentUser?: UserProfile;
  initialMode?: 'signin' | 'signup';
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentUser,
  initialMode = 'signin'
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [degree, setDegree] = useState(currentUser?.degree || '');
  const [semester, setSemester] = useState(currentUser?.semester || '');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync mode when initialMode changes
  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage(null);
    }
  }, [isOpen, initialMode]);

  // Handle Escape key and lock body scroll
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid student or institutional email.');
      return;
    }

    if (!password.trim() || password.length < 4) {
      setErrorMessage('Please enter your password (minimum 4 characters).');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const baseUser: UserProfile = currentUser || {
        id: `user_${Date.now()}`,
        name: mode === 'signup' && name.trim() ? name.trim() : (email.split('@')[0] || 'Student'),
        email: email.trim(),
        degree: mode === 'signup' && degree.trim() ? degree.trim() : 'Computer Science',
        semester: mode === 'signup' && semester.trim() ? semester.trim() : 'Semester 1',
        streakDays: 1,
        weekActivity: [true, false, false, false, false, false, false],
        totalStudyMinutes: 0,
        weeklyHoursSpent: 0,
        questionsSolved: 0,
        quizzesAttempted: 0,
        quizAverage: 0,
        averageQuizScore: 0,
        weakTopics: [],
        strongTopics: [],
        subjectProgress: []
      };

      const authenticatedUser: UserProfile = {
        ...baseUser,
        email: email.trim(),
        name: mode === 'signup' && name.trim() ? name.trim() : (currentUser?.name || email.split('@')[0] || 'Student'),
        degree: mode === 'signup' && degree.trim() ? degree.trim() : (currentUser?.degree || baseUser.degree),
        semester: mode === 'signup' && semester.trim() ? semester.trim() : (currentUser?.semester || baseUser.semester)
      };

      onSuccess(authenticatedUser);
      onClose();
    }, 450);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-[#0F1118] border border-white/[0.12] rounded-3xl shadow-2xl shadow-indigo-950/60 overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        {/* Glow ambient background inside modal */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 px-6 pt-6 pb-4 flex items-center justify-between border-b border-white/[0.08]">
          <CognoraLogo size="sm" subtitle="Student Portal" theme="dark" />
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Close sign in dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 p-6 space-y-5">
          {/* Mode Switcher Tabs with 3D tactile feel */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer select-none ${
                mode === 'signin'
                  ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-[0_2px_0_0_#3730a3,0_4px_8px_rgba(79,70,229,0.3)] border-t border-indigo-300/40'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg transition-all cursor-pointer select-none ${
                mode === 'signup'
                  ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-[0_2px_0_0_#3730a3,0_4px_8px_rgba(79,70,229,0.3)] border-t border-indigo-300/40'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-white tracking-tight">
              {mode === 'signin' ? 'Welcome back to Cognora' : 'Start your study journey'}
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              {mode === 'signin'
                ? 'Access your uploaded notes, exams, flashcards, and AI tutor.'
                : 'Create your personalized student profile to sync progress.'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-300 mb-1.5">
                    Full Student Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mukteswar Gochhayat"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-300 mb-1.5">
                      Degree / Major
                    </label>
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="Computer Science"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-300 mb-1.5">
                      Semester / Year
                    </label>
                    <input
                      type="text"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      placeholder="Semester 5"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-stone-300 mb-1.5">
                Institutional or Student Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-stone-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-stone-400 hover:text-stone-200 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-sm border-white/20 bg-white/10 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <span>Remember this session</span>
              </label>
            </div>

            {/* 3D Action Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-b from-indigo-500 via-indigo-600 to-indigo-700 border-t border-indigo-300/40 shadow-[0_5px_0_0_#3730a3,0_10px_20px_rgba(79,70,229,0.4)] hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#3730a3,0_14px_24px_rgba(79,70,229,0.5)] active:translate-y-[4px] active:shadow-[0_1px_0_0_#3730a3,0_4px_8px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In to Workspace' : 'Create Student Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
