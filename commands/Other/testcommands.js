const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('testcommand')
    .setDescription('Test Command for MEE4. DEV ONLY'),
    async execute (interaction) {
        if (!interaction.user.id === '1191033400589553767') {
            interaction.reply({ content: 'You are not a MEE4 Developer therefore you cannot run this command.', ephemeral: true });
            return;
        }
        await interaction.reply({ content: 'Test Command was ran successfully. ', ephemeral: true });
    }
}