'use client';

import { usePageState } from '@/hooks/usePagination';
import { useCategory } from './store';
import { Button } from './ui/button';

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
    <Button
      variant={category === value ? 'default' : 'outline'}
      className="border border-gray-300 font-semibold rounded-lg"
      onClick={() => {
        setCategory(value);
        setPage(1);
      }}
    >
      {label || value}
    </Button>
  );
}
