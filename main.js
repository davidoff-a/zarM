const $arenas = document.querySelector(".arenas");
const $btnFight = document.querySelector("#Fight");
const $frmControl = document.querySelector(".control");
const RANDOMIZE_MAX = 20;
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];
const BANGS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

function createPlayer(player) {
  const $player = createElement("div", `player${player.player}`);
  const $progressbar = createElement("div", "progressbar");
  const $life = createElement("div", "life");
  $life.style.width = `${player.hp}%`;
  const $name = createElement("div", "name");
  $name.innerText = `${player.name}`;
  const $character = createElement("div", "character");
  const $charImg = createElement("img");
  const $bangImg = createElement("img");
  $bangImg.classList.add(`bang`, `fighter${player.player}`);
  $charImg.src = `http://reactmarathon-api.herokuapp.com/assets/${player.name}.gif`;
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

function attack() {
  console.log(`${this.name} Fight`);
}

function playerWins(name) {
  const $winsTitle = createElement("div", "winsTitle");
  if (name === "Double Kill!") {
    $winsTitle.innerText = name;
  } else {
    $winsTitle.innerText = `${name} WINS!`;
  }
  return $winsTitle;
}

$frmControl.addEventListener("submit", (event) => {
  event.preventDefault();
  const ENEMY = enemyAttack();
  const MY_ATTACK = {};
  for (let item of $frmControl) {
    if (item.checked && item.name === "hit") {
      MY_ATTACK.hitPoints = randomizer(HIT[item.value]);
      MY_ATTACK.hit = item.value;
    }

    if (item.checked && item.name === "defense") {
      MY_ATTACK.defense = item.value;
    }
    item.checked = false;
  }
  renderFight.apply(player1, [MY_ATTACK, ENEMY]);
  renderFight.apply(player2, [ENEMY, MY_ATTACK]);
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

function declareWinner(winnerName) {
  $arenas.appendChild(playerWins(winnerName));
  const $restartBtn = document.querySelector(".reloadWrap .button");
  $restartBtn.style.display = "block";
  $btnFight.disabled = true;
}

function createReloadButton() {
  const $wrap = createElement("div", "reloadWrap");
  const $wrapBtn = createElement("button", "button");
  $wrapBtn.style.display = "none";
  $wrapBtn.innerText = "RESTART";
  $wrap.appendChild($wrapBtn);
  $wrapBtn.addEventListener("click", () => {
    window.location.reload();
  });
  return $wrap;
}

function enemyAttack() {
  const hit = ATTACK[randomizer(3) - 1];
  const defense = ATTACK[randomizer(3) - 1];
  const hitPoints = randomizer(HIT[hit]);
  return {
    hit,
    defense,
    hitPoints,
  };
}

function checkBlocked(objAttacks, objDefense) {
  if (objAttacks.hit === objDefense.defense) {
    return 0;
  } else {
    return objAttacks.hitPoints;
  }
}

function getBangImg(numPlayer) {
  const IMG_PATH = `./assets/mk/${randomizer(BANGS.length - 1)}.png`;
  const $punchImg = document.querySelector(`.bang.fighter${numPlayer}`);
  $punchImg.src = IMG_PATH;
  setTimeout(() => {
    $punchImg.src = "";
  }, 1500);
}

function renderFight(attackerParams, defenderParams) {
  if (checkBlocked(attackerParams, defenderParams)) {
    this.changeHP(attackerParams.hitPoints);
    getBangImg(this.player);
    this.renderHP(this.elHP());
  }
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
$arenas.appendChild(createReloadButton());
