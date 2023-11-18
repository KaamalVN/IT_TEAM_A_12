import 'boxicons/css/boxicons.min.css';
import React, { Component } from 'react';
import { Navigate,Link } from 'react-router-dom';
import ellipse from './Ellipse 356.png';
import './NavBar.css';
import veeTechLogo from './image128.png';
import Login from './login';
import user from './user (1).png';
class NavBar extends Component {
  
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
      <div className = "global-background">
        <section className="sidebar">
      {/* <img class="logo" src="src\assests\Ellipse 356.png" /> */}
      <img className="logo2" src={veeTechLogo} />
      <div className="nav-header">
      <i className="bx bx-menu btn-menu" id="menuBtn" onClick={this.handleMenuButtonClick}></i></div>

      <ul className="nav-links">
        <li>
          <Link to="/combined">
          <a href="#">
            <i className="bx bx-taxi"></i>
            <span className="title">Travel Request</span>
          </a>
          </Link>
          <span className="tooltip">Travel Request</span>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-edit"></i>
            <span className="title">Travel Reimbursement</span>
          </a>
          <span className="tooltip">Travel Reimbursement</span>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-globe"></i>
            <span className="title">Broadband </span>
          </a>
          <span className="tooltip">Broadband Reimbursement</span>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-wallet-alt"></i>
            <span className="title">On Board</span>
          </a>
          <span className="tooltip">On Board</span>
        </li>
        <li>
          <a href="#">
            <i className="bx bxs-bell"></i>
            <span className="title">Notification</span>
          </a>
          <span className="tooltip">Notification</span>
        </li>
  
        <li>
          <a href="#">
            <i className="bx bxs-cog"></i>
            <span className="title">Settings</span>
          </a>
          <span className="tooltip">Settings</span>
        </li>
  
        <li>
          <button onClick={this.handleLogout}>
            <i className="bx bx-log-out"></i>
            <span className="title">Log Out</span>
          </button>
          <span className="tooltip">Log Out</span>
        </li>
      </ul>
      <button className="log_out" onClick={this.handleLogout}>Log-out</button>
    </section>

    <div>
      <img className={`ellipse ${this.state.isEllipseMoved ? 'ellipse-moved' : ''}`} class="ellipse" src={ellipse} alt="" />
      <div id='ellipse-heading'>
        TRAVEL<br/>REQUEST
      </div>
    </div>

    <div>
      <span className="profile-text">{localStorage.getItem('email')}</span>
      <span className="profile-id">{localStorage.getItem('userid')}</span>
      <img className="profile" src={user} alt="" />
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
export default NavBar;

