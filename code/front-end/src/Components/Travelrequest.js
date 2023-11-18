import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TravelDetailsForm from './TravelRequestOriginal/TravelDetailsForm';
import TravelModeForm from './TravelRequestOriginal/TravelModeForm';
import TravelPurposeForm from './TravelRequestOriginal/TravelPurposeForm';
import TravelAdvanceForm from './TravelRequestOriginal/TravelAdvanceForm';
import Preview from './TravelRequestOriginal/Preview';
import View from './TravelRequestOriginal/TravelView';
import TravelApprovalRejection from './TravelRequestOriginal/TravelApprovalRejection';
function SubRouting() {
    return (
            <Routes>
            <Route path="/details" element={< TravelDetailsForm/>} />
            <Route path="/mode" element={<TravelModeForm/>} />
            <Route path="/purpose" element={<TravelPurposeForm/>} />
            <Route path="/advance" element={<TravelAdvanceForm/>} />
            <Route path="/preview" element={<Preview/>} />
            <Route path='/view/' element={<View/>}/>
            <Route path='/travelapprovalrejection/' element={<TravelApprovalRejection/>}/>
            </Routes>
    )
}

export default SubRouting
