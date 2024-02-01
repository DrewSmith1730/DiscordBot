// command for adding gear into the data base for a given player

// add arguments for Gear score 

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gearscore')
		.setDescription('/gearscore DISCORD Profile Spec (0 = Awaken, 1 = Succ) ###')
        .addUserOption((option) =>
            option.setName('user').setDescription('Your user name')
        )
        .addStringOption(option =>
            option
                .setName('spec')
                .setDescription('Awk or Succ')
                .addChoices({ name: 'Awkakening', value: 0}, {name: 'Succession', value: 1}),       
        )
        .addIntegerOption((option) =>
            option.setName('gs').setDescription('AP+DP or AAP+DP')
        ),
	async execute(interaction) {
		var 
	},
};