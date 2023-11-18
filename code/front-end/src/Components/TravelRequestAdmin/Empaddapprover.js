import React, { useState, useEffect } from 'react';
import './Companydetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link ,useNavigate} from 'react-router-dom';
import { faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import NavBarAd from '../NavBarAd';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function EmpAddApprover() {
  const [companyData, setCompanyData] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    approver_level_id: '',
    // Add more fields as needed
  });
  const[approverId,SetapproverId]=useState('');
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const selectedApproverId = localStorage.getItem('selectedApproverLevelId');

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
    console.log("submit")
    if (selectedApproverId) {
      // Selected approver exists, so call updateApprover
      const company_id=localStorage.getItem('company_id');
//   setFormData(company_id);
    axios
      .post('http://localhost:3002/updateApporver',{ formData,company_id})
      .then((response) => {
        // Handle the response as needed, e.g., show a success message
        setShowPopup(true);
        localStorage.removeItem('selectedApproverLevelId');
      })
      .catch((error) => {
        console.error('Error updating approver:', error);
      });
    } else {
      // No selected approver, call addApprover
      console.log(formData);
      const company_id = localStorage.getItem('company_id');
      axios
        .post('http://localhost:3002/addApprover', {formData,company_id})
        .then((response) => {
          // Handle the response as needed, e.g., show a success message
          setShowPopup(true);
          localStorage.removeItem('selectedApproverLevelId');
        })
        .catch((error) => {
          console.error('Error adding approver:', error);
        });
    }
  };
  
  const handleBackClick=()=>{
    localStorage.removeItem('selectedApproverLevelId');
    navigate(`/admin/Empmodifyapprover`);
  };
  // Fetch company data when the component mounts
  useEffect(() => {
    axios
      .post('http://localhost:3002/viewCompanyData', {
        userId: localStorage.getItem('userid'),
      })
      .then((response) => {
        const data = response.data['SELECT * FROM approver_table WHERE company_id = ?'];
        setCompanyData(data);
        console.log(data);
        // Find the selected approver data
        const selectedApprover = data.find(item => item.approver_level_id === selectedApproverId);

        if (selectedApprover) {
          // Set the formData with the selected approver data
          setFormData(selectedApprover);
        }
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, [selectedApproverId]);

  return (
    <div id="global-background">
      <NavBarAd />
      <div className="container" style={{ marginTop: '9%' }}>
        <div className="container">
          <div className="form-container" id="addcomform">
            <div className="row">
              <div className="col-md-3">
                <h2 className="form-title">
                  <strong>Edit Approver</strong>
                </h2>
              </div>
              <div className="col-md-9">
                <form id="insideBox">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="approverName"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Approver ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="id"
                          value={formData.id}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="approverEmail"
                          id="addcomlabel"
                          className="form-label d-flex align-items-start"
                        >
                          Approver Level
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="addcom"
                          name="approver_level_id"
                          value={formData.approver_level_id}
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
                          <p>Approver has been Added successfully</p>
                          <Link to="/admin/Empmodifyapprover">
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

export default EmpAddApprover;

