import React, { useEffect, useState } from 'react';
import Timer from '../../components/Timer'; 
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { flipCard, resetFlipped, resetGame } from './memorySlice';
import Card from '../../components/Card';
import Confetti from 'react-confetti';
import './memoryGame.scss';

const MemoryGame: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, flippedCards, disabled } = useSelector((state: RootState) => state.memory);

  const [showConfetti, setShowConfetti] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);


  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every(card => card.matched);
    setShowConfetti(allMatched);
    if (allMatched) {
      setIsPaused(true); 
    }
  }, [cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (!firstCard || !secondCard) return;

      if (firstCard.content === secondCard.content) {
        dispatch(resetFlipped());
      } else {
        const timeout = setTimeout(() => {
          dispatch(resetFlipped());
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [flippedCards, cards, dispatch]);

  const handleClick = (id: number) => {
    if (!disabled && !isPaused) {
      dispatch(flipCard(id));
    }
  };

  const handleReset = () => {
    dispatch(resetGame());
    setShowConfetti(false);
    setIsPaused(false);
    setResetTrigger(prev => prev + 1);
  };

  const togglePause = () => setIsPaused(prev => !prev);

  return (
    <div className="memory-game">
      {showConfetti && <Confetti />}
      <h1 className="title">Gioco di Memoria</h1>
      
      <div className="controls">
        <button className="btn-reset" onClick={handleReset}>Reset</button>
        <button className="btn-pause" onClick={togglePause}>
          {isPaused ? '▶️' : '⏸️'}
        </button>
        <Timer isActive={!isPaused} isPaused={isPaused} resetTrigger={resetTrigger} />
      </div>

      <div className="board">
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            content={card.content}
            flipped={card.flipped}
            matched={card.matched}
            disabled={disabled || isPaused}
            onClick={handleClick}
          />
        ))}
      </div>

      {showConfetti && <div className="win-message">🎉 You Win! 🎉</div>}
    </div>
  );
};

export default MemoryGame;
