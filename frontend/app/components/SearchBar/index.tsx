// components/CardSearch.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '~/redux/store';
import type { Card } from '~/entities/GuessData';
import { getIconPath } from '~/utils';
import './index.scss'

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const allCards = useSelector((state: RootState) => state.cards.allCards);

  const filteredCards = allCards
    .filter((card: Card) =>
      card.name.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      const aLower = a.name.toLowerCase();
      const bLower = b.name.toLowerCase();

      const aStarts = aLower.startsWith(query);
      const bStarts = bLower.startsWith(query);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      return aLower.localeCompare(bLower);
    });

  return (
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
        <ul className="search-dropdown">
          {filteredCards.length > 0 ? (
            filteredCards.map((item, idx) => (
              <li
                key={idx}
                className="search-item"
                onMouseDown={() => {
                  setQuery(item.name);
                  setShowDropdown(false);
                }}
              >
                <img
                  src={getIconPath(item.artwork)}
                  alt={item.name + " icon"}
                  className="search-icon"
                  loading="lazy"
                />
                {item.name}
              </li>
            ))
          ) : (
            <li className="search-item no-match">No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
};
