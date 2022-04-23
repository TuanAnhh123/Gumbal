const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { DisTube } = require('distube');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { MessageEmbed , MessageActionRow , MessageButton } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const db = require("quick.db");
const axios = require('axios');
const fetch = require('node-fetch');
const ms = require('ms');

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS , 
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_MESSAGES
]});

client.commands = new Collection();
const ad_command = fs.readdirSync('./commands/🔨 Admin').filter(file => file.endsWith('.js'));

for (const ad_file of ad_command) {
	const command = require(`./commands/🔨 Admin/${ad_file}`);
	client.commands.set(command.data.name, command);
}

const music_command = fs.readdirSync('./commands/🎶 Music').filter(file => file.endsWith('.js'));

for (const music_file of music_command) {
	const command = require(`./commands/🎶 Music/${music_file}`);
	client.commands.set(command.data.name, command);
}


const setting_command = fs.readdirSync('./commands/🎨 Setting').filter(file => file.endsWith('.js'));

for (const set_file of setting_command) {
	const command = require(`./commands/🎨 Setting/${set_file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.distube = new DisTube(client, {
    searchSongs: 5,
    searchCooldown: 30,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: true,
	youtubeDL : false,
	plugins: [new YtDlpPlugin()],
})

client.distube.on('playSong', (queue, song) => {
	updateplaymsg(queue);
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
));
client.distube.on('searchNoResult', message => {
	const embed = {
		author: {
			name: 'Error',
			icon_url: 'https://cdn.discordapp.com/emojis/964905677518696548.webp?size=96&quality=lossless',
		},
		description : '<:false:964905677518696548> No result found.',
		color : 'BLUE',
		timestamp: new Date(),
		footer: {
			text: `${interaction.user.tag}`,
			icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
		},
	}
	//return interaction.reply({embeds : [embed]});
	message.channel.send({embeds : [embed]})
})
client.db = db;

process.on('unhandledRejection' , (reason , p , client) => {
	console.log(reason,p);
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate' , async message => {
	const guild = message.guild.id;
	const db = message.client.db;

	const chatbot_channel = db.get(`${guild}_chatbot`);
	const music_channel = db.get(`${guild}_music_channel`);

	if(message.channel.id === chatbot_channel && !message.author.bot)
	{
		fetch(`https://some-random-api.ml/chatbot?message=${message.content}&key=s1HpWsm7B8J56EZoZjwZsb7nhbZhYqZmRezxQGznVS7xC60Vo9dvGoDrZd8NKzCZ`)
			.then(response => response.json())
			.then(data => {
				message.reply(data.response)
			})
			.catch(() => {
				message.reply("Couldn't fetch response!");
			})
	}
	if(message.channel.id === music_channel && !message.author.bot)
	{
		if(!message.member.voice.channel)
		{
			const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> You need to join voice channel.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${message.author.tag}`,
                    icon_url: `${message.author.displayAvatarURL({dynamic : true})}`,
                },
            }
            return message.reply({embeds : [embed]});
		}
		await wait(2000);
		message.delete();
		message.client.distube.play(message.member.voice.channel , message.content , {
            textChannel : message.channel,
            member : message.member,
        })
	}
})


client.login(token);