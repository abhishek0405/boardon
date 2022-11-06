import React from "react";
import { useState, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import "../App.css";
import parse from "html-react-parser";
const Doc = (docObj) => {
  //   const title = "e";
  const title = docObj.docObj._source.title;
  const author = docObj.docObj._source.author;
  const body = docObj.docObj._source.body;
  const id = docObj.docObj._id;

  //   const title = "a";
  //   console.log(id);
  return (
    <li>
      <div class="searchItem">
        <a href={`/emp/resources/${id}`}>{title}</a>
      </div>
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
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
      <div class="wrapper">
        <ul>
          <h1> {<p>Search results for {searchQuery}</p>}</h1>
          <br></br>
          <div class="mat_list_title"></div>
          {docs.length === 0 ? (
            <div style={{ font: "30px" }}>
              <p>
                Your search <b>{searchQuery}</b> did not match any documents.
                <p>
                  {" "}
                  Suggestions:
                  <p></p>
                  <ol>
                    <li> Make sure that all words are spelled correctly.</li>
                    <li> Try different keywords.</li>
                    <li> Try generic keywords</li>
                  </ol>
                </p>
              </p>
              <img
                style={{
                  position: "absolute",
                  left: "120%",
                  top: "2%",
                  width: "400px",
                }}
                src="https://cdn-icons-png.flaticon.com/512/6357/6357033.png"
              ></img>
            </div>
          ) : (
            <div>
              <ul>
                {docs.map((doc) => {
                  // console.log(doc);
                  return <Doc docObj={doc} />;
                })}
              </ul>
              <div
                style={{
                  position: "absolute",
                  left: "120%",
                  top: "2%",
                  width: "400px",
                }}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/470/470525.png"></img>
              </div>
            </div>
          )}
        </ul>
      </div>

      {/* <div style={{ position: "absolute", left: "20%", fontSize: 17 }}>
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
      </div> */}
    </>
  );
};

export default Result;
