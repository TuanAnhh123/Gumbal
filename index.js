const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { MessageEmbed , MessageActionRow , MessageButton } = require('discord.js');
const { DisTube } = require('distube');
const { GiveawaysManager } = require('discord-giveaways');
const db = require("quick.db");

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS , 
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_INVITES,
]});

module.exports = client;

client.commands = new Collection();

require("./utils/handler.js")(client);

client.db = db;

client.login(token);