const fs = require("fs");
const { version } = require("../package.json");
const defaultEmbed = require("../lib/defaultEmbed.js");

module.exports = {
  name: "changelog",
  description:
    "È la cronologia dei cambiamenti fatti al bot, qui puoi scoprire tutte le nuove funzionalità!",
  aliases: ["ch", "log", "change"],
  execute(message, args, ops) {
    const { jantizio } = ops;
    const { bot } = ops;
    const testo = fs.readFileSync("./changelog.txt", "utf8");

    /* const changelogEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(bot.username, bot.displayAvatarURL({ dynamic: true }))
      .setDescription(`**SoundBot versione ${version}**`)
      .addField("\u200B", `${testo}\n\u200B`)
      .setTimestamp()
      .setFooter(
        `Autore: ${jantizio.username}`,
        jantizio.displayAvatarURL({ dynamic: true })
      ); */

    const changelogEmbed = defaultEmbed(bot, jantizio);
    changelogEmbed
      .setDescription(`**SoundBot versione ${version}**`)
      .addField("\u200B", `${testo}\n\u200B`);
    return message.channel.send(changelogEmbed);
  },
};
