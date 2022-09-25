const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const axios = require("axios").default;
const Document = require("../models/document");
const esUrl = process.env.ELASTIC_SEARCH_URL;
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: esUrl,
});
const uploadDocumentation = async (req, res) => {
  log.info("Uploading Documentation");

  const documentObj = {
    ...req.body,
    date: new Date(),
    companyID: req.userData.cid,
  };
  log.info(documentObj);
  await client.index({
    index: "documents",
    document: documentObj,
  });
  log.info("Inserted");
  return res.json("Inserted Document");
  // const document = new Document(documentObj);
  // document
  //   .save()
  //   .then((obj) => {
  //     log.info("Saved to DB");
  //     return res.json({ message: "Saved Succesfully" });
  //   })
  //   .catch((err) => {
  //     log.info(err);
  //     return res.json({ error: err });
  //   });
};

module.exports = {
  uploadDocumentation,
};
