const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction,client) {
        const { Captcha } = require('captcha-canvas');
        const db = interaction.client.db;
        const guild = interaction.guild.id;

        if(interaction.isButton())
        {
            if(interaction.customId == 'verify')
            {
                const verify = db.get(`${guild}_verify`);
                const mode = await db.get(`${guild}_verify_mode`);
                const verified_role = await db.get(`${guild}_verified_role`);
                if(mode == 'none' && verify!==null)
                {
                    interaction.guild.roles.fetch(verified_role)
                        .then(roles => interaction.member.roles.add(roles))
                    const embed = {
                        author: {
                            name: 'Verification result',
                            icon_url: 'https://cdn.discordapp.com/emojis/911584289060159489.gif?size=44&quality=lossless',
                        },
                        description : `<:true:964905677824852018> You verified successfully.`,
                        color : 'GREEN',
                        timestamp: new Date(),
                        footer: {
                            text: `${interaction.user.tag}`,
                            icon_url: `${interaction.user.displayAvatarURL({dynamic : true})}`,
                        },
                    }
                    await interaction.reply({embeds : [embed] , ephemeral : true});
                }
                else if(mode == 'captcha'&& verify!==null)
                {
                    const captcha = new Captcha();
                    captcha.async = true;
                    captcha.addDecoy();
                    captcha.drawTrace();
                    captcha.drawCaptcha();

                    const captchaAttachment = new MessageAttachment(
                        await captcha.png , "captcha.png"
                    );
                    
                    const filter = (message) => {
                        if(message.author.id !== interaction.user.id) return;
                        if(message.content === captcha.text) return true;
                        else return false;
                    };

                    interaction.channel.send({files : [captchaAttachment]}).then(() => {
                        interaction.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] }).then(collected => {
                            interaction.reply(`${collected.first().author} got the correct answer!`);
                        })
                    });
                }
            }
        }
		if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
	},
};