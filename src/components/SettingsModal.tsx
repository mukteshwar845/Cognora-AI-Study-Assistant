import React, { useState } from 'react';
import {
  X,
  Sparkles,
  BookOpen,
  Bell,
  HardDrive,
  Check,
  Key,
  Eye,
  EyeOff,
  Download,
  Upload,
  RotateCcw,
  Volume2,
  VolumeX,
  Flame,
  Clock,
  ShieldCheck,
  User,
  HelpCircle,
  Code2,
  GraduationCap,
  Layers,
  Zap,
  Target,
  Loader2,
  AlertCircle,
  Brain,
  Rocket,
  Code,
  Atom,
  Plus,
  Trash2,
  Calendar
} from 'lucide-react';
import {
  AppSettings,
  AnswerMode,
  GradingScale,
  AITutorPersona,
  SpacedRepetitionSpeed,
  UserProfile,
  AcademicLevel,
  UpcomingExamItem
} from '../types';
import { ThemePreference, ResolvedTheme } from '../lib/theme';
import { calculateStorageUsage } from '../lib/storage';
import { ACADEMIC_TRACK_PRESETS } from '../data/academicTracks';

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

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (updated: AppSettings) => void;
  user?: UserProfile;
  onSaveUser?: (updated: UserProfile) => void;
  initialTab?: TabKey;
  themePreference?: ThemePreference;
  resolvedTheme?: ResolvedTheme;
  onSelectThemePreference?: (pref: ThemePreference) => void;
  onOpenProfile?: () => void;
  onExportData?: () => void;
  onImportData?: (file: File) => void;
  onResetProgress?: () => void;
  onResetDefaults?: () => void;
}

