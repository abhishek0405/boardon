import React from 'react';

import Modal from 'react-modal';

import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '30%',
	minHeight: '55%',
    
    position: 'absolute',
    overflowX : 'hidden',
    overflowY : 'hidden'
    
    
  },
};

Modal.setAppElement('#root');

function Navbar () {

    let subtitle;
    const [modalOneIsOpen, setOneIsOpen] = React.useState(false);
    const [modalTwoIsOpen, setTwoIsOpen] = React.useState(false);
    const [state, setState] = useState(true)

    //company and employee login states
    const [username, setUsername] = useState('')
    const [empPassword, setEmpPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    //company register states
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [domain, setDomain] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')

    const [nameError, setNameError] = useState('')
    const [success, setSuccess] = useState('')

    
    const navigate = useNavigate();


    function openModalOne() {
        setOneIsOpen(true);
    }
    function openModalTwo() {
        setTwoIsOpen(true);
    }


    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModalOne() {
        setOneIsOpen(false);
    }
    function closeModalTwo() {
        setTwoIsOpen(false);
    }

    
    //functions to handle submit
    const [docs, setDocs] = useState('')

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        var employee = {} 
        if(state === true){
            employee.role = 'user'
            employee.username = username
            employee.password = empPassword
        }
        else{
            employee.role = 'company'
            employee.name = username
            employee.password = empPassword
        }
        console.log(employee)

        if(employee.role === 'user'){
            axios.post('http://localhost:3002/auth/user/login', employee, {
                withCredentials: true
            })
            .then(res=> {console.log(res.data)
                if(res.data.status === 'error'){
                    console.log('here')
                    setUsernameError('')
                    setPasswordError('')
                    if(res.data.error === "Invalid username")
                    setUsernameError(res.data.error)
                    else if(res.data.error === "Invalid Password")
                    setPasswordError(res.data.error)
                }
                else{
                    setUsernameError('')
                    setPasswordError('')
                    navigate("/emp/empDashboard")
                }
            
            })
            .catch(err=>console.log(err.response.data));
        }
        else if(employee.role === 'company'){
            axios.post('http://localhost:3002/auth/company/login', employee, {
                withCredentials: true
            })
            .then(res=> {console.log(res.data)
                if(res.data.status === 'error'){
                    console.log('here')
                    setUsernameError('')
                    setPasswordError('')
                    if(res.data.error === "Invalid username")
                    setUsernameError(res.data.error)
                    else if(res.data.error === "Invalid Password")
                    setPasswordError(res.data.error)
                }
                else{
                    setUsernameError('')
                    setPasswordError('')
                    navigate("/hr/hrDashboard")
                }
            
            
            })
            .catch(err=>console.log(err.response.data));
        }

        
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        
        var company = {} 
        company.name = name
        company.description = description
        company.password = password
        company.address = address
        company.domain = domain
        console.log(domain)

        
        axios.post('http://localhost:3002/auth/company/register', company, {
            withCredentials: true
        })
        .then(res=> {console.log(res.data)
            if(res.data.status === 'error'){
                console.log('here')
                setNameError('')
                
                if(res.data.error === "Company already exists!")
                setNameError(res.data.error)
                
            }
            else{
                setNameError('')
                setSuccess(res.data.message)
                closeModalTwo()
                openModalOne()
               
            }
        
        
        })
        .catch(err=>console.log(err.response.data));
        

    
    }


    return (
        <div className="Navbar">

            <div className="navbar-bg">
                
                <div className="blue-btn" style={{backgroundColor: '#B3FF00', top : 25, fontSize : 24, fontFamily : 'Arial', color : 'black'}}>BoardOn</div>
                

                <div className='blue-btn' style={{backgroundColor: '#B3FF00', top : 25, fontSize : 20, fontFamily : 'Arial', right : "-15%", color : 'black'}}>Home</div>
                <div className="blue-btn" style={{backgroundColor: '#B3FF00', top : 25, fontSize : 20, fontFamily : 'Arial', right : "-20%", color : 'black'}}>About</div>
                <div className="blue-btn" style={{backgroundColor: '#B3FF00', top : 25, fontSize : 20, fontFamily : 'Arial', right : "-25%", color : 'black'}}>Our product</div>
                <div className="blue-btn" style={{backgroundColor: '#B3FF00', top : 25, fontSize : 20, fontFamily : 'Arial', right : "-30%", color : 'black'}}>Contact Us</div>

                
                
                <div className='login-modal'>
                    
                <button className="blue-btn" style={{position : 'absolute', left : "94%", top : "3%"}} onClick={openModalOne}>Login</button>
                <Modal
                    isOpen={modalOneIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModalOne}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    {
                    
                    (state === true) ? 
                    (<div className='circle' style={{width : '200px', height : '200px', position : 'absolute', left : '68%'}}></div>)
                     : (<div className='circle' style={{width : '200px', height : '200px', backgroundImage: 'linear-gradient(#4C00FF, #aa85ff', position : 'absolute', left : '68%'}}></div>)
                     
                     
                     }
                    
                        
                        
                        


                    
                    <h2 style={{fontSize : 30}}>Login</h2>
                            {
                                    (success !== '') ? (<p style={{fontSize : 12, color: 'green'}}>{success + ". You can now log in."}</p>) : (<p></p>)
                            }
                        <form onSubmit={handleSubmitLogin}>

                            
                                {/* <label style = {{fontSize : 12}}>Login as: </label>
                                <input type="radio"  name='role' id='company' value='company' /> <label htmlFor="role" style = {{fontSize : 12, top : 2}}>Company</label>
                                <input type="radio"  name='role' id='employee' value='employee' /> <label htmlFor="role" style = {{fontSize : 12}}>Employee</label> */}
                                <label style = {{fontSize : 16, paddingRight : 5}}>Login as: </label> 
                                <label className="switch">
                                    <input type="checkbox" name={"role"} onChange={() => setState(!state)} />
                                    <span className="slider round"></span>
                                </label>
                                {
                                    (state === true) ? (<label style = {{fontSize : 14}}> Employee</label>) : (<label style = {{fontSize : 16}}> Company</label>)
                                }
                                
                           
                                <br /><br />
                            <div class="login__field">
                            <i class="login__icon fas fa-user"></i>
                                <input type="text" class="login__input" placeholder="User name / Email" value={username} name={"username"} id="username"  onChange={(e) => setUsername(e.target.value)} />
                                {
                                    (usernameError !== '') ? (<p style={{fontSize : 12, color: 'red'}}>{usernameError}</p>) : (<p></p>)
                                }
                                
                            </div>
                            <div class="login__field">
                                <i class="login__icon fas fa-lock"></i>
                                <input type="password" class="login__input" value = {empPassword} placeholder="Password" name={"empPassword"} id="empPassword"  onChange={(e) => setEmpPassword(e.target.value)} />
                                {
                                    (passwordError !== '') ? (<p style={{fontSize : 12, color: 'red'}}>{passwordError}</p>) : (<p></p>)
                                }
                            </div>

                                <br /><br />
                                
                                <button className='blue-btn' >Submit</button>
                        </form>
                    
                    
                </Modal>
                </div>
                
                
                <div className='get-started-modal'>

                <button className="blue-btn" style={{position : 'absolute', left : "85%", top : "3%"}} onClick={openModalTwo}>Get started</button>

                
                <Modal
                    isOpen={modalTwoIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModalTwo}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className='circle' style={{width : '200px', height : '200px', position : 'absolute', left : '68%'}}>
                        
                        
                        


                    </div>
                    <h2 style={{fontSize : 30}}>Get started</h2>
                        <form onSubmit={handleSubmitRegister}>


                            <div class="login__field">
                            <i class="login__icon fas fa-user"></i>
                                <input type="text" class="login__input" placeholder="Company name" name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                                {
                                    (nameError !== '') ? (<p style={{fontSize : 12, color: 'red'}}>{nameError}</p>) : (<p></p>)
                                }
                            </div>
                            <div class="login__field">
                            <i class="login__icon fas fa-user"></i>
                                <input type="text" class="login__input" placeholder="Address" name='address' id='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div class="login__field">
                            <i class="login__icon fas fa-user"></i>
                                <input type="text" class="login__input" placeholder="Domain, e.g. xyz.com" name='domain' id='domain' value={domain} onChange={(e) => setDomain(e.target.value)} />
                            </div>
                            <div class="login__field">
                            <i class="login__icon fas fa-user"></i>
                                <input type="text" class="login__input" placeholder="Company description" name='description' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            
                            <div class="login__field">
                                <i class="login__icon fas fa-lock"></i>
                                <input type="password" class="login__input" placeholder="Password" name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                                <br /><br />
                                
                                <button className='blue-btn' >Submit</button>
                        </form>
                    
                    
                </Modal>
                </div>
              
                
                

            </div>
            
           
        </div>
    );

}


export default Navbar;