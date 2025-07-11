import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Card {
  id: number;
  content: string;
  matched: boolean;
  flipped: boolean;
}

interface MemoryState {
  cards: Card[];
  flippedCards: number[];
  disabled: boolean;
  gameWon: boolean; 
}

const initialCards: Card[] = [
  { id: 1, content: '🍎', matched: false, flipped: false },
  { id: 2, content: '🍎', matched: false, flipped: false },
  { id: 3, content: '🍌', matched: false, flipped: false },
  { id: 4, content: '🍌', matched: false, flipped: false },
  { id: 5, content: '🍇', matched: false, flipped: false },
  { id: 6, content: '🍇', matched: false, flipped: false },
  { id: 7, content: '🍓', matched: false, flipped: false },
  { id: 8, content: '🍓', matched: false, flipped: false },
];

const shuffledCards = initialCards
  .map(card => ({ ...card }))
  .sort(() => Math.random() - 0.5);

const initialState: MemoryState = {
  cards: shuffledCards,
  flippedCards: [],
  disabled: false,
  gameWon: false, 
};

const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {
    flipCard(state, action: PayloadAction<number>) {
      if (state.disabled || state.flippedCards.includes(action.payload)) {
        return;
      }

      const cardIndex = state.cards.findIndex(card => card.id === action.payload);
      if (cardIndex === -1) return;

      if (state.cards[cardIndex].matched || state.cards[cardIndex].flipped) {
        return;
      }

      state.cards[cardIndex].flipped = true;
      state.flippedCards.push(action.payload);

      if (state.flippedCards.length === 2) {
        const [firstId, secondId] = state.flippedCards;
        const firstIndex = state.cards.findIndex(card => card.id === firstId);
        const secondIndex = state.cards.findIndex(card => card.id === secondId);

        if (firstIndex === -1 || secondIndex === -1) return;

        if (state.cards[firstIndex].content === state.cards[secondIndex].content) {
          state.cards[firstIndex].matched = true;
          state.cards[secondIndex].matched = true;
          state.flippedCards = [];

          const allMatched = state.cards.every(card => card.matched);
          if (allMatched) {
            state.gameWon = true;
          }

        } else {
          state.disabled = true;
        }
      }
    },

    resetFlipped(state) {
      state.flippedCards.forEach(id => {
        const cardIndex = state.cards.findIndex(card => card.id === id);
        if (cardIndex !== -1 && !state.cards[cardIndex].matched) {
          state.cards[cardIndex].flipped = false;
        }
      });
      state.flippedCards = [];
      state.disabled = false;
    },

    resetGame(state) {
      state.cards = initialCards
        .map(card => ({ ...card, flipped: false, matched: false }))
        .sort(() => Math.random() - 0.5);
      state.flippedCards = [];
      state.disabled = false;
      state.gameWon = false;
    },
  }
});

export const { flipCard, resetFlipped, resetGame } = memorySlice.actions;
export default memorySlice.reducer;
