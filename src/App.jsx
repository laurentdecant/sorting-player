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

const LENGTH = 360;
const DELAY = 16.67;
const STOPPED = 0;
const PLAYING = 1;
const PAUSED = 2;

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
  const [prevState, setPrevState] = useState();
  const [state, setState] = useState(STOPPED);
  const [indices, setIndices] = useState(operations.map(() => 0));
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (state === PLAYING) {
      const newIndices = indices.map((value, index) =>
        Math.min(Math.max(0, value + speed), operations[index].length - 1)
      );
      const timeout = setTimeout(() => {
        setIndices(newIndices);
      }, DELAY);
      const canNext = newIndices.some(
        (value, index) => value < operations[index].length - 1
      );
      if (!canNext) {
        setState(STOPPED);
      }

      return () => clearTimeout(timeout);
    }
  }, [state, indices]);

  const handleSkipPreviousClick = () => {
    setTimeout(() => {
      setIndices(operations.map(() => 0));
    }, DELAY);
  };

  const handleFastRewindMouseDown = () => {
    setPrevState(state);
    setState(PLAYING);
    setSpeed(-10);
  };

  const handleFastRewindMouseUp = () => {
    setState(prevState);
    setSpeed(1);
  };

  const handlePlayClick = () => {
    setState(state === PLAYING ? PAUSED : PLAYING);
  };

  const handleFastForwardMouseDown = () => {
    setPrevState(state);
    setState(PLAYING);
    setSpeed(10);
  };

  const handleFastForwardMouseUp = () => {
    setState(prevState);
    setSpeed(1);
  };

  const handleSkipNextClick = () => {
    setTimeout(() => {
      setIndices(operations.map(value => value.length - 1));
    }, DELAY);
  };

  return (
    <>
      <div className="controls">
        <button onClick={handleSkipPreviousClick}>
          <i className="material-icons">skip_previous</i>
        </button>
        <button
          onMouseDown={handleFastRewindMouseDown}
          onMouseUp={handleFastRewindMouseUp}
        >
          <i className="material-icons">fast_rewind</i>
        </button>
        <button onClick={handlePlayClick}>
          <i className="material-icons">
            {state === PLAYING ? "pause" : "play_arrow"}
          </i>
        </button>
        <button
          onMouseDown={handleFastForwardMouseDown}
          onMouseUp={handleFastForwardMouseUp}
        >
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

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
