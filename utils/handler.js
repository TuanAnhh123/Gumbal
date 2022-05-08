const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const distube = require('./distubeUtils');
const { token , clientId } = require('../config.json');

module.exports = async(client) => {
    fs.readdirSync('./commands').forEach((dir) => {
        const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(d => d.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`);
            client.commands.set(command.data.name, command);
        }
    })

    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }

    const slashCommands = [];
    fs.readdirSync('./commands').forEach(folder => {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(d => d.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);
            slashCommands.push(command.data.toJSON());
        }
    });
    
    const rest = new REST({ version: '9' }).setToken(token);
    
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
    
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: slashCommands },
            );
    
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();

    process.on('unhandledRejection' , (reason , p , client) => {
        console.log(reason,p);
    })

    distube.on('playSong', (queue, song) => {
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
    distube.on('addSong', (queue, song) => {
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
    distube.on("error", (channel, error) => channel.send(
        "<:false:964905677518696548> Error: " + "\n" + `\`\`\`${error}\`\`\``
    )); 
}