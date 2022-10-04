
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar'
import LandingRest from './components/LandingRest'
import HrDashboard from './components/HrDashboard'
import CreateChecklist from './components/CreateChecklist';
import AllDocs from './components/AllDocs';
import IndividualDocs from './components/IndividualDocs';
import EmpDashboard from './components/EmpDashboard';
import EmpViewDocs from './components/EmpViewDocs';
import HrPolls from './components/HrPolls';
import IndividualPoll from './components/IndividualPoll'
import EmpPolls from './components/EmpPolls';
import EmpIndividualPoll from './components/EmpIndividualPoll';
import PollsDashboard from './components/PollsDashboard';
import AllPollsDashboard from './components/AllPollsDashboard';



function App() {

  return (


    <Router>
      <div className="App">
        
         <div className="content">
          <Routes>
            <Route exact path="/" element={<><Navbar /> <LandingRest /></>} />
              
            <Route exact path="/hr/hrDashboard" element={<><HrDashboard /> <CreateChecklist /> </>} />

            <Route exact path="/hr/getDocs" element={<><HrDashboard /> <AllDocs /></>} />
            
            <Route exact path="/hr/:username" element={<><HrDashboard /> <IndividualDocs /></>} />

            <Route exact path="/emp/empDashboard" element={<><EmpDashboard /> <EmpViewDocs /> </>} />

            <Route exact path="/hr/getDocs" element={<><HrDashboard /> <AllDocs /></>} />

            <Route exact path="/hr/allPolls" element={<><HrDashboard /> <HrPolls /></>} />
            
            <Route  exact path="/hr/:cid/:pollId" element={<><HrDashboard /> <IndividualPoll /></>} />
            <Route exact path="/hr/viewAllresults" element={<><HrDashboard /> <PollsDashboard /></>} />


            <Route exact path="/emp/viewPolls" element={<><EmpDashboard /> <EmpPolls /></>} />
            <Route exact path="/emp/:cid/:pollId" element={<><EmpDashboard /> <EmpIndividualPoll /></>} />
            {/* <Route exact path="/hr/pollsDashboard" element={<><HrDashboard /> <AllPollsDashboard /></>} /> */}


      
          </Routes>
        </div> 
      </div>
    </Router>

    
  );
}

export default App;
