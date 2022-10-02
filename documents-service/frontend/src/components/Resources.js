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
              left: "35%",
              top: "10%",
              fontSize: 20,
            }}
          >
            <table style={{ width: "110%", textAlign: "center" }}>
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
            </table>
            <br></br>
          </div>
          <button
            style={{
              position: "absolute",
              left: "75%",
              top: "10%",
              fontSize: 15,
            }}
            onClick={() => {
              navigate(`/emp/resources/insert/`);
            }}
          >
            Add New
          </button>
        </>
      )}
    </>
  );
};

export default Resources;
