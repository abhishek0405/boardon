import React from 'react';

import Modal from 'react-modal';
import {useEffect, useState} from 'react'
import axios from 'axios'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
	height: '55%',
    
    position: 'absolute',
    overflowX : 'hidden',
    overflowY : 'hidden'
    
    
  },
};

Modal.setAppElement('#root');

function Navbar () {

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }



    //functions to handle submit
    const [docs, setDocs] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const docsToAdd = { docs };

        console.log(docsToAdd)
        axios.post('http://localhost:5000/hr/createChecklist', docsToAdd)
        .then(res=> console.log(res.data))
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
                    
                <button className="blue-btn" style={{position : 'absolute', left : "94%", top : "3%"}} onClick={openModal}>Login</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className='circle' style={{width : '200px', height : '200px', position : 'absolute', left : '68%'}}>
                        
                        
                        


                    </div>
                    <h2 style={{fontSize : 30}}>Login</h2>
                        <form onSubmit={handleSubmit}>


                            <div class="login__field">
                            <i class="login__icon fas fa-user"></i>
                                <input type="text" class="login__input" placeholder="User name / Email" name='email' id='email' />
                            </div>
                            <div class="login__field">
                                <i class="login__icon fas fa-lock"></i>
                                <input type="password" class="login__input" placeholder="Password" name='password' id='password' />
                            </div>

                                <br /><br />
                                
                                <button className='blue-btn' >Submit</button>
                        </form>
                    
                    
                </Modal>
                </div>
                
                
              
                
                <button className="blue-btn" style={{position : 'absolute', left : "85%", top : "3%"}}>Get started</button>

            </div>
            
           
        </div>
    );

}


export default Navbar;