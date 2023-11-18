import React, { useState,useEffect } from 'react';
import './Companydetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBarAd from '../NavBarAd';
import { Link, useNavigate } from 'react-router-dom';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function EmpAddPurposeofvisit() {
    const [companyData, setCompanyData] = useState([]);
  const [formData, setFormData] = useState({
    purpose_of_visit_id: '', // Modify fields as needed
    purpose_of_visit: '',
    // Add more fields as needed
  });
  const selectedPurposeOfVisitId=localStorage.getItem('selectedPurposeOfVisitId');
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

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
    const company_id = localStorage.getItem('company_id');

    if (selectedPurposeOfVisitId) {
      // Selected purpose of visit exists, so call updatePurposeOfVisit
      axios
        .post('http://localhost:3002/updatePurposeOfVisit', { formData, company_id })
        .then((response) => {
          // Handle the response as needed, e.g., show a success message
          localStorage.removeItem('selectedPurposeOfVisitId');
          setShowPopup(true);
        })
        .catch((error) => {
          console.error('Error updating purpose of visit:', error);
        });
    } else {
      // No selected purpose of visit, call addPurposeOfVisit
      axios
        .post('http://localhost:3002/addPurposeOfVisit', { formData, company_id })
        .then((response) => {
          // Handle the response as needed, e.g., show a success message
          localStorage.removeItem('selectedPurposeOfVisitId');

          setShowPopup(true);
        })
        .catch((error) => {
          console.error('Error adding purpose of visit:', error);
        });
    }
  };
  const handleBackClick = () => {
    localStorage.removeItem('selectedPurposeOfVisitId');
    navigate('/admin/EmpModifyPurposeofvisit');
  };

  useEffect(() => {
    axios
      .post('http://localhost:3002/viewCompanyData', {
        userId: localStorage.getItem('userid'),
      })
      .then((response) => {
        const data = response.data['SELECT * FROM purpose_of_visit_table WHERE company_id = ?'];
        setCompanyData(data);
        
        const selectedPurposeOfVisitIdAsInt = parseInt(selectedPurposeOfVisitId, 10);
        console.log('selectedPurposeOfVisitIdAsInt',selectedPurposeOfVisitId);
        // Find the selected purpose of visit data
        const selectedPurposeOfVisit = data.find((item) => item.purpose_of_visit_id === selectedPurposeOfVisitIdAsInt)
        if (selectedPurposeOfVisit) {
          // Set the formData with the selected purpose of visit data
          setFormData(selectedPurposeOfVisit);
        }
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, [selectedPurposeOfVisitId]);
  
  return (
    <div id="global-background">
      <NavBarAd />
      <div className="container" style={{ marginTop: '9%' }}>
        <div className="container">
          <div className="form-container" id="addcomform">
            <div className="row">
              <div className="col-md-3">
                <h2 className="form-title">
                  <strong>Add Purpose of Visit</strong>
                </h2>
              </div>
              <div className="col-md-9">
                <form id="insideBox">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="purposeOfVisitId"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Purpose of Visit ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="purpose_of_visit_id"
                          value={formData.purpose_of_visit_id}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="purposeOfVisitName"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Purpose of Visit Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="purpose_of_visit"
                          value={formData.purpose_of_visit}
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
                          <p>Purpose of Visit has been update successfully</p>
                          <Link to="/admin/EmpModifyPurposeofvisit">
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

export default EmpAddPurposeofvisit;
