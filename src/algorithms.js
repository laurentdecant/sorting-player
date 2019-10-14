const randomize = array => {
  for (let i = 0; i < array.length; i++) {
    array[i] = i + 1;
  }
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (array.length - i) + i);
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const bubbleSort = render => async array => {
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      await render(j, j + 1);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        await render(j, j + 1);
      }
    }
  }
  await render();
};

const selectionSort = render => async array => {
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
  await render();
};

const insertionSort = render => async array => {
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j > 0 && array[j - 1] > array[j]; j--) {
      await render(j - 1, j);
      [array[j - 1], array[j]] = [array[j], array[j - 1]];
      await render(j - 1, j);
    }
  }
  await render();
};

const mergeSort = render => async array => {
  const aux = new Array(array.length);
  const merge = async (low, mid, high) => {
    for (let k = low; k <= high; k += 1) {
      aux[k] = array[k];
    }
    for (let i = low, j = mid + 1, k = low; k <= high; k += 1) {
      await render(k);
      if (j > high || (i < mid + 1 && aux[i] < aux[j])) {
        array[k] = aux[i];
        i += 1;
      } else {
        array[k] = aux[j];
        j += 1;
      }
      await render(k);
    }
  };

  const sort = async (low, high) => {
    if (low < high) {
      const mid = low + Math.floor((high - low) / 2);
      await sort(low, mid);
      await sort(mid + 1, high);
      await merge(low, mid, high);
    }
  };

  await sort(0, array.length - 1);
  await render();
};

export { randomize, bubbleSort, selectionSort, insertionSort, mergeSort };
