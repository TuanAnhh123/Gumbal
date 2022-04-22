const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed , MessageActionRow , MessageButton } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('remove-chatbot-channel')
        .setDescription('Xóa chat bot channel'),
    async execute(interaction,client) {
        const guild = interaction.guild.id;
        const db = interaction.client.db;

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/964905677518696548.webp?size=96&quality=lossless',
                },
                description : '❌ You do not have permission to use this command.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }

        if(db.fetch(`${guild}_chatbot`) === null)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/964905677518696548.webp?size=96&quality=lossless',
                },
                description : '❌ This server has no chat bot channel.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }

        const channel = await db.get(`${guild}_chatbot`);

        await db.delete(`${guild}_chatbot` , channel)

        const embed = {
            author: {
                name: 'Remove',
                icon_url: 'https://cdn.discordapp.com/emojis/967049012706422794.webp?size=96&quality=lossless',
            },
            description : `<:__:967049012626731028> Removed the chat bot channel : <#${channel.id}}.`,
            color : 'BLUE',
            timestamp: new Date(),
            footer: {
                text: `${interaction.user.tag}`,
                icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
            },
        }
        interaction.reply({embeds : [embed]});

    }
};