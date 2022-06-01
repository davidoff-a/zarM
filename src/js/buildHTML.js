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
  // const inputHit = createEl({
  //   tag: "input",
  //   attribs: {
  //     type: "radio",
  //     name: "hit",
  //     value: "head",
  //     id: "headDefense",
  //     required: true,
  //   },
  // });
  // const defense = createEl({ tag: "defense" });

  const target = (name, value) => {
    console.log(name);
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

const $ARENA_HTML = `
    <div class = "arena__wrapper">
    <div class="arenas">
    <form class="control">
    <div class="inputWrap">
    <h2>HIT</h2>
        <div class="ul">
            <input type="radio" name="hit" value="head" id="headHit" required/> 
            <label for="headHit">
            <span>HEAD</span>
            </label>
            <input type="radio" name="hit" value="body" id="bodyHit"  required />
            <label for="bodyHit">
            <span>BODY</span>
            </label>
            <input type="radio" name="hit" value="foot" id="footHit" required /> 
            <label for="footHit"> 
            <span>FOOT</span> 
            </label> 
        </div> 
    </div> 
    <div class="inputWrap">
            <h2>defense</h2>
            <div class="ul">
              <input
                type="radio"
                name="defense"
                value="head"
                id="headDefense"
                required
              />
              <label for="headDefense">
                <span>HEAD</span>
              </label>
              <input
                type="radio"
                name="defense"
                value="body"
                id="bodyDefense"
                required
              />
              <label for="bodyDefense">
                <span>BODY</span>
              </label>
              <input
                type="radio"
                name="defense"
                value="foot"
                id="footDefense"
                required
              />
              <label for="footDefense">
                <span>FOOT</span>
              </label>
            </div>
          </div>
          <div class="buttonWrap">
            <button class="button" type="submit" id="Fight">Fight</button>
          </div>
        </form>
      </div>
      <div class="chat">
      </div>
    </div>
`;
const $PLAYER_CHOICE = `
<div class="title title__choice">SELECT YOUR FIGHTERS</div><div class="warrior"></div><div class="parent"></div>
`;
export { arenaHTML, $PLAYER_CHOICE, createEl };
