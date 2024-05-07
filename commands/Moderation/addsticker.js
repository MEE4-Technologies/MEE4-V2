const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('addsticker')
    .setDescription('Adds a Sticker to the Server')
    .addAttachmentOption( option => option.setName('sticker').setDescription('The Sticker you want to Add').setRequired(true))
    .addStringOption( option => option.setName('name').setDescription('The Name for the Sticker').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuildExpressions),
    async execute(interaction) {
        const upload = interaction.options.getAttachment('sticker');
        const name = interaction.options.getString('name');

        if (name.length <= 3) return await interaction.reply({ content: `Your Sticker Name has to have at least 3 characters!`, ephemeral: true});
        if (upload.contentType === 'image/gif') return await interaction.reply({ content: `You cannot upload a GIF for the Sticker!`, ephemeral: true});

        await interaction.reply(`Uploading Your Sticker...`);

        const sticker = await interaction.guild.stickers.create({ file: `${upload.attachment}`, name: `${name}`}).catch(err => {
            setTimeout(() => {
                return interaction.editReply({ content: `${err.rawError.message}`});
            }, 2000)
        });

        const embed = new EmbedBuilder()
        .setColor("DarkBlue")
        .setTitle('Sticker Upload')
        .setDescription(`Your \`${name}\` Sticker has been uploaded to the guild. `)

        setTimeout(() => {
            if (!sticker) return;

            interaction.editReply({ content: ``, embeds: [embed]})
        }, 3000)
    }
}