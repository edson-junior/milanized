'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return;
  }

  const toggleTheme = (theme = '') => {
    return function () {
      setTheme(theme);
    };
  };

  if (resolvedTheme === 'dark') {
    return (
      <button onClick={toggleTheme('light')} aria-label="switch to light theme">
        <Sun className="text-yellow-400" />
      </button>
    );
  }

  if (resolvedTheme === 'light') {
    return (
      <button onClick={toggleTheme('dark')} aria-label="switch to dark theme">
        <Moon className="text-gray-400" />
      </button>
    );
  }
}
