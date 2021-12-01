class Query {
  getPlayers = async (url) => {
    const chars = await fetch(url).then((res) => res.json());
    return chars;
  };

  postAttackData = async (url, playerObj) => {
    const PUNCH = await fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify(playerObj),
      }
    ).then((res) => res.json());
    return await PUNCH;
  };
}

const data = new Query();
export { data };


