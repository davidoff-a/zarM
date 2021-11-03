const $ARENA_HTML = `
    <div class="arenas"><form class="control"><div class="inputWrap"><h2>HIT</h2><div class="ul"><input type="radio" name="hit" value="head" id="headHit" required/> <label for="headHit"><span>HEAD</span></label><input type="radio" name="hit" value="body" id="bodyHit"  required /><label for="bodyHit"><span>BODY</span></label><input type="radio" name="hit" value="foot" id="footHit" required /> <label for="footHit"> <span>FOOT</span>
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
        <div class="logo"><img src="/assets/logo.png" alt="logo" class="logo__img"></div>
        <div class="fight"><img src="./assets/fight.gif" alt="fight" class="fight__img"></div>
      </div>
      <div class="chat">
      </div>`;
const $PLAYER_CHOICE = `
<div class="title title__choice">SELECT YOUR FIGHTERS</div><div class="warrior"></div><div class="parent"></div>
`;
export { $ARENA_HTML, $PLAYER_CHOICE };