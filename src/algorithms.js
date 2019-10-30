const shuffle = length => {
  const array = new Array(length);
  for (let i = 0; i < array.length; i++) {
    array[i] = i + 1;
  }
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (array.length - i) + i);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const bubbleSort = array => {
  const operations = [[array.slice(), []]];
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      operations.push([array.slice(), [j, j + 1]]);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        operations.push([array.slice(), [j, j + 1]]);
      }
    }
  }
  operations.push([array.slice(), []]);

  return operations;
};

const selectionSort = array => {
  const operations = [[array.slice(), []]];
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      operations.push([array.slice(), [j, min]]);
      if (array[j] < array[min]) {
        min = j;
      }
    }
    [array[i], array[min]] = [array[min], array[i]];
    operations.push([array.slice(), [i, min]]);
  }
  operations.push([array.slice(), []]);

  return operations;
};

const insertionSort = array => {
  const operations = [[array.slice(), []]];
  for (let i = 0; i < array.length; i++) {
    for (let j = i; j > 0 && array[j - 1] > array[j]; j--) {
      operations.push([array.slice(), [j - 1, j]]);
      [array[j - 1], array[j]] = [array[j], array[j - 1]];
      operations.push([array.slice(), [j - 1, j]]);
    }
  }
  operations.push([array.slice(), []]);

  return operations;
};

const mergeSort = array => {
  const operations = [[array.slice(), []]];
  const aux = new Array(array.length);
  const merge = (low, mid, high) => {
    for (let k = low; k <= high; k += 1) {
      aux[k] = array[k];
      operations.push([array.slice(), [k]]);
    }
    for (let i = low, j = mid + 1, k = low; k <= high; k += 1) {
      if (j > high || (i < mid + 1 && aux[i] < aux[j])) {
        array[k] = aux[i];
        i += 1;
      } else {
        array[k] = aux[j];
        j += 1;
      }
      operations.push([array.slice(), [k]]);
    }
  };
  const sort = (low, high) => {
    if (low < high) {
      const mid = low + Math.floor((high - low) / 2);
      operations.push([array.slice(), [low, mid, high]]);
      sort(low, mid);
      sort(mid + 1, high);
      merge(low, mid, high);
    }
  };
  sort(0, array.length - 1);
  operations.push([array.slice(), []]);

  return operations;
};

const heapSort = array => {
  const operations = [[array.slice(), []]];
  const sink = async (index, length) => {
    let parent = index;
    let child = parent * 2 + 1;
    while (
      child <= length &&
      (array[parent] < array[child] || array[parent] < array[child + 1])
    ) {
      operations.push([array.slice(), [parent, child]]);
      if (child < length && array[child] < array[child + 1]) {
        child += 1;
      }
      if (array[parent] < array[child]) {
        [array[parent], array[child]] = [array[child], array[parent]];
        operations.push([array.slice(), [parent, child]]);
      }
      parent = child;
      child = child * 2 + 1;
    }
  };
  const sort = () => {
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
      operations.push([array.slice(), [i]]);
      sink(i, array.length - 1);
    }

    for (let i = array.length - 1; i > 0; i -= 1) {
      operations.push([array.slice(), [i]]);
      [array[0], array[i]] = [array[i], array[0]];
      operations.push([array.slice(), [0, i]]);
      sink(0, i - 1);
    }
  };
  sort();
  operations.push([array.slice(), []]);

  return operations;
};

const quickSort = array => {
  const operations = [[array.slice(), []]];
  const partition = (low, high) => {
    let i = low + 1;
    let j = high;
    do {
      operations.push([array.slice(), [i, j]]);
      while (i < high && array[i] < array[low]) {
        operations.push([array.slice(), [i]]);
        i += 1;
      }
      while (j > low && array[j] > array[low]) {
        operations.push([array.slice(), [j]]);
        j -= 1;
      }
      if (i < j) {
        [array[i], array[j]] = [array[j], array[i]];
        operations.push([array.slice(), [i, j]]);
      }
    } while (i < j);
    [array[low], array[j]] = [array[j], array[low]];
    operations.push([array.slice(), [low, j]]);

    return j;
  };
  const sort = (low, high) => {
    if (low < high) {
      const pivot = partition(low, high);
      operations.push([array.slice(), [low, pivot, high]]);
      sort(low, pivot - 1);
      sort(pivot + 1, high);
    }
  };
  sort(0, array.length - 1);
  operations.push([array.slice(), []]);

  return operations;
};

export {
  shuffle,
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort
};
