import { createElement, getRandomNumber } from "./utils.js";
import { $PLAYER_CHOICE, $ARENA_HTML } from "./buildHTML.js";
import { data } from "./query.js";
import { GAME } from "./game.js";

// const $parent = document.querySelector(".parent");
const $player = document.querySelector(".warrior");

function createEmptyPlayerBlock() {
  const el = createElement("div", ["fighter-ava", "div11", "disabled"]);
  const img = createElement("img");
  img.src = "http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png";
  el.appendChild(img);
  document.querySelector(".parent").appendChild(el);
}

async function addRoster() {
  localStorage.removeItem("player1");
  localStorage.removeItem("player2");
  const $CONTENT = document.querySelector(".content");
  $CONTENT.innerHTML = $PLAYER_CHOICE;
  const PLAYERS = await data.getPlayers();

  let imgSrc = null;
  createEmptyPlayerBlock();

  PLAYERS.forEach((item) => {
    const el = createElement("div", ["fighter-ava", `div${item.id}`]);
    const img = createElement("img");
    el.addEventListener("mousemove", () => {
      if (imgSrc === null) {
        imgSrc = item.img;
        const $img = createElement("img");
        $img.src = imgSrc;
        document.querySelector(".warrior").appendChild($img);
      }
    });

    el.addEventListener("mouseout", () => {
      if (imgSrc) {
        imgSrc = null;
        document.querySelector(".warrior").innerHTML = "";
      }
    });

    el.addEventListener("click", (event) => {
      //TODO: Мы кладем нашего игрока в localStorage что бы потом на арене его достать.
      // При помощи localStorage.getItem('player1'); т.к. в localStorage кладется строка,
      // то мы должны ее распарсить обратным методом JSON.parse(localStorage.getItem('player1'));
      // но это уже будет в нашем классе Game когда мы инициализируем игроков.

      const SELECT_FIGHTERS = new Promise((resolve) => {
        removeClasses(".fighter-ava", "active");
        event.target.classList.toggle("active");

        resolve();
      })
        .then(() => {
          localStorage.setItem("player1", JSON.stringify(item));
        })
        .then(() => {
          highlightAvatar(5);
        })
        .then(() => {
          const ENEMY = PLAYERS[getRandomNumber(22)];
          const $ENEMY_AVATAR = document.querySelector(`.div${ENEMY.id}`);
          removeClasses(".fighter-ava", "active-p2");

          $ENEMY_AVATAR.classList.toggle("active-p2");
          localStorage.setItem("player2", JSON.stringify(ENEMY));
        })
        .then(async () => {
          setTimeout( () => {
            GAME.operateDoors();
            setTimeout(() => {
              $CONTENT.innerHTML = $ARENA_HTML;
              const $ARENA = document.querySelector(".arenas");
              $ARENA.classList.add(`arena${getRandomNumber(5, 1)}`);
              setTimeout(() => {
                GAME.operateDoors();
              }, 3000);
            }, 5000);
          }, 3000);
        })
        .then(() => {
          setTimeout(() => {
            GAME.start()
          }, 1000);
        })
        ;
      // .then(() => {
      //   setTimeout(() => {
      //     GAME.operateDoors();
      //   }, 3000);
      // });
    });

    img.src = item.avatar;
    img.alt = item.name;

    el.appendChild(img);
    document.querySelector(".parent").appendChild(el);
  });
}

function removeClasses(selector, className) {
  const arrOfElements = document.querySelectorAll(`${selector}`);
  arrOfElements.forEach((el) => {
    if (el && el.classList.contains(className)) {
      el.classList.remove(className);
    }
  });
}

function highlightAvatar(id = 5, timeout = 1000) {
  setTimeout(() => {
    console.log("hi");
    document.querySelector(`.div${id}`);
  }, timeout);
}
// async function chooseEnemyFighter() {

// }

// const variantNum = getRandomNumber(8, 1);
// for (let i = 0; i < variantNum; i++) {
//   const TIMEOUT = getRandomNumber(10, 3) * 100;
//   const RANDOM_FIGHTER_ID = getRandomNumber(23, 1);
//   const $GET_AVATAR = document.querySelector(`.div${RANDOM_FIGHTER_ID}`);
//   $GET_AVATAR.classList.toggle("active-p2");
//   setTimeout(() => {
//     $GET_AVATAR.classList.toggle("active-p2");
//   }, TIMEOUT);
// }

export { addRoster };
