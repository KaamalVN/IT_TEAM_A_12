import React, { useState, useEffect } from 'react';
import './Companydetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import NavBarAd from '../NavBarAd';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function EmpAddDepartment() {
  const [companyData, setCompanyData] = useState([]);
  const [formData, setFormData] = useState({
    department_id: '', // Modify fields as needed
    department_name: '',
    employee_id: '',
    // Add more fields as needed
  });
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const selectedDepartmentId = localStorage.getItem('selectedDepartmentId');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSubmit = () => {
    if (selectedDepartmentId) {
      // Selected department exists, so call updateDepartment
      const company_id = localStorage.getItem('company_id');
      axios
        .post('http://localhost:3002/updateDepartment', { formData, company_id })
        .then((response) => {
          // Handle the response as needed, e.g., show a success message
          localStorage.removeItem('selectedDepartmentId');
          setShowPopup(true);
        })
        .catch((error) => {
          console.error('Error updating department:', error);
        });
    } else {
      // No selected department, call addDepartment
      const company_id = localStorage.getItem('company_id');
      axios
        .post('http://localhost:3002/addDepartment', { formData, company_id })
        .then((response) => {
          // Handle the response as needed, e.g., show a success message
          localStorage.removeItem('selectedDepartmentId');
          setShowPopup(true);
          
        })
        .catch((error) => {
          console.error('Error adding department:', error);
        });
    }
  };

  const handleBackClick = () => {
    localStorage.removeItem('selectedDepartmentId');
    navigate(`/admin/EmpModifyDepartment`);
  };

  // Fetch company data when the component mounts
  useEffect(() => {
    axios
      .post('http://localhost:3002/viewCompanyData', {
        userId: localStorage.getItem('userid'),
      })
      .then((response) => {
        const data = response.data['SELECT * FROM department_table WHERE company_id = ?'];
        console.log(data);
        setCompanyData(data);
        const selectedDepartmentIdAsInt = parseInt(selectedDepartmentId, 10);
        // Find the selected department data
        const selectedDepartment = data.find((item) => item.department_id === selectedDepartmentIdAsInt);
        if (selectedDepartment) {
          // Set the formData with the selected department data
          setFormData(selectedDepartment);
        }
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, [selectedDepartmentId]);

  return (
    <div id="global-background">
      <NavBarAd />
      <div className="container" style={{ marginTop: '9%' }}>
        <div className="container">
          <div className="form-container" id="addcomform">
            <div className="row">
              <div className="col-md-3">
                <h2 className="form-title">
                  <strong>Edit Department</strong>
                </h2>
              </div>
              <div className="col-md-9">
                <form id="insideBox">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="departmentId"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Department ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="department_id"
                          value={formData.department_id}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="departmentName"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Department Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="department_name"
                          value={formData.department_name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="departmentManager"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Department Manager
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="employee_id"
                          value={formData.employee_id}
                          onChange={handleInputChange}
                        />
                      </div>
                      {/* Add more fields as needed */}
                    </div>
                    <div className="col-md-6"></div>
                    <div className="mb-3">
                      <button
                        type="button"
                        className="btn btn-warning"
                        id="addsubmitcom"
                        onClick={handleSubmit}
                      >
                        Update
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="mr-2"
                          style={{ marginLeft: '5px', marginTop: '0px' }}
                        />
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        id="addsubmitcom"
                        onClick={handleBackClick}
                      >
                        Back
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          className="mr-2"
                          style={{ marginLeft: '5px', marginTop: '0px' }}
                        />
                      </button>
                    </div>
                  </div>
                </form>
                {showPopup && (
                  <div className="popup-containerp">
                    <Modal
                      style={{ backgroundColor: 'none' }}
                      show={showPopup}
                      onHide={handlePopupClose}
                      dialogClassName="modal-0w"
                    >
                      <Modal.Body>
                        <div className="popup-contentp">
                          <div className="circle-topp"></div>
                          <div className="circle-bottomp"></div>
                          <div id="iconcirclep">
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              size="3x"
                              style={{ color: '#FFFFFF' }}
                            />
                          </div>
                          <h2>Added</h2>
                          <p>Department has been Added successfully</p>
                          <Link to="/admin/EmpModifyDepartment">
                            <Button id="popupok" variant="warning" onClick={handlePopupClose}>
                              Ok
                            </Button>
                          </Link>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpAddDepartment;
