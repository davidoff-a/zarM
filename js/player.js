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

  // getRoundResult(fightInfoObj) {
  //   const PLAYER_ID = `player${this.player}`;
  //   const AIM = fightInfoObj[PLAYER_ID].hit;
  //   const DEFENDER_ID = (PLAYER_ID === "player1") ? "player2" : "player1";
  //   const DEFENSE = fightInfoObj[DEFENDER_ID].defence;
  //   let dealType;
  //   if (AIM === DEFENSE) {
  //     fightInfoObj[PLAYER_ID].value = 0;
  //     // aim = defense;
  //     dealType = "defense";
  //   } else {
  //     // aim = hit;
  //     dealType = "hit";
  //   }
  //   // opponent.changeHP(value);
  //   // opponent.renderHP(opponent.elHP());
  //   // this.showHitMsg(opponent.player, aim, dealType);
  //   playSound(dealType);
  //   return { dealType, value };
  // }

  showHitMsg(bodyPart, type) {
    const PIC_INDEX = getRandomNumber((MESSAGES[type].length - 1));
    const IMG_PATH = `./assets/messages/${type}/${MESSAGES[type][PIC_INDEX]}`;
    const $PUNCH_IMG = document.querySelector(`.bang.fighter${this.player}`);
    const POW_LEVEL = (ATTACK.indexOf(bodyPart) + 1) * 30;
    $PUNCH_IMG.src = IMG_PATH;
    $PUNCH_IMG.style.top = `${POW_LEVEL > 30 ? POW_LEVEL - 30 : 15}%`;

    setTimeout(() => {
      $PUNCH_IMG.src = "";
    }, 2000);
  }
}



export { Player };
