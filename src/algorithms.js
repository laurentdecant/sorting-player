const randomize = array => {
  for (let i = 0; i < array.length; i++) {
    array[i] = i + 1;
  }
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (array.length - 1 - i) + i);
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const bubbleSort = async (array, render) => {
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      await render(j, j + 1);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        await render(j, j + 1);
      }
    }
  }
};

const selectionSort = async (array, render) => {
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      await render(j, min);
      if (array[j] < array[min]) {
        min = j;
      }
    }
    [array[i], array[min]] = [array[min], array[i]];
    await render(i, min);
  }
};

const insertionSort = async (array, render) => {};

export { randomize, bubbleSort, selectionSort };
