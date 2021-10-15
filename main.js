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
  hp: 100,
  img: "",
  weapon: ["knife", "gun", "suriken"],
  attack: function () {
    console.log(`${this.name} Fight`);
  },
};

function createPlayer(player) {
  const $player = createElement("div", `player${player.player}`);
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
  return $player;
}

function changeHP(player) {
  const $playerLife = document.querySelector(`.player${player.player} .life`);
  player.hp -= Math.ceil(Math.random() * 20);
  if (player.hp < 0) {
    player.hp = 0;
  }
  $playerLife.style.width = player.hp + "%";
  if (player.hp <= 0) {
    $arenas.appendChild(playerLose(determineWinner()));
    $randomButton.disabled = true;
  }
}

function playerLose(name) {
  const $loseTitle = createElement("div", "loseTitle");
  $loseTitle.innerText = `${name} WIN!`;
  return $loseTitle;
}

$randomButton.addEventListener("click", () => {
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

function determineWinner() {
  if (player1.hp && !player2.hp) {
    return player1.name;
  } else if (!player1.hp && player2.hp) {
    return player2.name;
  } else {
    return "Double Kill!";
  }
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
