import React, { useState, useEffect } from 'react';
import './Companydetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faArrowRight,
  faArrowLeft,
  faCheckCircle,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import NavBarAd from '../NavBarAd';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const EmpModifyCompany = () => {
  const [companyData, setCompanyData] = useState(null);
  const [formData, setFormData] = useState({
    showPopup: false,
    company_id: '',
    company_name: '',
    company_mail_id: '',
    company_address: '',
    isActive: '',
    company_logo: '',
  });
  const handlePopupClose = () => {
    setFormData({ ...formData, showPopup: false });
  };

  useEffect(() => {
    // Fetch company data from your API
    axios
      .post('http://localhost:3002/viewCompanyData', {
        userId: localStorage.getItem('userid'),
      })
      .then((response) => {
        const data = response.data['SELECT * FROM company_table WHERE id = ?'];
        console.log(data[0]);
        setCompanyData(data[0]);
        setFormData(data[0]);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:3002/updateCompany', formData)
      .then((response) => {
        // Handle success
        setFormData({ ...formData, showPopup: true });
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error updating company data:', error);
      });
  };

  return (
    <div id="global-background">
      <NavBarAd />
      <div className="container" style={{ marginTop: '9%' }}>
        <div className="container">
          <div className="form-container" id="addcomform">
            <div className="row">
              <div className="col-md-3">
                <h2 className="form-title">
                  <strong>Company Details</strong>
                </h2>
              </div>
              <div className="col-md-9">
                <form id="insideBox">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="addcomId"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Company ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="company_id"
                          value={formData.company_id}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="addcomname"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="addempnum"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Company Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addemployee"
                          name="company_address"
                          value={formData.company_address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="addcommail"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Company Mail Id
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addemployee"
                          name="company_mail_id"
                          value={formData.company_mail_id}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="addcomup"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Company logo
                        </label>
                        <input
                          type="file"
                          id="addcomuploadFile"
                          name="company_logo"
                          value={formData.company_logo}
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
                        <select
                          className="form-select"
                          id="dropdown"
                          name="isActive"
                          value={formData.isActive}
                          onChange={handleInputChange}
                        >
                          <option value="YES">YES</option>
                          <option value="NO">NO</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6"></div>
                    <div className="mb-3">
                      <button
                        type="button"
                        className="btn btn-warning"
                        id="addsubmitcom"
                        onClick={handleSubmit}
                      >
                        Submit
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="mr-2"
                          style={{ marginLeft: '5px', marginTop: '0px' }}
                        />
                      </button>
                      <Link to="/admin/EmpHistory">
                        <button
                          type="button"
                          className="btn btn-warning"
                          id="addsubmitcom"
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
                {formData.showPopup && (
                  <div className="popup-containerp">
                    <Modal
                      style={{ backgroundColor: 'none' }}
                      show={formData.showPopup}
                      onHide={handlePopupClose}
                      dialogClassName="modal-0w"
                    >
                      <Modal.Body>
                        <div className="popup-contentp">
                          <div className="circle-topp"></div>
                          <div className="circle-bottomp"></div>
                          <div id="iconcirclep">
                            <FontAwesomeIcon icon={faCheck} size="3x" style={{ color: '#FFFFFF' }} />
                          </div>

                          <h2>Updated</h2>
                          <p>Company Details have been updated successfully</p>
                          <Link to="/admin/Emphistory">
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
};

export default EmpModifyCompany;
