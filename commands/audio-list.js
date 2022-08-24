/* eslint-disable linebreak-style */
const defaultEmbed = require("../lib/defaultEmbed.js");

module.exports = {
  name: "audio-list",
  description: "Mostra la lista degli audio disponibili",
  aliases: ["al"],
  execute(message, args, ops) {
    const { audioList } = message.client;
    const keys = Array.from(audioList.keys());
    const { jantizio } = ops;
    const { bot } = ops;

    /* const alEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(bot.username, bot.displayAvatarURL({ dynamic: true }))
      .setDescription("Lista degli audio disponibili: ")
      .addField("\u200B", `***${keys.join("\n")}***\n\u200B`)
      .setTimestamp()
      .setFooter(
        `Autore: ${jantizio.username}`,
        jantizio.displayAvatarURL({ dynamic: true })
      ); */

    let nElementi = Math.ceil(keys.length / 3);
    const alEmbed = defaultEmbed(bot, jantizio);
    alEmbed.setDescription("Lista degli audio disponibili: ");
    //.addField("\u200B", `***${keys.join("\n")}***\n\u200B`);
    let Istart = 0;
    let Istop = nElementi;
    for (let index = 0; index < 3; index++) {
      let lista = "";
      for (let index = Istart; index < Istop; index++) {
        lista += keys[index] ? "***" + keys[index] + "***\n" : "";
      }
      Istart = Istop;
      Istop += nElementi;
      alEmbed.addField("\u200B", `${lista}\n\u200B`, true);
    }

    // message.channel.send("Lista di audio disponibili:\n- " + keys.join("\n- "));
    message.channel.send(alEmbed);
  },
};
