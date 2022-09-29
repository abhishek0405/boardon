import {useEffect, useState, React, useRef} from 'react'
import axios from 'axios'
import working_woman from './working_woman.png'


function AllDocs(){

    const [backendData, setBackendData] = useState([{}])
    
    
    
    

    useEffect(() => {
        fetch("http://localhost:5000/hr/getDocs", {
            credentials: 'include'
        }).then(
        response => {return response.json()}
        //console.log(response)}
        ).then(
        data => {
            setBackendData(data)
            
                
        }
        )
    }, []);



   
   

    
    
    

    return (
        <div className="AllDocs" style={{position : 'absolute', top : '12%',left : '20%' }}>
        <h1 style={{color : '#4C00FF'}}>All employees</h1>

        
            {(typeof backendData.allEmp === 'undefined') ? (
                <p>Loading...</p>
            ) : ( 

                
                
                <> <table style={{width : '150%'}}>
                    <tr>
                        <th>Eid</th>
                        <th>Name</th>
                        <th>Username</th>
                        

                    </tr>
                        {backendData.allEmp.map(d => {
                            return (
                                <tr key={d.eid}>

                                    <td >
                                        {d.eid}
                                    </td>
                                    <td >
                                        {d.name}
                                    </td>
                                    <td >
                                        {d.username}
                                    </td>
                                    <td >
                                    <a href={"/hr/"+d.username} target="_blank" rel="noreferrer">View Docs</a>
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


export default AllDocs;