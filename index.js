const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits, ActivityType, Events } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let status = [
  {
    name: "The Best Free Discord Bot",
    type: ActivityType.Competing,
  },
];

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const { QuickDB } = require("quick.db");
const db = new QuickDB();
client.on(Events.GuildMemberAdd, async (member) => {
  const channelId = await db.get(`welcomechannel_${member.guild.id}`);
  const channel = member.guild.channels.cache.get(channelId);
  const message = `Welcome to **${message.guild.name}**, ${member}! We hope you enjoy your stay!`;
  if (channelId === null) return;
  channel.send(message);
});

client.login(token);
