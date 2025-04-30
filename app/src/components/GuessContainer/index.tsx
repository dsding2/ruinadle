import React, { useState } from 'react';
import './index.scss';
import { Correctness } from '~/src/entities/GuessData';
import GuessRow from '../GuessRow';
import { Flipped, Flipper } from 'react-flip-toolkit';
import _ from 'lodash';


const GuessContainer: React.FC = () => {
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const [compCount, setCompCount] = useState<number[]>([]);

  const testAddComponent = () => {
    addComponent([`a ${components.length}`, "b", "c"], [Correctness.Correct, Correctness.Incorrect, Correctness.Partial])
  }
  const addComponent = (guess_data: string[], correctness_data: Correctness[]) => {
    const newComponent = <GuessRow guess_data={guess_data} correctness_data={correctness_data} />
    setComponents(prev => [newComponent, ...prev]);
    setCompCount(prev => [components.length - 1, ...prev])
  };

  return (
    <div>
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
      <div>
        <button onClick={testAddComponent} style={{ marginTop: '20px' }}>
          Add Component
        </button>
      </div>
    </div>
  );
};

export default GuessContainer;
