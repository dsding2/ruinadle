import './index.scss';
import { Correctness } from '~/entities/GuessData';
import { getIconPath, getImagePath } from '~/utils';

type BoxProps = {
  text: string;
  correctness: Correctness;
};

const Box: React.FC<BoxProps> = ({ text, correctness }) => {
  function getColor(correctness: Correctness): string {
    switch (correctness) {
      case Correctness.Correct:
        return '#4caf50'; // green
      case Correctness.Incorrect:
        return '#f44336'; // red
      default:
        return '#ff9800'; // orange
    }
  }
  const hasArrow = correctness === Correctness.TooHigh || correctness === Correctness.TooLow;
  return (
    <div
      className={hasArrow ? "arrow-box cell" : "cell"}
      style={{ backgroundColor: getColor(correctness) }}
    >
      {hasArrow ? <span>{correctness === Correctness.TooLow ? '⬆️' : '⬇️'}</span> : null}
      {text}
    </div>
  );
};

interface GuessRowProps {
  artworkPath: string
  guess: string[];
  correctness: Correctness[];
}

const GuessRow: React.FC<GuessRowProps> = ({ artworkPath, guess, correctness }) => {
  return (
    <div className='row'>
      <div className='cell'><img src={getIconPath(artworkPath)} alt="Description" /></div>
      {guess.map((val, idx) => (
        <Box key={idx} text={val} correctness={correctness[idx + 2]} />
      ))}
    </div>
  );
};

export default GuessRow;
