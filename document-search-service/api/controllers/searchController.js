const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();
const axios = require("axios").default;
const Document = require("../models/document");
const esUrl = process.env.ELASTIC_SEARCH_URL;
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: esUrl,
});
const searchDocumentationController = async (req, res) => {
  const searchQuery = req.query.searchQuery;
  log.info("Search query is ", searchQuery);
  const result = await client.search({
    index: "documents",
    query: {
      bool: {
        must: [
          {
            multi_match: {
              query: searchQuery,
              fields: ["body", "title"],
              fuzziness: "AUTO",
            },
          },
        ],
        filter: {
          term: {
            companyID: "1",
          },
        },
      },
    },
  });

  return res.json(result.hits.hits);
};

const suggestionController = async (req, res) => {
  const searchQuery = req.query.searchQuery;
  const response = await client.search({
    index: "documents",
    body: {
      suggest: {
        text: searchQuery,
        suggestionBody: {
          term: {
            field: "body",
            //suggest_mode: "always",
          },
        },
        suggestionTitle: {
          term: {
            field: "title",
            //suggest_mode: "always",
          },
        },
      },
    },
  });

  const suggestionResponseArray = [];

  const suggestionBody = response.suggest.suggestionBody;
  const suggestionTitle = response.suggest.suggestionTitle;

  const bodySuggestions = suggestionBody.map((obj) =>
    obj.options.map((obj1) => obj1.text)
  );
  const titleSuggestions = suggestionTitle.map((obj) =>
    obj.options.map((obj1) => obj1.text)
  );

  bodySuggestions.map((suggestionArr) =>
    suggestionArr.map((word) => {
      //log.info(word);
      suggestionResponseArray.push(word);
    })
  );
  titleSuggestions.map((suggestionArr) =>
    suggestionArr.map((word) => {
      //log.info(word);
      suggestionResponseArray.push(word);
    })
  );
  let suggestionResponse = new Set(suggestionResponseArray);

  return res.json(Array.from(suggestionResponse));
};

module.exports = {
  searchDocumentationController,
  suggestionController,
};