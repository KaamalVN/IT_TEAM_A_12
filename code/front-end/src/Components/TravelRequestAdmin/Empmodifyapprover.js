import React, { useState, useEffect } from 'react';
import './Companydetails.css';
import NavBarAd from '../NavBarAd';
import { Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function EmpModifyApprover() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate(); // Initialize navigate from react-router-dom
  const [showPopup, setShowPopup] = useState(false); // State for the confirmation popup
  const [selectedApproverId, setSelectedApproverId] = useState(null); // State to store the selected approver ID

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
        const data = response.data['SELECT * FROM approver_table WHERE company_id = ?'];
        setFormData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, []);

  // Handle Edit button click
  const handleEdit = (approverLevelId) => {
    // Store the selected approver_level_id in local storage
    localStorage.setItem('selectedApproverLevelId', approverLevelId);

    // Redirect to the edit page (replace '/admin/Empaddapprover' with the actual edit page route)
    navigate(`/admin/Empaddapprover`);
  };

  const handleRemove = (approverLevelId) => {
    // Store the selected approver ID in the state and show the confirmation popup
    setSelectedApproverId(approverLevelId);
    setShowPopup(true);
  };
  const confirmRemove = () => {
    // Logic to remove the selected approver, send a request to the server to remove it
    const company_id=localStorage.getItem('company_id');
    axios
      .post('http://localhost:3002/removeApprover', {
        approverId: selectedApproverId,
        company_id:company_id,
      })
      .then((responses) => {
        // If the removal was successful, you can update the UI as needed
        navigate(`/admin/Empaddapprover`);
        console.log(responses.data);
        // You can also refresh the data by fetching it again, but I'll leave that to you
      })
      .catch((error) => {
        console.error('Error removing approver:', error);
      });

    // Close the popup
    setShowPopup(false);
  };

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = formData.slice(startIndex, endIndex);

  return (
    <div id="global-background">
      <NavBarAd />
      <div className="container">
        <div id="travelRow">
          <div id="travelrequestFilter" className="col-md-3" style={{ marginLeft: '85%' }}>
            <Link to="/admin/Empaddapprover">
              <button className="btn btn-warning mb-2">Add Approver</button>
            </Link>
          </div>
        </div>
        <div id="travelrequestBackground" style={{ marginTop: '13%' }}>
          <table id="travelrequestTable" className="table table_border">
            <thead className="thead-dark">
              <tr>
                <th id="tableStart">APPROVER ID</th>
                <th>APPROVER LEVEL</th>
                <th id="tableEnd">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <React.Fragment key={item.id}>
                  <tr key={item.id}>
                    <td id="travelrequestTdFirstChild">{item.id}</td>
                    <td id="travelrequestTd">{item.approver_level_id}</td>
                    <td id="travelrequestTdLastChild">
                      <div className="d-flex align-items-center action_buttons">
                        <button
                          id="travelrequestView"
                          className="btn btn-sm btn-info"
                          onClick={() => handleEdit(item.approver_level_id)}
                        >
                          Edit
                        </button>
                        <button
                          id="travelrequestView"
                          className="btn btn-sm btn-warning"
                          onClick={() => handleRemove(item.approver_level_id)}
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
                <h2>Remove Approver</h2>
                <p>Are you sure you want to remove this approver?</p>
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

export default EmpModifyApprover;
