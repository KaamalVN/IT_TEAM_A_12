import React, { useState, useEffect } from 'react';
import './Companydetails.css'; // Create CompanyAdditional.css for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import NavBarCom from '../NavBarCom';
import { faArrowRight, faArrowLeft, faX } from '@fortawesome/free-solid-svg-icons';

function CompanyAdditional() {
  const [additionalData, setAdditionalData] = useState({
    designationCount: 0, // Initialize with 0
    designationLevels: [], // Initialize as an empty array
    approverCount: 0, // Initialize with 0
    approverLevels: [], // Initialize as an empty array
    departmentCount: 0, // Initialize with 0
    departmentNames: [], // Initialize as an empty array
  });

  const [designationLevelInput, setDesignationLevelInput] = useState('');
  const [approverLevelInput, setApproverLevelInput] = useState('');
  const [errorDesignationLevel, setErrorDesignationLevel] = useState('');
  const [errorApproverLevel, setErrorApproverLevel] = useState('');
  const [departmentNameInput, setDepartmentNameInput] = useState(''); // Define the state variable
  const [errorDepartmentName, setErrorDepartmentName] = useState(''); // Define the state variable

const handleDesignationLevelEnter = (e) => {
  if (e.key === 'Enter') {
    if (additionalData.designationLevels.length < additionalData.designationCount) {
      setAdditionalData({
        ...additionalData,
        designationLevels: [...additionalData.designationLevels, designationLevelInput],
      });
      setDesignationLevelInput('');
      setErrorDesignationLevel('');
    } else {
      // Automatically increase the designationCount by 1
      setAdditionalData({
        ...additionalData,
        designationCount: parseInt(additionalData.designationCount, 10) + 1,
        designationLevels: [...additionalData.designationLevels, designationLevelInput],
      });
      setDesignationLevelInput('');
      setErrorDesignationLevel('');
    }
  }
};

const handleApproverLevelEnter = (e) => {
  if (e.key === 'Enter') {
    if (additionalData.approverLevels.length < additionalData.approverCount) {
      setAdditionalData({
        ...additionalData,
        approverLevels: [...additionalData.approverLevels, approverLevelInput],
      });
      setApproverLevelInput('');
      setErrorApproverLevel('');
    } else {
      // Automatically increase the approverCount by 1
      setAdditionalData({
        ...additionalData,
        approverCount: parseInt(additionalData.approverCount, 10) + 1,
        approverLevels: [...additionalData.approverLevels, approverLevelInput],
      });
      setApproverLevelInput('');
      setErrorApproverLevel('');
    }
  }
};

const handleDepartmentNameEnter = (e) => {
  if (e.key === 'Enter') {
    if (additionalData.departmentNames.length < additionalData.departmentCount) {
      setAdditionalData({
        ...additionalData,
        departmentNames: [...additionalData.departmentNames, departmentNameInput],
      });
      setDepartmentNameInput('');
      setErrorDepartmentName('');
    } else {
      // Automatically increase the departmentCount by 1
      setAdditionalData({
        ...additionalData,
        departmentCount: parseInt(additionalData.departmentCount, 10) + 1,
        departmentNames: [...additionalData.departmentNames, departmentNameInput],
      });
      setDepartmentNameInput('');
      setErrorDepartmentName('');
    }
  }
};

const handleRemoveDesignation = (index) => {
  const updatedDesignationLevels = [...additionalData.designationLevels];
  updatedDesignationLevels.splice(index, 1);
  const newDesignationCount = Math.max(additionalData.designationCount - 1, 0);
  setAdditionalData({
    ...additionalData,
    designationLevels: updatedDesignationLevels,
    designationCount: newDesignationCount,
  });
};

const handleRemoveApprover = (index) => {
  const updatedApproverLevels = [...additionalData.approverLevels];
  updatedApproverLevels.splice(index, 1);
  const newApproverCount = Math.max(additionalData.approverCount - 1, 0);
  setAdditionalData({
    ...additionalData,
    approverLevels: updatedApproverLevels,
    approverCount: newApproverCount,
  });
};

const handleRemoveDepartment = (index) => {
  const updatedDepartmentNames = [...additionalData.departmentNames];
  updatedDepartmentNames.splice(index, 1);
  const newDepartmentCount = Math.max(additionalData.departmentCount - 1, 0);
  setAdditionalData({
    ...additionalData,
    departmentNames: updatedDepartmentNames,
    departmentCount: newDepartmentCount,
  });
};

  const saveToLocalStorage = () => {
    localStorage.setItem('additionalData', JSON.stringify(additionalData));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('additionalData'));
    if (storedData) {
      setAdditionalData(storedData);
    }
  }, []);

  return (
    <div id="global-background">
      <NavBarCom />
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
            <div className="circle yellow">
              <div className="line yellow"></div>
              2
            </div>
            <h3 className="heading">Additional Details</h3>
          </div>
          <div className="circle-heading-container">
            <div className="circle last-circle">3</div>
            <h3 className="heading">Admin</h3>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="form-container" id="addcomform">
          <div className="row">
            <div className="col-md-3">
              <h2 className="form-title">
                <strong>Additional<br />Information</strong>
              </h2>
            </div>
            <div className="col-md-9">
              <form id="insideBox">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="designationLevelInput" className="form-label d-flex align-items-start">
                        Designation Level
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addcom"
                        name="designationLevelInput"
                        placeholder='Enter the Designation Levels'
                        value={designationLevelInput}
                        onChange={(e) => setDesignationLevelInput(e.target.value)}
                        onKeyPress={handleDesignationLevelEnter}
                      />
                      <span style={{ color: 'red' }}>{errorDesignationLevel}</span>
                    </div>
                    {additionalData.designationLevels.length > 0 && (
                      <ul>
                        {additionalData.designationLevels.map((value, index) => (
                          <li key={index}>
                            {value}
                            <button
                              type="button"
                              className="btn btn-danger btn-sm ml-4"
                              onClick={() => handleRemoveDesignation(index)}
                            >
                              <FontAwesomeIcon icon={faX}/>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="approverLevelInput" className="form-label d-flex align-items-start">
                        Approver Level
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addcom"
                        name="approverLevelInput"
                        placeholder='Enter the Approver Levels'
                        value={approverLevelInput}
                        onChange={(e) => setApproverLevelInput(e.target.value)}
                        onKeyPress={handleApproverLevelEnter}
                      />
                      <span style={{ color: 'red' }}>{errorApproverLevel}</span>
                    </div>
                    {additionalData.approverLevels.length > 0 && (
                      <ul>
                        {additionalData.approverLevels.map((value, index) => (
                          <li key={index}>
                            {value}
                            <button
                              type="button"
                              className="btn btn-danger btn-sm ml-2"
                              onClick={() => handleRemoveApprover(index)}
                            >
                               <FontAwesomeIcon icon={faX}/>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="departmentNameInput" className="form-label d-flex align-items-start">
                        Department Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addcom"
                        name="departmentNameInput"
                        placeholder='Enter the Department Names'
                        value={departmentNameInput}
                        onChange={(e) => setDepartmentNameInput(e.target.value)}
                        onKeyPress={handleDepartmentNameEnter}
                      />
                      <span style={{ color: 'red' }}>{errorDepartmentName}</span>
                    </div>
                    {additionalData.departmentNames.length > 0 && (
                      <ul>
                        {additionalData.departmentNames.map((value, index) => (
                          <li key={index}>
                            {value}
                            <button
                              type="button"
                              className="btn btn-danger btn-sm ml-2"
                              onClick={() => handleRemoveDepartment(index)}
                            >
                               <FontAwesomeIcon icon={faX}/>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mb-3">
                    <Link to="/admin/addCompanypg2">
                      <button
                        type="button"
                        className="btn btn-warning"
                        id="addsubmitcom"
                        onClick={saveToLocalStorage}
                      >
                        Next
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="mr-2"
                          style={{ marginLeft: '5px', marginTop: '0px' }}
                        />
                      </button>
                    </Link>
                    <Link to="/admin/addCompany">
                      <button
                        type="button"
                        className="btn btn-warning"
                        id="addsubmitcom"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyAdditional;