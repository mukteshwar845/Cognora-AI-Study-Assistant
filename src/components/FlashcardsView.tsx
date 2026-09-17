import React, { useState } from 'react';
import { StudyMaterial, Flashcard } from '../types';
import {
  Layers,
  Star,
  CheckCircle2,
  RotateCw
} from 'lucide-react';

interface FlashcardsViewProps {
  materials: StudyMaterial[];
  onUpdateMaterial: (material: StudyMaterial) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  materials,
  onUpdateMaterial
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'difficult'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Aggregate flashcards
  const allFlashcards: { card: Flashcard; material: StudyMaterial }[] = [];
  materials.forEach((m) => {
    m.flashcards.forEach((fc) => {
      allFlashcards.push({ card: fc, material: m });
    });
  });

  const filteredCards = allFlashcards.filter((item) => {
    const matchSubject = selectedSubject === 'all' || item.material.subject === selectedSubject;
    const matchDiff = filterDifficulty === 'all' || (filterDifficulty === 'difficult' && item.card.isDifficult);
    return matchSubject && matchDiff;
  });

  const currentItem = filteredCards[currentIndex];

  const handleToggleDifficult = () => {
    if (!currentItem) return;
    const { card, material } = currentItem;
    const updatedCards = material.flashcards.map((f) =>
      f.id === card.id ? { ...f, isDifficult: !f.isDifficult } : f
    );
    onUpdateMaterial({ ...material, flashcards: updatedCards });
  };

  const handleKnowIt = () => {
    if (!currentItem) return;
    const { card, material } = currentItem;
    const updatedCards = material.flashcards.map((f) =>
      f.id === card.id ? { ...f, status: 'mastered' as const } : f
    );
    onUpdateMaterial({ ...material, flashcards: updatedCards });
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((p) => p + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((p) => Math.max(0, p - 1));
  };

  const subjects = Array.from(new Set(materials.map((m) => m.subject)));

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
              <Layers className="w-3.5 h-3.5" />
              Active Recall Engine
            </div>
            <h1 className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
              AI Flashcards
            </h1>
            <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
              Spaced repetition flashcards generated automatically from your study notes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setFilterDifficulty('all');
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterDifficulty === 'all'
                  ? 'bg-[#4F46E5] dark:bg-[#6366F1] text-white shadow-xs'
                  : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827]'
              }`}
            >
              All ({allFlashcards.length})
            </button>
            <button
              onClick={() => {
                setFilterDifficulty('difficult');
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterDifficulty === 'difficult'
                  ? 'bg-amber-600 dark:bg-amber-500 text-white shadow-xs'
                  : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827]'
              }`}
            >
              Difficult ({allFlashcards.filter((x) => x.card.isDifficult).length})
            </button>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[#E2E4E9] dark:border-white/[0.08] text-xs">
          <button
            onClick={() => {
              setSelectedSubject('all');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              selectedSubject === 'all'
                ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] font-semibold shadow-2xs'
                : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827]'
            }`}
          >
            All Subjects
          </button>
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                selectedSubject === sub
                  ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] font-semibold shadow-2xs'
                  : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827]'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Flashcard Player */}
      {filteredCards.length > 0 && currentItem ? (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-[#8E95A5] dark:text-[#70707B]">
            <span className="font-mono">
              Card {currentIndex + 1} of {filteredCards.length}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-[#F1F3F8] dark:bg-[#19191F] text-[11px] font-medium uppercase font-mono text-[#4B5563] dark:text-[#A8A8B3]">
              {currentItem.material.subject} &bull; {currentItem.card.topic}
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-[#E2E4E9] dark:bg-[#202027] overflow-hidden">
            <div
              className="h-full bg-[#4F46E5] dark:bg-[#6366F1] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
            />
          </div>

          {/* 3D Flip Card */}
          {/* Day: Clean index card aesthetic, crisp white (#FFFFFF), border (#E2E4E9), text deep charcoal (#111827), paper lift shadow */}
          {/* Night: Dark slate flashcard, elevated charcoal (#19191F), subtle border (rgba(255,255,255,0.08)), soft white (#F5F5F7), deep indigo tint on flip */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="perspective-1000 w-full h-80 cursor-pointer select-none"
          >
            <div
              className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front Side */}
              <div className="absolute inset-0 backface-hidden p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col justify-between items-center text-center">
                <div className="flex items-center justify-between w-full text-xs text-[#8E95A5] dark:text-[#70707B]">
                  <span className="font-mono uppercase font-bold text-[#4F46E5] dark:text-[#818CF8]">QUESTION</span>
                  {currentItem.card.isDifficult && (
                    <span className="flex items-center gap-1 text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" /> Difficult
                    </span>
                  )}
                </div>

                <div className="font-heading font-semibold text-xl sm:text-2xl text-[#111827] dark:text-[#F5F5F7] px-2 leading-relaxed">
                  {currentItem.card.front}
                </div>

                <div className="text-xs text-[#8E95A5] dark:text-[#70707B] flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5" /> Tap card to reveal answer
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 p-8 sm:p-10 rounded-3xl bg-[#F7F8FC] dark:bg-[#19191F] border border-indigo-200 dark:border-indigo-500/30 shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_0_20px_rgba(99,102,241,0.15)] flex flex-col justify-between items-center text-center">
                <div className="flex items-center justify-between w-full text-xs text-[#4F46E5] dark:text-[#818CF8] font-mono uppercase font-bold">
                  <span>EXPLANATION & ANSWER</span>
                  <span>{currentItem.material.title}</span>
                </div>

                <div className="text-base sm:text-lg font-medium text-[#111827] dark:text-[#F5F5F7] px-2 leading-relaxed">
                  {currentItem.card.back}
                </div>

                <div className="text-xs text-[#8E95A5] dark:text-[#70707B]">
                  Tap to flip back
                </div>
              </div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center justify-between gap-2">
            <button
              disabled={currentIndex === 0}
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl text-xs font-medium border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#131318] disabled:opacity-30 text-[#4B5563] dark:text-[#A8A8B3] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F]"
            >
              &larr; Prev
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleDifficult}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  currentItem.card.isDifficult
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                    : 'bg-white dark:bg-[#131318] text-[#4B5563] dark:text-[#A8A8B3] border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F]'
                }`}
              >
                <Star className="w-3.5 h-3.5" />
                {currentItem.card.isDifficult ? 'Marked Difficult' : 'Mark Difficult'}
              </button>

              <button
                onClick={handleKnowIt}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Know it
              </button>
            </div>

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl text-xs font-medium border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#131318] text-[#4B5563] dark:text-[#A8A8B3] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F]"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] text-center space-y-3">
          <Layers className="w-10 h-10 text-[#8E95A5] dark:text-[#70707B] mx-auto" />
          <h3 className="font-heading font-semibold text-base text-[#111827] dark:text-[#F5F5F7]">
            No flashcards match your current filter
          </h3>
          <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] max-w-sm mx-auto">
            Try resetting your difficulty filter or select "All Subjects".
          </p>
          <button
            onClick={() => {
              setSelectedSubject('all');
              setFilterDifficulty('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-[#4F46E5] text-white"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
