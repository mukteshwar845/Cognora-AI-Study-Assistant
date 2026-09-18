import React, { useState, useMemo } from 'react';
import {
  UserProfile,
  StudyMaterial,
  StudyPlanSession,
  AppSettings,
  SubjectDiscipline,
  AcademicLevel
} from '../types';
import {
  UploadCloud,
  Flame,
  Clock,
  Award,
  BookOpen,
  Calendar,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Zap,
  ChevronRight,
  Check,
  Circle,
  Layers,
  FileText,
  ArrowUpRight,
  Settings,
  BookmarkCheck,
  HelpCircle,
  Calculator
} from 'lucide-react';
import {
  SUBJECT_DISCIPLINES
} from '../data/academicTracks';

interface DashboardViewProps {
  user: UserProfile;
  settings?: AppSettings;
  materials: StudyMaterial[];
  studyPlan: StudyPlanSession[];
  onOpenUpload: () => void;
  onOpenMaterial: (material: StudyMaterial) => void;
  onStartExam: (material: StudyMaterial) => void;
  onNavigateTab: (tabId: string) => void;
  onTogglePlanSession: (id: string) => void;
  onOpenSettings?: () => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  settings,
  materials,
  studyPlan,
  onOpenUpload,
  onOpenMaterial,
  onStartExam,
  onNavigateTab,
  onTogglePlanSession,
  onOpenSettings,
  onUpdateUser
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<SubjectDiscipline>('all');

  // Filter materials by selected discipline if any
  const filteredMaterials = useMemo(() => {
    if (selectedDiscipline === 'all') return materials;
    const disciplineObj = SUBJECT_DISCIPLINES.find((d) => d.id === selectedDiscipline);
    if (!disciplineObj || disciplineObj.subjects.length === 0) return materials;

    const matched = materials.filter((m) =>
      disciplineObj.subjects.some((sub) =>
        m.subject.toLowerCase().includes(sub.toLowerCase()) ||
        m.title.toLowerCase().includes(sub.toLowerCase())
      )
    );
    return matched.length > 0 ? matched : materials;
  }, [materials, selectedDiscipline]);

  const primaryMaterial = filteredMaterials[0] || materials[0];
  const upcomingExams = user.upcomingExams || user.targetExams || [];
  const primaryExam = upcomingExams[0];

  // Dynamic study goal calculation
  const targetMinutes = settings?.dailyStudyGoalMinutes || 120;
  const studiedMinutes = Math.min(targetMinutes, Math.round(targetMinutes * 0.72));
  const progressPercent = Math.min(100, Math.round((studiedMinutes / targetMinutes) * 100));

