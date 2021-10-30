class Query {
  getPlayers = async () => {
    const chars = await fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/players"
    ).then((res) => res.json())
    return chars;
  };

  getEnemyPlayer = async () => {
    const pers = await fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
    ).then((res) => res.json());
    return pers;
  };
}
const data = new Query();
export { data };

// data.getPlayers();
// data.getRandomPlayer();
