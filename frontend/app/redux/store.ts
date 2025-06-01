// store.ts
import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './slice';

export const store = configureStore({
  reducer: {
    cards: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// hooks
