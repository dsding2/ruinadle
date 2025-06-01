// components/CardSearch.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '~/redux/store';
import type { Card } from '~/entities/GuessData';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const allCards = useSelector((state: RootState) => state.cards.allCards);

  const filteredCards = allCards.filter((card: Card) =>
    card.name.toLowerCase().includes(query.toLowerCase())
  );

  
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search cards..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded w-full mb-4"
      />
      <ul>
        {filteredCards.map((card) => (
          <li key={card.id} className="mb-2">
            <strong>{card.name}</strong> — {card.keywords}
          </li>
        ))}
      </ul>
    </div>
  );
};
