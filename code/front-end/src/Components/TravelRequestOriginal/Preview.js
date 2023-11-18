import { faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import './Preview.css';
import { Modal, Button } from 'react-bootstrap';
//install npm install react-bootstrap bootstrap//
import '../Popup.css';

import { faCheck } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transport: localStorage.getItem('transport'), //Rail Air Car Bus
      triptype: "Yes",
      travelDetails:JSON.parse(localStorage.getItem('travelDetails')),
      modeDetails : JSON.parse(localStorage.getItem('modeDetails')),
      purposeDetails : JSON.parse(localStorage.getItem('purposeDetails')),
      advanceDetails : JSON.parse(localStorage.getItem('advanceDetails')),
      acc_count:localStorage.getItem('accompanyingCount'),
      advance:localStorage.getItem('advance'),
      uid:localStorage.getItem('loginId'),
      Tripid:localStorage.getItem('Trip_Type_Id'),
      accomodationAmount:localStorage.getItem('accomodationAmount'),
      travelAmount:localStorage.getItem('travelAmount')
    };
  }
  handleClose = () => {
    this.setState({ show: false });
  };


  handleTriptypeChange = (e) => {
    this.setState({ triptype: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const detailsToSend = {
      departure_date: this.state.travelDetails.departureDate,
      departure_time: this.state.travelDetails.departureTime,
      return_date: this.state.travelDetails.returnDate,
      return_time: this.state.travelDetails.returnTime,
      accompanying_count: this.state.acc_count,
      opt_for_advance: this.state.advance,
      accomodationAmount:this.state.accomodationAmount,
      travelAmount:this.state.travelAmount,
      railwayClass:this.state.modeDetails.railwayClass,
      categoryRail:this.state.modeDetails.categoryRail,
      comments:this.state.advanceDetails.comments,
      employee_id: this.state.uid,
      purpose_of_visit_id: this.state.purposeDetails.selectedPurposeId,
      billing_entity_id: this.state.purposeDetails.selectedBillingEntityId,
      travel_mode_id: this.state.transport,
      from_city_id: this.state.travelDetails.fromCity,
      to_city_id: this.state.travelDetails.toCity,
      trip_type: this.state.Tripid,

    };
    axios
      .post('http://localhost:3002/Submit', detailsToSend)
      .then((response) => {
        console.log('POST request successful');
      this.setState({ show: true });
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };
  render() {
    const { transport } = this.state;
    const {acc_count}=this.state;
    const {uid}=this.state;
    const {Tripid}=this.state;
    const {advance}=this.state;
    const { travelDetails, modeDetails, purposeDetails, advanceDetails} = this.state;
    const { triptype } = advanceDetails.advance;
    const departure_date = travelDetails.departureDate;
    const departure_time=travelDetails.departureTime;
    const return_date=travelDetails.returnDate;
    const return_time=travelDetails.returnTime;
    const accompanying_count=acc_count;
    const opt_for_advance=advance;
    const railwayClass=modeDetails.railwayClass;
    const categoryRail=modeDetails.categoryRail;
    const comments=advanceDetails.comments;
    const  employee_id=uid;
    const purpose_of_visit_id=purposeDetails.selectedPurposeId;
    const billing_entity_id=purposeDetails.selectedBillingEntityId;
    const travel_mode_id=modeDetails.id;
    const from_city_id=travelDetails.fromCity;
    const to_city_id=travelDetails.toCity;
    const trip_type=Tripid;
    console.log(transport);
    return (
      <div id='global-background'>
      <NavBar/>
      <div className="container">
        <div className="container"id ="previewform">
          <h5>Preview</h5>
          <form onSubmit={this.handleSubmit}>
          <button type="submit" className="btn btn-warning" id="submit1">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Submit
              </button>

              <Link to="/user/details"><button type="submit" className="btn btn-secondary" id="edit1">
                <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
              </button></Link>
            </form>  
          <div id="basicdetailspre">
            <u>Basic Details</u>
          </div>
            <form onSubmit={this.handleSubmit} id ="basicprevform">
                <div className="row">

                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center" >
                      <label htmlFor="triptypepreview" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Trip Type</label>
                      <input type="text" className="form-control text-center" id="triptypepreview" value={travelDetails.tripType} disabled name="triptypepreview"/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="fromcitypreview" id="fromcitylabelpreview" className="form-label d-flex align-items-start me-4">From City</label>
                      <input type="text" className="form-control text-center" id="fromcitypreview" value={localStorage.getItem('from_city')} disabled name="fromcitypreview"/>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="countryStatePreview" id="countrylabelpreview" className="form-label d-flex align-items-start me-4">Country/State</label>
                      <input type="email" className="form-control text-center" id="countrypreview" value={localStorage.getItem('country_name') + " / " +localStorage.getItem('state_name')} disabled name="countryStatePreview" />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="tocitypreview" id="tocitylabelpreview" className="form-label d-flex align-items-start me-4">To City</label>
                      <input type="text" className="form-control text-center" id="tocitypreview" value={localStorage.getItem('to_city')} disabled name="toCitypreview"/>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center" >
                      <label htmlFor="DDatepreview" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Depature Date</label>
                      <input type="text" className="form-control text-center" id="DDatepreview" value={travelDetails.departureDate} disabled name="DDatepreview"/>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="DTimepreview" id="DTimelabelpreview" className="form-label d-flex align-items-start me-4">Depature Time</label>
                      <input type="text" className="form-control text-center" id="DTimepreview" value={travelDetails.departureTime} disabled name="DTimepreview"/>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="RDatepreview" id="RDatelabelpreview" className="form-label d-flex align-items-start me-4">Return Date</label>
                      <input type="email" className="form-control text-center" id="RDatepreview" value={travelDetails.returnDate} disabled name="RDatepreview" />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="RTimepreview" id="RTimelabelpreview" className="form-label d-flex align-items-start me-4">Return Time</label>
                      <input type="text" className="form-control text-center" id="RTimepreview" value={travelDetails.returnTime} disabled name="RTimepreview"/>
                    </div>
                  </div>
        
                </div>
            </form>
            <div id="modeoftransport">
              <u>Mode Of Transport</u>
            </div>
            <form id ="modeoftranportform">
            <div className="row">

            {transport === "Air" && (
                <>
                    <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center" >
                    <label htmlFor="transport" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Mode Of Transport</label>
                    <input type="text" className="form-control text-center" id="triptypepreview" value={modeDetails.transport} disabled name="transport"/>
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="fromcitypreview" id="fromcitylabelpreview" className="form-label d-flex align-items-start me-4">From City</label>
                    <input type="text" className="form-control text-center" id="fromcitypreview" value={"Salem"} disabled name="fromcitypreview"/>
                  </div> */}
                </div>

                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="passportNumber" id="countrylabelpreview" className="form-label d-flex align-items-start me-4">Passport Number</label>
                    <input type="email" className="form-control text-center" id="countrypreview" value={modeDetails.passport_number} disabled name="passportNumber" />
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="tocitypreview" id="tocitylabelpreview" className="form-label d-flex align-items-start me-4">To City</label>
                    <input type="text" className="form-control text-center" id="tocitypreview" value={"Chennai"} disabled name="countrypreview"/>
                  </div> */}
                </div>

                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center" >
                    <label htmlFor="airFullName" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Full Name</label>
                    <input type="text" className="form-control text-center" id="DDatepreview" value={modeDetails.employee_name} disabled name="airFullName"/>
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="DTimepreview" id="DTimelabelpreview" className="form-label d-flex align-items-start me-4">Age</label>
                    <input type="text" className="form-control text-center" id="DTimepreview" value={"24"} disabled name="DTimepreview"/>
                  </div> */}
                </div>

                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center">
                  <label htmlFor="expiryDate" id="DDatelabelpreview" className="form-label d-flex align-items-start me-4">Expiry Date</label>
                    <input type="text" className="form-control text-center" id="DDatepreview" value={modeDetails.expiry_date} disabled name="expiryDate"/>
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="RTimepreview" id="RTimelabelpreview" className="form-label d-flex align-items-start me-4">Return Time</label>
                    <input type="text" className="form-control text-center" id="RTimepreview" value={"10:15 PM"} disabled name="RTimepreview"/>
                  </div> */}
                </div>
                </>
              )}


              {transport === "Bus" && (
                <>
                  <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center" >
                    <label htmlFor="transport" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Mode Of Transport</label>
                    <input type="text" className="form-control text-center" id="triptypepreview" value={"Bus"} disabled name="transport"/>
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="fromcitypreview" id="fromcitylabelpreview" className="form-label d-flex align-items-start me-4">From City</label>
                    <input type="text" className="form-control text-center" id="fromcitypreview" value={"Salem"} disabled name="fromcitypreview"/>
                  </div> */}
                </div>

                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="age" id="countrylabelpreview" className="form-label d-flex align-items-start me-4">Age</label>
                    <input type="email" className="form-control text-center" id="countrypreview" value={modeDetails.age} disabled name="age" />
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="tocitypreview" id="tocitylabelpreview" className="form-label d-flex align-items-start me-4">To City</label>
                    <input type="text" className="form-control text-center" id="tocitypreview" value={"Chennai"} disabled name="countrypreview"/>
                  </div> */}
                </div>

                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center" >
                    <label htmlFor="busFullName" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Full Name</label>
                    <input type="text" className="form-control text-center" id="DDatepreview" value={modeDetails.employee_name} disabled name="busFullName"/>
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="DTimepreview" id="DTimelabelpreview" className="form-label d-flex align-items-start me-4">Age</label>
                    <input type="text" className="form-control text-center" id="DTimepreview" value={"24"} disabled name="DTimepreview"/>
                  </div> */}
                </div>

                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center">
                  <label htmlFor="email" id="DDatelabelpreview" className="form-label d-flex align-items-start me-4">Email</label>
                    <input type="text" className="form-control text-center" id="DDatepreview" value={modeDetails.mail} disabled name="email"/>
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="RTimepreview" id="RTimelabelpreview" className="form-label d-flex align-items-start me-4">Return Time</label>
                    <input type="text" className="form-control text-center" id="RTimepreview" value={"10:15 PM"} disabled name="RTimepreview"/>
                  </div> */}
                </div>
                </>
              )}

              
{transport === "Car" && (
  <>
    <div className="col-md-6">
      <div className="mb-3 d-flex align-items-center">
        <label htmlFor="transport" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Mode Of Transport</label>
        <input type="text" className="form-control text-center" id="triptypepreview" value={"Car"} disabled name="transport" />
      </div>
    </div>

    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <table className="table table-bordered table-sm custom-table" name='carTable' style={{ border: "1px solid black" }}>
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {localStorage.getItem("modeData") && JSON.parse(localStorage.getItem("modeData")).map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
)}

                {transport === "Rail" && (
                <>
                  <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center" >
                    <label htmlFor="transport" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Mode Of Transport</label>
                    <input type="text" className="form-control text-center" id="triptypepreview" value={"Rail"} disabled name="transport"/>
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="fullNameRail" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Full Name</label>
                    <input type="text" className="form-control text-center" id="DDatepreview" value={modeDetails.employee_name} disabled name="fullNameRail"/>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="railwayClass" id="countrylabelpreview" className="form-label d-flex align-items-start me-4">Class</label>
                    <input type="email" className="form-control text-center" id="countrypreview" value={modeDetails.railwayClass} disabled name="railwayClass" />
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="categoryRail" id="tocitylabelpreview" className="form-label d-flex align-items-start me-4">Category</label>
                    <input type="text" className="form-control text-center" id="tocitypreview" value={modeDetails.categoryRail} disabled name="categoryRail"/>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center" >
                  <label htmlFor="ageRail" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Age</label>
                    <input type="email" className="form-control text-center" id="countrypreview" value={modeDetails.age} disabled name="ageRail" />
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="DTimepreview" id="DTimelabelpreview" className="form-label d-flex align-items-start me-4">Age</label>
                    <input type="text" className="form-control text-center" id="DTimepreview" value={"24"} disabled name="DTimepreview"/>
                  </div> */}
                </div>

                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center">
                    
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="RTimepreview" id="RTimelabelpreview" className="form-label d-flex align-items-start me-4">Return Time</label>
                    <input type="text" className="form-control text-center" id="RTimepreview" value={"10:15 PM"} disabled name="RTimepreview"/>
                  </div> */}
                </div>
                </>
              )}
                </div>
            </form>

            <div id="purpose">
              <u>Purpose</u>
            </div>
            <form id ="purposeform">
            <div className="row">
                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center" >
                    <label htmlFor="purposeOfVisitPreview" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Purpose Of Visit</label>
                    <input type="text" className="form-control text-center" id="triptypepreview" value={localStorage.getItem('selectedPurposeValue')} disabled name="purposeOfVisitPreview"/>
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="fromcitypreview" id="fromcitylabelpreview" className="form-label d-flex align-items-start me-4">From City</label>
                    <input type="text" className="form-control text-center" id="fromcitypreview" value={"Salem"} disabled name="fromcitypreview"/>
                  </div> */}
                </div>

                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="billingEntityPreview" id="countrylabelpreview" className="form-label d-flex align-items-start me-4">Billing Entity</label>
                    <input type="email" className="form-control text-center" id="countrypreview" value={localStorage.getItem('selectedBillingEntityId')} disabled name="billingEntityPreview" />
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="tocitypreview" id="tocitylabelpreview" className="form-label d-flex align-items-start me-4">To City</label>
                    <input type="text" className="form-control text-center" id="tocitypreview" value={"Chennai"} disabled name="countrypreview"/>
                  </div> */}
                </div>
              </div>
            </form>

            <div id="advance">
              <u>Advance</u>
            </div>
            <form id ="advanceForm">
                 <div className="row">
                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center" >
                    <label htmlFor="optForAdvance" id="triptypelabelpreview" className="form-label d-flex align-items-start me-4">Opt for Advance</label>
                    <input type="text" className="form-control text-center" id="triptypepreview"  value={advanceDetails.advance} onChange={this.handleTriptypeChange} disabled name="optForAdvance"/>
                  </div>
                  {advanceDetails.advance === "yes" && (
         <div id='moveAdvanceTable'>
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-8">
                <table className="table table-bordered table-lg h-110 custom-table" name = 'advanceTable'  style={{ border: "1px solid black" }}>
                  <thead className="thead-dark">
                    <tr>
                      <th>Expense</th>
                      <th>Limit</th>
                      <th>Amount</th>
                      <th>Transaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td>Accomodation</td>
                        <td>15000</td>
                        <td>{advanceDetails.accomodationAdvanceAmount}</td>
                        <td>{advanceDetails.accomodationAdvanceTransaction}</td>
                    </tr>
                    <tr>
                        <td>Travel</td>
                        <td>20000</td>
                        <td>{advanceDetails.travelAdvanceAmount}</td>
                        <td>{advanceDetails.travelAdvanceTransaction}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          </div>
        )}
                </div>

                <div className="col-md-7.5">
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="comments" id="commentslabelpreview" className="form-label d-flex align-items-start me-4">Comments</label>
                    <textarea className="form-control text-center" id="countrypreview" name = "comments" value={advanceDetails.comments} disabled/>
                  </div>
                  {/* <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="tocitypreview" id="tocitylabelpreview" className="form-label d-flex align-items-start me-4">To City</label>
                    <input type="text" className="form-control text-center" id="tocitypreview" value={"Chennai"} disabled name="countrypreview"/>
                  </div> */}
                </div>
              </div> 
            </form>

            <form id='downButtonGroup' onSubmit={this.handleSubmit}>
          <button type="submit" className="btn btn-warning" id="submit1">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Submit
              </button>

              <Link to="/user/details"><button type="submit" className="btn btn-secondary" id="edit1">
                <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
              </button></Link>
            </form>  
            {this.state.show && (
              <div className="popup-containerp">
                {/* <div className="popup-overlayp"></div> */}
                <Modal style={{backgroundColor : 'none'}}
                  show={this.state.show}
                  onHide={this.handleClose}
                  dialogClassName="modal-0w"
                >
                  <Modal.Body>
                    <div className="popup-contentp">
                      <div className="circle-topp"></div>
                      <div className="circle-bottomp"></div>
                      <div id="iconcirclep">
                        <FontAwesomeIcon
                          icon={faCheck}
                          size="3x"
                          style={{ color: '#FFFFFF' }}
                        />
                      </div>
    
                      <h2>SUBMITTED</h2>
                      <p>Your Request is submitted</p>
                      <Link to="/combined">
                      <Button
                        id="popupok"
                        variant="warning"
                        onClick={this.handleClose}
                      >
                        Ok
                      </Button>
                      </Link>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            )}
        </div>
      </div>
      </div>
    )
  }
}