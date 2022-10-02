import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DocumentForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const submitDocumentation = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(body);
    if (title === "" || body === "") {
      alert("Fill the title and body");
      return;
    }
    const data = {
      title: title,
      body: body,
    };

    const response = await fetch("http://localhost:3001/documentation/upload", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonRes = await response.json();

    console.log(jsonRes);

    setBody("");
    setTitle("");
    alert("Inserted Succesfully");
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "45%",
          top: "10%",
          fontSize: 20,
        }}
      >
        <form>
          Title{" "}
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
          <p></p>
          Content :<p></p>
          <textarea
            rows="40"
            cols="40"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          ></textarea>
          <br></br>
          <button type="submit" onClick={submitDocumentation}>
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default DocumentForm;
