/* eslint-disable linebreak-style */
// richiede il modulo discord.js (importa) e importa config.json
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

// crea un nuovo client
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.audioList = new Discord.Collection();
const active = new Map();
var jantizio;

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
// crea una lista di file audio, identificati dal percorso
const audioFiles = fs
  .readdirSync('./sounds')
  .filter((file) => file.endsWith('.mp3'));

for (const file of audioFiles) {
  const nome = file.split('.');
  client.audioList.set(nome[0], `../sounds/${file}`);
}

// questo verrà eseguito dopo il login una solo volta (once)
client.once('ready', () => {
  console.log('Ready!');
  client.user.setActivity(`${prefix}help`, { type: 'LISTENING' });
  jantizio = client.users.cache.get('270972425787670529');

  //require("./lib/tcpserver")();
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;
  const serverName = client.guilds.cache.get(message.guild.id).name;
  console.log(`${command.name} nel server ${serverName}`);

  if (command.args && !args.length) {
    let reply = `Devi specificare degli argomenti, ${message.author}!`;

    if (command.usage) {
      reply += `\nL'utilizzo corretto sarebbe: \`${prefix}${command.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  const ops = {
    active,
    jantizio,
    bot: client.user,
  };
  try {
    command.execute(message, args, ops);
  } catch (error) {
    console.error(error);
    message.reply(
      "C'è stato un errore nel tentativo di eseguire questo comando"
    );
  }
});

// -- Funzione per bannare la gente quando gioca a lol :) --
/*client.on('presenceUpdate', (oldPresence, newPresence) => {
  //322006245995315202
  const leagueOfPanni = '322006245995315202'; //league of panni
  const laVoceDiPanni = '424272727139024898';
  const bannedActivity = 'League of Legends';
  if (newPresence.guild.id != leagueOfPanni) return;

  const user = newPresence.user.username;
  let nActivity;
  let oActivity;
  if (!newPresence.activities[0]) nActivity = 'niente';
  else nActivity = newPresence.activities[0].name;
  if (!oldPresence.activities[0]) oActivity = 'niente';
  else oActivity = oldPresence.activities[0].name;
  //console.log(activity);

  if (nActivity == oActivity) return;

  if (nActivity == bannedActivity) {
    client.channels
      .fetch(laVoceDiPanni)
      .then((channel) =>
        channel.send(user + ' sta giocando a ' + nActivity + ', bannatelo')
      );
  }
});*/

// viene eseguito il login
client.login(token);

/* client.channels.cache
    .get("457116457676046337")
    .messages.fetch("798867182066860063")
    .then((message) => message.delete()); */
