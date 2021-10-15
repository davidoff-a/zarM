const $arenas = document.querySelector(".arenas");
const player1 = {
  player: 1,
  name: "scorpion",
  hp: 100,
  img: "",
  weapon: ["knife", "gun", "suriken"],
  attack: function () {
    console.log(`${this.name} Fight`);
  },
};
const player2 = {
  player: 2,
  name: "sonya",
  hp: 100,
  img: "",
  weapon: ["knife", "gun", "suriken"],
  attack: function () {
    console.log(`${this.name} Fight`);
  },
};

function createPlayer(classes, player) {
  const $player = document.createElement("div");
  $player.classList.add(`${classes}`);
  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");
  const $life = document.createElement("div");
  $life.classList.add("life");
  $life.style.width = `${player.hp}%`;
  const $name = document.createElement("div");
  $name.classList.add("name");
  $name.innerText = `${player.name}`;
  const $character = document.createElement("div");
  $character.classList.add("character");
  const $charImg = document.createElement("img");
  $charImg.src = `http://reactmarathon-api.herokuapp.com/assets/${player.name}.gif`;
  $character.appendChild($charImg);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($progressbar);
  $player.appendChild($character);
  $arenas.appendChild($player);
}

createPlayer("player1", player1);
createPlayer("player2", player2);
