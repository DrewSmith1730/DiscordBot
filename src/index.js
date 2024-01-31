const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.DISCORD_TOKEN);
console.log(process.env.DISCORD_GUILD);

const { Client, IntentsBitField } = require("discord.js");

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions
    ],
});

client.login()