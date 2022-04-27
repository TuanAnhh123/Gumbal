const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { execute } = require('./removeSuggest');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('enable-anti-ghostping')
        .setDescription('Enable anti ghost ping feature'),
    async execute(interaction,client)
    {
        const guild = interaction.guild.id;
        const db = interaction.client.db;

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES))
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

        db.set(`${guild}_ghostping` , 1);

        const embed = {
            author: {
                name: 'Enable',
                icon_url: 'https://cdn.discordapp.com/emojis/937596957856243722.gif?size=96&quality=lossless',
            },
            description : '<:true:964905677824852018> Enabled anti ghost ping feature.',
            color : 'BLUE',
            timestamp: new Date(),
            footer: {
                text: `${interaction.user.tag}`,
                icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
            },
        }

        interaction.reply({embeds : [embed]});

    }
}