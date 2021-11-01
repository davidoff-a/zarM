import { LOGS } from "./logs.js";

function playSound(kind) {
  const PATH = `${LOGS[kind]["audio"]["firstPart"]}${LOGS[kind]["audio"][
    "lastPart"
  ]()}`;
  
  const SOUND = new Audio(PATH);
  SOUND.play();
}

export { playSound };
