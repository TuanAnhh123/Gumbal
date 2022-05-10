module.exports = {
	name: 'messageDelete',
	async execute(message,client) {
        const Discord = require('discord.js');
        const fetch = require('node-fetch');
        const guild = message.guild.id;
        const db = message.client.db;
        const ms = require('ms');

        /*if(db.fetch(`${guild}_ghostping`) == 1)
        {
            if(message.author.bot) return;
            const member = message.mentions.members.first();
            if(member)
            {
                const embed = {
                    author: {
                        name: 'Ghost ping detected',
                        icon_url: 'https://cdn.discordapp.com/emojis/964291658143387658.webp?size=44&quality=lossless',
                    },
                    fields : [
                        {
                            name: `<:humann2:968679355377156177> Author`,
                            value: `> <@${message.author.id}>`
                        },
                        {
                            name: `<:fileee:968705068591362128> Message content`,
                            value: `> ${message.content}`
                        },
                    ],
                    color : 'BLUE',
                    timestamp: new Date(),
                    footer: {
                        text: `${message.author.tag}`,
                        icon_url: `${message.author.displayAvatarURL({dynamic : true})}`,
                    }, 
                }
                const row = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton().setCustomId('timeout-ghost-ping').setStyle('DANGER').setLabel('Timeout').setEmoji('<:remove:967328034652848168>'),
                )
                
                const msg = await message.channel.send({embeds : [embed] , components : [row]});
                const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 10000 });
                collector.on('collect', async (b) => {
                    if(!b.member.permissions.has(Discord.Permissions.FLAGS.MODERATE_MEMBERS))
                    {
                        return;
                    }
                    const member = message.guild.members.cache.get(message.author.id);
                    member.timeout(3600*24*1000 , 'Ghost ping');
                    //b.reply('ok');
                });
            }
        }*/
    }
};