import { getRandomNumber, createElement } from "./utils.js";
import { generateLogs, $CHAT } from "./logs.js";
import { Player } from "./player.js";

const ATTACK = ["head", "body", "foot"];
const SOUND_LIB = {
  hit: "./assets/sound/hitsounds/mk3-00",
  defense: "./assets/sound/block/mk3-09",
  wins: "./assets/sound/wins/",
  draw: "./assets/sound/wins/",
};
class Game {
  constructor() {
    this.$ARENA = document.querySelector(".arenas");
    this.player1 = new Player(1, "scorpion");
    this.player2 = new Player(2, "sonya");
  }

  start() {
    window.addEventListener("DOMContentLoaded", () => {
      this.$ARENA.classList.add(`arena${getRandomNumber(5, 1)}`);
    });
    this.$ARENA.appendChild(this.player1.createPlayer());
    this.$ARENA.appendChild(this.player2.createPlayer());
    this.$ARENA.appendChild(createReloadButton());
    generateLogs("start", this.player1, this.player2);

    $frmControl.addEventListener("submit", (event) => {
      event.preventDefault();
      this.startRound();
    });
  }

  startRound() {
    const ENEMY = enemyAttack();
    const PLAYER = playerAttack();
    let roundResult;

    roundResult = this.player1.getRoundResult(PLAYER, ENEMY, this.player2);
    generateLogs(
      roundResult.dealType,
      this.player1,
      this.player2,
      roundResult.hitPoints
    );
    roundResult = this.player2.getRoundResult(ENEMY, PLAYER, this.player1);
    generateLogs(
      roundResult.dealType,
      this.player2,
      this.player1,
      roundResult.hitPoints
    );
    if (this.determineWinner()) {
      console.log(this.determineWinner());
      this.declareMatchResult(this.determineWinner());
    }
    // this.player2.attack(ENEMY, PLAYER);
    // const winner = this.determineWinner();
    // this.declareWinner(winner);
  }
  determineWinner() {
    let winner;
    console.log(this.player1.hp, this.player2.hp);
    if (this.player1.hp === 0 && this.player2.hp === 0) {
      winner = { name: "draw" };
    }
    if (!this.player1.hp && this.player2.hp) {
      winner = this.player2;
    }
    if (!this.player2.hp && this.player1.hp) {
      winner = this.player1;
    }
    return winner;
  }

  declareMatchResult({ name }) {
    this.$ARENA.appendChild(this.showPlayerWins(name));
    if (name !== "draw") {
      generateLogs("end", this.player1, this.player2);
    } else {
      generateLogs("draw", this.player1, this.player2);
    }

    const $restartBtn = document.querySelector(".reloadWrap .button");
    $restartBtn.style.display = "block";
    $btnFight.disabled = true;
  }

  showPlayerWins(name) {
    const $winsTitle = createElement("div", "winsTitle");
    name === "draw"
      ? ($winsTitle.innerText = "Double KILL!")
      : ($winsTitle.innerText = `${name} WINS!`);
    return $winsTitle;
  }

  playSound(kind) {
    const PATH = SOUND_LIB[kind];
    let soundPathEnd = "";
    switch (kind) {
      case "hit":
        soundPathEnd = `${getRandomNumber(36, 10)}${
          getRandomNumber(1) * 5
        }.mp3`;
        break;
      case "defense":
        soundPathEnd = `${getRandomNumber(4, 1)}.mp3`;
        break;
      case "wins":
        soundPathEnd = `victory.mp3`;
        break;
      case "draw":
        soundPathEnd = `draw.mp3`;
        break;
    }
    const SOUND = new Audio(`${PATH}${soundPathEnd}`);
    SOUND.play();
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

export { createReloadButton, GAME, ATTACK };
