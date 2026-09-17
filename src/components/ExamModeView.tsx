import React, { useState, useEffect, useRef } from 'react';
import {
  StudyMaterial,
  QuizQuestion,
  ExamAttempt
} from '../types';
import {
  Clock,
  AlertTriangle,
  Flag,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award,
  AlertCircle
} from 'lucide-react';

interface ExamModeViewProps {
  material: StudyMaterial;
  allMaterials: StudyMaterial[];
  onFinishExam: (attempt: ExamAttempt) => void;
  onExit: () => void;
  onReviseWithAI: (topic: string) => void;
}

export const ExamModeView: React.FC<ExamModeViewProps> = ({
  material,
  allMaterials,
  onFinishExam,
  onExit,
  onReviseWithAI
}) => {
  // Config
  const [examModeType, setExamModeType] = useState<'practice' | 'real'>('practice');
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [totalDurationSeconds] = useState(15 * 60); // 15 mins by default
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isPaused, setIsPaused] = useState(false);

  // Exam Questions: combine or pick from material
  const examQuestions = material.quizzes.length > 0
    ? material.quizzes
    : [
        {
          id: 'mock_1',
          materialId: material.id,
          question: 'What is the optimal average time complexity of searching in a Balanced Binary Search Tree?',
          type: 'mcq' as const,
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correctAnswer: 'O(log n)',
          explanation: 'A balanced BST maintains height proportional to log(n), guaranteeing logarithmic search time.',
          difficulty: 'medium' as const,
          topic: 'Trees'
        }
      ];

  // User state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [examResult, setExamResult] = useState<ExamAttempt | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Timer interval
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleAutoSubmit = () => {
    calculateResults();
  };

  useEffect(() => {
    if (!isExamStarted || examResult) return;

    if (!isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isExamStarted, isPaused, timeLeft, examResult]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    setTimeLeft(totalDurationSeconds);
    setIsExamStarted(true);
  };

  const toggleFlag = (index: number) => {
    setFlagged((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSelectAnswer = (option: string) => {
    const q = examQuestions[currentIndex];
    if (q.type === 'multiple_answer') {
      const current = (answers[currentIndex] as string[]) || [];
      const updated = current.includes(option)
        ? current.filter((x) => x !== option)
        : [...current, option];
      setAnswers({ ...answers, [currentIndex]: updated });
    } else {
      setAnswers({ ...answers, [currentIndex]: option });
    }
  };

  const calculateResults = () => {
    setIsAnalyzing(true);
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;
    const topicBreakdown: Record<string, { total: number; correct: number }> = {};

    examQuestions.forEach((q, i) => {
      const userAns = answers[i];
      const topic = q.topic || material.chapter || 'Core';

      if (!topicBreakdown[topic]) {
        topicBreakdown[topic] = { total: 0, correct: 0 };
      }
      topicBreakdown[topic].total += 1;

      if (userAns === undefined || userAns === '') {
        unanswered += 1;
      } else if (userAns === q.correctAnswer) {
        correct += 1;
        topicBreakdown[topic].correct += 1;
      } else {
        incorrect += 1;
      }
    });

    const total = examQuestions.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const score = accuracy;
    const timeTaken = Math.max(1, Math.round((totalDurationSeconds - timeLeft) / 60));

    const weakAreas = Object.keys(topicBreakdown).filter((top) => {
      const pct = (topicBreakdown[top].correct / topicBreakdown[top].total) * 100;
      return pct < 70;
    });

    const strongAreas = Object.keys(topicBreakdown).filter((top) => {
      const pct = (topicBreakdown[top].correct / topicBreakdown[top].total) * 100;
      return pct >= 70;
    });

    const attempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      examTitle: `${material.title} Mock Exam`,
      materialTitle: material.title,
      subject: material.subject,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      score,
      totalMarks: total * 4,
      accuracy,
      totalQuestions: total,
      correctCount: correct,
      incorrectCount: incorrect,
      unansweredCount: unanswered,
      timeTakenMinutes: timeTaken,
      aiFeedback: {
        strongAreas: strongAreas.length > 0 ? strongAreas : ['Core theoretical concepts'],
        weakAreas: weakAreas.length > 0 ? weakAreas : ['Time complexity corner cases'],
        revisionAdvice: accuracy >= 80
          ? 'Outstanding mastery of this unit. Focus on edge cases and timed speed.'
          : 'Focus on review flashcards and active recall quizzes for flagged weak areas before testing again.'
      }
    };

    setTimeout(() => {
      setIsAnalyzing(false);
      setIsSubmitModalOpen(false);
      setExamResult(attempt);
      onFinishExam(attempt);
    }, 600);
  };

  // 1. Exam Configuration Intro Screen
  if (!isExamStarted && !examResult) {
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-6 animate-in zoom-in-95 duration-200 transition-colors">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-1">
            <Clock className="w-6 h-6" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
            Exam Simulation
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5563] dark:text-[#A8A8B3] max-w-md mx-auto">
            Experience real test conditions with timed questions, flag-for-review capabilities, and AI-powered diagnostic score breakdown.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div
            onClick={() => setExamModeType('practice')}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              examModeType === 'practice'
                ? 'border-[#4F46E5] dark:border-[#6366F1] bg-indigo-50/50 dark:bg-indigo-950/30'
                : 'border-[#E2E4E9] dark:border-white/[0.08] hover:border-stone-300 dark:hover:border-white/[0.14]'
            }`}
          >
            <div className="font-heading font-semibold text-sm text-[#111827] dark:text-[#F5F5F7] mb-1">
              Practice Mode
            </div>
            <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
              Timer can be paused. Relaxed pacing to master concepts.
            </p>
          </div>

          <div
            onClick={() => setExamModeType('real')}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              examModeType === 'real'
                ? 'border-[#4F46E5] dark:border-[#6366F1] bg-indigo-50/50 dark:bg-indigo-950/30'
                : 'border-[#E2E4E9] dark:border-white/[0.08] hover:border-stone-300 dark:hover:border-white/[0.14]'
            }`}
          >
            <div className="font-heading font-semibold text-sm text-[#111827] dark:text-[#F5F5F7] mb-1">
              Real Exam Mode
            </div>
            <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
              Strict timer, no pause. Auto-submits when countdown reaches 0:00.
            </p>
          </div>
        </div>

        {/* Exam Metadata stats */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.06] text-xs">
          <div>
            <div className="text-[#8E95A5] dark:text-[#70707B] font-medium">Questions</div>
            <div className="font-bold text-[#111827] dark:text-[#F5F5F7] text-sm font-mono">
              {examQuestions.length}
            </div>
          </div>
          <div>
            <div className="text-[#8E95A5] dark:text-[#70707B] font-medium">Duration</div>
            <div className="font-bold text-[#111827] dark:text-[#F5F5F7] text-sm font-mono">
              {Math.round(totalDurationSeconds / 60)} Mins
            </div>
          </div>
          <div>
            <div className="text-[#8E95A5] dark:text-[#70707B] font-medium">Subject</div>
            <div className="font-bold text-[#111827] dark:text-[#F5F5F7] text-sm truncate">
              {material.subject}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onExit}
            className="px-5 py-2.5 rounded-xl text-xs font-medium border border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]"
          >
            Back
          </button>
          <button
            onClick={handleStartExam}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white shadow-xs flex items-center gap-2 active:scale-95"
          >
            Begin Examination &rarr;
          </button>
        </div>
      </div>
    );
  }

  // 2. Exam Result Screen
  if (examResult) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-in zoom-in-95 duration-200 pb-10">
        {/* Top Celebration Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-stone-900 text-white shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Exam Completed
              </div>
              <h1 className="font-heading font-extrabold text-3xl">
                {examResult.examTitle}
              </h1>
              <p className="text-xs text-stone-300">
                Completed in {examResult.timeTakenMinutes} minutes with {examResult.accuracy}% overall accuracy
              </p>
            </div>

            {/* Big Score badge */}
            <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center shrink-0">
              <div className="text-4xl font-extrabold font-heading text-amber-400 font-mono">
                {examResult.score}
                <span className="text-xl text-stone-300 font-normal">/100</span>
              </div>
              <div className="text-[11px] uppercase tracking-wider text-stone-300 font-medium">
                Final Score
              </div>
            </div>
          </div>

          {/* Stat Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[11px] text-stone-400">Accuracy</div>
              <div className="text-lg font-bold text-white font-mono">{examResult.accuracy}%</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[11px] text-emerald-400">Correct Answers</div>
              <div className="text-lg font-bold text-emerald-400 font-mono">{examResult.correctCount}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[11px] text-red-400">Incorrect</div>
              <div className="text-lg font-bold text-red-400 font-mono">{examResult.incorrectCount}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[11px] text-stone-400">Unanswered</div>
              <div className="text-lg font-bold text-stone-300 font-mono">{examResult.unansweredCount}</div>
            </div>
          </div>
        </div>

        {/* AI Performance Analysis Card */}
        {examResult.aiFeedback && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-4 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4" />
              AI Diagnostic Feedback
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-200/70 dark:border-emerald-500/20 space-y-2">
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Strong Areas
                </div>
                <ul className="space-y-1 text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                  {examResult.aiFeedback.strongAreas.map((sa, i) => (
                    <li key={i}>• {sa}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-500/10 border border-amber-200/70 dark:border-amber-500/20 space-y-2">
                <div className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Areas Requiring Revision
                </div>
                <ul className="space-y-1 text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                  {examResult.aiFeedback.weakAreas.map((wa, i) => (
                    <li key={i}>• {wa}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={onExit}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#F1F3F8] dark:bg-[#19191F] hover:bg-[#EBF0F7] dark:hover:bg-[#202027] text-[#111827] dark:text-[#F5F5F7] border border-[#E2E4E9] dark:border-white/[0.08]"
          >
            &larr; Back to Dashboard
          </button>

          <button
            onClick={() => {
              setExamResult(null);
              setIsExamStarted(false);
              setAnswers({});
              setFlagged({});
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white shadow-xs"
          >
            Retake Mock Exam
          </button>
        </div>
      </div>
    );
  }

  // 3. Active Examination Interface
  const currentQ = examQuestions[currentIndex];
  const isTimeLow = timeLeft < 5 * 60; // Less than 5 minutes

  return (
    <div className="max-w-5xl mx-auto space-y-4 animate-in fade-in duration-200">
      {/* Exam Header - Responsive Mobile First */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs transition-colors">
        <div className="flex items-center justify-between sm:justify-start gap-2 min-w-0">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] uppercase tracking-wider font-mono shrink-0">
            {examModeType === 'real' ? 'Real Exam' : 'Practice'}
          </span>
          <span className="font-heading font-semibold text-xs sm:text-sm text-[#111827] dark:text-[#F5F5F7] truncate">
            Q{currentIndex + 1}/{examQuestions.length} &bull; {material.title}
          </span>
        </div>

        {/* Countdown Timer & Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-colors ${
              isTimeLow
                ? 'bg-red-50 dark:bg-red-950/60 border-red-300 text-red-600 animate-pulse'
                : 'bg-[#F7F8FC] dark:bg-[#19191F] border-[#E2E4E9] dark:border-white/[0.08] text-[#111827] dark:text-[#F5F5F7]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(timeLeft)}</span>
          </div>

          {examModeType === 'practice' && (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="text-xs px-3 py-1.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] active-press"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-1.5 min-h-[36px] rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white shadow-2xs transition-all active-press"
          >
            Submit Exam
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Question Card */}
        {/* Day: Clean light desk feel, soft white surface, high contrast dark question text */}
        {/* Night: Late-night simulation desk feel, dark charcoal card, soft white question text */}
        <div className="lg:col-span-3 p-6 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-6 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#8E95A5] dark:text-[#70707B]">
            <span className="font-mono text-[11px] uppercase">
              Topic: {currentQ.topic || material.chapter}
            </span>
            <button
              onClick={() => toggleFlag(currentIndex)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                flagged[currentIndex]
                  ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-600 font-semibold'
                  : 'border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${flagged[currentIndex] ? 'fill-current' : ''}`} />
              <span>{flagged[currentIndex] ? 'Flagged for Review' : 'Flag Question'}</span>
            </button>
          </div>

          <h2 className="font-heading font-semibold text-lg text-[#111827] dark:text-[#F5F5F7] leading-relaxed">
            {currentQ.question}
          </h2>

          {/* Options */}
          {/* Day: Light background (#F1F3F8), subtle border, active violet ring */}
          {/* Night: Dark surface (#19191F), subtle border, active violet ring */}
          <div className="space-y-3">
            {currentQ.options?.map((opt, optIndex) => {
              const currentAns = answers[currentIndex];
              const isSelected = Array.isArray(currentAns)
                ? currentAns.includes(opt)
                : currentAns === opt;

              return (
                <button
                  key={optIndex}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`w-full text-left min-h-[52px] p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between active-press cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-[#4F46E5] dark:border-[#818CF8] text-[#4F46E5] dark:text-[#818CF8] font-semibold ring-2 ring-indigo-500/20 shadow-2xs'
                      : 'bg-[#F1F3F8] dark:bg-[#19191F] border-[#E2E4E9] dark:border-white/[0.08] hover:border-stone-300 text-[#111827] dark:text-[#F5F5F7]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono shrink-0 ${
                      isSelected
                        ? 'border-[#4F46E5] dark:border-[#818CF8] bg-[#4F46E5] text-white'
                        : 'border-[#8E95A5] dark:border-[#70707B]'
                    }`}>
                      {String.fromCharCode(65 + optIndex)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Navigation bar */}
          <div className="flex items-center justify-between gap-3 pt-6 border-t border-[#E2E4E9] dark:border-white/[0.08]">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              className="px-5 py-3 min-h-[46px] rounded-xl text-xs font-semibold border border-[#E2E4E9] dark:border-white/[0.08] disabled:opacity-30 hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] flex items-center gap-1.5 active-press"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous
            </button>

            {currentIndex < examQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((p) => p + 1)}
                className="flex-1 sm:flex-initial px-6 py-3 min-h-[46px] rounded-xl text-xs font-bold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white flex items-center justify-center gap-1.5 shadow-xs active-press"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="flex-1 sm:flex-initial px-6 py-3 min-h-[46px] rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs active-press"
              >
                Review & Submit
              </button>
            )}
          </div>
        </div>

        {/* Right side Question Palette */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-4 shadow-2xs h-fit">
          <h3 className="font-heading font-semibold text-xs text-[#8E95A5] dark:text-[#70707B] uppercase tracking-wider font-mono">
            Question Palette
          </h3>

          <div className="grid grid-cols-4 gap-2">
            {examQuestions.map((_, i) => {
              const isAnswered = answers[i] !== undefined;
              const isFlagged = flagged[i];
              const isCurrent = i === currentIndex;

              let btnClass = 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]';
              if (isCurrent) {
                btnClass = 'ring-2 ring-indigo-500 font-bold text-[#111827] dark:text-white';
              }
              if (isAnswered) {
                btnClass += ' bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold';
              }
              if (isFlagged) {
                btnClass += ' border-2 border-amber-400';
              }

              return (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-9 rounded-xl text-xs font-mono transition-all flex items-center justify-center ${btnClass}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5 pt-3 border-t border-[#E2E4E9] dark:border-white/[0.08] text-[11px] text-[#8E95A5] dark:text-[#70707B]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Answered ({Object.keys(answers).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-amber-400 bg-amber-100" />
              <span>Flagged ({Object.keys(flagged).filter((k) => flagged[Number(k)]).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-stone-200 dark:bg-[#202027]" />
              <span>Unanswered ({examQuestions.length - Object.keys(answers).length})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-heading font-bold text-lg text-[#111827] dark:text-[#F5F5F7]">
                Submit Examination?
              </h3>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                You have answered {Object.keys(answers).length} of {examQuestions.length} questions.
                {examQuestions.length - Object.keys(answers).length > 0 && (
                  <span className="text-amber-600 dark:text-amber-400 block mt-1 font-semibold">
                    {examQuestions.length - Object.keys(answers).length} questions remain unanswered!
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-medium border border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]"
              >
                Return to Exam
              </button>
              <button
                onClick={calculateResults}
                disabled={isAnalyzing}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-xs"
              >
                {isAnalyzing ? 'Analyzing...' : 'Yes, Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
