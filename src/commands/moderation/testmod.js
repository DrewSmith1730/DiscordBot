const { SlashCommandBuilder } = require('discord.js');

// 
module.exports = {
	data: new SlashCommandBuilder()
		.setName('modepingtest')
		.setDescription('Replies with Pong but in moderator folder.'),
	// updated the execute to be more typical rather then bare bones
	async execute(interaction, client) {
		await interaction.reply({ content: 'Pong!!'});
	},
};