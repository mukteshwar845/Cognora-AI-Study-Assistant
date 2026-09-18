import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  AcademicLevel,
  UpcomingExamItem
} from '../types';
import {
  X,
  Flame,
  Check,
  GraduationCap,
  Sparkles,
  BookOpen,
  Calendar,
  Plus,
  Trash2,
  Award,
  Settings,
  Brain,
  Zap,
  Rocket,
  Code,
  Atom,
  AlertCircle,
  Clock,
  Target
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSaveUser: (updated: UserProfile) => void;
  onOpenSettings?: () => void;
}

const AVATAR_GRADIENTS = [
  { id: 'indigo', class: 'from-indigo-600 via-purple-600 to-violet-500', name: 'Indigo Aura' },
  { id: 'emerald', class: 'from-emerald-600 via-teal-600 to-cyan-500', name: 'Emerald Spark' },
  { id: 'sunset', class: 'from-amber-500 via-rose-500 to-pink-600', name: 'Sunset Glow' },
  { id: 'cyan', class: 'from-cyan-600 via-blue-600 to-indigo-700', name: 'Deep Ocean' },
  { id: 'dark', class: 'from-stone-800 via-stone-900 to-black', name: 'Midnight Onyx' }
];

const AVATAR_ICONS = [
  { id: 'initials', label: 'Initials' },
  { id: 'brain', icon: Brain, label: 'Brain' },
  { id: 'graduation', icon: GraduationCap, label: 'Scholar' },
  { id: 'sparkles', icon: Sparkles, label: 'Magic' },
  { id: 'rocket', icon: Rocket, label: 'Rocket' },
  { id: 'code', icon: Code, label: 'Coder' },
  { id: 'atom', icon: Atom, label: 'Physics' }
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSaveUser,
  onOpenSettings
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...user });
  const [activeTab, setActiveTab] = useState<'profile' | 'academics' | 'exams' | 'topics'>('profile');
  const [newSubject, setNewSubject] = useState('');
  const [newWeakTopic, setNewWeakTopic] = useState('');
  const [newStrongTopic, setNewStrongTopic] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New exam form state
  const [newExamSubject, setNewExamSubject] = useState('');
  const [newExamDate, setNewExamDate] = useState('');
  const [newExamTarget, setNewExamTarget] = useState('90');
  const [showAddExam, setShowAddExam] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ ...user });
      setSaveSuccess(false);
      setShowAddExam(false);
    }
  }, [isOpen, user]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveUser(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;
    const current = formData.subjectsEnrolled || [];
    if (!current.includes(newSubject.trim())) {
      setFormData({
        ...formData,
        subjectsEnrolled: [...current, newSubject.trim()]
      });
    }
    setNewSubject('');
  };

  const handleRemoveSubject = (subject: string) => {
    const current = formData.subjectsEnrolled || [];
    setFormData({
      ...formData,
      subjectsEnrolled: current.filter((s) => s !== subject)
    });
  };

  const handleAddExam = () => {
    if (!newExamSubject.trim() || !newExamDate) return;
    const targetDate = new Date(newExamDate);
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const newExam: UpcomingExamItem = {
      id: `exam_${Date.now()}`,
      subject: newExamSubject.trim(),
      date: newExamDate,
      daysLeft,
      targetScore: Number(newExamTarget) || 90
    };

    const currentExams = formData.upcomingExams || formData.targetExams || [];
    setFormData({
      ...formData,
      upcomingExams: [...currentExams, newExam],
      targetExams: [...currentExams, newExam]
    });

    setNewExamSubject('');
    setNewExamDate('');
    setShowAddExam(false);
  };

  const handleRemoveExam = (id: string) => {
    const currentExams = formData.upcomingExams || formData.targetExams || [];
    const updated = currentExams.filter((e) => e.id !== id);
    setFormData({
      ...formData,
      upcomingExams: updated,
      targetExams: updated
    });
  };

  const handleAddWeakTopic = () => {
    if (!newWeakTopic.trim()) return;
    setFormData({
      ...formData,
      weakTopics: [...(formData.weakTopics || []), newWeakTopic.trim()]
    });
    setNewWeakTopic('');
  };

  const handleRemoveWeakTopic = (topic: string) => {
    setFormData({
      ...formData,
      weakTopics: (formData.weakTopics || []).filter((t) => t !== topic)
    });
  };

  const handleAddStrongTopic = () => {
    if (!newStrongTopic.trim()) return;
    setFormData({
      ...formData,
      strongTopics: [...(formData.strongTopics || []), newStrongTopic.trim()]
    });
    setNewStrongTopic('');
  };

  const handleRemoveStrongTopic = (topic: string) => {
    setFormData({
      ...formData,
      strongTopics: (formData.strongTopics || []).filter((t) => t !== topic)
    });
  };

  // Render selected avatar preview
  const renderAvatarPreview = () => {
    const gradClass = formData.avatarColor || 'from-indigo-600 via-purple-600 to-violet-500';
    const iconId = formData.avatarIcon || 'initials';
    const activeIconObj = AVATAR_ICONS.find((i) => i.id === iconId);

    return (
      <div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${gradClass} text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0 transition-transform`}
      >
        {activeIconObj && activeIconObj.icon ? (
          <activeIconObj.icon className="w-8 h-8" />
        ) : (
          formData.name.slice(0, 2).toUpperCase()
        )}
      </div>
    );
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150 cursor-default"
    >
      <div className="bg-white dark:bg-[#111116] border-t sm:border border-[#E2E4E9] dark:border-white/[0.08] rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[85vh] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        {/* Mobile Drag Handle */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-white/20" />
        </div>

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between shrink-0 bg-stone-50/50 dark:bg-[#16161C]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7]">
                Student Profile & Identity
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">{formData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenSettings && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSettings();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-stone-100 dark:hover:bg-white/[0.06] border border-stone-200 dark:border-white/[0.08] transition-colors"
                title="Configure Study Settings"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Academic Overview Hero Banner */}
        <div className="p-4 sm:p-5 border-b border-[#E2E4E9] dark:border-white/[0.08] bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-transparent dark:from-indigo-500/10 dark:via-purple-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            {renderAvatarPreview()}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7]">
                  {formData.name}
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-bold">
                  {formData.academicLevel || 'Undergraduate'}
                </span>
              </div>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3] mt-0.5">
                {formData.degree || 'Computer Science'} • {formData.semester || 'Semester 5'}
              </p>
              {formData.institution && (
                <p className="text-[11px] text-stone-500 font-mono mt-0.5">{formData.institution}</p>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-around sm:justify-end bg-white/70 dark:bg-[#19191F]/70 p-2.5 rounded-2xl border border-stone-200/60 dark:border-white/[0.08]">
            <div className="text-center px-2">
              <div className="text-[10px] text-stone-500">Streak</div>
              <div className="font-bold text-amber-500 text-xs sm:text-sm flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" /> {formData.streakDays}d
              </div>
            </div>
            <div className="w-px h-6 bg-stone-200 dark:bg-white/[0.08]" />
            <div className="text-center px-2">
              <div className="text-[10px] text-stone-500">Mastery</div>
              <div className="font-bold text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm">
                {formData.averageQuizScore || formData.quizAverage}%
              </div>
            </div>
            <div className="w-px h-6 bg-stone-200 dark:bg-white/[0.08]" />
            <div className="text-center px-2">
              <div className="text-[10px] text-stone-500">Weekly</div>
              <div className="font-bold text-[#111827] dark:text-[#F5F5F7] text-xs sm:text-sm">
                {formData.weeklyHoursSpent || 12}h
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-[#E2E4E9] dark:border-white/[0.08] px-4 flex gap-2 bg-stone-50/60 dark:bg-[#131319]/60 shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: 'profile', label: 'Identity & Bio' },
            { id: 'academics', label: 'Curriculum & Subjects' },
            { id: 'exams', label: `Upcoming Exams (${(formData.upcomingExams || []).length})` },
            { id: 'topics', label: 'Focus & Weak Areas' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* TAB 1: IDENTITY & BIO */}
          {activeTab === 'profile' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Avatar Selector */}
              <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3">
                <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7]">
                  Avatar Aesthetic & Symbol
                </label>

                {/* Gradient color themes */}
                <div className="flex items-center gap-2 flex-wrap">
                  {AVATAR_GRADIENTS.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatarColor: g.class })}
                      className={`w-7 h-7 rounded-full bg-gradient-to-tr ${g.class} transition-transform ${
                        formData.avatarColor === g.class ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : 'hover:scale-105'
                      }`}
                      title={g.name}
                    />
                  ))}
                </div>

                {/* Icon options */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {AVATAR_ICONS.map((iconOpt) => (
                    <button
                      key={iconOpt.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatarIcon: iconOpt.id })}
                      className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                        (formData.avatarIcon || 'initials') === iconOpt.id
                          ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                          : 'bg-white dark:bg-[#19191F] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-white/[0.08] hover:border-indigo-300'
                      }`}
                    >
                      {iconOpt.icon && <iconOpt.icon className="w-3.5 h-3.5" />}
                      <span>{iconOpt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name & Bio */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-stone-50 dark:bg-[#16161C] text-xs font-medium text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                    Study Motto / Academic Tagline
                  </label>
                  <textarea
                    rows={2}
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="e.g. Master algorithms through disciplined spaced repetition. Targeting Dean's Honor Roll."
                    className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-stone-50 dark:bg-[#16161C] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CURRICULUM & SUBJECTS */}
          {activeTab === 'academics' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                    University / College / School
                  </label>
                  <input
                    type="text"
                    value={formData.institution || ''}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. Stanford / IIT / MIT"
                    className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-stone-50 dark:bg-[#16161C] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                    Degree / Major Program
                  </label>
                  <input
                    type="text"
                    value={formData.degree || ''}
                    onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                    placeholder="e.g. B.Tech Computer Science"
                    className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-stone-50 dark:bg-[#16161C] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                    Academic Level
                  </label>
                  <select
                    value={formData.academicLevel || 'undergraduate'}
                    onChange={(e) =>
                      setFormData({ ...formData, academicLevel: e.target.value as AcademicLevel })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-stone-50 dark:bg-[#16161C] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  >
                    <option value="high_school">High School (K-12)</option>
                    <option value="undergraduate">Undergraduate (Bachelors)</option>
                    <option value="postgraduate">Postgraduate (Masters/PhD)</option>
                    <option value="competitive_exam">Competitive Exam Aspirant</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                    Current Semester / Year
                  </label>
                  <input
                    type="text"
                    value={formData.semester || ''}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    placeholder="e.g. Semester 5"
                    className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-stone-50 dark:bg-[#16161C] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                    Target GPA / CGPA
                  </label>
                  <input
                    type="text"
                    value={formData.targetGpa || ''}
                    onChange={(e) => setFormData({ ...formData, targetGpa: e.target.value })}
                    placeholder="e.g. 9.0 / 10.0 or 3.8 / 4.0"
                    className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-stone-50 dark:bg-[#16161C] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              {/* Enrolled Subjects List & Add */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3">
                <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] flex items-center justify-between">
                  <span>Enrolled Coursework & Subjects</span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {(formData.subjectsEnrolled || []).length} active subjects
                  </span>
                </label>

                <div className="flex flex-wrap gap-2">
                  {(formData.subjectsEnrolled || []).map((subj) => (
                    <span
                      key={subj}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#19191F] border border-stone-200 dark:border-white/[0.08] text-xs font-medium text-stone-700 dark:text-stone-300 shadow-2xs"
                    >
                      <BookOpen className="w-3 h-3 text-indigo-500" />
                      <span>{subj}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(subj)}
                        className="text-stone-400 hover:text-rose-500 transition-colors ml-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSubject();
                      }
                    }}
                    placeholder="Add subject (e.g. Operating Systems)..."
                    className="flex-1 p-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubject}
                    className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: UPCOMING EXAMS */}
          {activeTab === 'exams' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                    Exam Targets & Deadlines
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Powers dashboard countdowns, study planner prioritization, and diagnostic urgency.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddExam(!showAddExam)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-500/20 text-xs font-semibold flex items-center gap-1 hover:bg-indigo-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> {showAddExam ? 'Close' : 'Add Exam'}
                </button>
              </div>

              {/* Add Exam Form */}
              {showAddExam && (
                <div className="p-3.5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/30 space-y-3 animate-in fade-in duration-150">
                  <div className="text-xs font-bold text-indigo-950 dark:text-indigo-200">
                    Register New Exam Milestone
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      value={newExamSubject}
                      onChange={(e) => setNewExamSubject(e.target.value)}
                      placeholder="Exam / Subject Name..."
                      className="p-2 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-white dark:bg-[#19191F] text-xs"
                    />
                    <input
                      type="date"
                      value={newExamDate}
                      onChange={(e) => setNewExamDate(e.target.value)}
                      className="p-2 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-white dark:bg-[#19191F] text-xs font-mono"
                    />
                    <input
                      type="number"
                      min={50}
                      max={100}
                      value={newExamTarget}
                      onChange={(e) => setNewExamTarget(e.target.value)}
                      placeholder="Target Score %"
                      className="p-2 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-white dark:bg-[#19191F] text-xs font-mono"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddExam}
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
                    >
                      Save Exam Target
                    </button>
                  </div>
                </div>
              )}

              {/* List of Registered Exams */}
              <div className="space-y-2">
                {(formData.upcomingExams || formData.targetExams || []).length === 0 ? (
                  <div className="p-6 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-dashed border-stone-200 dark:border-white/[0.08] text-center text-xs text-stone-500">
                    No upcoming exams registered. Click "Add Exam" above to track test dates.
                  </div>
                ) : (
                  (formData.upcomingExams || formData.targetExams || []).map((exam) => (
                    <div
                      key={exam.id}
                      className="p-3 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs font-mono">
                          {exam.daysLeft}d
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                            {exam.subject}
                          </div>
                          <div className="text-[11px] text-stone-500 flex items-center gap-2">
                            <span>Target: {exam.targetScore || 90}%</span>
                            <span>•</span>
                            <span className="font-mono">{exam.date}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveExam(exam.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                        title="Remove exam"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: FOCUS & WEAK AREAS */}
          {activeTab === 'topics' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Weak Topics */}
              <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Areas Needing Targeted Practice</span>
                  </div>
                  <span className="text-[10px] text-rose-700 dark:text-rose-300 font-mono font-medium">
                    {(formData.weakTopics || []).length} focus areas
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(formData.weakTopics || []).map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#19191F] border border-rose-200 dark:border-rose-500/30 text-xs font-medium text-rose-800 dark:text-rose-300 shadow-2xs"
                    >
                      <span>{topic}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveWeakTopic(topic)}
                        className="text-stone-400 hover:text-rose-600 transition-colors ml-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newWeakTopic}
                    onChange={(e) => setNewWeakTopic(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddWeakTopic();
                      }
                    }}
                    placeholder="Add weak topic (e.g. Dynamic Programming Memoization)..."
                    className="flex-1 p-2 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-white dark:bg-[#19191F] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddWeakTopic}
                    className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* Strong Topics */}
              <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Mastered Topics & Strengths</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-mono font-medium">
                    {(formData.strongTopics || []).length} mastered
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(formData.strongTopics || []).map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#19191F] border border-emerald-200 dark:border-emerald-500/30 text-xs font-medium text-emerald-800 dark:text-emerald-300 shadow-2xs"
                    >
                      <span>{topic}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveStrongTopic(topic)}
                        className="text-stone-400 hover:text-emerald-600 transition-colors ml-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newStrongTopic}
                    onChange={(e) => setNewStrongTopic(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddStrongTopic();
                      }
                    }}
                    placeholder="Add strength (e.g. Binary Search Trees)..."
                    className="flex-1 p-2 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-white dark:bg-[#19191F] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddStrongTopic}
                    className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-3 border-t border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
