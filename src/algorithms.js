const randomize = array => {
  for (let i = 0; i < array.length; i++) {
    array[i] = i + 1;
  }
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (array.length - i) + i);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
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
      await render(k);
      aux[k] = array[k];
      await render(k);
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
      await render(low, mid, high);
      await sort(low, mid);
      await sort(mid + 1, high);
      await merge(low, mid, high);
    }
  };

  await sort(0, array.length - 1);
  await render();
};

const heapSort = render => async array => {
  const sink = async (index, length) => {
    let parent = index;
    let child = parent * 2 + 1;
    while (
      child <= length &&
      (array[parent] < array[child] || array[parent] < array[child + 1])
    ) {
      await render(parent, child);
      if (child < length && array[child] < array[child + 1]) {
        child += 1;
      }
      if (array[parent] < array[child]) {
        [array[parent], array[child]] = [array[child], array[parent]];
        await render(parent, child);
      }
      parent = child;
      child = child * 2 + 1;
    }
  };

  const sort = async () => {
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
      await render(i);
      await sink(i, array.length - 1);
    }

    for (let i = array.length - 1; i > 0; i -= 1) {
      await render(i);
      [array[0], array[i]] = [array[i], array[0]];
      await render(0, i);
      await sink(0, i - 1);
    }
  };

  await sort();
  await render();
};

const quickSort = render => async array => {
  const partition = async (low, high) => {
    let i = low + 1;
    let j = high;
    do {
      await render(i, j);
      while (i < high && array[i] < array[low]) {
        await render(i);
        i += 1;
      }
      while (j > low && array[j] > array[low]) {
        await render(j);
        j -= 1;
      }
      if (i < j) {
        [array[i], array[j]] = [array[j], array[i]];
        await render(i, j);
      }
    } while (i < j);
    [array[low], array[j]] = [array[j], array[low]];
    await render(low, j);

    return j;
  };

  const sort = async (low, high) => {
    if (low < high) {
      const pivot = await partition(low, high);
      await render(low, pivot, high);
      await sort(low, pivot - 1);
      await sort(pivot + 1, high);
    }
  };

  await sort(0, array.length - 1);
  await render();
};

export {
  randomize,
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort
};
