const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');
const distube = require('../../utils/distubeUtils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('View your queue'),
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
        
        const embed = {
            title : `__${interaction.guild.name}__'s queue.`,
            description : `${queue.songs.map((song, id) =>`**${id ? id : 'Playing'}**. ${song.name} - \`${song.formattedDuration}\``,).slice(0, 10).join('\n')}`,
            color : `BLUE`,
            timestamp: new Date(),
            footer: {
                text: `${interaction.user.tag}`,
                icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
            },
        }

        interaction.reply({embeds : [embed]});

    },
};