import {useEffect, useState, React, useRef} from 'react'
import axios from 'axios'
import working_woman from './working_woman.png'
import Cookies from 'universal-cookie';

const cookies = new Cookies();



function CreateChecklist(){

    const [backendData, setBackendData] = useState([{}])
    const [docs, setDocs] = useState('')
    const ref = useRef(null);
    
    
    const [state, setState] = useState({
        Aadhaar: false,
        BirthCertificate: false,
        PanCard : false,
        Passport : false,
        Marksheet : false,
        Resume : false,
        ElectricityBill : false,
        VoterId : false
    });
    
    
    const handleSubmit = async (e) => {
        //e.preventDefault();
        const docsToAdd = { Aadhaar : state.Aadhaar, Passport : state.Passport, PanCard : state.PanCard, BirthCertificate : state.BirthCertificate, ElectricityBill : state.ElectricityBill, VoterId : state.VoterId, Marksheet : state.Marksheet, Resume : state.Resume };

        console.log(docsToAdd)
        var newdata = []
        if(state.Aadhaar){
            newdata.push('Aadhaar')
        }
        if(state.BirthCertificate){
            newdata.push('BirthCertificate')
        }
        if(state.PanCard){
            newdata.push('PanCard')
        }
        if(state.Passport){
            newdata.push('Passport')
        }

        if(state.Marksheet){
            newdata.push('Marksheet')
        }
        if(state.Resume){
            newdata.push('Resume')
        }
        if(state.ElectricityBill){
            newdata.push('ElectricityBill')
        }
        if(state.VoterId){
            newdata.push('VoterId')
        }
        
        
        axios.post('http://localhost:5000/hr/createChecklist', docsToAdd, {
            withCredentials: true
        })
        .then(res=> {console.log(res.data)
        //setBackendData(newdata)
        })
        .catch(err=>console.log(err.response.data));


        // fetch('http://localhost:5000/hr/createChecklist', {
        //     method: 'post',
        //     headers: {'Content-Type':'application/json'},
        //     body: docsToAdd
        //    });
  
    
    }

    useEffect(() => {
        fetch("http://localhost:5000/hr/hrDashboard", {
            credentials: 'include'
        }).then(
        response => {return response.json()}
        //console.log(response)}
        ).then(
        data => {
            setBackendData(data)
            
            Object.keys(state).map(key => {
                setState(s => ({ ...s, [key]: data.arr.includes(key) }))


            }   
            
            )
            
            
    }
        )
    }, []);



   
   

      const updateState = (key, newsChecked) => {
        const updatedListOfItems = {...state};
        updatedListOfItems[key] = newsChecked;
        setState(updatedListOfItems);
      }


      const handleToggle = ({ target }) =>
    setState(s => ({ ...s, [target.name]: !s[target.name] }));
    
    
    

    return (
        <div className="CreateCheckList" style={{position : 'absolute', top : '12%',left : '20%' }}>
        <h1 style={{color : '#4C00FF'}}>Your checklist</h1>

        
            {(typeof backendData.arr === 'undefined') ? (
                <p>Loading...</p>
            ) : ( 

                
                
                <> <table>
                        {backendData.arr.map(d => {
                            return (
                                <tr>

                                    <td key={d}>
                                        {d}
                                    </td>
                                </tr>

                            )
                        })}
                         

                    </table><img src={working_woman} alt="working_woman" style={{position : 'absolute', top : '5%',left : '110%', width :'70%', height: '100%', opacity : '0.8'}}/>

                    <br /><br />


                    <h1 style={{color : '#4C00FF'}}>Check the documents required</h1><div className="container1">

                            <form onSubmit={handleSubmit} >
                            <ul className="ks-cboxtags">
                               

                            {
                            
                               
                                
                                
                                Object.keys(state).map(key => (
                                
                                
                                    <li key={key}><><input type="checkbox" id={key}  key={key} value={key} name={key} checked={state[key]}  onChange={handleToggle} /><label htmlFor={key}>{key}</label></></li>
                                ))
                            
                            
                            }
                                

                                
                                {/*   <li class="ks-selected"><input type="checkbox" id="BirthCertificate" value="BirthCertificate" checked={(backendData.arr.includes('BirthCertificate')) ? true : false} /><label for="BirthCertificate">Birth Certificate</label></li>
                                <li><input type="checkbox" id="PanCard" value="PanCard" checked={(backendData.arr.includes('PanCard')) ? true : false} /><label htmlFor="PanCard">Pan card</label></li>
                                <li><input type="checkbox" id="Passport" value="Passport" checked={(backendData.arr.includes('Passport')) ? true : false} /><label htmlFor="Passport">Passport</label></li>
                                <li><input type="checkbox" id="Marksheet" value="Marksheet" checked={(backendData.arr.includes('Marksheet')) ? true : false} /><label htmlFor="Marksheet">Marksheet</label></li>
                                <li><input type="checkbox" id="Resume" value="Resume" checked={(backendData.arr.includes('Resume')) ? true : false} /><label htmlFor="Resume">Resume</label></li>
                                <li><input type="checkbox" id="ElectricityBill" value="ElectricityBill" checked={(backendData.arr.includes('ElectricityBill')) ? true : false} /><label htmlFor="ElectricityBill">Electricity bill</label></li>
                                <li><input type="checkbox" id="VoterId" value="VoterId" checked={(backendData.arr.includes('VoterId')) ? true : false} /><label htmlFor="VoterId">Voter id</label></li> */}
                            </ul>

                            <br />
                            <button className='blue-btn'>Update</button>
                            </form>

                        </div></>
              )}
        

        












        
        {/* {(typeof backendData.arr === 'undefined') ? (
            <p>Loading...</p>
        ) : (
            backendData.arr
        )}

        <br /><br /><br />
        
        <form onSubmit={handleSubmit}>

            <label>Enter names of docs required (space seaparted). We'll create a checklist for you</label>
            <input type="text" id="docs" name="docs" placeholder="space-separated doc names" value={docs}
            onChange={(e) => setDocs(e.target.value)} />
            <br/><br/>
            <button>Submit</button>
        </form> */}
    </div>
    );




    
}


export default CreateChecklist;