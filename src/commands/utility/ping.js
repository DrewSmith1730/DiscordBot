// test function to make sure discord / commands would work for what i wanted todo
const { SlashCommandBuilder } = require('discord.js');

// 
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping2')
		.setDescription('Replies with Pong.'),
	// updated the execute to be more typical rather then bare bones
	async execute(interaction, client) {
		await interaction.reply({ content: 'Pong!!'});
	},
};