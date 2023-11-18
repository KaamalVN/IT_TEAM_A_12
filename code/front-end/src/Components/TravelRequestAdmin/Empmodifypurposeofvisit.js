import React, { useState, useEffect } from 'react';
import './Companydetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBarAd from '../NavBarAd';
import { Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function EmpModifyPurposeofvisit() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPurposeOfVisitId, setSelectedPurposeOfVisitId] = useState(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Fetch company data from your API
    axios
      .post('http://localhost:3002/viewCompanyData', {
        userId: localStorage.getItem('userid'),
      })
      .then((response) => {
        const data = response.data['SELECT * FROM purpose_of_visit_table WHERE company_id = ?'];
        setFormData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, []);

  const navigate = useNavigate();

  // Handle Edit button click
  const handleEdit = (purposeOfVisitId) => {
    // Store the selected purposeOfVisitId in local storage
    localStorage.setItem('selectedPurposeOfVisitId', purposeOfVisitId);
    // Redirect to the edit page
    navigate('/admin/Empaddpurposeofvisit');
  };

  // Handle Remove button click
  const handleRemove = (purposeOfVisitId) => {
    // Set the selected purposeOfVisitId to show in the confirmation popup
    setSelectedPurposeOfVisitId(purposeOfVisitId);
    // Show the confirmation popup
    setShowPopup(true);
  };

  const confirmRemove = () => {
    // Logic to remove the selected purpose of visit, send a request to the server to remove it
    const company_id = localStorage.getItem('company_id');
    axios
      .post('http://localhost:3002/removePurposeOfVisit', {
        purpose_of_visit_id: selectedPurposeOfVisitId,
        company_id: company_id,
      })
      .then((response) => {
        // If the removal was successful, you can update the UI as needed
        navigate('/admin/Empmodifypurposeofvisit');
        console.log(response.data);
        // You can also refresh the data by fetching it again, but I'll leave that to you
      })
      .catch((error) => {
        console.error('Error removing purpose of visit:', error);
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
            <Link to="/admin/EmpAddPurposeofvisit">
              <button className="btn btn-warning mb-2">Add Visit Purpose</button>
            </Link>
          </div>
        </div>
        <div id="travelrequestBackground" style={{ marginTop: '13%' }}>
          <table id="travelrequestTable" className="table table_border">
            <thead className="thead-dark">
              <tr>
                <th id="tableStart">VISIT PURPOSE ID</th>
                <th>VISIT PURPOSE</th>
                <th id="tableEnd">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <React.Fragment key={item.id}>
                  <tr key={item.id}>
                    <td id="travelrequestTdFirstChild">{item.purpose_of_visit_id}</td>
                    <td id="travelrequestTd">{item.purpose_of_visit}</td>
                    <td id="travelrequestTdLastChild">
                      <div className="d-flex align-items-center action_buttons">
                        <button
                          id="travelrequestView"
                          className="btn btn-sm btn-info"
                          onClick={() => handleEdit(item.purpose_of_visit_id)}
                        >
                          Edit
                        </button>
                        <button
                          id="travelrequestView"
                          className="btn btn-sm btn-warning"
                          onClick={() => handleRemove(item.purpose_of_visit_id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <Pagination className="justify-content-center ">
            {/* Pagination controls */}
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
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    size="3x"
                    style={{ color: '#FFFFFF' }}
                  />
                </div>
                <h2>Remove Purpose of Visit</h2>
                <p>Are you sure you want to remove this Purpose of Visit?</p>
                <Button
                  id="popupok"
                  variant="warning"
                  onClick={confirmRemove}
                >
                  Yes
                </Button>
                <Button
                  id="popupok"
                  variant="danger"
                  onClick={() => setShowPopup(false)}
                >
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

export default EmpModifyPurposeofvisit;
