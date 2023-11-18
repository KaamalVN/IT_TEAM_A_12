// Popup.js
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//install npm install react-bootstrap bootstrap//
import './Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class Popup extends Component {
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

        {this.state.show && (
              <div className="popup-containerp">
                <div className="popup-overlayp"></div>
                <Modal
                  show={this.state.show}
                  onHide={this.handleClose}
                  dialogClassName="modal-90w"
                >
                  <Modal.Body>
                    <div className="popup-contentp">
                      <div className="circle-topp"></div>
                      <div className="circle-bottomp"></div>
                      <div id="iconcirclep">
                        <FontAwesomeIcon
                          icon={faCheck}
                          size="3x"
                          style={{ color: '#FFFFFF' }}
                        />
                      </div>
    
                      <h2>SUBMITTED</h2>
                      <h4>Trip No: DTU17TU</h4>
                      <p>Your Request is not submitted</p>
                      <Link to="/user/details">
                      <button
                        id="popupok"
                        variant="warning"
                        onClick={this.handleClose}
                      >
                        Ok
                      </button>
                      </Link>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            )}
      </>
    );
  }
}

export default Popup;
