const client = require('..');
const distube = require('../distube');

module.exports = async(client,distube) => {
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
    distube.on("error", (channel, error) => channel.send(
        "<:false:964905677518696548> Error: " + "\n" + `\`\`\`${error}\`\`\``
    ));
}