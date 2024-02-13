// command for adding gear into the data base for a given player

// add arguments for Gear score 

// const { SlashCommandBuilder } = require('discord.js');

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('gearscore')
// 		.setDescription('/gearscore DISCORD Profile Spec (0 = Awaken, 1 = Succ) ###')
//         .addUserOption((option) =>
//             option.setName('user').setDescription('Your user name')
//         )
//         .addStringOption(option =>
//             option
//                 .setName('spec')
//                 .setDescription('Awk or Succ')
//                 .addChoices({ name: 'Awkakening', value: 0}, {name: 'Succession', value: 1}),       
//         )
//         .addIntegerOption((option) =>
//             option.setName('gs').setDescription('AP+DP or AAP+DP')
//         ),
// 	async execute(interaction) {
// 		// this is where the gear score is added to a db 
//         // interaction.user is the object representing the User who ran the command
// 		// interaction.member is the GuildMember object, which represents the user in the specific guild

//         // place holder code for function testing
//         await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
// 	},
// };