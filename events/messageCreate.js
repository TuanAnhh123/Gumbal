module.exports = {
	name: 'messageCreate',
	async execute(message,client) {
        const fetch = require('node-fetch');
        const guild = message.guild.id;
        const myEnmap = require('../utils/enmapUtils');

        //const chatbot_channel = myEnmap.get(`chatbot_channel_${guild}`);
        const suggest_channel = myEnmap.get(`suggestion_channel_${guild}`);

        /*if(message.channel.id === chatbot_channel && !message.author.bot)
        {
            fetch(`https://some-random-api.ml/chatbot?message=${message.content}&key=s1HpWsm7B8J56EZoZjwZsb7nhbZhYqZmRezxQGznVS7xC60Vo9dvGoDrZd8NKzCZ`)
                .then(response => response.json())
                .then(data => {
                    message.reply(data.response)
                })
                .catch(() => {
                    message.reply("Couldn't fetch response!");
                })
        }*/
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