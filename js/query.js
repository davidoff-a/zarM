class Query {
  getPlayers = async () => {
    const chars = await fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/players"
    ).then((res) => res.json());
    return chars;
  };

  getEnemyPlayer = async () => {
    const pers = await fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
    ).then((res) => res.json());
    return pers;
  };

  postAttackData = async (playerObj) => {
    const PUNCH = await fetch(
      "http://reactmarathon-api.herokuapp.com/api/mk/player/fight",
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


