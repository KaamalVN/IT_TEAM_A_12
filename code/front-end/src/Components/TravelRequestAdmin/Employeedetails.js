import React, { useEffect, useState } from 'react';
import './Employeedetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import NavBarAd from '../NavBarAd';
import { Link, useNavigate } from 'react-router-dom';
const Employeedetails = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    employeeMail: '',
    employeeAddress: '',
    employeeMobileNumber: '',
    employeeDepartment: '',
    companyId: localStorage.getItem('company_id'),
    employeeDesignation: '',
    employeeApprover: '',
    employeeDOB: '',
  });
  // Event handler to update state when input values change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [departmentData, setDepartmentData] = useState([]);
  const [designationData, setDesignationData] = useState([]);
  const [approverData, setApproverData] = useState([]);
  useEffect(() => {
    // Fetch department and designation data from /viewCompanyData
    axios
      .post('http://localhost:3002/viewCompanyData', {
        userId: localStorage.getItem('userid'),
      })
      .then((response) => {
        const data = response.data['SELECT * FROM department_table WHERE company_id = ?'];
        console.log(data);
        setDepartmentData(data);
        const data2 = response.data['SELECT * FROM designation_table WHERE company_id = ?'];
        setDesignationData(data2);
        const data3 = response.data['SELECT * FROM approver_table WHERE company_id = ?']
        setApproverData(data3);
        console.log(data2);
        console.log(data3);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });

    const savedData = JSON.parse(localStorage.getItem('employeeDetails'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem('employeeDetails'));
    if(data){
    setFormData(data);
    }
    console.log(formData);
  },[])
  const saveToLocalStorage = () => {
    // Convert formData to a JSON string and store in local storage
    const generatedEmployeeId = (formData.employeeName.substr(0, 2) + formData.employeeDesignation.substr(0,1)+ Math.floor(1000 + Math.random() * 9000)).toLowerCase();
  
    // Update formData with the generated EmployeeId
    const updatedFormData = { ...formData, employeeId: generatedEmployeeId };
    localStorage.setItem('employeeDetails', JSON.stringify(updatedFormData));
  };

  
  return (
    <div id="global-background">
   <NavBarAd />
      <div className="circleController">
        <div className="circle-container">
          <div className="circle-heading-container">
            <div className="circle yellow">
              <div className="line yellow"></div>
              1
            </div>
            <h3 className="heading">Details</h3>
          </div>
          <div className="circle-heading-container">
            <div className="circle last-circle">2</div>
            <h3 className="heading">Proof</h3>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="form-container" id="addempform">
          <div className="row">
            <div className="col-md-3">
              <h2 className="form-title">
                <strong>Employee</strong>
                <br />
                <strong>Details</strong>
              </h2>
            </div>
            <div className="col-md-9">
              <form id="insideBox">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="addemployeename"
                        className="form-label d-flex align-items-start"
                      >
                        Employee Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addemployeename"
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="addempaddress"
                        className="form-label d-flex align-items-start"
                      >
                        Employee Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addempaddress"
                        name="employeeAddress"
                        value={formData.employeeAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="addempnum"
                        className="form-label d-flex align-items-start"
                      >
                        Employee Mobile Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addempnum"
                        name="employeeMobileNumber"
                        value={formData.employeeMobileNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  <div className="mb-3">
                          <label htmlFor="addempdept" className="form-label d-flex align-items-start">
                            Department
                          </label>
                          <select
                            className="form-select"
                            id="addempdept"
                            name="employeeDepartment"
                            value={formData.employeeDepartment}
                            onChange={handleInputChange}
                          >
                            <option value="" disabled>
                              Select a Department
                            </option>
                            {departmentData.map((department) => (
                              <option key={department.id} value={department.department_name}>
                                {department.department_name}
                              </option>
                            ))}
                          </select>
                        </div>

                    <div className="mb-3">
                      <label
                        htmlFor="addempdob"
                        className="form-label d-flex align-items-start"
                      >
                        Employee DOB
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="addempdob"
                        name="employeeDOB"
                        value={formData.employeeDOB}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    

                    <div className="mb-3">
                      <label
                        htmlFor="addemployeename"
                        className="form-label d-flex align-items-start"
                      >
                        Employee Email ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addemployeename"
                        name="employeeMail"
                        value={formData.employeeMail}
                        onChange={handleInputChange}
                      />
                    </div>
                    

                    
                    
                    <div className="mb-3">
                      <label htmlFor="addempdesg" className="form-label d-flex align-items-start">
                        Designation
                      </label>
                      <select
                        className="form-select"
                        id="addempdesg"
                        name="employeeDesignation"
                        value={formData.employeeDesignation}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select a Designation
                        </option>
                        {designationData.map((designation) => (
                          <option key={designation.id} value={designation.designation_name}>
                            {designation.designation_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="addempdesg" className="form-label d-flex align-items-start">
                        Approver Level
                      </label>
                      <select
                        className="form-select"
                        id="addempdesg"
                        name="employeeApprover"
                        value={formData.employeeApprover}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select an Approver Level
                        </option>
                        {approverData.map((approver) => (
                          <option key={approver.id} value={approver.approver_level_id}>
                            {approver.approver_level_id}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                      <div className="mb-3" >
                      <Link to="/admin/addProof">
                        <button
                          type="button"
                          className="btn btn-warning"
                          id="addsubmitemp"    
                          onClick={saveToLocalStorage}                   
                        >
                          Next
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="mr-2"
                            style={{ marginLeft: '5px' }}
                          />
                        </button>
                        </Link>
                        <Link to="/admin/Emphistory">
                          <button
                            type="button"
                            className="btn btn-warning"
                            id="addsubmitcom"
                            style={{ marginTop: '5%' }}
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employeedetails;
 

                  