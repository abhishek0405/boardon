const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "http://localhost:9200/",
});

const dataset = require("./dataset.json");
const blogData = dataset["results"];

for (blog of blogData) {
  const title = blog["title"];
  const body = blog["body"];
  const author = "Abhishek Anantharam";
  const date = new Date();

  const obj = {
    title: title,
    body: body,
    author: author,
    date: date,
    companyID: "63309252dd346e5fe673feca",
  };
  client.index({
    index: "documents",
    document: obj,
  });
  console.log("inserted");
}
