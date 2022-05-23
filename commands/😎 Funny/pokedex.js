const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pokedex')
        .setDescription('Show information about a pokemon')
        .addStringOption(options => options.setName('name').setDescription('Pokemon name')),
    async execute(interaction) {
        const name = interaction.options.getString('name');

        if(!name)
        {
            const embed = {
                description : '<:false:964905677518696548> You need to enter pokemon name.',
                color : 'RED',
            }
            return interaction.reply({embeds : [embed]});
        }
        else
        {
            fetch(`https://some-random-api.ml/pokedex?pokemon=${name}`)
                .then(response => response.json())
                .then(data => {
                    const embed = {
                        title : `Information about ${name}`,
                        color : 'BLUE' , 
                        fields : [
                            {
                                name : `🏁 Name`,
                                value : `> ${data.name}.`,
                                inline : false,
                            },
                            {
                                name : `🆔 Id`,
                                value : `> ${data.id}.`,
                                inline : false,
                            },
                            {
                                name : `💥 Type`,
                                value : `> ${data.type}.`,
                                inline : false,
                            },
                            {
                                name : `🐕‍🦺 Species`,
                                value : `> ${data.species[0]},${data.species[1]}.`,
                                inline : false,
                            },
                            {
                                name : `🚩 Abilities`,
                                value : `> ${data.abilities[0]},${data.abilities[0]}.`,
                                inline : false,
                            },
                            {
                                name : `💁‍♂️ Height`,
                                value : `> ${data.height}.`,
                                inline : false,
                            },
                            {
                                name : `🔥 Weight`,
                                value : `> ${data.weight}.`,
                                inline : false,
                            },
                            {
                                name : `⚡ Base experience`,
                                value : `> ${data.base_experience}.`,
                                inline : false,
                            },
                            {
                                name : `⚙ Gender`,
                                value : `> ${data.gender[0]},${data.gender[1]}.`,
                                inline : false,
                            },
                            {
                                name : `🥚 Egg groups`,
                                value : `> ${data.egg_groups}.`,
                                inline : false,
                            },
                            {
                                name : `📊 Stats`,
                                value : `
                                > Hp : ${data.stats.hp}.
                                > Attack : ${data.stats.attack}.
                                > Defense : ${data.stats.defense}.
                                > Sp_atk : ${data.stats.sp_atk}.
                                > Sp_def : ${data.stats.sp_def}.
                                > Speed : ${data.stats.speed}.
                                > Total : ${data.stats.total}.
                                `,
                                inline : false,
                            },
                            {
                                name : `👪 Family`,
                                value : `
                                > Evolution Stage : ${data.family.evolutionStage}.,
                                > Evolution Line : ${data.family.evolutionLine[0]},${data.family.evolutionLine[1]},${data.family.evolutionLine[2]}.
                                `,
                                inline : false,
                            },
                            {
                                name : `💯 Description`,
                                value : `> ${data.description}`,
                                inline : false,
                            },
                            {
                                name : `💎 Generation`,
                                value : `> ${data.generation}.`,
                                inline : false,
                            }
                        ],
                        thumbnail : {
                            url: `${data.sprites.animated}`,
                        },
                    }
                    interaction.reply({embeds : [embed]})
                })
        }
    }
}