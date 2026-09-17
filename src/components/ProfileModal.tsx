import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  X,
  Flame,
  Check
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ThemePreference, ResolvedTheme } from '../lib/theme';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSaveUser: (updated: UserProfile) => void;
  themePreference?: ThemePreference;
  resolvedTheme?: ResolvedTheme;
  onSelectThemePreference?: (pref: ThemePreference) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSaveUser,
  themePreference = 'system',
  resolvedTheme = 'light',
  onSelectThemePreference
}) => {
  const [name, setName] = useState(user.name);
  const [degree, setDegree] = useState(user.degree);
  const [semester, setSemester] = useState(user.semester);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveUser({
      ...user,
      name,
      degree,
      semester
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#131318] border border-[#E2E4E9] dark:border-white/[0.08] rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-[#111827] dark:text-[#F5F5F7]">
                Student Profile & Preferences
              </h2>
              <p className="text-xs text-[#4B5563] dark:text-[#A8A8B3]">{user.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-[#F1F3F8] dark:hover:bg-[#19191F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form & Stats */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Appearance Mode Selection */}
          {onSelectThemePreference && (
            <div className="space-y-1.5 pb-2">
              <label className="font-semibold text-[#111827] dark:text-[#F5F5F7] flex items-center justify-between">
                <span>Theme Mode</span>
                <span className="text-[11px] text-[#8E95A5] dark:text-[#70707B] font-mono">
                  {resolvedTheme === 'dark' ? 'Night Theme active' : 'Day Theme active'}
                </span>
              </label>
              <ThemeSwitcher
                preference={themePreference}
                resolvedTheme={resolvedTheme}
                onSelectPreference={onSelectThemePreference}
                variant="segmented"
              />
            </div>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F7F8FC] dark:bg-[#19191F] border border-[#E2E4E9] dark:border-white/[0.08] text-center">
            <div>
              <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B]">Streak</div>
              <div className="font-bold text-amber-500 text-sm flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" /> {user.streakDays}d
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B]">Avg Score</div>
              <div className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                {user.averageQuizScore}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#8E95A5] dark:text-[#70707B]">Weekly Time</div>
              <div className="font-bold text-[#111827] dark:text-[#F5F5F7] text-sm">
                {user.weeklyHoursSpent}h
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
              Program / Major
            </label>
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#4B5563] dark:text-[#A8A8B3]">
              Current Semester
            </label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#E2E4E9] dark:border-white/[0.08] bg-[#F7F8FC] dark:bg-[#19191F] text-[#111827] dark:text-[#F5F5F7] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden transition-all"
            />
          </div>

          <div className="pt-3 border-t border-[#E2E4E9] dark:border-white/[0.08] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[#4B5563] dark:text-[#A8A8B3] hover:text-[#111827] dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <Check className="w-4 h-4" /> Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
