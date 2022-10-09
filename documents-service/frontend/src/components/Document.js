import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
const Document = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await fetch(
        `http://localhost:3001/documentation/search/${id}`,
        {
          credentials: "include",
        }
      );
      const jsonData = await responseData.json();
      setDoc(jsonData[0]);
      console.log(jsonData[0]);
    };
    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <>
      {doc === null ? (
        <p>Loading..</p>
      ) : (
        <div>
          <div
            style={{
              maxWidth: "50%",
              position: "absolute",
              left: "25%",
              fontSize: 17,
            }}
          >
            <p style={{ fontSize: "30px" }}>
              <b> {doc._source.title}</b>
            </p>
            <p></p>
            <b>Author: </b> {doc._source.author}
            <p></p>
            <b>Date :</b> {new Date(doc._source.date).toString()}
            <p></p>
            {parse(doc._source.body)}
          </div>
        </div>
      )}
    </>
  );
};

export default Document;
