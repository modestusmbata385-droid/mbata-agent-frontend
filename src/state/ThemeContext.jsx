import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'mbata_theme'; // 'light' | 'dark' | 'system'

export function ThemeProvider({ children }) {
  const [preference, setPreference] = useState(() => localStorage.getItem(STORAGE_KEY) || 'system');

  const resolved = preference === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : preference;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolved);
  }, [resolved]);

  const setTheme = useCallback((value) => {
    localStorage.setItem(STORAGE_KEY, value);
    setPreference(value);
  }, []);

  return (
    <ThemeContext.Provider value={{ preference, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
