const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('remove-suggest-channel')
        .setDescription('Remove suggestion channel'),
    async execute(interaction,client) {
        try {
            const guild = interaction.guild.id;
            const db = interaction.client.db;

            if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
            {
                const embed = {
                    author: {
                        name: 'Error',
                        icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                    },
                    description : '<:false:964905677518696548> You do not have permission to use this command.',
                    color : 'BLUE',
                    timestamp: new Date(),
                    footer: {
                        text: `${interaction.user.tag}`,
                        icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                    },
                }
                return interaction.reply({embeds : [embed]});
            }

            if(db.fetch(`${guild}_suggest`) === null)
            {
                const embed = {
                    author: {
                        name: 'Error',
                        icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                    },
                    description : '<:false:964905677518696548> This server has no suggestion channel.',
                    color : 'BLUE',
                    timestamp: new Date(),
                    footer: {
                        text: `${interaction.user.tag}`,
                        icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                    },
                }
                return interaction.reply({embeds : [embed]});
            }

            const channel = await db.get(`${guild}_suggest`);

            await db.delete(`${guild}_suggest` , channel)

            const embed = {
                author: {
                    name: 'Remove',
                    icon_url: 'https://cdn.discordapp.com/emojis/967049012706422794.webp?size=96&quality=lossless',
                },
                description : `<:remove:967328034652848168> Removed suggestion channel : <#${channel}>.`,
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            interaction.reply({embeds : [embed]})
        }
        catch(e)
        {
            client.channels.cache.get(`${interaction.channel.id}`).send(`${e}`);
        }
    }
};