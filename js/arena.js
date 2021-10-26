import { getRandomNumber } from "./utils.js";

export const $arenas = document.querySelector(".arenas");
export function getArena() {
  window.addEventListener("DOMContentLoaded", () => {
    $arenas.classList.add(`arena${getRandomNumber(1, 5)}`);
  });
}
