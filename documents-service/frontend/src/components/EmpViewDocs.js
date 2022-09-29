import {useEffect, useState, React, useRef} from 'react'
import axios from 'axios'
import working_woman from './working_woman.png'
import doggie from './doggie.png'
import FileUploader from './FileUploader'


function EmpViewDocs(){

    const [backendData, setBackendData] = useState([{}])
    const [selectedFileAadhaar, setSelectedFileAadhaar] = useState(null)
    const [selectedFilePanCard, setSelectedFilePanCard] = useState(null)
    const [selectedFilePassport, setSelectedFilePassport] = useState(null)
    const [selectedFileBirthCertificate, setSelectedFileBirthCertificate] = useState(null)
    const [selectedFileResume, setSelectedFileResume] = useState(null)
    const [selectedFileElectricityBill, setSelectedFileElectricityBill] = useState(null)
    const [selectedFileVoterId, setSelectedFileVoterId] = useState(null)
    const [selectedFileMarksheet, setSelectedFileMarksheet] = useState(null)
    const [username, setUsername] = useState('')
    const [file, setSelectedFile] = useState(null);
    
    //searchParams.get("username")  
    
    
    
    

    useEffect(() => {
        fetch('http://localhost:5000/emp/empDashboard', {
            credentials : 'include'
        }).then(
        response => {return response.json()}
        //console.log(response)}
        ).then(
        data => {
            setBackendData(data)
            
            
                
        }
        )
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault()
        
         //const commToAdd = new FormData();
         const formData = new FormData()
        // formData.append("username", username);
        formData.append(
            "file",
            file  
          );
          formData.append("doc", username)
        

        
        // if(selectedFileAadhaar !== null){
        //     commToAdd.append("Aadhaar" , selectedFileAadhaar)
        // }
        // else if(selectedFileBirthCertificate !== null){
        //     commToAdd.append("BirthCertificate" , selectedFileBirthCertificate)
        // }
        // else if(selectedFilePanCard !== null){
        //     commToAdd.append("PanCard" , selectedFilePanCard)
        // }
        // else if(selectedFilePassport !== null){
        //     commToAdd.append("Passport" , selectedFilePassport)
        // }

        // else if(selectedFileMarksheet !== null){
        //     commToAdd.append("Marksheet" , selectedFileMarksheet)
        // }
        // else if(selectedFileResume !== null){
        //     commToAdd.append("Resume" , selectedFileResume)
        // }
        // else if(selectedFileElectricityBill !== null){
        //     commToAdd.append("ElectricityBill" , selectedFileElectricityBill)
        // }
        // else if(selectedFileVoterId !== null){
        //     commToAdd.append("VoterId" , selectedFileVoterId)
        // }
        
        
        axios.post('http://localhost:5000/emp/uploadDocs',formData, {
            withCredentials: true
        })
        .then(res=> {console.log(res.data)})
        .catch(err=>console.log(err.response.data));
  
    
    }
   

    
    
    

    return (
        <div className="IndividualDocs" style={{position : 'absolute', top : '12%',left : '20%' }}>
        

        
            {(typeof backendData.arr === 'undefined') ? (
                <p>Loading...</p>
            ) : ( 

                
                
                <>
                <h1 style={{color : '#4C00FF', fontSize : 30}}>{backendData.name}</h1>
                
                
                <br /><br />
                 <table style={{width : '150%', textAlign : 'center'}}>
                    <tr>
                        <th>Document</th>
                        <th>Current upload</th>
                        <th>Comment</th>
                        <th>Add upload</th>
                        

                    </tr>
                        {backendData.arr.map(d => {
                            return (
                                <tr key={d}>

                                    <td >
                                        {d}
                                    </td>
                                    <td >
                                        {(d in backendData.docsCurr) ? (<a href={backendData.docsCurr[d]} target="_blank" rel="noreferrer">View</a>) : (<></>)}
                                        
                                        
                                    </td>
                                    
                                    {(d in backendData.commCurr) ? (<td >{backendData.commCurr[d]}</td>) : (<td></td>)}
                                        
                                     
                                    <td >
                                        <form onSubmit={handleSubmit}>
                                        {/* <input type="file" id={"selectedFile" + d} name={"selectedFile" + d} onChange={(e) => eval("setSelectedFile"+d+"(e.target.files[0])") }/> */}
                                        <input type="file"  name={"file"}  onChange={(e) => setSelectedFile(e.target.files[0]) }/>
                                        <input type="text" name={d} id={d}  onChange={(e) => setUsername(e.target.value) } hidden/>
                                        <button style={{backgroundColor: '#4C00FF', color : 'white', borderRadius : '8px', marginLeft : '5px'}}>Post</button>
                                        </form>
                                    </td>
                                </tr>

                            )
                        })}
                         

                    </table>

                    <br /><br />
                    

      
                                
                             
                            
                  </>
                        
              )}
        
        
    </div>
    );

  
}


export default EmpViewDocs;