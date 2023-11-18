import React, { Component } from 'react';
import './ComPreview.css';
import '../Popup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit,faCheck } from '@fortawesome/free-solid-svg-icons';
import NavBarCom from '../NavBarCom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
export default class ComPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: JSON.parse(localStorage.getItem('companyDetails')),
      adminDetails: JSON.parse(localStorage.getItem('adminDetails')),
      additionalData: JSON.parse(localStorage.getItem('additionalData')),
      show: false,

    };
  }
  onSubmit = async (e) => {
    e.preventDefault();
  
    // Combine the companyDetails, adminDetails, and additionalData
    const formData = {
      ...this.state.companyDetails,
      ...this.state.adminDetails,
      ...this.state.additionalData,
    };
  
    try {
      // First, send data to 'addCompany' endpoint
      const response1 = await axios.post('http://localhost:3002/addCompany', formData);
      console.log('Server Response (addCompany):', response1.data);
  
      // Second, send data to 'insertCompany' endpoint
      const response2 = await axios.post('http://localhost:3002/insertCompany', formData);
      console.log('Server Response (insertCompany):', response2.data);
  
      // Third, send additional data to 'designationapprover' endpoint
      const response3 = await axios.post('http://localhost:3002/designationapprover', formData);
      console.log('Server Response (designationapprover):', response3.data);
  
      // Finally, send data to 'insertCompanyAdmin' endpoint
      const response4 = await axios.post('http://localhost:3002/insertCompanyAdmin', formData);
      console.log('Server Response (insertCompanyAdmin):', response4.data);
  
      // Remove items from local storage
      localStorage.removeItem('companyDetails');
      localStorage.removeItem('adminDetails');
      localStorage.removeItem('additionalData');
  
      // Set the state to show the success modal
      this.setState({ show: true });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    const { companyDetails, adminDetails , additionalData, show} = this.state;
    if(show === true) {
      return (
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Body>
              <div className="popup-content">
                <div className="circlep-top"></div>
                <div className="circlep-bottom"></div>
                <div id="iconcircle">
                  <FontAwesomeIcon icon={faCheck} size="3x" style={{ color: '#FFFFFF' }} />
                </div>
               
                <h2>Company ADDED</h2>
                <h3 >Company ID: {companyDetails.companyId}</h3>
                <p>Company has been Added Successfully!</p>
                <Link to="/admin/CompanyHistory">
                <Button id="popupok"
                    variant="warning"
                  >
                    Ok
                  </Button>
                  </Link>
              </div>
            </Modal.Body>
            </Modal>
      )
    }
   
else{
    return (
      <div id='global-background'>
        <NavBarCom />
        <div className='container'>
          <div className='container' id='Compreviewform'>
            <h5>Preview</h5>
            <form>
              <button type='submit' className='btn btn-warning' id='empsubmit'>
                <FontAwesomeIcon icon={faCheckCircle} className='mr-2' /> Submit
              </button>
              <Link to='/admin/addCompany'>
                <button type='button' className='btn btn-secondary' id='empedit'>
                  <FontAwesomeIcon icon={faEdit} className='mr-2' /> Edit
                </button>
              </Link>
            </form>
            <div id='empadbasicdetailspre'>
              <u>Company Details</u>
            </div>
            <form id='empadbasicprevform'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='mb-3 d-flex align-items-center'>
                    <label
                      htmlFor='comidpreview'
                      id='comidlabelpreview'
                      className='form-label d-flex align-items-start me-4'
                    >
                      Company ID
                    </label>
                    <input
                      type='text'
                      className='form-control text-center'
                      id='comidpreview'
                      value={companyDetails.companyId}
                      disabled
                      name='comidpreview'
                    />
                  </div>
                  <div className='mb-3 d-flex align-items-center'>
                    <label
                      htmlFor='comnamepreview'
                      id='comnamelabelpreview'
                      className='form-label d-flex align-items-start me-4'
                    >
                      Company Name
                    </label>
                    <input
                      type='text'
                      className='form-control text-center'
                      id='comnamepreview'
                      value={companyDetails.companyName}
                      disabled
                      name='comnamepreview'
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='mb-3 d-flex align-items-center'>
                    <label
                      htmlFor='mailidpreview'
                      id='mailidlabelpreview'
                      className='form-label d-flex align-items-start me-4'
                    >
                      Company Mail ID
                    </label>
                    <input
                      type='email'
                      className='form-control text-center'
                      id='mailidpreview'
                      value={companyDetails.companyMail}
                      disabled
                      name='mailidpreview'
                    />
                  </div>
                  <div className='mb-3 d-flex align-items-center'>
                    <label
                      htmlFor='comaddpreview'
                      id='comaddlabelpreview'
                      className='form-label d-flex align-items-start me-4'
                    >
                      Company Address
                    </label>
                    <input
                      type='text'
                      className='form-control text-center'
                      id='comaddpreview'
                      value={companyDetails.companyAddress}
                      disabled
                      name='comaddpreview'
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='mb-3 d-flex align-items-center'>
                    <label
                      htmlFor='comstpreview'
                      id='comstlabelpreview'
                      className='form-label d-flex align-items-start me-4'
                    >
                      State
                    </label>
                    <input
                      type='text'
                      className='form-control text-center'
                      id='comstpreview'
                      value={companyDetails.selectedState}
                      disabled
                      name='comstpreview'
                    />
                  </div>
                  <div className='mb-3 d-flex align-items-center'>
                    <label
                      htmlFor='comstpreview'
                      id='comstlabelpreview'
                      className='form-label d-flex align-items-start me-4'
                    >
                      City
                    </label>
                    <input
                      type='text'
                      className='form-control text-center'
                      id='comstpreview'
                      value={companyDetails.selectedCity}
                      disabled
                      name='comstpreview'
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='mb-3 d-flex align-items-center'>
                    <label
                      htmlFor='comcopreview'
                      id='comcolabelpreview'
                      className='form-label d-flex align-items-start me-4'
                    >
                      Country
                    </label>
                    <input
                      type='text'
                      className='form-control text-center'
                      id='comcopreview'
                      value={companyDetails.selectedCountry}
                      disabled
                      name='comcopreview'
                    />
                  </div>
                </div>
              </div>
            </form>

            <div id='proof'>
              <u>Additional Details</u>
            </div>
            <form id='advanceForm'>
            {Array.isArray(additionalData.designationLevels) && (
              <div className='mb-3 d-flex align-items-center'>
                <label
                  htmlFor='designationLevels'
                  className='form-label d-flex align-items-start me-4'
                >
                  Designation Levels
                </label>
                <input
                  type='text'
                  className='form-control text-center'
                  id='designationLevels'
                  value={additionalData.designationLevels.join(', ')}
                  disabled
                  name='designationLevels'
                />
              </div>
            )}

            {Array.isArray(additionalData.approverLevels) && (
              <div className='mb-3 d-flex align-items-center'>
                <label
                  htmlFor='approverLevels'
                  className='form-label d-flex align-items-start me-4'
                >
                  Approver Levels
                </label>
                <input
                  type='text'
                  className='form-control text-center'
                  id='approverLevels'
                  value={additionalData.approverLevels.join(', ')}
                  disabled
                  name='approverLevels'
                />
              </div>
            )}
            {Array.isArray(additionalData.departmentNames) && (
              <div className="mb-3 d-flex align-items-center">
                <label
                  htmlFor="departmentNames"
                  className="form-label d-flex align-items-start me-4"
                >
                  Department Names
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="departmentNames"
                  value={additionalData.departmentNames.join(", ")}
                  disabled
                  name="departmentNames"
                />
              </div>
            )}
            {/* Other form fields */}
          </form>

            <div id='adminDetailsHeading'>
              <u>Admin Details</u>
            </div>
            <form id='adminDetailsadvanceForm'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='mb-3 d-flex align-items-center'>
                    <label
                      htmlFor='comispreview'
                      id='comidlabelpreview'
                      className='form-label d-flex align-items-start me-4'
                    >
                      Is Active
                    </label>
                    <input
                      type='text'
                      className='form-control text-center'
                      id='comispreview'
                      value={adminDetails.isActive}
                      disabled
                      name='comispreview'
                    />
                  </div>
                  <div className='mb-3 d-flex align-items-center'>
                    <label
                      htmlFor='exppreview'
                      id='explabelpreview'
                      className='form-label d-flex align-items-start me-4'
                    >
                      Admin Name
                    </label>
                    <input
                      type='text'
                      className='form-control text-center'
                      id='exppreview'
                      value={adminDetails.adminName}
                      disabled
                      name='exppreview'
                    />
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='mb-3 d-flex align-items-center'>
                    <label
                      htmlFor='passnamepreview'
                      id='passnamelabelpreview'
                      className='form-label d-flex align-items-start me-4'
                    >
                      Admin Mail ID
                    </label>
                    <input
                      type='email'
                      className='form-control text-center'
                      id='passnamepreview'
                      value={adminDetails.adminMail}
                      disabled
                      name='passnamepreview'
                    />
                  </div>
                  <div className='mb-3 d-flex align-items-center'>
                    <label
                      htmlFor='passnamepreview'
                      id='passnamelabelpreview'
                      className='form-label d-flex align-items-start me-4'
                    >
                      Designation
                    </label>
                    <input
                      type='text'
                      className='form-control text-center'
                      id='passnamepreview'
                      value={adminDetails.designation}
                      disabled
                      name='passnamepreview'
                    />
                  </div>
                </div>
              </div>
            </form>
            <form id='downButtonGroup'>
              <button type='submit' className='btn btn-warning' id='empsubmit' onClick={this.onSubmit}>
                <FontAwesomeIcon icon={faCheckCircle} className='mr-2' /> Submit
              </button>

              <button type='submit' className='btn btn-secondary' id='empedit'>
                <FontAwesomeIcon icon={faEdit} className='mr-2' /> Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }}
}
