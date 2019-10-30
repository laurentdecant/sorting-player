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

const LENGTH = 100;
const DELAY = 5;

const array = shuffle(LENGTH);
const operations = [
  bubbleSort(array.slice()),
  selectionSort(array.slice()),
  insertionSort(array.slice()),
  mergeSort(array.slice()),
  heapSort(array.slice()),
  quickSort(array.slice())
];

export default () => {
  const [isRunning, setIsRunning] = useState(false);
  const [indices, setIndices] = useState(operations.map(() => 0));

  useEffect(() => {
    if (isRunning) {
      const timeout = setTimeout(() => {
        setIndices(
          indices.map((value, index) =>
            value < operations[index].length - 1 ? value + 1 : value
          )
        );
      }, DELAY);
      return () => setTimeout(timeout);
    }
  }, [isRunning, indices]);

  const handleClick = () => {
    setIsRunning(!isRunning);
  };

  return (
    <>
      <button className="play-button" onClick={handleClick}>
        <i class="material-icons">{isRunning ? "pause" : "play_arrow"}</i>
      </button>
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
