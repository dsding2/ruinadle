import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '~/redux/store';
import type { Card } from '~/entities/GuessData';
import './index.scss'
import { SearchDropdown } from './SearchDropdown';

type SearchBarProps = {
  onSubmit: (card: Card) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const allCards = useSelector((state: RootState) => state.cards.allCards);

  const trySubmit = (submitName: string) => {
    const cards = allCards.filter((card: Card) => (card.name.toLowerCase() == submitName.toLowerCase()))
    if (cards.length != 1 || submitName === "") {
      return
    }
    onSubmit(cards[0]);
  }
  const onDropdownSelect = (name: string) => {
    setShowDropdown(false);
    setQuery(name);
  }

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onMouseDown={() => setShowDropdown(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          className="search-input"
          placeholder="Search..."
        />
        {showDropdown && query && (
          <SearchDropdown query={query} onDropdownSelect={onDropdownSelect}></SearchDropdown>
        )}
      </div>
      <button onClick={() => { trySubmit(query) }} className='search-button'>Submit</button>
    </div>
  );
};
