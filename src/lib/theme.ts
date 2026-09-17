import { useState, useEffect } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'cognora_theme_preference';
const LEGACY_KEY = 'study_theme';

/**
 * Gets initial theme preference from localStorage or defaults to 'system'
 */
export function getInitialThemePreference(): ThemePreference {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark' || saved === 'system') {
    return saved;
  }
  // Check legacy key
  const legacy = localStorage.getItem(LEGACY_KEY);
  if (legacy === 'dark' || legacy === 'light') {
    return legacy;
  }
  return 'system';
}

/**
 * Resolves 'system' preference to either 'light' or 'dark' based on media query
 */
export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  if (preference === 'light') return 'light';
  if (preference === 'dark') return 'dark';
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

/**
 * Applies the resolved theme to HTML root element and updates DOM attributes
 */
export function applyThemeToDOM(resolved: ResolvedTheme, preference: ThemePreference) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  
  // Set data-theme attribute
  root.setAttribute('data-theme', resolved);
  root.setAttribute('data-theme-preference', preference);

  // Toggle .dark class for Tailwind and legacy CSS selectors
  if (resolved === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Update meta theme-color for mobile address bar
  let metaTheme = document.querySelector('meta[name="theme-color"]');
  if (!metaTheme) {
    metaTheme = document.createElement('meta');
    metaTheme.setAttribute('name', 'theme-color');
    document.head.appendChild(metaTheme);
  }
  metaTheme.setAttribute('content', resolved === 'dark' ? '#0B0B0F' : '#F7F8FC');

  // Persist preference
  try {
    localStorage.setItem(STORAGE_KEY, preference);
    localStorage.setItem(LEGACY_KEY, resolved);
  } catch {
    // localStorage might be unavailable in restricted iframes
  }
}

/**
 * Hook for consuming and modifying theme throughout the application
 */
export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(getInitialThemePreference);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(preference));

  useEffect(() => {
    const resolved = resolveTheme(preference);
    setResolvedTheme(resolved);
    applyThemeToDOM(resolved, preference);

    // If system preference, listen for OS dark/light mode changes
    if (preference === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => {
        const nextResolved: ResolvedTheme = e.matches ? 'dark' : 'light';
        setResolvedTheme(nextResolved);
        applyThemeToDOM(nextResolved, 'system');
      };

      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [preference]);

  return {
    preference,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    setPreference
  };
}
