import { getRandomNumber, createElement } from "./utils.js";
import { generateLogs, LOGS } from "./logs.js";
import { Player } from "./player.js";
import { data } from "./query.js";
import { $ARENA_HTML, $PLAYER_CHOICE } from "./buildHTML.js";
import { playSound, definePathToAudio } from "./audio.js";

const WIN_SOUND = {
  KABAL: {
    winsound: "09225.mp3",
    winState: "../assets/chars/win/kabal_wins.png",
    loseState: "../assets/chars/lose/KABAL.gif",
  },
  JAX: {
    winsound: "09230.mp3",
    winState: "../assets/chars/win/JAX_wins.gif",
    loseState: "../assets/chars/lose/JAX.gif",
  },
  KANO: {
    winsound: "09235.mp3",
    winState: "../assets/chars/win/KANO_wins.png",
    loseState: "../assets/chars/lose/KANO.gif",
  },
  RAIN: {
    winsound: "09145.mp3",
    winState: "../assets/chars/win/RAIN_wins.png",
    loseState: "../assets/chars/lose/RAIN.gif",
  },
  "LIU KANG": {
    winsound: "09245.mp3",
    winState: "../assets/chars/win/LIU-KANG_wins.png",
    loseState: "../assets/chars/lose/LIU-KANG.gif",
  },
  "NOOB SAIBOT": {
    winsound: "09145.mp3",
    winState: "../assets/chars/win/NOOB-SAIBOT_wins.png",
    loseState: "../assets/chars/lose/NOOB-SAIBOT.gif",
  },
  "SHANG TSUNG": {
    winsound: "09255.mp3",
    winState: "../assets/chars/win/SHANG-TSUNG_wins.png",
    loseState: "../assets/chars/lose/SHANG-TSUNG.gif",
  },
  "SUB-ZERO": {
    winsound: "09280.mp3",
    winState: "../assets/chars/win/SUB-ZERO_wins.png",
    loseState: "../assets/chars/lose/SUB-ZERO.gif",
  },
  SMOKE: {
    winsound: "09265.mp3",
    winState: "../assets/chars/win/SMOKE_wins.png",
    loseState: "../assets/chars/lose/SMOKE.gif",
  },
  SONYA: {
    winsound: "09270.mp3",
    winState: "../assets/chars/win/SONYA_wins.png",
    loseState: "../assets/chars/lose/SONYA.gif",
  },
  STRYKER: {
    winsound: "09275.mp3",
    winState: "../assets/chars/win/SRTYKER_wins.png",
    loseState: "../assets/chars/lose/SRTYKER.gif",
  },
  "SUB-ZERO": {
    winsound: "09280.mp3",
    winState: "../assets/chars/win/SUB-ZERO_wins.png",
    loseState: "../assets/chars/lose/SUB-ZERO.gif",
  },
  "KUNG LAO": {
    winsound: "09285.mp3",
    winState: "../assets/chars/win/KUNG-LAO_wins.gif",
    loseState: "../assets/chars/lose/KUNG-LAO.gif",
  },
  CYRAX: {
    winsound: "09290.mp3",
    winState: "../assets/chars/win/CYRAX_wins.png",
    loseState: "../assets/chars/lose/CYRAX.gif",
  },
  "NIGHT WOLF": {
    winsound: "09295.mp3",
    winState: "../assets/chars/win/NIGHT-WOLF_wins.png",
    loseState: "../assets/chars/lose/NIGHT-WOLF.gif",
  },
  SEKTOR: {
    winsound: "09300.mp3",
    winState: "../assets/chars/win/SECTOR_wins.gif",
    loseState: "../assets/chars/lose/SECTOR.gif",
  },
  SINDEL: {
    winsound: "09305.mp3",
    winState: "../assets/chars/win/SINDEL_wins.png",
    loseState: "../assets/chars/lose/SINDEL.gif",
  },
  ERMAC: {
    winsound: "21010.mp3",
    winState: "../assets/chars/win/ERMAC_wins.png",
    loseState: "../assets/chars/lose/ERMAC.gif",
  },
  KITANA: {
    winsound: "21025.mp3",
    winState: "../assets/chars/win/KITANA_wins.png",
    loseState: "../assets/chars/lose/KITANA.gif",
  },
  MILEENA: {
    winsound: "21055.mp3",
    winState: "../assets/chars/win/MILEENA_wins.png",
    loseState: "../assets/chars/lose/MILEENA.gif",
  },
  JADE: {
    winsound: "21075.mp3",
    winState: "../assets/chars/win/JADE_wins.png",
    loseState: "../assets/chars/lose/JADE.gif",
  },
  REPTILE: {
    winsound: "21090.mp3",
    winState: "../assets/chars/win/REPTILE_wins.gif",
    loseState: "../assets/chars/lose/REPTILE.gif",
  },
  SCORPION: {
    winsound: "21125.mp3",
    winState: "../assets/chars/win/SCORPION_wins.png",
    loseState: "../assets/chars/lose/SCORPION.gif",
  },
};

const WIN_SOUND_PATH = "./assets/sound/sound_wins/mk3-";

