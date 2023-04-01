const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads a command.')
    .addStringOption((option) =>
      option
        .setName('command')
        .setDescription('The command to reload.')
        .setRequired(true)
    ),
  args: true,
  async execute(interaction) {
    const commandName = interaction.options
      .getString('command', true)
      .toLowerCase();
    const command = interaction.client.commands.get(commandName);

    await interaction.reply({
      content: body(interaction.client, command, commandName),
      ephemeral: true,
    });
  },
  executeOld(message, args) {
    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );

    message.channel.send(body(message.client, command, commandName));
  },
};

function body(client, command, commandName) {
  if (!command) {
    return `There is no command with name \`${commandName}\`!`;
  }

  delete require.cache[require.resolve(`./${command.data.name}.js`)];

  try {
    client.commands.delete(command.data.name);
    const newCommand = require(`./${command.data.name}.js`);
    client.commands.set(newCommand.data.name, newCommand);
    return `Command \`${newCommand.data.name}\` was reloaded!`;
  } catch (error) {
    console.error(error);
    return `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``;
  }
}
