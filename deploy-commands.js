const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId , guildId , token } = require('./config.json');

const commands = [];

const ad_command = fs.readdirSync('./commands/🔨 Admin').filter(file => file.endsWith('.js'));

for (const file of ad_command) {
	const command = require(`./commands/🔨 Admin/${file}`);
	commands.push(command.data.toJSON());
}

const music_command = fs.readdirSync('./commands/🎶 Music').filter(file => file.endsWith('.js'));

for (const music_file of music_command) {
	const command = require(`./commands/🎶 Music/${music_file}`);
	commands.push(command.data.toJSON());
}

const setting_command = fs.readdirSync('./commands/🎨 Setting').filter(file => file.endsWith('.js'));

for (const set_file of setting_command) {
	const command = require(`./commands/🎨 Setting/${set_file}`);
	commands.push(command.data.toJSON());
}

const fun_command = fs.readdirSync('./commands/😎 Funny').filter(file => file.endsWith('.js'));

for (const fun_file of fun_command) {
	const command = require(`./commands/😎 Funny/${fun_file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();