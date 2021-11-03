import { createElement } from "./utils.js";
import { $PLAYER_CHOICE } from "./buildHTML.js";

// const $parent = document.querySelector(".parent");
const $player = document.querySelector(".warrior");

function createEmptyPlayerBlock() {
  const el = createElement("div", ["fighter-ava", "div11", "disabled"]);
  const img = createElement("img");
  img.src = "http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png";
  el.appendChild(img);
  document.querySelector(".parent").appendChild(el);
}

async function init() {
  localStorage.removeItem("player1");
  const $ROOT = document.querySelector(".root");
  $ROOT.insertAdjacentHTML("afterbegin", $PLAYER_CHOICE);
  const players = await fetch(
    "https://reactmarathon-api.herokuapp.com/api/mk/players"
  ).then((res) => res.json());

  let imgSrc = null;
  createEmptyPlayerBlock();

  players.forEach((item) => {
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

    el.addEventListener("click", () => {
      //TODO: Мы кладем нашего игрока в localStorage что бы потом на арене его достать.
      // При помощи localStorage.getItem('player1'); т.к. в localStorage кладется строка,
      // то мы должны ее распарсить обратным методом JSON.parse(localStorage.getItem('player1'));
      // но это уже будет в нашем классе Game когда мы инициализируем игроков.
      localStorage.setItem("player1", JSON.stringify(item));

      el.classList.add("active");

      setTimeout(() => {
        // TODO: Здесь должен быть код который перенаправит вас на ваше игровое поле...
        //  Пример использования: window.location.pathname = 'arenas.html';
      }, 1000);
    });

    img.src = item.avatar;
    img.alt = item.name;

    el.appendChild(img);
    document.querySelector(".parent").appendChild(el);
  });
}

init();
