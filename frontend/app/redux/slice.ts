// features/dataset/datasetSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { type Card, asCard } from '~/entities/GuessData';

export interface CardData {
  allCards: Card[];
  status: 'init' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CardData = {
  allCards: [],
  status: 'init',
  error: null,
};

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  // TODO: Fix routing on this
  const response = await fetch('http://localhost:5173/api/cards');
  if (!response.ok) throw new Error('Failed to load dataset');
  return await response.json();
});

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCards.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allCards = action.payload.map(asCard);
        console.log(state.allCards)
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default cardSlice.reducer;

export const selectCards = (state: any) => state.cards.allCards;
export const selectCardStatus = (state: any) => state.cards.status;


