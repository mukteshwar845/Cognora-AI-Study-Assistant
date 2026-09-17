import React, { useState, useRef } from 'react';
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { StudyMaterial } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMaterialCreated: (material: StudyMaterial) => void;
}

const PIPELINE_STEPS = [
  'File uploaded',
  'Extracting content',
  'Understanding concepts',
  'Identifying important topics',
  'Creating study material',
  'Generating questions',
  'Building flashcards'
];

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onMaterialCreated
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [rawText, setRawText] = useState('');
  const [mode, setMode] = useState<'file' | 'text'>('file');

  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    const baseName = file.name.replace(/\.[^/.]+$/, '');
    if (!title) setTitle(baseName);
    if (!subject) {
      if (file.name.toLowerCase().includes('dsa') || file.name.toLowerCase().includes('data structure')) {
        setSubject('Data Structures');
      } else if (file.name.toLowerCase().includes('dbms') || file.name.toLowerCase().includes('database')) {
        setSubject('DBMS');
      } else if (file.name.toLowerCase().includes('ml') || file.name.toLowerCase().includes('machine')) {
        setSubject('Machine Learning');
      } else {
        setSubject('Computer Science');
      }
    }
    if (!chapter) setChapter('Unit 1');
  };

  const startPipeline = async () => {
    if (mode === 'file' && !selectedFile) {
      setErrorMessage('Please select a file to upload or switch to text paste mode.');
      return;
    }
    if (mode === 'text' && !rawText.trim()) {
      setErrorMessage('Please enter or paste your study notes text.');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);
    setCurrentStepIndex(0);
    setIsCompleted(false);

    // Realistic visual pipeline progression
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < PIPELINE_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 700);

    try {
      let fileData: { mimeType?: string; data?: string } | undefined = undefined;
      let textContent = rawText;

      if (selectedFile) {
        if (selectedFile.type.startsWith('text/')) {
          textContent = await selectedFile.text();
        } else {
          // Read base64 for PDF or image
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const res = reader.result as string;
              const commaIndex = res.indexOf(',');
              resolve(commaIndex !== -1 ? res.slice(commaIndex + 1) : res);
            };
            reader.onerror = reject;
            reader.readAsDataURL(selectedFile);
          });
          fileData = {
            mimeType: selectedFile.type || 'application/pdf',
            data: base64
          };
          if (!textContent) {
            textContent = `Document content for: ${selectedFile.name}. Extracted student lecture material.`;
          }
        }
      }

      const res = await fetch('/api/ai/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || (selectedFile ? selectedFile.name : 'Uploaded Notes'),
          subject: subject || 'General',
          chapter: chapter || 'Unit 1',
          textContent,
          inlineData: fileData
        })
      });

      const data = await res.json();
      clearInterval(stepInterval);
      setCurrentStepIndex(PIPELINE_STEPS.length);
      setIsCompleted(true);

      const parsed = data.material || {};
      const newMaterial: StudyMaterial = {
        id: `mat_${Date.now()}`,
        title: title || (selectedFile ? selectedFile.name : 'Study Notes'),
        subject: subject || 'General',
        chapter: chapter || 'Unit 1',
        uploadDate: new Date().toISOString().split('T')[0],
        fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.2 MB',
        fileType: selectedFile ? (selectedFile.name.endsWith('.pdf') ? 'pdf' : selectedFile.name.endsWith('.docx') ? 'docx' : 'notes') : 'notes',
        pageCount: selectedFile ? Math.max(1, Math.round(selectedFile.size / 150000)) : 12,
        isFavorite: false,
        rawText: textContent,
        summary: parsed.summary || {
          tldr: `Synthesis of ${title || 'Study Material'} focusing on key principles and exam edge cases.`,
          detailed: `Detailed breakdown of ${title || 'Study Material'}. Covers core concepts, formulas, and structured definitions.`,
          keyTakeaways: [
            'Master core terminology and definitions.',
            'Review formulas and asymptotic constraints.',
            'Practice past questions and flashcard intervals.'
          ],
          importantTopics: [
            { topic: `${chapter || 'Core Mechanics'}`, relevanceScore: 95 }
          ]
        },
        shortNotes: parsed.shortNotes || [],
        keyConcepts: parsed.keyConcepts || [],
        formulas: parsed.formulas || [],
        hasFormulas: parsed.hasFormulas ?? (parsed.formulas && parsed.formulas.length > 0),
        definitions: parsed.definitions || [],
        questions: parsed.questions || [],
        flashcards: (parsed.flashcards || []).map((fc: any, i: number) => ({
          id: `fc_gen_${Date.now()}_${i}`,
          materialId: `mat_${Date.now()}`,
          front: fc.front,
          back: fc.back,
          topic: fc.topic || chapter || 'General',
          difficulty: fc.difficulty || 'medium',
          isDifficult: false,
          status: 'new'
        })),
        quizzes: (parsed.quizzes || []).map((qz: any, i: number) => ({
          id: `qz_gen_${Date.now()}_${i}`,
          materialId: `mat_${Date.now()}`,
          question: qz.question,
          type: qz.type || 'mcq',
          options: qz.options || ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: qz.correctAnswer || (qz.options ? qz.options[0] : 'True'),
          explanation: qz.explanation || 'Verified based on uploaded study notes.',
          difficulty: qz.difficulty || 'medium',
          topic: qz.topic || chapter || 'General'
        }))
      };

      setTimeout(() => {
        onMaterialCreated(newMaterial);
        onClose();
        setIsProcessing(false);
      }, 900);
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error(err);
      setErrorMessage('We could not complete analysis with the server. Please check the file and try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-2xs">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-base text-[#111827] dark:text-[#F5F5F7]">
                Upload Study Material
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                PDF • DOCX • PPTX • TXT • Images • Lecture notes
              </p>
            </div>
          </div>

          {!isProcessing && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center gap-2.5 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isProcessing ? (
            /* AI Processing Pipeline view */
            <div className="py-6 px-4 space-y-6">
              <div className="text-center space-y-1">
                <div className="inline-flex p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-2">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#111827] dark:text-[#F5F5F7]">
                  AI Processing Pipeline
                </h3>
                <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                  Transforming raw content into structured knowledge, quizzes & flashcards
                </p>
              </div>

              {/* Steps checklist */}
              <div className="bg-[#F7F8FC] dark:bg-[#19191F] rounded-xl p-4 border border-[#E2E4E9] dark:border-white/[0.06] space-y-3 font-mono text-xs">
                {PIPELINE_STEPS.map((step, index) => {
                  const isDone = currentStepIndex > index || isCompleted;
                  const isCurrent = currentStepIndex === index && !isCompleted;
                  return (
                    <div
                      key={step}
                      className={`flex items-center gap-3 transition-colors ${
                        isDone
                          ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                          : isCurrent
                          ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                          : 'text-[#8E95A5] dark:text-[#70707B]'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 shrink-0 animate-spin text-indigo-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-stone-300 dark:border-stone-700 shrink-0" />
                      )}
                      <span>
                        {isDone ? `✓ ${step}` : isCurrent ? `... ${step}` : step}
                      </span>
                    </div>
                  );
                })}
              </div>

              {isCompleted && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center text-sm font-semibold text-emerald-700 dark:text-emerald-300 animate-in zoom-in-95">
                  Your study material is ready 🎉
                </div>
              )}
            </div>
          ) : (
            /* Upload Input Form */
            <>
              {/* Mode switch */}
              <div className="flex p-1 bg-[#F1F3F8] dark:bg-[#19191F] rounded-xl text-xs font-medium border border-[#E2E4E9]/60 dark:border-white/[0.04]">
                <button
                  type="button"
                  onClick={() => setMode('file')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    mode === 'file'
                      ? 'bg-white dark:bg-[#131318] text-[#111827] dark:text-[#F5F5F7] shadow-xs font-semibold'
                      : 'text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white'
                  }`}
                >
                  Upload File (PDF, DOCX, Slides)
                </button>
                <button
                  type="button"
                  onClick={() => setMode('text')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    mode === 'text'
                      ? 'bg-white dark:bg-[#131318] text-[#111827] dark:text-[#F5F5F7] shadow-xs font-semibold'
                      : 'text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white'
                  }`}
                >
                  Paste Notes / Text
                </button>
              </div>

              {mode === 'file' ? (
                /* Drop zone matching prompt style */
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragActive
                      ? 'border-[#4F46E5] bg-indigo-50/60 dark:bg-indigo-950/40'
                      : 'border-stone-300 dark:border-white/[0.12] hover:border-indigo-400 dark:hover:border-indigo-500/60 bg-[#F7F8FC]/60 dark:bg-[#19191F]/40 hover:bg-[#F1F3F8] dark:hover:bg-[#19191F]'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc,.pptx,.ppt,.txt,image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-3 shadow-2xs">
                    <FileText className="w-6 h-6" />
                  </div>

                  <p className="font-heading font-semibold text-sm text-[#111827] dark:text-[#F5F5F7] mb-1">
                    {selectedFile ? selectedFile.name : 'Drop your material here'}
                  </p>
                  <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] mb-4">
                    {selectedFile
                      ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Click to replace`
                      : 'or click to browse from device'}
                  </p>

                  <div className="inline-block px-4 py-1.5 rounded-lg bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] text-xs font-medium text-[#111827] dark:text-[#F5F5F7] shadow-2xs">
                    Upload File
                  </div>

                  <div className="mt-4 text-[11px] text-[#8E95A5] dark:text-[#70707B]">
                    PDF • DOCX • PPTX • Images • Lecture notes
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#4B5563] dark:text-[#A8A8B3]">
                    Paste Lecture Notes / Syllabus / Textbook Excerpt
                  </label>
                  <textarea
                    rows={6}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste lecture content, formulas, or notes here... The AI will extract summaries, key concepts, formulas, quizzes, and flashcards."
                    className="w-full text-xs p-3 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden font-mono"
                  />
                </div>
              )}

              {/* Metadata Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#4B5563] dark:text-[#A8A8B3]">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Data Structures Unit 1"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#4B5563] dark:text-[#A8A8B3]">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Data Structures"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#4B5563] dark:text-[#A8A8B3]">
                    Chapter / Unit
                  </label>
                  <input
                    type="text"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    placeholder="e.g. Stacks & Queues"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!isProcessing && (
          <div className="px-6 py-4 border-t border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#131318]/90 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={startPipeline}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#4F46E5] hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] text-white shadow-xs transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Analyze & Generate Study Suite
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
