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
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }

      await render(j, j + 1);
    }
  }
};

export { randomize, bubbleSort };
