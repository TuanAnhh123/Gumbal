const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { MessageEmbed , MessageActionRow , MessageButton } = require('discord.js');
const { DisTube } = require('distube');
const { GiveawaysManager } = require('discord-giveaways');

const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILDS , 
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Intents.FLAGS.GUILD_BANS,
	],
	presence: {
		activities: [{
		  name : `Hí anh em`,
		  type : `PLAYING`
		}],
		status: "idle"
	  }
});

module.exports = client;

client.commands = new Collection();

require("./utils/handler.js")(client);

client.login(token);