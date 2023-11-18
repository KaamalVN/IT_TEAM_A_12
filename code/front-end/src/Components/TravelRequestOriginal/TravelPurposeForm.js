import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

function TravelPurposeForm() {
  const navigate = useNavigate();
  const [purposeData, setPurposeData] = useState([]);
  const [selectedPurposeId, setSelectedPurposeId] = useState("");
  const [billingData,setbillingData]=useState([]);
  const [selectedBillingEntityId,SetelectedBillingEntityId]=useState("");
  useEffect(() => {
    axios.get("http://localhost:3002/getPurpose")
      .then((response) => {
        setPurposeData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching purpose data:', error);
      });
      axios.get("http://localhost:3002/getBillingEntity")
      .then((responses) => {
        setbillingData(responses.data);
      })
      .catch((error) => {
        console.error('Error fetching purpose data:', error);
      });
      const storedPurposeDetails = JSON.parse(localStorage.getItem('purposeDetails'));
        if (storedPurposeDetails) {
          setSelectedPurposeId(storedPurposeDetails.selectedPurposeId);
          SetelectedBillingEntityId(storedPurposeDetails.selectedBillingEntityId);
        }
  }, []);
  const handlePurposeChange = (e) => {
    const selectedId = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const label = selectedOption.textContent;
    localStorage.setItem("selectedPurposeValue",label );
    setSelectedPurposeId(selectedId);
  };
  const handleBillingChange = (e) => {
    const selectedId = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const label = selectedOption.textContent;
   // console.log("label",label);
  
    localStorage.setItem("selectedBillingEntityId",label);
   
    SetelectedBillingEntityId(selectedId);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const purposeDataJSON = JSON.stringify({
      selectedPurposeId: selectedPurposeId,
      selectedBillingEntityId:selectedBillingEntityId
    });
    localStorage.setItem("purposeDetails", purposeDataJSON);
    navigate("/user/advance");
  };

  return (
    <div id="global-background">
      <NavBar />
      <div className="circleController">
        
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
            <h3 className="heading">Mode</h3>
          </div>
          <div className="circle-heading-container">
            <div className="circle yellow">
              <div className="line yellow"></div>
              3
            </div>
            <h3 className="heading">Purpose</h3>
          </div>
          <div className="circle-heading-container">
            <div className="circle last-circle">4</div>
            <h3 className="heading">Advance</h3>
          </div>
        </div>
      </div>
      </div>
      <div className="container">
        <div className="form-container">
          <div className="row">
            <div className="col-md-3">
              <h2 className="form-title"><strong>Purpose <br/>Of Visit</strong></h2>
            </div>
            <div className="col-md-9">
              <form id="insideBox" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="purposeOfVisit" id="emplabel" className="form-label d-flex align-items-start">Purpose Of Visit</label>
                      <select
                        className="form-select"
                        id="dropdown"
                        name='purposeOfVisit'
                        onChange={handlePurposeChange}
                        value={selectedPurposeId}
                        required
                      >
                        <option value="" disabled>Select</option>
                        {purposeData.map((purpose) => (
                          <option key={purpose.purpose_of_visit_id} value={purpose.purpose_of_visit_id}>
                            {purpose.purpose_of_visit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="billingEntity" id="emplabel" className="form-label d-flex align-items-start">Billing Entity</label>
                      <select className="form-select" id="dropdown" name='billingEntity'onChange={handleBillingChange}
                        value={selectedBillingEntityId} required>
                        <option value="" disabled>Select</option>
                        {billingData.map((billing) => (
                          <option key={billing.billing_entity_id} value={billing.billing_entity_id}>
                            {billing.billing_entity}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div id='purposeButton'>
                    <div className="mb-3">
                      <button type="submit" className="btn btn-warning" id="submitemp">Next  
                        <FontAwesomeIcon icon={faArrowRight} className="mr-2" /> 
                      </button>
                      <Link to="/user/mode">
                        <button type="submit" className="btn " id="editemp">
                          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                        </button>
                      </Link>
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

export default TravelPurposeForm;