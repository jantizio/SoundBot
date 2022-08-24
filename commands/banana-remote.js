let banana = false;

module.exports = {
  name: "banana-remote",
  description: "Attiva e disattiva la modalità banana",
  aliases: ["br"],
  async execute(message, args, ops) {
    const getGame = require("../lib/riotapi-r");

    if (!banana) {
      banana = true;
      message.channel.send(":banana: Banana Mode remote attivata :banana:");
      console.log("attivata");
      getGame.startListening(message, ops);
    } else {
      banana = false;
      message.channel.send(":banana: Banana Mode remote disattivata :banana:");
      console.log("disattivata");
      getGame.stopListening();
    }
    /* const tts = message.client.commands.get("tts");
    let roast = ", stfu";
    tts.execute(message, roast, ops); */
  },
};
