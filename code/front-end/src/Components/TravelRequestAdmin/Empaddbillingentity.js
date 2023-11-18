import React, { useState, useEffect } from 'react';
import './Companydetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import NavBarAd from '../NavBarAd';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function EmpAddBillingentity() {
  const [companyData, setCompanyData] = useState([]);
  const [formData, setFormData] = useState({
    billing_entity_id: '', // Modify fields as needed
    billing_entity: '',
    // Add more fields as needed
  });
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const setselectedBillingEntityId = localStorage.getItem('setSelectedBillingEntityId');
 
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
    if (setselectedBillingEntityId) {
      // Selected billing entity exists, so call updateBillingEntity
      const company_id = localStorage.getItem('company_id');
      axios
        .post('http://localhost:3002/updateBillingEntity', { formData, company_id })
        .then((response) => {
          // Handle the response as needed, e.g., show a success message
          setShowPopup(true);
          localStorage.removeItem('setSelectedBillingEntityId');
        })
        .catch((error) => {
          console.error('Error updating billing entity:', error);
        });
    } else {
      // No selected billing entity, call addBillingEntity
      const company_id = localStorage.getItem('company_id');
      console.log("adding");
      console.log(formData);
      axios
        .post('http://localhost:3002/addBillingEntity', { formData, company_id })
        .then((response) => {
          // Handle the response as needed, e.g., show a success message
          setShowPopup(true);
          localStorage.removeItem('setSelectedBillingEntityId');
        })
        .catch((error) => {
          console.error('Error adding billing entity:', error);
        });
    }
  };

  const handleBackClick = () => {
    localStorage.removeItem('setSelectedBillingEntityId');
    navigate(`/admin/EmpModifyBillingentity`);
  };

  // Fetch company data when the component mounts
  useEffect(() => {
    axios
      .post('http://localhost:3002/viewCompanyData', {
        userId: localStorage.getItem('userid'),
      })
      .then((response) => {
        const data = response.data['SELECT * FROM billing_entity_table WHERE company_id = ?'];
        setCompanyData(data);
        console.log(data);
        const selectedBillingEntityIdAsInt = parseInt(setselectedBillingEntityId, 10);
        console.log(setselectedBillingEntityId);
        // Find the selected billing entity data
        const selectedBillingEntity = data.find((item) => item.billing_entity_id === selectedBillingEntityIdAsInt)
        if (selectedBillingEntity) {
          // Set the formData with the selected billing entity data
          setFormData(selectedBillingEntity);
        }
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
      console.log(formData);
  }, [setselectedBillingEntityId]);

  return (
    <div id="global-background">
      <NavBarAd />
      <div className="container" style={{ marginTop: '9%' }}>
        <div className="container">
          <div className="form-container" id="addcomform">
            <div className="row">
              <div className="col-md-3">
                <h2 className="form-title">
                  <strong>Edit Billing Entity</strong>
                </h2>
              </div>
              <div className="col-md-9">
                <form id="insideBox">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="billingEntityId"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Billing Entity ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="billing_entity_id"
                          value={formData.billing_entity_id}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="billingEntityName"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Billing Entity Name
                        </label>
                            <input
                            type="text"
                            className="form-control"
                            id="addcom"
                            name="billing_entity"
                            value={formData.billing_entity}
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
                          <p>Billing Entity has been Added successfully</p>
                          <Link to="/admin/EmpModifyBillingentity">
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

export default EmpAddBillingentity;
