const { prefix } = require("../config.json");
const defaultEmbed = require("../lib/defaultEmbed.js");

module.exports = {
  name: "help",
  description: "Mostra  l'utilizzo di ogni comando",
  aliases: ["commands"],
  usage: "<command name>",
  execute(message, args, ops) {
    const { commands } = message.client;
    const { jantizio } = ops;
    const { bot } = ops;
    const helpEmbed = defaultEmbed(bot, jantizio);

    // const attachment = new Discord.MessageAttachment("./logo2.png", "logo.png");
    if (!args.length) {
      /* const helpEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        //.setTitle("SoundBot")
        .setAuthor(bot.username, bot.displayAvatarURL({ dynamic: true }))
        .setDescription(
          "SoundBot ti intrattiene riproducendo suoni divertenti da una soundboard e con la fantastica voce di Giorgio Bot! \n Ecco una lista di comandi:"
        )
        //.attachFiles(attachment)
        //.setThumbnail("attachment://logo.png")
        .addFields(
          {
            name: "Comandi",
            value: `${prefix}${commands
              .map((command) => command.name)
              .join(
                `\n${prefix}`
              )}\n\nPuoi scrivere \`${prefix}help [nome comando]\` per sapere come funziona un comando specifico!`,
          },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Invito",
            value:
              "Per invitare il bot nel tuo server clicca [qui](https://discord.com/oauth2/authorize?client_id=796744983515234304&scope=bot&permissions=2147483647).",
          },
          {
            name: "Supporto",
            value: `Per qualsiasi problema, domanda o richiesta puoi scrivermi in privato ${jantizio}\n\u200B`,
          }
        )
        .setTimestamp()
        .setFooter(
          `Autore: ${jantizio.username}`,
          jantizio.displayAvatarURL({ dynamic: true })
        ); */
      helpEmbed
        .setDescription(
          "SoundBot ti intrattiene riproducendo suoni divertenti da una soundboard e con la fantastica voce di Giorgio Bot! \n Ecco una lista di comandi:"
        )
        // .attachFiles(attachment)
        // .setThumbnail("attachment://logo.png")
        .addFields(
          {
            name: "Comandi",
            value: `${prefix}${commands
              .map((command) => command.name)
              .join(
                `\n${prefix}`
              )}\n\nPuoi scrivere \`${prefix}help [nome comando]\` per sapere come funziona un comando specifico!`,
          },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Invito",
            value:
              "Per invitare il bot nel tuo server clicca [qui](https://discord.com/oauth2/authorize?client_id=796744983515234304&scope=bot&permissions=2147483647).",
          },
          {
            name: "Supporto",
            value: `Per qualsiasi problema, domanda o richiesta puoi scrivermi in privato ${jantizio}\n\u200B`,
          }
        );
      return message.channel.send(helpEmbed);
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply(`il comando \`${args[0]}\` comando non esiste!`);
    }

    /* const helpEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle(`${command.name}\n\u200B`)
      .setAuthor(bot.username, bot.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter(
        `Autore: ${jantizio.username}`,
        jantizio.displayAvatarURL({ dynamic: true })
      ); */

    helpEmbed.setTitle(`${command.name}\n\u200B`);

    if (command.description) {
      helpEmbed.addField("Descrizione:", `${command.description}\n\u200B`);
    }

    if (command.aliases) {
      helpEmbed.addField(
        "Aliases:",
        `\\${command.aliases.join("\n\\")}\n\u200B`
      );
    }

    if (command.usage) {
      helpEmbed.addField(
        "Utilizzo:",
        `\`${prefix}${command.name} ${command.usage}\`\n\u200B`
      );
    }

    message.channel.send(helpEmbed);
  },
};
