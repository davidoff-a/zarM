import { getRandomNumber, createElement } from "./utils.js";
import { $CHAT, generateLogs } from "./logs.js";
import { player1, player2 } from "./player.js";
import { playSound } from "./audio.js";
import { $arenas } from "./arena.js";

const ATTACK = ["head", "body", "foot"];
class Game {
  // constructor() { }

  start() {
    window.addEventListener("DOMContentLoaded", () => {
      $arenas.classList.add(`arena${getRandomNumber(5, 1)}`);
    });
    $frmControl.addEventListener("submit", (event) => {
      event.preventDefault();
      const ENEMY = enemyAttack();
      const PLAYER = playerAttack();
      if ($CHAT.children.length === 0) {
        generateLogs("start", player1);
      }
      player1.renderFight(PLAYER, ENEMY);
      player2.renderFight(ENEMY, PLAYER);

      let winner = this.determineWinner();

      if (winner) {
        this.declareWinner(winner);
      }
    });
  }

  

  determineWinner() {
    if (!player1.hp && player2.hp) {
      return player2;
    }
    if (player1.hp && !player2.hp) {
      return player1;
    }
    if (!player1.hp && !player2.hp) {
      return declareDraw();
    }
  }

  declareDraw = () => {
    generateLogs("draw", player1);
    return "Double Kill!";
  };
  declareWinner(winner) {
    let name;
    if (typeof winner === "object") {
      name = winner.name;
      playSound("wins");
    } else {
      name = winner;
      playSound("draw");
    }

    $arenas.appendChild(showPlayerWins(name));
    const $restartBtn = document.querySelector(".reloadWrap .button");
    $restartBtn.style.display = "block";
    $btnFight.disabled = true;
    generateLogs("end", winner);
  }

  showPlayerWins(name) {
    const $winsTitle = createElement("div", "winsTitle");
    name === "Double Kill!"
      ? ($winsTitle.innerText = name)
      : ($winsTitle.innerText = `${name} WINS!`);
    return $winsTitle;
  }
}

const $frmControl = document.querySelector(".control");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const $btnFight = document.querySelector("#Fight");




const GAME = new Game();

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


$arenas.appendChild(player1.createPlayer());
$arenas.appendChild(player2.createPlayer());
$arenas.appendChild(createReloadButton());

export { createReloadButton, GAME, ATTACK };
