import { LuSearch } from 'react-icons/lu';

interface SearchBarProps {
  open: boolean;
  onToggle: () => void;
}

export default function SearchBar({ open, onToggle }: SearchBarProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? 'Close search' : 'Open search'}
      aria-expanded={open}
      aria-controls="search-input-header"
      className="text-white hover:text-white/70 transition-colors p-1 mr-2 lg:mr-4"
    >
      <LuSearch size={16} aria-hidden="true" />
    </button>
  );
}
