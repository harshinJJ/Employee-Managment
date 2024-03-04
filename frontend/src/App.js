import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Loginpage from "./components/Loginpage";
import Homepage from "./components/Homepage";
import Employeeaddingform from "./components/Employeeaddingform";
import Employeedetails from "./components/Employeedetails";
import Editemployee from "./components/Editemployee";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route>
            <Route exact path="/" element={<Loginpage />} />
            <Route exact path="/home" element={<Homepage />} />
            <Route exact path="/addemp" element={<Employeeaddingform />} />
            <Route exact path="/empdetails" element={<Employeedetails />} />
            <Route exact path="/editemp/:userid" element={<Editemployee />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
