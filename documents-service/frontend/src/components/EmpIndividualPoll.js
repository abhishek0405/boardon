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
    minHeight: "55%",

    position: "absolute",
    overflowX: "hidden",
    overflowY: "hidden",
  },
};

Modal.setAppElement("#root");

function EmpIndividualPoll() {
  let subtitle;
  const [modalOneIsOpen, setOneIsOpen] = React.useState(false);

  const navigate = useNavigate();
  const [backendData, setBackendData] = useState([{}]);
  const [question, setQuestion] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [opt4, setOpt4] = useState("");
  const [msg, setMsg] = useState("");
  const [postmsg, setPostMsg] = useState("");
  const [answers, setAnswers] = useState({});
  var pollId = window.location.pathname.split("/").pop();

  function openModalOne() {
    setOneIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModalOne() {
    setOneIsOpen(false);
    setMsg("");
    setQuestion("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
    setOpt4("");
  }

  const handleSubmit = async (e) => {
    //e.preventDefault();
    var ans = answers;
    ans.pollId = pollId;
    axios
      .post("http://localhost:3005/emp/submitPoll", ans, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        //setBackendData(res.data)
        navigate("/emp/viewPolls");
        //closeModalOne()
      })
      .catch((err) => console.log(err.response.data));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    var p = { pollId: pollId };
    axios
      .post("http://localhost:3005/hr/postPoll", p, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        //setBackendData(res.data)
        setPostMsg("Poll posted succesfully");
        //closeModalOne()
      });
  };

  useEffect(() => {
    console.log(window.location.pathname);
    var url = "http://localhost:3005" + window.location.pathname.toString();
    fetch(url, {
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
        console.log(data);
        var newAns = {};
        for (var i = 0; i < data.currPoll.questions.length; i++) {
          //console.log(i)
          newAns[data.currPoll.questions[i].qs] =
            data.currPoll.questions[i].opt[0];
        }
        console.log(newAns);

        setBackendData(data);
        setAnswers(newAns);
        console.log(answers);
      });
  }, []);

  //functions to handle submit
  const [docs, setDocs] = useState("");

  const handleClick = async (e) => {
    console.log("hellp");
    axios
      .delete("http://localhost:3002/auth/logout", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          navigate("/");
        }
      })
      .catch((err) => console.log(err.response.data));
  };

  const handleRadioButton = (qs, o) => {
    var newAns = answers;
    newAns[qs] = o;
    console.log("change");

    setAnswers(newAns);
    console.log(answers);
  };

  return (
    <div
      className="EmpIndividualPoll"
      style={{ position: "absolute", top: "15%", left: "20%" }}
    >
      {typeof backendData.currPoll === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <>
          {console.log(answers)}
          <h3>{backendData.currPoll.pollName}</h3>
          <form onSubmit={handleSubmit}>
            {backendData.currPoll.questions.map((d) => {
              return (
                <>
                  <div></div>
                  <strong>{d.qs}</strong>
                  <br />

                  {d.opt.map((o) => {
                    return (
                      <>
                        <input
                          type="radio"
                          id={o}
                          name={d.qs}
                          value={o}
                          defaultChecked={answers[d.qs] === o}
                          onChange={() => {
                            handleRadioButton(d.qs, o);
                          }}
                        />
                        <label>{o}</label>
                        <br></br>
                      </>
                    );
                  })}
                  <br />
                </>
              );
            })}
            <button className="blue-btn">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default EmpIndividualPoll;
