import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Modal from 'react-modal';

import {useState, useEffect} from 'react'
import axios from 'axios'
import bell_icon from './bell_icon.png'
import user_icon from './user_icon.png'
import message_icon from './message_icon.png'
import { useNavigate } from "react-router-dom";


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

function IndividualPoll () {

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
    const [status, setStatus] = useState('')

    var pollId = window.location.pathname.split("/").pop()
    

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


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        var ques = {}
        ques.question = question

        if(opt1 !== ''){
            ques.option1 = opt1

        }
        else{
            ques.option1 = "NA"
        }

        if(opt2 !== ''){
            ques.option2 = opt2

        }
        else{
            ques.option2 = "NA"
        }

        if(opt3 !== ''){
            ques.option3 = opt3

        }
        else{
            ques.option3 = "NA"
        }

        if(opt4 !== ''){
            ques.option4 = opt4

        }
        else{
            ques.option4 = "NA"
        }
        ques.pollId = pollId
        console.log(ques)
        
        axios.post('http://localhost:3005/hr/addQuestion', ques, {
            withCredentials: true
        })
        .then(res=> {console.log(res.data)
            
           setBackendData(res.data)
           setMsg('Question added succesfully')
           //closeModalOne()
        
        })
        .catch(err=>console.log(err.response.data));
        

    
    }

    const handlePost = async (e) => {
        e.preventDefault()
        var p = {pollId : pollId}
        if(status === 'Post poll'){
            p.status = 'yes'
        }
        else{
            p.status = 'no'
        }
        axios.post('http://localhost:3005/hr/postPoll', p, {
            withCredentials: true
        })
        .then(res=> {console.log(res.data)
           //setBackendData(res.data)
           setPostMsg('Success')
           //closeModalOne()
        
        })

    }

    useEffect(() => {
        console.log(window.location.pathname)
        var url = 'http://localhost:3005'+window.location.pathname.toString()
        fetch(url, {
            credentials : 'include'
        }).then(
        response => {return response.json()}
        //console.log(response)}
        ).then(
        data => {
            console.log(data)
            if(data.status === 'yes'){
                setStatus('Withdraw poll')
            }
            else if(data.status === 'no'){
                setStatus('Post poll')
            }
            setBackendData(data)
            
        }
        )
    }, []);



    //functions to handle submit
    const [docs, setDocs] = useState('')
    

    const handleClick = async (e) => {
        console.log('hellp')
        axios.delete('http://localhost:3002/auth/logout', {
            withCredentials : true
        } )
        .then(res=> {console.log(res.data)
            if(res.data.status === "success"){
                navigate('/')
            }
            
            
        
        })
        .catch(err=>console.log(err.response.data));
    }


    return (
        <div className="IndividualPoll" style={{position : 'absolute', top : '35%',left : '20%' }}>
            
            {
                (typeof backendData.arr === 'undefined') ? ( <p>Loading...</p>) :
                (
                    <>
                    <button className='blue-btn' style={{position : 'absolute', top : '-40%', marginLeft : '35%' }} onClick={handlePost} >{status}</button>
                    {
                            (postmsg !== '') ? (<p style={{fontSize : 12, color: 'green'}}>{postmsg}</p>) : (<p></p>)
                        }
                        <div className='login-modal'>
                        <button className='blue-btn' style={{position : 'absolute', top : '-40%' }} onClick={openModalOne}>Add question</button>
                    <Modal
                        isOpen={modalOneIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModalOne}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
    
                        
                        <h2 style={{fontSize : 30}}>Add new question</h2>
                        {
                                    (msg !== '') ? (<p style={{fontSize : 12, color: 'green'}}>{msg}</p>) : (<p></p>)
                                }
                                
                            <form onSubmit={handleSubmit}>
    
                                
                                <div class="login__field">
                                <i class="login__icon fas fa-user"></i>
                                    <input type="text" class="login__input" placeholder="Enter the question" value={question} name={"question"} id="question"  onChange={(e) => setQuestion(e.target.value)} />
                                    
                                </div>

                                <div class="login__field">
                                <i class="login__icon fas fa-user"></i>
                                    <input type="text" class="login__input" placeholder="Option 1" value={opt1} name={"opt1"} id="opt1"  onChange={(e) => setOpt1(e.target.value)} />
                                    
                                </div>

                                <div class="login__field">
                                <i class="login__icon fas fa-user"></i>
                                    <input type="text" class="login__input" placeholder="Option 2" value={opt2} name={"opt2"} id="opt2"  onChange={(e) => setOpt2(e.target.value)} />
                                    
                                </div>

                                <div class="login__field">
                                <i class="login__icon fas fa-user"></i>
                                    <input type="text" class="login__input" placeholder="Option 3" value={opt3} name={"opt3"} id="opt3"  onChange={(e) => setOpt3(e.target.value)} />
                                    
                                </div>

                                <div class="login__field">
                                <i class="login__icon fas fa-user"></i>
                                    <input type="text" class="login__input" placeholder="Option 4" value={opt4} name={"opt4"} id="opt4"  onChange={(e) => setOpt4(e.target.value)} />
                                    
                                </div>
                               
                                    <br /><br />
                                    
                                    <button className='blue-btn' >Submit</button>
                            </form>
                        
                        
                    </Modal>
                    </div>
                        
                        <table style={{width : '150%', textAlign : 'center'}}>
                            <tr>
                                <th>Question</th>
                                <th>Option A</th>
                                <th>Option B</th>
                                <th>Option C</th>
                                <th>Option D</th>

                            </tr>
                            {backendData.arr.map(d => {
                                    return (
                                        <tr key={d.qs}>
                                            <td>{d.qs}</td>
                                            
                                            {d.opt.map(o => {
                                                return (
                                                    <td>{o}</td>
                                                )
                                            })}
                                            
                                        </tr>
                                    )
                            }
                            )}
                        </table>
                    </>
                )
            }
        </div>
    );

}


export default IndividualPoll;