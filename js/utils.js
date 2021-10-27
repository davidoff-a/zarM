const getRandomNumber = (max, min = 0) =>
  Math.ceil(Math.random() * (max - min) + min);

const createElement = (tag, className) => {
  const $element = document.createElement(tag);
  if (className && className.length > 0) {
    $element.classList.add(className);
  }
  return $element;
};

const checkBlocked = (aim, block) => (aim === block ? false : true);

export { getRandomNumber, createElement, checkBlocked };
