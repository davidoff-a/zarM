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
  constructor({ player, name, img }) {
    this.player = player;
    this.name = name;
    this.hp = 100;
    this.img = img;
  }

  changeHP = ({value: HP}) => {
    this.hp < HP ? (this.hp = 0) : (this.hp -= HP);
    
  };

  elHP = () => {
    const $playerLife = document.querySelector(`.player${this.player} .life`);
    return $playerLife;
  };

  renderHP = ($element) => {
    $element.style.width = `${this.hp}%`;
  };

  showHitMsg({ hit, dealType }) {
    const PIC_INDEX = getRandomNumber(MESSAGES[dealType].length - 1);
    const IMG_PATH = `./assets/messages/${dealType}/${MESSAGES[dealType][PIC_INDEX]}`;
    const $PUNCH_IMG = document.querySelector(`.bang.fighter${this.player}`);
    const POW_LEVEL = (ATTACK.indexOf(hit) + 1) * 30;
    $PUNCH_IMG.src = IMG_PATH;
    $PUNCH_IMG.style.top = `${POW_LEVEL > 30 ? POW_LEVEL - 30 : 15}%`;

    setTimeout(() => {
      $PUNCH_IMG.src = "";
    }, 2000);
  }
}

export { Player };
