let banana = false;
module.exports = {
  name: "banana",
  description: "Attiva e disattiva la modalità banana",
  aliases: ["b"],
  async execute(message, args, ops) {
    const getGame = require("../lib/riotapi.js");
    if (!banana) {
      banana = true;
      message.channel.send(":banana: Banana Mode attivata :banana: ");
      console.log("attivata");
      getGame.startLoop(message, ops);
    } else {
      banana = false;
      message.channel.send(":banana: Banana Mode disattivata :banana: ");
      console.log("disattivata");
      getGame.stopLoop();
    }
    /* const tts = message.client.commands.get("tts");
    let roast = ", stfu";
    tts.execute(message, roast, ops); */
  },
};
