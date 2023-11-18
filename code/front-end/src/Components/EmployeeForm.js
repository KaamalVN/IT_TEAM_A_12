import React, { Component } from 'react';
import './EmployeeForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight,faArrowLeft,faCheck, faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
class EmployeeForm extends Component {
  render() {
    return (
      <div id="global-background">
        <div className="container">
        <div className="form-container">
          <div className="row">
            <div className="col-md-3">
              <h2 className="form-title">Employee Details</h2>
            </div>
            <div className="col-md-9">
            <form id="insideBox"> 
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="employeeId" id="emplabel" className="form-label d-flex align-items-start">Employee ID</label>
                      <input type="text" className="form-control" id="employeeId" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="employeeName" id="emplabel" className="form-label d-flex align-items-start">Employee Name</label>
                      <input type="text" className="form-control" id="employeeId" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="employeeName" id="emplabel" className="form-label d-flex align-items-start">Employee Name</label>
                      <input type="text" className="form-control" id="employeeId" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="dropdown1" id="emplabel" className="form-label d-flex align-items-start">Dropdown 1</label>
                      <select className="form-select" id="employeeId">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="email" id="emplabel" className="form-label d-flex align-items-start">Email</label>
                      <input type="email" className="form-control" id="employeeId" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="number" id="emplabel" className="form-label d-flex align-items-start">Number</label>
                      <input type="text" className="form-control" id="employeeId" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="number" id="emplabel" className="form-label d-flex align-items-start">Number</label>
                      <input type="text" className="form-control" id="employeeId" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="dropdown1" id="emplabel" className="form-label d-flex align-items-start">Dropdown 1</label>
                      <select className="form-select" id="employeeId">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <Link to="/user/details">
                    <button type="submit" className="btn btn-warning" id="submitemp">Next 
                <FontAwesomeIcon icon={faArrowRight} className="mr-2" /> 
              </button>
              </Link>
              <button type="submit" className="btn " id="editemp">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
              </button>
                    </div>
                  </div>
                </div>
                {/* Other form fields */}
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

 export default EmployeeForm;
