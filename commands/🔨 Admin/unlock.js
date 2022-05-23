const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed , MessageActionRow , MessageButton } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('un-lock')
        .setDescription('Unlock a channel')
        .addChannelOption(options => options.setName('channel').setDescription('The channel you want')),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
        {
            const embed = {
                description : '<:false:964905677518696548> You do not have permission to use this command.',
                color : 'RED',
            }
            return interaction.reply({embeds : [embed]});
        }
        if(!channel) 
        {
            const embed = {
                description : '<:false:964905677518696548> You need to choose the channel you want.',
                color : 'RED',
            }
            return interaction.reply({embeds : [embed]});
        }
        if(channel.type !== 'GUILD_TEXT')
        {
            const embed = {
                description : '<:false:964905677518696548> You need to choose a text channel.',
                color : 'RED',
            }
            return interaction.reply({embeds : [embed]});
        }

        channel.permissionOverwrites.create(interaction.guild.id , { 
            SEND_MESSAGES : true,
        });

        const embed = {
            description : `<:unlock2:964388270005964824> Unlocked <#${channel.id}>.`,
            color : 'BLUE',
        }

        interaction.reply({embeds : [embed]});
    }
};