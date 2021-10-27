import { getRandomNumber } from "./utils.js";

const SOUND_LIB = {
  hit: "./assets/sound/hitsounds/mk3-00",
  block: "./assets/sound/block/mk3-09",
  wins: "./assets/sound/wins/",
  draw: "./assets/sound/wins/",
};
function playSound(kind) {
  const PATH = SOUND_LIB[kind];
  let soundPathEnd = "";
  switch (kind) {
    case "hit":
      soundPathEnd = `${getRandomNumber(36, 10)}${getRandomNumber(1) * 5}.mp3`;
      break;
    case "block":
      soundPathEnd = `${getRandomNumber(4, 1)}.mp3`;
      break;
    case "wins":
      soundPathEnd = `victory.mp3`;
      break;
    case "draw":
      soundPathEnd = `draw.mp3`;
      break;
  }
  const SOUND = new Audio(`${PATH}${soundPathEnd}`);
  SOUND.play();
}

export { playSound };
