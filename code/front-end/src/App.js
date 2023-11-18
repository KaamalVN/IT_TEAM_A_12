import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import SubRouting from './Components/Travelrequest';
import EmployeeForm from './Components/EmployeeForm';
import TravelHistory from './Components/TravelRequestOriginal/TravelHistory';
import Login from "./Components/login";
import Popup from './Components/Popup';
import Role from './Components/Role';
import AdminSubrouting from './Components/TravelrequestAdmin'
import Changepassword from './Components/Changepassword';
function CombinedComponent() {
  return (
    <div className="App" >
      <NavBar />
      <TravelHistory/>
   
    </div>
  );
}
function AdminComponent() {
  return (
    <div className="App" >
      {/* <NavBar /> */}
      <Role/>   
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/changePassword" element={<Changepassword />} />
      <Route path="/combined" element={<CombinedComponent />} />
      <Route path="/role" element={<AdminComponent />} />
      <Route path="/user/*" element={<SubRouting />} />
      <Route path="/admin/*" element={< AdminSubrouting/>} />
      <Route path="/thankyou" element={<Popup />}/>
      </Routes>
    </Router>
  );
}

export default App;
