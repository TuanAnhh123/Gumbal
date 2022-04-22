const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the player'),
    async execute(interaction, client) {
        if(!interaction.member.voice.channel)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/964905677518696548.webp?size=96&quality=lossless',
                },
                description : '❌ You need to join voice channel to use this command.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }

        const queue = interaction.client.distube.getQueue(interaction);

        if(!queue)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/964905677518696548.webp?size=96&quality=lossless',
                },
                description : '❌ There is no song right now.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }

        interaction.client.distube.stop(interaction);

        const embed = {
            author: {
                name: 'Stop',
                icon_url: 'https://cdn.discordapp.com/emojis/962926434597363712.gif?size=128&quality=lossless',
            },
            description : '⏹ Stopped the player.',
            color : 'BLUE',
            timestamp: new Date(),
            footer: {
                text: `${interaction.user.tag}`,
                icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
            },
        }
        interaction.reply({embeds : [embed]});

    },
};