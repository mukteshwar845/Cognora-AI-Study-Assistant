import React from 'react';
import {
  Flame,
  Bell,
  Maximize2,
  ChevronRight,
  Menu
} from 'lucide-react';
import { UserProfile } from '../types';
import { CognoraLogo } from './CognoraLogo';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ThemePreference, ResolvedTheme } from '../lib/theme';

interface NavbarProps {
  currentTab: string;
  user: UserProfile;
  unreadCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenSettings?: () => void;
  onOpenUpload: () => void;
  onToggleLanding: () => void;
  onEnterFocusMode?: () => void;
  onOpenDrawer?: () => void;
  themePreference?: ThemePreference;
  resolvedTheme?: ResolvedTheme;
  onSelectThemePreference?: (pref: ThemePreference) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  user,
  unreadCount,
  darkMode,
  onToggleDarkMode,
  onOpenNotifications,
  onOpenProfile,
  onOpenSettings,
  onOpenUpload,
  onToggleLanding,
  onEnterFocusMode,
  onOpenDrawer,
  themePreference = darkMode ? 'dark' : 'light',
  resolvedTheme = darkMode ? 'dark' : 'light',
  onSelectThemePreference
}) => {
  const getTabLabel = (id: string) => {
    switch (id) {
      case 'dashboard':
        return 'Dashboard';
      case 'library':
        return 'My Library';
      case 'workspace':
        return 'Study Workspace';
      case 'ask_ai':
        return 'AI Tutor';
      case 'quizzes':
        return 'Quizzes';
      case 'flashcards':
        return 'Flashcards';
      case 'exams':
        return 'Exam Mode';
      case 'planner':
        return 'Study Planner';
      case 'analytics':
        return 'Progress Analytics';
      case 'community':
        return 'Study Groups';
      default:
        return 'AI Study Assistant';
    }
  };

  return (
    <header className="h-14 border-b border-[#E2E4E9] dark:border-white/[0.08] bg-white/85 dark:bg-[#131318]/85 backdrop-blur-md sticky top-0 z-30 px-3 sm:px-6 flex items-center justify-between transition-colors duration-200">
      {/* Left: Hamburger (mobile) + Brand / Tab Title & Breadcrumb */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
        {onOpenDrawer && (
          <button
            onClick={onOpenDrawer}
            className="lg:hidden p-1.5 -ml-1 rounded-xl text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white hover:bg-stone-100 dark:hover:bg-white/[0.06] active-press transition-colors"
            title="Open Menu"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div
          className="lg:hidden shrink-0 cursor-pointer active-press"
          onClick={onToggleLanding}
          title="Return to Landing Page"
        >
          <CognoraLogo
            size="sm"
            showSubtitle={false}
          />
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#4B5563] dark:text-[#A8A8B3]">
          <span
            className="hover:text-[#111827] dark:hover:text-[#F5F5F7] cursor-pointer transition-colors"
            onClick={onToggleLanding}
          >
            Home
          </span>
          <ChevronRight className="w-3 h-3 text-[#8E95A5] dark:text-[#70707B]" />
          <h1 className="font-heading font-bold text-sm text-[#111827] dark:text-[#F5F5F7] truncate">
            {getTabLabel(currentTab)}
          </h1>
        </div>
      </div>

      {/* Right: Quick actions & controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Streak Pill */}
        <div
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-xs font-semibold font-mono"
          title={`${user.streakDays} Day Study Streak`}
        >
          <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
          <span>{user.streakDays}d</span>
          <span className="hidden md:inline">Streak</span>
        </div>

        {/* Compact, Modern Focus Button */}
        {onEnterFocusMode && (
          <button
            onClick={onEnterFocusMode}
            className="group relative hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide text-indigo-600 dark:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 dark:bg-indigo-500/15 dark:hover:bg-indigo-500/25 border border-indigo-500/20 dark:border-indigo-400/25 hover:border-indigo-500/40 shadow-2xs hover:shadow-indigo-500/10 transition-all duration-200 active:scale-95"
            title="Enter Distraction-Free Focus Mode"
          >
            <Maximize2 className="w-3 h-3 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-200" />
            <span>Focus</span>
          </button>
        )}

        {/* Theme Toggle Button */}
        <div className="hidden sm:block">
          <ThemeSwitcher
            preference={themePreference}
            resolvedTheme={resolvedTheme}
            onSelectPreference={onSelectThemePreference ?? (() => onToggleDarkMode())}
          />
        </div>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="p-1.5 rounded-lg text-[#4B5563] hover:text-[#111827] dark:text-[#A8A8B3] dark:hover:text-white hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] transition-colors relative"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-[#131318]" />
          )}
        </button>

        {/* User Profile Avatar (Read-Only Profile Viewer trigger) */}
        <button
          onClick={onOpenProfile}
          className={`w-7 h-7 rounded-full bg-gradient-to-tr ${user.avatarColor || 'from-indigo-600 to-violet-500'} text-white flex items-center justify-center font-bold text-[11px] shadow-2xs hover:ring-2 hover:ring-indigo-500/40 hover:scale-105 active:scale-95 transition-all shrink-0`}
          title={`Profile: ${user.name} (View info)`}
          aria-label="View Student Profile"
        >
          {user.name.slice(0, 2).toUpperCase()}
        </button>
      </div>
    </header>
  );
};
