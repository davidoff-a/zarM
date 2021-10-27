import { getRandomNumber, createElement, checkBlocked } from "./utils.js";
import { $CHAT, generateLogs } from "./logs.js";
import { player1, player2 } from "./player.js";
import { playSound } from "./audio.js";
import { $arenas } from "./arena.js";

const $frmControl = document.querySelector(".control");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const $btnFight = document.querySelector("#Fight");

const ATTACK = ["head", "body", "foot"];

const MESSAGES = {
  hit: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"],
  defense: ["block.gif"],
};

const declareDraw = () => {
  generateLogs("draw", player1);
  return "Double Kill!";
};

const determineWinner = () => {
  if (!player1.hp && player2.hp) {
    return player2;
  }
  if (player1.hp && !player2.hp) {
    return player1;
  }
  if (!player1.hp && !player2.hp) {
    return declareDraw();
  }
};

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

function showHitMsg(numPlayer, bodyPart, type) {
  const IMG_PATH = `./assets/messages/${type}/${MESSAGES[type][getRandomNumber(
    MESSAGES[type].length - 1)]
  }`;
  const $punchImg = document.querySelector(`.bang.fighter${numPlayer}`);
  const POW_LEVEL = (ATTACK.indexOf(bodyPart) + 1) * 30;
  $punchImg.src = IMG_PATH;
  $punchImg.style.top = `${getRandomNumber(
    POW_LEVEL,
    POW_LEVEL > 30 ? POW_LEVEL - 30 : 15
  )}%`;

  setTimeout(() => {
    $punchImg.src = "";
  }, 1500);
}

function fight() {
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
}

function renderFight(attackerParams, defenderParams) {
  const DEFENDER = this.player === 1 ? player2 : player1;
  const { hit, hitPoints } = attackerParams;
  const { defense } = defenderParams;
  if (checkBlocked(hit, defense)) {
    this.changeHP(hitPoints);
    showHitMsg(this.player, hit, "hit");
    this.renderHP(this.elHP());
    generateLogs("hit", DEFENDER, hitPoints);
    playSound("hit");
  } else {
    generateLogs("defense", DEFENDER);
    showHitMsg(this.player, defense, "defense");
    playSound("block");
  }
}

function enemyAttack() {
  const hit = ATTACK[getRandomNumber(3) - 1];
  const defense = ATTACK[getRandomNumber(3) - 1];
  const hitPoints = getRandomNumber(HIT[hit]);
  return {
    hit,
    defense,
    hitPoints,
  };
}

function playerAttack() {
  const MY_ATTACK = {};
  for (let item of $frmControl) {
    if (item.checked && item.name === "hit") {
      MY_ATTACK.hitPoints = getRandomNumber(HIT[item.value]);
      MY_ATTACK.hit = item.value;
    }

    if (item.checked && item.name === "defense") {
      MY_ATTACK.defense = item.value;
    }
    item.checked = false;
  }
  return MY_ATTACK;
}

function declareWinner(winner) {
  let name; 
  if (typeof winner === "object") {
    name = winner.name;
    playSound("wins")
  } else {
    name = winner;
    playSound("draw");
  };

  $arenas.appendChild(showPlayerWins(name));
  const $restartBtn = document.querySelector(".reloadWrap .button");
  $restartBtn.style.display = "block";
  $btnFight.disabled = true;
  generateLogs("end", winner);
  
}

function showPlayerWins(name) {
  const $winsTitle = createElement("div", "winsTitle");
  name === "Double Kill!"
    ? ($winsTitle.innerText = name)
    : ($winsTitle.innerText = `${name} WINS!`);
  return $winsTitle;
}

$arenas.appendChild(player1.createPlayer());
$arenas.appendChild(player2.createPlayer());
$arenas.appendChild(createReloadButton());

export {
  fight,
  renderFight,
  showHitMsg,
  createReloadButton,
  ATTACK,
  $frmControl,
};
