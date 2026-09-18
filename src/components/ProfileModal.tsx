import React, { useState, useEffect } from 'react';
import {
  UserProfile
} from '../types';
import {
  X,
  Flame,
  Check,
  GraduationCap,
  Sparkles,
  BookOpen,
  Calendar,
  Settings,
  Brain,
  Rocket,
  Code,
  Atom,
  AlertCircle,
  Clock,
  Target,
  Award,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSaveUser?: (updated: UserProfile) => void;
  onOpenSettings?: () => void;
  onNavigateTab?: (tab: string) => void;
}

const AVATAR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  graduation: GraduationCap,
  sparkles: Sparkles,
  rocket: Rocket,
  code: Code,
  atom: Atom,
};

const ACADEMIC_LEVEL_INFO: Record<string, { label: string; badge: string; icon: string }> = {
  minor_school: { label: 'Minor / Middle School', badge: 'Grades 1-8', icon: '🎒' },
  high_school: { label: 'High School', badge: 'Grades 9-12', icon: '🏫' },
  undergraduate: { label: 'Undergraduate', badge: 'College / UG', icon: '🎓' },
  postgraduate: { label: 'Postgraduate', badge: 'Masters / PhD', icon: '🏛️' },
  competitive_exam: { label: 'Competitive Aspirant', badge: 'JEE / NEET / SAT', icon: '🎯' },
  professional_learner: { label: 'Professional Learner', badge: 'Lifelong', icon: '💼' },
};

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onOpenSettings,
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'academics' | 'exams' | 'topics'>('overview');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const gradClass = user.avatarColor || 'from-indigo-600 via-purple-600 to-violet-500';
  const IconComponent = user.avatarIcon ? AVATAR_ICONS[user.avatarIcon] : null;
  const exams = user.upcomingExams || user.targetExams || [];
  const subjects = user.subjectsEnrolled || [];
  const weakTopics = user.weakTopics || [];
  const strongTopics = user.strongTopics || [];
  const levelInfo = user.academicLevel ? (ACADEMIC_LEVEL_INFO[user.academicLevel] || { label: user.academicLevel, badge: 'Scholar', icon: '🎓' }) : ACADEMIC_LEVEL_INFO.undergraduate;

  // 7-day activity array fallback (default: active during weekdays)
  const weekActivity = user.weekActivity && user.weekActivity.length === 7 
    ? user.weekActivity 
    : [true, true, true, true, true, false, true];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150 cursor-default"
    >
      <div className="bg-white dark:bg-[#111116] border-t sm:border border-[#E2E4E9] dark:border-white/[0.08] rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[86vh] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        {/* Mobile Drag Handle */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-white/20" />
        </div>

        {/* Clean Header Bar */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between shrink-0 bg-white/95 dark:bg-[#111116]/95 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-2xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm sm:text-base text-[#111827] dark:text-[#F5F5F7] tracking-tight flex items-center gap-2">
                <span>Student Identity & Profile</span>
              </h2>
              <p className="text-[11px] text-[#6B7280] dark:text-[#8E95A5] flex items-center gap-1.5">
                <span>{user.email}</span>
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified Scholar</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-stone-400 hover:text-stone-700 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label="Close Profile"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Identity Banner */}
        <div className="p-5 sm:p-6 border-b border-[#E2E4E9] dark:border-white/[0.08] bg-gradient-to-br from-indigo-50/70 via-purple-50/30 to-transparent dark:from-indigo-950/25 dark:via-purple-950/15 dark:to-transparent shrink-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Avatar & Key Info */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative shrink-0">
                <div
                  className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr ${gradClass} text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md ring-4 ring-white dark:ring-[#16161C]`}
                >
                  {IconComponent ? (
                    <IconComponent className="w-8 h-8 sm:w-9 sm:h-9" />
                  ) : (
                    user.name.slice(0, 2).toUpperCase()
                  )}
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#111116]"
                  title="Active Account"
                />
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading font-bold text-xl text-[#111827] dark:text-[#F5F5F7] tracking-tight truncate">
                    {user.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-500/30 whitespace-nowrap">
                    <span>{levelInfo.icon}</span>
                    <span>{levelInfo.badge}</span>
                  </span>
                </div>

                <p className="text-xs font-medium text-[#4B5563] dark:text-[#C4C4CD] truncate">
                  {user.degree || 'Computer Science & Engineering'} {user.semester ? `• ${user.semester}` : ''}
                </p>

                {user.institution && (
                  <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1.5 truncate">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="truncate">{user.institution}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Quick Metrics & 7-Day Activity */}
            <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-3 bg-white/90 dark:bg-[#181820]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-stone-200/70 dark:border-white/[0.08] shadow-xs justify-between sm:justify-end">
                <div className="text-center px-1.5">
                  <div className="text-[9px] text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono font-bold">Streak</div>
                  <div className="font-bold text-amber-500 text-xs sm:text-sm flex items-center justify-center gap-1 mt-0.5">
                    <Flame className="w-3.5 h-3.5 fill-current" /> {user.streakDays}d
                  </div>
                </div>
                <div className="w-px h-6 bg-stone-200 dark:bg-white/[0.08]" />
                <div className="text-center px-1.5">
                  <div className="text-[9px] text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono font-bold">Mastery</div>
                  <div className="font-bold text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm mt-0.5">
                    {user.averageQuizScore ?? user.quizAverage ?? 82}%
                  </div>
                </div>
                <div className="w-px h-6 bg-stone-200 dark:bg-white/[0.08]" />
                <div className="text-center px-1.5">
                  <div className="text-[9px] text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono font-bold">Weekly</div>
                  <div className="font-bold text-[#111827] dark:text-[#F5F5F7] text-xs sm:text-sm mt-0.5">
                    {user.weeklyHoursSpent || 12.6}h
                  </div>
                </div>
              </div>

              {/* 7-Day Mini Activity Strip */}
              <div className="flex items-center gap-1 self-center sm:self-end">
                {DAYS_OF_WEEK.map((day, idx) => {
                  const isActive = weekActivity[idx];
                  return (
                    <div
                      key={day}
                      className="flex flex-col items-center gap-0.5"
                      title={`${day}: ${isActive ? 'Studied' : 'Rest'}`}
                    >
                      <div
                        className={`w-4 h-1.5 rounded-full transition-colors ${
                          isActive
                            ? 'bg-indigo-600 dark:bg-indigo-400'
                            : 'bg-stone-200 dark:bg-white/10'
                        }`}
                      />
                      <span className="text-[8px] text-stone-400 font-mono">{day[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Clean Segment Navigation Tabs */}
        <div className="border-b border-[#E2E4E9] dark:border-white/[0.08] px-5 sm:px-6 flex gap-1.5 bg-[#FAFAFC] dark:bg-[#14141A] shrink-0 overflow-x-auto no-scrollbar py-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'academics', label: `Coursework (${subjects.length})` },
            { id: 'exams', label: `Upcoming Exams (${exams.length})` },
            { id: 'topics', label: `Focus & Mastery (${weakTopics.length + strongTopics.length})` }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                    : 'text-[#6B7280] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/[0.06]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Study Motto / Mission Card */}
              <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.06] border-l-4 border-l-indigo-500 shadow-2xs space-y-1.5">
                <div className="text-[10px] font-bold text-[#6B7280] dark:text-[#8E95A5] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  Study Mission & Academic Goal
                </div>
                <p className="text-xs sm:text-sm text-[#111827] dark:text-[#F5F5F7] font-medium italic leading-relaxed">
                  "{user.bio || 'Master complex concepts with structured AI learning, active recall, and spaced repetition.'}"
                </p>
              </div>

              {/* Academic Highlights Summary (Streamlined - No Duplicate Box Clutter) */}
              <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.06] space-y-3">
                <div className="text-[11px] font-bold text-[#111827] dark:text-[#F5F5F7] uppercase tracking-wider font-mono flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    Academic Standing & Targets
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/40">
                    Active Term
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white dark:bg-[#111116] border border-[#E2E4E9]/60 dark:border-white/[0.04]">
                    <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] uppercase font-mono font-semibold">Degree Program</div>
                    <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7] mt-0.5 truncate" title={user.degree}>
                      {user.degree || 'Computer Science'}
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{user.semester || 'Semester 5'}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-[#111116] border border-[#E2E4E9]/60 dark:border-white/[0.04]">
                    <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] uppercase font-mono font-semibold">Institution</div>
                    <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7] mt-0.5 truncate" title={user.institution}>
                      {user.institution || 'NIT / University'}
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{levelInfo.label}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-[#111116] border border-[#E2E4E9]/60 dark:border-white/[0.04]">
                    <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] uppercase font-mono font-semibold">Target GPA / Goal</div>
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 font-mono">
                      {user.targetGpa || '9.2 / 10.0'}
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">High Distinction Pace</div>
                  </div>
                </div>
              </div>

              {/* 3 High-Impact Learning Performance Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-500/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono uppercase tracking-wider font-bold">Study Time</span>
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    {Math.round((user.totalStudyMinutes || 780) / 60)} hrs
                  </div>
                  <p className="text-[10px] text-[#6B7280] dark:text-[#8E95A5]">
                    Logged across study modules
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/25 border border-purple-100 dark:border-purple-500/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono uppercase tracking-wider font-bold">Questions Solved</span>
                    <Zap className="w-3.5 h-3.5 text-purple-500" />
                  </div>
                  <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {user.questionsSolved || 142}
                  </div>
                  <p className="text-[10px] text-[#6B7280] dark:text-[#8E95A5]">
                    Active recall & exam questions
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-500/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono uppercase tracking-wider font-bold">Readiness Score</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                    {user.examReadinessScore ?? 84}%
                  </div>
                  <p className="text-[10px] text-[#6B7280] dark:text-[#8E95A5]">
                    Diagnostic exam mastery
                  </p>
                </div>
              </div>

              {/* Quick Action Buttons for High Usability */}
              <div className="flex items-center gap-2 pt-1">
                {onNavigateTab && (
                  <button
                    type="button"
                    onClick={() => onNavigateTab('workspace')}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] text-white flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Study Workspace</span>
                  </button>
                )}
                {onNavigateTab && (
                  <button
                    type="button"
                    onClick={() => onNavigateTab('ask_ai')}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#F1F3F8] dark:bg-[#19191F] hover:bg-[#E5E7EB] dark:hover:bg-[#202028] text-[#111827] dark:text-[#F5F5F7] flex items-center justify-center gap-1.5 border border-[#E2E4E9] dark:border-white/[0.08] transition-all cursor-pointer active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Ask AI Doubt Solver</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: COURSEWORK & MODULES */}
          {activeTab === 'academics' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                    Enrolled Subjects & Modules
                  </h4>
                  <p className="text-[11px] text-[#6B7280] dark:text-[#8E95A5]">
                    Active coursework tracked in your syllabus and study planner.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-white/[0.06] text-stone-600 dark:text-stone-300">
                  {subjects.length} Subjects
                </span>
              </div>

              {subjects.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-dashed border-stone-200 dark:border-white/[0.08] text-center space-y-2">
                  <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
                  <p className="text-xs text-stone-500">No subjects enrolled yet.</p>
                  {onOpenSettings && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenSettings();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Add Subjects in Settings
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {subjects.map((subj, idx) => {
                    const progressItem = user.subjectProgress?.find((sp) => sp.subject.toLowerCase() === subj.toLowerCase());
                    const progVal = progressItem?.progress || (70 + (idx * 7) % 25);

                    return (
                      <div
                        key={subj}
                        className="p-3.5 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.06] flex flex-col justify-between space-y-2.5 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                              {subj.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7] truncate">
                              {subj}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-stone-500 font-semibold shrink-0">
                            {progVal}%
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                            style={{ width: `${Math.min(100, progVal)}%` }}
                          />
                        </div>

                        {onNavigateTab && (
                          <div className="flex items-center justify-end pt-1">
                            <button
                              type="button"
                              onClick={() => onNavigateTab('workspace')}
                              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>Open Notes</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: UPCOMING EXAMS */}
          {activeTab === 'exams' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                    Upcoming Exams & Targets
                  </h4>
                  <p className="text-[11px] text-[#6B7280] dark:text-[#8E95A5]">
                    Key milestones tracked for study timetable priorities and readiness.
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-white/[0.06] text-stone-600 dark:text-stone-300">
                  {exams.length} Tracked
                </span>
              </div>

              {exams.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-dashed border-stone-200 dark:border-white/[0.08] text-center space-y-2">
                  <Calendar className="w-8 h-8 text-stone-400 mx-auto" />
                  <p className="text-xs text-stone-500">No upcoming exams registered yet.</p>
                  {onOpenSettings && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenSettings();
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Add Exam in Settings
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {exams.map((exam) => (
                    <div
                      key={exam.id}
                      className="p-3.5 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.06] flex items-center justify-between shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-800 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex flex-col items-center justify-center font-bold text-xs font-mono shrink-0">
                          <span>{exam.daysLeft}d</span>
                          <span className="text-[8px] uppercase tracking-tighter">Left</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                            {exam.subject}
                          </div>
                          <div className="text-[11px] text-[#6B7280] dark:text-[#8E95A5] flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1 font-mono">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              {exam.date}
                            </span>
                            <span>•</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                              Target: {exam.targetScore || 90}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {onNavigateTab ? (
                        <button
                          type="button"
                          onClick={() => onNavigateTab('exams')}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
                        >
                          Practice Exam
                        </button>
                      ) : (
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-stone-200/60 dark:bg-white/[0.06] text-stone-600 dark:text-stone-300">
                          {exam.daysLeft <= 7 ? '⚠️ Imminent' : 'Scheduled'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: FOCUS & MASTERY */}
          {activeTab === 'topics' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Focus Areas */}
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Focus Areas & Targeted Practice</span>
                  </div>
                  <span className="text-[10px] text-rose-700 dark:text-rose-300 font-mono font-bold">
                    {weakTopics.length} Focus Areas
                  </span>
                </div>

                {weakTopics.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">No weak areas identified yet. Great job!</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {weakTopics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#19191F] border border-rose-200/80 dark:border-rose-500/30 text-xs font-medium text-rose-800 dark:text-rose-300 shadow-2xs"
                      >
                        <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                        <span>{topic}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Mastered Strengths */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Mastered Topics & Strengths</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                    {strongTopics.length} Mastered
                  </span>
                </div>

                {strongTopics.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">Complete quizzes and drills to log mastered topics.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {strongTopics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#19191F] border border-emerald-200/80 dark:border-emerald-500/30 text-xs font-medium text-emerald-800 dark:text-emerald-300 shadow-2xs"
                      >
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{topic}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Clean, Modern Footer */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-t border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between gap-3 bg-stone-50/70 dark:bg-[#141419]/70 shrink-0">
          <p className="text-[11px] text-[#6B7280] dark:text-[#8E95A5]">
            Manage credentials, courses, and GPA targets in{' '}
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSettings?.();
              }}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
            >
              Settings
            </button>
            .
          </p>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-stone-800 dark:hover:bg-stone-200 transition-all shadow-2xs active:scale-95 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
