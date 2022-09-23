const mongoose = require("mongoose");

//docs Schema
const DocumentSchema = mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  date: {
    type: Date,
  },
  body: {
    type: String,
  },
});

module.exports = mongoose.model("Document", DocumentSchema);
