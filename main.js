const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
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
  hp: 80,
  img: "",
  weapon: ["knife", "gun", "suriken"],
  attack: function () {
    console.log(`${this.name} Fight`);
  },
};

function createPlayer(playerClass, player) {
  const $player = createElement("div", playerClass);
  const $progressbar = createElement("div", "progressbar");
  const $life = createElement("div", "life");
  $life.style.width = `${player.hp}%`;
  const $name = createElement("div", "name");
  $name.innerText = `${player.name}`;
  const $character = createElement("div", "character");
  const $charImg = createElement("img");
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

function changeHP(player) {
  const $playerLife = document.querySelector(`.player${player.player} .life`);
  player.hp -= 20;
  $playerLife.style.width = player.hp + "%";
  if (player.hp < 0) {
    $arenas.appendChild(playerLose(player.name));
  }
}

function playerLose(name) {
  const $loseTitle = createElement("div", "loseTitle");
  $loseTitle.innerText = `${name} lose`;
  return $loseTitle;
}
$randomButton.addEventListener("click", () => {
  console.log("Hello world!");
  changeHP(player1);
  changeHP(player2);
});

function createElement(tag, className) {
  const $element = document.createElement(tag);
  if (className && className.length > 0) {
    $element.classList.add(className);
  }
  return $element;
}