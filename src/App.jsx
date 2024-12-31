// src/App.js

import { useEffect, useState } from 'react';
import CardComponent from './components/CardComponent';
import Details from './components/Details';
import NavBar from './components/NavBar';
import { DictionaryProvider } from './store/ContextAPI';
// import './components/styles/styles.scss';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Initialize theme from localStorage or default to false
    const savedTheme = localStorage.getItem('darkTheme');
    if(savedTheme === "false") return false;
    return true;
  });

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    // Persist theme state in localStorage
    localStorage.setItem('darkTheme', isDarkTheme);

    // Update CSS variables based on the theme
    if (isDarkTheme) {
      document.documentElement.style.setProperty('--primary-color', '#333333');
      document.documentElement.style.setProperty('--secondary-color', '#FADA7A');
      document.documentElement.style.setProperty('--alpha-primary', '#555555');
      document.documentElement.style.setProperty('--alpha-secondary', '#222222');
    } else {
      document.documentElement.style.setProperty('--primary-color', '#81BFDA');
      document.documentElement.style.setProperty('--secondary-color', '#FADA7A');
      document.documentElement.style.setProperty('--alpha-primary', '#B1F0F7');
      document.documentElement.style.setProperty('--alpha-secondary', '#F5F0CD');
    }
  }, [isDarkTheme]);

  return (
    <DictionaryProvider>
      <NavBar theme={toggleTheme} isDarkTheme={isDarkTheme}/>
      <CardComponent />
      <Details />
    </DictionaryProvider>
  );
}

export default App;
