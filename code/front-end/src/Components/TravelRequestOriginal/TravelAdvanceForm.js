import React, { Component }from 'react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Navigate } from 'react-router-dom';
import NavBar from '../NavBar';

class TravelAdvanceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      selectedAdvance: null,
      changePage: false,
      advanceDetails: {
        comments: '',
        advance: '',
        accomodationAdvanceTransaction: '',
        accomodationAdvanceAmount: '',
        travelAdvanceTransaction: '',
        travelAdvanceAmount: ''
      },
    };
  }

  
  componentDidMount() {
    const storedData = localStorage.getItem('advanceDetails');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.setState({
        advanceDetails: parsedData,
        selectedAdvance: parsedData.advance,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.selectedValue) {
      // User has made a selection, proceed to the next page or take the desired action
      // Replace this with your actual logic to navigate to the next page or perform an action.
      const travelDetailsJSON = JSON.stringify(this.state.advanceDetails);
    localStorage.setItem('advanceDetails', travelDetailsJSON);
    localStorage.setItem('advance', this.state.advanceDetails.advance === 'yes' ? '1' : '0');

    // Calculate the final travel amount and store it in local storage
    const accomodationAmount = parseFloat(this.state.advanceDetails.accomodationAdvanceAmount) || 0;
    const travelAmount = parseFloat(this.state.advanceDetails.travelAdvanceAmount) || 0;
    //const finalTravelAmount = accomodationAmount + travelAmount;
    localStorage.setItem('accomodationAmount', accomodationAmount.toString());
    localStorage.setItem('travelAmount', travelAmount.toString());

    this.setState({ changePage: true });
    } else {
      // No selection made, display a required message
      alert("Please select a advance option.");
    }
    
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      advanceDetails: {
        ...prevState.advanceDetails,
        [name]: value,
      },
    }));
  };

  handleRadioChange = (event) => {
    this.setState({ selectedValue: event.target.value });
    const selectedValue = event.target.value;
    this.setState((prevState) => ({
      selectedAdvance: selectedValue,
      advanceDetails: {
        ...prevState.advanceDetails,
        advance: selectedValue,
      },
    }));
  };

  
  render() {
    const { selectedAdvance,changePage,advanceDetails } = this.state;
    
    if(changePage){
      return (
        <Navigate to="/user/preview"/>
      )
    }
    else{
    return (
        <div id="global-background">
          <NavBar/>
         <div class = "circleController">
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
          {/* <div className="circle-heading-container">
            <div className="circle">
              <div className="line"></div>
              4
            </div>
            <h3 className="heading">Heading</h3>
          </div> */}
          <div className="circle-heading-container">
            <div className="circle yellow last-circle">4</div>
            <h3 className="heading">Advance</h3>
          </div>
      </div>
      </div>
        
        <div className="container">
        <div className="form-container">
          <div className="row">
            <div className="col-md-3">
              <h2 className="form-title"><strong>Opt for Advance</strong></h2>
            </div>
            <div className="col-md-9">
            <form onSubmit={this.handleSubmit} id="insideBox"> 
            <div className="container">
    <div className="row">
        <div className="col-md-4">
            <div className="form-group d-flex align-items-start">
                <label className="form-label me-5" id = "emplabel">Advance</label>
                <div className="d-flex">
                                <div className="form-check me-5">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="advance"
                                        value="yes"
                                        onChange={this.handleRadioChange}
                                        checked={selectedAdvance === 'yes'}
                                    />
                                    <label className="form-check-label" htmlFor="yes">
                                        Yes
                                    </label>
                                </div>
                                <div className="form-check me-5">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="advance"
                                        id="no"
                                        value="no"
                                        onChange={this.handleRadioChange}
                                        checked={selectedAdvance === 'no'}
                                    />
                                    <label className="form-check-label" htmlFor="no">
                                        No
                                    </label>
                                </div>
                            </div>
            </div>
        </div>
    </div>
    {selectedAdvance === 'yes' && (
   <div className="container mt-5">
   <div className="row">
       <div className="col-md-8"> {/* Increase the column width */}
           <table className="table table-bordered table-lg h-110 custom-table" name = 'advanceTable' style={{border : "1px solid black"}}>
               <thead className="thead-dark">
                   <tr>
                       <th>Expense</th>
                       <th>Limit</th>
                       <th>Amount</th>
                       <th>Transaction</th>
                   </tr>
               </thead>
               <tbody>
                   <tr>
                       <td>Accomodation</td>
                       <td>15000</td>
                       <td><input type="text" className="form-control" id="employeeId" onChange={this.handleChange} value={advanceDetails.accomodationAdvanceAmount} name='accomodationAdvanceAmount' required/></td>
                       <td><select className="form-select" id="dropdown" onChange={this.handleChange} value={advanceDetails.accomodationAdvanceTransaction} name='accomodationAdvanceTransaction' required>
                              <option value="" selected disabled>Select</option>
                              <option value="Cash">Cash</option>
                              <option value="Account">Account</option>
                            </select>
                        </td>
                   </tr>
                   <tr>
                       <td>Travel</td>
                       <td>20000</td>
                       <td><input type="text" className="form-control" id="employeeId" onChange={this.handleChange} value={advanceDetails.travelAdvanceAmount} name='travelAdvanceAmount' required/></td>
                       <td> <select className="form-select" id="dropdown" onChange={this.handleChange} value={advanceDetails.travelAdvanceTransaction} name='travelAdvanceTransaction' required>
                              <option value="" selected disabled>Select</option>
                              <option value="Cash">Cash</option>
                              <option value="Account">Account</option>
                            </select>
                      </td>
                   </tr>
               </tbody>
           </table>
       </div>
   </div>
</div>
)}
     <div className="col-md-12 mt-2">
            <div className="mb-0.5">
                <label htmlFor="comments" id='emplabel' className="form-label d-flex align-items-start">Comment</label>
                <input type="text" className="form-control" id="employeeId" name='comments' value={advanceDetails.comments} onChange={this.handleChange}/>
            </div>
    </div>

    <div className="row">
        <div >
            <div className="col-md-6 advanceButton">
                <div className="mb-3">
                    <button type="submit" className="btn btn-warning" id="submitemp">Next 
                        <FontAwesomeIcon icon={faArrowRight} className="mr-2" /> 
                    </button>
                    <Link to="/user/purpose"><button type="button" className="btn " id="editemp">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                    </button></Link>
                </div>
            </div>
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
  }
}

 export default TravelAdvanceForm;
