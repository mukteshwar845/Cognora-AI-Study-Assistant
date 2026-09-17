import React from 'react';
import {
  UserProfile,
  ExamAttempt,
  StudyMaterial
} from '../types';
import {
  TrendingUp,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface AnalyticsViewProps {
  user: UserProfile;
  examHistory: ExamAttempt[];
  materials: StudyMaterial[];
  onPracticeTopic: (topic: string) => void;
  onTakeExam: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  user,
  examHistory,
  onPracticeTopic
}) => {
  const milestones = [
    { days: 3, label: '3-Day Starter', achieved: user.streakDays >= 3 },
    { days: 7, label: '7-Day Habit', achieved: user.streakDays >= 7 },
    { days: 14, label: '14-Day Consistency', achieved: user.streakDays >= 14 },
    { days: 30, label: '30-Day Scholar', achieved: user.streakDays >= 30 },
    { days: 50, label: '50-Day Master', achieved: user.streakDays >= 50 },
    { days: 100, label: '100-Day Legend', achieved: user.streakDays >= 100 }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-3 transition-colors">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider font-mono">
          <TrendingUp className="w-3.5 h-3.5" />
          Academic Intelligence & Growth
        </div>
        <h1 className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
          Progress & Exam Readiness Analytics
        </h1>
        <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
          Track subject retention, study streak momentum, score trajectory, and pinpoint areas needing targeted revision.
        </p>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-2xs space-y-1">
          <div className="text-xs text-[#8E95A5] dark:text-[#70707B] font-medium font-mono">Average Score</div>
          <div className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
            {user.averageQuizScore}%
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">+6% this month</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-2xs space-y-1">
          <div className="text-xs text-[#8E95A5] dark:text-[#70707B] font-medium font-mono">Current Streak</div>
          <div className="font-heading font-bold text-2xl text-amber-500 flex items-center gap-1.5">
            <Flame className="w-5 h-5 fill-current" />
            {user.streakDays} Days
          </div>
          <p className="text-[11px] text-[#8E95A5] dark:text-[#70707B]">Longest: 14 Days</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-2xs space-y-1">
          <div className="text-xs text-[#8E95A5] dark:text-[#70707B] font-medium font-mono">Weekly Study Hours</div>
          <div className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
            {user.weeklyHoursSpent} hrs
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">On track for target</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-2xs space-y-1">
          <div className="text-xs text-[#8E95A5] dark:text-[#70707B] font-medium font-mono">Mock Exams Taken</div>
          <div className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
            {examHistory.length}
          </div>
          <p className="text-[11px] text-[#8E95A5] dark:text-[#70707B]">{user.quizzesAttempted} questions</p>
        </div>
      </div>

      {/* Visual Score Trajectory Chart & Weekly Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Trend Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-base text-[#111827] dark:text-[#F5F5F7]">
              📈 Exam Score Trajectory
            </h3>
            <span className="text-xs text-[#8E95A5] dark:text-[#70707B] font-mono">Last 5 Attempts</span>
          </div>

          {/* SVG Line Chart */}
          <div className="h-44 w-full relative flex items-end pt-6">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines: light gray in Day, soft dark line in Night */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#E5E7EB" strokeDasharray="3 3" className="dark:stroke-white/[0.06]" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="#E5E7EB" strokeDasharray="3 3" className="dark:stroke-white/[0.06]" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#E5E7EB" strokeDasharray="3 3" className="dark:stroke-white/[0.06]" />

              {/* Area */}
              <polygon
                fill="url(#scoreGrad)"
                points="40,90 120,65 200,45 280,30 360,25 360,115 40,115"
              />

              {/* Line */}
              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="40,90 120,65 200,45 280,30 360,25"
              />

              {/* Points */}
              {[
                { cx: 40, cy: 90, val: '68%' },
                { cx: 120, cy: 65, val: '74%' },
                { cx: 200, cy: 45, val: '80%' },
                { cx: 280, cy: 30, val: '86%' },
                { cx: 360, cy: 25, val: '88%' }
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.cx} cy={pt.cy} r="4" fill="#ffffff" stroke="#6366f1" strokeWidth="2.5" />
                  <text
                    x={pt.cx}
                    y={pt.cy - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#6366f1"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {pt.val}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className="flex justify-between text-[11px] text-[#8E95A5] dark:text-[#70707B] font-mono pt-1">
            <span>Test 1</span>
            <span>Test 2</span>
            <span>Test 3</span>
            <span>Test 4</span>
            <span className="font-bold text-[#4F46E5] dark:text-[#818CF8]">Latest</span>
          </div>
        </div>

        {/* Weekly Study Time Distribution */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-base text-[#111827] dark:text-[#F5F5F7]">
              ⏱ Weekly Study Hours
            </h3>
            <span className="text-xs text-[#8E95A5] dark:text-[#70707B] font-mono">Total: 12.6 hrs</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2">
            {[
              { day: 'Mon', hours: 1.8, hPct: '55%' },
              { day: 'Tue', hours: 2.2, hPct: '68%' },
              { day: 'Wed', hours: 1.5, hPct: '45%' },
              { day: 'Thu', hours: 2.6, hPct: '80%' },
              { day: 'Fri', hours: 2.0, hPct: '60%' },
              { day: 'Sat', hours: 3.2, hPct: '95%' },
              { day: 'Sun', hours: 1.2, hPct: '35%' }
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono">{col.hours}h</span>
                <div className="w-full bg-[#E2E4E9] dark:bg-[#202027] rounded-t-lg h-32 flex items-end overflow-hidden">
                  <div
                    className="w-full bg-indigo-600 dark:bg-indigo-500 rounded-t-lg transition-all duration-500"
                    style={{ height: col.hPct }}
                  />
                </div>
                <span className="text-[11px] font-medium text-[#4B5563] dark:text-[#A8A8B3]">{col.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weak Topics to Practice & Milestone Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weak Topics */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-600 dark:text-amber-400 font-mono">
            <AlertTriangle className="w-4 h-4" />
            Targeted Revision Needed
          </div>
          <h3 className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7]">
            Identified Knowledge Gaps
          </h3>

          <div className="space-y-3">
            {user.weakTopics.map((topic, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.06] bg-[#F7F8FC] dark:bg-[#19191F] flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7]">
                    {topic}
                  </div>
                  <div className="text-[11px] text-[#8E95A5] dark:text-[#70707B]">
                    Accuracy &lt; 65% in recent quizzes
                  </div>
                </div>
                <button
                  onClick={() => onPracticeTopic(topic)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white flex items-center gap-1 shadow-2xs"
                >
                  Practice <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Milestone Roadmap */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 font-mono">
            <Flame className="w-4 h-4 text-amber-500 fill-current" />
            Study Streak Roadmap
          </div>
          <h3 className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7]">
            Daily Habits & Badges
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-xl border transition-all ${
                  m.achieved
                    ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-900/60'
                    : 'bg-[#F7F8FC] dark:bg-[#19191F]/40 border-[#E2E4E9] dark:border-white/[0.04] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                    {m.days} Days
                  </span>
                  {m.achieved ? (
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-stone-400 dark:border-stone-600" />
                  )}
                </div>
                <div className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
