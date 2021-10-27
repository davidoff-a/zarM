import { createElement, getRandomNumber } from "./utils.js";
import { ATTACK } from "./game.js";
import { generateLogs } from "./logs.js";
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
  constructor(player, name, hp) {
    this.player = player;
    this.name = name;
    this.hp = hp;
    this.img = `http://reactmarathon-api.herokuapp.com/assets/${this.name.toLowerCase()}.gif`;
  }

  changeHP = (HP) => {
    this.hp -= HP;
    if (this.hp < 0) {
      this.hp = 0;
    }
  };

  elHP = () => {
    const $playerLife = document.querySelector(`.player${this.player} .life`);
    return $playerLife;
  };

  renderHP = ($element) => ($element.style.width = `${this.hp}%`);

  renderFight({ hitPoints, hit }, { defense }) {
    const DEFENDER = this.player === 1 ? player2 : player1;
    let aim;
    let dealType;
    if (hit === defense) {
      hitPoints = 0;
      aim = hit;
      dealType = "hit";
    } else {
      aim = defense;
      dealType = "defense";
    }
    this.changeHP(hitPoints);
    showHitMsg(this.player, aim, dealType);
    this.renderHP(this.elHP());
    generateLogs(dealType, DEFENDER, hitPoints);
    playSound(dealType);
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
}

function showHitMsg(numPlayer, bodyPart, type) {
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


const player1 = new Player(1, "scorpion", 100);
const player2 = new Player(2, "sonya", 100);

export { player1, player2 };
