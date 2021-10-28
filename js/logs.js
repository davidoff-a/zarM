// import { player1, player2 } from "./player.js";
import { createElement, getRandomNumber } from "./utils.js";
const $CHAT = document.querySelector(".chat");
const LOGS = {
  start: [
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  ],
  end: [
    "[time] - Результат удара [playerWins]: [playerLose] - труп",
    "[time] - [playerLose] погиб от удара бойца [playerWins]",
    "[time] - Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[time] - [playerDefense] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[time] - [playerDefense] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[time] - [playerDefense] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[time] - [playerDefense] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[time] - [playerDefense] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[time] - [playerDefense] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[time] - [playerDefense] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[time] - [playerDefense] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[time] - [playerDefense] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[time] - [playerDefense] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[time] - [playerDefense] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[time] - [playerDefense] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[time] - [playerDefense] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[time] - [playerDefense] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[time] - [playerDefense] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[time] - [playerDefense] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[time] - [playerDefense] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[time] - [playerDefense] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defense: [
    "[time] - [playerKick] потерял момент и храбрый [playerDefense] отпрыгнул от удара открытой ладонью в ключицу.",
    "[time] - [playerKick] не контролировал ситуацию, и потому [playerDefense] поставил блок на удар пяткой в правую грудь.",
    "[time] - [playerKick] потерял момент и [playerDefense] поставил блок на удар коленом по селезенке.",
    "[time] - [playerKick] поскользнулся и задумчивый [playerDefense] поставил блок на тычок головой в бровь.",
    "[time] - [playerKick] старался провести удар, но непобедимый [playerDefense] ушел в сторону от удара копчиком прямо в пятку.",
    "[time] - [playerKick] обманулся и жестокий [playerDefense] блокировал удар стопой в солнечное сплетение.",
    "[time] - [playerKick] не думал о бое, потому расстроенный [playerDefense] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[time] - [playerKick] обманулся и жестокий [playerDefense] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: ["Ничья - это тоже победа!"],
};

function generateLogs(
  typeStr,
  { name: attackerName },
  { name: defenderName, hp: defenderHP },
  hits = 0
) {
  const LOG_RECORD_TIME = new Date().toLocaleTimeString();
  const RELACE_EXPR_1 = /\[player(1|Kick|Wins)\]/gi;
  const RELACE_EXPR_2 = /\[player(2|Defense|Lose)\]/gi;
  const LOG_RECORD = createElement("p");
  const LOG_SETTINGS = {
    hit: [
      "rgba(225, 13, 3, 0.2)",
      "⚡",
      '<img src="/assets/icons/11.gif" alt="💣">',
    ],
    defense: [
      "rgba(7, 13, 225, 0.2)",
      "🚧",
      '<img src="/assets/icons/08.gif" alt="🔒">',
    ],
    start: ["rgba(9, 172, 9, 0.2)", "🔪"],
    draw: ["rgba(253, 216, 3, 0.3)", "🤝"],
    end: ["rgba(9, 172, 9, 0.2)", "💀"],
  };
  let stringNum = 0;
  let logString = "";
  stringNum = getRandomNumber(LOGS[typeStr].length - 1);
  console.log("hits: " + hits)
  console.log("ХП обороняющегося: " + defenderHP);
  typeStr === "hit"
    ? (logString = `${LOGS[typeStr][stringNum]} - ${hits} - [${defenderHP}/100]`)
    : (logString = LOGS[typeStr][stringNum]);

  logString = logString
    .replace(RELACE_EXPR_1, ` <span>${attackerName.toUpperCase()}</span>`)
    .replace(RELACE_EXPR_2, ` <span> ${defenderName.toUpperCase()} </span> `)
    .replace("[time]", ` ⌚ ${LOG_RECORD_TIME} `);
  LOG_RECORD.innerHTML = ` ${LOG_SETTINGS[typeStr][1]} ${logString}`;
  console.log(` ${LOG_SETTINGS[typeStr][1]} ${logString}`);
  LOG_RECORD.style.background = LOG_SETTINGS[typeStr][0];
  $CHAT.insertAdjacentElement("afterbegin", LOG_RECORD);
}

export { generateLogs, $CHAT };
