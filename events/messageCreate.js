const { MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'messageCreate',
	async execute(message,client) {
        const fetch = require('node-fetch');
        const { MessageEmbed , MessageActionRow , MessageButton } = require('discord.js');
        const guild = message.guild.id;
        const myEnmap = require('../utils/enmapUtils');
        const distube = require('../utils/distubeUtils');

        const chatbot_channel = myEnmap.get(`chatbot_channel_${guild}`);
        const suggest_channel = myEnmap.get(`suggestion_channel_${guild}`);
        const request_channel = myEnmap.get(`music_channel_${guild}`);
        const automeme_channel = myEnmap.get(`auto_meme_${guild}`);

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
        if(message.channel.id === suggest_channel && !message.author.bot)
        {
            message.delete();
            const embed = {
                author: {
                    name: 'New suggestion',
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
        if(message.channel.id === request_channel && !message.author.bot)
        {
            message.delete();
            if(!message.member.voice.channel)
            {
                return;
            }
            distube.play(message.member.voice.channel , message.content , {
                textChannel : message.channel,
                member : message.member,
            })
        }
    }
};