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

function createPlayer() {
  const $player = document.createElement("div");
  $player.classList.add("Player1");
  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");
  const $life = document.createElement("div");
  $life.classList.add("life");
  $life.style.width = "100%";
  const $name = document.createElement("div");
  $name.classList.add("name");
  $name.innerText = "Scorpion";
  const $character = document.createElement("div");
  $character.classList.add("character");
  const $charImg = document.createElement("img");
  $charImg.src = "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif";
  $progressbar.appendChild($life, $name);
  $player.appendChild($progressbar, $character);
}