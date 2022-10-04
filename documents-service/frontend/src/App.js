import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingRest from "./components/LandingRest";
import HrDashboard from "./components/HrDashboard";
import CreateChecklist from "./components/CreateChecklist";
import AllDocs from "./components/AllDocs";
import IndividualDocs from "./components/IndividualDocs";
import EmpDashboard from "./components/EmpDashboard";
import EmpViewDocs from "./components/EmpViewDocs";
import Resources from "./components/Resources";
import Document from "./components/Document";
import Result from "./components/SearchResults";
import AddDocumentation from "./components/AddDocumentation";
import GenerateCredentials from "./components/GenerateCredentials";
function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Navbar /> <LandingRest />
                </>
              }
            />

            <Route
              exact
              path="/hr/hrDashboard"
              element={
                <>
                  <HrDashboard /> <CreateChecklist />{" "}
                </>
              }
            />

            <Route
              exact
              path="/hr/getDocs"
              element={
                <>
                  <HrDashboard /> <AllDocs />
                </>
              }
            />

            <Route
              exact
              path="/hr/:username"
              element={
                <>
                  <HrDashboard /> <IndividualDocs />
                </>
              }
            />

            <Route
              exact
              path="/emp/empDashboard"
              element={
                <>
                  <EmpDashboard /> <EmpViewDocs />{" "}
                </>
              }
            />

            <Route
              exact
              path="/hr/getDocs"
              element={
                <>
                  <HrDashboard /> <AllDocs />
                </>
              }
            />
            <Route
              exact
              path="/emp/resources"
              element={
                <>
                  <EmpDashboard /> <Resources />
                </>
              }
            ></Route>

            <Route
              exact
              path="/emp/resources/:id"
              element={
                <>
                  <EmpDashboard /> <Document />
                </>
              }
            ></Route>
            <Route
              exact
              path="/emp/resources/search/:searchQuery"
              element={
                <>
                  <EmpDashboard /> <Result />
                </>
              }
            ></Route>
            <Route
              exact
              path="/emp/resources/insert"
              element={
                <>
                  <EmpDashboard /> <AddDocumentation />
                </>
              }
            ></Route>

            <Route
              exact
              path="/hr/generateCredentials"
              element={
                <>
                  <HrDashboard /> <GenerateCredentials />
                </>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
