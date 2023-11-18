import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function TravelApprovalRejection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');
  
  const [data, setData] = useState([]);
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const approverLevelId = localStorage.getItem('approverLevelId');

  useEffect(() => {
    axios
      .post('http://localhost:3002/travel_approve_reject', {
        uid: localStorage.getItem('userid'),
        approverLevelId,
      })
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching approve/reject data:', error);
      });
  }, []);

  const filteredData = Array.isArray(data)
  ? data.filter((item) => {
      if (selectedStatus === '') {
        return true; // Show all items when nothing is selected
      } else if (selectedStatus === 'Approved' && item.status.includes('Approved')) {
        return true; // Show items with status containing "Approved"
      } else if (selectedStatus === 'Rejected' && item.status === 'Rejected') {
        return true; // Show items with status exactly "Rejected"
      }
      return false; // Exclude items that don't match the selected criteria
    })
  : [];


  const currentData = filteredData && filteredData.length >0 ? filteredData.slice(startIndex, endIndex) : [];

  return (
    <div id="global-background">
      <NavBar />
      <div id="travelContainer">
        <div id="travelRow">
          <div id="travelrequestFilter" className="col-md-3">
            <select
              className="form-select mb-2"
              aria-label="Status"
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div id="travelrequestBackground">
          <table id="travelrequestTable" className="table table-border">
            <thead className="thead-dark">
              <tr>
                <th id="tableStart">Trip Number</th>
                <th>Employee ID</th>
                <th id="tableEnd">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.trip_id}>
                  <td id="travelrequestTdFirstChild">{item.trip_id}</td>
                  <td id="travelrequestTd">{item.employee_id}</td>
                  <td id="travelrequestTd">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination className="justify-content-center ">
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
            <Pagination.Last onClick={() => handlePageChange(Math.ceil(data.length / itemsPerPage))} />
          </Pagination>
        </div>
        <form>
            <Link to="/combined">
              <button type="button" className="btn btn-warning" id="submit1">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
              </button>
            </Link>
          </form>
        
      </div>
    </div>
  );
}

export default TravelApprovalRejection;
