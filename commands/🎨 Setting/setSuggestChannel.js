const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('set-suggest-channel')
        .setDescription('Set suggestion channel')
        .addChannelOption(options => options.setName('channel').setDescription('The channel you want')),
    async execute(interaction,client) {
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

        const channel = interaction.options.getChannel('channel');

        if(!channel) 
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> You need to choose the channel you want.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }
        if(channel.type !== 'GUILD_TEXT')
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> Please mention a text channel.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }
        if(db.fetch(`${guild}_suggest`) !== null)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> This server is already has suggestion channel.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }

        await db.set(`${guild}_suggest` , channel.id);

        const embed = {
            author: {
                name: 'Setup',
                icon_url: 'https://cdn.discordapp.com/emojis/967049012626731028.webp?size=96&quality=lossless',
            },
            description : `<:true:964905677824852018> Added suggestion channel : <#${channel.id}>.`,
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