const QUERY_URLS = {
  getPlayers: "https://reactmarathon-api.herokuapp.com/api/mk/players",
  getDamageInfo: "https://reactmarathon-api.herokuapp.com/api/mk/player/fight",
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

    const $LOGO = document.querySelector(".logo");
  }

  startPage(timeout = 1500) {
    this.performSequentialAction(timeout)
      .then(() => {
        const $LOGO = document.querySelector(".logo");
        $LOGO.classList.add("off");
        setTimeout(() => {
          $LOGO.style.zIndex = "-1";
        }, 3000);
        return this.performSequentialAction(1000);
      })
      .then(() => {
        this.addRoster();
        return this.performSequentialAction(3000);
      })
      .then(() => {
        this.operateDoors();
      });
  }

  async addRoster() {
    localStorage.removeItem("player1");
    localStorage.removeItem("player2");
    this.insertHTMLcode(".content", $PLAYER_CHOICE);

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
        this.transitionScenes(".content", $ARENA_HTML);
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

  transitionScenes(
    selector = ".content",
    HTMLcode = $PLAYER_CHOICE,
    timeout = 3000
  ) {
    this.performSequentialAction(timeout)
      .then(() => {
        this.operateDoors();
        timeout = 5000;
        return this.performSequentialAction(timeout);
      })
      .then(() => {
        this.insertHTMLcode(selector, HTMLcode);
        const $FORM_CONTROL = document.querySelector(".control");
        this.getArenaBackground();
        $FORM_CONTROL.addEventListener("submit", (event) => {
          event.preventDefault();
          this.startRound();
        });
        this.start();
        timeout = 1000;
        return this.performSequentialAction(timeout);
      })
      .then(() => {
        this.operateDoors();
        timeout = 4000;
        return this.performSequentialAction(timeout);
      })
      .then(() => {
        // setTimeout(() => {
        generateLogs(
          { name: player1.name },
          { dealType: "start", name: player2.name }
        );
        // }, timeout);
        const PATH_FIGHT = "../assets/sound/fight/mk3-09020.mp3";
        const IMG_FIGHT = document.querySelector(".fight__img");
        playSound(PATH_FIGHT);
        setTimeout(() => {
          IMG_FIGHT.classList.add("show");
        }, 1500);
        setTimeout(() => {
          IMG_FIGHT.classList.remove("show");
        }, 2500);
        timeout = 2000;
        return this.performSequentialAction(timeout);
      })
      // .then(() => {

      //   timeout = 2000;
      //   return this.performSequentialAction(timeout);
      // })
      .then(() => {
        // setTimeout(() => {
        const $FORM_CONTROL = document.querySelector(".control");
        $FORM_CONTROL.classList.add("show");
        // }, 2000);
      })
      .catch(async () => {
        await this.addRoster();
        this.operateDoors();
      });
  }

  getArenaBackground() {
    const $ARENA = document.querySelector(".arenas");
    $ARENA.classList.add(`arena${getRandomNumber(5, 1)}`);
  }

  performSequentialAction(timeOut) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, timeOut);
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
        playSound(definePathToAudio(DEFENDER.dealType));
        generateLogs(ATTACKER, DEFENDER);
      } else {
        DEFENDER.dealType = "hit";
        VICTIM.changeHP(ATTACKER);
        VICTIM.renderHP(VICTIM.elHP());
        VICTIM.showHitMsg(DEFENDER);
        DEFENDER.hp = VICTIM.hp;
        playSound(definePathToAudio(DEFENDER.dealType));
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

  declareMatchResult(winnerObj) {
    const { name, player } = winnerObj;
    const LOSER = player === 1 ? player2 : player1;
    document.querySelector(".arenas").appendChild(this.showPlayerWins(name));
    document.querySelector(`.char${player}`).src = WIN_SOUND[name].winState;
    document.querySelector(`.char${LOSER.player}`).src = WIN_SOUND[name].loseState;
    console.log(document.querySelector(`.char${LOSER}`));
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
      { name },
      { name: LOSER.name, dealType: MATCH_RESULT.dealType }
    );
    setTimeout(() => {
      playSound(`${WIN_SOUND_PATH}${WIN_SOUND[name]}`);
    }, 2000);
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
    const $PLAYER = createElement("div", [`player${playerNumber}`]);
    const $PROGRESSBAR = createElement("div", ["progressbar"]);
    const $LIFE = createElement("div", ["life"]);
    const $NAME = createElement("div", ["name"]);
    const $CHARACTER = createElement("div", ["character"]);
    const $CHAR_IMG = createElement("img");
    $CHAR_IMG.classList.add(`char${playerNumber}`);
    const $BANG_IMG = createElement("img");

    $LIFE.style.width = `${hp}%`;
    $NAME.innerText = `${name}`;
    $PROGRESSBAR.appendChild($LIFE);
    $PROGRESSBAR.appendChild($NAME);

    $CHAR_IMG.src = img;
    $CHARACTER.appendChild($CHAR_IMG);
    $CHARACTER.appendChild($BANG_IMG);
    $BANG_IMG.classList.add(`bang`, `fighter${playerNumber}`);
    $PLAYER.appendChild($PROGRESSBAR);
    $PLAYER.appendChild($CHARACTER);

    return $PLAYER;
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
      this.transitionScenes(".content", $PLAYER_CHOICE, 1000);
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

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const GAME = new Game();

export { GAME, ATTACK };
