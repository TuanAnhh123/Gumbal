const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('giveaway-end')
        .setDescription('Start a giveaway')
        .addStringOption(options => options.setName('id').setDescription('Message ID of giveaway')),
    async execute(interaction,client) {

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR))
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

        const id = interaction.options.getString('id');

        if(!id)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> You need to enter message ID of giveaway.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }

        const giveaway = interaction.client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === id);

        if (!giveaway) 
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> Unabled to find the giveaway.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }
        
        interaction.client.giveaways.end(id)
    }
};