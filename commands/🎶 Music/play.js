const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const distube = require('../../utils/distubeUtils');
const { MessageEmbed , MessageActionRow , MessageButton } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('play')
        .setDescription('Listening to music')
        .addStringOption(options => options.setName('song').setDescription('The song name or url')),
    async execute(interaction,client) {
        const song = interaction.options.getString('song');

        if(!song) 
        {
            const embed = {    
                description : '<:false:964905677518696548> You need to enter the song name.',
                color : 'RED',
            }
            return interaction.reply({embeds : [embed]});
        }

        if(!interaction.member.voice.channel)
        {
            const embed = {
                description : '<:false:964905677518696548> You need to join voice channel to use this command.',
                color : 'RED',
            }
            return interaction.reply({embeds : [embed]});
        }
        const mChannel = interaction.member.voice.channel;
        const cChannel = interaction.guild.me.voice.channel;
        if (cChannel && mChannel.id !== cChannel.id) 
        {
            const embed = {
                description : '<:false:964905677518696548> I\'m playing music in other voice channel.',
                color : 'RED',
            }
            return interaction.reply({embeds : [embed]});
        }

        distube.play(interaction.member.voice.channel , song , {
            textChannel : interaction.channel,
            member : interaction.member,
        })

        const embed = {
            description : '<a:load:964783848145707048> Searching...',
            color : 'BLUE',
        }

        interaction.reply({embeds : [embed]});
    }
};