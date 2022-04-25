module.exports = {
	name: 'messageCreate',
	async execute(message,client) {
        const fetch = require('node-fetch');
        const guild = message.guild.id;
        const db = message.client.db;

        const chatbot_channel = db.get(`${guild}_chatbot`);
        const music_channel = db.get(`${guild}_music_channel`);
        const suggest_channel = db.get(`${guild}_suggest`);

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
            const queue = await client.player.createQueue(message.guild);
            if (!queue.connection) await queue.connect(message.member.voice.channel)
            const result = await client.player.search(message.content , {
                requestedBy: message.author,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            const song = result.tracks[0];
            await queue.addTrack(song);
            if (!queue.playing) await queue.play();
        }
        if(message.channel.id === suggest_channel && !message.author.bot)
        {
            message.delete();
            const embed = {
                author: {
                    name: 'New suggestion',
                    //icon_url: `${message.guild.iconURL()}`,
                },
                description : `${message.content}`,
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${message.author.tag}`,
                    icon_url: `${message.author.displayAvatarURL({dynamic : true})}`,
                },
            }
            message.client.channels.cache.get(`${suggest_channel}`).send({embeds : [embed]}).then(msg => {
                msg.react(`👍`);
                msg.react(`👎`);
            })
        }
    }
};