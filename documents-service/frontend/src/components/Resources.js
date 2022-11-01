import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Doc = (docObj) => {
  //   const title = "e";
  const title = docObj.docObj._source.title;

  const id = docObj.docObj._id;
  //   const title = "a";
  //   console.log(id);
  return (
    <>
      <p></p>
      <a href={`/emp/resources/${id}`}>{title}</a>
    </>
  );
};
const Resources = () => {
  const [docs, setDocs] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await fetch(
        "http://localhost:3001/documentation/search/all",
        {
          credentials: "include",
        }
      );
      const jsonData = await responseData.json();
      console.log(jsonData);
      if (jsonData.message === "Unauthorized Access") {
        return;
      }
      setDocs(jsonData);
    };
    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      {docs === null ? (
        <div
          style={{
            position: "absolute",
            left: "15%",
            top: "10%",
            fontSize: 20,
          }}
        >
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              left: "20%",
              top: "10%",
              fontSize: 20,
            }}
          >
            <div>
              <h3>All documentation</h3>
              <ul>
                {docs.map((doc) => {
                  // console.log(doc);
                  return <Doc docObj={doc} />;
                })}
              </ul>
              <div
                style={{
                  position: "absolute",
                  left: "140%",
                  top: "15%",
                  width: "400px",
                }}
              >
                <img src="https://cdn1.iconfinder.com/data/icons/luchesa-2/128/Search_document-512.png"></img>
              </div>
            </div>
            {/* <table style={{ width: "110%", textAlign: "center" }}>
              <tr>
                <th>Documents</th>
              </tr>
              {docs.map((doc) => {
                // console.log(doc);
                return (
                  <tr>
                    <td>
                      <Doc docObj={doc} />
                    </td>
                  </tr>
                );
              })}
            </table> */}
            <br></br>
          </div>
          <button
            style={{
              position: "absolute",
              left: "45%",
              top: "12%",
              fontSize: 15,
              width: "auto",
              borderRadius: "10px",
              background: "#4C00FF",
              color: "white",
              cursor: "pointer",
              border: "none",
              paddingBottom: "5px",
              textAlign: "center",
              padding: "10px 20px",
            }}
            onClick={() => {
              navigate(`/emp/resources/insert/`);
            }}
          >
            Add New!
          </button>
        </>
      )}
    </>
  );
};

export default Resources;
