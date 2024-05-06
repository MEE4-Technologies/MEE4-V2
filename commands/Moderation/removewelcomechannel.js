const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('removewelcomechannel')
    .setDescription('Removes the current welcome channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute (interaction) {
        const embed1 = new EmbedBuilder()
        .setColor("DarkBlue")
        .setTitle("Welcome Channel Setting")
        .setDescription(`<:tick:1223008449558740993> Your Welcome Channel has successfully been removed.`)
        .setFooter({ text: 'Oh No! You have removed your Welcome Channel! Are you sure? This may will decrease your community engagement!'});
        
        await db.delete(`welcomechannel_${interaction.guild.id}`);
        
        await interaction.reply({ embeds: [embed1] });
    }
}