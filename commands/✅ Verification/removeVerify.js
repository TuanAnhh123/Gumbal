const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('remove-verification')
        .setDescription('Remove verification system'),
    async execute(interaction,client) {
        const guild = interaction.guild.id;
        const db = interaction.client.db;

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

        if(db.fetch(`${guild}_verify`) === null)
        {
            const embed = {
                author: {
                    name: 'Error',
                    icon_url: 'https://cdn.discordapp.com/emojis/965142498416685106.gif?size=96&quality=lossless',
                },
                description : '<:false:964905677518696548> This server has no verification system.',
                color : 'BLUE',
                timestamp: new Date(),
                footer: {
                    text: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                },
            }
            return interaction.reply({embeds : [embed]});
        }
        
        const channel = await db.get(`${guild}_verify`);
        const role = await db.get(`${guild}_verified_role`);
        const mode = await db.get(`${guild}_verify_mode`);

        await db.delete(`${guild}_verify` , channel);
        await db.delete(`${guild}_verified_role` , role);
        await db.delete(`${guild}_verify_mode` , mode);

        const embed = {
            author: {
                name: 'Remove',
                icon_url: 'https://cdn.discordapp.com/emojis/967049012706422794.webp?size=96&quality=lossless',
            },
            description : `<:remove:967328034652848168> Removed the verification channel : <#${channel}>.\n<:remove:967328034652848168> Removed the verified role : <@&${role}>.\n<:remove:967328034652848168> Removed the verification mode : ${mode}.`,
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