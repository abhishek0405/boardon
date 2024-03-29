#!/usr/bin/env node

const http = require("http");

const config = require("../config")[process.env.NODE_ENV || "development"];

const log = config.log();
const service = require("../index.js");

const server = http.createServer(service);
// console.log(process.env.MONGOURL)
server.listen(process.env.PORT || 3005);

server.on("listening", () => {
  log.info(
    `Hi there! I'm listening on port ${server.address().port} in ${service.get(
      "env"
    )} mode.`
  );
});
