function getRandomNumber(max, min = 0) {
  return Math.ceil(Math.random() * (max - min) + min);
}
function createElement(tag, className) {
  const $element = document.createElement(tag);
  if (className && className.length > 0) {
    $element.classList.add(className);
  }
  return $element;
}
function checkBlocked(objAttacks, objDefense) {
  const { hit, hitPoints } = objAttacks;
  const { defense } = objDefense;
  if (hit === defense) {
    return 0;
  } else {
    return hitPoints;
  }
}
export { getRandomNumber, createElement, checkBlocked };
