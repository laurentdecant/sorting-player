const run = (action, delay) =>
  new Promise(resolve =>
    setTimeout(() => {
      action();
      resolve();
    }, delay)
  );

export { run };
