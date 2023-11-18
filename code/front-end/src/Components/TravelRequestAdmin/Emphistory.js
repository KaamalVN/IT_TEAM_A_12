import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Emphistory.css';
import NavBarAd from '../NavBarAd';
import axios from 'axios';

function Emphistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [data, setData] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);


useEffect(() => {
  // Fetch department data from your API
  axios
    .post('http://localhost:3002/viewCompanyData', {
      userId: localStorage.getItem('userid'),
    })
    .then((response) => {
      const data1 = response.data['SELECT * FROM department_table WHERE company_id = ?'];
      const departmentOptions = data1.map((department) => department.department_name);
      setDepartmentOptions(departmentOptions);
      const data2 = response.data['SELECT * FROM designation_table WHERE company_id = ?'];
      const designationOptions = data2.map((designation) => designation.designation_name);
      setDesignationOptions(designationOptions);
      console.log(departmentOptions);
      console.log(designationOptions);
    })
    .catch((error) => {
      console.error('Error fetching department data:', error);
    });
}, []);

  useEffect(() => {
    axios.post('http://localhost:3002/getemployees',{
      company_id:localStorage.getItem('company_id'),
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };

  const handleDesignationChange = (value) => {
    setSelectedDesignation(value);
  };


  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredData = data
    .filter((item) => selectedDepartment === '' || item.department_name === selectedDepartment)
    .filter((item) => selectedDesignation === '' || item.designation_name === selectedDesignation)

  const currentData = filteredData && filteredData.length >0 ? filteredData.slice(startIndex, endIndex) : [];

  return (
    <div id="global-background">
      <NavBarAd />
      <div id="travelContainer">
      <div id="travelRow">
      {/* Filter controls */}
      <div id="travelrequestFilter" style={{ marginLeft: '10%' }} className="col-md-3">
        <select
          className="form-select mb-2"
          aria-label="Department"
          value={selectedDepartment}
          onChange={(e) => handleDepartmentChange(e.target.value)}
        >
          <option value="">Select Department</option> {/* Add a default option */}
          {departmentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div id="travelrequestFilter" className="col-md-3">
        <select
          className="form-select mb-2"
          aria-label="Designation"
          value={selectedDesignation}
          onChange={(e) => handleDesignationChange(e.target.value)}
        >
          <option value="">Select Designation</option> {/* Add a default option */}
          {designationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div id="travelrequestFilter" className="col-md-3">
        <Link to="/role">
          <button className="btn btn-warning mb-2">Add Employee</button>
        </Link>
      </div>
    </div>

        <div id="travelrequestBackground">
          <table id="travelrequestTable" className="table table_border">
            <thead className="thead-dark">
              <tr>
                <th id='tableStart'>EMP ID</th>
                <th>EMP MAIL</th>
                <th>EMP NAME</th>
                <th>APPROVER LEVEL</th>
                <th>DESIGNATION</th>
                <th>DEPARTMENT</th>
                <th id='tableEnd'>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <React.Fragment key={item.trip_id}>
                  <tr key={item.trip_id}>
                    <td id="travelrequestTdFirstChild">{item.employee_id}</td>
                    <td id="travelrequestTd">{item.mail}</td>
                    <td id="travelrequestTd">{item.employee_name}</td>
                    <td id="travelrequestTd">{item.approver_level_id}</td>
                    <td id="travelrequestTd">{item.designation_name}</td>
                    <td id="travelrequestTd">{item.department_name}</td>
                    <td id="travelrequestTdLastChild">
                    <div  className="d-flex align-items-center action_buttons">
                    <Link to='/admin/Empmodify'>
                    <button id="travelrequestView" className="btn btn-sm btn-info">Edit</button>
                    </Link>
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
              onClick={() => handlePageChange(Math.ceil(filteredData.length / itemsPerPage))}
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Emphistory;
