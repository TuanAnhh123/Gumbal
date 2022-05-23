const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const distube = require('../../utils/distubeUtils');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Enable repeat mode'),
    async execute(interaction, client) {
        if(!interaction.member.voice.channel)
        {
            const embed = {
                description : '<:false:964905677518696548> You need to join voice channel to use this command.',
                color : 'RED',
            }
            return interaction.reply({embeds : [embed]});
        }

        const queue = distube.getQueue(interaction);

        if(!queue)
        {
            const embed = {
                description : '<:false:964905677518696548> There is no song right now.',
                color : 'RED',
            }
            return interaction.reply({embeds : [embed]});
        }

        distube.setRepeatMode(interaction);

        const embed = {
            description : '<:loop_song:967350635504742401> Enable repeat mode.',
            color : 'BLUE',
        }

        interaction.reply({embeds : [embed]});
    },
};