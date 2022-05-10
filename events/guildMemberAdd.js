module.exports = {
	name: 'guildMemberAdd',
    on : true,
	async execute(member,client) {
        const Discord = require('discord.js');
        const fetch = require('node-fetch');
        const guild = member.guild.id;
        const myEnmap = require('../utils/enmapUtils');

        /*if(myEnmap.has(`welcome_channel_${guild}`)!==false)
        {
            fetch(`https://some-random-api.ml/welcome/img/1/stars2?type=join&avatar=${member.displayAvatarURL({dynamic : false , format : 'png'})}&username=${encodeURIComponent(member.user.username)}&discriminator=${member.user.discriminator}&guildName=${encodeURIComponent(member.guild.name)}&textcolor=red&memberCount=${member.guild.memberCount}&key=s1HpWsm7B8J56EZoZjwZsb7nhbZhYqZmRezxQGznVS7xC60Vo9dvGoDrZd8NKzCZ`)
                .then(async response => Buffer.from(await response.arrayBuffer()))
                .then(data => {
                    member.client.channels.cache.get(`${myEnmap.get(`welcome_channel_${guild}`)}`).send({files: [new Discord.MessageAttachment(data, "welcome.png")]});
                })
        }*/
	},
};