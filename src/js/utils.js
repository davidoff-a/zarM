const getRandomNumber = (max, min = 0) =>
  Math.ceil(Math.random() * (max - min) + min);

export { getRandomNumber };
