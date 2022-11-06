import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../App.css";
const DocumentForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editor, setEditor] = useState(null);
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
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
          left: "20%",
          top: "10%",
          fontSize: 20,
        }}
      >
        <form>
          <p></p>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={{
              border: "none",
              fontSize: "30px",
              width: "98%",
            }}
            placeholder="Blog Title.."
          ></input>
          <p></p>
          {editor === null || editor == undefined ? <>Oopss..Loading</> : <></>}
          <div className="editorBody" style={{ maxwidth: "80%" }}>
            <CKEditor
              editor={ClassicEditor}
              data={body}
              onReady={(editor) => {
                console.log("Editor is ready to us!", editor);
                console.log(editor._context);
                window.editor = editor;
                setEditor(editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();

                setBody(data);
              }}
            />
          </div>
          <br></br>
          <button
            type="submit"
            onClick={submitDocumentation}
            style={{
              position: "absolute",
              left: "100%",
              top: "3%",
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
          >
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default DocumentForm;
