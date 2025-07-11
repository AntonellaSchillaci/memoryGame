import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti'; 
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { flipCard, resetFlipped, resetGame } from './memorySlice';
import Card from '../../components/Card';
import './memoryGame.scss';

const MemoryGame: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, flippedCards, disabled } = useSelector((state: RootState) => state.memory);

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every(card => card.matched);
    setShowConfetti(allMatched);
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
    if (!disabled) {
      dispatch(flipCard(id));
    }
  };

  return (
    <div className="memory-game">
      {showConfetti && <Confetti />}
      <h1 className="title">Gioco di Memoria</h1>
      <button className="btn-reset" onClick={() => dispatch(resetGame())}>Reset</button>

      <div className="board">
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            content={card.content}
            flipped={card.flipped}
            matched={card.matched}
            disabled={disabled}
            onClick={handleClick}
          />
        ))}
      </div>

      {showConfetti && <div className="win-message">🎉 You Win! 🎉</div>}
    </div>
  );
};

export default MemoryGame;
