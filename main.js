const players = {
  player1: {
    name: "scorpion",
    hp: 100,
    img: "",
    weapon: ["knife", "gun", "suriken"],
    attack: function () {
      console.log(`${this.name} Fight`);
    },
  },
  player2: {
    name: "sonya",
    hp: 100,
    img: "",
    weapon: ["knife", "gun", "suriken"],
    attack: function () {
      console.log(`${this.name} Fight`);
    },
  },
};

function createPlayer(player) {
  const $arenas = document.querySelector(".arenas");
  const $player = document.createElement("div");
  $player.classList.add(`${player}`);
  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");
  const $life = document.createElement("div");
  $life.classList.add("life");
  $life.style.width = `${players[player].hp}%`;
  const $name = document.createElement("div");
  $name.classList.add("name");
  $name.innerText = `${players[player].name}`;
  const $character = document.createElement("div");
  $character.classList.add("character");
  const $charImg = document.createElement("img");
  $charImg.src = `http://reactmarathon-api.herokuapp.com/assets/${players[player].name}.gif`;
  $character.appendChild($charImg);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($progressbar);
  $player.appendChild($character);
  $arenas.appendChild($player);
}

createPlayer("player1");
createPlayer("player2");
