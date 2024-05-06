const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('addemoji')
    .setDescription('Adds an Emoji to the Current Server.')
    .addAttachmentOption(option => option.setName('emoji').setDescription('The Emoji you want to add to the Server.').setRequired(true))
    .addStringOption( option => option.setName('name').setDescription('The Name for the Emoji.').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuildExpressions),
    async execute (interaction) {
        const upload = interaction.options.getAttachment('emoji');
        const name = interaction.options.getString('name');

        await interaction.reply({ content: `Uploading Your Emoji...`});

        const emoji = await interaction.guild.emojis.create({ attachment: `${upload.attachment}`, name: `${name}`}).catch(err => {
            setTimeout(() => {
                console.log(err)
                return interaction.editReply({ content: `${err.rawError.message}`});
            }, 2000)
        });

        setTimeout(() => {
            if (!emoji) return;

            const embed = new EmbedBuilder()
            .setColor("DarkBlue")
            .setTitle('Emoji Upload')
            .setDescription(`Your emoji (${emoji}) has been successfully uploaded to the guild.`);

            interaction.editReply({ content: ``, embeds: [embed]})
        }, 3000)
    }
}