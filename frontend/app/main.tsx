import GuessContainer from "./components/GuessContainer";
import { useEffect, useCallback } from 'react';
import { fetchCards, selectCardStatus, selectCards } from '~/redux/slice';
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { SearchBar } from "./components/SearchBar";
import type { Card } from "./entities/GuessData";


export default function Ruinadle() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectCards);
  const status = useAppSelector(selectCardStatus);

  useEffect(() => {
    if (status === 'init') {
      dispatch(fetchCards());
    }
  }, [status, dispatch]);

  const handleSubmit = useCallback((guess: Card) => {
    // Effect logic in the parent
    console.log('Button in child triggered an effect in parent!');
    // Add any side effect here (API call, state update, etc.)
  }, []);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit}></SearchBar>
      <GuessContainer></GuessContainer>
    </div>
  )
}