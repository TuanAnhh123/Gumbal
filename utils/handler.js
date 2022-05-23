const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const distube = require('./distubeUtils');
const myEnmap = require('../utils/enmapUtils');
const { token , clientId } = require('../config.json');

module.exports = async(client,message) => {
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
        const request_channel = myEnmap.get(`music_channel_${queue.voiceChannel.guild.id}`);
        if(queue.textChannel.id == request_channel)
        {
            const request_msg = myEnmap.get(`music_channel_${queue.voiceChannel.guild.id}_msg2`);
            const embed = {
                author: {
                    name: 'Now playing',
                    icon_url: 'https://cdn.discordapp.com/emojis/962926434597363712.gif?size=128&quality=lossless',
                },
                description : `[${song.name}](${song.url})`,
                color : `RED`,
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
                    {
                        name : `Autoplay`,
                        value : `${queue.autoplay ? 'On' : 'Off'}`,
                        inline : true
                    },
                    {
                        name : `Filter`,
                        value : `${queue.filters.join(', ') || 'Off'}`,
                        inline : true,
                    }
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
            queue.textChannel.messages.fetch(`${request_msg}`).then(msg => msg.edit({embeds : [embed] , content : null}));
            return;
        }
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
                    value : `${queue.repeatMode ? queue.repeatMode === 2 ? 'Queue' : 'Song' : 'Off'}`,
                    inline : true,
                },	
                {
                    name : `Volume`,
                    value : `${queue.volume}`,
                    inline : true,
                },
                {
                    name : `Autoplay`,
                    value : `${queue.autoplay ? 'On' : 'Off'}`,
                    inline : true
                },
                {
                    name : `Filter`,
                    value : `${queue.filters.join(', ') || 'Off'}`,
                    inline : true,
                }
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
        const queue1 = distube.getQueue(queue.voiceChannel.guild.id);
        const request_channel = myEnmap.get(`music_channel_${queue.voiceChannel.guild.id}`);
        if(queue.textChannel.id == request_channel)
        {
            const embed = {
                title : `__${queue.voiceChannel.guild.name}__'s queue`,
                description : queue.songs.map((song, id) =>`\`[ ${id+1} ]\` [${song.name}](${song.url}) - \`${song.formattedDuration}\`\n> Requested by ${song.user}.`).join("\n"),
                color : 'RED'
            }
            const request_msg = myEnmap.get(`music_channel_${queue.voiceChannel.guild.id}_msg`);
            queue.textChannel.messages.fetch(`${request_msg}`).then(msg => msg.edit({embeds : [embed] , content : null}));
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
    distube.on("error", (channel, error) => channel.send(
        "<:false:964905677518696548> Error: " + "\n" + `\`\`\`${error}\`\`\``
    )); 
    distube.on("finish" , (queue) => {
        const request_channel = myEnmap.get(`music_channel_${queue.voiceChannel.guild.id}`);
        if(queue.textChannel.id == request_channel)
        {
            const embed = {
                title : `__${queue.voiceChannel.guild.name}'s__ queue`,
                description : `<:music_command:967618626347741244> There is no song in queue.`,
                color : 'RED',
            }
            const request_msg = myEnmap.get(`music_channel_${queue.voiceChannel.guild.id}_msg`);
            queue.textChannel.messages.fetch(`${request_msg}`).then(msg => msg.edit({embeds : [embed]}));
        }
    })
}