// command for adding gear into the data base for a given player

// add arguments for Gear score 
// Schema for database input along with using mongoose instead of mongodb bc its a static database

const { Schema, model } = require('mongoose')
const { SlashCommandBuilder } = require('discord.js') 

let msglog = new Schema({
    Guild: String,
    Channel: String,
    LogChannel: String,
    
})


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping47')
		.setDescription('Replies with Pong.'),
	async execute(interaction, client) {
		await interaction.reply({ content: 'Pong!!'});
	},
};