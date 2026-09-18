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
  BarChart3
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSaveUser?: (updated: UserProfile) => void;
  onOpenSettings?: () => void;
}

const AVATAR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  graduation: GraduationCap,
  sparkles: Sparkles,
  rocket: Rocket,
  code: Code,
  atom: Atom,
};

const ACADEMIC_LEVEL_LABELS: Record<string, string> = {
  minor_school: '🎒 Minor / Middle School (Grades 1-8)',
  high_school: '🏫 High School (Grades 9-12)',
  undergraduate: '🎓 Undergraduate (UG)',
  postgraduate: '🏛️ Postgraduate (PG)',
  competitive_exam: '🎯 Competitive Aspirant',
  professional_learner: '💼 Professional Learner',
};

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onOpenSettings
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

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150 cursor-default"
    >
      <div className="bg-white dark:bg-[#111116] border-t sm:border border-[#E2E4E9] dark:border-white/[0.08] rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[86vh] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        {/* Mobile Drag Handle */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-white/20" />
        </div>

        {/* Modal Top Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-4.5 border-b border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between shrink-0 bg-white/90 dark:bg-[#111116]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7] tracking-tight">
                Student Identity & Profile
              </h2>
              <p className="text-xs text-[#6B7280] dark:text-[#A8A8B3] flex items-center gap-1.5 mt-0.5">
                <span>{user.email}</span>
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Verified Scholar</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-stone-400 hover:text-stone-700 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Student Banner (Executive Academic ID Card) */}
        <div className="p-5 sm:p-6 border-b border-[#E2E4E9] dark:border-white/[0.08] bg-gradient-to-br from-indigo-50/60 via-purple-50/20 to-transparent dark:from-indigo-950/25 dark:via-purple-950/10 dark:to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr ${gradClass} text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-lg shrink-0 ring-4 ring-white dark:ring-[#16161C]`}
              >
                {IconComponent ? (
                  <IconComponent className="w-8 h-8 sm:w-9 sm:h-9" />
                ) : (
                  user.name.slice(0, 2).toUpperCase()
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#111116]" title="Active Account" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-heading font-bold text-xl text-[#111827] dark:text-[#F5F5F7] tracking-tight">
                  {user.name}
                </h3>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-500/30">
                  {user.academicLevel ? (ACADEMIC_LEVEL_LABELS[user.academicLevel] || user.academicLevel) : 'Undergraduate'}
                </span>
              </div>
              <p className="text-xs font-medium text-[#4B5563] dark:text-[#C4C4CD]">
                {user.degree || 'Computer Science'} {user.semester ? `• ${user.semester}` : ''}
              </p>
              {user.institution && (
                <p className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF] flex items-center gap-1.5 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{user.institution}</span>
                </p>
              )}
            </div>
          </div>

          {/* Quick Metrics Floating Glass Pill */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-around sm:justify-end bg-white/90 dark:bg-[#181820]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-stone-200/70 dark:border-white/[0.08] shadow-xs">
            <div className="text-center px-1 sm:px-2">
              <div className="text-[9px] text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono font-bold">Streak</div>
              <div className="font-bold text-amber-500 text-sm flex items-center justify-center gap-1 mt-0.5">
                <Flame className="w-4 h-4 fill-current" /> {user.streakDays}d
              </div>
            </div>
            <div className="w-px h-7 bg-stone-200 dark:bg-white/[0.08]" />
            <div className="text-center px-1 sm:px-2">
              <div className="text-[9px] text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono font-bold">Mastery</div>
              <div className="font-bold text-indigo-600 dark:text-indigo-400 text-sm mt-0.5">
                {user.averageQuizScore ?? user.quizAverage ?? 85}%
              </div>
            </div>
            <div className="w-px h-7 bg-stone-200 dark:bg-white/[0.08]" />
            <div className="text-center px-1 sm:px-2">
              <div className="text-[9px] text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono font-bold">Weekly</div>
              <div className="font-bold text-[#111827] dark:text-[#F5F5F7] text-sm mt-0.5">
                {user.weeklyHoursSpent || 12.6}h
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-[#E2E4E9] dark:border-white/[0.08] px-5 sm:px-6 flex gap-1 bg-[#FAFAFC] dark:bg-[#14141A] shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Bio' },
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
                className={`py-3 px-3.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-[#6B7280] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* TAB 1: OVERVIEW & BIO */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Study Motto / Bio */}
              <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.06] border-l-4 border-l-indigo-500 shadow-2xs">
                <div className="text-[10px] font-bold text-[#6B7280] dark:text-[#8E95A5] uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  Study Motto & Academic Mission
                </div>
                <p className="text-xs sm:text-sm text-[#111827] dark:text-[#F5F5F7] font-medium italic leading-relaxed">
                  "{user.bio || 'Master complex concepts with structured AI learning, active recall, and spaced repetition.'}"
                </p>
              </div>

              {/* Academic Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.06] space-y-1">
                  <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono font-bold">Institution / University</div>
                  <div className="text-xs sm:text-sm font-bold text-[#111827] dark:text-[#F5F5F7] truncate">
                    {user.institution || 'Cognora Academic Member'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.06] space-y-1">
                  <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono font-bold">Degree & Major</div>
                  <div className="text-xs sm:text-sm font-bold text-[#111827] dark:text-[#F5F5F7] truncate">
                    {user.degree || 'Computer Science & Engineering'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.06] space-y-1">
                  <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono font-bold">Academic Level</div>
                  <div className="text-xs sm:text-sm font-bold text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                    {user.academicLevel ? (ACADEMIC_LEVEL_LABELS[user.academicLevel] || user.academicLevel) : 'Undergraduate'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.06] space-y-1">
                  <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono font-bold">Semester / Term</div>
                  <div className="text-xs sm:text-sm font-bold text-[#111827] dark:text-[#F5F5F7]">
                    {user.semester || 'Semester 5'}
                  </div>
                </div>

                {user.targetGpa && (
                  <div className="p-4 rounded-2xl bg-[#F8F9FC] dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.06] space-y-1 sm:col-span-2">
                    <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono font-bold flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-indigo-500" />
                      Target GPA / Performance Goal
                    </div>
                    <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                      {user.targetGpa}
                    </div>
                  </div>
                )}
              </div>

              {/* Study Stats Summary */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-500/20 text-center">
                  <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono uppercase tracking-wider font-bold">Study Time</div>
                  <div className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {Math.round((user.totalStudyMinutes || 0) / 60)} hrs
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/25 border border-purple-100 dark:border-purple-500/20 text-center">
                  <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono uppercase tracking-wider font-bold">Questions Solved</div>
                  <div className="text-sm sm:text-base font-bold text-purple-600 dark:text-purple-400 mt-0.5">
                    {user.questionsSolved || 142}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/25 border border-emerald-100 dark:border-emerald-500/20 text-center">
                  <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono uppercase tracking-wider font-bold">Readiness Score</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {user.examReadinessScore ?? 84}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COURSEWORK & SUBJECTS */}
          {activeTab === 'academics' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    Enrolled Subjects & Modules
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {subjects.length} active
                  </span>
                </div>

                {subjects.length === 0 ? (
                  <p className="text-xs text-stone-500 italic py-2">
                    No subjects enrolled yet. Add your subjects through Settings.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {subjects.map((subj) => (
                      <span
                        key={subj}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#19191F] border border-stone-200 dark:border-white/[0.08] text-xs font-semibold text-stone-800 dark:text-stone-200 shadow-2xs"
                      >
                        <BookOpen className="w-3 h-3 text-indigo-500" />
                        <span>{subj}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Subject Progress bars if present */}
              {user.subjectProgress && user.subjectProgress.length > 0 && (
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3">
                  <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
                    Syllabus Mastery Distribution
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {user.subjectProgress.map((sp) => (
                      <div key={sp.subject} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-[#111827] dark:text-[#F5F5F7]">{sp.subject}</span>
                          <span className="font-mono text-stone-500">{sp.progress}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${sp.color || 'bg-indigo-600'}`}
                            style={{ width: `${Math.min(100, sp.progress)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
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
                    Upcoming Exams & Deadlines
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Tracked milestones powering study planner priorities and diagnostic readiness.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {exams.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-dashed border-stone-200 dark:border-white/[0.08] text-center text-xs text-stone-500">
                    No upcoming exams registered yet. Add exam dates directly through Settings.
                  </div>
                ) : (
                  exams.map((exam) => (
                    <div
                      key={exam.id}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex flex-col items-center justify-center font-bold text-xs font-mono">
                          <span>{exam.daysLeft}d</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                            {exam.subject}
                          </div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-stone-400" />
                              <span className="font-mono">{exam.date}</span>
                            </span>
                            <span>•</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                              Target: {exam.targetScore || 90}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-stone-200/60 dark:bg-white/[0.06] text-stone-600 dark:text-stone-300">
                        {exam.daysLeft <= 7 ? '⚠️ Imminent' : 'Scheduled'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: FOCUS & MASTERY */}
          {activeTab === 'topics' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Weak Topics */}
              <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Focus Areas & Targeted Practice</span>
                  </div>
                  <span className="text-[10px] text-rose-700 dark:text-rose-300 font-mono font-medium">
                    {weakTopics.length} focus areas
                  </span>
                </div>

                {weakTopics.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">
                    No weak areas marked yet. Add focus topics through Settings.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {weakTopics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#19191F] border border-rose-200 dark:border-rose-500/30 text-xs font-medium text-rose-800 dark:text-rose-300 shadow-2xs"
                      >
                        <AlertCircle className="w-3 h-3 text-rose-500" />
                        <span>{topic}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Strong Topics */}
              <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Mastered Topics & Strengths</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-mono font-medium">
                    {strongTopics.length} mastered
                  </span>
                </div>

                {strongTopics.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">
                    No mastered topics recorded yet. Add strengths through Settings.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {strongTopics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#19191F] border border-emerald-200 dark:border-emerald-500/30 text-xs font-medium text-emerald-800 dark:text-emerald-300 shadow-2xs"
                      >
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>{topic}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-t border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between gap-3 bg-stone-50/60 dark:bg-[#141419]/70 shrink-0">
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
