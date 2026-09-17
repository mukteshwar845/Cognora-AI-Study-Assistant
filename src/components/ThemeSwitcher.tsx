import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { ThemePreference, ResolvedTheme } from '../lib/theme';

interface ThemeSwitcherProps {
  preference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  onSelectPreference: (pref: ThemePreference) => void;
  variant?: 'dropdown' | 'segmented' | 'icon-toggle';
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  preference,
  resolvedTheme,
  onSelectPreference,
  variant = 'dropdown',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Keyboard shortcut: Esc to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const options: { id: ThemePreference; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    {
      id: 'light',
      label: 'Day Mode',
      icon: Sun,
      desc: 'Focused & clean daytime study'
    },
    {
      id: 'dark',
      label: 'Night Mode',
      icon: Moon,
      desc: 'Low-glare, calm nighttime study'
    },
    {
      id: 'system',
      label: 'System Sync',
      icon: Laptop,
      desc: 'Match device appearance'
    }
  ];

  // 1. Segmented variant (Ideal for settings modal or profile)
  if (variant === 'segmented') {
    return (
      <div className={`p-1 rounded-xl bg-stone-100 dark:bg-[#19191F] border border-stone-200/80 dark:border-white/[0.08] flex items-center gap-1 ${className}`}>
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = preference === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectPreference(opt.id)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-[#202027] text-stone-900 dark:text-[#F5F5F7] shadow-xs font-semibold'
                  : 'text-stone-500 dark:text-[#70707B] hover:text-stone-900 dark:hover:text-[#A8A8B3]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{opt.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // 2. Dropdown variant (Ideal for Navbar & Header)
  const CurrentIcon = preference === 'system' ? Laptop : resolvedTheme === 'dark' ? Moon : Sun;

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-stone-600 dark:text-[#A8A8B3] hover:text-stone-900 dark:hover:text-white hover:bg-stone-100/80 dark:hover:bg-[#19191F] border border-transparent hover:border-stone-200/80 dark:hover:border-white/[0.06] transition-all flex items-center gap-1.5 text-xs font-medium"
        title={`Theme: ${preference === 'system' ? 'System (' + resolvedTheme + ')' : preference}`}
        aria-label="Select theme mode"
        aria-expanded={isOpen}
      >
        <CurrentIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400 transition-transform duration-200" />
        <span className="hidden xl:inline text-stone-700 dark:text-[#A8A8B3] capitalize">
          {preference === 'system' ? 'Auto' : preference}
        </span>
      </button>

      {/* Floating Theme Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 p-1.5 rounded-2xl bg-white dark:bg-[#131318] border border-stone-200/90 dark:border-white/[0.1] shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] z-50 animate-in fade-in zoom-in-95 duration-150"
          role="menu"
        >
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-[#70707B] font-mono border-b border-stone-100 dark:border-white/[0.06] mb-1">
            Cognora Appearance
          </div>

          <div className="space-y-0.5">
            {options.map((opt) => {
              const Icon = opt.icon;
              const isSelected = preference === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    onSelectPreference(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-xl text-left flex items-start gap-2.5 transition-all duration-150 ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-medium'
                      : 'text-stone-700 dark:text-[#A8A8B3] hover:bg-stone-100/70 dark:hover:bg-[#19191F] hover:text-stone-900 dark:hover:text-[#F5F5F7]'
                  }`}
                  role="menuitem"
                >
                  <div className={`p-1 rounded-md shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                      : 'bg-stone-100 dark:bg-[#19191F] text-stone-500 dark:text-[#70707B]'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold flex items-center justify-between">
                      <span>{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                    </div>
                    <div className="text-[10px] text-stone-400 dark:text-[#70707B] truncate">
                      {opt.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-1.5 pt-1.5 border-t border-stone-100 dark:border-white/[0.06] px-3 py-1 flex items-center justify-between text-[10px] text-stone-400 dark:text-[#70707B] font-mono">
            <span>Currently:</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 capitalize">
              {resolvedTheme} learning
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
