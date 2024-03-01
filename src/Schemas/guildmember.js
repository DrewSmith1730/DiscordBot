const { Schema, model } = require('mongoose')

let test = new Schema({
    name: String,
    gearscore: Number,
    stance: Boolean,
    // add in an image addtion later
});

module.export = model('guildmember1', test)