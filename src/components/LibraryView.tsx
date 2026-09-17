import React, { useState } from 'react';
import { StudyMaterial } from '../types';
import {
  BookOpen,
  Search,
  UploadCloud,
  Star,
  Trash2,
  Zap,
  ArrowRight
} from 'lucide-react';

interface LibraryViewProps {
  materials: StudyMaterial[];
  onOpenMaterial: (material: StudyMaterial) => void;
  onOpenUpload: () => void;
  onToggleFavorite: (id: string) => void;
  onDeleteMaterial: (id: string) => void;
  onStartExam: (material: StudyMaterial) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  materials,
  onOpenMaterial,
  onOpenUpload,
  onToggleFavorite,
  onDeleteMaterial,
  onStartExam
}) => {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const subjects = Array.from(new Set(materials.map((m) => m.subject)));

  const filtered = materials.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.chapter.toLowerCase().includes(search.toLowerCase());
    const matchSubject = selectedSubject === 'all' || m.subject === selectedSubject;
    const matchFav = !favoritesOnly || m.isFavorite;
    return matchSearch && matchSubject && matchFav;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              Document Intelligence Hub
            </div>
            <h1 className="font-heading font-bold text-2xl text-[#111827] dark:text-[#F5F5F7]">
              My Study Library
            </h1>
            <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
              Access all your analyzed PDFs, slides, and lecture notes with instant AI study tools.
            </p>
          </div>

          <button
            onClick={onOpenUpload}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white flex items-center gap-2 shadow-xs shrink-0 active:scale-95 transition-all"
          >
            <UploadCloud className="w-4 h-4" /> Upload Material
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E2E4E9] dark:border-white/[0.08] text-xs">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8E95A5] dark:text-[#70707B]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search materials, subjects or chapters..."
              className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#4F46E5]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                selectedSubject === 'all'
                  ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] font-semibold'
                  : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] hover:bg-stone-200'
              }`}
            >
              All ({materials.length})
            </button>
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                  selectedSubject === sub
                    ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] font-semibold'
                    : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] hover:bg-stone-200'
                }`}
              >
                {sub}
              </button>
            ))}
            <button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 ${
                favoritesOnly
                  ? 'bg-amber-500 text-white font-semibold'
                  : 'bg-[#F1F3F8] dark:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3]'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" /> Favorites
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Materials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((mat) => (
          <div
            key={mat.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] shadow-xs space-y-4 flex flex-col justify-between hover:border-[#4F46E5]/40 dark:hover:border-[#818CF8]/40 transition-all group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-[#4F46E5] dark:text-[#818CF8] uppercase font-mono">
                    {mat.subject}
                  </span>
                  <span className="text-[11px] text-[#8E95A5] dark:text-[#70707B] font-mono">
                    {mat.chapter}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onToggleFavorite(mat.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      mat.isFavorite ? 'text-amber-500' : 'text-[#8E95A5] hover:text-[#111827] dark:hover:text-[#F5F5F7]'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${mat.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  {materials.length > 1 && (
                    <button
                      onClick={() => onDeleteMaterial(mat.id)}
                      className="p-1.5 rounded-lg text-[#8E95A5] hover:text-red-500 transition-colors"
                      title="Delete material"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <h3
                onClick={() => onOpenMaterial(mat)}
                className="font-heading font-bold text-lg text-[#111827] dark:text-[#F5F5F7] group-hover:text-[#4F46E5] dark:group-hover:text-[#818CF8] cursor-pointer transition-colors"
              >
                {mat.title}
              </h3>

              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] line-clamp-2 leading-relaxed">
                {mat.summary.tldr}
              </p>

              {/* Study suite preview pills */}
              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#4B5563] dark:text-[#A8A8B3]">
                <span className="px-2 py-0.5 rounded-md bg-[#F1F3F8] dark:bg-[#19191F]">
                  {mat.shortNotes.length} Short Notes
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#F1F3F8] dark:bg-[#19191F]">
                  {mat.flashcards.length} Flashcards
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#F1F3F8] dark:bg-[#19191F]">
                  {mat.quizzes.length} Quizzes
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E2E4E9]/60 dark:border-white/[0.04] flex items-center justify-between text-xs">
              <div className="text-[11px] text-[#8E95A5] dark:text-[#70707B] font-mono">
                {mat.fileSize} &bull; {mat.uploadDate}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onStartExam(mat)}
                  className="px-3 py-1.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] text-[#4B5563] dark:text-[#A8A8B3] font-medium flex items-center gap-1 shadow-2xs transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Exam
                </button>
                <button
                  onClick={() => onOpenMaterial(mat)}
                  className="px-4 py-1.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white font-semibold flex items-center gap-1 shadow-xs active:scale-95 transition-all"
                >
                  Study <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
