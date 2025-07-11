import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { flipCard, resetFlipped, resetGame } from './memorySlice';
import Card from '../../components/Card';
import './memoryGame.scss';

const MemoryGame: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cards, flippedCards, disabled } = useSelector((state: RootState) => state.memory);

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
      <h1>Gioco di Memoria</h1>
      <button onClick={() => dispatch(resetGame())}>Reset</button>
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
    </div>
  );
};

export default MemoryGame;
