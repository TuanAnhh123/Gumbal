const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { MessageEmbed , MessageActionRow , MessageButton } = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways');
const db = require("quick.db");

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS , 
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS
]});

module.exports = client;

client.commands = new Collection();

fs.readdirSync('./commands').forEach(folder => {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(d => d.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.data.name, command);
	}
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

/*client.distube = new DisTube(client, {
    searchSongs: 5,
    searchCooldown: 30,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: true,
	youtubeDL : false,
	plugins: [new YtDlpPlugin()],
}) */

client.giveaways = new GiveawaysManager(client , {
	storage : `./giveaways.json`,
	default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '<:gift_1:967703691031371827>'
    },
})

/*client.distube.on('playSong', (queue, song) => {
	const embed = {
		author: {
			name: 'Now playing',
			icon_url: 'https://cdn.discordapp.com/emojis/962926434597363712.gif?size=128&quality=lossless',
		},
		description : `[${song.name}](${song.url})`,
		color : `BLUE`,
		fields : [ 
			{
				name : `Duration`,
				value : `${song.formattedDuration}`,
				inline : true,
			},
			{
				name : `Requested by`,
				value : `${song.user}`,
				inline : true,
			},
			{
				name : `Loop`,
				value : `${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'Off'}`,
				inline : true,
			},	
			{
				name : `Volume`,
				value : `${queue.volume}`,
				inline : true,
			},
		],
		timestamp: new Date(),
		thumbnail: {
			url: `${song.thumbnail}`,
		},
		footer: {
			text: `${song.user.tag}`,
			icon_url: `${song.user.displayAvatarURL({dynamic : true})}`,
		},
	}
	queue.textChannel?.send({embeds : [embed]});
});
client.distube.on('addSong', (queue, song) => {
	const music_channel = db.get(`${queue.textChannel.guild.id}_music_channel`);
	if(queue.textChannel.id == music_channel)
	{
		return;
	}
	const embed = {
		author: {
			name: 'Track added to queue',
			icon_url: 'https://cdn.discordapp.com/emojis/962926434597363712.gif?size=128&quality=lossless',
		},
		description : `[${song.name}](${song.url})`,
		color : `BLUE`,
		timestamp: new Date(),
		thumbnail: {
			url: `${song.thumbnail}`,
		},
		footer: {
			text: `${song.user.tag}`,
			icon_url: `${song.user.displayAvatarURL({dynamic : true})}`,
		},
	}
	queue.textChannel?.send({embeds : [embed]});
});
client.distube.on("error", (channel, error) => channel.send(
    "<:false:964905677518696548> Error: " + "\n" + `\`\`\`${error}\`\`\``
)); */

client.db = db;

process.on('unhandledRejection' , (reason , p , client) => {
	console.log(reason,p);
})

client.login(token);