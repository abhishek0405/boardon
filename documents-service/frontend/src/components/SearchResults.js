import React from "react";
import { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";

const Doc = (docObj) => {
  //   const title = "e";
  const title = docObj.docObj._source.title;

  const id = docObj.docObj._id;
  //   const title = "a";
  //   console.log(id);
  return (
    <li>
      <a href={`/emp/resources/${id}`}>{title}</a>
    </li>
  );
};
const Result = () => {
  const { searchQuery } = useParams();
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await fetch(
        `http://localhost:3001/documentation/search?searchQuery=${searchQuery}`,
        {
          credentials: "include",
        }
      );
      const jsonData = await responseData.json();
      console.log(searchQuery);
      console.log(jsonData);
      setDocs(jsonData);
    };
    fetchData().catch((err) => {
      console.log(err);
    });
  }, [searchQuery]);
  return (
    <>
      <div style={{ position: "absolute", left: "20%", fontSize: 17 }}>
        <br></br>
        Search results for {searchQuery}
        {console.log(docs)}
        {docs.length === 0 ? (
          <p>Oops, no matches found</p>
        ) : (
          <ul>
            <br></br>
            {docs.map((doc) => {
              // console.log(doc);
              return <Doc docObj={doc} />;
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Result;
