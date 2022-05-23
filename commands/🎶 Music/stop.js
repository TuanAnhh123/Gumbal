const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');
const distube = require('../../utils/distubeUtils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the player'),
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

        distube.stop(interaction);

        const embed = {
            description : '<:stop_music:967350636058386503> Stopped the player.',
            color : 'BLUE',
        }
        interaction.reply({embeds : [embed]});

    },
};