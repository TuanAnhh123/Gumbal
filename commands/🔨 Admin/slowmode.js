const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('slowmode')
        .setDescription('Set slow mode')
        .addChannelOption(options => options.setName('channel').setDescription('Channel bạn muốn chọn'))
        .addNumberOption(options => options.setName('time').setDescription('Thời gian(tính bằng giây')),
    async execute(interaction , client) {
        const channel = interaction.options.getChannel('channel');
        const time = interaction.options.getNumber('time');

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
        {
            return interaction.reply('\`❌\` Bạn không có quyền để dùng lệnh này.')
        }

        if(!channel) return interaction.reply("\`❌\` Hãy chọn channel bạn muốn.");
        if(!time) return interaction.reply("\`❌\` Hãy chọn thời gian.");
        if(time>21600) return interaction.reply("\`❌\` Thời gian không hợp lệ.");


        const chosen_channel = interaction.client.channels.cache.get(`${channel.id}`);

        chosen_channel.setRateLimitPerUser(time);

        interaction.reply(`<:clock_icon:965069297590345728> <#${channel.id}> đã được set slowmode.`);

    }
};