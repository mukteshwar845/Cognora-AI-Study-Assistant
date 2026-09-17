import React, { useState } from 'react';
import { StudyPlanSession } from '../types';
import {
  Calendar,
  Sparkles,
  Check
} from 'lucide-react';

interface StudyPlannerViewProps {
  studyPlan: StudyPlanSession[];
  onUpdateStudyPlan: (plan: StudyPlanSession[]) => void;
  onToggleSession: (id: string) => void;
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({
  studyPlan,
  onUpdateStudyPlan,
  onToggleSession
}) => {
  const [examDate, setExamDate] = useState('2026-10-02');
  const [availableHours, setAvailableHours] = useState(3.5);
  const [prepLevel] = useState('Intermediate');
  const [weakSubject, setWeakSubject] = useState('Computer Networks');
  const [preferredTime, setPreferredTime] = useState('Evening (6 PM - 10 PM)');

  const [isGenerating, setIsGenerating] = useState(false);
  const [aiAdvice, setAiAdvice] = useState(
    'Focus on active recall for Data Structures boundary cases first, followed by mock tests for Computer Networks.'
  );

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examDate,
          subjects: ['Data Structures & Algorithms', 'DBMS', 'Machine Learning', weakSubject],
          availableHours,
          preparationLevel: prepLevel,
          weakSubjects: [weakSubject],
          preferredTimes: preferredTime
        })
      });
      const data = await res.json();
      if (data.sessions && data.sessions.length > 0) {
        onUpdateStudyPlan(data.sessions);
      }
      if (data.recommendation) {
        setAiAdvice(data.recommendation);
      }
    } catch (err) {
      console.warn('Study plan fallback');
    } finally {
      setIsGenerating(false);
    }
  };

  const completedCount = studyPlan.filter((s) => s.completed).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-3 transition-colors">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider font-mono">
          <Calendar className="w-3.5 h-3.5" />
          Adaptive Timetable Engine
        </div>
        <h1 className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
          Personalized Study Scheduler
        </h1>
        <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
          AI dynamically allocates study slots, flashcard reviews, and mock tests according to your exam deadlines and weak topics.
        </p>
      </div>

      {/* AI Advice Banner */}
      <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 flex items-start gap-3 text-xs text-[#111827] dark:text-[#F5F5F7]">
        <Sparkles className="w-5 h-5 text-[#4F46E5] dark:text-[#818CF8] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#4F46E5] dark:text-[#818CF8]">
            Strategic Study Advice:{' '}
          </span>
          <span className="text-[#4B5563] dark:text-[#A8A8B3]">{aiAdvice}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Schedule Checklist */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7]">
              Today's Sessions ({completedCount} / {studyPlan.length} Completed)
            </h2>
            <div className="w-28 h-2 rounded-full bg-[#E2E4E9] dark:bg-[#202027] overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{
                  width: `${studyPlan.length > 0 ? (completedCount / studyPlan.length) * 100 : 0}%`
                }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {studyPlan.map((session) => (
              <div
                key={session.id}
                onClick={() => onToggleSession(session.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  session.completed
                    ? 'bg-[#F7F8FC] dark:bg-[#19191F]/50 border-[#E2E4E9] dark:border-white/[0.04] line-through opacity-60'
                    : 'bg-white dark:bg-[#131318] border-[#E2E4E9] dark:border-white/[0.08] hover:border-[#4F46E5]/40 dark:hover:border-[#818CF8]/40 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors shrink-0 ${
                      session.completed
                        ? 'bg-emerald-500 text-white'
                        : 'border-2 border-stone-300 dark:border-stone-700 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-heading font-semibold text-sm text-[#111827] dark:text-[#F5F5F7]">
                      {session.subject}
                    </div>
                    <div className="text-xs text-[#8E95A5] dark:text-[#70707B] flex items-center gap-2">
                      <span className="font-mono">{session.time}</span>
                      <span>&bull;</span>
                      <span>{session.durationMinutes} mins</span>
                    </div>
                    {session.notes && (
                      <p className="text-[11px] text-[#8E95A5] dark:text-[#70707B] pt-0.5">
                        {session.notes}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className={`text-[10px] uppercase font-mono px-2.5 py-1 rounded-md font-semibold ${
                    session.taskType === 'mock_exam'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      : session.taskType === 'flashcards'
                      ? 'bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300'
                      : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                  }`}
                >
                  {session.taskType.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Plan Generator Controls */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-4 h-fit">
          <h3 className="font-heading font-bold text-sm text-[#111827] dark:text-[#F5F5F7] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8]" />
            Recalculate Schedule
          </h3>

          <form onSubmit={handleGeneratePlan} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                Target Exam Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] outline-hidden focus:border-[#4F46E5]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                Daily Study Hours: {availableHours}h
              </label>
              <input
                type="range"
                min={1}
                max={8}
                step={0.5}
                value={availableHours}
                onChange={(e) => setAvailableHours(parseFloat(e.target.value))}
                className="w-full accent-[#4F46E5]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                Subject Needing Extra Focus
              </label>
              <input
                type="text"
                value={weakSubject}
                onChange={(e) => setWeakSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] outline-hidden focus:border-[#4F46E5]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                Preferred Study Window
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] outline-hidden focus:border-[#4F46E5]"
              >
                <option value="Morning (6 AM - 10 AM)">Morning (6 AM - 10 AM)</option>
                <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                <option value="Evening (6 PM - 10 PM)">Evening (6 PM - 10 PM)</option>
                <option value="Night (10 PM - 2 AM)">Night (10 PM - 2 AM)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 rounded-xl font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isGenerating ? 'Recalculating Plan...' : 'Generate New Timetable'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
