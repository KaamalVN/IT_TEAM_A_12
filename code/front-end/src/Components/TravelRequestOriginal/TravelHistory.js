import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function TravelHistory() {

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTripType, setSelectedTripType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState([]);
  const [teamdata, setteamData] = useState([]);
  
  const [expandedRows, setExpandedRows] = useState({});
  const [showFirstDiv, setShowFirstDiv] = useState(true); // Added state to toggle first and second div
  
  const navigate = useNavigate();

  const approverLevelId = localStorage.getItem('approverLevelId');
  
  useEffect(() => {
    axios
      .post('http://localhost:3002/travel_details', {
        uid: localStorage.getItem('userid'),
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching travel data:', error);
      });
  }, []); // Empty dependency array to run once on component mount

  useEffect(() => {
    // Fetch travel request data based on the current user's data and approver level
    axios.post('http://localhost:3002/team_travel_request_details', { uid :localStorage.getItem('userid'), approverLevelId,})
      .then((response) => {
        setteamData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching travel data:', error);
      });
  }, []); // Fetch data when userId or approverLevelId changes

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTripTypeChange = (value) => {
    setSelectedTripType(value);
  };
  
  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    console.log(value);
  };
  
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handleViewClick = (tripId,fromFirstDiv) => {
    // Store the tripId in local storage
    localStorage.setItem('viewSource', fromFirstDiv ? 'firstDiv' : 'secondDiv');
    localStorage.setItem('selectedTripId', tripId);
    //console.log(tripId);
    // Navigate to the /user/view page
    navigate(`/user/view`);
  };

  const [statusOptions, setStatusOptions] = useState([]);
  useEffect(() => {
    axios
    .post('http://localhost:3002/status_options', { uid :localStorage.getItem('userid'), }) // Send 'uid' in the request body
    .then((response) => {
      // Assuming the API returns an array of status objects with 'id' and 'status' properties
      const statusOptions = response.data.map((status) => ({
        value: status.status,
        label: status.status,
      }));
      setStatusOptions(statusOptions);
    })
    .catch((error) => {
      console.error('Error fetching status options:', error);
    });
  }, []);

  const [mappingRange, setMappingRange] = useState({ firstApprover: null, lastApprover: null });

  useEffect(() => {
    // Make a GET request to fetch the first and last values of the mapping
    axios
      .post('http://localhost:3002/get_approver_mapping_range',{ uid :localStorage.getItem('userid'), }) // Replace with your actual API endpoint
      .then((response) => {
        setMappingRange(response.data);
        const data = response.data;
        console.log(data);
        // Extract the first column values
        const firstColumnValues = Object.keys(data).map(key => parseInt(key.split(',')[0]));
  
        // Calculate the minimum and maximum values
        const minApprover = Math.min(...firstColumnValues);
        const maxApprover = Math.max(...firstColumnValues);
  
        // Set the state with the values
        setMappingRange({ firstApprover: minApprover, lastApprover: maxApprover });
  
        // Store the values in localStorage
        localStorage.setItem('firstApprover', minApprover.toString());
        localStorage.setItem('lastApprover', maxApprover.toString());
      })
      .catch((error) => {
        console.error('Error fetching approver mapping range:', error);
      });
  }, []);

  const toggleRowExpansion = (tripId) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [tripId]: !prevExpandedRows[tripId],
    }));
  };
  const firstApprover = localStorage.getItem('firstApprover');
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredData = data
    .filter((item) => selectedTripType === '' || item.trip_type === selectedTripType)
    .filter((item) => selectedStatus === '' || item.status === selectedStatus)
    .filter((item) => {
      const departureDate = item.departureDateTime ? item.departureDateTime.split('T')[0] : '';
      return departureDate >= selectedDate;
    });

  const currentData = filteredData && filteredData.length >0 ? filteredData.slice(startIndex, endIndex) : [];

  const filteredteamData = teamdata
  .filter((item) => selectedTripType === '' || item.trip_type === selectedTripType)
  .filter((item) => selectedStatus === '' || item.status === selectedStatus)
  .filter((item) => {
    const departureDate = item.departureDateTime ? item.departureDateTime.split('T')[0] : '';
    return departureDate >= selectedDate;
  });

  const currentTeamData = filteredteamData.slice(startIndex, endIndex);
  console.log(currentData);
    return (
      <div id="global-background">
        <div id="travelContainer">
          
        <div id="travelRow">
            <div id="travelrequestFilter" className="col-md-3">
            <select
            className="form-select mb-2"
            aria-label="Trip Type"
            value={selectedTripType}
            onChange={(e) => handleTripTypeChange(e.target.value)}
            >
                <option value="">Trip Type</option>
                <option value="Domestic">Domestic</option>
                <option value="International">International</option>
              </select>
            </div>
            <div id="travelrequestFilter" className="col-md-3">
            <select
              className="form-select mb-2"
              aria-label="Status"
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="">Status</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            </div>
            <div id="travelrequestFilter" className="col-md-3">
              <input
                type="date"
                className="form-control mb-2"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>
            <div id="travelrequestFilter" className="col-md-3">
            <Link to="/user/details">
              <button className="btn btn-primary mb-2">Add Request</button>
              </Link>
            </div>
          </div>
          {approverLevelId >= firstApprover && (
          <div className='d-flex' id="travelrequestToggle" >
            <button
              className="btn mb-2 me-2"
              onClick={() => setShowFirstDiv(true)}
              id="travelrequestToggleButtons"
            >
              My Requests
            </button>
            <button
              className="btn mb-2 me-2"
              onClick={() => setShowFirstDiv(false)}
              id="travelrequestToggleButtons"
            >
              My Team Requests
            </button>
            <Link to="/user/travelapprovalrejection">
            <button
              className="btn mb-2"
              id="travelrequestToggleButtons"
            >
              Approval/Rejection History
            </button>
            </Link>
          </div>
          
        )}
        {showFirstDiv && (
          <div id="travelrequestBackground" style={{ marginTop: approverLevelId >= firstApprover ? '0' : '12%' }}>
          <table id="travelrequestTable" className="table table_border">
            <thead className="thead-dark">
              <tr>
                <th id='tableStart'>Trip Number / Trip Type</th>
                <th>From Location / Departure Date and Time</th>
                <th>To Location / Arrival Date and Time</th>
                <th>Status</th>
                <th id='tableEnd'>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <React.Fragment key={item.trip_id}>
              <tr key={item.trip_id} >
                <td id="travelrequestTdFirstChild">
                  {item.trip_id}
                  <sub id="travelrequestSub">{item.trip_type}</sub>
                </td>
                <td id="travelrequestTd">
                  {item.from_city_name}
                  <sub id="travelrequestSub">{item.departure_date}</sub>
                </td>
                <td id="travelrequestTd">
                  {item.to_city_name}
                  <sub id="travelrequestSub">{item.return_date}</sub>
                </td>
                <td id="travelrequestTd">{item.status}</td>
                <td id="travelrequestTdLastChild">
                <div  className="d-flex align-items-center action_buttons">
                  <Link to='/user/view'>
                  <button id="travelrequestView" className="btn btn-sm btn-info me-2" onClick={() => handleViewClick(item.trip_id,true)}>View</button>
                  </Link>
                  <button className="btn btn-sm btn-primary dropdown-toggle me-2" onClick={() => toggleRowExpansion(item.trip_id)}>More</button>
                </div>
                </td>
             </tr>
             {expandedRows[item.trip_id] && (
                <tr id="more_details_row">
                  <td colSpan="5" className="grid-container">
                  <div className="grid-item">
                    <strong>Review: </strong>
                    {item.rejector_remark ? "Travel request rejected" : item.rejector_remark || "Review pending from the approver."}
                  </div>
                  <div className="grid-item">
                    <strong>Accommodation Details: </strong>
                    {item.rejector_remark ? "Travel request rejected" : (item.accomodation_address ? item.accomodation_address : "Accommodation details are yet to be allotted")}
                  </div>
                  <div className="grid-item">
                    <strong>Ticket Details: </strong>
                    {item.rejector_remark ? "Travel request rejected" : (item.ticket_details ? item.ticket_details : "Ticket details are yet to be allotted")}
                  </div>
                  </td>
                </tr>
              )}

              </React.Fragment>
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
          )}
          {!showFirstDiv && (
          <div id="travelrequestBackground" style={{ marginTop: approverLevelId >= firstApprover ? '0' : '12%' }}>
          <table id="travelrequestTable" className="table table_border">
            <thead className="thead-dark">
              <tr>
                <th id='tableStart'>Trip Number / Trip Type</th>
                <th>From Location / Departure Date and Time</th>
                <th>To Location / Arrival Date and Time</th>
                <th>Status</th>
                <th id='tableEnd'>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTeamData.map((teamItem) => (
                <React.Fragment key={teamItem.trip_id}>
                  <tr key={teamItem.trip_id}>
                    <td id="travelrequestTdFirstChild">
                      {teamItem.trip_id}
                      <sub id="travelrequestSub">{teamItem.trip_type}</sub>
                    </td>
                    <td id="travelrequestTd">
                      {teamItem.from_city_name}
                      <sub id="travelrequestSub">{teamItem.departure_date}</sub>
                    </td>
                    <td id="travelrequestTd">
                      {teamItem.to_city_name}
                      <sub id="travelrequestSub">{teamItem.return_date}</sub>
                    </td>
                    <td id="travelrequestTd">{teamItem.status}</td>
                    <td id="travelrequestTdLastChild">
                      <div className="d-flex align-items-center action_buttons">
                        <Link to="/user/view">
                          <button
                            id="travelrequestView"
                            className="btn btn-sm btn-info me-2"
                            onClick={() => handleViewClick(teamItem.trip_id,false)}
                          >
                            View
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
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
              disabled={currentTeamData.length < itemsPerPage}
            />
            <Pagination.Last
              onClick={() => handlePageChange(Math.ceil(teamdata.length / itemsPerPage))}
            />
          </Pagination>
        </div>
        
        )}          
        </div>

      </div>
    );
  }


export default TravelHistory;
