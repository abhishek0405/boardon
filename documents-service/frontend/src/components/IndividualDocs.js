import {useEffect, useState, React, useRef} from 'react'
import axios from 'axios'
import working_woman from './working_woman.png'
import doggie from './doggie.png'


function IndividualDocs(){

    const [backendData, setBackendData] = useState([{}])
    const [commentAadhaar, setCommentAadhaar] = useState('')
    const [commentPanCard, setCommentPanCard] = useState('')
    const [commentPassport, setCommentPassport] = useState('')
    const [commentBirthCertificate, setCommentBirthCertificate] = useState('')
    const [commentResume, setCommentResume] = useState('')
    const [commentElectricityBill, setElectricityBill] = useState('')
    const [commentVoterId, setVoterId] = useState('')
    const [commentMarksheet, setCommentMarksheet] = useState('')
    
    //searchParams.get("username")  
    
    
    
    

    useEffect(() => {
        fetch(window.location.href).then(
        response => {return response.json()}
        //console.log(response)}
        ).then(
        data => {
            setBackendData(data)
            
                
        }
        )
    }, []);



    const handleSubmit = async (e) => {
        
        var commToAdd
        if(commentAadhaar !== ''){
            commToAdd = {commentAadhaar : commentAadhaar}
        }
        else if(commentBirthCertificate !== ''){
            commToAdd = {commentBirthCertificate : commentBirthCertificate}
        }
        else if(commentPanCard !== ''){
            commToAdd = {commentPanCard : commentPanCard}
        }
        else if(commentPassport !== ''){
            commToAdd = {commentPassport : commentPassport}
        }

        else if(commentMarksheet !== ''){
            commToAdd = {commentMarksheet : commentMarksheet}
        }
        else if(commentResume !== ''){
            commToAdd = {commentResume : commentResume}
        }
        else if(commentElectricityBill !== ''){
            commToAdd = {commentElectricityBill : commentElectricityBill}
        }
        else if(commentVoterId !== ''){
            commToAdd = {commentVoterId : commentVoterId}
        }
        
        
        axios.post('http://localhost:5000/hr/postComment',commToAdd)
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
                        <th>View link</th>
                        <th>Comment</th>
                        <th>Add comment</th>
                        

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
                                        <input style={{borderRadius : '10px'}} type="text" id={"comment"+d} name={"comment"+d}  onChange={(e) => eval("setComment"+d+"(e.target.value)") } />
                                        
                                        <button style={{backgroundColor: '#4C00FF', color : 'white', borderRadius : '8px', marginLeft : '5px'}}>Post</button>
                                        </form>
                                    </td>
                                </tr>

                            )
                        })}
                         

                    </table>

                    <br /><br />
                    <div class="card" >
            <div class="card__side card__side--front-1">
              

              <div class="card__details">
                <ul>
                <li>{backendData.name}</li>
                 <li>{backendData.username}</li>
                 <li>{"02/11/01"}</li>
                 <li>{"Kolkata"}</li>
                </ul>
              </div>
            </div>
            <div class="card__side card__side--back card__side--back-1">
              <div class="card__cta">
                <div class="card__price-box">
                 <img src={doggie} alt="doggie" style={{width: '200px', height : '200px', borderRadius : '50%'}} />
                </div>
                
              </div>
            </div>
          </div>

      
                                
                             
                            
                  </>
                        
              )}
        

        












        
        
    </div>
    );




    
}


export default IndividualDocs;