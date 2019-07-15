const pReduce = (values, fn) =>
  values.reduce(
    (prev, ...args) => prev.then(() => fn(...args)),
    Promise.resolve()
  );

module.exports = pReduce;
