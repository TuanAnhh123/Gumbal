const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
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
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '❌ You need to enter the song name.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }

        if(!interaction.member.voice.channel)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
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
        const mChannel = interaction.member.voice.channel;
        const cChannel = interaction.guild.me.voice.channel;
        if (cChannel && mChannel.id !== cChannel.id) 
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '❌ I\'m playing music in other voice channel.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }

        interaction.client.distube.play(interaction.member.voice.channel , song , {
            textChannel : interaction.channel,
            member : interaction.member,
        })

        const embed = {
            author: {
                name: 'Searching music',
                icon_url: 'https://cdn.discordapp.com/emojis/962926434597363712.gif?size=128&quality=lossless',
            },
            description : '<a:load:964783848145707048> Searching...',
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