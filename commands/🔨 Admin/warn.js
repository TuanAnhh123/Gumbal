const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { execute } = require('./lockdown');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn ai đó,nếu họ phạm luật')
        .addUserOption(options => options.setName('user').setDescription('Người bạn muốn warn'))
        .addStringOption(options => options.setName('reason').setDescription('Lý do warn')),
    async execute(interaction , client) {
        const guild = interaction.guild.id;
        const db = interaction.client.db;
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.MODERATE_MEMBERS))
        {
            return interaction.reply('\`❌\` Bạn không có quyền để dùng lệnh này.');
        }

        if(!user) return interaction.reply("\`❌\` Hãy chọn người bạn muốn warn.");
        if(user.bot) return interaction.reply("\`❌\` Bạn không thể warn 1 con bot.");
        if(user.id === interaction.user.id) return interaction.reply("\`❌\` Bạn không thể tự warn bản thân.");
        if(!reason) return interaction.reply("\`❌\` Hãy ghi lý do warn.");

        db.add(`${user.id}_${guild}_warn` , 1);

        var cnt = db.fetch(`${user.id}_${guild}_warn`);

        interaction.reply(`<a:warning:965142498416685106> \`${user.tag}\` đã bị warn vì **${reason}**.Số lần bị warn : **${cnt}**.`)
    }
}