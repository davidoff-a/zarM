const $arenas = document.querySelector(".arenas");
const $btnFight = document.querySelector("#Fight");
const $frmControl = document.querySelector(".control");
const RANDOMIZE_MAX = 20;
const RANDOMIZE_MIN = 0;
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
const logs = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defense: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};
const $CHAT = document.querySelector(".chat");
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
  const PLAYER = playerAttack();
  renderFight.apply(player1, [PLAYER, ENEMY]);
  renderFight.apply(player2, [ENEMY, PLAYER]);
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

function getRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
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
  const hit = ATTACK[getRandomNumber(RANDOMIZE_MIN, 3) - 1];
  const defense = ATTACK[getRandomNumber(RANDOMIZE_MIN, 3) - 1];
  const hitPoints = getRandomNumber(RANDOMIZE_MIN, HIT[hit]);
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
  const IMG_PATH = `./assets/mk/${getRandomNumber(
    RANDOMIZE_MIN,
    BANGS.length - 1
  )}.png`;
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
    generateLog("hit", player2, player1);
  }
}

function playerAttack() {
  const MY_ATTACK = {};
  for (let item of $frmControl) {
    if (item.checked && item.name === "hit") {
      MY_ATTACK.hitPoints = getRandomNumber(RANDOMIZE_MIN, HIT[item.value]);
      MY_ATTACK.hit = item.value;
    }

    if (item.checked && item.name === "defense") {
      MY_ATTACK.defense = item.value;
    }
    item.checked = false;
  }
  return MY_ATTACK;
}

function generateLog(type, attackPlayer, defensePlayer) {
  const LOG_RECORD = logs[type][0]
    .replace("[playerKick]", player1.name)
    .replace("[playerDefence]", player2.name);
  $CHAT.insertAdjacentHTML("afterbegin", `<p>${LOG_RECORD}</p>`);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
$arenas.appendChild(createReloadButton());
