import React, { useState, useEffect } from "react";
import Visualizer from "./Visualizer";
import {
  shuffle,
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  heapSort,
  quickSort
} from "./algorithms";

const LENGTH = 180;
const DELAY = 1000 / 60;
const STOPPED = 0;
const PLAYING = 1;
const PAUSED = 2;
const SPEED = 1;

let operations = [];
const initialize = () => {
  const array = shuffle(LENGTH);
  operations = [
    bubbleSort(array.slice()),
    selectionSort(array.slice()),
    insertionSort(array.slice()),
    mergeSort(array.slice()),
    heapSort(array.slice()),
    quickSort(array.slice())
  ];
};
initialize();

export default () => {
  const [state, setState] = useState(STOPPED);
  const [indices, setIndices] = useState(operations.map(() => 0));
  const [speed, setSpeed] = useState(SPEED);

  useEffect(() => {
    if (state === PLAYING) {
      const newIndices = indices.map((value, index) =>
        Math.min(Math.max(0, value + speed), operations[index].length - 1)
      );
      const canPrevious = newIndices.some(value => value > 0);
      const canNext = newIndices.some(
        (value, index) => value < operations[index].length - 1
      );
      const timeout = setTimeout(() => {
        setIndices(newIndices);
        if ((speed < 0 && !canPrevious) || (speed > 0 && !canNext)) {
          setState(STOPPED);
        }
      }, DELAY);

      return () => clearTimeout(timeout);
    } else if (state === STOPPED) {
      setSpeed(Math.sign(speed));
    }
  }, [state, indices]);

  const handleSkipPreviousClick = () => {
    setTimeout(() => {
      setState(STOPPED);
      setIndices(operations.map(() => 0));
    }, DELAY);
  };

  const handleFastRewindClick = () => {
    setState(PLAYING);
    setSpeed(speed < 0 ? 2 * speed : speed === 1 ? -speed : speed / 2);
  };

  const handleReversePlayClick = () => {
    setState(state === PLAYING ? PAUSED : PLAYING);
    setSpeed(-SPEED);
  };

  const handlePlayClick = () => {
    setState(state === PLAYING ? PAUSED : PLAYING);
    setSpeed(SPEED);
  };

  const handleFastForwardClick = () => {
    setState(PLAYING);
    setSpeed(speed > 0 ? 2 * speed : speed === -1 ? -speed : speed / 2);
  };

  const handleSkipNextClick = () => {
    setTimeout(() => {
      setState(STOPPED);
      setIndices(operations.map(value => value.length - 1));
    }, DELAY);
  };

  return (
    <>
      <div className="controls">
        <button onClick={handleSkipPreviousClick}>
          <i className="material-icons">skip_previous</i>
        </button>
        <button onClick={handleFastRewindClick}>
          <i className="material-icons">fast_rewind</i>
        </button>
        <button onClick={handleReversePlayClick}>
          <i className="material-icons rotate">
            {state === PLAYING ? "pause" : "play_arrow"}
          </i>
        </button>
        <button onClick={handlePlayClick}>
          <i className="material-icons">
            {state === PLAYING ? "pause" : "play_arrow"}
          </i>
        </button>
        <button onClick={handleFastForwardClick}>
          <i className="material-icons">fast_forward</i>
        </button>
        <button onClick={handleSkipNextClick}>
          <i className="material-icons">skip_next</i>
        </button>
      </div>

      <div className="visualizers">
        {indices.map((value, index) => (
          <Visualizer
            key={index}
            values={operations[index][value][0]}
            highlights={operations[index][value][1]}
          />
        ))}
      </div>
    </>
  );
};
