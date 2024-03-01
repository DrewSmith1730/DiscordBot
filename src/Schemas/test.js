const { Schema, model } = require("mongoose");

const test = new Schema({
  _id: Schema.Types.ObjectId,
  test: String,
});

module.export = model("testSchema1243", test, "TestData");
