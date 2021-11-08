import { getRandomNumber, createElement } from "./utils.js";
import { generateLogs } from "./logs.js";
import { Player } from "./player.js";
import { data } from "./query.js";
import { $ARENA_HTML, $PLAYER_CHOICE } from "./buildHTML.js";
// import { addRoster } from "./choice.js";

const ATTACK = ["head", "body", "foot"];
let player1;
let player2;

class Game {
  constructor() {
    this.$CONTENT = document.querySelector(".content");
  }

  init() {
    window.addEventListener("DOMContentLoaded", () => {
      const ROSTER = new Promise((resolve, reject) => {
        this.addRoster();
        resolve();
      }).then(() => {
        setTimeout(() => {
          this.operateDoors();
        }, 1500);
        setTimeout(() => {
          $LOGO.classList.add("off");
          setTimeout(() => {
            $LOGO.style.zIndex = "-1";
          }, 3000);
        }, 3000);
      });
    });

    const $LOGO = document.querySelector(".logo");
  }

  start = async () => {
    //add players to arena

    const p1 = JSON.parse(localStorage.getItem("player1"));
    const p2 = JSON.parse(localStorage.getItem("player2"));
    // console.table(p1, p2);
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

    await document
      .querySelector(".arenas")
      .appendChild(this.createPlayer(player1));
    await document
      .querySelector(".arenas")
      .appendChild(this.createPlayer(player2));
    // add reload button
    await document.querySelector(".arenas").appendChild(createReloadButton());
    generateLogs("start", player1, player2);
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
    document.querySelector(".arenas").appendChild(this.showPlayerWins(name));
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
    const $winsTitle = createElement("div", ["winsTitle"]);
    name === "draw"
      ? ($winsTitle.innerText = "Double KILL!")
      : ($winsTitle.innerText = `${name} WINS!`);
    return $winsTitle;
  }

  createPlayer(playerObj) {
    const { player: playerNumber, hp, name, img } = playerObj;
    const $player = createElement("div", [`player${playerNumber}`]);
    const $progressbar = createElement("div", ["progressbar"]);
    const $life = createElement("div", ["life"]);
    const $name = createElement("div", ["name"]);
    const $character = createElement("div", ["character"]);
    const $charImg = createElement("img");
    const $bangImg = createElement("img");

    $life.style.width = `${hp}%`;
    $name.innerText = `${name}`;
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    $charImg.src = img;
    $character.appendChild($charImg);
    $character.appendChild($bangImg);
    $bangImg.classList.add(`bang`, `fighter${playerNumber}`);
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
  };

  operateDoors = () => {
    const $SLIDE_DOOR_LEFT = document.querySelector(".wall_left");
    const $SLIDE_DOOR_RIGHT = document.querySelector(".wall_right");
    $SLIDE_DOOR_LEFT.classList.toggle("open");
    $SLIDE_DOOR_RIGHT.classList.toggle("open");
  };

  async addRoster() {
    localStorage.removeItem("player1");
    localStorage.removeItem("player2");
    this.insertHTMLcode(".content", $PLAYER_CHOICE);

    const PLAYERS = await data.getPlayers();

    let imgSrc = null;
    this.createEmptyPlayerBlock();

    PLAYERS.forEach((item) => {
      const el = createElement("div", ["fighter-ava", `div${item.id}`]);
      const img = createElement("img");
      img.src = item.avatar;
      img.alt = item.name;

      el.appendChild(img);
      document.querySelector(".parent").appendChild(el);

      el.addEventListener("mousemove", () => {
        this.showHideChoosenCharacter(imgSrc, item);
      });

      el.addEventListener("mouseout", () => {
        this.showHideChoosenCharacter(imgSrc, item);
      });

      el.addEventListener("click", (event) => {
        this.chooseCharacterForPlayer(event, item);
        this.chooseCharacterForOpponent(PLAYERS);
        this.transitionToArena();
      });
    });
  }

  insertHTMLcode(selector, HTMLcode) {
    const $TAG = document.querySelector(selector);
    $TAG.innerHTML = HTMLcode;
  }

  createEmptyPlayerBlock() {
    const el = createElement("div", ["fighter-ava", "div11", "disabled"]);
    const img = createElement("img");
    img.src = "http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png";
    el.appendChild(img);
    document.querySelector(".parent").appendChild(el);
  }

  showHideChoosenCharacter(imageSrc, playerObj) {
    if (imageSrc === null) {
      imageSrc = playerObj.img;
      const $img = createElement("img");
      $img.src = imageSrc;
      document.querySelector(".warrior").innerHTML = "";
      document.querySelector(".warrior").appendChild($img);
    } else {
      imageSrc = null;
      document.querySelector(".warrior").innerHTML = "";
    }
  }

  chooseCharacterForPlayer(event, playerObj) {
    this.removeClasses(".fighter-ava", "active");
    event.target.classList.toggle("active");
    localStorage.setItem("player1", JSON.stringify(playerObj));
  }

  chooseCharacterForOpponent(arrCharacters) {
    const ENEMY = arrCharacters[getRandomNumber(22)];
    const $ENEMY_AVATAR = document.querySelector(`.div${ENEMY.id}`);
    this.removeClasses(".fighter-ava", "active-p2");

    $ENEMY_AVATAR.classList.toggle("active-p2");
    localStorage.setItem("player2", JSON.stringify(ENEMY));
  }

  transitionToArena() {
    setTimeout(() => {
      GAME.operateDoors();
      setTimeout(() => {
        const $CONTENT = document.querySelector(".content");
        $CONTENT.innerHTML = $ARENA_HTML;
        const $ARENA = document.querySelector(".arenas");
        $ARENA.classList.add(`arena${getRandomNumber(5, 1)}`);
        setTimeout(() => {
          GAME.operateDoors();
          setTimeout(() => {
            const $FORM_CONTROL = document.querySelector(".control");
            $FORM_CONTROL.addEventListener("submit", (event) => {
              event.preventDefault();
              GAME.startRound();
            });
            GAME.start();
            setTimeout(() => {
              $FORM_CONTROL.style.display = "flex";
            }, 1500);
          }, 1000);
        }, 3000);
      }, 5000);
    }, 3000);
  }

  removeClasses(selector, className) {
  const arrOfElements = document.querySelectorAll(`${selector}`);
  arrOfElements.forEach((el) => {
    if (el && el.classList.contains(className)) {
      el.classList.remove(className);
    }
  });
}
}

// const $frmControl = document.querySelector(".control");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const $btnFight = document.querySelector("#Fight");

const GAME = new Game();

function createReloadButton() {
  const $wrap = createElement("div", ["reloadWrap"]);
  const $wrapBtn = createElement("button", ["button"]);
  $wrapBtn.style.display = "none";
  $wrapBtn.innerText = "RESTART";
  $wrap.appendChild($wrapBtn);
  $wrapBtn.addEventListener("click", () => {
    // window.location.reload();
    GAME.operateDoors();
    addRoster();
  });
  return $wrap;
}

function playerAttack() {
  const MY_ATTACK = {};
  const $frmControl = document.querySelector(".control");
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
