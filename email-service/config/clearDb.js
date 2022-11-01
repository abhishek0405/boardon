//to clear employees except a few
const mongoose = require("mongoose");
const config = require("../config")[process.env.NODE_ENV || "development"];
const Employee = require("../api/models/employee");
const log = config.log();
require("dotenv").config();
MONGO_URI =
  "mongodb+srv://abhishek:abhishek@cluster0.0wcibxy.mongodb.net/BoardOn?retryWrites=true&w=majority";
log.info(MONGO_URI);
const clearDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log.info(`MongoDB Connected`);
    const res = await Employee.remove({
      _id: { $nin: ["634d2ecedf114ed0cb547091", "634d2ecedf114ed0cb547094"] },
    });
    log.info(res);
  } catch (err) {
    log.info(err);
    process.exit(1);
  }
};

clearDB();
