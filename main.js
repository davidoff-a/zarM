const player1 = {
  name: "Scorpion",
  hp: 100,
  img: "",
  weapon: ["knife", "gun", "suriken"],
  attack: function () {
    console.log(`${this.name} Fight`);
  },
};

const player2 = {
  name: "Sonya",
  hp: 100,
  img: "",
  weapon: ["knife", "gun", "suriken"],
  attack: function () {
    console.log(`${this.name} Fight`);
  },
};

function createPlayer(player, heroName, hitPoints) {
  const $arenas = document.querySelector(".arenas");
  const $player = document.createElement("div");
  $player.classList.add(`${player}`);
  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");
  const $life = document.createElement("div");
  $life.classList.add("life");
  $life.style.width = `${hitPoints}%`;
  const $name = document.createElement("div");
  $name.classList.add("name");
  $name.innerText = `${heroName}`;
  const $character = document.createElement("div");
  $character.classList.add("character");
  const $charImg = document.createElement("img");
  $charImg.src = `http://reactmarathon-api.herokuapp.com/assets/${heroName}.gif`;
  $character.appendChild($charImg);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($progressbar);
  $player.appendChild($character);
  $arenas.appendChild($player);
}

createPlayer("player1", "scorpion", 50);
createPlayer("player2", "kitana", 75);