import { createElement } from "./utils.js";
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
  console.log(PLAYERS);
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
      const $AVATARS = document.querySelectorAll(".fighter-ava");
      localStorage.setItem("player1", JSON.stringify(item));
      $AVATARS.forEach((element) => {
        if (element.classList.contains("active")) {
          element.classList.remove("active");
        }
      });
      event.target.classList.add("active");
      console.log(JSON.parse(localStorage.getItem("player1")));
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

export { addRoster };
