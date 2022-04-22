const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { execute } = require('./lockdown');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('unwarn')
        .setDescription('Unwarn ai đó')
        .addUserOption(options => options.setName('user').setDescription('Người bạn muốn unwarn'))
        .addStringOption(options => options.setName('reason').setDescription('Lý do unwarn')),
    async execute(interaction , client) {
        const guild = interaction.guild.id;
        const db = interaction.client.db;
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MODERATE_MEMBERS))
        {
            return interaction.reply('\`❌\` Bạn không có quyền để dùng lệnh này.');
        }

        if(!user) return interaction.reply("\`❌\` Hãy chọn người bạn muốn unwarn.");
        if(user.bot) return interaction.reply("\`❌\` Bạn không thể unwarn 1 con bot.");
        if(user.id === interaction.user.id) return interaction.reply("\`❌\` Bạn không thể tự unwarn bản thân.");
        if(!reason) return interaction.reply("\`❌\` Hãy ghi lý do unwarn.");

        db.subtract(`${user.id}_${guild}_warn` , 1);

        var cnt = db.fetch(`${user.id}_${guild}_warn`);

        if(cnt<0)
        {
            db.add(`${user.id}_${guild}_warn` , 0-cnt);
            return interaction.reply(`\`❌\` \`${user.tag}\` chưa bị warn lần nào.`)
        }

        interaction.reply(`<a:warning:965142498416685106> \`${user.tag}\` đã được unwarn vì **${reason}**.Số lần bị warn : **${cnt}**.`)
    }
}