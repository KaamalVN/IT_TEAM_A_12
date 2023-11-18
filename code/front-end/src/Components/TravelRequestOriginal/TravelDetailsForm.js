
// import './EmployeeForm.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

const TravelDetailsForm = () => {
  const [countryData, setCountryData] = useState([]);
  const [stateData,setStateData]=useState([]);
  const [cityData,setCityData]=useState([]);
  const [tripType, set_tripType] = useState('');
  const [country, set_country] = useState(0);
  const [states,setstates]=useState(0);
  const navigate=useNavigate();
  const [travelDetails, setTravelDetails] = useState({
    tripType:'',
    country:'',
    state:'',
    fromCity:'',
    toCity:'',
    departureDate: '',
    departureTime: '',
    returnDate:'',
    returnTime:'',
  });
  const handleSubmit=(e)=>{
    e.preventDefault();
    const travelDetailsJSON = JSON.stringify(travelDetails);
    localStorage.setItem("travelDetails",travelDetailsJSON);
    navigate("/user/mode");
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTravelDetails({
      ...travelDetails,
      [name]: value,
    });
    if(name === 'country'){
      const selectedOption = e.target.options[e.target.selectedIndex];
      const label = selectedOption.textContent;
      localStorage.setItem('country_name',label);
    }
    if(name === 'state'){
      const selectedOption = e.target.options[e.target.selectedIndex];
      const label = selectedOption.textContent;
      localStorage.setItem('state_name',label);
    }
    if(name === 'toCity'){
      const selectedOption = e.target.options[e.target.selectedIndex];
      const label = selectedOption.textContent;
      localStorage.setItem('to_city',label);
    }
    if(name === 'fromCity'){
      const selectedOption = e.target.options[e.target.selectedIndex];
      const label = selectedOption.textContent;
      localStorage.setItem('from_city',label);
    }
  };
  useEffect(() => {
    
    axios.get('http://localhost:3002/countryget')
      .then((response) => {
       // console.log(response.data);
        setCountryData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
      });
      axios.get('http://localhost:3002/stateget')
        .then((response) => {
          setStateData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching country data:', error);
        });
      axios.get('http://localhost:3002/cityget')
        .then((response) => {
          setCityData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching country data:', error);
        });
        const storedTravelDetails = JSON.parse(localStorage.getItem('travelDetails'));
        if (storedTravelDetails) {
          setTravelDetails(storedTravelDetails);
        }
  }, []);
  useEffect(() => {}, [countryData]);
  useEffect(() => {}, [stateData]);
  useEffect(() => {}, [cityData]);
  const countryOptions = countryData.map((country) => {
    if(travelDetails.tripType === 'International' && country.country_id!==101){
      localStorage.setItem("Trip_Type_Id",2);
      return (
        <option key={country.country_id} value={country.country_id}>
          {country.country_name}
        </option>
      )
    }
    else if(travelDetails.tripType === 'Domestic' && country.country_id===101){
      localStorage.setItem("Trip_Type_Id",1);
      return (
        <option key={country.country_id} value={country.country_id}>
        {country.country_name}
      </option>
      )
    }
    
  }

  );
  const stateOptions=stateData.map((state)=>{
  if(state.country_id === parseInt(travelDetails.country)){
    return (
      <option key={state.state_id} value={state.state_id}>
        {state.state}
      </option>
    )
  }

  });

  const cityOptions=cityData.map((city)=>{
    
    if(((city.state_id)) ==(travelDetails.state)){
      return (
        <option key={city.city_id} value={city.city_id}>
          {city.city_name}
        </option>
      )
    }
  })
  const generateCityOptions = () => {
    const selectedFromCityId = parseInt(travelDetails.fromCity);
    const filteredCities = cityData.filter((city) => city.city_id !== selectedFromCityId);

    return filteredCities.map((city) => (
      <option key={city.city_id} value={city.city_id}>
        {city.city_name}
      </option>
    ));
  };
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
  
    // Add leading zeros if needed
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
  }
  
  function getMaxDate() {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 15); // Add 15 days to the current date
  
    const year = maxDate.getFullYear();
    let month = maxDate.getMonth() + 1;
    let day = maxDate.getDate();
  
    // Add leading zeros if needed
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
  
    return `${year}-${month}-${day}`;
  }
  
    const cityoptions = generateCityOptions();
    return (
        <div id="global-background">
          <NavBar/>
         <div class = "circleController">
        <div className="circle-container">
          <div className="circle-heading-container">
            <div className="circle yellow">
              <div className="line yellow"></div>
              1
            </div>
            <h3 className="heading">Details</h3>
          </div>
          <div className="circle-heading-container">
            <div className="circle">
              <div className="line"></div>
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
              <h2 className="form-title"><strong>Travel <br/>Details</strong></h2>
            </div>
            <div className="col-md-9">
            <form id="insideBox" onSubmit={handleSubmit}> 
            <div className="row">
            <div className="col-md-4">
                  <div className="mb-3">
                      <label htmlFor="tripType" id="emplabel" className="form-label d-flex align-items-start">Trip Type</label>
                      <select className="form-select" id="dropdown" name='tripType' onChange={(e)=>{
                          set_tripType(e.target.value);
                          
                          handleInputChange(e)
                      }}
                      value={travelDetails.tripType}
                      required
                      >
                        <option value="" disabled selected>Select</option>
                        <option value="Domestic">Domestic</option>
                        <option value="International">International</option>
                      </select>
                  </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="country" id="emplabel" className="form-label d-flex align-items-start">Country</label>
                  <select className="form-select" id="dropdown" name='country' onChange={(e)=>{
                      set_country(e.target.value);
                      handleInputChange(e);

                  }}
                  value={travelDetails.country}
                  required
                  >
                    <option value="" disabled selected>Select</option>
                    {countryOptions}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="state" id="emplabel" className="form-label d-flex align-items-start">State</label>
                  <select className="form-select" id="dropdown" name='state' onChange={(e)=>{
                    setstates(e.target.value);
                    handleInputChange(e)

                  }
  
                  }
                  value={travelDetails.state}
                  required
                  >
                    {/* <option value="option1">Select</option> */}
                    {/* <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option> */}
                       <option value="" disabled selected>Select</option>
                       {stateOptions}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="fromCity" id="emplabel" className="form-label d-flex align-items-start">From City</label>
                  <select className="form-select" id="dropdown" name='fromCity' value={travelDetails.fromCity} onChange={handleInputChange} required>
                  <option value="" disabled selected>Select</option>
                  {cityOptions}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="departureDate" id="emplabel" className="form-label d-flex align-items-start">Departure Date</label>
                  <input type="date" className="form-control" value={travelDetails.departureDate} id="Date" name='departureDate' onChange={handleInputChange} required min={getCurrentDate()}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="departureTime" id="emplabel" className="form-label d-flex align-items-start">Departure Time</label>
                  <input type="time" className="form-control" value={travelDetails.departureTime} id="employeeId" name='departureTime' onChange={handleInputChange} required/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="toCity" id="emplabel" className="form-label d-flex align-items-start">To City</label>
                  <select className="form-select" id="dropdown" name='toCity' value={travelDetails.toCity} onChange={handleInputChange} required>
                    <option value="option1">Select</option>
                    {cityoptions}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="returnDate" id="emplabel" className="form-label d-flex align-items-start">Return Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="Date"
                    name="returnDate"
                    value={travelDetails.returnDate}
                    onChange={handleInputChange}
                    required
                    min={travelDetails.departureDate}
                    max={getMaxDate()}
                  />

                </div>
                <div className="mb-3">
                  <label htmlFor="returnTime" id="emplabel" className="form-label d-flex align-items-start">Return Time</label>
                  <input type="time" className="form-control" id="employeeId" name='returnTime' value={travelDetails.returnTime} onChange={handleInputChange} required/>
                </div>
                <div className="mb-3">
                  {/* <Link to="/user/mode"> */}
                  <button type="submit" className="btn btn-warning" id="submitemp" >Next 
                    <FontAwesomeIcon icon={faArrowRight} className="mr-2" /> 
                  </button>
                  {/* <button type="submit" className="btn " id="editemp">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                  </button> */}
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

}

 export default TravelDetailsForm;
