const getRandomNumber = (max, min = 0) =>
  Math.ceil(Math.random() * (max - min) + min);

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className && className.length > 0) {
    if (Array.isArray(className)) {
      className.forEach((item) => {
        $tag.classList.add(item);
      });
    } else {
      $tag.classList.add(className);
    }
  }

  return $tag;
};

export { getRandomNumber, createElement };
