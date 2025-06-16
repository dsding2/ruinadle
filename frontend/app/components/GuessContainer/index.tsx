import React, { useState } from 'react';
import './index.scss';
import { Correctness, type Card, cardFeatureOrder, extractFeatures, blankCard } from '~/entities/GuessData';
import GuessRow from '../GuessRow';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { compareCard, comparisonKeys } from './utils';


type GuessContainerProps = {
  guesses: Card[],
  correctCard: Card | null
}

const GuessContainer: React.FC<GuessContainerProps> = ({ guesses, correctCard }) => {
  // const [components, setComponents] = useState<React.ReactNode[]>([]);
  const correctFeatures = extractFeatures(correctCard ?? blankCard);

  const makeComponent = (guess: Card) => {
    if (correctCard === null) {
      return null;
    }
    const guessedFeatures = extractFeatures(guess);
    const data = cardFeatureOrder.map((cf) => (guessedFeatures[cf].toString()));
    const correctnessData = compareCard(correctFeatures, guessedFeatures);
    return <GuessRow artworkPath={guessedFeatures.artwork} guess={data} correctness={correctnessData} />
  }

  return (
    <div className="grid-table">
      <div className="header-row">
        {comparisonKeys.map((text, idx) => (
          <div key={idx} className="cell header">{text}</div>
        ))}
      </div>
      <div className='row-container'>
        <Flipper flipKey={guesses.length}>
          {guesses.map((guess, idx) => (
            <Flipped key={guesses.length - idx} flipId={guesses.length - idx}><div>{makeComponent(guess)}</div></Flipped>
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
