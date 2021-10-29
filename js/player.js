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
  constructor(player, name) {
    this.player = player;
    this.name = name;
    this.hp = 100;
    this.img = `http://reactmarathon-api.herokuapp.com/assets/${name.toLowerCase()}.gif`;
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

  getRoundResult({ hitPoints, hit }, { defense }, opponent) {
    let aim;
    let dealType;
    if (hit === defense) {
      hitPoints = 0;
      aim = defense;
      dealType = "defense";
    } else {
      aim = hit;
      dealType = "hit";
    }
    opponent.changeHP(hitPoints);
    opponent.renderHP(opponent.elHP());
    this.showHitMsg(opponent.player, aim, dealType);
    playSound(dealType);
    return { dealType, hitPoints };
    // generateLogs(dealType, this, , hitPoints);
  }

  createPlayer() {
    const { player: playerNumber, hp, name } = this;
    const $player = createElement("div", `player${playerNumber}`);
    const $progressbar = createElement("div", "progressbar");
    const $life = createElement("div", "life");
    const $name = createElement("div", "name");
    const $character = createElement("div", "character");
    const $charImg = createElement("img");
    const $bangImg = createElement("img");

    $life.style.width = `${hp}%`;
    $name.innerText = `${name}`;
    $bangImg.classList.add(`bang`, `fighter${playerNumber}`);
    $charImg.src = `http://reactmarathon-api.herokuapp.com/assets/${name}.gif`;
    $character.appendChild($charImg);
    $character.appendChild($bangImg);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    return $player;
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
  }, 1500);
}
}



export { Player };
