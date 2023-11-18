import React, { Component } from 'react'
import './NavBar.css'
import 'boxicons/css/boxicons.min.css';
import veeTechLogo from './image128.png'; 
import ellipse from './Ellipse 356.png';
import { Navigate } from 'react-router-dom';
import user from './user (1).png'
import Login from './login';
export default class NavBarCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isEllipseMoved: false,
          isLoggedIn: true,
        };
      }
    
      handleMenuButtonClick = () => {
        const side_bar = document.querySelector(".sidebar");
        const logo2 = document.querySelector(".logo2");
        const ellipseHeading = document.querySelector("#ellipse-heading");
      
        side_bar.classList.toggle("expand");
        logo2.classList.toggle("hidden");
     

        const currentWidth = parseInt(logo2.style.width, 10) || 50;
        const newWidth = currentWidth === 50 ? 150 : 50;
    
        const currentHeight = parseInt(logo2.style.height, 10) || 50;
        const newHeight = currentHeight === 50 ? 80 : 50;
    
        let currentLeft = "8%";
        if (ellipseHeading.style.left) {
          currentLeft = ellipseHeading.style.left;
        }
    
        // Update the newLeft based on the current position
        const newLeft = currentLeft === "8%" ? "23%" : "8%";
    
        logo2.style.width = `${newWidth}px`;
        logo2.style.height = `${newHeight}px`;
        ellipseHeading.style.left = newLeft;
    
        this.setState(prevState => ({
          isEllipseMoved: !prevState.isEllipseMoved,
        }));
        };
        handleLogout = (e) =>{
          localStorage.clear();
          this.setState({ isLoggedIn: false });
          return (<Login />);
        }
        render() {
          const userId = localStorage.getItem('userid');
            const ellipseClassName = `ellipse ${this.state.isEllipseMoved ? 'ellipse-moved' : ''}`;
            if (this.state.isLoggedIn) {return (
              <div class = "global-background">
                <section class="sidebar">
              {/* <img class="logo" src="src\assests\Ellipse 356.png" /> */}
              <img class="logo2" src={veeTechLogo} />
              <div className="nav-header">
              <i className="bx bx-menu btn-menu" id="menuBtn" onClick={this.handleMenuButtonClick}></i></div>
        
              <ul class="nav-links">
                <li>
                  <a href="/admin/CompanyHistory">
                    <i class="bx bx-briefcase"></i>
                    <span class="title">Company History</span>
                  </a>
                  <span class="tooltip">Company History</span>
                </li>
                {/* <li>
                  <a href="#">
                    <i class="bx bx-edit"></i>
                    <span class="title">Travel Reimbursement</span>
                  </a>
                  <span class="tooltip">Travel Reimbursement</span>
                </li>
                <li>
                  <a href="#">
                    <i class="bx bx-globe"></i>
                    <span class="title">Broadband </span>
                  </a>
                  <span class="tooltip">Broadband Reimbursement</span>
                </li>
                <li>
                  <a href="#">
                    <i class="bx bx-wallet-alt"></i>
                    <span class="title">On Board</span>
                  </a>
                  <span class="tooltip">On Board</span>
                </li>
                <li>
                  <a href="#">
                    <i class="bx bxs-bell"></i>
                    <span class="title">Notification</span>
                  </a>
                  <span class="tooltip">Notification</span>
                </li>
          
                <li>
                  <a href="#">
                    <i class="bx bxs-cog"></i>
                    <span class="title">Settings</span>
                  </a>
                  <span class="tooltip">Settings</span>
                </li> */}
          
                <li>
                <button onClick={this.handleLogout}>
                  <i className="bx bx-log-out"></i>
                  <span className="title">Log Out</span>
                </button>
                <span className="tooltip">Log Out</span>
              </li>
              </ul>
              <button class="log_out" onClick={this.handleLogout}>Log-out</button>
            </section>
        
            <div>
              <img className={`ellipse ${this.state.isEllipseMoved ? 'ellipse-moved' : ''}`} class="ellipse" src={ellipse} alt="" />
              <div id='ellipse-heading' style={{marginTop:8,marginLeft:-10}} >
                COMPANY <br></br>HISTORY
              </div>
            </div>
        
         
            <div>
            <span class="profile-text">{localStorage.getItem('email')}</span>
            <span className="profile-id">
            {userId !== "undefined" ? userId : "Admin"}
            </span>
            <img class="profile" src={user} alt="" />
            </div>
            </div>
            
            
            )}
            else {
              return (
                <Navigate to="/"></Navigate>
              )
            }
          }
}
export const getEllipseClassName = (isEllipseMoved) => {
    return `ellipse ${isEllipseMoved ? 'ellipse-moved' : ''}`;
  };