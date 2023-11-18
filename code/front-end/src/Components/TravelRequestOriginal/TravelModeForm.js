import {
  faArrowLeft,
  faArrowRight,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function TravelModeForm() {
  const [employee_details,setEmployee_details]=useState();
  const [tableData, setTableData] = useState([]);
  const [accompanyingEmployeeId,setAccompanyingEmployeeId]=useState();
  const [accompanyingCount, setAccompanyingCount] = useState(0); 
  const [selectedTransport, setSelectedTransport] = useState(null);

  const onHandleChange=(e)=>{
    const uid=e.target.value;
    axios.post("http://localhost:3002/employee_details",{
      uid:uid
    }).then(response=>{
      setAccompanyingEmployeeId(response.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

 
  const addRow = () => {
    if (accompanyingEmployeeId) {
      const newRow = {
        id: accompanyingEmployeeId.id,
        name: accompanyingEmployeeId.employee_name,
        email: accompanyingEmployeeId.mail,
       
      };
      setAccompanyingCount(accompanyingCount+1)
      // Get the existing array from local storage, or initialize an empty array if none exists
      const existingTableData = JSON.parse(localStorage.getItem("modeData")) || [];
  
      // Check if the new row already exists in the table
      const isDuplicate = existingTableData.some(item => item.id === newRow.id);
  
      if (!isDuplicate) {
        // Add the new row to the existing array
        const updatedTableData = [...existingTableData, newRow];
  
        // Store the updated array back in local storage
        localStorage.setItem("modeData", JSON.stringify(updatedTableData));
  
        // Update the state with the modified tableData
        setTableData(updatedTableData);
      } else {
        alert('This employee is already added to the table.');
      }
    }
  };
  

  const [selectedValue, setSelectedValue] = useState(null);
  // const deleteRow = () => {
  //   const updatedTableData = [...tableData];
  //   updatedTableData.pop();
  //   localStorage.setItem("modeData", JSON.stringify(updatedTableData)); // Update local storage
  //   setTableData(updatedTableData);
  // };
  const handleDeleteRow = (rowId) => {
    const updatedTableData = tableData.filter(item => item.id !== rowId);
    localStorage.setItem("modeData", JSON.stringify(updatedTableData));
    setTableData(updatedTableData);
    setAccompanyingCount(accompanyingCount - 1);
  };
  
  const initialModeDetails={
    transport:'',
    passport_number:'',
    expiry_date:'',
    idProof:'',
    idProofDocument:null,
    age:'',
    railwayClass:'',
    categoryRail:'',
    employee_name:'',
    mail:'',
  };
  
  const [modeDetails, setModeDetails] = useState(initialModeDetails);
  const navigate = useNavigate();
    useEffect(()=>{
      axios.post('http://localhost:3002/employee_details', {
        uid:localStorage.getItem("userid"),
      })
      .then((response) => {
        setEmployee_details(response.data);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
      });
    },[]);
    useEffect(()=>{
      console.log(tableData)
    },[tableData])
    useEffect(() => {
      setModeDetails({
        ...initialModeDetails,
        ...employee_details,
      });
      const storedModeDetails = JSON.parse(localStorage.getItem('modeDetails'));
        if (storedModeDetails) {
          setModeDetails(storedModeDetails);
        }
    }, [employee_details]);
    
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setModeDetails({
        ...modeDetails,
        [name]: value,
      });
    };
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    const vv= event.target.value;
    setSelectedTransport((prevState) =>
      prevState === selectedValue ? null : selectedValue
    );
    const { name, value } = event.target;
      setModeDetails({
        ...modeDetails,
        [name]: value,
      });
      localStorage.setItem('transport',vv);
  };
  useEffect(() => {
    
    localStorage.setItem("accompanyingCount", accompanyingCount);
  }, [accompanyingCount]);
  const handleSubmit = (e) =>{
    e.preventDefault();
    if (selectedValue) {
      // User has made a selection, proceed to the next page or take the desired action
      // Replace this with your actual logic to navigate to the next page or perform an action.
      const modeDetailsJSON = JSON.stringify(modeDetails);
      localStorage.setItem("modeDetails",modeDetailsJSON);
      navigate("/user/purpose");
    } 
    else {
      // No selection made, display a required message
      alert("Please select a transport option.");
    }
    
  }

  useEffect(() => {
    if (modeDetails.transport === 'Bus' || modeDetails.transport === 'Rail') {
      // Calculate age from employee_dob
      const dob = new Date(modeDetails.employee_dob);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
  
      // If the birthdate hasn't occurred this year yet, subtract one year
      if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
      }
  
      // Update modeDetails with the calculated age
      setModeDetails(prevModeDetails => ({
        ...prevModeDetails,
        age: age.toString() // Convert age to string
      }));
    }
  }, [modeDetails.transport, modeDetails.employee_dob]);
  
  return (
    <div style={{ overflow: 'hidden', margin: '0', height: '100%' }}>
      <div id="global-background">
        <NavBar />
        <div class="circleController">
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
              <h3 className="heading">Mode</h3>
            </div>
            <div className="circle-heading-container">
              <div className="circle">
                <div className="line"></div>
                3
              </div>
              <h3 className="heading">Purpose</h3>
            </div>
            {/* <div className="circle-heading-container">
              <div className="circle">
                <div className="line"></div>
                4
              </div>
              <h3 className="heading">Heading</h3>
            </div> */}
            <div className="circle-heading-container">
              <div className="circle last-circle">4</div>
              <h3 className="heading">Advance</h3>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="form-container">
            <div className="row">
              <div className="col-md-3">
                <h2 className="form-title">
                  <strong>
                    Mode of Transport <br /> & <br /> Personal Details
                  </strong>
                </h2>
              </div>
              <div className="col-md-9">
                <form onSubmit={handleSubmit} id="insideBox">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group d-flex align-items-start">
                          <label className="form-label me-5" id="emplabel">
                            Mode Of Transport
                          </label>
                          <form onSubmit={handleSubmit}>
                          <div className="d-flex">
                            <div className="form-check me-5">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="transport"
                                value="Air"
                                onChange={handleRadioChange}
                              />
                              <label className="form-check-label" htmlFor="Air">
                                Air
                              </label>
                            </div>
                            <div className="form-check me-5">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="transport"
                                id="bus"
                                value="Bus"
                                onChange={handleRadioChange}
                              />
                              <label className="form-check-label" htmlFor="Bus">
                                Bus
                              </label>
                            </div>
                            <div className="form-check me-5">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="transport"
                                id="car"
                                value="Car"
                                onChange={handleRadioChange}
                              />
                              <label className="form-check-label" htmlFor="Car">
                                Car
                              </label>
                            </div>
                            <div className="form-check me-0">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="transport"
                                id="rail"
                                value="Rail"
                                onChange={handleRadioChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="Rail"
                              >
                                Rail
                              </label>
                            </div>
                          </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    {modeDetails.transport === 'Air' && (
                      <div className="row">
                        <div className="col-md-6 mt-3">
                          <div className="mb-3">
                            <label
                              htmlFor="passport_number"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Passport Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employeeId"
                              name="passport_number"
                              value={modeDetails.passport_number}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          <div className="mb-3">
                            <label
                              htmlFor="expiry_date"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Date"
                              name="expiry_date"
                              value={formatDate(modeDetails.expiry_date)}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-2">
                          <div className="mb-3">
                            <label
                              htmlFor="airFullName"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employeeId"
                              name="airFullName"
                              value={modeDetails.employee_name}
                              
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-2">
                          <div className="mb-3">
                            <label
                              htmlFor="idProof"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              ID Proof
                            </label>
                            <select
                              className="form-select"
                              id="dropdown"
                              name="idProof"
                              value={modeDetails.idProof}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="" selected disabled>Select</option>
                              <option value="Aadhar Card">Aadhar Card</option>
                              <option value="Driving License">Driving License</option>
                              <option value="Pan Card">Pan Card</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-12 mt-2">
                          <div className="mb-0.5">
                            <label
                              htmlFor="idProofDocument"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Upload ID Proof Document
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              id="fileUpload"
                              name="idProofDocument"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {modeDetails.transport === 'Bus' && (
                      <div className="row">
                        <div className="col-md-6 mt-3">
                          <div className="mb-3">
                            <label
                              htmlFor="email"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employeeId"
                              name="email"
                              value={modeDetails.mail}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          <div className="mb-3">
                            <label
                              htmlFor="age"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Age
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employeeId"
                              name="age"
                              value={modeDetails.age}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-2">
                          <div className="mb-3">
                            <label
                              htmlFor="busFullName"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employeeId"
                              name="busFullName"
                              value={modeDetails.employee_name}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-2">
                          <div className="mb-3">
                            <label
                              htmlFor="idProof"
                              id="emplabel"
                              
                              className="form-label d-flex align-items-start"
                            >
                              ID Proof
                            </label>
                            <select
                              className="form-select"
                              id="dropdown"
                              name="idProof"
                              value={modeDetails.idProof}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="" selected disabled>Select</option>
                              <option value="Aadhar Card">Aadhar Card</option>
                              <option value="Driving License">Driving License</option>
                              <option value="Pan Card">Pan Card</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-12 mt-2">
                          <div className="mb-0.5">
                            <label
                              htmlFor="idProofDocument"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Upload ID Proof Document
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              id="fileUpload"
                              name="idProofDocument"
                            />
                          </div>
                        </div>
                      </div>
                    )}

{modeDetails.transport === 'Car' && (
  <div className="row">
    <div className="col-md-6 mt-3">
      <div className="mb-3 d-flex align-items-start">
        <label htmlFor="accompanyingEmployeeId" id="emplabel" className="form-label">Accompanying Employee ID's </label>
        <input type="text" className="form-control move-right" id="employeeId" name='accompanyingEmployeeId' onChange={onHandleChange} />
      </div>
    </div>

    <div className="col-md-6 mt-3">
      <div className="mb-3 d-flex align-items-start">
        <button
          type="button"
          className="btn btn-warning "
          onClick={addRow}
        >
          <strong>Add</strong>
          <FontAwesomeIcon icon={faPlus} className="mr-2 custom-icon" />
        </button>
      </div>
    </div>

    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <table className="table table-bordered table-sm custom-table " name='carTable' style={{ border: "1px solid black" }}>
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th> {/* Add a new table header for the delete button */}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteRow(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)}


                    {modeDetails.transport === 'Rail' && (
                      <div className="row">
                        <div className="col-md-6 mt-3">
                          <div className="mb-3">
                            <label
                              htmlFor="railwayClass"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Railway Classes
                            </label>
                            <select
                              className="form-select"
                              id="dropdown"
                              value={modeDetails.railwayClass}
                              onChange={handleInputChange}
                              name="railwayClass"
                              required
                            >
                              <option value="" selected disabled>Select</option>
                              <option value="AC Class">AC Class</option>
                              <option value="Non - AC Class">Non - AC Class</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          <div className="mb-3">
                            <label
                              htmlFor="categoryRail"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Category
                            </label>
                            <select
                              className="form-select"
                              id="dropdown"
                              value={modeDetails.categoryRail}
                              onChange={handleInputChange}
                              name="categoryRail"
                              required
                            >
                              <option value="" selected disabled>Select</option>
                              <option value="First Class">First Class</option>
                              <option value="Sleeper Class">Sleeper Class</option>
                              <option value="General Class">General Class</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 mt-2">
                          <div className="mb-3">
                            <label
                              htmlFor="fullNameRail"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employeeId"
                              name="fullNameRail"
                              value={modeDetails.employee_name}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-2">
                          <div className="mb-3">
                            <label
                              htmlFor="age"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Age
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="employeeId"
                              value={modeDetails.age}
                              onChange={handleInputChange}
                              name="age"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-2">
                          <div className="mb-0.5">
                            <label
                              htmlFor="idProof"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              ID Proof
                            </label>
                            <select
                              className="form-select"
                              id="dropdown"
                              value={modeDetails.idProof}
                              name="idProof"
                              onChange={handleInputChange}
                              required
                            >
                              <option value="" selected disabled>Select</option>
                              <option value="Aadhar Card">Aadhar Card</option>
                              <option value="Driving License">Driving License</option>
                              <option value="Pan Card">Pan Card</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 mt-2">
                          <div className="mb-0.5">
                            <label
                              htmlFor="idProofDocument"
                              id="emplabel"
                              className="form-label d-flex align-items-start"
                            >
                              Upload Proof
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              id="fileUpload"
                              name="idProofDocument"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="row">
                      <div class="modeButton">
                        <div className="col-md-6">
                          <div className="mb-3">
                            
                              <button
                                type="submit"
                                className="btn btn-warning"
                                id="submitemp"
                              >
                                Next
                                <FontAwesomeIcon
                                  icon={faArrowRight}
                                  className="mr-2"
                                />
                              </button>
                            
                            <Link to="/user/details">
                              <button
                                type="submit"
                                className="btn "
                                id="editemp"
                              >
                                <FontAwesomeIcon
                                  icon={faArrowLeft}
                                  className="mr-2"
                                />{' '}
                                Back
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelModeForm;
