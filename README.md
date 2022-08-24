# SoundBot

This is a Discord bot that features playing audio files and text to speech. There is also a League of Legends commentator feature, but is currently under development. It only works if the host of the bot is playing.

## Bot Setup

First dowload or clone the repository. Then run `npm ci` into the root folder to perform a clean installation of _node_modules_ (note that you need npm v6 or higher)

Then grab your bot token [here](https://discord.com/developers/applications) and add it in `config.json`. There you can also setup the command symbol, default is `\`.

To run the bot use `node index.js` in the root folder.

## Sounds

You can add your own sounds into the `sounds` folder. They will be automatically added if you restart the bot. They also **NEED** to be .mp3 file, otherwise the will be ignored.

## Commands

If you want to implement a new command you can add a new .js file in the `commands` folder. Look up other commands like `ping.js`, `avatar.js`, `audio-list.js` as templates.

## Friends

This needs to be filled you want to use the League of Legends commentator. The sintax is `"nickname": ["real name", "gender"]`. Gender must be _m_ for male or _f_ for female. For example: `"XXdarkshadowXX": ["Robert", "m"]`.
