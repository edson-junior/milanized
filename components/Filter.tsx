'use client';

import { cn } from '@/lib/utils';
import css from './FilterList.module.css';
import { usePageState } from '@/hooks/usePagination';
import { useCategory } from './store';

export default function Filter({
  label,
  value = 'All'
}: {
  label: string;
  value?: 'All' | string;
}) {
  const { category, setCategory } = useCategory();
  const { setPage } = usePageState();

  return (
    <button
      className={cn(
        css.filter,
        '!py-1',
        category === value
          ? 'action *:text-white/50'
          : 'ghost border border-transparent'
      )}
      onClick={() => {
        setCategory(value);
        setPage(1);
      }}
    >
      {label || value}
    </button>
  );
}
