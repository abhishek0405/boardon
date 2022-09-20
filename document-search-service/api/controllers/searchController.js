const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const axios = require("axios").default;
const Document = require("../models/document");
const esUrl = process.env.ELASTIC_SEARCH_URL;
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: esUrl,
});
const searchDocumentation = async (req, res) => {
  const searchQuery = req.query.searchQuery;
  log.info("Search query is ", searchQuery);
  const result = await client.search({
    index: "documents",
    query: {
      match: {
        body: searchQuery,
      },
    },
  });

  return res.json(result.hits.hits);
};

module.exports = {
  searchDocumentation,
};
