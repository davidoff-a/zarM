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
  start: [
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  ],
  end: [
    "[time] - Результат удара [playerWins]: [playerLose] - труп",
    "[time] - [playerLose] погиб от удара бойца [playerWins]",
    "[time] - Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[time] - [playerDefense] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[time] - [playerDefense] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[time] - [playerDefense] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[time] - [playerDefense] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[time] - [playerDefense] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[time] - [playerDefense] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[time] - [playerDefense] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[time] - [playerDefense] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[time] - [playerDefense] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[time] - [playerDefense] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[time] - [playerDefense] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[time] - [playerDefense] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[time] - [playerDefense] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[time] - [playerDefense] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[time] - [playerDefense] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[time] - [playerDefense] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[time] - [playerDefense] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[time] - [playerDefense] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defense: [
    "[time] - [playerKick] потерял момент и храбрый [playerDefense] отпрыгнул от удара открытой ладонью в ключицу.",
    "[time] - [playerKick] не контролировал ситуацию, и потому [playerDefense] поставил блок на удар пяткой в правую грудь.",
    "[time] - [playerKick] потерял момент и [playerDefense] поставил блок на удар коленом по селезенке.",
    "[time] - [playerKick] поскользнулся и задумчивый [playerDefense] поставил блок на тычок головой в бровь.",
    "[time] - [playerKick] старался провести удар, но непобедимый [playerDefense] ушел в сторону от удара копчиком прямо в пятку.",
    "[time] - [playerKick] обманулся и жестокий [playerDefense] блокировал удар стопой в солнечное сплетение.",
    "[time] - [playerKick] не думал о бое, потому расстроенный [playerDefense] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[time] - [playerKick] обманулся и жестокий [playerDefense] блокировал удар стопой в солнечное сплетение.",
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

function createElement(tag, className) {
  const $element = document.createElement(tag);
  if (className && className.length > 0) {
    $element.classList.add(className);
  }
  return $element;
}

function determineWinner() {
  if (player1.hp && !player2.hp) {
    return player1;
  }
  if (!player1.hp && player2.hp) {
    return player2;
  }
  if (!player1.hp && !player2.hp) {
    return "Double Kill!";
  }
}

function getRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

function declareWinner(winner) {
  $arenas.appendChild(playerWins(winner.name));
  const $restartBtn = document.querySelector(".reloadWrap .button");
  $restartBtn.style.display = "block";
  $btnFight.disabled = true;
  generateLogs("end", winner);
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

// function generateLogs(type, attackPlayer, hitPoints = 0) {
//   let logRecord = "";
//   switch (type) {
//     case "start":
//       logRecord = insertDataToLogString(type, attackPlayer);
//       break;
//     case "hit":
//       logRecord = insertDataToLogString(type, attackPlayer, hitPoints);
//       break;
//     case "defense":
//       logRecord = insertDataToLogString(type, attackPlayer);
//       break;
//     case "end":
//       logRecord = insertDataToLogString(type, attackPlayer);
//       break;
//     case "draw":
//       logRecord = insertDataToLogString(type, attackPlayer);
//       break;
//   }
  
// }

$frmControl.addEventListener("submit", (event) => {
  event.preventDefault();
  const ENEMY = enemyAttack();
  const PLAYER = playerAttack();
  if ($CHAT.children.length === 0) {
    generateLogs("start", player1);
  }
  renderFight.apply(player1, [PLAYER, ENEMY]);
  renderFight.apply(player2, [ENEMY, PLAYER]);
  let winner = determineWinner();
  if (winner) {
    declareWinner(winner);
  }
});

function renderFight(attackerParams, defenderParams) {
  const FIGTHER = this.player === 1 ? player2 : player1;
  if (checkBlocked(attackerParams, defenderParams)) {
    this.changeHP(attackerParams.hitPoints);
    getBangImg(this.player);
    this.renderHP(this.elHP());
    generateLogs("hit", FIGTHER, attackerParams.hitPoints);
  } else {
    generateLogs("defense", FIGTHER);
  }
}

function generateLogs(typeStr, playerAttack, hits = 0) {
  const DEFENDER = playerAttack.player === 1 ? player2 : player1;
  const LOG_RECORD_TIME = new Date().toLocaleTimeString();
  const RELACE_EXPR_1 = /\[player(1|Kick|Wins)\]/gi;
  const RELACE_EXPR_2 = /\[player(2|Defense|Lose)\]/gi;
  let stringNum = 0;
  let logString = "";
  stringNum = getRandomNumber(RANDOMIZE_MIN, logs[typeStr].length - 1);
  if (typeStr === "hit") {
    logString = `${logs[typeStr][stringNum]} - ${hits} - [${DEFENDER.hp}/100]`;
  } else {
    logString = logs[typeStr][stringNum];
  }
  logString = logString
    .replace(RELACE_EXPR_1, playerAttack.name.toUpperCase())
    .replace(RELACE_EXPR_2, DEFENDER.name.toUpperCase())
    .replace("[time]", LOG_RECORD_TIME);

  $CHAT.insertAdjacentHTML("afterbegin", `<p>${logString}</p>`);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
$arenas.appendChild(createReloadButton());
