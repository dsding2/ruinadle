import GuessContainer from "./components/GuessContainer";
import { useEffect, useCallback, useState } from 'react';
import { fetchCards, selectCardStatus, selectCards } from '~/redux/slice';
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { SearchBar } from "./components/SearchBar";
import type { Card } from "./entities/GuessData";
import { getRandomCard } from "./utils";
import { useSelector } from 'react-redux';
import type { RootState } from '~/redux/store';


export default function Ruinadle() {
  const allCards = useSelector((state: RootState) => state.cards.allCards);
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectCards);
  const status = useAppSelector(selectCardStatus);
  const [guesses, setGuesses] = useState<Card[]>([])
  const [correctCard, setCorrectCard] = useState<Card | null>(null)

  useEffect(() => {
    if (status === 'init') {
      dispatch(fetchCards());
    }
    if (status === 'succeeded') {
      const now = new Date()
      const year = now.getFullYear();
      const month = now.getMonth() + 1;  // months are 0-based
      const day = now.getDate();
      setCorrectCard(getRandomCard(allCards, `${year} ${month.toString()} ${day.toString()}`))
    }
  }, [status, dispatch]);

  const handleSubmit = useCallback((guess: Card) => {
    setGuesses([guess, ...guesses])
    // console.log(guess)
  }, []);

  return (
    <div className="ruinadle-main">
      <SearchBar onSubmit={handleSubmit}></SearchBar>
      <GuessContainer guesses={guesses} correctCard={correctCard}></GuessContainer>
    </div>
  )
}