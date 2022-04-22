const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed , MessageActionRow , MessageButton } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('un-lock')
        .setDescription('Mở khóa 1 channel nào đó')
        .addChannelOption(options => options.setName('channel').setDescription('Channel bạn muốn chọn')),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_CHANNELS))
        {
            return interaction.reply('\`❌\` Bạn không có quyền để dùng lệnh này.')
        }
        if(!channel) return interaction.reply("\`❌\` Hãy chọn channel bạn muốn.");

        channel.permissionOverwrites.create(interaction.guild.id , { 
            SEND_MESSAGES : true
        });

        interaction.reply(`<:unlock2:964388270005964824> <#${channel.id}> đã được **unlock**.`);
    }
};