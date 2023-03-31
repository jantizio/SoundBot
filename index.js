// Require the necessary discord.js classes and token
const fs = require('node:fs');
const path = require('node:path');
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require('discord.js');
const { prefix, token } = require('./config.json');
// const { generateDependencyReport } = require('@discordjs/voice');

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();
client.audioList = new Collection();
client.active = new Collection();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}
// console.log(client.commands);
// crea una lista di file audio, identificati dal percorso
const audioFiles = fs
  .readdirSync('./sounds')
  .filter((file) => file.endsWith('.ogg'));

for (const file of audioFiles) {
  const nome = file.split('.');
  client.audioList.set(nome[0], `../sounds/${file}`);
}

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  // c.user.setActivity(`${prefix}help`, { type: 'LISTENING' });
  c.user.setPresence({
    activities: [{ name: `${prefix}help`, type: ActivityType.Listening }],
    status: 'online',
  });
  const jantizio = client.users.fetch('270972425787670529');
  jantizio.then(function (result) {
    c.jantizio = result;
  });

  // jantizio = client.users.cache.get('270972425787670529');
  // console.log(jantizio);

  // require("./lib/tcpserver")();
  // console.log(generateDependencyReport());
});

// text command handler
client.on(Events.MessageCreate, (message) => {
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
  console.log(`${command.data.name} nel server ${serverName}`);

  if (command.args && !args.length) {
    let reply = `Devi specificare degli argomenti, ${message.author}!`;

    if (command.usage) {
      reply += `\nL'utilizzo corretto sarebbe: \`${prefix}${command.data.name} ${command.usage}\``;
    }
    return message.channel.send(reply);
  }

  try {
    command.executeOld(message, args);
  } catch (error) {
    console.error(error);
    message.reply(
      `C'è stato un errore nel tentativo di eseguire questo comando`
    );
  }
});

// -- Funzione per bannare la gente quando gioca a lol :) --
/* client.on('presenceUpdate', (oldPresence, newPresence) => {
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
