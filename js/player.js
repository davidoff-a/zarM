import { createElement } from "./utils.js";

const player1 = {
  player: 1,
  name: "scorpion",
  hp: 100,
  img: "",
  weapon: ["knife", "gun", "suriken"],
  attack,
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: "sonya",
  hp: 100,
  img: "",
  weapon: ["knife", "gun", "suriken"],
  attack,
  changeHP,
  elHP,
  renderHP,
};

function attack() {
  console.log(`${this.name}, FIGHT!`);
}

function createPlayer(player) {
  const { player: playerNumber, hp, name } = player;
  const $player = createElement("div", `player${playerNumber}`);
  const $progressbar = createElement("div", "progressbar");
  const $life = createElement("div", "life");
  $life.style.width = `${hp}%`;
  const $name = createElement("div", "name");
  $name.innerText = `${name}`;
  const $character = createElement("div", "character");
  const $charImg = createElement("img");
  const $bangImg = createElement("img");
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

function changeHP(HP) {
  this.hp -= HP;
  if (this.hp < 0) {
    this.hp = 0;
  }
}

function elHP() {
  const $playerLife = document.querySelector(`.player${this.player} .life`);
  return $playerLife;
}

function renderHP($element) {
  $element.style.width = this.hp + "%";
}

export {
  player1,
  player2,
  createPlayer,
};
