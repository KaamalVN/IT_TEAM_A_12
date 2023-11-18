import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Employeedetails from './TravelRequestAdmin/Employeedetails';
import ProofDetails from './TravelRequestAdmin/ProofDetails';
import EmpPreview from './TravelRequestAdmin/EmpPreview';
import Companydetails from './TravelRequestAdmin/Companydetails';
import ComPreview from './TravelRequestAdmin/ComPreview';
import Emphistory from './TravelRequestAdmin/Emphistory';
import Comhistory from './TravelRequestAdmin/Comhistory';
import ComAdminDetails from './TravelRequestAdmin/ComAdminDetails';
import Bulkupload from './TravelRequestAdmin/Bulkupload';
import CompanyAdditional from './TravelRequestAdmin/CompanyAdditional';
import Empmodifycompany from './TravelRequestAdmin/Empmodifycompany';
import EmpModifyApprover from './TravelRequestAdmin/Empmodifyapprover';
import EmpModifyBillingentity from './TravelRequestAdmin/Empmodifybillingentity';
import EmpModifyDepartment from './TravelRequestAdmin/Empmodifydepartment';
import EmpModifyDesignation from './TravelRequestAdmin/Empmodifydesignation';
import EmpModifyPurposeofvisit from './TravelRequestAdmin/Empmodifypurposeofvisit';
import EmpAddApprover from './TravelRequestAdmin/Empaddapprover';
import EmpAddDesignation from './TravelRequestAdmin/Empadddesignation';
import EmpAddBillingentity from './TravelRequestAdmin/Empaddbillingentity';
import EmpAddDepartment from './TravelRequestAdmin/Empadddepartment';
import EmpAddPurposeofvisit from './TravelRequestAdmin/Empaddpurposeofvisit';
import EmpModify from './TravelRequestAdmin/Empmodify';
function AdminSubrouting() {
    return (
       
            <Routes>
                <Route path="/Emphistory" element={<Emphistory />} />
                <Route path="/Empmodify" element={<EmpModify/>}/>
                <Route path="/addEmployee" element={<Employeedetails />} />
                <Route path="/addProof" element={<ProofDetails />} />
                <Route path="/Emppreview" element={<EmpPreview />} />
                <Route path='/Empmodifycompany' element={<Empmodifycompany/>}/>
                <Route path="/Empmodifyapprover" element={<EmpModifyApprover />} />
                <Route path='/Empaddapprover' element={<EmpAddApprover/>}/>
                <Route path="/Empmodifydesignation" element={<EmpModifyDesignation />} />
                <Route path="/Empadddesignation" element={<EmpAddDesignation/>}/>
                <Route path="/Empmodifybillingentity" element={<EmpModifyBillingentity />} />
                <Route path="/Empaddbillingentity" element={<EmpAddBillingentity/>}/>
                <Route path="/Empmodifydepartment" element={<EmpModifyDepartment />} />
                <Route path="/Empadddepartment" element={<EmpAddDepartment/>}/>
                <Route path="/Empmodifypurposeofvisit" element={<EmpModifyPurposeofvisit />} />
                <Route path="/Empaddpurposeofvisit" element={<EmpAddPurposeofvisit/>}/>
                <Route path="/bulkUpload" element={<Bulkupload />} />
                <Route path="/CompanyHistory" element={<Comhistory />} />
                <Route path="/addCompany" element={<Companydetails />} />
                <Route path="/addCompanyadditional" element={<CompanyAdditional/>} />
                <Route path="/addCompanypg2" element={<ComAdminDetails />} />
                <Route path="/Companypreview" element={<ComPreview />} />
            </Routes>
       
    );
}
export default AdminSubrouting