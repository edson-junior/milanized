'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return;
  }

  if (resolvedTheme === 'dark') {
    return <button onClick={() => setTheme('light')}>Light</button>;
  }

  if (resolvedTheme === 'light') {
    return <button onClick={() => setTheme('dark')}>Dark</button>;
  }
}
