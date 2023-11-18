import React from 'react';
import './Role.css'; // Import the CSS file for custom styling
import { Link } from 'react-router-dom';
//import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft,} from '@fortawesome/free-solid-svg-icons';
function Role() {
  return (

    <div id="adminContainer" className="container-fluid">
       
      <div className="d-flex justify-content-center align-items-center h-100">
        <div id="roleContainer" className="p-3 custom-border">
          <p id="roletext">Select Job Role</p>
          <Link to="/admin/bulkUpload">
          <button className="btn" id="admincombtn">Bulk Upload</button>
          </Link>
          <Link to="/admin/addEmployee">
          <button className="btn" id="adminempbtn">Add Employee Manually</button>
          </Link>
          <div>
          <Link to="/admin/EmpHistory">
          <button
            type="button"
            className="btn btn-warning"
            id="addsubmitcom"
            style={{marginTop: '4%' ,marginRight: '43%'}}
          >
            Back
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="mr-2"
              style={{ marginLeft: '5px', marginTop: '0px' }}
            />
          </button>
        </Link>
        </div>
        </div>
      </div>
    </div>
    
  );
}

export default Role;
