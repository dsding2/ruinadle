import GuessContainer from "./components/GuessContainer";
import { useEffect } from 'react';
import { fetchCards, selectCardStatus, selectCards } from '~/redux/slice';
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { SearchBar } from "./components/SearchBar";


export default function Ruinadle() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectCards);
  const status = useAppSelector(selectCardStatus);

  useEffect(() => {
    if (status === 'init') {
      dispatch(fetchCards());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>Loading dataset...</div>;
  if (status === 'failed') return <div>Failed to load dataset.</div>;
  if (!data) return null;
  return (
    <div>
      <SearchBar></SearchBar>
      <GuessContainer></GuessContainer>
    </div>
  )
}