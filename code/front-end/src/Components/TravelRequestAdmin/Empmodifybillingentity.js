import React, { useState, useEffect } from 'react';
import './Companydetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBarAd from '../NavBarAd';
import { Pagination } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

function EmpModifyBillingentity() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBillingEntityId, setSelectedBillingEntityId] = useState(null);
  const navigate = useNavigate(); // Initialize navigate from react-router-dom
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Fetch billing entity data from your API
    axios
      .post('http://localhost:3002/viewCompanyData', {
        userId: localStorage.getItem('userid'),
      })
      .then((response) => {
        const data = response.data['SELECT * FROM billing_entity_table WHERE company_id = ?'];
        setFormData(data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching billing entity data:', error);
      });
  }, []);

  const handleEdit = (billingEntityId) => {
    localStorage.setItem('setSelectedBillingEntityId', billingEntityId);
    navigate(`/admin/Empaddbillingentity`);
  };

  const handleRemove = (billingEntityId) => {
    // Set the selected billing entity ID to show in the confirmation popup
    setSelectedBillingEntityId(billingEntityId);
    // Show the confirmation popup
    setShowPopup(true);
  };

  const confirmRemove = () => {
    const company_id = localStorage.getItem('company_id');
    console.log(selectedBillingEntityId);
    axios
      .post('http://localhost:3002/removeBillingEntity', {
        billing_entity_id: selectedBillingEntityId,
        company_id: company_id,
      })
      .then((response) => {
        navigate('/admin/Empmodifybillingentity');
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error removing billing entity:', error);
      });
  
    // Close the popup
    setShowPopup(false);
  };
  

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = formData && formData.length > 0 ? formData.slice(startIndex, endIndex) : [];

  return (
    <div id="global-background">
      <NavBarAd />
      <div className="container">
        <div id="travelRow">
          <div id="travelrequestFilter" className="col-md-3" style={{ marginLeft: '85%' }}>
            <Link to="/admin/EmpAddBillingentity">
              <button className="btn btn-warning mb-2">Add Billing Entity</button>
            </Link>
          </div>
        </div>
        <div id="travelrequestBackground" style={{ marginTop: '13%' }}>
          <table id="travelrequestTable" className="table table_border">
            <thead className="thead-dark">
              <tr>
                <th id="tableStart">BILLING ENTITY ID</th>
                <th>BILLING ENTITY</th>
                <th id="tableEnd">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <React.Fragment key={item.id}>
                  <tr key={item.id}>
                    <td id="travelrequestTdFirstChild">{item.billing_entity_id}</td>
                    <td id="travelrequestTd">{item.billing_entity}</td>
                    <td id="travelrequestTdLastChild">
                      <div className="d-flex align-items-center action_buttons">
                        <button
                          id="travelrequestView"
                          className="btn btn-sm btn-info"
                          onClick={() => handleEdit(item.billing_entity_id)}
                        >
                          Edit
                        </button>
                        <button
                          id="travelrequestView"
                          className="btn btn-sm btn-warning"
                          onClick={() => handleRemove(item.billing_entity_id)}
                        >
                          Remove
                        </button>
                        <button id="travelrequestView" className="btn btn-sm btn-info">
                          Reorder
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <Pagination className="justify-content-center">
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentData.length < itemsPerPage}
            />
            <Pagination.Last
              onClick={() => handlePageChange(Math.ceil(currentData.length / itemsPerPage))}
            />
          </Pagination>
        </div>
      </div>
      {showPopup && (
        <div className="popup-containerp">
          <Modal
            style={{ backgroundColor: 'none' }}
            show={showPopup}
            onHide={() => setShowPopup(false)}
            dialogClassName="modal-0w"
          >
            <Modal.Body>
              <div className="popup-contentp">
                <div className="circle-topp"></div>
                <div className="circle-bottomp"></div>
                <div id="iconcirclep">
                  <FontAwesomeIcon icon={faCheckCircle} size="3x" style={{ color: '#FFFFFF' }} />
                </div>
                <h2>Remove Billing Entity</h2>
                <p>Are you sure you want to remove this billing entity?</p>
                <Button id="popupok" variant="warning" onClick={confirmRemove}>
                  Yes
                </Button>
                <Button id="popupok" variant="danger" onClick={() => setShowPopup(false)}>
                  No
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default EmpModifyBillingentity;
