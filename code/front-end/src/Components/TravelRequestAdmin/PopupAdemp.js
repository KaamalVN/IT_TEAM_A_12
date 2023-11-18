import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
//install npm install react-bootstrap bootstrap//
import './Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default class PopupAdemp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
        };
      }
    
      handleClose = () => {
        this.setState({ show: false });
      };
    
      handleShow = () => {
        this.setState({ show: true });
      };
    
      render() {
        return (
          <>
            <Button variant="primary" onClick={this.handleShow}>
              Show Popup
            </Button>
    
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Body>
              <div className="popup-content">
                <div className="circlep-top"></div>
                <div className="circlep-bottom"></div>
                <div id="iconcircle">
                  <FontAwesomeIcon icon={faCheck} size="3x" style={{ color: '#FFFFFF' }} />
                </div>
               
                <h2>EMPLOYEE ADDED</h2>
                <h4>Emp ID: 101</h4>
                <p>Employee has been Added Successfully!</p>
                <Button id="popupok"
                    variant="warning"
                    onClick={this.handleClose}
                  >
                    Ok
                  </Button>
              </div>
            </Modal.Body>
            </Modal>
          </>
        );
      }
}
