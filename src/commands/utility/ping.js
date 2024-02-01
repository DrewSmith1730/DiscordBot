// test function to make sure discord / commands would work for what i wanted todo
const { SlashCommandBuilder } = require('discord.js');

// 
module.exports = {
	data: new SlashCommandBuilder()
		.setName('gearhelp')
		.setDescription('Lists all commands'),
	async execute(interaction) {
		await interaction.reply('Pong');
	},
};



// const pingCommand = new SlashCommandBuilder().setName('ping').setDescription('checks to make sure the basics work for command set up and usage');
