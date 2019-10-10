import "./styles.css";

import {
  randomize,
  bubbleSort,
  selectionSort,
  insertionSort
} from "./algorithms";
import { run } from "./utils";

const RED = "red";
const GREEN = "green";
const LENGTH = 100;
const DELAY = 10;

const initialize = (array, items) => {
  const ul = document.createElement("ul");
  for (let i = 0; i < array.length; i++) {
    const li = document.createElement("li");
    li.style.height = `${array[i] * (100 / array.length)}%`;
    li.style.width = `${100 / array.length}%`;
    ul.appendChild(li);
    items[i] = li;
  }
  document.getElementById("app").appendChild(ul);
};

const render = (array, items) => {
  let previous = [];
  return (...indices) =>
    run(() => {
      for (const index of previous) {
        items[index].classList.remove(RED);
        items[index].style.height = `${array[index] * (100 / items.length)}%`;
      }
      for (const index of indices) {
        items[index].classList.add(RED);
        items[index].style.height = `${array[index] * (100 / items.length)}%`;
      }
      previous = indices;
    }, DELAY);
};

const finalize = async items => {
  await run(() => {
    items[0].classList.add(RED);
  }, DELAY);
  let previous = items[0];
  for (const item of items.slice(1)) {
    await run(() => {
      previous.classList.replace(RED, GREEN);
      item.classList.add(RED);
      previous = item;
    }, DELAY);
  }
  await run(() => {
    items[items.length - 1].classList.replace(RED, GREEN);
  }, DELAY);
};

const start = async sort => {
  const array = new Array(LENGTH);
  randomize(array);
  const items = new Array(LENGTH);
  initialize(array, items);
  await sort(array, render(array, items));
  finalize(items);
};

start(bubbleSort);
start(selectionSort);
start(insertionSort);
