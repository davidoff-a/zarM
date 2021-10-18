const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");
const RANDOMIZE_MAX = 20;
const player1 = {
  player: 1,
  name: "scorpion",
  hp: 100,
  img: "",
  weapon: ["knife", "gun", "suriken"],
  attack: function () {
    console.log(`${this.name} Fight`);
  },
  changeHP: function (HP) {
    this.hp -= HP;
    if (this.hp < 0) {
      this.hp = 0;
    }
  },
  elHP: function () {
    const $playerLife = document.querySelector(`.player${this.player} .life`);
    return $playerLife;
  },
  renderHP: function ($element) {
    $element.style.width = this.hp + "%";
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
  changeHP: function (HP) {
    this.hp -= HP;
    if (this.hp < 0) {
      this.hp = 0;
    }
  },
  elHP: function () {
    const $playerLife = document.querySelector(`.player${this.player} .life`);
    return $playerLife;
  },
  renderHP: function ($element) {
    $element.style.width = this.hp + "%";
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

// function changeHP(player) {
//   const $playerLife = document.querySelector(`.player${player.player} .life`);
//   player.hp -= randomizer();
//   if (player.hp < 0) {
//     player.hp = 0;
//   }
//   $playerLife.style.width = player.hp + "%";
// }

function playerWins(name) {
  const $winsTitle = createElement("div", "winsTitle");
  if (name === "Double Kill!") {
    $winsTitle.innerText = name;
  } else {
    $winsTitle.innerText = `${name} WINS!`;
  }
  return $winsTitle;
}

$randomButton.addEventListener("click", () => {
  player1.changeHP(randomizer(RANDOMIZE_MAX));
  console.log(randomizer(RANDOMIZE_MAX));
  player1.renderHP(player1.elHP());
  player2.changeHP(randomizer(RANDOMIZE_MAX));
  player2.renderHP(player2.elHP());
  // $arenas.appendChild(playerWins(winnerName));
  // $randomButton.disabled = true;
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

function randomizer(limit) {
  return Math.ceil(Math.random() * limit);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function declareWinner(winnerName) {
  $arenas.appendChild(playerWins(winnerName));
  $randomButton.disabled = true;
}
