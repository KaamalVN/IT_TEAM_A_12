import React, { useState, useEffect } from 'react';
import './Companydetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import NavBarCom from '../NavBarCom';
import {
  faArrowRight,
  faArrowLeft,
  faCheck,
  faCheckCircle,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import CountriesApi from './CountriesApi.json'; // Import your JSON data

function Companydetails() {
  const [formData, setFormData] = useState({
    companyId: '',
    companyName: '',
    companyMail: '',
    companyLogo: '',
    companyAddress: '',
   
    selectedCountry: '',
    selectedState: '',
    selectedCity: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getCountriesOptions = () => {
    return CountriesApi.map((country) => (
      <option key={country.id} value={country.name}>
        {country.name}
      </option>
    ));
  };

  const getStatesOptions = () => {
    const selectedCountryObj = CountriesApi.find(
      (country) => country.name === formData.selectedCountry
    );
    if (selectedCountryObj && selectedCountryObj.states) {
      return selectedCountryObj.states.map((state) => (
        <option key={state.id} value={state.name}>
          {state.name}
        </option>
      ));
    }
    return [];
  };

  const getCitiesOptions = () => {
    const selectedCountryObj = CountriesApi.find(
      (country) => country.name === formData.selectedCountry
    );
    if (selectedCountryObj && selectedCountryObj.states) {
      const selectedStateObj = selectedCountryObj.states.find(
        (state) => state.name === formData.selectedState
      );
      if (selectedStateObj && selectedStateObj.cities) {
        return selectedStateObj.cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ));
      }
    }
    return [];
  };

  // useEffect(() => {
  //   // Save form data to local storage whenever it changes
  //   localStorage.setItem('companyDetails', JSON.stringify(formData));
  // }, [formData]);
  const saveToLocalStorage = () => {
    // Generate companyId based on the first two characters of companyName
    const generatedCompanyId = (formData.companyName.substr(0, 2) + Math.floor(1000 + Math.random() * 9000)).toLowerCase();
  
    // Update formData with the generated companyId
    const updatedFormData = { ...formData, companyId: generatedCompanyId };
  
    // Convert updatedFormData to a JSON string and store in local storage
    localStorage.setItem('companyDetails', JSON.stringify(updatedFormData));
  };
  
  useEffect(() => {
    // Load form data from local storage when the component mounts
    const storedData = JSON.parse(localStorage.getItem('companyDetails'));
    if (storedData) {
      setFormData(storedData);
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
          <div className="circle-heading-container" >
            <div className="circle">
              <div className="line"></div>
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
                <strong>Company<br />Details</strong>
              </h2>
            </div>
            <div className="col-md-9">
              <form id="insideBox">
                <div className="row">
                  <div className="col-md-6">

                    <div className="mb-3">
                      <label
                        htmlFor="addcomname"
                        id="addcomlabel"
                        className="form-label d-flex align-items-start"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addcom"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="addcommail"
                        id="addcomlabel"
                        className="form-label d-flex align-items-start"
                      >
                        Company Mail Id
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addemployee"
                        name="companyMail"
                        value={formData.companyMail}
                        onChange={handleInputChange}
                      />
                    </div>

                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="addempnum"
                        id="addcomlabel"
                        className="form-label d-flex align-items-start"
                      >
                        Company Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addemployee"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="tripType"
                        id="addcomlabel"
                        className="form-label d-flex align-items-start"
                      >
                        State
                      </label>
                      <select
                        className="form-select"
                        id="dropdown"
                        name="selectedState"
                        value={formData.selectedState}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        {getStatesOptions()}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="addcomup"
                        id="addcomlabel"
                        className="form-label d-flex align-items-start"
                      >
                        Company logo
                      </label>
                      <input
                        type="file"
                        id="addcomuploadFile"
                        name="companyLogo"
                        value={formData.companyLogo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="country"
                        id="addcomlabel"
                        className="form-label d-flex align-items-start"
                      >
                        Country
                      </label>
                      <select
                        className="form-select"
                        id="dropdown"
                        name="selectedCountry"
                        value={formData.selectedCountry}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        {getCountriesOptions()}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="tripType"
                        id="addcomlabel"
                        className="form-label d-flex align-items-start"
                      >
                        City
                      </label>
                      <select
                        className="form-select"
                        id="dropdown"
                        name="selectedCity"
                        value={formData.selectedCity}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        {getCitiesOptions()}
                      </select>
                    </div>
                    
                  </div>
        
                  <div className="col-md-6">
                  
                  </div>
                  <div className="mb-3">
                  <Link to="/admin/addCompanyadditional">
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
                    <Link to="/admin/CompanyHistory">
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

export default Companydetails;
