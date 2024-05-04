const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("Shutdown MEE4")
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the Shutdown")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (!interaction.user.id === "1191033400589553767") {
      interaction.reply({
        content: "❌ You do not have permission to run this command.",
      });
      return;
    }

    const { options } = interaction;
    const message = options.getString("message");

    const guilds = await client.guilds.fetch();

    var owners = [];
    await guilds.forEach(async (guild) => {
      var guildInfo = await client.guilds.fetch(guild.id);
      owners.push(guildInfo.ownerId);
    });

    owners = [...new Set(owners)];

    await owners.forEach(async (owner) => {
      var user = await client.users.fetch(owner);
      await user
        .send(`⚠️ MEE4 is shutting down due to ${message}`)
        .catch((err) => {});
    });

    await interaction.reply({
      content: `🫴 MEE4 has been shut down. `,
      ephemeral: true,
    });
    await process.exit();
  },
};
