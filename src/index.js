import "./styles.css";

import { randomize, bubbleSort } from "./algorithms";
import { run } from "./utils";

const LENGTH = 100;
const DELAY = 5;
const RED = "#d50000";
const GREEN = "#00c853";

const initialize = (array, items) => {
  const ul = document.createElement("ul");
  for (let i = 0; i < array.length; i++) {
    const li = document.createElement("li");
    li.style.background = "white";
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
        items[index].style.background = "white";
        items[index].style.height = `${array[index] * (100 / items.length)}%`;
      }
      for (const index of indices) {
        items[index].style.background = RED;
        items[index].style.height = `${array[index] * (100 / items.length)}%`;
      }
      previous = indices;
    }, DELAY);
};

const finalize = async items => {
  for (const item of items) {
    await run(() => {
      item.style.background = GREEN;
    }, DELAY);
  }
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
