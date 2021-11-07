import { createElement, getRandomNumber } from "./utils.js";
import { ATTACK } from "./game.js";
import { playSound } from "./audio.js";
const MESSAGES = {
  hit: [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
  ],
  defense: ["block.gif"],
};

class Player {
  constructor({player, name, img}) {
    this.player = player;
    this.name = name;
    this.hp = 100;
    this.img = img;
  }

  changeHP = (HP) => {
    this.hp < HP ? (this.hp = 0) : (this.hp -= HP);
  };

  elHP = () => {
    const $playerLife = document.querySelector(`.player${this.player} .life`);
    return $playerLife;
  };

  renderHP = ($element) => {
    $element.style.width = `${this.hp}%`;
  };

  getRoundResult({ value, hit }, { defense }, opponent) {
    let aim;
    let dealType;
    if (hit === defense) {
      value = 0;
      aim = defense;
      dealType = "defense";
    } else {
      aim = hit;
      dealType = "hit";
    }
    opponent.changeHP(value);
    opponent.renderHP(opponent.elHP());
    this.showHitMsg(opponent.player, aim, dealType);
    playSound(dealType);
    return { dealType, value };
  }
  
  showHitMsg(numPlayer, bodyPart, type) {
  const IMG_PATH = `./assets/messages/${type}/${
    MESSAGES[type][getRandomNumber(MESSAGES[type].length - 1)]
  }`;
  const $punchImg = document.querySelector(`.bang.fighter${numPlayer}`);
  const POW_LEVEL = (ATTACK.indexOf(bodyPart) + 1) * 30;
  $punchImg.src = IMG_PATH;
  $punchImg.style.top = `${getRandomNumber(
    POW_LEVEL,
    POW_LEVEL > 30 ? POW_LEVEL - 30 : 15
  )}%`;

  setTimeout(() => {
    $punchImg.src = "";
  }, 2000);
}
}



export { Player };
