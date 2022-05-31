import { GAME } from "./js/game";
import { createEl } from "./js/buildHTML";

import "./css/style.css";

const appInit = () => {
  const rootEl = document.querySelector(".root");
  const divContent = createEl({ tag: "div", classes: ["content"] });
  const divLogo = createEl({ tag: "div", classes: ["logo"] });
  const imgLogo = createEl({
    tag: "img",
    attribs: { src: "./assets/logo.png", alt: "logo" },
  });
  const leftWall = createEl({ tag: "div", classes: ["wall", "wall_left"] });
  const leftWallImg = createEl({
    tag: "img",
    attribs: { src: "./assets/wall-left.png", alt: "wall" },
  });
  const rightWall = createEl({ tag: "div", classes: ["wall", "wall_right"] });
  const rightWallImg = createEl({
    tag: "img",
    attribs: { src: "assets/wall-right.png", alt: "wall" },
  });
  leftWall.append(leftWallImg);
  rightWall.append(rightWallImg);
  divLogo.append(imgLogo);
  rootEl.append(divContent, divLogo, leftWall, rightWall);
  return rootEl;
};
appInit();
// GAME.init();
