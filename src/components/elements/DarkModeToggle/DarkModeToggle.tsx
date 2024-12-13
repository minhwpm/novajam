import { useEffect, useState } from 'react';
import { GoSun, GoMoon } from 'react-icons/go';

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
      className="w-10 h-10 p-2 flex justify-center items-center rounded-full hover:bg-slate-100/80 dark:hover:bg-slate-100/20 dark:text-slate-100"
    >
      {isDarkMode ? <GoMoon /> : <GoSun />}
    </button>
  );
}
