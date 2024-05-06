const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Embed,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("A Classic 8 Ball Game")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question you want to ask the bot")
        .setRequired(true)
    ),
  async execute(interaction) {
    console.log(interaction)
    const { options } = interaction;
    const question = options.getString("question");
    const choice = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful.",
    ];
    const ball = Math.floor(Math.random() * choice.length);

    const embed = new EmbedBuilder()
    .setColor("DarkBlue")
    .setTitle(`🎱 | ${interaction.user.username}'s 8Ball Game`)
    .addFields(
        { name: "Question", value: `${question}`, inline: true},
    )

    const embed2 = new EmbedBuilder()
    .setColor("DarkBlue")
    .setTitle(`🎱 | ${interaction.user.username}'s 8Ball Game`)
    .addFields(
        { name: "Question", value: `${question}`, inline: true},
        { name: "Answer", value: `${choice[ball]}`, inline: true},
    )

    const button = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId('button')
        .setLabel(`🎱 Roll The 8Ball!`)
        .setStyle(ButtonStyle.Primary)
    )

    const msg = await interaction.reply({ embeds: [embed], components: [button]});

    const collector = msg.createMessageComponentCollector();

    collector.on('collect', async i => {
        if(i.customId === 'button') {
            await i.update({ embeds: [embed2], components: [] });
        }
    })
  },
};
