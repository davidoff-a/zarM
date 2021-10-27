import { createElement } from "./utils.js";

class Player {
  constructor(player, name, hp) {
    this.player = player;
    this.name = name;
    this.hp = hp;
    this.img = `http://reactmarathon-api.herokuapp.com/assets/${this.name}.gif`;
  }
  changeHP(HP) {
    this.hp -= HP;
    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  elHP() {
    const $playerLife = document.querySelector(`.player${this.player} .life`);
    return $playerLife;
  }
  renderHP($element) {
    $element.style.width = `${this.hp}%`;
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

const player1 = new Player(1, "scorpion", 100);
const player2 = new Player(2, "sonya", 100);

export { player1, player2 };
