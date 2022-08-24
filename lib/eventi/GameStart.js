function execute(data) {
  let { jsonData } = data;
  for (let index = 0; index < jsonData.allPlayers.length; index++) {
    const element = jsonData.allPlayers[index];
    if (element.summonerName === jsonData.activePlayer.summonerName) {
      data.activePlayer = index;
    }
  }
}
module.exports = execute;
