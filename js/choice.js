import { createElement, getRandomNumber } from "./utils.js";
import { $PLAYER_CHOICE } from "./buildHTML.js";
import { data } from "./query.js";

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
  const $ROOT = document.querySelector(".root");
  $ROOT.insertAdjacentHTML("afterbegin", $PLAYER_CHOICE);
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
          const ENEMY = PLAYERS[getRandomNumber(22)];
          return ENEMY;
        })
        .then((ENEMY) => {
          const $ENEMY_AVATAR = document.querySelector(`.div${ENEMY.id}`);
          removeClasses(".fighter-ava", "active-p2");
          $ENEMY_AVATAR.classList.toggle("active-p2");
          localStorage.setItem("player2", JSON.stringify(ENEMY));
        });
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
