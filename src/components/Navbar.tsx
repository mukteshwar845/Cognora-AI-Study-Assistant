import React from 'react';
import {
  Flame,
  Bell,
  Maximize2,
  ChevronRight
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
  onOpenUpload: () => void;
  onToggleLanding: () => void;
  onEnterFocusMode?: () => void;
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
  onOpenUpload,
  onToggleLanding,
  onEnterFocusMode,
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
    <header className="h-14 border-b border-[#E2E4E9] dark:border-white/[0.08] bg-white/85 dark:bg-[#131318]/85 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between transition-colors duration-200">
      {/* Left: Brand / Tab Title & Breadcrumb */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="lg:hidden shrink-0">
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
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Streak Pill */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 text-xs font-semibold font-mono"
          title={`${user.streakDays} Day Study Streak`}
        >
          <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
          <span>{user.streakDays}d</span>
          <span className="hidden md:inline">Streak</span>
        </div>

        {/* Focus Mode Shortcut */}
        {onEnterFocusMode && (
          <button
            onClick={onEnterFocusMode}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#4F46E5] dark:hover:text-[#818CF8] hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.08] transition-colors"
            title="Enter Distraction-Free Focus Mode"
          >
            <Maximize2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Focus Mode</span>
          </button>
        )}

        {/* Theme Switcher Component */}
        {onSelectThemePreference ? (
          <ThemeSwitcher
            preference={themePreference}
            resolvedTheme={resolvedTheme}
            onSelectPreference={onSelectThemePreference}
            variant="dropdown"
          />
        ) : (
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg text-[#4B5563] hover:text-[#111827] dark:text-[#A8A8B3] dark:hover:text-white hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] transition-colors"
            title={darkMode ? 'Switch to Light' : 'Switch to Dark'}
            aria-label="Toggle Theme"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
        )}

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

        {/* User Profile Avatar */}
        <button
          onClick={onOpenProfile}
          className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-xs shadow-2xs hover:ring-2 hover:ring-indigo-500/30 transition-all shrink-0"
          title={`Profile: ${user.name}`}
          aria-label="Open Profile"
        >
          {user.name.slice(0, 2).toUpperCase()}
        </button>
      </div>
    </header>
  );
};
