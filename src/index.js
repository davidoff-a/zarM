import { GAME } from "./js/game";
import { createEl } from "./js/buildHTML";

import "./css/style.css";

const leftWall = require("./assets/wall-left.png");
const rightWall = require("./assets/wall-right.png");
const logoImg = require("./assets/logo.png");

const appInit = () => {
  const rootEl = document.querySelector(".root");
  const divContent = createEl({ tag: "div", classes: ["content"] });
  const divLogo = createEl({ tag: "div", classes: ["logo"] });
  const imgLogo = createEl({
    tag: "img",
    attribs: { src: logoImg, alt: "logo" },
  });
  const sides = ["left", "right"];
  sides.forEach((side) => {
    const wall = createEl({ tag: "div", classes: ["wall", `wall_${side}`] });
    const wallImg = createEl({
      tag: "img",
      attribs: {
        src: side === "left" ? leftWall : rightWall,
        alt: `wall ${side}`,
      },
    });
    wall.append(wallImg);
    rootEl.append(wall);
  });
  divLogo.append(imgLogo);
  rootEl.prepend(divLogo, divContent);
  return rootEl;
};
appInit();
GAME.init();
