import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
              left: "30%",
              fontSize: 17,
            }}
          >
            <p></p>
            Title : {doc._source.title}
            <p></p>
            Author : {doc._source.author}
            <p></p>
            Date : {new Date(doc._source.date).toString()}
            <p></p>
            Body : {doc._source.body}
          </div>
        </div>
      )}
    </>
  );
};

export default Document;
