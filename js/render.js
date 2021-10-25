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

const BANGS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

function getBangImg(numPlayer, bodyPart) {
  const IMG_PATH = `./assets/mk/${getRandomNumber(BANGS.length - 1)}.png`;
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
  if (checkBlocked(attackerParams, defenderParams)) {
    this.changeHP(hitPoints);
    getBangImg(this.player, hit);
    this.renderHP(this.elHP());
    generateLogs("hit", DEFENDER, hitPoints);
    playSound("hit");
  } else {
    generateLogs("defense", DEFENDER);
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

function determineWinner() {
  if (player1.hp && !player2.hp) {
    return player1;
  }
  if (!player1.hp && player2.hp) {
    return player2;
  }
  if (!player1.hp && !player2.hp) {
    generateLogs("draw", player1);
    return "Double Kill!";
  }
}

function declareWinner(winner) {
  const { name } = winner;
  $arenas.appendChild(playerWins(name));
  const $restartBtn = document.querySelector(".reloadWrap .button");
  $restartBtn.style.display = "block";
  $btnFight.disabled = true;
  generateLogs("end", winner);
  playSound("wins");
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

export {
  fight,
  renderFight,
  getBangImg,
  createReloadButton,
  BANGS,
  ATTACK,
  $frmControl,
};
