import React from 'react';
import MemoryGame from './features/memoryGame/MemoryGame';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <MemoryGame />
    </div>
  );
};

export default App;
