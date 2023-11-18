import React ,{useEffect} from 'react';
import './ComAdminDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import NavBarCom from '../NavBarCom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
function ComAdminDetails() {
  const [adminData, setAdminData] = useState({
    isActive: '',
    adminName: '',
    adminMail: '',
    designation: '',
    designationLevels: [],
  });
  useEffect(() => {
    const additionalData = JSON.parse(localStorage.getItem('additionalData'));
    if (additionalData && additionalData.designationLevels) {
      setAdminData({
        ...adminData,
        designationLevels: additionalData.designationLevels,
      });
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };
  const saveToLocalStorage = () => {
    // Convert adminData to a JSON string and store in local storage
    localStorage.setItem('adminDetails', JSON.stringify(adminData));
  };
  return (
    <div id="global-background">
      <NavBarCom />
      <div className="circleController">
        <div className="circle-container">
          <div className="circle-heading-container">
            <div className="circle yellow">
              <div className="line yellow"></div>
              1
            </div>
            <h3 className="heading">Details</h3>
          </div>
          <div className="circle-heading-container" >
            <div className="circle yellow">
              <div className="line yellow"></div>
              2
            </div>
            <h3 className="heading">Additional Details</h3>
          </div>
          <div className="circle-heading-container">
            <div className="circle last-circle yellow">3</div>
            <h3 className="heading">Admin</h3>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="form-container" id="addempform">
          <div className="row">
            <div className="col-md-3">
              <h2 className="form-title">
                <strong>Admin <br /> Details</strong> 
              </h2>
            </div>
            <div className="col-md-9">
              <form id="insideBox">
                <div className="row">

                  <div className="col-md-6">
                  <div className="mb-3">
                      <label
                        htmlFor="addemployeename"
                        className="form-label d-flex align-items-start"
                      >
                        Admin Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addemployee"
                        name="adminName"
                        value={adminData.adminName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="addemployeeId"
                        className="form-label d-flex align-items-start"
                      >
                        IS Active
                      </label>
                      <select className="form-select" id="dropdown" name="isActive"  value={adminData.isActive}
                        onChange={handleInputChange}>
                        <option value="" disabled selected>
                          Select a Status
                        </option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="mb-3">
                      <label
                        htmlFor="addempaddress"
                        className="form-label d-flex align-items-start"
                      >
                        Admin mail ID
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="addemployee"
                        name="adminMail"
                        value={adminData.adminMail}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="designation" className="form-label d-flex align-items-start">
                        Designation
                      </label>
                      <select
                        className="form-select"
                        id="dropdown"
                        name="designation"
                        value={adminData.designation}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select a Designation
                        </option>
                        {adminData.designationLevels.map((designation, index) => (
                          <option key={index} value={designation}>
                            {designation}
                          </option>
                        ))}
                      </select>
                    </div>
        
                  </div>

                  <div className="mb-3">
                  <Link to="/admin/Companypreview">
                    <button type="button" className="btn btn-warning" id="addsubmitemp" onClick={saveToLocalStorage}>
                      Submit
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="mr-2"
                        style={{ marginLeft: '5px' }}
                      />
                    </button>
                    </Link>
                    <Link to="/admin/addCompanyadditional">
                      <button
                        type="button"
                        className="btn btn-warning"
                        id="addsubmitemp"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComAdminDetails;
