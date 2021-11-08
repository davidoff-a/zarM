import { createElement, getRandomNumber } from "./utils.js";
import { $PLAYER_CHOICE, $ARENA_HTML } from "./buildHTML.js";
import { data } from "./query.js";
import { GAME } from "./game.js";

// const $parent = document.querySelector(".parent");
// const $player = document.querySelector(".warrior");

// function createEmptyPlayerBlock() {
//   const el = createElement("div", ["fighter-ava", "div11", "disabled"]);
//   const img = createElement("img");
//   img.src = "http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png";
//   el.appendChild(img);
//   document.querySelector(".parent").appendChild(el);
// }

// async function addRoster() {
//   localStorage.removeItem("player1");
//   localStorage.removeItem("player2");
//   insertHTMLcode(".content", $PLAYER_CHOICE);

//   const PLAYERS = await data.getPlayers();

//   let imgSrc = null;
//   createEmptyPlayerBlock();

//   PLAYERS.forEach((item) => {
//     const el = createElement("div", ["fighter-ava", `div${item.id}`]);
//     const img = createElement("img");
//     img.src = item.avatar;
//     img.alt = item.name;

//     el.appendChild(img);
//     document.querySelector(".parent").appendChild(el);

//     el.addEventListener("mousemove", () => {
//       showHideChoosenCharacter(imgSrc, item);
//     });

//     el.addEventListener("mouseout", () => {
//       showHideChoosenCharacter(imgSrc, item);
//     });

//     el.addEventListener("click", (event) => {
//       chooseCharacterForPlayer(event, item);
//       chooseCharacterForOpponent(PLAYERS);
//       transitionToArena();
//     });
//   });
// }

// function removeClasses(selector, className) {
//   const arrOfElements = document.querySelectorAll(`${selector}`);
//   arrOfElements.forEach((el) => {
//     if (el && el.classList.contains(className)) {
//       el.classList.remove(className);
//     }
//   });
// }

// function insertHTMLcode(selector, HTMLcode) {
//   const $TAG = document.querySelector(selector);
//   $TAG.innerHTML = HTMLcode;
// }

// function showHideChoosenCharacter(imageSrc, playerObj) {
//   if (imageSrc === null) {
//     imageSrc = playerObj.img;
//     const $img = createElement("img");
//     $img.src = imageSrc;
//     document.querySelector(".warrior").innerHTML = "";
//     document.querySelector(".warrior").appendChild($img);
//   } else {
//     imageSrc = null;
//     document.querySelector(".warrior").innerHTML = "";
//   }
// }

// function chooseCharacterForPlayer(event, playerObj) {
//   removeClasses(".fighter-ava", "active");
//   event.target.classList.toggle("active");
//   localStorage.setItem("player1", JSON.stringify(playerObj));
// }

// function chooseCharacterForOpponent(arrCharacters) {
//   const ENEMY = arrCharacters[getRandomNumber(22)];
//   const $ENEMY_AVATAR = document.querySelector(`.div${ENEMY.id}`);
//   removeClasses(".fighter-ava", "active-p2");

//   $ENEMY_AVATAR.classList.toggle("active-p2");
//   localStorage.setItem("player2", JSON.stringify(ENEMY));
// }

// function transitionToArena() {
//   setTimeout(() => {
//     GAME.operateDoors();
//     setTimeout(() => {
//       const $CONTENT = document.querySelector(".content");
//       $CONTENT.innerHTML = $ARENA_HTML;
//       const $ARENA = document.querySelector(".arenas");
//       $ARENA.classList.add(`arena${getRandomNumber(5, 1)}`);
//       setTimeout(() => {
//         GAME.operateDoors();
//         setTimeout(() => {
//           const $FORM_CONTROL = document.querySelector(".control");
//           $FORM_CONTROL.addEventListener("submit", (event) => {
//             event.preventDefault();
//             GAME.startRound();
//           });
//           GAME.start();
//           setTimeout(() => {
//             $FORM_CONTROL.style.display = "flex";

//           }, 1500)
//         }, 1000);
//       }, 3000);
//     }, 5000);
//   }, 3000);
// }

export { addRoster };

// function highlightAvatar(id = 5, timeout = 1000) {
//   setTimeout(() => {
//     document.querySelector(`.div${id}`);
//   }, timeout);
// }

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

// .then(() => {
//   setTimeout(() => {
//     GAME.operateDoors();
//   }, 3000);
// });

// function chooseCharactersForPlayers(event, playerObj) {
//   //TODO: Мы кладем нашего игрока в localStorage что бы потом на арене его достать.
//   // При помощи localStorage.getItem('player1'); т.к. в localStorage кладется строка,
//   // то мы должны ее распарсить обратным методом JSON.parse(localStorage.getItem('player1'));
//   // но это уже будет в нашем классе Game когда мы инициализируем игроков.

//   const SELECT_FIGHTERS = new Promise((resolve) => {
//     removeClasses(".fighter-ava", "active");
//     event.target.classList.toggle("active");

//     resolve();
//   })
//     .then(() => {
//       localStorage.setItem("player1", JSON.stringify(playerObj));
//     })
//     .then(() => {
//       const ENEMY = PLAYERS[getRandomNumber(22)];
//       const $ENEMY_AVATAR = document.querySelector(`.div${ENEMY.id}`);
//       removeClasses(".fighter-ava", "active-p2");

//       $ENEMY_AVATAR.classList.toggle("active-p2");
//       localStorage.setItem("player2", JSON.stringify(ENEMY));
//     })
//     .then(async () => {
//       setTimeout(() => {
//         GAME.operateDoors();
//         setTimeout(() => {
//           $CONTENT.innerHTML = $ARENA_HTML;
//           const $ARENA = document.querySelector(".arenas");
//           $ARENA.classList.add(`arena${getRandomNumber(5, 1)}`);
//           setTimeout(() => {
//             GAME.operateDoors();
//           }, 3000);
//         }, 5000);
//       }, 3000);
//     })
//     .then(() => {
//       setTimeout(() => {
//         GAME.start();
//       }, 1000);
//     });
// }
