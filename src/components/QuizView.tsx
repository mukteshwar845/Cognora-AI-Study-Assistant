import React, { useState } from 'react';
import { StudyMaterial, QuizQuestion, AppSettings } from '../types';
import {
  Sparkles,
  Award,
  Check,
  X,
  ArrowRight
} from 'lucide-react';

interface QuizViewProps {
  materials: StudyMaterial[];
  onMaterialSelect: (material: StudyMaterial) => void;
  onUpdateMaterial?: (updated: StudyMaterial) => void;
  onReviseWithAI?: (topic: string) => void;
  settings?: AppSettings;
}

export const QuizView: React.FC<QuizViewProps> = ({
  materials,
  onMaterialSelect,
  onUpdateMaterial,
  onReviseWithAI,
  settings
}) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(
    materials[0]?.id || ''
  );
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    settings?.defaultQuizDifficulty || 'medium'
  );
  const [questionType, setQuestionType] = useState<'mcq' | 'true_false' | 'multiple_answer'>('mcq');
  const [count, setCount] = useState(5);

  const [activeQuizList, setActiveQuizList] = useState<QuizQuestion[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | string[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const currentMaterial = materials.find((m) => m.id === selectedMaterialId);

  const handleStartQuickQuiz = (mat: StudyMaterial) => {
    if (mat.quizzes.length > 0) {
      setActiveQuizList(mat.quizzes);
      setCurrentIndex(0);
      setUserAnswers({});
      setIsSubmitted(false);
    }
  };

  const handleGenerateCustomQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMaterial) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materialTitle: currentMaterial.title,
          topic: topic || currentMaterial.chapter,
          difficulty,
          questionType,
          count,
          contentText: currentMaterial.rawText || currentMaterial.summary.detailed,
          apiKey: settings?.geminiApiKey,
          model: settings?.aiModel
        })
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setActiveQuizList(data.questions);
        setCurrentIndex(0);
        setUserAnswers({});
        setIsSubmitted(false);
      } else {
        setActiveQuizList(currentMaterial.quizzes);
      }
    } catch (e) {
      setActiveQuizList(currentMaterial.quizzes);
    } finally {
      setIsGenerating(false);
    }
  };

  const calculateScore = () => {
    if (!activeQuizList) return 0;
    let correct = 0;
    activeQuizList.forEach((q, idx) => {
      const ans = userAnswers[idx];
      const isCorrect = Array.isArray(q.correctAnswer)
        ? Array.isArray(ans) &&
          q.correctAnswer.length === ans.length &&
          q.correctAnswer.every((v) => ans.includes(v))
        : ans === q.correctAnswer;
      if (isCorrect) correct++;
    });
    return Math.round((correct / activeQuizList.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* If taking a quiz */}
      {activeQuizList && activeQuizList.length > 0 ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-6 transition-colors">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E2E4E9] dark:border-white/[0.08] pb-4">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#4F46E5] dark:text-[#818CF8]">
                Quiz Session
              </span>
              <h2 className="font-heading font-bold text-xl text-[#111827] dark:text-[#F5F5F7]">
                {currentMaterial?.title || 'Knowledge Check'}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#8E95A5] dark:text-[#70707B] font-mono">
                {currentIndex + 1} / {activeQuizList.length}
              </span>
              <button
                onClick={() => setActiveQuizList(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]"
              >
                Exit
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-[#E2E4E9] dark:bg-[#202027] overflow-hidden">
            <div
              className="h-full bg-[#4F46E5] dark:bg-[#6366F1] transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / activeQuizList.length) * 100}%`
              }}
            />
          </div>

          {isSubmitted ? (
            /* Results Screen */
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                <Award className="w-8 h-8 text-amber-500" />
              </div>

              <div className="space-y-1">
                <h3 className="font-heading font-extrabold text-3xl text-[#111827] dark:text-[#F5F5F7] font-mono">
                  Score: {calculateScore()}%
                </h3>
                <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                  You completed all {activeQuizList.length} questions.
                </p>
              </div>

              {/* Review list */}
              <div className="space-y-4 text-left pt-4 max-h-96 overflow-y-auto pr-1">
                {activeQuizList.map((q, idx) => {
                  const ans = userAnswers[idx];
                  const isCorrect = Array.isArray(q.correctAnswer)
                    ? Array.isArray(ans) &&
                      q.correctAnswer.length === ans.length &&
                      q.correctAnswer.every((v) => ans.includes(v))
                    : ans === q.correctAnswer;

                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#111827] dark:text-[#F5F5F7]">
                          Q{idx + 1}. {q.question}
                        </span>
                        {isCorrect ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <Check className="w-4 h-4" /> Correct
                          </span>
                        ) : (
                          <span className="text-red-500 dark:text-red-400 font-bold flex items-center gap-1">
                            <X className="w-4 h-4" /> Incorrect
                          </span>
                        )}
                      </div>
                      <div className="text-[#4B5563] dark:text-[#A8A8B3]">
                        Your answer: <span className="font-medium text-[#111827] dark:text-[#F5F5F7]">{String(ans || 'None')}</span> &bull; Correct: <span className="font-medium text-emerald-600 dark:text-emerald-400">{String(q.correctAnswer)}</span>
                      </div>
                      <p className="text-[11px] text-[#8E95A5] dark:text-[#70707B] italic">
                        {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>

              {savedMessage && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 font-medium max-w-md mx-auto">
                  {savedMessage}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                {currentMaterial && onUpdateMaterial && (
                  <button
                    onClick={() => {
                      const existingQuestions = new Set(currentMaterial.quizzes.map((q) => q.question.toLowerCase().trim()));
                      const toAdd = (activeQuizList || []).filter((q) => !existingQuestions.has(q.question.toLowerCase().trim()));
                      if (toAdd.length > 0) {
                        onUpdateMaterial({
                          ...currentMaterial,
                          quizzes: [...currentMaterial.quizzes, ...toAdd]
                        });
                        setSavedMessage(`Saved ${toAdd.length} new questions to "${currentMaterial.title}"!`);
                      } else {
                        setSavedMessage('All quiz questions already saved in material library.');
                      }
                      setTimeout(() => setSavedMessage(null), 3500);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" /> Save to Material
                  </button>
                )}
                {onReviseWithAI && (
                  <button
                    onClick={() => onReviseWithAI(topic || currentMaterial?.chapter || 'Core Concepts')}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-800/50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Revise with AI
                  </button>
                )}
                <button
                  onClick={() => {
                    setUserAnswers({});
                    setIsSubmitted(false);
                    setCurrentIndex(0);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#4F46E5] text-white hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] cursor-pointer"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={() => setActiveQuizList(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] cursor-pointer"
                >
                  Back to Quiz Hub
                </button>
              </div>
            </div>
          ) : (
            /* Question Active */
            (() => {
              const q = activeQuizList[currentIndex];
              const ans = userAnswers[currentIndex];

              return (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]">
                      {q.difficulty} &bull; {q.topic}
                    </span>
                    <h3 className="font-heading font-semibold text-lg text-[#111827] dark:text-[#F5F5F7] leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {q.options?.map((opt, i) => {
                      const isSelected = Array.isArray(ans)
                        ? ans.includes(opt)
                        : ans === opt;

                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (q.type === 'multiple_answer') {
                              const arr = Array.isArray(ans) ? ans : [];
                              const next = arr.includes(opt)
                                ? arr.filter((x) => x !== opt)
                                : [...arr, opt];
                              setUserAnswers({ ...userAnswers, [currentIndex]: next });
                            } else {
                              setUserAnswers({ ...userAnswers, [currentIndex]: opt });
                            }
                          }}
                          className={`w-full min-h-[52px] p-4 rounded-2xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between active-press cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 border-[#4F46E5] dark:border-[#818CF8] text-[#4F46E5] dark:text-[#818CF8] font-semibold ring-2 ring-indigo-500/20 shadow-2xs'
                              : 'bg-[#F1F3F8] dark:bg-[#19191F] border-[#E2E4E9] dark:border-white/[0.08] hover:border-stone-300 dark:hover:border-white/[0.14] text-[#111827] dark:text-[#F5F5F7]'
                          }`}
                        >
                          <span className="pr-2">{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E2E4E9] dark:border-white/[0.08]">
                    <button
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
                      className="px-5 py-3 min-h-[46px] rounded-xl text-xs font-semibold border border-[#E2E4E9] dark:border-white/[0.08] disabled:opacity-30 hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] active-press"
                    >
                      &larr; Previous
                    </button>

                    {currentIndex < activeQuizList.length - 1 ? (
                      <button
                        onClick={() => setCurrentIndex((p) => p + 1)}
                        className="flex-1 sm:flex-initial px-6 py-3 min-h-[46px] rounded-xl text-xs font-bold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white flex items-center justify-center gap-1.5 shadow-xs active-press"
                      >
                        <span>Next Question</span>
                        <span>&rarr;</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsSubmitted(true)}
                        className="flex-1 sm:flex-initial px-6 py-3 min-h-[46px] rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-xs active-press"
                      >
                        Finish & View Score
                      </button>
                    )}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      ) : (
        /* Quiz Hub / Generator Screen */
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-2 transition-colors">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] text-xs font-semibold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Practice
            </div>
            <h1 className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
              AI Quiz Platform
            </h1>
            <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
              Take pre-generated quizzes from your study material or customize difficulty and question types.
            </p>
          </div>

          {/* Available Quizzes per document */}
          <div className="space-y-3">
            <h2 className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7]">
              Ready-to-Take Material Quizzes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materials.map((m) => (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3 shadow-2xs flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] uppercase font-mono">
                      {m.subject}
                    </span>
                    <h3 className="font-heading font-semibold text-base text-[#111827] dark:text-[#F5F5F7]">
                      {m.title}
                    </h3>
                    <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] line-clamp-2">
                      {m.summary.tldr}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E4E9]/60 dark:border-white/[0.04] flex items-center justify-between">
                    <span className="text-xs text-[#8E95A5] dark:text-[#70707B] font-mono">
                      {m.quizzes.length} Questions
                    </span>
                    <button
                      onClick={() => handleStartQuickQuiz(m)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white flex items-center gap-1.5 shadow-xs active:scale-95"
                    >
                      Start Quiz <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Quiz Generator form */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-5">
            <div>
              <h2 className="font-heading font-bold text-lg text-[#111827] dark:text-[#F5F5F7] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#4F46E5] dark:text-[#818CF8]" />
                Custom AI Quiz Generator
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                Tailor an examination check on specific topics with custom parameters.
              </p>
            </div>

            <form onSubmit={handleGenerateCustomQuiz} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                    Source Material
                  </label>
                  <select
                    value={selectedMaterialId}
                    onChange={(e) => setSelectedMaterialId(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] outline-hidden focus:border-[#4F46E5]"
                  >
                    {materials.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title} ({m.subject})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                    Target Topic (Optional)
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Newton's Laws, Mitosis & DNA, Demand Elasticity, Stacks"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] outline-hidden focus:border-[#4F46E5]"
                  />
                  <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none">
                    <span className="text-[10px] text-[#8E95A5] dark:text-[#70707B] shrink-0 font-mono">Quick:</span>
                    {[
                      "Newton's 2nd Law",
                      "Mitosis vs Meiosis",
                      "Price Elasticity",
                      "Photosynthesis",
                      "Queue Condition"
                    ].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTopic(t)}
                        className="px-2 py-0.5 rounded-md text-[10px] bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#4F46E5] dark:hover:text-[#818CF8] whitespace-nowrap transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] outline-hidden focus:border-[#4F46E5]"
                  >
                    <option value="easy">Easy (Definitions & Foundations)</option>
                    <option value="medium">Medium (Mechanics & Code)</option>
                    <option value="hard">Hard (Edge Cases & Proofs)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                    Question Format
                  </label>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] outline-hidden focus:border-[#4F46E5]"
                  >
                    <option value="mcq">Multiple Choice (Single Answer)</option>
                    <option value="true_false">True / False</option>
                    <option value="multiple_answer">Multiple Choice (Multiple Answers)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
                    Number of Questions
                  </label>
                  <select
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] outline-hidden focus:border-[#4F46E5]"
                  >
                    <option value={3}>3 Questions</option>
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white shadow-xs flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                {isGenerating ? 'Generating Quiz Questions...' : 'Generate & Launch Quiz'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
