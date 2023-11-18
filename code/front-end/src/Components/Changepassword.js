import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
 faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const customStyles = {
  backgroundColor: '#414141',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

const containerdesign = {
  border: '1.5px solid rgba(255, 211, 0, 1)',
  backgroundColor: '#414141',
};

const inputstyle = {
  border: '1.5px solid black',
};

const password = {
  color: 'rgba(255, 211, 0, 1)',
};

const labelinput = {
  color: 'white',
};

function Changepassword() {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [otp, setOTP] = useState('');
  const [showOTPField, setShowOTPField] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const[enteredOtp,setEnteredOtp] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleReenterPasswordChange = (e) => {
    setReenterPassword(e.target.value);
  };

  const handleEnterButtonClick = (e) => {
    e.preventDefault();
    // Check email validation
    axios.post('http://localhost:3002/changePassword',{
      email:email
    }).then((response) => {
     // console.log(response.data);
     const otpValue = (response.data);
     
     
       // Check if entered OTP matches the received OTP
       setOTP(otpValue);
       setShowOTPField(true);
     
     console.log(response.data+" OTP"+otp);
     // localStorage.setItem('otp',JSON.stringify(response.data));
    }).catch((error) => {
      console.log(error.message);
    });
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setIsValidEmail(false);
      return;
    }

    // Show OTP field
    setShowOTPField(true);
  };

  const handleOTPChange = (e) => {
    // Validate OTP to allow only numbers (0-9) and have a length of 6


    const value = e.target.value;
    if (/^[0-9]*$/.test(value) && value.length === 4) {
        //  setOTP(value);
        setEnteredOtp(value);
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    // Add logic to verify OTP here (you can set a flag or API call)
    // For now, let's assume OTP verification is successful
    // Show password fields
    const check=otp.toString();
    console.log(typeof(check)+" "+typeof(enteredOtp));
    if (check === enteredOtp) {
      setShowPasswordFields(true);
      setShowOTPField(false);
    }
    else{
      alert("Invalid OTP");
    }
  };
const changePass=(e)=>{
  axios.post('http://localhost:3002/updatePassword',{
    email:email,
    password:newPassword
  }).then((response)=>{
    alert("password update succcessfully");
    navigate('/')
  }).catch((error)=>{
    alert("error updating password");
  });
}
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (newPassword !== reenterPassword) {
      alert('Passwords do not match');
      return;
    }

    // Password change logic here
    console.log('New Password:', newPassword);
    console.log('Email:', email);
    // Reset form
    setEmail('');
    setIsValidEmail(true);
    setShowPasswordFields(false);
    setShowOTPField(false);
    setNewPassword('');
    setReenterPassword('');
  };

  return (
    <div style={customStyles}>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card" style={containerdesign}>
              <div className="card-body">
                <h2 className="card-title text-center" style={password}>
                  CHANGE PASSWORD
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label style={labelinput}>Email:</label>
                    <input
                      style={inputstyle}
                      type="email"
                      className={`form-control ${isValidEmail ? '' : 'is-invalid'}`}
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {!isValidEmail && (
                      <div className="invalid-feedback">Please enter a valid email address.</div>
                    )}
                  </div>
                  <br></br>
                  {!showOTPField ? (
                    <button
                      type="button"
                      className="btn btn-warning btn-block"
                      onClick={handleEnterButtonClick}
                    >
                      Enter
                    </button>
                  ) : (
                    <>
                      <div className="form-group">
                        <label style={labelinput}>Enter OTP:</label>
                        <input
                          style={inputstyle}
                          type="text"
                          className="form-control"
                         // value={otp}
                          onChange={handleOTPChange}
                        />
                      </div>
                      <br />
                      <button type="submit" className="btn btn-success btn-block" onClick={handleOTPSubmit}>
                        OK
                      </button>
                    </>
                  )}

                  {showPasswordFields && (
                    <>
                      <div className="form-group">
                        <label style={labelinput}>New Password:</label>
                        <input
                          style={inputstyle}
                          type="password"
                          className="form-control"
                          value={newPassword}
                          onChange={handleNewPasswordChange}
                        />
                      </div>
                      <div className="form-group">
                        <label style={labelinput}>Re-enter Password:</label>
                        <input
                          style={inputstyle}
                          type="password"
                          className="form-control"
                          value={reenterPassword}
                          onChange={handleReenterPasswordChange}
                        />
                      </div>
                      <br />
                      <button type="submit" className="btn btn-warning btn-block" onClick={changePass}> 
                        Change Password
                      </button>
                    </>
                  )}
                  
                </form>
                
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <Link to="/">
        <button
          type="button"
          className="btn btn-warning"
          id="addsubmitcom"
          style={{marginTop: '10%' }}
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
  );
}

export default Changepassword;
