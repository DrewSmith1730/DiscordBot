const dotenv = require("dotenv");
const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");

// set up dotenv right away
dotenv.config();

// init all parts of the discord.js used
const {
  Client,
  IntentsBitField,
  Collection,
  Events,
  Embed,
  embedLength,
  EmbedBuilder,
} = require("discord.js");
// client init with each part of the server(guild) that the bot can see
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

// command handling adding all the commands in the src/commands/utilities file to this for the
// execution of each command
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
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// just like the commands code above it pulls in the files
// this code here makes the database connection
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

// default
client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
});

// command function (this will allow all commands to be read?? i think tbd...)
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
    // the output of these functions handled here?
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

// basic message reader
client.on("messageCreate", (message) => {
  // stip chacters that create vulnerabilities
  // check for prefix right away
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
    return;

  // split the message for its arguments and command while also remvoing the prefix
  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(" ");
  // takes the first arg out of args and saves it as command
  const command = args.shift().toLowerCase();

  if (command === "wartemp") {
    // create the enbed for the war here
    const testEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setAuthor({ name: "Disband Guild Alliance Node War Sign Up" })
      .setTitle("Date for the given node war")
      .setDescription(
        "React with the given options do not react more then once"
      )
      // working fields add
      .addFields(
        // non functional display of array values in
        testarray.flatMap((user) => [
          { name: "User Name", value: user.username, inline: true },
        ])
      )
      .setTimestamp()
      .setFooter({
        text: "War Template creation embed",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });

    message.channel.send({ embeds: [testEmbed] }).then((embedMessage) => {
      // ensure react order to message
      embedMessage.react("✅").then(() => embedMessage.react("❌"));
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
