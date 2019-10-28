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
  const [indices, setIndices] = useState(operations.map(() => 0));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndices(
        indices.map((value, index) =>
          value < operations[index].length - 1 ? value + 1 : value
        )
      );
    }, DELAY);
    return () => setTimeout(timeout);
  }, [indices]);

  return (
    <div className="algorithms">
      {indices.map((value, index) => (
        <Visualizer
          key={index}
          values={operations[index][value][0]}
          highlights={operations[index][value][1]}
        />
      ))}
    </div>
  );
};
