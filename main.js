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
  player.hp -= randomizer();
  if (player.hp < 0) {
    player.hp = 0;
  }
  $playerLife.style.width = player.hp + "%";
}

function playerLose(name) {
  const $loseTitle = createElement("div", "loseTitle");
  if (name === "Double Kill!") {
    $loseTitle.innerText = name;
  } else {
    $loseTitle.innerText = `${name} WINS!`;
  }
  return $loseTitle;
}

$randomButton.addEventListener("click", () => {
  changeHP(player1);
  changeHP(player2);
  let winner = determineWinner();
  if (winner) {
    declareWinner(winner);
  }
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
  }
  if (!player1.hp && player2.hp) {
    return player2.name;
  }
  if (!player1.hp && !player2.hp) {
    return "Double Kill!";
  }
}

function randomizer() {
  return Math.ceil(Math.random() * 20);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

// function checkRestOfLife(player) {
//   if (player.hp <= 0) {
//     return true;
//   } else {
//     return false;
//   }
// }

function declareWinner(winnerName) {
  $arenas.appendChild(playerLose(winnerName));
  $randomButton.disabled = true;
}
