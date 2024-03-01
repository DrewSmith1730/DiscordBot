// basic delete for an entire table/schema for the mongodb basic test/usage

const { SlashCommandBuilder } = require('discord.js');
const testSchema = require('../../Schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('delete-schema')
    .setDescription('removing a schema'),
    async execute (interaction) {

        // use .findOne({ name: 'fill name here'}) this is only for if you know who to remove
        const data = await testSchema.find();

        await data.forEach(async d => {
            await testSchema.deleteOne({ name: d.name });
        });

        await interaction.reply({ content: `i deleted the values`});

    }
}