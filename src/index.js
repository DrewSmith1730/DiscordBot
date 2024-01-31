const dotenv = require("dotenv");
const fs = require('node:fs');
const path = require('node:path');

dotenv.config();

const { Client, IntentsBitField } = require("discord.js");

const client = new Client ({
    intents: [
        // bitfields mean the parts of the server(guild) that the bot can access
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions
    ],
});

// command handling
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
// 	const commandsPath = path.join(foldersPath, folder);
// 	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// 	for (const file of commandFiles) {
// 		const filePath = path.join(commandsPath, file);
// 		const command = require(filePath);
// 		// Set a new item in the Collection with the key as the command name and the value as the exported module
// 		if ('data' in command && 'execute' in command) {
// 			client.commands.set(command.data.name, command);
// 		} else {
// 			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 		}
// 	}
// }


// default
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);

});

// command function
client.on(Events.InteractionCreate, interaction => {
    // not all interations are chat commands this filters it to only use the chat commands
	if (!interaction.isChatInputCommand()) return;
	console.log(interaction);
});

// basic message reader
client.on('messageCreate', (message) => {
    console.log(message);
    
});

client.login(process.env.DISCORD_TOKEN)