const createEl = ({ tag, classes = [], attribs = {} }) => {
  const el = document.createElement(tag);
  classes.forEach((className) => el.classList.add(className));
  for (let key in attribs) {
    el.setAttribute(key, attribs[key]);
  }
  return el;
};
const arenaHTML = () => {
  const arenaWrapper = createEl({ tag: "div", classes: ["arena__wrapper"] });
  const arenas = createEl({ tag: "div", classes: ["arenas"] });
  const formArenas = createEl({ tag: "form", classes: ["control"] });
  const parts = ["head", "body", "foot"];
  const actions = ["hit", "defense"];
  const chat = createEl({ tag: "div", classes: ["chat"] });
  const btnWrap = createEl({ tag: "div", classes: ["buttonWrap"] });
  const btn = createEl({
    tag: "button",
    classes: ["button"],
    attribs: { type: "submit", id: "Fight" },
  });
  btn.innerText = "fight";
  btnWrap.append(btn);

  const target = (name, value) => {
    const radioId = `${value}${name[0].toUpperCase()}${name
      .slice(1)
      .toLowerCase()}`;
    const fragment = document.createDocumentFragment();
    const inputR = createEl({
      tag: "input",
      attribs: {
        type: "radio",
        name: name,
        value: value,
        id: radioId,
        required: true,
      },
    });
    const labelR = createEl({ tag: "label", attribs: { for: radioId } });
    const spanR = createEl({ tag: "span" });
    spanR.innerText = value.toUpperCase();
    labelR.append(spanR);
    fragment.append(inputR, labelR);
    return fragment;
  };

  actions.forEach((act) => {
    const inputWrap = createEl({ tag: "div", classes: ["inputWrap"] });
    const actionTitle = createEl({ tag: "h2" });
    actionTitle.innerText = act;
    const divUl = createEl({ tag: "div", classes: ["ul"] });
    parts.forEach((part) => {
      divUl.append(target(act, part));
    });
    inputWrap.append(actionTitle, divUl);
    formArenas.append(inputWrap);
  });
  formArenas.append(btnWrap);
  arenas.append(formArenas);
  arenaWrapper.append(arenas, chat);
};
const playerChoice = () => {
  const fragment = document.createDocumentFragment();
  const divTitle = createEl({
    tag: "div",
    classes: ["title", "title__choice"],
  });
  const divWarrior = createEl({ tag: "div", classes: ["warrior"] });
  const divParent = createEl({ tag: "div", classes: ["parent"] });
  fragment.append(divTitle, divWarrior, divParent);
  return fragment;
};

const $PLAYER_CHOICE = `
<div class="title title__choice">SELECT YOUR FIGHTERS</div>
<div class="warrior"></div>
<div class="parent"></div>
`;
export { arenaHTML, playerChoice, createEl };
