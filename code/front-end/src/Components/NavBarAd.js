import React, { Component } from 'react'
import './NavBar.css'
import 'boxicons/css/boxicons.min.css';
import veeTechLogo from './image128.png'; 
import { Navigate,Link } from 'react-router-dom';
import Login from './login';
import ellipse from './Ellipse 356.png';
import user from './user (1).png'
export default class NavBarAd extends Component {
    
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
        const ellipseClassName = `ellipse ${this.state.isEllipseMoved ? 'ellipse-moved' : ''}`;
        if (this.state.isLoggedIn) {
        return (
          <div class = "global-background">
            <section class="sidebar">
          {/* <img class="logo" src="src\assests\Ellipse 356.png" /> */}
          <img class="logo2" src={veeTechLogo} />
          <div className="nav-header">
          <i className="bx bx-menu btn-menu" id="menuBtn" onClick={this.handleMenuButtonClick}></i></div>
    
          <ul class="nav-links">
            <li>
              <a href="/admin/Emphistory">
                <i class="bx bx-user"></i>
                <span class="title">Employee History</span>
              </a>
              <span class="tooltip">Employee History</span>
            </li>
            <li>
              <a href="/admin/Empmodifycompany">
                <i class="bx bx-edit"></i>
                <span class="title">Modify Company</span>
              </a>
              <span class="tooltip">Modify Company</span>
            </li>
            <li>
              <a href="/admin/Empmodifyapprover">
                <i class="bx bx-globe"></i>
                <span class="title">Modify Approver Levels </span>
              </a>
              <span class="tooltip">Modify Approver Levels</span>
            </li>
            <li>
              <a href="/admin/Empmodifydesignation">
                <i class="bx bx-wallet-alt"></i>
                <span class="title">Modify Designation Levels</span>
              </a>
              <span class="tooltip">Modify Designation Levels</span>
            </li>
            <li>
              <a href="/admin/Empmodifybillingentity">
                <i class="bx bxs-bell"></i>
                <span class="title">Modify Billing Entity</span>
              </a>
              <span class="tooltip">Modify Billing Entity</span>
            </li>
      
            <li>
              <a href="/admin/Empmodifydepartment">
                <i class="bx bxs-cog"></i>
                <span class="title">Modify Departments</span>
              </a>
              <span class="tooltip">Modify Departments</span>
            </li>

            <li>
              <a href="/admin/Empmodifypurposeofvisit">
                <i class="bx bxs-cog"></i>
                <span class="title">Modify Visit Purposes</span>
              </a>
              <span class="tooltip">Modify Visit Purposes</span>
            </li>
      
            <li>
              <button onClick={this.handleLogout}>
                <i class="bx bx-log-out"></i>
                <span class="title">Log Out</span>
              </button>
              <span class="tooltip">Log Out</span>
            </li>
          </ul>
          <button class="log_out" onClick={this.handleLogout}>Log-out</button>
        </section>
    
        <div>
          <img className={`ellipse ${this.state.isEllipseMoved ? 'ellipse-moved' : ''}`} class="ellipse" src={ellipse} alt="" />
          <div id='ellipse-heading' style={{marginTop:8,marginLeft:-10}} >
            EMPLOYEE <br></br>HISTORY
          </div>
        </div>
    
     
        <div>
          <span class="profile-text">{localStorage.getItem('email')}</span>
          <span class="profile-id">{localStorage.getItem('userid')}</span>
          <img class="profile" src={user} alt="" />
        </div>
        </div>
        
        
        )
        }
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