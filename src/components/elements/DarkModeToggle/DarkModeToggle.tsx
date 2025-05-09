'use client';
import { GoSun, GoMoon } from 'react-icons/go';
import { useStore } from '@/store/useStore';
import { useEffect } from 'react';

export function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useStore();

  useEffect(() => {
    if (isDarkMode || localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    if (!isDarkMode || localStorage.getItem('theme') === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      className="w-9 h-9 p-1 flex justify-center items-center rounded-full hover:bg-slate-200/80 dark:hover:bg-slate-100/20 dark:text-slate-100"
      aria-label="Toggle Dark Mode"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <GoMoon size={20} /> : <GoSun size={20} />}
    </button>
  );
}
