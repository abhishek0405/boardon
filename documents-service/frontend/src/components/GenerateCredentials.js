import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";
import "../Credentials.css";
import SuccessGif from "./Success_GIF.gif";
const customStyles = {
  content: {
    top: "50%",
    left: "55%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
    minHeight: "55%",

    position: "absolute",
    overflowX: "hidden",
    overflowY: "hidden",
  },
};
const GenerateCredentials = () => {
  let subtitle;
  const [file, setFile] = useState(null);
  const [warningMsg, setWarningMsg] = useState(null);
  const [modalOneIsOpen, setOneIsOpen] = React.useState(false);

  function openModalOne() {
    setOneIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModalOne() {
    setFile(null);
    setOneIsOpen(false);
  }

  async function handleChange(event) {
    console.log(warningMsg);
    setWarningMsg(null);
    setFile(event.target.files[0]);
    console.log(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file === null) {
      setWarningMsg("Please select a file first");
      return;
    }
    console.log(file.type);
    const url = "http://localhost:3003/cred/generateFromSheet";
    const formData = new FormData();
    formData.append("hireSheet", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const response = await fetch(url, {
      method: "post",
      body: formData,
      credentials: "include",
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    });

    openModalOne();
  }
  return (
    <>
      <div style={{ position: "absolute", left: "20%" }}>
        <form onSubmit={handleSubmit} className="form-container">
          <div class="upload-files-container">
            <div class="drag-file-area">
              {file === null ? (
                <div>
                  <span class="material-icons-outlined upload-icon">
                    {" "}
                    Sheet Upload{" "}
                  </span>

                  <h3 class="dynamic-message"> Upload the Excel file here </h3>
                  <label class="label">
                    {" "}
                    <span class="browse-files">
                      {" "}
                      <input
                        type="file"
                        class="default-file-input"
                        onChange={handleChange}
                      />{" "}
                      <span class="browse-files-text">Browse file</span>{" "}
                      <span>from device</span>{" "}
                    </span>{" "}
                  </label>
                </div>
              ) : (
                <>
                  <span style={{ color: "green" }}>
                    File Dropped Succesfully
                  </span>
                  <h1>{file.name}</h1>
                  <button
                    className="delete-button"
                    onClick={() => {
                      setFile(null);
                    }}
                  >
                    Remove File
                  </button>
                </>
              )}
            </div>
            {warningMsg !== null ? (
              <>
                <span class="cannot-upload-message">
                  <span class="material-icons-outlined">Error:</span>{" "}
                  {warningMsg}
                  <span class="material-icons-outlined cancel-alert-button">
                    <button
                      className="remove-button"
                      onClick={() => {
                        setWarningMsg(null);
                      }}
                    >
                      Remove
                    </button>
                  </span>{" "}
                </span>
              </>
            ) : (
              <></>
            )}
            <div class="file-block">
              <div class="file-info">
                {" "}
                <span class="material-icons-outlined file-icon">
                  description
                </span>{" "}
                <span class="file-name"> </span> |{" "}
                <span class="file-size"> </span>{" "}
              </div>
              <span class="material-icons remove-file-icon">delete</span>
              <div class="progress-bar"> </div>
            </div>
            <button type="submit" class="upload-button">
              {" "}
              Upload{" "}
            </button>
          </div>
          {/* <h1>React File Upload</h1>
          <input type="file" onChange={handleChange} />
          <button type="submit">Upload</button> */}
        </form>
      </div>
      <Modal
        isOpen={modalOneIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModalOne}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <span
            style={{
              position: "absolute",
              left: "33%",
              top: "5%",
              color: "green",
            }}
          >
            {" "}
            Upload Succesful !
          </span>
          <img
            style={{
              position: "absolute",
              left: "32%",
              top: "20%",
              border: "none",
            }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu3UnZc8QTuuCHpYua5c2a-S0JO-ckLfNcw6MZRqSW7LECpji_qL7M1_oRq7o6ujUrK7s&usqp=CAU"
            width="200px"
          ></img>
          <span
            style={{
              position: "absolute",
              left: "22%",
              top: "85%",
              color: "green",
            }}
          >
            {" "}
            Emails will be rolled out shortly!
          </span>
        </div>
      </Modal>
    </>
  );
};

export default GenerateCredentials;
