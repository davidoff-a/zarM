import { LOGS } from "./logs.js";

function playSound(path) {
  const SOUND = new Audio(path);
  SOUND.play();
}

function definePathToAudio(kind) {
  const PATH = `${LOGS[kind]["audio"]["firstPart"]}${LOGS[kind]["audio"][
    "lastPart"
  ]()}`;
  return PATH;
}

export { playSound, definePathToAudio };
