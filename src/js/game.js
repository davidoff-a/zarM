import { getRandomNumber, createElement } from "./utils.js";
import { generateLogs } from "./logs.js";
import { Player } from "./player.js";
import { data } from "./query.js";
import { arenaHTML, playerChoice } from "./buildHTML.js";

const QUERY_URLS = {
  getPlayers: "https://reactmarathon-api.herokuapp.com/api/mk/players",
  getDamageInfo: "https://reactmarathon-api.herokuapp.com/api/mk/player/fight",
};

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];
let player1;
let player2;

class Game {
  constructor() {
    this.$CONTENT = document.querySelector(".content");
  }

  init() {
    window.addEventListener("DOMContentLoaded", () => {
      this.startPage();
    });

    // const $LOGO = document.querySelector(".logo");
  }

  startPage() {
    const HIDE_LOGO = new Promise((resolve) => {
      setTimeout(() => {
        const $LOGO = document.querySelector(".logo");
        $LOGO.classList.add("off");
        resolve($LOGO);
      }, 1500);
    })
      .then(async (item) => {
        await new Promise((resolve) => {
          setTimeout(() => {
            item.style.zIndex = "-1";
          }, 3000);
          resolve();
        });
      })
      .then(
        setTimeout(() => {
          this.addRoster();
        }, 1000)
      )
      .then(
        setTimeout(() => {
          this.operateDoors();
        }, 3000)
      );
  }

  async addRoster() {
    localStorage.removeItem("player1");
    localStorage.removeItem("player2");
    this.insertHTMLcode(".content", playerChoice());

    const PLAYERS = await data.getPlayers(QUERY_URLS.getPlayers);

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
        this.transitionScenes(arenaHTML(), ".content");
      });
    });
  }

  insertHTMLcode(selector, HTMLcode) {
    const $TAG = document.querySelector(selector);
    $TAG.innerHTML = "";
    $TAG.append(HTMLcode);
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

  transitionScenes(HTMLcode, selector = ".content", timeout = 3000) {
    const CHANGE = new Promise(async (resolve) => {
      setTimeout(() => {
        this.operateDoors();
      }, timeout);

      resolve();
    })
      .then(() => {
        setTimeout(() => {
          this.insertHTMLcode(selector, HTMLcode);
          const $ARENA = document.querySelector(".arenas");
          const $FORM_CONTROL = document.querySelector(".control");
          if ($ARENA) {
            $ARENA.classList.add(`arena${getRandomNumber(5, 1)}`);
            $FORM_CONTROL.addEventListener("submit", (event) => {
              event.preventDefault();
              this.startRound();
            });
            this.start();
          } else {
            this.addRoster();
          }

          // resolve();
        }, 8000);
      })
      .then(() => {
        setTimeout(() => {
          this.operateDoors();
        }, 9000);
      });
  }

  start = async () => {
    //add players to arena

    const p1 = JSON.parse(localStorage.getItem("player1"));
    const p2 = JSON.parse(localStorage.getItem("player2"));
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
    await document
      .querySelector(".arenas")
      .appendChild(this.createReloadButton());
    generateLogs(
      { name: player1.name },
      { dealType: "start", name: player2.name }
    );
  };

  operateDoors = () => {
    // setTimeout(() => {
    const $SLIDE_DOOR_LEFT = document.querySelector(".wall_left");
    const $SLIDE_DOOR_RIGHT = document.querySelector(".wall_right");
    $SLIDE_DOOR_LEFT.classList.toggle("open");
    $SLIDE_DOOR_RIGHT.classList.toggle("open");
    // }
    // , timeOut);
  };

  startRound = async () => {
    const PLAYER = this.playerAttack();
    const attackData = await data.postAttackData(
      QUERY_URLS.getDamageInfo,
      PLAYER
    );

    attackData.player1.defence = PLAYER.defense;
    attackData.player1.name = player1.name;
    attackData.player2.name = player2.name;
    attackData.player1.player = player1.player;
    attackData.player2.player = player2.player;
    this.getRoundResult(attackData);

    if (this.determineWinner()) {
      this.declareMatchResult(this.determineWinner());
    }
  };

  getRoundResult(fightInfoObj) {
    const ARR_PLAYERS = [player1, player2];
    ARR_PLAYERS.forEach((player) => {
      const ABUSER = player.player === 1 ? player2 : player1;
      const VICTIM = ABUSER.player === 1 ? player2 : player1;
      const ATTACKER = fightInfoObj[`player${ABUSER.player}`];
      const DEFENDER = fightInfoObj[`player${VICTIM.player}`];
      if (ATTACKER.hit === DEFENDER.defence) {
        DEFENDER.dealType = "defense";
        VICTIM.showHitMsg(DEFENDER);
        generateLogs(ATTACKER, DEFENDER);
      } else {
        DEFENDER.dealType = "hit";
        VICTIM.changeHP(ATTACKER);
        VICTIM.renderHP(VICTIM.elHP());
        VICTIM.showHitMsg(DEFENDER);
        DEFENDER.hp = VICTIM.hp;
        generateLogs(ATTACKER, DEFENDER);
      }
    });
  }

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
    const MATCH_RESULT = {
      dealType: "",
      hits: 0,
    };
    if (name !== "draw") {
      MATCH_RESULT.dealType = "end";
    } else {
      MATCH_RESULT.dealType = "draw";
    }
    generateLogs(
      { name: player1.name },
      { name: player2.name, dealType: MATCH_RESULT.dealType }
    );
    const $restartBtn = document.querySelector(".reloadWrap .button");
    const $btnFight = document.querySelector("#Fight");

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

  removeClasses(selector, className) {
    const arrOfElements = document.querySelectorAll(`${selector}`);
    arrOfElements.forEach((el) => {
      if (el && el.classList.contains(className)) {
        el.classList.remove(className);
      }
    });
  }

  createReloadButton() {
    const $wrap = createElement("div", ["reloadWrap"]);
    const $wrapBtn = createElement("button", ["button"]);
    $wrapBtn.style.display = "none";
    $wrapBtn.innerText = "RESTART";
    $wrap.appendChild($wrapBtn);
    $wrapBtn.addEventListener("click", () => {
      this.transitionScenes(playerChoice(), ".content", 1000);
    });
    return $wrap;
  }

  playerAttack() {
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
}

const GAME = new Game();

export { GAME, ATTACK };
