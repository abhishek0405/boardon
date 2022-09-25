const mongoose = require("mongoose");
const config = require("../config")[process.env.NODE_ENV || "development"];
const log = config.log();
MONGO_URI = "mongodb+srv://vishaka:Vishaka@cluster0.u0mor.mongodb.net/documents-service?retryWrites=true&w=majority"
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      log.info(`MongoDB Connected`);
    } catch (err) {
      log.info(err);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;