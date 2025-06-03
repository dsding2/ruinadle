import React, { useState } from 'react';
import './index.scss';
import { Correctness, type Card } from '~/entities/GuessData';
import GuessRow from '../GuessRow';
import { Flipped, Flipper } from 'react-flip-toolkit';

type GuessContainerProps = {
  guesses: Card[],
  correctCard: Card | null
}

const GuessContainer: React.FC<GuessContainerProps> = ({ guesses, correctCard }) => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  const comparisonKeys = ["Artwork", "Name", "Chapter", "Rarity", "Cost", "Attack Type", "Die Type", "Max Roll", "Min Roll", "Number of Die", "Keywords"]

  const addComponent = (guess_data: string[], correctness_data: Correctness[]) => {
    const newComponent = <GuessRow guess_data={guess_data} correctness_data={correctness_data} />
    setComponents(prev => [newComponent, ...prev]);
  };

  return (
    <div className="grid-table">
      <div className="header-row">
        {comparisonKeys.map((text, idx) => (
          <div key={idx} className="cell header">{text}</div>
        ))}
      </div>
      <div className='row-container'>
        <Flipper flipKey={components.length}>
          {components.map((component, idx) => (
            <Flipped key={components.length - idx} flipId={components.length - idx}><div>{component}</div></Flipped>
          ))}
          {/* {compCount.map((component, idx) => (
            <Flipped key={compCount[idx]} flipId={compCount[idx]}><h1>{component}</h1></Flipped>
          ))} */}
        </Flipper>
      </div>
    </div>
  );
};

export default GuessContainer;
