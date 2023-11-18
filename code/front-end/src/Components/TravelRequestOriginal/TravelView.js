import React, { useState, useEffect } from 'react';
import './TravelView.css';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faBackward, faCheck, faCheckCircle, faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../NavBar';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function View(props) {
  const [transport, setTransport] = useState('Car');
  const [selectedAdvance, setSelectedAdvance] = useState('Yes');
  
  const viewSource = localStorage.getItem('viewSource'); 
  const [tripDetails, setTripDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [remark, setRemark] = useState('');
  const [accomodationAddress, setAccomodationAddress] = useState('');
  const [ticketAddress, setTicketAddress] = useState('');
  console.log('tripDetails:', tripDetails);
  const firstApprover = parseInt(localStorage.getItem('firstApprover'));
  const lastApprover = parseInt(localStorage.getItem('lastApprover'));
  const [rightParts, setRightParts] = useState([]);
  const numApprovers = (lastApprover - firstApprover) + 1;
  useEffect(() => {
    axios
      .post('http://localhost:3002/travel_request_details', {
        tripid: localStorage.getItem('selectedTripId'),
        
      })
      .then((response) => {
        setTripDetails(response.data);
        console.log("Travel Mode:", response.data[0].travel_mode);
      })
      .catch((error) => {
        console.error('Error fetching travel data:', error);
      });
  }, []);
  const handleApproveClick = () => {
    // Make a POST request to your Node.js server
    setPopupMessage('Approved');
    setShowPopup(true);
    axios.post('http://localhost:3002/approve', {
      tripId: localStorage.getItem('selectedTripId'), // Send the trip ID or necessary data
      approverLevelId: localStorage.getItem('approverLevelId'),
      accomodationAddress: accomodationAddress,
      ticketAddress:ticketAddress,
      // Other data you want to send to the server
    })
    .then((response) => {
      // Handle the response from the server (if needed)
      console.log('Data updated successfully:', response.data);
      // Perform any other actions you need after the approval.
    })
    .catch((error) => {
      console.error('Error approving data:', error);
      // Handle errors appropriately.
    });
  };
  const handleRejectClick = () => {
    // Make a POST request to your Node.js server
    setPopupMessage('Rejected');
    setShowPopup(true);
    axios.post('http://localhost:3002/reject', {
      tripId: localStorage.getItem('selectedTripId'),
      uid:localStorage.getItem('userid'),
      rejector_remark: remark, // Send the trip ID or necessary data
      // Other data you want to send to the server
    })
    .then((response) => {
      // Handle the response from the server (if needed)
      console.log('Data updated successfully:', response.data);
      // Perform any other actions you need after the approval.
    })
    .catch((error) => {
      console.error('Error rejecting data:', error);
      // Handle errors appropriately.
    });
  };

  const handleClosePopup = () => {
    // Close the popup when the "Ok" button is clicked
    setShowPopup(false);
  };

  const [mappingRange, setMappingRange] = useState({ firstApprover: null, lastApprover: null, firstStatus: null, lastStatus: null });

useEffect(() => {
  // Make a GET request to fetch the mapping range
  axios
    .post('http://localhost:3002/get_approver_mapping_range', { uid: localStorage.getItem('userid') })
    .then((response) => {
      const data = response.data;

      // Extract the first column values
      const rightParts = Object.keys(data).map(key => key.split(',')[1]);
      console.log(rightParts);
      setRightParts(rightParts);
    })
    .catch((error) => {
      console.error('Error fetching approver mapping range:', error);
    });
}, []);

  return (
    
    <div id="global-background">
      <NavBar />
      <div class="circleController">
      <div className="circle-container">
          {Array.from({ length: numApprovers }, (v, i) => i + 1).map((approver,index) => (
            <div className="circle-heading-container" key={approver}>
              <div className={`circless ${approver === firstApprover ? 'yellow' : ''}`}>
              {approver !== numApprovers && (
                <div className={`liness ${approver === firstApprover ? 'yellow' : ''}`}></div>)}
                {approver}
              </div>
              <h3 className="headingss">{rightParts[index]}</h3>
            </div>
          ))}
        </div>
      </div>
      <div class="container">
        <div class="container" id="viewcontainer">
          <h5>{tripDetails && tripDetails[0] && tripDetails[0].trip_id}</h5>
          <form id="viewform">
            <div class="white-box mx-auto">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="triptypeview" id="triptypelabelview" className="form-label d-flex align-items-start me-4">Trip Type :</label>
                    <label name="triptypeview">{tripDetails && tripDetails[0] && tripDetails[0].trip_type}</label>
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="fromcityview" id="fromcitylabelview" className="form-label d-flex align-items-start me-4">From City :</label>
                    <label name="fromcityview">{tripDetails && tripDetails[0] && tripDetails[0].from_city_name}</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="countryStateview" id="countrylabelview" className="form-label d-flex align-items-start me-4">Country / State :</label>
                    <label name="countryStateview">India/Tamil Nadu</label>
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="tocityview" id="tocitylabelview" className="form-label d-flex align-items-start me-4">To City :</label>
                    <label name="tocityview">{tripDetails && tripDetails[0] && tripDetails[0].to_city_name}</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="DDateview" id="DDatelabelview" className="form-label d-flex align-items-start me-4">Departure Date :</label>
                    <label name="DDateview">{tripDetails && tripDetails[0] && tripDetails[0].departure_date}</label>
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="DTimeview" id="DTimelabelview" className="form-label d-flex align-items-start me-4">Departure Time :</label>
                    <label name="DTimeview">{tripDetails && tripDetails[0] && tripDetails[0].departure_time}</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="RDateview" id="RDatelabelview" className="form-label d-flex align-items-start me-4">Return Date :</label>
                    <label name="RDateview">{tripDetails && tripDetails[0] && tripDetails[0].return_date}</label>
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <label htmlFor="RTimeview" id="RTimelabelview" className="form-label d-flex align-items-start me-4">Return Time :</label>
                    <label name="RTimeview">{tripDetails && tripDetails[0] && tripDetails[0].return_time}</label>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="row">
              {tripDetails && tripDetails[0] && tripDetails[0].travel_mode === "Air" && (
                <>
                  {/* Content for Air Travel */}
                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="modeview" id="modelabelview" className="form-label d-flex align-items-start me-4">Mode of Transport :</label>
                      <label name="modeview">{tripDetails && tripDetails[0] && tripDetails[0].travel_mode}</label>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="passportview" id="passportlabelview" className="form-label d-flex align-items-start me-4">Passport Number :</label>
                      <label name="passportview">123456789012</label>
                    </div>
                  </div>

                  {/* More content for Air Travel */}
                  {/* ... */}
                </>
              )}

              {tripDetails && tripDetails[0] && tripDetails[0].travel_mode === "Car" && (
                <>
                  {/* Content for Car Travel */}
                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="modeview" id="modelabelview" className="form-label d-flex align-items-start me-4">Mode of Transport :</label>
                      <label name="modeview">{tripDetails && tripDetails[0] && tripDetails[0].travel_mode}</label>
                    </div>
                  </div>
                  <div className="col-md-8">
                    {/* Table content for Car Travel */}
                    {/* ... */}
                  </div>
                </>
              )}

              {tripDetails && tripDetails[0] && tripDetails[0].travel_mode === "Bus" && (
                <>
                  {/* Content for Bus Travel */}
                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="modeview" id="modelabelview" className="form-label d-flex align-items-start me-4">Mode of Transport :</label>
                      <label name="modeview">{tripDetails && tripDetails[0] && tripDetails[0].travel_mode}</label>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="busEmailView" id="passportlabelview" className="form-label d-flex align-items-start me-4">Email :</label>
                      <label name="busEmailView">sample@gmail.com</label>
                    </div>
                  </div>
                  {/* More content for Bus Travel */}
                  {/* ... */}
                </>
              )}

              {tripDetails && tripDetails[0] && tripDetails[0].travel_mode === "Train" && (
                <>
                  {/* Content for Rail Travel */}
                  <div className="col-md-6">
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="modeview" id="modelabelview" className="form-label d-flex align-items-start me-4">Mode of Transport :</label>
                      <label name="modeview">{tripDetails && tripDetails[0] && tripDetails[0].travel_mode}</label>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="railClassView" id="passportlabelview" className="form-label d-flex align-items-start me-4">Railway Class :</label>
                      <label name="railClassView">First Class</label>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <label htmlFor="railCategoryview" id="idprooflabelview" className="form-label d-flex align-items-start me-4">Category :</label>
                      <label name="railCategoryview">Sleeper</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/* More content for Rail Travel */}
                    {/* ... */}
                  </div>
                </>
              )}
            </div>


                        <div className="row">

                        <div className="col-md-6">
                          <div className="mb-3 d-flex align-items-center" >
                            <label htmlFor="purposeview" id="purposelabelview" className="form-label d-flex align-items-start me-4">Purpose of Visit :</label>
                            <label name="purposeview">Meeting</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 d-flex align-items-center">
                              <label htmlFor="billingview" id="billinglabelview" className="form-label d-flex align-items-start me-4">Billing Entity :</label>
                              <label name="billingview">Vee Technologies</label>
                            </div>
                      </div>
                        <hr></hr>
                       </div> 

                       <div className="row">
                       
                        {selectedAdvance === "Yes" && (
                          <>
                              <div className="col-md-6">
                                <div className="mb-3 d-flex align-items-center" >
                                  <label htmlFor="advanceview" id="advancelabelview" className="form-label d-flex align-items-start me-4">Opt For Advance:</label>
                                  <label name="purposeview">Yes</label>
                                </div>
                              </div>
                              <div className="col-md-8"> {/* Increase the column width */}
           <table className="table table-bordered table-lg h-110 custom-table" name = 'advanceTable' style={{border : "1px solid black"}}>
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
                    <td>{tripDetails && tripDetails[0] && tripDetails[0].adv_accomodation_amount}</td>
                    <td>Cash</td>
                   </tr>
                   <tr>
                    <td>Travel</td>
                    <td>20000</td>
                    <td>{tripDetails && tripDetails[0] && tripDetails[0].adv_travel_amount}</td>
                    <td>Cash</td>
                   </tr>
               </tbody>
           </table>
       </div>
                          </>
                        )}

                        {selectedAdvance === "No" && (
                          <>
                            <div className="col-md-6">
                                <div className="mb-3 d-flex align-items-center" >
                                  <label htmlFor="advanceview" id="advancelabelview" className="form-label d-flex align-items-start me-4">Opt For Advance:</label>
                                  <label name="purposeview">No</label>
                                </div>
                              </div>
                          </>
                        )}
                        
       <div className="col-md-12 mt-2">
            <div className="mb-0.5">
                <label htmlFor="commentview" id='commentlabelview' className="form-label d-flex align-items-start">Comment</label>
                <input type="text" className="form-control" id="employeeIdview" name='comment' value={tripDetails && tripDetails[0] && tripDetails[0].travel_comment} readOnly/>
            </div>
        </div>
                        
                       </div> 

                    </div>
                  </form>
                </div>

                {/* <div className="vertical-progress">
                      <div className="progress-bar" style={{ height: '15%', backgroundColor: 'gray' }}>
                        <div className="circles">3</div>
                      </div>
                      <div className="progress-bar" style={{ height: '30%', backgroundColor: 'gray' }}>
                        <div className="circles">2</div>
                      </div>
                      <div className="progress-bar progress1" style={{ height: '20%', backgroundColor: 'yellow' }}>
                        <div className="circles">1</div>
                      </div>
                </div> */}
  
            
            <br/>
            <div className="container" id="reviewcontainer">
              <h5>REVIEW</h5>
              {localStorage.getItem('approverLevelId') > 1 ? (
                <input
                  type="text"
                  id="reviewcontainerp"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder='Enter Review'
                  required
                />
              ) : (
                <>
                      {tripDetails && tripDetails[0] && tripDetails[0].rejector_id !=null ? (
                        <input
                          type="text"
                          id="reviewcontainerp"
                          value={`Your request was rejected by approver with id: ${tripDetails && tripDetails[0] && tripDetails[0].rejector_id}, for the reason: ${tripDetails && tripDetails[0] && tripDetails[0].rejector_remark}`}
                          readOnly
                        />
                      ) : (
                        <input
                          type="text"
                          id="reviewcontainerp"
                          placeholder="Review to be entered by approvers"
                          disabled
                        />
                      )}
                    </>
              )}
            </div>
            <br/>
            <div className="container" id="accomodationContainer">
              <h5>ACCOMODATION</h5>
              {localStorage.getItem('approverLevelId') === String(localStorage.getItem('lastApprover') - 1) ? (
                <input
                  type="text"
                  id="reviewcontainerp"
                  placeholder="Enter Accommodation address"
                  value={accomodationAddress} // Bind the input value to the state variable
                  onChange={(e) => setAccomodationAddress(e.target.value)} // Update the state variable when the input changes
                />
              ) : (
                <input
                  type="text"
                  id="reviewcontainerp"
                  placeholder="Accommodation Details to be entered by travel desk"
                  value={tripDetails && tripDetails[0] && tripDetails[0].accomodation_address}
                  disabled
                />
              )}
            </div>

            <br/>
            <div className="container"id ="ticketContainer">
                <h5>TICKET DETAILS</h5>
                {localStorage.getItem('approverLevelId') === String(localStorage.getItem('lastApprover') - 1) ? (
                <input
                  type="text"
                  id="reviewcontainerp"
                  placeholder="Enter Ticket Details"
                  value={ticketAddress} // Bind the input value to the state variable
                  onChange={(e) => setTicketAddress(e.target.value)} // Update the state variable when the input changes
                />
              ) : (
                <input
                  type="text"
                  id="reviewcontainerp"
                  placeholder="Ticket Details to be entered by travel desk"
                  value={tripDetails && tripDetails[0] && tripDetails[0].ticket_details}
                  disabled
                />
              )}
            </div>
           <br/><br/><br/><br/>
           <form>
                <Link to='/combined'>
                <button type="button" className="btn btn-warning" id="submit">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                </button>
                </Link>
                
            {viewSource === 'secondDiv' ? (
              <><button type="button" className="btn btn-secondary" id="approve" onClick={handleApproveClick}>
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Approve
                </button>
                <button type="button" className="btn btn-warning" id="edit" onClick={handleRejectClick}>
                    <FontAwesomeIcon icon={faTimesCircle} className="mr-2" /> Reject
                  </button></>
            ) : (
              <button type="button" className="btn btn-secondary" id="edit">
                <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
              </button>
            )}               
            </form> 
            <div className="popup-containerp" style={{ display: showPopup ? 'block' : 'none' }}>
                {/* <div className="popup-overlayp"></div> */}
                  <Modal
                    show={showPopup}
                    onHide={handleClosePopup}
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
    
                      <h2>{popupMessage}</h2>
                      <Link to="/combined">
                      <Button
                        id="popupok"
                        variant="warning"
                        onClick={handleClosePopup}
                      >
                        Ok
                      </Button>
                      </Link>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
        </div>
        </div>
    )
  }
  export default View;
