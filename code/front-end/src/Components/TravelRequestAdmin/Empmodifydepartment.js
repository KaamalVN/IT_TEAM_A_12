import React, { useState, useEffect } from 'react';
import './Companydetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBarAd from '../NavBarAd'; // Import your custom Navbar component
import { Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function EmpModifyDepartment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const navigate = useNavigate(); // Initialize navigate from react-router-dom
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    // Fetch department data from your API
    axios
      .post('http://localhost:3002/viewCompanyData', {
        userId: localStorage.getItem('userid'),
      })
      .then((response) => {
        const data = response.data['SELECT * FROM department_table WHERE company_id = ?'];
        setFormData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching department data:', error);
      });
  }, []);

  // Handle Edit button click
  const handleEdit = (departmentId) => {
    // Store the selected department_id in local storage
    localStorage.setItem('selectedDepartmentId', departmentId);
    // Adjust the route path for editing department
    navigate(`/admin/Empadddepartment`);
  };

  // Handle Remove button click
  const handleRemove = (departmentId) => {
    // Set the selected department ID to show in the confirmation popup
    console.log("deptid",departmentId);
    setSelectedDepartmentId(departmentId);
    // Show the confirmation popup
    setShowPopup(true);
  };

  const confirmRemove = () => {
    // Logic to remove the selected department, send a request to the server to remove it
    const company_id = localStorage.getItem('company_id');
    console.log('Selected Department ID before post request:', selectedDepartmentId);
    axios
      .post('http://localhost:3002/removeDepartment', {
        department_id: selectedDepartmentId,
        company_id: company_id,
      })
      .then((response) => {
        // If the removal was successful, you can update the UI as needed
        navigate(`/admin/Empmodifydepartment`);
        console.log(response.data);
        // You can also refresh the data by fetching it again, but I'll leave that to you
      })
      .catch((error) => {
        console.error('Error removing department:', error);
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
      <NavBarAd /> {/* Use your custom Navbar component */}
      <div className="container">
        <div id="travelRow">
          <div id="travelrequestFilter" className="col-md-3" style={{ marginLeft: '85%' }}>
            <Link to="/admin/Empadddepartment"> {/* Adjust the link path */}
              <button className="btn btn-warning mb-2">Add Department</button>
            </Link>
          </div>
        </div>
        <div id="travelrequestBackground" style={{ marginTop: '13%' }}>
          <table id="travelrequestTable" className="table table_border">
            <thead className="thead-dark">
              <tr>
                <th id="tableStart">DEPARTMENT ID</th>
                <th>DEPARTMENT</th>
                <th>DEPARTMENT MANAGER</th>
                <th id="tableEnd">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <React.Fragment key={item.id}>
                  <tr key={item.id}>
                    <td id="travelrequestTdFirstChild">{item.department_id}</td>
                    <td id="travelrequestTd">{item.department_name}</td>
                    <td id="travelrequestTd">{item.employee_id}</td>
                    <td id="travelrequestTdLastChild">
                      <div className="d-flex align-items-center action_buttons">
                        <button
                          id="travelrequestView"
                          className="btn btn-sm btn-info"
                          onClick={() => handleEdit(item.department_id)}
                        >
                          Edit
                        </button>
                        <button
                          id="travelrequestView"
                          className="btn btn-sm btn-warning"
                          onClick={() => handleRemove(item.department_id)}
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
              onClick={() =>
                handlePageChange(Math.ceil(currentData.length / itemsPerPage))
              }
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
                <h2>Remove Department</h2>
                <p>Are you sure you want to remove this department?</p>
                <Button id="popupok" variant="warning" onClick={confirmRemove}>
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

export default EmpModifyDepartment;
