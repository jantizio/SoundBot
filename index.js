// Require the necessary discord.js classes and token
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

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

/* === Load Events === */
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

/* === Load Commands === */
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

/* === Load Audios === */
const audioPath = path.join(__dirname, 'sounds');
const audioFiles = fs
  .readdirSync(audioPath)
  .filter((file) => file.endsWith('.ogg'));

for (const file of audioFiles) {
  const filePath = path.join(audioPath, file);
  const nome = file.split('.');
  client.audioList.set(nome[0], filePath);
}

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
