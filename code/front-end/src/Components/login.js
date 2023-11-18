import axios from 'axios';
import 'boxicons/css/boxicons.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import frame from './Frame.png';
import './login.css';
import veelogo from './veelogo.png';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3002/login', {
      email: email,
      password: password,
    })
    .then(response => {
      console.log(response.data);
      if (response.data.includes('admin1')) {
        const username = response.data.split('/')[1];
        localStorage.setItem('company_id', username);
        navigate('/admin/EmpHistory', { state: { username: email } });
      }
      else if (response.data === 'admin') {
        navigate('/admin/CompanyHistory', { state: { username: email } });
      }
      else if (response.data === 'Login successful') {
        navigate('/combined', { state: { username: email } });
      }
       else {
        alert("Login Error");
      }
    })
    .catch(error => {
      console.log(error);
    });

    axios.post('http://localhost:3002/userId', {
      email: email,
  })
  .then(response => {
      const data = response.data;
      
      // Store the data in local storage
      localStorage.setItem('email', email);
      localStorage.setItem('userid', data.employeeId); // Assuming 'employeeId' is the key for the employee ID
      localStorage.setItem('approverLevelId', data.approverLevelId); // Assuming 'approverLevelId' is the key for the approver level ID
  
      console.log(data);
  })
  .catch(error => {
      console.error(error);
  });  


    axios.post('http://localhost:3002/loginId', {
      email: email,
    })
    .then(respo => {
      // setUserId(response.data);
      localStorage.setItem('loginId',respo.data);
      // localStorage.setItem('userId', userId);
      //console.log(responses.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    const handleBackNavigation = (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.href = '/';
    };

    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, []);

  return (
    <div>
      <section>
        <div className="register">
          <img id="logo" src={veelogo} alt="Logo" />
          <div className="colLeft">
            <h2 className="i-text" style={{ background: 'white' }}>
              Welcome Back!
            </h2>
            <p>Please enter your contact details to connect.</p>
            <form
              id="form"
              className="flex flex-col"
              onSubmit={handleSubmit}
            >
              <label style={{ background: 'white' }}>Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label style={{ background: 'white' }}>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="bottom">
                <label></label>
                {/* <strong>
                  <a href="#">Forgot password</a>
                </strong> */}
              </div>
              <input type="hidden" name="from" value="login" />
              <button className="btn btn-primary"id="loginsubmit" type="submit">
                Login
              </button>
              <Link to="changePassword">
              <div>
                <p><strong>Forget Password</strong></p>
              </div>
              </Link>
            </form>
          </div>
          <div className="colRight">
            <img id="frntImg" src={frame} alt="Image" />
          </div>
        </div>
      </section>
    </div>
  );
}
