import React from 'react';
import './Card.scss';

interface CardProps {
  id: number;
  content: string;
  flipped: boolean;
  matched: boolean;
  disabled: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, content, flipped, matched, disabled, onClick }) => {
  const handleClick = () => {
    if (!disabled && !flipped && !matched) {
      onClick(id);
    }
  };

  return (
    <div className={`card ${disabled ? 'disabled' : ''}`} onClick={handleClick}>
      <div className={`inner ${flipped || matched ? 'flipped' : ''}`}>
        <div className="front">❓</div>
        <div className="back">{content}</div>
      </div>
    </div>
  );
};

export default Card;
