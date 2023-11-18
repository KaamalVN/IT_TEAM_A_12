import React, { useState,useEffect } from 'react';
import './ProofDeatils.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheckCircle , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import NavBarAd from '../NavBarAd';
const ProofDetails = () => {
  const [proofdata, setproofdata] = useState({
    addemployeePassport: '',
    addemployeedate: '',
    addemppassname: '',
    addempAAdhar: '',
    addempdlnum: '',
    addempPan: '',
  });
  const navigate=useNavigate();
 // const employeeDetails = JSON.parse(localStorage.getItem('employeeDetails'));
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setproofdata({
      ...proofdata,
      [name]: value,
    });
  };
  useEffect(()=>{
    const datas=JSON.parse(localStorage.getItem('ProofDetails'));
    if(datas){
    setproofdata(datas);
    }
    console.log(proofdata);
  },[])
  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   // Combine the proofdata and employeeDetails
  //   const formData = { ...proofdata, ...employeeDetails };

  //   axios
  //     .post('http://localhost:3002/addEmployee', formData)
  //     .then((response) => {
  //       console.log('Server Response:', response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };
const onSubmit = (e) => {
  localStorage.setItem('ProofDetails', JSON.stringify(proofdata));
  navigate("/admin/Emppreview")
}

  return (
    <div id="global-background">
      <NavBarAd />
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
            <div className="circle yellow last-circle">2</div>
            <h3 className="heading">Proof</h3>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="form-container" id="addempformproof">
          <div className="row">
            <div className="col-md-3">
              <h2 className="form-title">
                <strong>Proof</strong>
                <br />
                <strong>Details</strong>
                
              </h2>
            </div>
            <div className="col-md-9">
              <form id="insideBoxproof">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="addemployeePassport"
                        id="addemplabelproof"
                        className="form-label d-flex align-items-start"
                      >
                        Passport Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="addemployeeproof"
                        name="addemployeePassport"
                        value={proofdata.addemployeePassport}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="addemployeedate"
                        id="addemplabelproof"
                        className="form-label d-flex align-items-start"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="addemployeeproof"
                        name="addemployeedate"
                        value={proofdata.addemployeedate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="addemppassname"
                        id="addemplabelproof"
                        className="form-label d-flex align-items-start"
                      >
                        Passport Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addemployeeproof"
                        name="addemppassname"
                        value={proofdata.addemppassname}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="addempAAdhar"
                        id="addemplabelproof"
                        className="form-label d-flex align-items-start"
                      >
                        Aadhar Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="addemployeeproof"
                        name="addempAAdhar"
                        value={proofdata.addempAAdhar}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="addempdlnum"
                        id="addemplabelproof"
                        className="form-label d-flex align-items-start"
                      >
                        DL Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="addemployeeproof"
                        name="addempdlnum"
                        value={proofdata.addempdlnum}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label
                        htmlFor="addempPan"
                        id="addemplabelproof"
                        className="form-label d-flex align-items-start"
                      >
                        PAN Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="addemployeeproof"
                        name="addempPan"
                        value={proofdata.addempPan}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <button
                        type="button"
                        className="btn btn-warning"
                        id="addsubmitempproof"
                        onClick={onSubmit}
                      >
                        Submit
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="mr-2"
                          style={{ marginLeft: '5px' }}
                        />
                      </button>
                    </div>
                    <div >
                      <Link to="/admin/addEmployee">
                    <div className="mb-3">
                      <button
                        type="button"
                        className="btn btn-warning"
                        id="addsubmitempproof"
                        
                      >
                        <FontAwesomeIcon
                          icon={faArrowLeft}
                          className="mr-2"
                          style={{ marginLeft: '5px' }}
                        />
                        Back
                        
                      </button>
                    </div></Link>
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
};

export default ProofDetails;
