import { getRandomNumber, createElement } from "./utils.js";
import { generateLogs } from "./logs.js";
import { Player } from "./player.js";
import { data } from "./query.js";
import { $ARENA_HTML, $PLAYER_CHOICE } from "./buildHTML.js";
import { addRoster } from "./choice.js";


const ATTACK = ["head", "body", "foot"];
let player1;
let player2;

class Game {
  constructor() {
    this.$ROOT = document.querySelector(".root");
  }

  init() {
    window.addEventListener("DOMContentLoaded", () => {
      const ROSTER = new Promise((resolve, reject) => {
        addRoster();
        resolve();
      })
        .then(() => {
          setTimeout(() => {
            this.operateDoors();
          }, 1500);
          setTimeout(() => {
            $LOGO.classList.add("off");
            setTimeout(() => {
              $LOGO.style.zIndex = "-1";
            }, 3000);
          }, 3000);
        })
      });
      // this.$ROOT.insertAdjacentHTML("afterbegin", $PLAYER_CHOICE);
      // const $ARENA = document.querySelector(".arenas");
      // const $FORM = document.querySelector(".control");
      const $LOGO = document.querySelector(".logo");
      // $ARENA.classList.add(`arena${getRandomNumber(5, 1)}`);
      
      
    // this.start();
  }

  start = async () => {
    const PLAYERS = await data.getPlayers();
    const OPPOSITE_FIGHTER = await data.getEnemyPlayer();
    const p1 = PLAYERS[getRandomNumber(PLAYERS.length - 1)];
    const p2 = OPPOSITE_FIGHTER;
    player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: "arenas",
    });
    player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: "arenas",
    });

    document.querySelector(".arenas").appendChild(this.createPlayer(player1));
    document.querySelector(".arenas").appendChild(this.createPlayer(player2));
    document.querySelector(".arenas").appendChild(createReloadButton());
    generateLogs("start", player1, player2);

    $frmControl.addEventListener("submit", (event) => {
      event.preventDefault();
      this.startRound();
    });
  };

  startRound = async () => {
    const PLAYER = playerAttack();
    const HOOK = await data.postAttackData(PLAYER);
    const ENEMY = HOOK.player2;
    let roundResult;

    roundResult = player1.getRoundResult(PLAYER, ENEMY, player2);
    generateLogs(roundResult.dealType, player1, player2, roundResult.value);
    roundResult = player2.getRoundResult(ENEMY, PLAYER, player1);
    generateLogs(roundResult.dealType, player2, player1, roundResult.value);
    if (this.determineWinner()) {
      this.declareMatchResult(this.determineWinner());
    }
  };

  determineWinner() {
    let winner;
    if (player1.hp === 0 && player2.hp === 0) {
      winner = { name: "draw" };
    }
    if (!player1.hp && player2.hp) {
      winner = player2;
    }
    if (!player2.hp && player1.hp) {
      winner = player1;
    }
    return winner;
  }

  declareMatchResult({ name }) {
    this.$ARENA.appendChild(this.showPlayerWins(name));
    if (name !== "draw") {
      generateLogs("end", player1, player2);
    } else {
      generateLogs("draw", player1, player2);
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

  createPlayer(playerObj) {
    const { player: playerNumber, hp, name, img } = playerObj;
    const $player = createElement("div", `player${playerNumber}`);
    const $progressbar = createElement("div", "progressbar");
    const $life = createElement("div", "life");
    const $name = createElement("div", "name");
    const $character = createElement("div", "character");
    const $charImg = createElement("img");
    const $bangImg = createElement("img");

    $life.style.width = `${hp}%`;
    $name.innerText = `${name}`;
    $bangImg.classList.add(`bang`, `fighter${playerNumber}`);
    $charImg.src = img;
    $character.appendChild($charImg);
    $character.appendChild($bangImg);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    return $player;
  }

  enemyAttack = async () => {
    const hit = ATTACK[getRandomNumber(3) - 1];
    const defense = ATTACK[getRandomNumber(3) - 1];
    const hitPoints = getRandomNumber(HIT[hit]);

    return {
      hit,
      defense,
      hitPoints,
    };
  }

  operateDoors = () => {
    const $SLIDE_DOOR_LEFT = document.querySelector(".wall_left");
    const $SLIDE_DOOR_RIGHT = document.querySelector(".wall_right");
    $SLIDE_DOOR_LEFT.classList.toggle("open");
    $SLIDE_DOOR_RIGHT.classList.toggle("open");
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

function playerAttack() {
  const MY_ATTACK = {};
  for (let item of $frmControl) {
    if (item.checked && item.name === "hit") {
      MY_ATTACK.value = getRandomNumber(HIT[item.value]);
      MY_ATTACK.hit = item.value;
    }

    if (item.checked && item.name === "defense") {
      MY_ATTACK.defense = item.value;
    }
    item.checked = false;
  }

  return MY_ATTACK;
}

export { GAME, ATTACK, playerAttack };


// setTimeout(() => {
//   $FORM.style.display = "flex";
//   setTimeout(() => {
//     const FIGHT_SOUND = new Audio("./assets/sound/fight/mk3-09020.mp3");
//     FIGHT_SOUND.play();
//   }, 3500);
// }, 5000);