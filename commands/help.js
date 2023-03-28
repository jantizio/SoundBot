const { SlashCommandBuilder } = require('discord.js');
const { prefix } = require('../config.json');
const defaultEmbed = require('../lib/defaultEmbed.js');

function body(commands, jantizio, bot, args) {
  const helpEmbed = defaultEmbed(bot, jantizio);

  if (!args.length) {
    helpEmbed
      .setDescription(
        'SoundBot ti intrattiene riproducendo suoni divertenti da una soundboard e con la fantastica voce di Giorgio Bot! \n Ecco una lista di comandi:'
      )
      // .attachFiles(attachment)
      // .setThumbnail("attachment://logo.png")
      .addFields(
        {
          name: 'Comandi',
          value: `${prefix}${commands
            .map((command) => command.data.name)
            .join(
              `\n${prefix}`
            )}\n\nPuoi scrivere \`${prefix}help [nome comando]\` per sapere come funziona un comando specifico!`,
        },
        { name: '\u200B', value: '\u200B' },
        {
          name: 'Invito',
          value:
            'Per invitare il bot nel tuo server clicca [qui](https://discord.com/oauth2/authorize?client_id=796744983515234304&scope=bot&permissions=2147483647).',
        },
        {
          name: 'Supporto',
          value: `Per qualsiasi problema, domanda o richiesta puoi scrivermi in privato ${jantizio}\n\u200B`,
        }
      );
    return helpEmbed;
  }

  const name = args[0].toLowerCase();
  const command =
    commands.get(name) ||
    commands.find((c) => c.aliases && c.aliases.includes(name));

  if (!command) {
    return undefined;
  }

  helpEmbed.setTitle(`${command.data.name}\n\u200B`);

  if (command.data.description) {
    helpEmbed.addFields({
      name: 'Descrizione:',
      value: `${command.data.description}\n\u200B`,
    });
  }

  if (command.aliases) {
    helpEmbed.addFields({
      name: 'Aliases:',
      value: `\\${command.aliases.join('\n\\')}\n\u200B`,
    });
  }

  if (command.usage) {
    helpEmbed.addFields({
      name: 'Utilizzo:',
      value: `\`${prefix}${command.data.name} ${command.usage}\`\n\u200B`,
    });
  }

  return helpEmbed;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("Mostra  l'utilizzo di ogni comando")
    .addStringOption((option) =>
      option
        .setName('comando')
        .setDescription('il comando di cui vuoi informazioni')
    ),
  aliases: ['commands'],
  usage: '<command name>',
  async execute(interaction) {
    const { commands, jantizio, user: bot } = interaction.client;
    const coms = interaction.options.getString('comando');
    const args = coms ? [coms] : [];
    console.log(args);

    const helpEmbed = body(commands, jantizio, bot, args);
    if (!helpEmbed) {
      return interaction.reply(`il comando \`${args[0]}\` comando non esiste!`);
    }

    await interaction.reply({ embeds: [helpEmbed] });
  },
  executeOld(message, args) {
    const { commands, jantizio, user: bot } = message.client;

    const helpEmbed = body(commands, jantizio, bot, args);
    if (!helpEmbed) {
      return message.reply(`il comando \`${args[0]}\` comando non esiste!`);
    }

    message.channel.send({ embeds: [helpEmbed] });
  },
};
