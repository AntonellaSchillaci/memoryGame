import React, { useEffect, useState } from 'react';

import './DarkModeToggle.scss';
const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' ? true : false;
  });

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <button
      className="btn-darkmode-toggle"
      onClick={() => setIsDarkMode(prev => !prev)}
      aria-label="Toggle dark mode"
      title={isDarkMode ? 'Modalità chiara' : 'Modalità scura'}
    >
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default DarkModeToggle;
