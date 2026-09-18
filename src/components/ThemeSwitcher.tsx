import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemePreference, ResolvedTheme } from '../lib/theme';

interface ThemeSwitcherProps {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  onSelectPreference: (pref: ThemePreference) => void;
  variant?: 'dropdown' | 'segmented' | 'icon-toggle';
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  resolvedTheme,
  onSelectPreference,
  className = ''
}) => {
  const isDark = resolvedTheme === 'dark';

  const handleToggle = () => {
    onSelectPreference(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`p-1.5 rounded-lg text-stone-600 dark:text-[#A8A8B3] hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/80 dark:hover:bg-[#19191F] border border-transparent hover:border-stone-200/80 dark:hover:border-white/[0.06] transition-all ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-500" />
      )}
    </button>
  );
};
