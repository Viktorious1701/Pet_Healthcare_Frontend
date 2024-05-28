// SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder || 'Search...'}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-2 rounded border border-gray-300"
    />
  );
};

export default SearchBar;
