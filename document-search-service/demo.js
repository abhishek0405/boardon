//DEMO FILE TO CHECK ELASTIC SEARCH
const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "http://localhost:9200",
});

async function run() {
  await client.indices.create(
    {
      index: "documents",
      operations: {
        mappings: {
          properties: {
            title: {
              type: "text",
            },
            author: {
              type: "text",
            },
            body: {
              type: "text",
            },
            date: {
              type: "date",
            },
          },
        },
      },
    },
    { ignore: [400] }
  ),
    console.log("index created");
}

// async function run() {
//   const bulkResponse = await client.bulk({
//     refresh: true,
//     operations: [
//       { index: { _index: "game-of-thrones" } },
//       {
//         character: "Ned Stark",
//         quote: "Winter is coming.",
//       },

//       { index: { _index: "game-of-thrones" } },
//       {
//         character: "Daenerys Targaryen",
//         quote: "I am the blood of the dragon.",
//       },

//       { index: { _index: "game-of-thrones" } },
//       {
//         character: "Tyrion Lannister",
//         quote: "A mind needs books like a sword needs a whetstone.",
//       },
//     ],
//   });

//   if (bulkResponse.errors) {
//     console.log(bulkResponse);
//     process.exit(1);
//   }

//   const result = await client.arch({
//     index: "game-of-thrones",
//     query: {
//       match: { quote: "winter" },
//     },
//     // suggest: {
//     //   gotsuggest: {
//     //     text: "winte",
//     //     term: { field: "quote" },
//     //   },
//     // },
//   });

//   console.log(result.hits.hits);
//   //   console.log("Suggestion");
//   //   for (suggestion of result.suggest.gotsuggest) {
//   //     console.log(suggestion.options);
//   //   }
// }

let set = new Set(["a", "abhi", "dd"]);
console.log(set);
run().catch(console.log);
