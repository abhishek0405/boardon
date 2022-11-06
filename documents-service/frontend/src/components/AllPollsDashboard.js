import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";

import { useState, useEffect } from "react";
import axios from "axios";
import bell_icon from "./bell_icon.png";
import user_icon from "./user_icon.png";
import message_icon from "./message_icon.png";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "55%",

    position: "absolute",
    overflowX: "hidden",
    overflowY: "hidden",
  },
};

Modal.setAppElement("#root");

function AllPollsDashboard() {
  let subtitle;
  const [modalOneIsOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const [backendData, setBackendData] = useState([{}]);
  const [msg, setMsg] = useState("");
  const [pollName, setPollName] = useState("");

  function openModalOne() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModalOne() {
    setIsOpen(false);
  }

  useEffect(() => {
    //console.log(window.location.pathname)
    fetch("http://localhost:3005/hr/allPolls", {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
      credentials: "include",
    })
      .then(
        (response) => {
          return response.json();
        }
        //console.log(response)}
      )
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  //functions to handle submit
  const [docs, setDocs] = useState("");

  const handleClick = async (e) => {
    console.log("hellp");
    axios
      .delete("http://localhost:3002/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div
      className="AllPollsDashboard"
      style={{ position: "absolute", top: "12%", left: "20%" }}
    >
      {typeof backendData.arr === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 style={{ color: "#4C00FF", fontSize: 30 }}>All polls</h1>

          <br />
          <br />

          <table
            style={{ maxWidth: "150%", textAlign: "center", marginTop: "20%" }}
          >
            <tr>
              <th>Poll name</th>
              <th>Posted status</th>
              <th>View</th>
            </tr>
            {backendData.arr.map((d) => {
              return (
                <tr key={d}>
                  <td>{d.pollName}</td>
                  <td>{d.posted}</td>
                  <td>
                    <a
                      href={"/hr/viewAllresults"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </td>
                </tr>
              );
            })}
          </table>
        </>
      )}
    </div>
  );
}

export default AllPollsDashboard;
