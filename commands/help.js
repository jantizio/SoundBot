const { SlashCommandBuilder } = require('discord.js');
const { prefix } = require('../config.json');
const defaultEmbed = require('../lib/defaultEmbed.js');

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
    const comsName = interaction.options.getString('comando');

    const helpEmbed = body(interaction.client, comsName);

    await interaction.reply({
      content: helpEmbed
        ? undefined
        : `il comando \`${comsName}\` comando non esiste!`,
      embeds: helpEmbed ? [helpEmbed] : undefined,
      ephemeral: true,
    });
  },
  executeOld(message, args) {
    const helpEmbed = body(message.client, args[0]);

    if (!helpEmbed) {
      return message.reply(`il comando \`${args[0]}\` comando non esiste!`);
    }

    message.channel.send({ embeds: [helpEmbed] });
  },
};

function body(client, commandName) {
  const { commands, jantizio, user: bot } = client;
  const helpEmbed = defaultEmbed(bot, jantizio);

  if (!commandName) {
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

  commandName = commandName.toLowerCase();
  const command =
    commands.get(commandName) ||
    commands.find((c) => c.aliases && c.aliases.includes(commandName));

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
