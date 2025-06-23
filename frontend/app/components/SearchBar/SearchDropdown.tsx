

import { type Card } from "~/entities/GuessData";
import { getIconPath } from "~/utils";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '~/redux/store';
import './index.scss'

type SearchDropdownProps = {
  query: string;
  onDropdownSelect: (name: string) => void;
};

export const SearchDropdown: React.FC<SearchDropdownProps> = ({ query, onDropdownSelect }) => {
  const allCards = useSelector((state: RootState) => state.cards.allCards);
  const loadingStatus = useSelector((state: RootState) => state.cards.status);

  const filteredCards = allCards
    .filter((card: Card) =>
      card.name.toLowerCase().includes(query.toLowerCase()) || card.artwork.toLowerCase().includes(query.toLowerCase())
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

  return (<ul className="search-dropdown">
    {filteredCards.length > 0 ? (
      filteredCards.map((item, idx) => (
        <li
          key={idx}
          className="search-item"
          onMouseDown={() => {
            onDropdownSelect(item.name);
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
    ) : loadingStatus === "succeeded" ? (
      <li className="search-item no-match">No matches found</li>
    ) : loadingStatus === "loading" ? (
      <li className="search-item no-match">Loading...</li>
    ) :
      <li className="search-item no-match">Error Loading Cards</li>
    }
  </ul>)
}