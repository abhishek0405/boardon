
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar'
import LandingRest from './components/LandingRest'
import HrDashboard from './components/HrDashboard'
import CreateChecklist from './components/CreateChecklist';
import AllDocs from './components/AllDocs';
import IndividualDocs from './components/IndividualDocs';
import EmpDashboard from './components/EmpDashboard';
import EmpViewDocs from './components/EmpViewDocs';



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
            
          </Routes>
        </div> 
      </div>
    </Router>

    
  );
}

export default App;
