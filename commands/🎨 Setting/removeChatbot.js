const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('remove-chatbot-channel')
        .setDescription('Xóa chat bot channel'),
    async execute(interaction,client) {
        const guild = interaction.guild.id;
        const db = interaction.client.db;

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
        {
            return interaction.reply('\`❌\` Bạn không có quyền để dùng lệnh này.')
        }

        if(db.fetch(`${guild}_chatbot`) === null)
        {
            return interaction.reply(`\`❌\` Server này không có kênh chat bot nên không xóa được.`);
        }

        const channel = await db.get(`${guild}_chatbot`);

        await db.delete(`${guild}_chatbot` , channel)

        interaction.reply(`<:robot_icon:965528654622883850> <#${channel}> đã không còn là chat bot channel.`)

    }
};