type TabKey = 'profile' | 'academic' | 'ai' | 'notifications' | 'data';

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  user,
  onSaveUser,
  initialTab = 'profile',
  themePreference,
  resolvedTheme,
  onSelectThemePreference,
  onOpenProfile,
  onExportData,
  onImportData,
  onResetProgress,
  onResetDefaults
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [formData, setFormData] = useState<AppSettings>(() => ({ ...settings }));
  const [profileData, setProfileData] = useState<UserProfile | null>(() => (user ? { ...user } : null));
  const [newSubject, setNewSubject] = useState('');
  const [newWeakTopic, setNewWeakTopic] = useState('');
  const [newStrongTopic, setNewStrongTopic] = useState('');
  const [newExamSubject, setNewExamSubject] = useState('');
  const [newExamDate, setNewExamDate] = useState('');
  const [newExamTarget, setNewExamTarget] = useState('90');
  const [showAddExam, setShowAddExam] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [storageInfo, setStorageInfo] = useState(() => calculateStorageUsage());
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const prevIsOpen = React.useRef(false);

  // Initialize form state strictly when modal transitions from closed to open
  React.useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      setFormData({ ...settings });
      if (user) setProfileData({ ...user });
      if (initialTab) setActiveTab(initialTab);
      setStorageInfo(calculateStorageUsage());
      setSaveSuccess(false);
      setImportStatus(null);
      setTestResult(null);
      setShowAddExam(false);
    }
    prevIsOpen.current = isOpen;
  }, [isOpen, settings, user, initialTab]);

  const handleAddSubject = () => {
    if (!newSubject.trim() || !profileData) return;
    const current = profileData.subjectsEnrolled || [];
    if (!current.includes(newSubject.trim())) {
      setProfileData({
        ...profileData,
        subjectsEnrolled: [...current, newSubject.trim()]
      });
    }
    setNewSubject('');
  };

  const handleRemoveSubject = (subject: string) => {
    if (!profileData) return;
    const current = profileData.subjectsEnrolled || [];
    setProfileData({
      ...profileData,
      subjectsEnrolled: current.filter((s) => s !== subject)
    });
  };

  const handleAddExam = () => {
    if (!newExamSubject.trim() || !newExamDate || !profileData) return;
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

    const currentExams = profileData.upcomingExams || profileData.targetExams || [];
    setProfileData({
      ...profileData,
      upcomingExams: [...currentExams, newExam],
      targetExams: [...currentExams, newExam]
    });

    setNewExamSubject('');
    setNewExamDate('');
    setShowAddExam(false);
  };

  const handleRemoveExam = (id: string) => {
    if (!profileData) return;
    const currentExams = profileData.upcomingExams || profileData.targetExams || [];
    const updated = currentExams.filter((e) => e.id !== id);
    setProfileData({
      ...profileData,
      upcomingExams: updated,
      targetExams: updated
    });
  };

  const handleAddWeakTopic = () => {
    if (!newWeakTopic.trim() || !profileData) return;
    setProfileData({
      ...profileData,
      weakTopics: [...(profileData.weakTopics || []), newWeakTopic.trim()]
    });
    setNewWeakTopic('');
  };

  const handleRemoveWeakTopic = (topic: string) => {
    if (!profileData) return;
    setProfileData({
      ...profileData,
      weakTopics: (profileData.weakTopics || []).filter((t) => t !== topic)
    });
  };

  const handleAddStrongTopic = () => {
    if (!newStrongTopic.trim() || !profileData) return;
    setProfileData({
      ...profileData,
      strongTopics: [...(profileData.strongTopics || []), newStrongTopic.trim()]
    });
    setNewStrongTopic('');
  };

  const handleRemoveStrongTopic = (topic: string) => {
    if (!profileData) return;
    setProfileData({
      ...profileData,
      strongTopics: (profileData.strongTopics || []).filter((t) => t !== topic)
    });
  };

  const handleTestApiKey = async () => {
    setIsTestingKey(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/ai/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: formData.geminiApiKey,
          model: formData.aiModel,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult({
          success: true,
          message: data.message || `Connected to Gemini successfully using ${data.model || formData.aiModel}!`,
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || 'Failed to authenticate. Please check your API key.',
        });
      }
    } catch {
      setTestResult({
        success: false,
        message: 'Could not connect to test endpoint. Make sure the server is running.',
      });
    } finally {
      setIsTestingKey(false);
    }
  };

  // Keyboard shortcut: Esc to close
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSaveSettings(formData);
    if (profileData && onSaveUser) {
      onSaveUser(profileData);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 500);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (onImportData) {
      onImportData(file);
      setImportStatus('Backup restored successfully!');
      setTimeout(() => {
        setImportStatus(null);
        setStorageInfo(calculateStorageUsage());
      }, 2500);
    }
  };

  const tabs: { id: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'profile', label: 'Student Profile', icon: User },
    { id: 'academic', label: 'Academic & Goals', icon: GraduationCap },
    { id: 'ai', label: 'AI Tutor & Intelligence', icon: Sparkles },
    { id: 'notifications', label: 'Alerts & Habits', icon: Bell },
    { id: 'data', label: 'Data & Backup', icon: HardDrive }
  ];

  const explanationStyles: { id: AnswerMode; title: string; desc: string; icon: string }[] = [
    { id: 'simple', title: 'Simple & Concise', desc: 'Direct, clear answers without academic jargon', icon: '⚡' },
    { id: 'detailed', title: 'Deep Conceptual', desc: 'Exhaustive background, mechanics, and references', icon: '📚' },
    { id: 'exam_ready', title: 'Exam-Ready Format', desc: 'Structured with headings, points & marking criteria', icon: '📝' },
    { id: 'eli10', title: "Explain Like I'm 10", desc: 'Intuitive analogies and beginner-friendly stories', icon: '🎈' },
    { id: 'example', title: 'Example First', desc: 'Anchored around real-world applications & problems', icon: '💡' },
    { id: 'code', title: 'Code & Pseudocode', desc: 'Step-by-step algorithms, implementations & complexity', icon: '💻' }
  ];

  const personas: { id: AITutorPersona; title: string; desc: string }[] = [
    { id: 'supportive', title: 'Encouraging Mentor', desc: 'Warm, positive, breaks difficult concepts down gently.' },
    { id: 'socratic', title: 'Socratic Coach', desc: 'Guides you with thought-provoking questions to spark discovery.' },
    { id: 'strict', title: 'Exam Evaluator', desc: 'Rigorous and exact; flags potential marks deduction traps.' },
    { id: 'concise', title: 'Speed Tutor', desc: 'Short, punchy bullet points designed for fast revision.' }
  ];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150 cursor-default"
    >
      <div className="bg-white dark:bg-[#111116] border-t sm:border border-[#E2E4E9] dark:border-white/[0.08] rounded-t-3xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] sm:max-h-[85vh] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between shrink-0 bg-stone-50/50 dark:bg-[#16161C]/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7] flex items-center gap-2">
                Settings & Study Hub
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold">
                  Personalized
                </span>
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">
                Configure AI tutors, study goals, notifications, and data backups
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenProfile && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenProfile();
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-500/20 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Student Profile</span>
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

        {/* Modal Body: Tabs Sidebar (desktop) / Tab Bar (mobile) + Content */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Navigation Tabs */}
          <div className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-[#E2E4E9] dark:border-white/[0.08] p-2 sm:p-3 bg-stone-50/70 dark:bg-[#131319]/70 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all shrink-0 md:w-full text-left ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : 'text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-stone-400 dark:text-stone-500'}`} />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}

            {/* Quick Profile Link for Mobile */}
            {onOpenProfile && (
              <div className="md:hidden shrink-0 flex items-center pl-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenProfile();
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-500/20 whitespace-nowrap"
                >
                  View Profile Card
                </button>
              </div>
            )}
          </div>

          {/* Active Tab Panel Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* TAB: STUDENT PROFILE & IDENTITY */}
            {activeTab === 'profile' && profileData && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111827] dark:text-[#F5F5F7]">
                    Student Profile & Academic Identity
                  </h3>
                  <p className="text-xs text-[#8E95A5] dark:text-[#70707B]">
                    Configure your student credentials, avatar style, enrolled coursework, and target exam deadlines.
                  </p>
                </div>

                {/* Avatar Customization */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3.5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${profileData.avatarColor || 'from-indigo-600 via-purple-600 to-violet-500'} text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0`}
                    >
                      {(() => {
                        const iconId = profileData.avatarIcon || 'initials';
                        const activeIconObj = AVATAR_ICONS.find((i) => i.id === iconId);
                        if (activeIconObj && activeIconObj.icon) {
                          const IconComp = activeIconObj.icon;
                          return <IconComp className="w-7 h-7" />;
                        }
                        return profileData.name.slice(0, 2).toUpperCase();
                      })()}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                        Avatar Appearance & Symbol
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Pick a color palette and student badge for your profile.
                      </div>
                    </div>
                  </div>

                  {/* Gradient Themes */}
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {AVATAR_GRADIENTS.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setProfileData({ ...profileData, avatarColor: g.class })}
                        className={`w-7 h-7 rounded-full bg-gradient-to-tr ${g.class} transition-transform ${
                          profileData.avatarColor === g.class ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : 'hover:scale-105'
                        }`}
                        title={g.name}
                      />
                    ))}
                  </div>

                  {/* Icon Symbols */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {AVATAR_ICONS.map((iconOpt) => (
                      <button
                        key={iconOpt.id}
                        type="button"
                        onClick={() => setProfileData({ ...profileData, avatarIcon: iconOpt.id })}
                        className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                          (profileData.avatarIcon || 'initials') === iconOpt.id
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

                {/* Name & Academic Tagline */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] block mb-1">
                      Student Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-xs font-medium text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] block mb-1">
                      Study Motto / Academic Tagline
                    </label>
                    <textarea
                      rows={2}
                      value={profileData.bio || ''}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="e.g. Master algorithms through disciplined spaced repetition. Targeting Dean's Honor Roll."
                      className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                    />
                  </div>
                </div>

                {/* University & Degree Details */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3.5">
                  <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Academic Standing & Program</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                        University / Institution
                      </label>
                      <input
                        type="text"
                        value={profileData.institution || ''}
                        onChange={(e) => setProfileData({ ...profileData, institution: e.target.value })}
                        placeholder="e.g. Stanford / MIT / IIT"
                        className="w-full p-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                        Degree / Major Program
                      </label>
                      <input
                        type="text"
                        value={profileData.degree || ''}
                        onChange={(e) => setProfileData({ ...profileData, degree: e.target.value })}
                        placeholder="e.g. B.Tech Computer Science"
                        className="w-full p-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                        Academic Level
                      </label>
                      <select
                        value={profileData.academicLevel || 'undergraduate'}
                        onChange={(e) =>
                          setProfileData({ ...profileData, academicLevel: e.target.value as AcademicLevel })
                        }
                        className="w-full p-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                      >
                        <option value="minor_school">🎒 Minor / Middle School (Grades 1-8)</option>
                        <option value="high_school">🏫 High School (Grades 9-12)</option>
                        <option value="undergraduate">🎓 Undergraduate (College / Bachelors)</option>
                        <option value="postgraduate">🏛️ Postgraduate (Masters / PhD)</option>
                        <option value="competitive_exam">🎯 Competitive Exam (JEE/NEET/SAT/UPSC)</option>
                        <option value="professional_learner">💼 Professional / Lifelong Learner</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                        Semester / Year
                      </label>
                      <input
                        type="text"
                        value={profileData.semester || ''}
                        onChange={(e) => setProfileData({ ...profileData, semester: e.target.value })}
                        placeholder="e.g. Semester 5"
                        className="w-full p-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#4B5563] dark:text-[#A8A8B3] block mb-1">
                        Target GPA / Goal
                      </label>
                      <input
                        type="text"
                        value={profileData.targetGpa || ''}
                        onChange={(e) => setProfileData({ ...profileData, targetGpa: e.target.value })}
                        placeholder="e.g. 9.2 / 10 or 3.8 / 4.0"
                        className="w-full p-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Quick Preset Auto-Fill */}
                  <div className="pt-2.5 border-t border-[#E2E4E9] dark:border-white/[0.08] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider font-mono">
                        Quick Preset (1-Click Auto-Fill Program & Subjects)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {ACADEMIC_TRACK_PRESETS.map((preset) => {
                        const isSelected =
                          profileData.academicLevel === preset.tier && profileData.degree === preset.degreeLabel;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              setProfileData({
                                ...profileData,
                                academicLevel: preset.tier,
                                degree: preset.degreeLabel,
                                institution: preset.institutionExample,
                                bio: preset.motto,
                                subjectsEnrolled: preset.subjects,
                                weakTopics: preset.sampleTopics.weak,
                                strongTopics: preset.sampleTopics.strong
                              });
                            }}
                            className={`p-2 rounded-xl text-left border transition-all text-xs flex items-center gap-2 cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-semibold shadow-2xs'
                                : 'bg-white dark:bg-[#19191F] border-stone-200 dark:border-white/[0.08] text-stone-700 dark:text-stone-300 hover:border-indigo-300 dark:hover:border-indigo-500/40'
                            }`}
                          >
                            <span className="text-base shrink-0">{preset.icon}</span>
                            <div className="truncate min-w-0">
                              <div className="truncate font-semibold text-xs">{preset.name}</div>
                              <div className="text-[10px] text-stone-400 truncate">{preset.degreeLabel}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Enrolled Coursework */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      Enrolled Subjects & Modules
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {(profileData.subjectsEnrolled || []).length} active
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(profileData.subjectsEnrolled || []).map((subj) => (
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

                {/* Upcoming Exams */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        Upcoming Exams & Deadlines
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Milestones powering study plan prioritization and countdowns.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddExam(!showAddExam)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-500/20 text-xs font-semibold flex items-center gap-1 hover:bg-indigo-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> {showAddExam ? 'Cancel' : 'Add Exam'}
                    </button>
                  </div>

                  {showAddExam && (
                    <div className="p-3 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/30 space-y-2.5 animate-in fade-in duration-150">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={newExamSubject}
                          onChange={(e) => setNewExamSubject(e.target.value)}
                          placeholder="Subject Name..."
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

                  <div className="space-y-2">
                    {(profileData.upcomingExams || profileData.targetExams || []).length === 0 ? (
                      <div className="p-4 rounded-xl border border-dashed border-stone-200 dark:border-white/[0.08] text-center text-xs text-stone-500">
                        No upcoming exams registered. Click "Add Exam" to track exam dates.
                      </div>
                    ) : (
                      (profileData.upcomingExams || profileData.targetExams || []).map((exam) => (
                        <div
                          key={exam.id}
                          className="p-2.5 rounded-xl bg-white dark:bg-[#19191F] border border-stone-200 dark:border-white/[0.08] flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold">
                              {exam.daysLeft}d
                            </span>
                            <div>
                              <div className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7]">
                                {exam.subject}
                              </div>
                              <div className="text-[10px] text-stone-500 font-mono">
                                {exam.date} • Target: {exam.targetScore || 90}%
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveExam(exam.id)}
                            className="p-1 rounded-lg text-stone-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Focus Areas & Strengths */}
                <div className="grid grid-cols-1 gap-3.5">
                  {/* Weak Topics */}
                  <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                        <span>Focus Areas Needing Practice</span>
                      </div>
                      <span className="text-[10px] text-rose-700 dark:text-rose-300 font-mono font-medium">
                        {(profileData.weakTopics || []).length} focus areas
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(profileData.weakTopics || []).map((topic) => (
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
                        placeholder="Add weak topic (e.g. Dynamic Programming)..."
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
                        {(profileData.strongTopics || []).length} mastered
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(profileData.strongTopics || []).map((topic) => (
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
                        placeholder="Add strength (e.g. Graph Traversal)..."
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
              </div>
            )}

            {/* TAB 1: ACADEMIC & GOALS */}
            {activeTab === 'academic' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111827] dark:text-[#F5F5F7]">
                    Study Goals & Academic Standards
                  </h3>
                  <p className="text-xs text-[#8E95A5] dark:text-[#70707B]">
                    Calibrate your target study duration, grading benchmarks, and repetition pacing.
                  </p>
                </div>

                {/* Daily Study Goal */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Daily Study Target</span>
                    </label>
                    <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md">
                      {formData.dailyStudyGoalMinutes} minutes / day
                    </span>
                  </div>

                  <input
                    type="range"
                    min={15}
                    max={240}
                    step={15}
                    value={formData.dailyStudyGoalMinutes}
                    onChange={(e) =>
                      setFormData({ ...formData, dailyStudyGoalMinutes: Number(e.target.value) })
                    }
                    className="w-full accent-indigo-600 cursor-pointer"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[30, 45, 60, 90, 120, 180].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setFormData({ ...formData, dailyStudyGoalMinutes: mins })}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border font-mono transition-all ${
                          formData.dailyStudyGoalMinutes === mins
                            ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                            : 'bg-white dark:bg-[#1C1C24] text-stone-600 dark:text-stone-300 border-stone-200 dark:border-white/[0.08] hover:border-indigo-300'
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weekly Goal & Grading Scale */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-2">
                    <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Weekly Goal (Hours)</span>
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={formData.weeklyStudyGoalHours}
                      onChange={(e) =>
                        setFormData({ ...formData, weeklyStudyGoalHours: Number(e.target.value) })
                      }
                      className="w-full p-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-xs font-medium text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                    />
                    <p className="text-[10px] text-stone-500">Suggested: 10 to 20 hrs/week</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-2">
                    <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7]">
                      Grading Benchmark
                    </label>
                    <select
                      value={formData.gradingScale}
                      onChange={(e) =>
                        setFormData({ ...formData, gradingScale: e.target.value as GradingScale })
                      }
                      className="w-full p-2 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-xs font-medium text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                    >
                      <option value="percentage">Percentage (0 - 100%)</option>
                      <option value="gpa10">10.0 CGPA Scale</option>
                      <option value="gpa4">4.0 GPA Scale</option>
                    </select>
                    <p className="text-[10px] text-stone-500">Formats exam analytics & diagnostics</p>
                  </div>
                </div>

                {/* Spaced Repetition Pacing */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-2.5">
                  <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] flex items-center justify-between">
                    <span>Spaced Repetition Algorithm</span>
                    <span className="text-[10px] uppercase font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                      {formData.spacedRepetitionSpeed}
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'relaxed', label: 'Relaxed (3-7d)', desc: 'Long retention periods' },
                      { id: 'standard', label: 'Standard (1-4d)', desc: 'Balanced Leitner intervals' },
                      { id: 'cram', label: 'Exam Cram (12h-1d)', desc: 'Rapid high-frequency drills' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, spacedRepetitionSpeed: mode.id as SpacedRepetitionSpeed })
                        }
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          formData.spacedRepetitionSpeed === mode.id
                            ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-semibold ring-1 ring-indigo-500/30'
                            : 'bg-white dark:bg-[#19191F] border-stone-200 dark:border-white/[0.08] text-stone-600 dark:text-stone-300 hover:border-indigo-200'
                        }`}
                      >
                        <div className="text-xs font-medium">{mode.label}</div>
                        <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">{mode.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: AI TUTOR & INTELLIGENCE */}
            {activeTab === 'ai' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111827] dark:text-[#F5F5F7]">
                    AI Tutor & Intelligence Tuning
                  </h3>
                  <p className="text-xs text-[#8E95A5] dark:text-[#70707B]">
                    Choose how Cognora explains complex theories, sets quiz questions, and formulates study advice.
                  </p>
                </div>

                {/* Default Explanation Style */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7]">
                    Default Explanation Mode
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {explanationStyles.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, defaultAnswerMode: style.id })}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                          formData.defaultAnswerMode === style.id
                            ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500/30'
                            : 'bg-stone-50/60 dark:bg-[#16161C] border-[#E2E4E9] dark:border-white/[0.08] hover:border-indigo-200'
                        }`}
                      >
                        <span className="text-xl shrink-0">{style.icon}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                            {style.title}
                          </div>
                          <div className="text-[11px] text-[#8E95A5] dark:text-[#70707B] line-clamp-2">
                            {style.desc}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Tutor Persona */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7]">
                    AI Study Buddy Persona
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {personas.map((persona) => (
                      <button
                        key={persona.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, aiTutorPersona: persona.id })}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          formData.aiTutorPersona === persona.id
                            ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                            : 'bg-stone-50 dark:bg-[#16161C] border-[#E2E4E9] dark:border-white/[0.08] text-[#111827] dark:text-[#F5F5F7] hover:border-indigo-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{persona.title}</div>
                        <div className={`text-[10px] mt-0.5 ${formData.aiTutorPersona === persona.id ? 'text-indigo-100' : 'text-stone-500 dark:text-stone-400'}`}>
                          {persona.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom AI Prompt Instructions */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] flex items-center justify-between">
                    <span>Custom Tutor Directives</span>
                    <span className="text-[10px] text-[#8E95A5] dark:text-[#70707B]">Appended to AI system prompts</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.customAiDirectives}
                    onChange={(e) => setFormData({ ...formData, customAiDirectives: e.target.value })}
                    placeholder="e.g. Always provide ASCII diagrams when explaining tree structures, and highlight common exam pitfalls."
                    className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-stone-50 dark:bg-[#16161C] text-xs text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                  />
                </div>

                {/* Gemini AI Model Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] flex items-center justify-between">
                    <span>Gemini AI Foundation Model</span>
                    <span className="text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono">Select backend model</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'gemini-2.5-flash',
                        name: 'Gemini 2.5 Flash',
                        badge: 'Recommended',
                        desc: 'Optimal speed, high yield reasoning & instant latency',
                      },
                      {
                        id: 'gemini-3.8-flash',
                        name: 'Gemini 3.8 Flash',
                        badge: 'High Speed',
                        desc: 'Fastest token streaming for live study and quizzes',
                      },
                      {
                        id: 'gemini-2.5-pro',
                        name: 'Gemini 2.5 Pro',
                        badge: 'Deep Reasoner',
                        desc: 'Multi-step proofs, complex code, and exam analysis',
                      },
                    ].map((m) => {
                      const isSelected = formData.aiModel === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, aiModel: m.id as any })}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 ring-1 ring-indigo-500/30'
                              : 'bg-stone-50/60 dark:bg-[#16161C] border-[#E2E4E9] dark:border-white/[0.08] hover:border-indigo-200'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                                {m.name}
                              </span>
                              <span className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-sm ${
                                isSelected ? 'bg-indigo-600 text-white' : 'bg-stone-200 dark:bg-white/[0.08] text-stone-600 dark:text-stone-300'
                              }`}>
                                {m.badge}
                              </span>
                            </div>
                            <p className="text-[10px] text-[#8E95A5] dark:text-[#70707B] leading-tight">
                              {m.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Gemini API Key Configuration & Live Connection Test */}
                <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Google Gemini API Key</span>
                    </label>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                      {formData.geminiApiKey ? 'Custom Key Active' : 'Environment Key Active'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
                    Provide your own Google AI Studio key, or use the pre-configured server environment.
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 flex items-center">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={formData.geminiApiKey || ''}
                        onChange={(e) => {
                          setFormData({ ...formData, geminiApiKey: e.target.value });
                          setTestResult(null);
                        }}
                        placeholder="AIzaSy... (leave blank to use server environment key)"
                        className="w-full pl-3 pr-10 py-2 rounded-xl border border-indigo-200 dark:border-indigo-500/30 bg-white dark:bg-[#16161C] text-xs font-mono text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-2.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
                        title={showApiKey ? 'Hide API key' : 'Show API key'}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleTestApiKey}
                      disabled={isTestingKey}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      {isTestingKey ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Testing...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Test Connection</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Test Result Feedback Banner */}
                  {testResult && (
                    <div
                      className={`p-2.5 rounded-xl text-xs flex items-start gap-2 animate-in fade-in duration-150 ${
                        testResult.success
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {testResult.success ? (
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 font-medium">{testResult.message}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: NOTIFICATIONS & HABITS */}
            {activeTab === 'notifications' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111827] dark:text-[#F5F5F7]">
                    Alerts, Reminders & Audio
                  </h3>
                  <p className="text-xs text-[#8E95A5] dark:text-[#70707B]">
                    Manage study reminders, exam alerts, and interactive audio feedback.
                  </p>
                </div>

                {/* Toggles List */}
                <div className="space-y-3">
                  {/* Daily Study Reminder */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7]">
                        Daily Study Habit Reminder
                      </div>
                      <div className="text-[11px] text-[#8E95A5] dark:text-[#70707B]">
                        Sends prompt to begin daily target session
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {formData.dailyReminderEnabled && (
                        <input
                          type="time"
                          value={formData.dailyReminderTime}
                          onChange={(e) =>
                            setFormData({ ...formData, dailyReminderTime: e.target.value })
                          }
                          className="px-2 py-1 text-xs rounded-lg border border-stone-200 dark:border-white/[0.08] bg-white dark:bg-[#19191F] text-stone-800 dark:text-stone-200 font-mono"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            dailyReminderEnabled: !formData.dailyReminderEnabled
                          })
                        }
                        className={`w-11 h-6 rounded-full transition-colors relative ${
                          formData.dailyReminderEnabled ? 'bg-indigo-600' : 'bg-stone-300 dark:bg-stone-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                            formData.dailyReminderEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Exam Countdown Alerts */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7]">
                        Exam Countdown & Urgency Alerts
                      </div>
                      <div className="text-[11px] text-[#8E95A5] dark:text-[#70707B]">
                        Notifies 14d, 7d, and 48h prior to registered test dates
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          examAlertsEnabled: !formData.examAlertsEnabled
                        })
                      }
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        formData.examAlertsEnabled ? 'bg-indigo-600' : 'bg-stone-300 dark:bg-stone-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                          formData.examAlertsEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Streak Saver Alert */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between">
                    <div className="space-y-0.5 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <div>
                        <div className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7]">
                          Streak Saver Notification
                        </div>
                        <div className="text-[11px] text-[#8E95A5] dark:text-[#70707B]">
                          Alerts before midnight if daily study minutes are incomplete
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          streakSaverEnabled: !formData.streakSaverEnabled
                        })
                      }
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        formData.streakSaverEnabled ? 'bg-amber-500' : 'bg-stone-300 dark:bg-stone-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                          formData.streakSaverEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Sound Effects & Confetti */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between">
                      <div className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Sound Effects</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            soundEffectsEnabled: !formData.soundEffectsEnabled
                          })
                        }
                        className={`w-9 h-5 rounded-full transition-colors relative ${
                          formData.soundEffectsEnabled ? 'bg-indigo-600' : 'bg-stone-300 dark:bg-stone-700'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.75 ${
                            formData.soundEffectsEnabled ? 'translate-x-4.5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between">
                      <div className="text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                        <span>Victory Confetti</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            confettiEnabled: !formData.confettiEnabled
                          })
                        }
                        className={`w-9 h-5 rounded-full transition-colors relative ${
                          formData.confettiEnabled ? 'bg-indigo-600' : 'bg-stone-300 dark:bg-stone-700'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.75 ${
                            formData.confettiEnabled ? 'translate-x-4.5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: DATA, BACKUP & PRIVACY */}
            {activeTab === 'data' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111827] dark:text-[#F5F5F7]">
                    Data Management & Privacy
                  </h3>
                  <p className="text-xs text-[#8E95A5] dark:text-[#70707B]">
                    Export your full study workspace, restore backups, or reset performance data.
                  </p>
                </div>

                {/* Local Storage Meter */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#111827] dark:text-[#F5F5F7] flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Browser Storage Used</span>
                    </span>
                    <span className="font-mono text-stone-500 dark:text-stone-400">
                      {storageInfo.usedFormatted} (~{storageInfo.percentEstimated}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-white/[0.08] overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all"
                      style={{ width: `${Math.max(4, storageInfo.percentEstimated)}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-500">
                    All study notes, flashcards, quizzes, and session history remain securely stored on your local browser.
                  </p>
                </div>

                {/* Export & Import Backup */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={onExportData}
                    className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-500/20 text-left hover:border-indigo-400 transition-all flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0 group-hover:scale-105 transition-transform">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                        Export JSON Backup
                      </div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                        Download complete archive of materials, notes, exams & settings
                      </div>
                    </div>
                  </button>

                  <label className="p-4 rounded-2xl bg-stone-50 dark:bg-[#16161C] border border-[#E2E4E9] dark:border-white/[0.08] text-left hover:border-stone-400 transition-all flex items-start gap-3 cursor-pointer group">
                    <div className="p-2 rounded-xl bg-stone-700 dark:bg-stone-600 text-white shrink-0 group-hover:scale-105 transition-transform">
                      <Upload className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#111827] dark:text-[#F5F5F7]">
                        Restore Backup File
                      </div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                        Upload previously exported JSON backup
                      </div>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleFileImport}
                        className="hidden"
                      />
                    </div>
                  </label>
                </div>

                {importStatus && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{importStatus}</span>
                  </div>
                )}

                {/* Reset Operations */}
                <div className="pt-2 border-t border-[#E2E4E9] dark:border-white/[0.08] space-y-2">
                  <div className="text-xs font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Danger Zone</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {onResetProgress && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Reset all mock exam scores and flashcard mastery back to fresh state?')) {
                            onResetProgress();
                            setStorageInfo(calculateStorageUsage());
                          }
                        }}
                        className="px-3 py-2 rounded-xl border border-stone-200 dark:border-white/[0.08] hover:border-rose-300 dark:hover:border-rose-500/30 text-stone-600 dark:text-stone-300 hover:text-rose-600 text-[11px] font-medium transition-colors text-left"
                      >
                        Reset Quiz & Card Progress
                      </button>
                    )}

                    {onResetDefaults && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Restore all default sample study materials and initial curriculum?')) {
                            onResetDefaults();
                            setStorageInfo(calculateStorageUsage());
                          }
                        }}
                        className="px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-500/20 bg-rose-50/40 dark:bg-rose-950/20 text-rose-600 dark:text-rose-300 text-[11px] font-medium hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors text-left"
                      >
                        Restore Factory Defaults
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between shrink-0 bg-stone-50/50 dark:bg-[#16161C]/50">
          <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono hidden sm:inline">
            Cognora Settings v2.0
          </span>

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
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
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
