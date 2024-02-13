const dotenv = require("dotenv");
const fs = require('node:fs');
const path = require('node:path');
const mysql = require("mysql2");

dotenv.config();

// init all parts of the discord.js used
const { Client, IntentsBitField, Collection, Events, Embed, embedLength, EmbedBuilder } = require("discord.js");
// client init with each part of the server(guild) that the bot can see
const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions
    ],
});

// command handling adding all the commands in the src/commands/utilities file to this for the
// execution of each command
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// default
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);

});

// command function (this will allow all commands to be read?? i think tbd...)
client.on(Events.InteractionCreate, async interaction => {
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
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// basic message reader
client.on('messageCreate', (message) => {
    console.log(message);
    
});


// Node war embeds
client.on('wartemp', function(wartemp){
	if(wartemp.author.bot) return // if message was made by bot ignore and move on
	if(wartemp.content.toLowerCase() === process.env.PREFIX + "wartemp"){
		// create the enbed for the war here
		const testEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Node war')
			.setAuthor({ name: 'Some Name', iconURL: 'https://imgur.com/vhAUdJy', url: 'https://discord.js.org' })
			.setDescription('Some description here')
			.setThumbnail('https://imgur.com/vhAUdJy')
			// will be a for each loop for the arrays of each team
			// for now atleast each array of players will be stored in a json file with the 
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
			)
			.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
			.setImage('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp()
			.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

		channel.send({ embeds: [testEmbed]});
	}
});


client.login(process.env.DISCORD_TOKEN)