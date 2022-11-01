import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Modal from 'react-modal';

import {useState, useEffect} from 'react'
import axios from 'axios'
import bell_icon from './bell_icon.png'
import user_icon from './user_icon.png'
import message_icon from './message_icon.png'

import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
	minHeight: '55%',
    
    position: 'absolute',
    overflowX : 'hidden',
    overflowY : 'hidden'
    
    
  },
};

Modal.setAppElement('#root');

function PollsDashboard () {

    let subtitle;
    const [modalOneIsOpen, setOneIsOpen] = React.useState(false);
    
    const navigate = useNavigate();
    const [backendData, setBackendData] = useState([{}])
    const [question, setQuestion] = useState('')
    const [opt1, setOpt1] = useState('')
    const [opt2, setOpt2] = useState('')
    const [opt3, setOpt3] = useState('')
    const [opt4, setOpt4] = useState('')
    const [msg, setMsg] = useState('')
    const [postmsg, setPostMsg] = useState('')
    const [answers, setAnswers] = useState({})
    const [pollName, setPollName] = useState('')
    const [pid, setPid] = useState(1)
    const [selected, setSelected] = useState('');
    var pollId = window.location.pathname.split("/").pop()
    var c = 0
    
    

    function openModalOne() {
        setOneIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModalOne() {
        setOneIsOpen(false);
        setMsg('')
        setQuestion('')
        setOpt1('')
        setOpt2('')
        setOpt3('')
        setOpt4('')

    }

    useEffect(() => {
        console.log(window.location.pathname)
        var url = 'http://localhost:3005/hr/viewAllresults'
        fetch(url, {
            credentials : 'include'
        }).then(
        response => {return response.json()}
        //console.log(response)}
        ).then(
        data => {
            console.log("hey")
            console.log(data)
            setSelected(data.currPolls[0].pollName)
            setPollName(data.currPolls[0].pollId)
            setPid(data.currPolls[0].pollId)
            setBackendData(data)
                
        }
        )
    }, []);



    //functions to handle submit
    const [docs, setDocs] = useState('')
    

  
    
      const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value);
        setPollName(event.target.value)
        setPid(event.target.value)
        console.log(pid)
        var url = 'http://localhost:3005/hr/viewAllresults?poll='+ event.target.value
        fetch(url, {
            credentials : 'include'
        }).then(
        response => {return response.json()}
        //console.log(response)}
        ).then(
        data => {
            console.log("hey")
            console.log(data)
            
            
            setBackendData(data)
                
        }
        )

      };



      var COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042"];
      

   const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
       return (
        <div
            className="custom-tooltip"
            style={{
                backgroundColor: "#ffff",
                padding: "5px",
                border: "1px solid #cccc"
            }}
        >
            <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
        );
     }
    }


    return (
        <div className="PollsDashboard" style={{position : 'absolute', top : '15%',left : '20%' }}>


            {(typeof backendData.allCharts === 'undefined') ? ( <p>Loading...</p>) :
            
            
            
            (  
                <>
                    <h1>Poll: {pollName}</h1> 
                    <select value={selected} onChange={handleChange}>
                    {
                        
                        backendData.currPolls.map(cp => {
                            return(
                                <option key={cp.pollName} value={cp.pollId} >{cp.pollName}</option>
                            )
                        })
                        
                    }
                    </select>
                        

                    <div className='grid-container'>
                    {       
                       

                       backendData.allCharts.map(d => {
                           
                           return(
                               <>
                               <div className='grid-item'>
                               <h4>{backendData.questions[c]}</h4>
                               {c += 1}
                                   <PieChart width={730} height={300}>
                                    <Pie
                                        data={d}
                                        color="#000000"
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={120}
                                        fill="#8884d8"
                                    >
                                        {d.map((entry, index) => (
                                            <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend layout="horizontal" verticalAlign="top" align="center" />
                                    </PieChart>
                               </div>
                               
                               
                               </>
                           )
                           
                       })
                   
               }

                    </div>
                    
                    

                    
                    
                        
                </>
            )}
            
            
                    

        </div>
    );

}


export default PollsDashboard;