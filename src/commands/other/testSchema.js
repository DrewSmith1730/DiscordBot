// mongoose style schema input for mongodb test/basic usage

const { SlashCommandBuilder } = require("discord.js");
const testSchema = require("../../Schemas/test");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test-schema")
    .setDescription("Testing a schema")
    .addStringOption((option) =>
      option
        .setName("schema-input")
        .setDescription("text to save")
        .setRequired(true)
    ),
  async execute(interaction) {
    // use this line in the future to find a entry for a player already in the data base if not move past and create a entry for that player.
    let testData = await testSchema.findOne({ test: "Testdata" });
    if (!testData) {
      testData = await new testSchema({
        _id: mongoose.Types.ObjectId(),
        test: option,
      });

      await testData.save().catch(console.error);
      await interaction.reply({
        content: `Text saved: ${testData.test}`
      });
      console.log(testData);
    }
  },
};