  const formatMins = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}m`;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };

  const studiedFormatted = formatMins(studiedMinutes);
  const targetFormatted = formatMins(targetMinutes);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onOpenUpload();
  };

  // Empty state if library has 0 documents
  if (!materials || materials.length === 0) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto py-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] text-center space-y-5 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-xs">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
              Your study workspace is ready
            </h2>
            <p className="text-sm text-[#4B5563] dark:text-[#A8A8B3] leading-relaxed">
              Upload notes or textbooks from any education level (Minor School, High School, UG, PG, Competitive) across any subject.
            </p>
          </div>
          <div>
            <button
              onClick={onOpenUpload}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-semibold shadow-xs hover:shadow-indigo-500/25 transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              Upload First Study Material
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. WELCOME HERO ("Today" Section)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-white to-violet-50/50 dark:bg-gradient-to-r dark:from-[#131318] dark:via-[#19191F] dark:to-[#131318] border border-indigo-100/90 dark:border-white/[0.08] text-[#111827] dark:text-[#F5F5F7] shadow-xs relative overflow-hidden transition-colors duration-200">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111827] dark:text-[#F5F5F7] tracking-tight">
                {getGreeting()}, {user.name} 👋
              </h1>
              <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#A8A8B3] mt-1 leading-relaxed">
                You're on a <span className="text-amber-600 dark:text-amber-400 font-semibold">{user.streakDays}-day study streak</span>.
                {primaryExam ? (
                  <>
                    {' '}Your <span className="font-semibold text-indigo-600 dark:text-indigo-300">{primaryExam.subject}</span> milestone is{' '}
                    <span className="text-indigo-600 dark:text-indigo-300 font-semibold">{primaryExam.daysLeft} days away</span>.
                  </>
                ) : (
                  ' Ready to dive into active recall notes, formula sheets, and interactive quizzes.'
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1 w-full sm:w-auto">
              <button
                onClick={() => onOpenMaterial(primaryMaterial)}
                className="w-full sm:w-auto min-h-[42px] px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span>Continue Studying</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onStartExam(primaryMaterial)}
                className="w-full sm:w-auto min-h-[42px] px-4 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-white/[0.08] hover:bg-[#F1F3F8] dark:hover:bg-white/[0.14] text-[#111827] dark:text-stone-200 border border-[#E2E4E9] dark:border-white/[0.1] transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-2xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Take Timed Exam</span>
              </button>
            </div>
          </div>

          {/* Right: Compact Today's Progress Card */}
          <div className="lg:w-64 p-4 rounded-xl bg-white/80 dark:bg-white/[0.05] border border-indigo-100/90 dark:border-white/[0.08] backdrop-blur-xs space-y-2.5 shrink-0 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E95A5] dark:text-[#70707B] font-mono">
                  TODAY'S TARGET
                </span>
                {onOpenSettings && (
                  <button
                    onClick={onOpenSettings}
                    title="Change study target in Settings"
                    className="p-0.5 text-stone-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <Settings className="w-3 h-3" />
                  </button>
                )}
              </div>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-xs">{progressPercent}%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-white/[0.08] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 dark:to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#4B5563] dark:text-[#A8A8B3]">
              <span className="text-[#8E95A5] dark:text-[#70707B]">Time studied:</span>
              <span className="font-mono font-medium">
                {studiedFormatted} / {targetFormatted}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. UNIVERSAL SUBJECT DISCIPLINE FILTER BAR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8E95A5] dark:text-[#70707B] font-mono flex items-center gap-1.5">
            <BookmarkCheck className="w-3.5 h-3.5 text-indigo-500" />
            Explore Subject Disciplines
          </span>
          <span className="text-[11px] text-stone-400">Universal for all students</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar touch-scroll">
          {SUBJECT_DISCIPLINES.map((d) => {
            const isSelected = selectedDiscipline === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDiscipline(d.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs ring-2 ring-indigo-500/30'
                    : 'bg-white dark:bg-[#131318] text-[#4B5563] dark:text-[#A8A8B3] border border-[#E2E4E9] dark:border-white/[0.08] hover:border-indigo-300'
                }`}
              >
                <span>{d.icon}</span>
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. PRIMARY ACTIONS: WHAT TO DO NEXT & UPLOAD
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Continue Where You Left Off Card */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] font-mono">
                ACTIVE STUDY TOPIC
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                {primaryMaterial.subject}
              </span>
            </div>

            <div>
              <h2 className="font-heading font-bold text-lg sm:text-xl text-[#111827] dark:text-[#F5F5F7]">
                {primaryMaterial.title}
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] mt-1 line-clamp-2 leading-relaxed">
                {primaryMaterial.summary?.tldr || primaryMaterial.chapter}
              </p>
            </div>

            {/* Key topics badges from actual material */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {((primaryMaterial.summary?.importantTopics?.map((t) => t.topic)) || [
                primaryMaterial.subject,
                primaryMaterial.chapter
              ])
                .slice(0, 4)
                .map((topic) => (
                  <span
                    key={topic}
                    className="px-2.5 py-1 rounded-lg text-xs bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] font-medium border border-[#E2E4E9]/60 dark:border-white/[0.04]"
                  >
                    {topic}
                  </span>
                ))}
            </div>

            {/* Visual Progress */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full h-2 rounded-full bg-[#E2E4E9] dark:bg-[#202027] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#4F46E5] dark:bg-[#6366F1] transition-all duration-300"
                  style={{ width: '80%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#8E95A5] dark:text-[#70707B]">
                <span>Topic: {primaryMaterial.chapter}</span>
                <span className="font-mono">Page count: {primaryMaterial.pageCount || 24}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 border-t border-[#E2E4E9]/80 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <button
              onClick={() => onOpenMaterial(primaryMaterial)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Continue Studying</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2 text-xs flex-wrap">
              <button
                onClick={() => onNavigateTab('workspace')}
                className="text-[#4B5563] hover:text-[#111827] dark:text-[#A8A8B3] dark:hover:text-[#F5F5F7] px-2 py-1 rounded-lg hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] transition-colors"
              >
                Summaries & Notes
              </button>
              <button
                onClick={() => onNavigateTab('formulas')}
                className="text-[#4B5563] hover:text-[#111827] dark:text-[#A8A8B3] dark:hover:text-[#F5F5F7] px-2 py-1 rounded-lg hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] transition-colors"
              >
                Formulas & Rules
              </button>
              <button
                onClick={() => onNavigateTab('ask_ai')}
                className="text-[#4F46E5] dark:text-[#818CF8] hover:underline px-2 py-1 font-medium"
              >
                Ask AI Doubt →
              </button>
            </div>
          </div>
        </div>

        {/* Compact Upload Material Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={onOpenUpload}
          className={`lg:col-span-5 p-5 sm:p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col justify-between text-left group shadow-xs ${
            isDragOver
              ? 'border-[#4F46E5] dark:border-[#6366F1] bg-indigo-50/70 dark:bg-indigo-950/40 shadow-md'
              : 'border-stone-300 dark:border-white/[0.12] hover:border-indigo-400 dark:hover:border-indigo-500/50 bg-white dark:bg-[#131318] hover:bg-[#F7F8FC] dark:hover:bg-[#19191F]'
          }`}
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs">
              <UploadCloud className="w-5 h-5" />
            </div>

            <div>
              <h3 className="font-heading font-semibold text-sm text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                <span>＋ Upload any study material</span>
              </h3>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] mt-1 leading-relaxed">
                PDF • Word (DOCX) • PowerPoint • Images • Text
              </p>
              <p className="text-xs text-[#8E95A5] dark:text-[#70707B] mt-1">
                For School, High School, College, Competitive, and Professional exams.
              </p>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-[#8E95A5] dark:text-[#70707B]">
            <span className="text-[11px] font-mono">
              <span className="hidden sm:inline">Drag & drop or browse</span>
              <span className="sm:hidden">Tap to upload</span>
            </span>
            <span className="font-medium text-[#4F46E5] dark:text-[#818CF8] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
              Select files →
            </span>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. UNIVERSAL QUICK ACTIONS ROW
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8E95A5] dark:text-[#70707B] font-mono">
            CORE STUDY ENGINES
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            {
              id: 'ask_ai',
              title: 'AI Tutor',
              subtitle: 'Clear any doubt',
              icon: Sparkles,
              color: 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-500/10',
              action: () => onNavigateTab('ask_ai')
            },
            {
              id: 'quizzes',
              title: 'Quiz Generator',
              subtitle: 'Active recall drills',
              icon: FileText,
              color: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10',
              action: () => onNavigateTab('quizzes')
            },
            {
              id: 'formulas',
              title: 'Formula & Rules',
              subtitle: 'Formulas & laws hub',
              icon: Calculator,
              color: 'text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-500/10',
              action: () => onNavigateTab('formulas')
            },
            {
              id: 'flashcards',
              title: 'Flashcards',
              subtitle: 'Spaced repetition',
              icon: Layers,
              color: 'text-violet-600 bg-violet-50 dark:text-violet-400 dark:bg-violet-500/10',
              action: () => onNavigateTab('flashcards')
            },
            {
              id: 'exams',
              title: 'Timed Exam',
              subtitle: 'Exam simulation',
              icon: Clock,
              color: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10',
              action: () => (primaryMaterial ? onStartExam(primaryMaterial) : onNavigateTab('exams'))
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="p-3.5 rounded-xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] hover:border-indigo-400 dark:hover:border-indigo-500/40 cursor-pointer transition-all duration-150 hover:-translate-y-0.5 group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-300 dark:text-stone-600 group-hover:text-indigo-500 transition-colors" />
                </div>
                <div className="font-heading font-semibold text-xs text-[#111827] dark:text-[#F5F5F7]">
                  {item.title}
                </div>
                <div className="text-[11px] text-[#8E95A5] dark:text-[#70707B] truncate mt-0.5">
                  {item.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. STATISTICS CARDS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div
          onClick={() => onNavigateTab('library')}
          className="p-4 rounded-xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] hover:border-stone-300 dark:hover:border-white/[0.14] transition-colors cursor-pointer shadow-2xs space-y-1.5"
        >
          <div className="flex items-center justify-between text-xs text-[#8E95A5] dark:text-[#70707B] font-mono">
            <span>Study Materials</span>
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111827] dark:text-[#F5F5F7]">
            {materials.length}
          </div>
          <div className="text-[11px] text-[#8E95A5] dark:text-[#70707B] truncate">
            Across {user.subjectsEnrolled?.length || 5} subjects
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('analytics')}
          className="p-4 rounded-xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] hover:border-stone-300 dark:hover:border-white/[0.14] transition-colors cursor-pointer shadow-2xs space-y-1.5"
        >
          <div className="flex items-center justify-between text-xs text-[#8E95A5] dark:text-[#70707B] font-mono">
            <span>Study Streak</span>
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-500 dark:text-amber-400">
            {user.streakDays} days
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Active streak 🔥
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('analytics')}
          className="p-4 rounded-xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] hover:border-stone-300 dark:hover:border-white/[0.14] transition-colors cursor-pointer shadow-2xs space-y-1.5"
        >
          <div className="flex items-center justify-between text-xs text-[#8E95A5] dark:text-[#70707B] font-mono">
            <span>Weekly Study Time</span>
            <Clock className="w-3.5 h-3.5 text-violet-500" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111827] dark:text-[#F5F5F7]">
            {user.weeklyHoursSpent ? `${Math.floor(user.weeklyHoursSpent)}h` : '12h'}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Target: {settings?.weeklyStudyGoalHours || 15}h/week
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('quizzes')}
          className="p-4 rounded-xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] hover:border-stone-300 dark:hover:border-white/[0.14] transition-colors cursor-pointer shadow-2xs space-y-1.5"
        >
          <div className="flex items-center justify-between text-xs text-[#8E95A5] dark:text-[#70707B] font-mono">
            <span>Quiz Mastery</span>
            <Award className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111827] dark:text-[#F5F5F7]">
            {user.averageQuizScore ?? 82}%
          </div>
          <div className="text-[11px] text-[#8E95A5] dark:text-[#70707B] truncate">
            {user.questionsSolved ? `${user.questionsSolved} questions solved` : 'Active practice'}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. PROGRESS DASHBOARD & TODAY'S PLAN
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Learning Progress Trend */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#111827] dark:text-[#F5F5F7]">
                Your Learning & Accuracy Trend
              </h3>
              <p className="text-xs text-[#8E95A5] dark:text-[#70707B]">Weekly study consistency & quiz retention</p>
            </div>

            <button
              onClick={() => onNavigateTab('analytics')}
              className="text-xs text-[#4F46E5] dark:text-[#818CF8] font-medium hover:underline flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9]/70 dark:border-white/[0.04] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8E95A5] dark:text-[#70707B]">
                PERFORMANCE TREND
              </span>
              <span className="font-mono font-bold text-[#4F46E5] dark:text-[#818CF8] text-xs">
                Peak: 88%
              </span>
            </div>

            <div className="h-24 w-full relative pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 350 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="20" x2="350" y2="20" stroke="#E5E7EB" strokeDasharray="3 3" className="dark:stroke-white/[0.06]" strokeWidth="0.8" />
                <line x1="0" y1="50" x2="350" y2="50" stroke="#E5E7EB" strokeDasharray="3 3" className="dark:stroke-white/[0.06]" strokeWidth="0.8" />
                <path d="M 10 55 Q 60 45, 115 40 T 175 30 T 235 15 T 295 25 T 340 22 L 340 80 L 10 80 Z" fill="url(#purpleGradient)" />
                <path d="M 10 55 Q 60 45, 115 40 T 175 30 T 235 15 T 295 25 T 340 22" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
                {[
                  { cx: 10, cy: 55 },
                  { cx: 65, cy: 48 },
                  { cx: 120, cy: 40 },
                  { cx: 175, cy: 30 },
                  { cx: 235, cy: 15 },
                  { cx: 290, cy: 25 },
                  { cx: 340, cy: 22 }
                ].map((pt, i) => (
                  <circle key={i} cx={pt.cx} cy={pt.cy} r={i === 6 ? 4 : 3} className={i === 6 ? 'fill-indigo-500 stroke-white dark:stroke-[#131318] stroke-2' : 'fill-indigo-400'} />
                ))}
              </svg>
            </div>

            <div className="flex justify-between text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono pt-1 px-1">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              <span className="font-bold text-[#4F46E5] dark:text-[#818CF8]">Sun (82%)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-500/10 border border-amber-200/70 dark:border-amber-500/20 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500 fill-current shrink-0" />
              <span className="text-amber-900 dark:text-amber-300 font-medium">
                Keep going — active recall today strengthens long-term memory.
              </span>
            </div>
          </div>
        </div>

        {/* Today's Study Plan */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#111827] dark:text-[#F5F5F7]">
                  Today's Study Plan
                </h3>
                <p className="text-xs text-[#8E95A5] dark:text-[#70707B]">Dynamic revision schedule</p>
              </div>
              <button
                onClick={() => onNavigateTab('planner')}
                className="text-xs text-[#4F46E5] dark:text-[#818CF8] font-medium hover:underline"
              >
                Open Planner →
              </button>
            </div>

            <div className="space-y-2 pt-1">
              {studyPlan.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onTogglePlanSession(item.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                    item.completed
                      ? 'bg-[#F7F8FC] dark:bg-white/[0.02] border-[#E2E4E9]/60 dark:border-white/[0.04] text-[#8E95A5]'
                      : 'bg-white dark:bg-[#19191F] border-[#E2E4E9] dark:border-white/[0.06] hover:border-stone-300 text-[#4B5563] dark:text-[#A8A8B3]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {item.completed ? (
                      <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    ) : (
                      <Circle className="w-4 h-4 text-stone-300 dark:text-stone-600 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className={`font-semibold truncate ${item.completed ? 'line-through text-[#8E95A5]' : 'text-[#111827] dark:text-[#F5F5F7]'}`}>
                        {item.subject}
                      </div>
                      <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono">
                        {item.time} &bull; {item.durationMinutes} min &bull; {item.taskType}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-white/[0.04]">
                    {item.completed ? 'Done' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => onOpenMaterial(primaryMaterial)}
              className="text-xs text-[#4F46E5] dark:text-[#818CF8] font-semibold hover:underline"
            >
              Start active session: {primaryMaterial.title} →
            </button>
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. SUBJECT READINESS & UPCOMING EXAMS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Subject Readiness */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm sm:text-base text-[#111827] dark:text-[#F5F5F7]">
              Subject Exam Readiness
            </h3>
            <span className="text-[11px] text-[#8E95A5] dark:text-[#70707B] font-mono">
              {user.targetGpa ? `Target: ${user.targetGpa}` : 'Target: 85%+'}
            </span>
          </div>

          <div className="space-y-3.5">
            {(user.subjectProgress || [
              { subject: 'Physics', progress: 85, color: '#06b6d4' },
              { subject: 'Biology', progress: 78, color: '#10b981' },
              { subject: 'DSA', progress: 80, color: '#3b82f6' },
              { subject: 'Economics', progress: 70, color: '#f59e0b' }
            ]).map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[#111827] dark:text-[#F5F5F7] truncate">
                    {item.subject}
                  </span>
                  <span className="font-mono text-[#8E95A5] dark:text-[#70707B] font-semibold ml-2">
                    {item.progress}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E2E4E9] dark:bg-[#202027] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.progress}%`,
                      backgroundColor: item.color || '#4f46e5'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-200/70 dark:border-emerald-500/20">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                STRONGEST CONCEPT
              </div>
              <div className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] mt-0.5 truncate">
                {user.strongTopics?.[0] || 'Active Recall Mastery'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-500/10 border border-amber-200/70 dark:border-amber-500/20">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono">
                NEEDS ATTENTION
              </div>
              <div className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] mt-0.5 truncate">
                {user.weakTopics?.[0] || 'Formula Drill Practice'}
              </div>
            </div>
          </div>
        </div>

        {/* AI Study Coach */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#F5F3FF] dark:bg-[#19191F] border border-indigo-200/70 dark:border-indigo-500/25 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-heading font-bold text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-300 font-mono flex items-center gap-1.5">
                  <span>✨ COGNORA AI COACH</span>
                  <span className="text-[9px] font-normal px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 capitalize">
                    {user.academicLevel ? user.academicLevel.replace('_', ' ') : 'Adaptive'}
                  </span>
                </div>
                <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B]">Personalized diagnostic feedback</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-indigo-100 dark:border-white/[0.06] text-xs text-[#111827] dark:text-[#F5F5F7] leading-relaxed italic">
              "Your retention in <span className="font-semibold text-emerald-600 dark:text-emerald-400 not-italic">{user.strongTopics?.[0] || 'core concepts'}</span> is strong.
              <br /><br />
              Let's focus on <span className="font-semibold text-amber-600 dark:text-amber-400 not-italic">{user.weakTopics?.[0] || 'targeted practice'}</span> before your next test."
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <button
              onClick={() => onNavigateTab('ask_ai')}
              className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <span>Ask AI Coach a Doubt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigateTab('quizzes')}
              className="w-full py-1.5 px-3 rounded-xl text-xs font-medium text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white transition-colors text-center"
            >
              Start Practice Quiz
            </button>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="lg:col-span-3 p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-[#111827] dark:text-[#F5F5F7]">
                Upcoming Exams
              </h3>
              <Calendar className="w-3.5 h-3.5 text-[#8E95A5] dark:text-[#70707B]" />
            </div>

            <div className="space-y-2">
              {upcomingExams.slice(0, 3).map((exam) => (
                <div
                  key={exam.id}
                  className="p-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9]/70 dark:border-white/[0.05] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono">
                      {exam.daysLeft}d left
                    </span>
                    <span className="text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono">{exam.date}</span>
                  </div>

                  <div className="font-heading font-semibold text-xs text-[#111827] dark:text-[#F5F5F7] truncate">
                    {exam.subject}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#8E95A5] dark:text-[#70707B]">
                    <span>Target: {exam.targetScore || 90}%</span>
                    <button
                      onClick={() => onNavigateTab('exams')}
                      className="text-[#4F46E5] dark:text-[#818CF8] font-semibold hover:underline"
                    >
                      Prepare →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('exams')}
            className="w-full py-2 text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white text-center border-t border-[#E2E4E9] dark:border-white/[0.06] pt-2 transition-colors"
          >
            View All Exams ({upcomingExams.length})
          </button>
        </div>
      </div>
    </div>
  );
};

