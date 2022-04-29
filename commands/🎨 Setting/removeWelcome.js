const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('remove-welcome-channel')
        .setDescription('Remove welcome channel'),
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

            if(db.fetch(`${guild}_welcome`) === null)
            {
                const embed = {
                    author: {
                        name: 'Error',
                        icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                    },
                    description : '<:false:964905677518696548> This server has no welcome channel.',
                    color : 'BLUE',
                    timestamp: new Date(),
                    footer: {
                        text: `${interaction.user.tag}`,
                        icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                    },
                }
                return interaction.reply({embeds : [embed]});
            }

            const channel = await db.get(`${guild}_welcome`);

            await db.delete(`${guild}_welcome` , channel)

            const embed = {
                author: {
                    name: 'Remove',
                    icon_url: 'https://cdn.discordapp.com/emojis/967049012706422794.webp?size=96&quality=lossless',
                },
                description : `<:remove:967328034652848168> Removed welcome channel : <#${channel}>.`,
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