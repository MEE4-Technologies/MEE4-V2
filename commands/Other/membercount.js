const { SlashCommandBuilder, EmbedBuilder }  = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Get the Member Count of the Current Server.'),

    async execute(interaction, client) {
        const membercountEmbed = new EmbedBuilder()
        .setTitle(`Member Count for ${interaction.guild.name}`)
        .setDescription(`${interaction.guild.memberCount} Total Members`)
        .setColor("DarkBlue")
        .setFooter({ text: `${Date.now()}`});
    
        interaction.reply({ embeds: [membercountEmbed]})
    }
}