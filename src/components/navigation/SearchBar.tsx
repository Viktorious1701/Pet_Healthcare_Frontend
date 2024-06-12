// SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  className?: string; // Added className prop
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, placeholder, className }) => {
  return (
    <input
      type="text"
      placeholder={placeholder || 'Search...'}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={`p-2 rounded border border-gray-300 ${className}`} // Applied the className prop
    />
  );
};

export default SearchBar;