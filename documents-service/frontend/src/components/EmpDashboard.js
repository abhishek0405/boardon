import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";

import { useState } from "react";
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

const handleGoSubmit = async () => {
  // setSearchQuery();
};

Modal.setAppElement("#root");

function EmpDashboard() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function openModal() {
    setIsOpen(true);
  }

  const handleGoSubmit = async () => {
    if (searchQuery !== "") {
      navigate(`/emp/resources/search/${searchQuery}`);
    }
  };
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleClick = async (e) => {
    console.log("hellp");
    axios
      .delete("http://localhost:3002/auth/logout", {
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
    <>
    <div className="EmpDashboard">
      <div className="navbar-bg">
        <div
          className="blue-btn"
          style={{
            backgroundColor: "#B3FF00",
            top: 25,
            fontSize: 24,
            fontFamily: "Arial",
            color: "black",
          }}
        >
          BoardOn
        </div>

            <div className="search" style={{ left: "15%", top: "4%" }}>
          <input
            type="text"
            className="searchTerm"
            placeholder="Search Documentation "
            onChange={(event) => {
              setSearchQuery(event.target.value);
            }}
            value={searchQuery}
          />
          <button
            type="submit"
            onClick={handleGoSubmit}
            style={{
              fontSize: 15,
              width: "auto",
              borderRadius: "10px",
              background: "#4C00FF",
              color: "white",
              cursor: "pointer",
              border: "none",
              textAlign: "center",
            }}
          >
            Search
          </button>
        </div>

            <img src={user_icon} alt="bell" style={{position : 'absolute', top : '35%',left : '95%', width : '30px', height : '30px'}} onClick={handleClick} /> 
            
            
            
            <img src={bell_icon} alt="bell" style={{position : 'absolute', top : '35%',left : '91%', width : '30px', height : '30px'}} />
           
            <img src={message_icon} alt="bell" style={{position : 'absolute', top : '34.5%',left : '87%', width : '40px', height : '40px'}}  />
            
            </div>
            <div class="container" id="navbar" style={{top : '10%'}}>
                <nav class="nav">
                
                <ul>
                    <li>
                    <a href={"/emp/empDashboard"} className="nav_link">
                    <ion-icon name="chatbubbles-outline" class="nav_icon"></ion-icon>
                        <span className="nav_name" style={{fontSize : 16}}>Profile</span>
                    </a>
                    </li>
                    <li>
                    {(window.location.href.split('?')[0] === 'http://localhost:3000/emp/empDashboard') ? (<a href={"/emp/empDashboard"} className="nav_link active">
                        <ion-icon name="chatbubbles-outline" class="nav_icon"></ion-icon>
                        <span class="nav_name" style={{fontSize : 16}}>Docs Upload</span>
                    </a>) : (<a href={"/emp/empDashboard"} className="nav_link">
                        <ion-icon name="chatbubbles-outline" class="nav_icon"></ion-icon>
                        <span class="nav_name" style={{fontSize : 16}}>Docs upload</span>
                    </a>)}
                    
                    </li>


                    <li>
                    {(window.location.href.split('?')[0] === 'http://localhost:3000/emp/viewPolls') ? (<a href={"/emp/viewPolls"} className="nav_link active">
                        <ion-icon name="chatbubbles-outline" class="nav_icon"></ion-icon>
                        <span class="nav_name" style={{fontSize : 16}}>Polls</span>
                    </a>) : (<a href={"/emp/viewPolls"} className="nav_link">
                        <ion-icon name="chatbubbles-outline" class="nav_icon"></ion-icon>
                        <span class="nav_name" style={{fontSize : 16}}>Polls</span>
                    </a>)}
                    
                    </li>

                    <li>
                    {(window.location.href.split('?')[0] === 'http://localhost:3000/emp/resources') ? (<a href={"/emp/resources"} className="nav_link active">
                        <ion-icon name="chatbubbles-outline" class="nav_icon"></ion-icon>
                        <span class="nav_name" style={{fontSize : 16}}>Resources</span>
                    </a>) : (<a href={"/emp/resources"} className="nav_link">
                        <ion-icon name="chatbubbles-outline" class="nav_icon"></ion-icon>
                        <span class="nav_name" style={{fontSize : 16}}>Resources</span>
                    </a>)}
                    
                    </li>
                    
                    
                    
                    <li>
                    <a href={"/emp/resources"} class="nav_link">
                        <ion-icon name="settings-outline" class="nav_icon"></ion-icon>
                        <span class="nav_name" style={{ fontSize: 16 }}>
                        Resources
                        </span>
                    </a>
                    </li>
                </ul>
                
                </nav>
            </div>
            
            

        
      </div>


    </>
  );
}

export default EmpDashboard;
