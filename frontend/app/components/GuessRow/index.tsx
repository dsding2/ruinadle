import React, { useState, useRef } from 'react';
import './index.scss';
import { Correctness } from '~/entities/GuessData';

type BoxProps = {
  text: string;
  correctness: Correctness;
};

const Box: React.FC<BoxProps> = ({ text, correctness }) => {
  function getColor(correctness: Correctness): string {
    switch (correctness) {
      case Correctness.Correct:
        return '#4caf50'; // green
      case Correctness.Partial:
        return '#ff9800'; // orange
      case Correctness.Incorrect:
        return '#f44336'; // red
      default:
        return '#9e9e9e'; // gray fallback
    }
  }

  return (
    <div
      className="box"
      style={{ backgroundColor: getColor(correctness) }}
    >
      {text}
    </div>
  );
};

interface GuessRowProps {
  guess_data: string[];
  correctness_data: Correctness[];
}

const GuessRow: React.FC<GuessRowProps> = ({ guess_data, correctness_data }) => {
  return (
    <div className='row'>
      {guess_data.map((val, idx) => (
        <Box key={val} text={val} correctness={correctness_data[idx]} />
      ))}
    </div>
  );
};

export default GuessRow;
