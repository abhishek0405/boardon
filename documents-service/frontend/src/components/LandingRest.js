import img1 from './working_girl_ts.png'
import img2 from './standing_man.png'
import img3 from './demo.gif'

function LandingRest () {


    return (
        <div className="LandingRest">

            <div className="mid-section">Onboarding and managing new employees made easy.</div>

            <div className="caption">BoardOn helps you OnBoard ;)</div>
            <img src={img3} alt="standing_man" style={{position : 'absolute', width : '57%', height : '60%', left:'40%', top : '25%'}} />



            <button className="blue-btn" style={{position : 'absolute', top : '68%', left : '5%', fontSize : '24px'}}>Get started</button>
            
           <div className="circle" style={{position : 'absolute', top : '20%', left : '8%', opacity: '0.4'}}></div>
           <div className="circle" style={{position : 'absolute', top : '50%', left : '90%',  opacity: '0.2'}}></div>
           <div className="circle" style={{width: '500px', height : '500px',position : 'absolute', top : '80%', left : '3%', backgroundImage: 'linear-gradient(#4C00FF, #aa85ff'}}></div>
           <div className="circle" style={{width: '100px', height : '100px',backgroundColor : '#4C00FF',position : 'absolute', top : '20%', left : '80%',  opacity: '0.2'}}></div>
           <div className="circle" style={{width: '600px', height : '600px',position : 'absolute', top : '140%', left : '70%'}}></div>

           


            <img src={img1} alt="working_girl" style={{position : 'absolute', top : '85%', left : '10%', width : '20%', height : '55%'}} />

            <div className='section-1' style={{width: '65%', minHeight : '200px', position : 'absolute', top : '100%', left : '32%', textAlign : 'right'}}>
                <h3>Feature 1</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor xyzwe incididunt ut labore et dolore magna aliqua. Laoreet id donec ultrices tincidunt arcu non sodales neque. Convallis aenean et tortor at. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Habitant morbi tristique senectus et netus et malesuada fames ac.</p>
            </div>


            <div className='section-2' style={{width: '60%', minHeight : '200px', position : 'absolute', top : '150%', left : '10%', textAlign : 'left'}}>
                <h3>Feature 2</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor xyzwe incididunt ut labore et dolore magna aliqua. Laoreet id donec ultrices tincidunt arcu non sodales neque. Convallis aenean et tortor at. Amet facilisis magna etiam tempor orci eu lobortis elementum nibh. Habitant morbi tristique senectus et netus et malesuada fames ac.</p>

            </div>
            <img src={img2} alt="standing_man" style={{position : 'absolute', top : '150%', left : '80%', height: '35%', width : '25%'}} />

            

        </div>
    );

}


export default LandingRest;