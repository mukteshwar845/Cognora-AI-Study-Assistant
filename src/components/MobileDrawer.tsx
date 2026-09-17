import React from 'react';
import {
  X,
  LayoutDashboard,
  BookOpen,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Calendar,
  TrendingUp,
  Users,
  Settings,
  Plus,
  Flame,
  Sun,
  Moon,
  ChevronRight,
  Compass
} from 'lucide-react';
import { UserProfile } from '../types';
import { CognoraLogo } from './CognoraLogo';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  onSelectTab: (tabId: string) => void;
  onOpenUpload: () => void;
  onOpenProfile: () => void;
  onToggleLanding?: () => void;
  user: UserProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  onOpenUpload,
  onOpenProfile,
  onToggleLanding,
  user,
  darkMode,
  onToggleDarkMode
}) => {
  if (!isOpen) return null;

  const sections = [
    {
      title: 'Study & Notes',
      items: [
        { id: 'landing', label: 'Landing Page & Tour', icon: Compass, desc: 'Overview, feature demos & intro' },
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Overview & daily goals' },
        { id: 'workspace', label: 'Study Workspace', icon: BookOpen, desc: 'Summary, notes & formulas' },
        { id: 'library', label: 'My Library', icon: Layers, desc: 'All uploaded materials' },
        { id: 'ask_ai', label: 'AI Study Tutor', icon: Sparkles, badge: 'Smart', desc: 'Context doubt solver' }
      ]
    },
    {
      title: 'Practice & Test',
      items: [
        { id: 'quizzes', label: 'Interactive Quizzes', icon: CheckCircle2, desc: 'Practice by topic' },
        { id: 'flashcards', label: 'Active Flashcards', icon: Layers, desc: 'Spaced repetition cards' },
        { id: 'exams', label: 'Exam Mode', icon: Clock, badge: 'Timed', desc: 'Mock test simulation' }
      ]
    },
    {
      title: 'Planning & Stats',
      items: [
        { id: 'planner', label: 'Study Planner', icon: Calendar, desc: 'Daily study timetable' },
        { id: 'analytics', label: 'Progress Analytics', icon: TrendingUp, desc: 'Readiness & accuracy' }
      ]
    },
    {
      title: 'Community',
      items: [
        { id: 'community', label: 'Study Groups', icon: Users, desc: 'Peer discussions & notes' }
      ]
    }
  ];

  const handleItemClick = (id: string) => {
    if (id === 'landing') {
      onClose();
      onToggleLanding?.();
      return;
    }
    onSelectTab(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Sheet Content */}
      <div className="relative z-10 w-full max-h-[90vh] bg-white dark:bg-[#131318] border-t border-[#E2E4E9] dark:border-white/[0.1] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden pb-safe animate-in slide-in-from-bottom-5 duration-250">
        {/* Mobile Drag Handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-white/20" />
        </div>

        {/* Drawer Header */}
        <div className="px-5 py-3 border-b border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onClick={() => {
                onOpenProfile();
                onClose();
              }}
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-sm shadow-xs cursor-pointer"
            >
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-[#111827] dark:text-[#F5F5F7] flex items-center gap-2">
                <span>{user.name}</span>
                <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono font-semibold">
                  <Flame className="w-3 h-3 fill-current" /> {user.streakDays}d
                </span>
              </div>
              <p className="text-[11px] text-[#8E95A5] dark:text-[#70707B]">
                {user.degree || 'Computer Science'} &bull; {user.semester || 'Semester 5'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#8E95A5] hover:text-[#111827] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/[0.06] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions Row */}
        <div className="px-5 py-3 grid grid-cols-2 gap-2.5 bg-[#F7F8FC] dark:bg-[#19191F]/60 border-b border-[#E2E4E9] dark:border-white/[0.06]">
          <button
            onClick={() => {
              onOpenUpload();
              onClose();
            }}
            className="py-2.5 px-3 rounded-xl bg-indigo-600 active:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs active-press"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Material</span>
          </button>

          <button
            onClick={onToggleDarkMode}
            className="py-2.5 px-3 rounded-xl bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] text-xs font-semibold text-[#111827] dark:text-[#F5F5F7] flex items-center justify-center gap-2 active-press"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
          </button>
        </div>

        {/* Categorized Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 touch-scroll">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#8E95A5] dark:text-[#70707B] font-mono">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full min-h-[48px] px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition-all active-press ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold'
                          : 'text-[#111827] dark:text-[#F5F5F7] hover:bg-stone-100 dark:hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-indigo-600 text-white'
                              : 'bg-[#F1F3F8] dark:bg-white/[0.06] text-[#4B5563] dark:text-[#A8A8B3]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold leading-tight">{item.label}</div>
                          <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B] leading-tight">
                            {item.desc}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-mono">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-[#8E95A5] dark:text-[#70707B]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Bottom Bar: Profile & Settings */}
        <div className="px-5 py-3 border-t border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC]/80 dark:bg-[#131318]/90 flex items-center justify-between">
          <button
            onClick={() => {
              onOpenProfile();
              onClose();
            }}
            className="flex items-center gap-2 text-xs font-semibold text-[#4B5563] hover:text-[#111827] dark:text-[#A8A8B3] dark:hover:text-white py-1.5 px-2 rounded-xl active-press"
          >
            <Settings className="w-4 h-4 text-indigo-500" />
            <span>Settings</span>
          </button>

          {onToggleLanding && (
            <button
              onClick={() => {
                onClose();
                onToggleLanding();
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 py-1.5 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-500/20 active-press"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Landing Page</span>
            </button>
          )}

          <span className="text-[10px] text-[#8E95A5] dark:text-[#70707B] font-mono hidden sm:inline">
            Cognora Mobile
          </span>
        </div>
      </div>
    </div>
  );
};
