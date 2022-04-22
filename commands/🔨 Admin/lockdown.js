const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('lockdown')
        .setDescription('Lock down 1 channel nào đó')
        .addChannelOption(options => options.setName('channel').setDescription('Channel bạn muốn chọn')),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
        {
            return interaction.reply('\`❌\` Bạn không có quyền để dùng lệnh này.')
        }
        if(!channel) return interaction.reply("\`❌\` Hãy chọn channel bạn muốn.");

        channel.permissionOverwrites.create(interaction.guild.id , { 
            SEND_MESSAGES : false,
        });

        interaction.reply(`<:lockdown:964388269754310717> <#${channel.id}> đã bị **lock down**.`);

    }
};