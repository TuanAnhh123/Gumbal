const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../📄 embed/help.json');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('help')
        .setDescription('Show all the commands of this bot'),
    async execute(interaction,client) {

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
        interaction.reply({embeds : [config]});
    }
};