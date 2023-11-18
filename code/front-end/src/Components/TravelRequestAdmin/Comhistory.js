import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Comhistory.css';
import NavBarCom from '../NavBarCom';
import axios from 'axios'; // Import axios for making API requests

function Comhistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [expandedRows, setExpandedRows] = useState({});
  const [companyData, setCompanyData] = useState([]); // State to store company data

  // Function to fetch company data from the backend
  const fetchCompanyData = () => {
    axios.get('http://localhost:3002/getCompany') // Replace with your backend API endpoint
      .then((response) => {
        setCompanyData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  };

  useEffect(() => {
    fetchCompanyData(); // Fetch company data when the component mounts
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const toggleRowExpansion = (companyId) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [companyId]: !prevExpandedRows[companyId],
    }));
  };

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredData = companyData
  .filter((item) => {
    // If company name is entered in the input, check if it matches the item's company name
    if (selectedStatus) {
      return item.company_name.toLowerCase().includes(selectedStatus.toLowerCase());
    }
    return true; // Return true for all items if company name is not entered
  });

  const currentData = filteredData && filteredData.length >0 ? filteredData.slice(startIndex, endIndex) : [];

  return (
    <div id="global-background">
      <NavBarCom/>
      <div id="comHistoryContainer">
        <div id="comHistoryRow" className="d-flex justify-content-end">
          <div id="comHistoryFilter" className="col-md-3">
            <input
              type="text"
              className="form-control mb-2" 
              aria-label="Company Name"
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              placeholder="Search Company Name"
            />
          </div>
          <div id="comHistoryFilter" className="col-md-3">
            <Link to="/admin/addCompany">
              <button className="btn btn-warning mb-2">Add Company</button>
            </Link>
          </div>
        </div>
        <div id="comHistoryBackground">
          <table id="comHistoryTable" className="table table_border">
            <thead className="thead-dark">
              <tr>
                <th id='tableStart'>COMPANY ID</th>
                <th>COMPANY NAME</th>
                <th>ADMIN NAME</th>
                <th>ADMIN EMAIL</th>
                <th id='tableEnd'>IS ACTIVE</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <React.Fragment key={item.company_id}>
                  <tr key={item.company_id}>
                    <td id="comHistoryTdFirstChild">
                      {item.company_id}
                    </td>
                    <td id="comHistoryTd">
                      {item.company_name}
                    </td>
                    <td id="comHistoryTd">
                      {item.admin_name}
                    </td>
                    <td id="comHistoryTd">{item.admin_email}</td>
                    <td id="comHistoryTd">{item.is_active === 0 ? 'Active' : 'Inactive'}</td>
                    <td id="comHistoryTdLastChild">
                      {/* Add a button or action here for more details */}
                    </td>
                  </tr>
                  {expandedRows[item.company_id] && (
                    <tr id="more_details_row">
                      <td colSpan="5">
                        More Details for Company ID: {item.company_id}
                      </td>
                    </tr>
                  )}
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
              onClick={() => handlePageChange(Math.ceil(companyData.length / itemsPerPage))}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Comhistory;
