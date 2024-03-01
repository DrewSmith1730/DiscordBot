const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");
const mongoURL = process.env.mongoURL;

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setActivity({
      name: "Streaming status",
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/yeerekt",
    });

    if (!mongoURL) return;

    await mongoose.connect(mongoURL || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongoose.connect) {
      console.log("I have connected to the data base");
    } else {
      console.log("I cannotconnect to the database right now...");
    }
  },
};
