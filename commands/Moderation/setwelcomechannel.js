const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
   .setName("setwelcomechannel")
   .setDescription("Set the welcome channel")
   .addChannelOption((option) =>
      option
       .setName("channel")
       .setDescription("The channel you want to set")
       .setRequired(true)
    )
   .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    try {
      const channel = interaction.options.getChannel("channel");
      if (!channel.isTextBased()) {
        await interaction.reply({
          content: "Please provide a valid text channel.",
          ephemeral: true,
        });
        return;
      }

      await setWelcomeChannel(interaction, channel);
    } catch (error) {
      await interaction.reply({
        content: "An error occurred while setting the welcome channel.",
        ephemeral: true,
      });
      console.error(error);
    }
  },
};

async function setWelcomeChannel(interaction, channel) {
  const embed = new EmbedBuilder()
   .setColor("DarkBlue")
   .setTitle("Welcome Channel Setting")
   .setDescription(
      `<:tick:1223008449558740993> Your Welcome Channel has successfully been set to ${channel}.`
    )
   .setFooter({
      text: "Your members will now be greeted, therefore encouraging more community engagement. Well Done!",
    });

  await db.set(`welcomechannel_${interaction.guild.id}`, channel.id);
  await interaction.reply({ embeds: [embed] });
}