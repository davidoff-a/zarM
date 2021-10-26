const getRandomNumber = (max, min = 0) =>
  Math.ceil(Math.random() * (max - min) + min);

const createElement = (tag, className) => {
  const $element = document.createElement(tag);
  if (className && className.length > 0) {
    $element.classList.add(className);
  }
  return $element;
};

const checkBlocked = (objAttacks, objDefense) => {
  const { hit, hitPoints } = objAttacks;
  const { defense } = objDefense;
  return (hit === defense)? 0: hitPoints;
}

export { getRandomNumber, createElement, checkBlocked };
