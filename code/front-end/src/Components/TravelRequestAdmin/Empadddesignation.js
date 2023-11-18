import React, { useState, useEffect } from 'react';
import './Companydetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import NavBarAd from '../NavBarAd';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function EmpAddDesignation() {
  const [companyData, setCompanyData] = useState([]);
  const [formData, setFormData] = useState({
    designation_id: '', // Modify fields as needed
    designation_name: '',
    // Add more fields as needed
  });
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const selectedDesignationId = localStorage.getItem('selectedDesignationId');

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
    if (selectedDesignationId) {
      // Selected designation exists, so call updateDesignation
      const company_id = localStorage.getItem('company_id');
      axios
        .post('http://localhost:3002/updateDesignation', { formData, company_id })
        .then((response) => {
          // Handle the response as needed, e.g., show a success message
          localStorage.removeItem('selectedDesignationId');
          setShowPopup(true);
        })
        .catch((error) => {
          console.error('Error updating designation:', error);
        });
    } else {
      // No selected designation, call addDesignation
      const company_id = localStorage.getItem('company_id');
      axios
        .post('http://localhost:3002/addDesignation', { formData, company_id })
        .then((response) => {
          // Handle the response as needed, e.g., show a success message
          localStorage.removeItem('selectedDesignationId');
          setShowPopup(true);
        })
        .catch((error) => {
          console.error('Error adding designation:', error);
        });
    }
  };

  const handleBackClick = () => {
    localStorage.removeItem('selectedDesignationId');
    navigate(`/admin/EmpModifyDesignation`);
  };

  // Fetch company data when the component mounts
  useEffect(() => {
    axios
      .post('http://localhost:3002/viewCompanyData', {
        userId: localStorage.getItem('userid'),
      })
      .then((response) => {
        const data = response.data['SELECT * FROM designation_table WHERE company_id = ?'];
        console.log(data);
        setCompanyData(data);
        const selectedDesignationIdAsInt = parseInt(selectedDesignationId, 10);
        // Find the selected designation data
        const selectedDesignation = data.find((item) => item.designation_id === selectedDesignationIdAsInt)
        if (selectedDesignation) {
          // Set the formData with the selected designation data
          setFormData(selectedDesignation);
        }
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, [selectedDesignationId]);

  return (
    <div id="global-background">
      <NavBarAd />
      <div className="container" style={{ marginTop: '9%' }}>
        <div className="container">
          <div className="form-container" id="addcomform">
            <div className="row">
              <div className="col-md-3">
                <h2 className="form-title">
                  <strong>Edit Designation</strong>
                </h2>
              </div>
              <div className="col-md-9">
                <form id="insideBox">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="designationId"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Designation ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="designation_id"
                          value={formData.designation_id}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="designationName"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Designation Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="designation_name"
                          value={formData.designation_name}
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
                          <p>Designation has been Added successfully</p>
                          <Link to="/admin/EmpModifyDesignation">
                            <Button
                              id="popupok"
                              variant="warning"
                              onClick={handlePopupClose}
                            >
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

export default EmpAddDesignation;
