import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem('luzdenuit-theme') as Theme;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    const initialTheme = saved || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    setIsLoading(false);
  }, []);

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    if (isLoading) return;
    
    localStorage.setItem('luzdenuit-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, isLoading]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setLightTheme = useCallback(() => {
    setTheme('light');
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme('dark');
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    isLoading,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
  };
}

