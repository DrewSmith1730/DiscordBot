// Basic data reader for a schema based mongodb using mongoose basic test/usage.

const { SlashCommandBuilder } = require('discord.js');
const testSchema = require('../../Schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('read-schema')
    .setDescription('Testing a schema'),
    async execute (interaction) {

        const data = await testSchema.find();

        var values = [];
        // d = data coming from the database
        await data.foreach(async d => {
            values.push(d.name);
        });

        await interaction.reply({ content: `${values.join('\n')}`});

    }
}