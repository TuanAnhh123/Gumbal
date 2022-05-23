const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');
const distube = require('../../utils/distubeUtils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip to the next song in queue'),
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
        if(queue.songs.length == 1)
        {
            const embed = {
                description : '<:false:964905677518696548> There is no next song.',
                color : 'RED',
            }
            return interaction.reply({embeds : [embed]});
        }

        distube.skip(interaction);

        const embed = {
            description : '<:list:975691830366715916> Skipped to the next song.',
            color : 'BLUE',
        }

        interaction.reply({embeds : [embed]});

    },
};