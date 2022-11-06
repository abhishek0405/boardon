import { useEffect, useState, React, useRef, useReducer } from "react";
import axios from "axios";
import working_woman from "./working_woman.png";
import doggie from "./doggie.png";
import FileUploader from "./FileUploader";
import { useNavigate } from "react-router-dom";

function EmpViewDocs() {
  const [backendData, setBackendData] = useState([{}]);
  const [selectedFileAadhaar, setSelectedFileAadhaar] = useState(null);
  const [selectedFilePanCard, setSelectedFilePanCard] = useState(null);
  const [selectedFilePassport, setSelectedFilePassport] = useState(null);
  const [selectedFileBirthCertificate, setSelectedFileBirthCertificate] =
    useState(null);
  const [selectedFileResume, setSelectedFileResume] = useState(null);
  const [selectedFileElectricityBill, setSelectedFileElectricityBill] =
    useState(null);
  const [selectedFileVoterId, setSelectedFileVoterId] = useState(null);
  const [selectedFileMarksheet, setSelectedFileMarksheet] = useState(null);
  const [username, setUsername] = useState("");
  const [file, setSelectedFile] = useState(null);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const history = useNavigate();
  const [loading, setLoading] = useState("");

  //searchParams.get("username")

  useEffect(() => {
    // console.log(localStorage.getItem("authToken"));
    fetch("http://localhost:5000/emp/empDashboard", {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commToAdd = new FormData();

    if (selectedFileAadhaar !== null) {
      commToAdd.append("file", selectedFileAadhaar);
      commToAdd.append("doc", "Aadhaar");
    } else if (selectedFileBirthCertificate !== null) {
      commToAdd.append("file", selectedFileBirthCertificate);
      commToAdd.append("doc", "BirthCertificate");
    } else if (selectedFilePanCard !== null) {
      commToAdd.append("file", selectedFilePanCard);
      commToAdd.append("doc", "PanCard");
    } else if (selectedFilePassport !== null) {
      commToAdd.append("file", selectedFilePassport);
      commToAdd.append("doc", "Passport");
    } else if (selectedFileMarksheet !== null) {
      commToAdd.append("file", selectedFileMarksheet);
      commToAdd.append("doc", "Marksheet");
    } else if (selectedFileResume !== null) {
      commToAdd.append("file", selectedFileResume);
      commToAdd.append("doc", "Resume");
    } else if (selectedFileElectricityBill !== null) {
      commToAdd.append("file", selectedFileElectricityBill);
      commToAdd.append("doc", "ElectricityBill");
    } else if (selectedFileVoterId !== null) {
      commToAdd.append("file", selectedFileVoterId);
      commToAdd.append("doc", "VoterId");
    }

    setLoading("loading");
    axios
      .post("http://localhost:5000/emp/uploadDocs", commToAdd, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBackendData(res.data);
        setLoading("");
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div
      className="IndividualDocs"
      style={{ position: "absolute", top: "12%", left: "20%" }}
    >
      {loading === "loading" ? <p>Uploading...</p> : <p></p>}

      {typeof backendData.arr === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 style={{ color: "#4C00FF", fontSize: 30 }}>{backendData.name}</h1>

          <br />
          <br />
          <table style={{ width: "150%", textAlign: "center" }}>
            <tr>
              <th>Document</th>
              <th>Current upload</th>
              <th>Comment</th>
              <th>Add upload</th>
            </tr>
            {backendData.arr.map((d) => {
              return (
                <tr key={d}>
                  <td>{d}</td>
                  <td>
                    {d in backendData.docsCurr ? (
                      <a
                        href={backendData.docsCurr[d]}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      <></>
                    )}
                  </td>

                  {d in backendData.commCurr ? (
                    <td>{backendData.commCurr[d]}</td>
                  ) : (
                    <td></td>
                  )}

                  <td>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="file"
                        id={"selectedFile" + d}
                        name={"selectedFile" + d}
                        onChange={(e) =>
                          eval("setSelectedFile" + d + "(e.target.files[0])")
                        }
                      />
                      {/* <input type="file"  name={file}  onChange={(e) => setSelectedFile(e.target.files[0]) }/> */}
                      <input
                        type="text"
                        name={d}
                        id={d}
                        onChange={(e) => setUsername(e.target.value)}
                        hidden
                      />
                      <button
                        style={{
                          backgroundColor: "#4C00FF",
                          color: "white",
                          borderRadius: "8px",
                          marginLeft: "5px",
                        }}
                      >
                        Post
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </table>

          <br />
          <br />
        </>
      )}
    </div>
  );
}

export default EmpViewDocs;
