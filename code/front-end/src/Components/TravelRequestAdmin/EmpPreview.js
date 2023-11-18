import React, { Component } from 'react'
import './EmpPreview.css'
import '../Popup.css'
// import NavBarAd from '../TravelRequestForm/NavBarAd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit,faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NavBarAd from '../NavBarAd';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
export default class EmpPreview extends Component {
  constructor(props){
    super(props);
    this.state = {
      employeeDetails:JSON.parse(localStorage.getItem('employeeDetails')),
      proofDetails:JSON.parse(localStorage.getItem('ProofDetails')),
      show: false,
      flag:false,
      emp_id:'',
    }
  }
  onSubmit = (e) => {
    e.preventDefault();

    // Combine the proofDetails and employeeDetails
    const formData = {
      ...this.state.proofDetails,
      ...this.state.employeeDetails,
    };
    if (formData.employeeDesignation === 'Admin') {
      this.setState({ flag: true });
    }

    axios
      .post('http://localhost:3002/addEmployee', {
        formData: formData,
        companyId: localStorage.getItem('company_id'),
      })
      .then((response) => {
        localStorage.removeItem('proofDetails');
        localStorage.removeItem('employeeDetails');
        console.log('Server Response:', response.data);
        if(response.data){
            axios.post('http://localhost:3002/addEmployeeemail', {
              formData: formData,
              companyId: localStorage.getItem('company_id'),
            }).then((response)=>{
                  console.log('Server Response:', response.data);
            }).catch((error) => {
                console.log('Server Error:', error)
            });
          this.setState({ show: true });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  handleClose = () => {
    this.setState({ show: false });
  };


  render() {
    const { employeeDetails, proofDetails,show} = this.state;
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
               
                <h2>EMPLOYEE ADDED</h2>
                <h4>Emp ID: </h4>
                <p>Employee has been Added Successfully!</p>
                <Link to="/admin/Emphistory">
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
      <NavBarAd/>
      <div class="container">
        <div className="container"id ="Emppreviewform">
          <h5>Preview</h5>
          <form>
          <button type="submit" className="btn btn-warning" id="empsubmit">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Submit
              </button>
              <Link to="/admin/addEmployee">
              <button type="submit" className="btn btn-secondary" id="empedit">
                <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
              </button></Link>
            </form>  
          <div id="empadbasicdetailspre">
            <u>Employee Details</u>
          </div>
            <form id ="empadbasicprevform">
                <div className="row">

                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center" >
                      <label htmlFor="empidpreview" id="empidlabelpreview" className="form-label d-flex align-items-start me-4">Employee ID</label>
                      <input type="text" className="form-control text-center" id="empidpreview" value={employeeDetails.employeeId} disabled name="empidpreview"/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="empnamepreview" id="empnamelabelpreview" className="form-label d-flex align-items-start me-4">Emplyoee Name</label>
                      <input type="text" className="form-control text-center" id="empnamepreview" value={employeeDetails.employeeName} disabled name="empnamepreview"/>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="mailidpreview" id="mailidlabelpreview" className="form-label d-flex align-items-start me-4">Employee Mail ID</label>
                      <input type="email" className="form-control text-center" id="mailidpreview" value={employeeDetails.employeeMail} disabled name="mailidpreview" />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="empaddpreview" id="empaddlabelpreview" className="form-label d-flex align-items-start me-4">Employee Address</label>
                      <input type="text" className="form-control text-center" id="empaddpreview" value={employeeDetails.employeeAddress} disabled name="empaddpreview"/>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center" >
                      <label htmlFor="empnumpreview" id="empidlabelpreview" className="form-label d-flex align-items-start me-4">Employee Mobile Number</label>
                      <input type="number" className="form-control text-center" id="empnumpreview" value={employeeDetails.employeeMobileNumber} disabled name="empnumpreview"/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="empdeptpreview" id="empdeptlabelpreview" className="form-label d-flex align-items-start me-4">Department</label>
                      <input type="text" className="form-control text-center" id="empdeptpreview" value={employeeDetails.employeeDepartment} disabled name="empdeptpreview"/>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="empdesgpreview" id="empdesglabelpreview" className="form-label d-flex align-items-start me-4">Designation</label>
                      <input type="text" className="form-control text-center" id="empdesgpreview" value={employeeDetails.employeeDesignation} disabled name="empdesgpreview" />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="empdobpreview" id="empdoblabelpreview" className="form-label d-flex align-items-start me-4">Employee DOB</label>
                      <input type="date" className="form-control text-center" id="empdobpreview" value={employeeDetails.employeeDOB} disabled name="empdobpreview"/>
                    </div>
                  </div>
        
                </div>
            </form>

            <div id="proof">
              <u>Proof</u>
            </div>
            <form id ="advanceForm">
            <div className="row">

                    <div className="col-md-6">
                      <div className="mb-3 d-flex align-items-center" >
                        <label htmlFor="passnopreview" id="passlabelpreview" className="form-label d-flex align-items-start me-4">Passport Number</label>
                        <input type="number" className="form-control text-center" id="passnopreview" value={proofDetails.addemployeePassport} disabled name="passnopreview"/>
                      </div>
                      <div className="mb-3 d-flex align-items-center">
                        <label htmlFor="exppreview" id="explabelpreview" className="form-label d-flex align-items-start me-4">Expiry Date</label>
                        <input type="date" className="form-control text-center" id="exppreview" value={proofDetails.addemployeedate} disabled name="exppreview"/>
                      </div>
                    </div>

                    <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="passnamepreview" id="passnamelabelpreview" className="form-label d-flex align-items-start me-4">Passport Name</label>
                      <input type="email" className="form-control text-center" id="passnamepreview" value={proofDetails.addemppassname} disabled name="passnamepreview" />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="empaddpreview" id="aadharlabelpreview" className="form-label d-flex align-items-start me-4">Aadhar Number</label>
                      <input type="text" className="form-control text-center" id="empaddpreview" value={proofDetails.addempAAdhar} disabled name="empaddpreview"/>
                    </div>
                  </div>

                  <div className="col-md-6">
                      <div className="mb-3 d-flex align-items-center" >
                        <label htmlFor="dlnopreview" id="dllabelpreview" className="form-label d-flex align-items-start me-4">DL Number</label>
                        <input type="number" className="form-control text-center" id="dlnopreview" value={proofDetails.addempdlnum} disabled name="dlnopreview"/>
                      </div>
                      </div>

                      <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="pannonamepreview" id="pannonamelabelpreview" className="form-label d-flex align-items-start me-4">PAN Number</label>
                      <input type="email" className="form-control text-center" id="pannonamepreview" value={proofDetails.addempPan} disabled name="pannonamepreview" />
                    </div>
                    </div>

                    </div>
                    

                    
            </form>

            <form id='downButtonGroup'>
            {/* <form id='ButtonGroup' onSubmit={this.onSubmit}>   */}
          <button type="button" className="btn btn-warning" id="empsubmit" onClick={this.onSubmit}>
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Submit
              </button>
              {/* </form> */}
              <Link to="/admin/addEmployee">
              <button type="button" className="btn btn-secondary" id="empedit">
                <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
              </button>
              </Link>
            </form>

            
            </div>
      </div>
      </div>
    )
    }
  }
    }
