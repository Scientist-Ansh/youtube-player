import { useState, createContext, useContext } from 'react';

const SearchTextContext = createContext();

export const useSearchTextContext = () => useContext(SearchTextContext);

export function SearchTextProvider({ children }) {
  return (
    <SearchTextContext.Provider value={useSearchText()}>
      {children}
    </SearchTextContext.Provider>
  );
}

export function useSearchText() {
  const [searchText, setSearchText] = useState('react');
  return { searchText, setSearchText };
}
