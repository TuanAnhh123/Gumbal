const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('set-chatbot-channel')
        .setDescription('Set chat bot channel')
        .addChannelOption(options => options.setName('channel').setDescription('Channel bạn muốn chọn')),
    async execute(interaction,client) {
        const guild = interaction.guild.id;
        const db = interaction.client.db;

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
        {
            return interaction.reply('\`❌\` Bạn không có quyền để dùng lệnh này.')
        }

        const channel = interaction.options.getChannel('channel');

        if(!channel) return interaction.reply(`\`❌\` Hãy chọn channel bạn muốn.`);

        if(db.fetch(`${guild}_chatbot`) !== null)
        {
            return interaction.reply(`\`❌\` Server này đã có kênh chat bot.`);
        }

        await db.set(`${guild}_chatbot` , channel.id);

        interaction.reply(`<:robot_icon:965528654622883850> <#${channel.id}> đã được đặt làm chat bot channel.`)

    }
};