module.exports = {
  name: 'banana-add',
  description: 'aggiunge un nome alla banana',
  args: true,
  usage: '<nome> <nickname> <m|f>',
  aliases: ['ba'],
  execute(message, args) {
    message.channel.send(
      `${args[1]} è stato aggiunto come ${args[0]}, ed è un ${args[2]}`
    );
  },
};
