const mongoose = require("mongoose");

//docs Schema
const DocsSchema = mongoose.Schema({
  username: {
    type: String,
  },
  documents: {
    type: {},
  },
});

module.exports = mongoose.model("Docs", DocsSchema);
