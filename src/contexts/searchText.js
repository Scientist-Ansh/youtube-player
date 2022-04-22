import { useState, createContext, useContext } from 'react';

const UserContext = createContext();

export const useSearchTextContext = () => useContext(UserContext);

export function SearchTextProvider({ children }) {
  return (
    <UserContext.Provider value={useSearchText()}>
      {children}
    </UserContext.Provider>
  );
}

export function useSearchText() {
  const [searchText, setSearchText] = useState('react');
  return { searchText, setSearchText };
}
