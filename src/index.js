const dotenv = require("dotenv");
const fs = require('node:fs');
const path = require('node:path');
dotenv.config();

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

client.commands = new Collection();

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);

});

// embed construction
// embed goals (diff color for the embed depending on the day of the week,
//              each team is gonna be a variable (mutually exclusive (cant be in one if in another)),
//              
//              )
client.on('messageCreate', (msg) => {
    // if message == "/creatembed"
    
});


client.on('messageCreate', (message) => {
    console.log(message);
    
});

client.login(process.env.DISCORD_TOKEN)