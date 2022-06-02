const getRandomNumber = (max, min = 0) =>
  Math.ceil(Math.random() * (max - min) + min);

// TODO: - [ ] function createElement and createEl duplicate functionality from each other
const createElement = (tag, className = []) => {
  const $tag = document.createElement(tag);
  if (className.length > 0) {
    className.forEach((item) => {
      $tag.classList.add(item);
    });
  }

  return $tag;
};

export { getRandomNumber, createElement };
