const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
let approverToStatusMapping = {};
let companydetails=[];
function generateRandom4DigitNumber() {
  const min = 1000; // The minimum 4-digit number
  const max = 9999; // The maximum 4-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandom2DigitNumber() {
  const min = 10; // The minimum 4-digit number
  const max = 99; // The maximum 4-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateUniqueDesignationId() {
  // Generate a random three-digit number as the designation_id
  const min = 100;
  const max = 999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateUniqueStatusId() {
  // Generate a random three-digit number as the approver_level_id
  const min = 100;
  const max = 999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateRandomDepartmentId() {
  // Generate a random number between 100 and 999 (inclusive)
  return Math.floor(100 + Math.random() * 900);
}
function generateUniqueBillingEntityId() {
  const min = 100;
  const max = 999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateUniqueDepartmentId() {
  const min = 100;
  const max = 999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateUniquePurposeOfVisitId() {
  const min = 100;
  const max = 999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'VeeTech'
});
var transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
      user: 'abhindra.20it@sonatech.ac.in',
      pass: 'abhi123abhI'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = `SELECT * FROM login_table WHERE email = ? AND password = ?`;

    connection.query(query, [email, password], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.send('An error occurred');
        } 
        else {
            console.log('Query results:', results);
            console.log(results[0].email);
            if (results[0].email == "admin@gmail.com") {
                console.log("Logged in as Product Admin");
                res.send('admin');
            } else if (results.length > 0) {
                const qu = `SELECT designation_id, company_id FROM employee_table WHERE mail = ?`;
                connection.query(qu, [email], (error1, results1) => {
                    if (error1) {
                        console.error('Error executing query:', error1);
                        res.send('An error occurred');
                    } else {
                        const designationId = results1[0].designation_id;
                        
                        // Add a SQL query to fetch the designation_name from the designation_table
                        const designationQuery = 'SELECT designation_name FROM designation_table WHERE id = ?';

                        connection.query(designationQuery, [designationId], (error2, results2) => {
                            if (error2) {
                                console.error('Error executing designation query:', error2);
                                res.send('An error occurred');
                            } else {
                                const designationName = results2[0].designation_name.toLowerCase();

                                if (designationName == "admin") {
                                    console.log("Login Success as Company Admin");
                                    const companyId = results1[0].company_id;
                                    res.send("admin1/" + companyId);
              
                                } else {
                                    res.send(`Login successful`);
                                    console.log("Login Successfull");
                                }
                            }
                        });
                    }
                });
            } 
            else {
                res.send('Invalid email or password');
                console.log("Login Not Successful");
            }
        }
    });
});



app.post('/userid', (req, res) => {
    const email = req.body.email;

    const employeeIdQuery = `SELECT employee_id, approver_level_id FROM employee_table WHERE mail = ?`;
    
    connection.query(employeeIdQuery, [email], (error, results) => {
        if (error) {
            console.error('Error executing employee ID query:', error);
            //res.status(500).send('An error occurred while fetching employee ID');
        } else {
            if (results.length > 0) {
                const employeeId = results[0].employee_id;
                const approverLevelId = results[0].approver_level_id;

                // Create a response JSON object that includes employeeId and approverLevelId
                const response = {
                    employeeId: employeeId,
                    approverLevelId: approverLevelId
                };

                uiid = employeeId;
                res.json(response);

                console.log(`Employee ID: ${employeeId}`);
                console.log(`Approver Level ID: ${approverLevelId}`);
            } else {
                res.send('error');
                console.log('Email not found in employee table');
            }
        }
    });
});

app.post('/loginId', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    const idQuery = `SELECT id FROM employee_table WHERE mail = ?`;

    connection.query(idQuery, [email], (error, results) => {
        if (error) {
            console.error('Error executing ID query:', error);
            return res.status(500).send('An error occurred while fetching ID');
        } else {
            if (results.length > 0) {
                const id = results[0].id;
                //res.send(id);
                console.log(`ID: ${id}`);
                res.json(id);
            } else {
                res.status(404).send('Email not found in employee table');
            }
        }
    });
});


app.get("/countryget", (req, res) => {
    // Query the database to retrieve data from country_table
    const query = "SELECT country_id, country_name FROM country_table";
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying the database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        
      
        const countryData = {};
        results.forEach((row) => {
            countryData[row.country_id] = row.country_name;
        });

        // Send the JSON response
     //   console.log(countryData);
     res.send(results);
        //res.json(countryData);
    });
});
app.get("/stateget", (req, res) => {
    // Query the database to retrieve data from country_table
    const query = "SELECT state_id, state,country_id FROM state_table";
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying the database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        
      
        const stateData = {};
        results.forEach((row) => {
            stateData[row.state_id] = row.state;
        });

        // Send the JSON response
     //   console.log(countryData);
     res.send(results);
        //res.json(countryData);
    });
});
app.get("/cityget", (req, res) => {
    // Query the database to retrieve data from country_table
    const query = "SELECT city_id, city_name,state_id FROM city_table";
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error querying the database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        
      
        const cityData = {};
        results.forEach((row) => {
            cityData[row.city_id] = row.city_name;
        });

        // Send the JSON response
     //   console.log(countryData);
     res.send(results);
        //res.json(countryData);
    });
});

app.post("/employee_details", (req, res) => {
    //console.log(uiid);
const uid=req.body.uid;
    const query = "SELECT * FROM employee_table WHERE employee_id = ?";
    const employeeId = uid; // Assuming uid contains the employee_id

    connection.query(query, [employeeId], (err, results) => {
        if (err) {
            console.error('Error querying the database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        //console.log(results);
        if (results.length >0 ) {
            const employeeDetails = results[0];
            //console.log(employeeDetails);
            res.send(employeeDetails);
            //res.json(employeeDetails);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    });
});
app.get("/getPurpose",(req,res)=>{
    const query="SELECT purpose_of_visit_id,purpose_of_visit from  purpose_of_visit_table";
    connection.query(query,(err,results)=>{
        if (err) {
            console.error('Error querying the database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }    
        const purposeData={};
        results.forEach((row)=>{
            purposeData[row.purpose_of_visit_id]=row.purpose_of_visit;
        })
        res.send(results);
    })
})
app.get("/getBillingEntity",(req,res)=>{
    const query="SELECT billing_entity_id,billing_entity from billing_entity_table";
    connection.query(query,(err,results)=>{
        if (err) {
            console.error('Error querying the database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        const billingData={};
        results.forEach((row)=>{
            billingData[row.billing_entity_id]=row.billing_entity;
        })
        res.send(results);
    })
})


app.post("/travel_details", (req, res) => {
    const uid = req.body.uid;
   
    // Assuming you have an 'employee_table' with a 'user_id' column
    const getEmployeeIdQuery = "SELECT id FROM employee_table WHERE employee_id = ?";
  
    connection.query(getEmployeeIdQuery, [uid], (err, employeeResults) => {
      if (err) {
        console.error('Error querying the database for employee ID: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
  
      if (employeeResults.length === 0) {
        console.error('Employee not found in the database.');
        res.status(404).json({ error: 'Employee not found' });
        return;
      }
  
      // Assuming the result contains the user_id
      const userId = employeeResults[0].id;
      console.log('userid',userId);
  
      // Modify the query to include joins with other tables for debugging fields
      const query = `
      SELECT
      travel_request_table.id,
      travel_request_table.trip_id,
      travel_request_table.departure_date,
      travel_request_table.departure_time,
      travel_request_table.return_date,
      travel_request_table.return_time,
      travel_request_table.accompanying_count,
      travel_request_table.opt_for_advance,
      travel_request_table.adv_accomodation_amount,
      travel_request_table.adv_travel_amount,
      travel_request_table.employee_id,
      purpose_of_visit_table.purpose_of_visit,
      billing_entity_table.billing_entity,
      travel_mode_table.travel_mode,
      status_table.status,
      employee_table.employee_id AS rejector_id,
      travel_request_table.rejector_remark,
      travel_request_table.accomodation_address,
      travel_request_table.ticket_details,
      ct_from.city_name AS from_city_name,
      ct_to.city_name AS to_city_name,
      trip_type_table.trip_type
      FROM travel_request_table
      LEFT JOIN purpose_of_visit_table ON travel_request_table.purpose_of_visit_id = purpose_of_visit_table.id
      LEFT JOIN billing_entity_table ON travel_request_table.billing_entity_id = billing_entity_table.id
      LEFT JOIN travel_mode_table ON travel_request_table.travel_mode_id = travel_mode_table.id
      LEFT JOIN status_table ON travel_request_table.status_id = status_table.id
      LEFT JOIN employee_table ON travel_request_table.rejector_id=employee_table.id
      LEFT JOIN city_table ct_from ON travel_request_table.from_city_id = ct_from.city_id
      LEFT JOIN city_table ct_to ON travel_request_table.to_city_id = ct_to.city_id
      LEFT JOIN trip_type_table ON travel_request_table.trip_type = trip_type_table.trip_type_id
      WHERE travel_request_table.employee_id = ?
      `;
  
      connection.query(query, [userId], (err, travelResults) => {
        if (err) {
          console.error('Error querying the database for travel data: ' + err.stack);
          res.status(500).json({ error: 'Database error' });
          return;
        }
        //console.log(travelResults);
        res.send(travelResults);
      });
    });
  });

  app.post("/travel_request_details", (req, res) => {
    const tripId = req.body.tripid;
    //console.log(tripId);
    // Modify the query to retrieve travel request details based on the trip ID
    const query = `
      SELECT
      travel_request_table.id,
      travel_request_table.trip_id,
      travel_request_table.departure_date,
      travel_request_table.departure_time,
      travel_request_table.return_date,
      travel_request_table.return_time,
      travel_request_table.accompanying_count,
      travel_request_table.opt_for_advance,
      travel_request_table.adv_accomodation_amount,
      travel_request_table.adv_travel_amount,
      travel_request_table.travel_comment,
      travel_request_table.employee_id,
      purpose_of_visit_table.purpose_of_visit,
      billing_entity_table.billing_entity,
      travel_mode_table.travel_mode,
      status_table.status,
      employee_table.employee_id AS rejector_id,
      travel_request_table.rejector_remark,
      travel_request_table.accomodation_address,
      travel_request_table.ticket_details,
      ct_from.city_name AS from_city_name,
      ct_to.city_name AS to_city_name,
      trip_type_table.trip_type
      FROM travel_request_table
      LEFT JOIN purpose_of_visit_table ON travel_request_table.purpose_of_visit_id = purpose_of_visit_table.id
      LEFT JOIN billing_entity_table ON travel_request_table.billing_entity_id = billing_entity_table.id
      LEFT JOIN travel_mode_table ON travel_request_table.travel_mode_id = travel_mode_table.id
      LEFT JOIN status_table ON travel_request_table.status_id = status_table.id
      LEFT JOIN employee_table ON travel_request_table.rejector_id=employee_table.id
      LEFT JOIN city_table ct_from ON travel_request_table.from_city_id = ct_from.city_id
      LEFT JOIN city_table ct_to ON travel_request_table.to_city_id = ct_to.city_id
      LEFT JOIN trip_type_table ON travel_request_table.trip_type = trip_type_table.trip_type_id
      WHERE travel_request_table.trip_id = ?
    `;
  
    connection.query(query, [tripId], (err, travelResults) => {
      if (err) {
        console.error('Error querying the database for travel data: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
  
      if (travelResults.length === 0) {
        console.error('Travel request not found in the database.');
        res.status(404).json({ error: 'Travel request not found' });
        return;
      }
  
      console.log('travelResults'+travelResults);
      res.send(travelResults);
      
    });
  });
  
  
  app.post("/Submit", (req, res) => {
    // Extract data from the request
    const trip_type = req.body.trip_type;
    const departure_date = req.body.departure_date;
    const departure_time = req.body.departure_time;
    const return_date = req.body.return_date;
    const return_time = req.body.return_time;
    const accompanying_count = req.body.accompanying_count;
    const opt_for_advance = req.body.opt_for_advance;
    const accomodationAmount = req.body.accomodationAmount;
    const travelAmount = req.body.travelAmount;
    const railwayClass = req.body.railwayClass;
    const categoryRail = req.body.categoryRail;
    const comments = req.body.comments;
    const employee_id = req.body.employee_id;
    const purpose_of_visit_id = req.body.purpose_of_visit_id;
    const billing_entity_id = req.body.billing_entity_id;
    const travel_mode = req.body.travel_mode_id;
    let status_id=1;

    // Find the first right value
    for (const key in approverToStatusMapping) {
        status_id = approverToStatusMapping[key];
        break;
      
    }
    const from_city_id = req.body.from_city_id;
    const to_city_id = req.body.to_city_id;
    var travel_mode_id = 0;
    if(travel_mode === 'Rail'){ travel_mode_id = 4; }
    if(travel_mode === 'Air'){ travel_mode_id = 1; }
    if(travel_mode === 'Car'){ travel_mode_id = 2; }
    if(travel_mode === 'Bus'){ travel_mode_id = 3; }
    //console.log(travel_mode)

    // Create the INSERT query without specifying id
    const insertQuery = `
        INSERT INTO travel_request_table 
        (departure_date, departure_time, return_date, return_time, accompanying_count, opt_for_advance, adv_accomodation_amount,adv_travel_amount,railway_class,railway_category,travel_comment, employee_id, purpose_of_visit_id, billing_entity_id, travel_mode_id, status_id, from_city_id, to_city_id, trip_type) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the insert query without specifying id
    connection.query(insertQuery, [departure_date, departure_time, return_date, return_time, accompanying_count, opt_for_advance, accomodationAmount,travelAmount,railwayClass,categoryRail,comments, employee_id, purpose_of_visit_id, billing_entity_id, travel_mode_id, status_id, from_city_id, to_city_id, trip_type], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            // Handle the error response
            res.status(500).send('An error occurred while inserting data');
        } else {
            // Retrieve the auto-generated id
            const generatedId = results.insertId;

            // Update the trip_id with the same value as the generated id
            const updateQuery = `
                UPDATE travel_request_table
                SET trip_id = ?
                WHERE id = ?
            `;

            connection.query(updateQuery, [generatedId, generatedId], (updateError, updateResults) => {
                if (updateError) {
                    console.error('Error updating trip_id:', updateError);
                    // Handle the error response
                    res.status(500).send('An error occurred while updating trip_id');
                } else {
                    // Data inserted successfully
                    res.send("Data inserted successfully");
                }
            });
        }
    });
});


app.post("/team_travel_request_details", (req, res) => {
  const uid = req.body.uid;
  const approverLevelId = req.body.approverLevelId;
    // Assuming you have an 'employee_table' with a 'user_id' column
    const getEmployeeIdQuery = "SELECT id FROM employee_table WHERE employee_id = ?";
  
    connection.query(getEmployeeIdQuery, [uid], (err, employeeResults) => {
      if (err) {
        console.error('Error querying the database for employee ID: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      if (employeeResults.length === 0) {
        console.error('Employee not found in the database.');
        res.status(404).json({ error: 'Employee not found' });
        return;
      }
  
      // Assuming the result contains the user_id
      
  // Get the `employee_id` from the request body
  const employeeId = employeeResults[0].id;

  const getCompanyQuery = "SELECT company_id FROM employee_table WHERE id = ?";

  connection.query(getCompanyQuery, [employeeId], (err, companyResults) => {
    if (err) {
      console.error('Error querying the database for company ID: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
  
    if (companyResults.length === 0) {
      console.error('Company ID not found for the employee.');
      res.status(404).json({ error: 'Company ID not found' });
      return;
    }
  
    const companyId = companyResults[0].company_id;
  
    // Step 1: Fetch and store the start and end IDs of approver_table for the current company

        const statusId = approverToStatusMapping[approverLevelId];
        const findEmployeeIdsQuery = `
        SELECT employee_id
        FROM approver_mapping_table
        WHERE approver_employee_id = ?;
      `;
      // Step 2: Retrieve travel request details for the selected employee IDs with `status_id` equal to 2
      const getTravelRequestDetailsQuery = `
      SELECT
      travel_request_table.id,
      travel_request_table.trip_id,
      travel_request_table.departure_date,
      travel_request_table.departure_time,
      travel_request_table.return_date,
      travel_request_table.return_time,
      travel_request_table.accompanying_count,
      travel_request_table.opt_for_advance,
      travel_request_table.adv_accomodation_amount,
      travel_request_table.adv_travel_amount,
      travel_request_table.travel_comment,
      travel_request_table.employee_id,
      purpose_of_visit_table.purpose_of_visit,
      billing_entity_table.billing_entity,
      travel_mode_table.travel_mode,
      status_table.status,
      employee_table.employee_id AS rejector_id,
      travel_request_table.rejector_remark,
      travel_request_table.accomodation_address,
      travel_request_table.ticket_details,
      ct_from.city_name AS from_city_name,
      ct_to.city_name AS to_city_name,
      trip_type_table.trip_type
      FROM travel_request_table
      LEFT JOIN purpose_of_visit_table ON travel_request_table.purpose_of_visit_id = purpose_of_visit_table.id
      LEFT JOIN billing_entity_table ON travel_request_table.billing_entity_id = billing_entity_table.id
      LEFT JOIN travel_mode_table ON travel_request_table.travel_mode_id = travel_mode_table.id
      LEFT JOIN status_table ON travel_request_table.status_id = status_table.id
      LEFT JOIN employee_table ON travel_request_table.rejector_id=employee_table.id
      LEFT JOIN city_table ct_from ON travel_request_table.from_city_id = ct_from.city_id
      LEFT JOIN city_table ct_to ON travel_request_table.to_city_id = ct_to.city_id
      LEFT JOIN trip_type_table ON travel_request_table.trip_type = trip_type_table.trip_type_id
      WHERE travel_request_table.status_id=? AND travel_request_table.employee_id IN (?);
      `;
    
      // Execute the queries one after the other
      // Step 1: Find employee IDs
      connection.query(findEmployeeIdsQuery, [employeeId], (err, employeeIdsResults) => {
        if (err) {
          console.error('Error querying the database for employee IDs: ' + err.stack);
          res.status(500).json({ error: 'Database error' });
          return;
        }
        // Extract employee IDs from the results
        const employeeIds = employeeIdsResults.map((row) => row.employee_id);
        console.log(employeeIds);
      if (employeeIds.length === 0) {
        console.error('No eligible employees found.');
        res.status(404).json({ error: 'No eligible employees found' });
        return;
      }
    
        // Step 2: Retrieve travel request details for the selected employee IDs with `status_id` equal to 2
        connection.query(getTravelRequestDetailsQuery, [statusId, employeeIds], (err, travelResults) => {
          if (err) {
            console.error('Error querying the database for travel request details: ');
            res.status(500).json({ error: 'Database error' });
            return;
          }
    
          // Send the travel request details to the client
          res.json(travelResults);
          //console.log(travelResults);
        });
      });
  
      });
    });
  });

  
app.post('/approve', (req, res) => {
  // Retrieve data from the request body
  const tripId = req.body.tripId;
  const approverLevelId = req.body.approverLevelId;
  const accomodationAddress = req.body.accomodationAddress; // Retrieve the accomodation_address from the request body
  const ticketAddress = req.body.ticketAddress;
  for (const key in approverToStatusMapping) {
    approverToStatusMapping[key]++;
  }

  // Use the mapping to determine the status
  const statusId = approverToStatusMapping[approverLevelId];

  // Define the SQL query to update the status_id and accomodation_address
  const sql = 'UPDATE travel_request_table SET status_id = ?, accomodation_address = ?, ticket_details = ? WHERE trip_id = ?';

  // Execute the SQL query with the tripId, statusId, and accomodationAddress
  connection.query(sql, [statusId, accomodationAddress, ticketAddress, tripId], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Data updated successfully');
      res.json({ message: 'Data updated successfully' });
    }
  });
});



app.post('/reject', (req, res) => {
  // Retrieve data from the request body
  const tripId = req.body.tripId;
  const uid = req.body.uid; // User ID of the rejector
  const rejectorRemark = req.body.rejector_remark; // Rejector's remark

  // Define a SQL query to retrieve the employee ID from the employee_table
  const employeeIdQuery = 'SELECT id FROM employee_table WHERE employee_id = ?';

  // Execute the SQL query to retrieve the employee ID
  connection.query(employeeIdQuery, [uid], (err, employeeResult) => {
    if (err) {
      console.error('Error retrieving employee ID:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (employeeResult.length === 0) {
        // Employee not found with the provided employee_id
        res.status(404).json({ error: 'Employee not found' });
      } else {
        // Get the employee's ID from the query result
        const employeeId = employeeResult[0].id;
        // Define the SQL query to update the status_id based on the last value in approverToStatusMapping
        const statusIds = Object.values(approverToStatusMapping); // Extract status values
        let lastStatusId = Math.max(...statusIds); // Find the maximum status value
        lastStatusId += 2;

        // Define the SQL query to update the travel_request_table
        const sql = `
          UPDATE travel_request_table
          SET status_id = ?,
              rejector_id = ?,
              rejector_remark = ?
          WHERE trip_id = ?
        `;

        // Execute the SQL query with the tripId, lastStatusId, employeeId, rejectorRemark
        connection.query(sql, [lastStatusId, employeeId, rejectorRemark, tripId], (updateErr, result) => {
          if (updateErr) {
            console.error('Error updating data:', updateErr);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            console.log('Data updated successfully');
            res.json({ message: 'Data updated successfully' });
          }
        });
      }
    }
  });
});




app.post('/status_options', (req, res) => {
  const uid = req.body.uid;
  // Step 1: Find the company_id associated with the uid
  const findCompanyIdQuery = 'SELECT company_id FROM employee_table WHERE employee_id = ?';

  connection.query(findCompanyIdQuery, [uid], (err, companyResults) => {
    if (err) {
      console.error('Error querying the database for company_id:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (companyResults.length === 0) {
      console.error('Company ID not found for the employee.');
      res.status(404).json({ error: 'Company ID not found' });
      return;
    }

    // Extract the company_id from the results
    const companyId = companyResults[0].company_id;

    // Step 2: Fetch the status options for the company_id
    const fetchStatusOptionsQuery = 'SELECT id, status FROM status_table WHERE company_id = ?';

    connection.query(fetchStatusOptionsQuery, [companyId], (err, statusResults) => {
      if (err) {
        console.error('Error querying the database for status options:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // Send the status options as JSON response
      res.json(statusResults);
    });
  });
});

  app.get("/sendEmail", function (req, res) {

    let emailTo = "megulraj.20it@sonatech.ac.in";
    let emailFrom = "abhindra.20it@sonatech.ac.in";
    let emailSubject = "Email Subject";
  
    // Email content
    let emailContent = `
    <html>
    <head>
        <title>Email Template</title>
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
      
        <!-- Custom CSS -->
        <style type="text/css">
            @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
            body {
                
                background-color: #383636;
            }
            .container {
                background-color:#FFD300;
                padding: 40px;
                margin: 100px auto;
                border-radius: 5px;
                box-shadow: 0 0 20px rgba(0,0,0,0.2);
                max-width: 600px;
                position: relative;
                
            }
            h1 {
                font-size: 28px;
                color: #000000;
                text-transform: uppercase;
                text-align: center;
                margin-bottom: 40px;
                font-weight: bold;
            }
            p {
                font-size: 18px;
                line-height: 1.5;
                margin-bottom: 30px;
                color: #2c2a2a;
            }
            button {
                background-color: #000000;
                color: #fff;
                border: none;
                padding: 15px 30px;
                border-radius: 5px;
                font-size: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: block;
                margin: 0 auto;
                max-width: 200px;
                text-align: center;
                font-weight: bold;
            }
            button:hover {
                background-color: #0056b3;
            }
            .image {
                position: absolute;
                top: -100px;
                left: 50%;
                transform: translateX(-50%);
                z-index: -1;
                
            }
            .image img {
                max-width: 100%;
                height: auto;
            }
            .moggyboi{
                margin-bottom: 10px;
            }
            .footer {
                margin-top: 50px;
                text-align: center;
                font-size: 16px;
                color: #777;
                padding-bottom: 20px;
            }
            .footer a {
                color: #0081ff;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container ">
            <div class="moggyboi">
            <h1>Request has been Raised</h1>
            <div class="image">
                <img src="./image 128.png" alt="Background Image">
            </div>
        </div>
        <center>
            <p>Trip Id : T101 </p>
        </center>
            <p>We're glad to have you on board! This is a sample email template created using Bootstrap and HTML.</p>
            <p>Feel free to customize this template according to your needs.</p>
            <center>
              <button class="btn btn-success ">Approve</button>  &nbsp; &nbsp;  <button class="btn btn-danger">Rejected</button>
            </center>
            <!-- <div class="footer">
                <p>You received this email because you signed up on our website. If you no longer wish to receive emails from us, please <a href="#">unsubscribe</a>.</p>
                <p>© 2023 VEETECH, All Rights Reserved</p>
            </div> -->
        </div>
    </body>
    </html>
    `;
  
    var mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: emailSubject,
      html: emailContent
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.send("Error sending email");
      } else {
        console.log('Email sent: ' + info.response);
        res.send("Email sent successfully");
      }
    });
  
  });
  app.post('/addEmployee', (req, res) => {
    const formData = req.body.formData;
  
    // Extract data from the request
    const {
      addemployeePassport,
      addemployeedate,
      addemppassname,
      addempAAdhar,
      addempdlnum,
      companyId,
      addempPan,
      employeeId,
      employeeName,
      employeeMail,
      employeeAddress,
      employeeMobileNumber,
      employeeDepartment,
      employeeDesignation,
      employeeApprover,
      employeeDOB,
    } = formData;
  
    // Variables to store fetched IDs
    let designation_eid = null;
    let department_eid = null;
    let company_eid = null;
    var approver_level_id =null;
    var company_id = req.body.companyId;
    let comId=null;
    const company_id_query=`SELECT id FROM company_table WHERE company_id=?`;
    connection.query(company_id_query,[company_id],(err, results1) => {
      if (err) {
        console.error('Error querying designation_table:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      else if (results1.length > 0) {
    comId=results1[0].id;
      }
    })
    // Query the designation_table to fetch designation_id and company_id
    const approverQuery = 'SELECT id from approver_table WHERE approver_level_id=?';
    connection.query(approverQuery,[employeeApprover],(err,results) => {
      if(err){
        console.log(`Error querying approver table`,err);
        return;
      }
      else{
        approver_level_id=results[0].id;
      
    
    
    const designationQuery = `SELECT id, company_id FROM designation_table WHERE designation_name = ?`;
    connection.query(designationQuery, [employeeDesignation], (err, results) => {
      if (err) {
        console.error('Error querying designation_table:', err);
        res.status(500).send('Internal Server Error');
        return;
      } else if (results.length > 0) {
        designation_eid = results[0].id;
        console.log(employeeDesignation);
        company_eid = results[0].company_id;
        // Query the department_table to fetch department_id
        const departmentQuery = `SELECT department_id,department_name FROM department_table WHERE department_name = ?`;
        connection.query(departmentQuery, [employeeDepartment], (err, results) => {
          if (err) {
            console.error('Error querying department_table:', err);
            res.status(500).send('Internal Server Error');
            return;
          } else if (results.length > 0) {
            department_eid = results[0].department_id;
            // Insert data into the employee_table
            console.log('approver_level_id',approver_level_id);
            const employeeInsertQuery = `INSERT INTO employee_table (
              employee_id,
              employee_name,
              Phone,
              mail,
              address,
              employee_dob,
              passport_number,
              expiry_date,
              passport_name,
              aadhar_number,
              dl_number,
              pan_number,
              company_id,
              designation_id,
              approver_level_id ,
              department_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
  
            const employeeValues = [
              employeeId,
              employeeName,
              employeeMobileNumber,
              employeeMail,
              employeeAddress,
              employeeDOB,
              addemployeePassport,
              addemployeedate,
              addemppassname,
              addempAAdhar,
              addempdlnum,
              addempPan,
              company_id,
              designation_eid,
              approver_level_id ,
              department_eid,
            ];
  
            connection.query(employeeInsertQuery, employeeValues, (err, result) => {
              if (err) {
                console.error('Error inserting into employee_table:', err);
                res.status(500).send('Internal Server Error');
                return;
              }
              console.log('Employee data inserted successfully');
              res.send('Employee data received and inserted successfully');
            });
          } else {
            console.error('Department not found:', employeeDepartment);
            res.status(400).send('Department not found');
          }
        });
      } else {
        console.error('Designation not found:', employeeDesignation);
        res.status(400).send('Designation not found');
      }
    });
  }
  });
  });
  app.post("/addEmployeeemail", function (req, res) {
    const formData = req.body.formData;
    
    const {
      addemployeePassport,
      addemployeedate,
      addemppassname,
      addempAAdhar,
      addempdlnum,
      companyId,
      addempPan,
      employeeId,
      employeeName,
      employeeMail,
      employeeAddress,
      employeeMobileNumber,
      employeeDepartment,
      employeeDesignation,
      employeeDOB,
    } = formData;
  let companyName=null;
  const company_id=req.body.company_id;
  ccid = company_id;
  let adminEmail=null;
  let random4DigitNumber = generateRandom4DigitNumber();
  const companyquery=`SELECT company_name from company_table where company_id=?`;
  connection.query(companyquery,[company_id], (err,results)=>{
    if (err) {
          
      console.error("Error retrieving country ID:", err);
      return res.status(500).send("Error retrieving country ID");
    }
   })
   var transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
      user: "mahishkannam.20it@sonatech.ac.in",
      pass: 'Mahish@123'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
   let emailTo = employeeMail;
   let emailFrom = 'mahishkannam.20it@sonatech.ac.in';
   console.log(emailTo+" "+emailFrom);
   let emailSubject = "Email Subject";
   let emailContent = `
   <html>
   <head>
       <title>Email Template</title>
       <!-- Bootstrap CSS -->
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
     
       <!-- Custom CSS -->
       <style type="text/css">
           @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
           body {
               
               background-color: #383636;
           }
           .container {
               background-color:#FFD300;
               padding: 40px;
               margin: 100px auto;
               border-radius: 5px;
               box-shadow: 0 0 20px rgba(0,0,0,0.2);
               max-width: 600px;
               position: relative;
               
           }
           h1 {
               font-size: 28px;
               color: #000000;
               text-transform: uppercase;
               text-align: center;
               margin-bottom: 40px;
               font-weight: bold;
           }
           p {
               font-size: 18px;
               line-height: 1.5;
               margin-bottom: 30px;
               color: #2c2a2a;
           }
           button {
               background-color: #000000;
               color: #fff;
               border: none;
               padding: 15px 30px;
               border-radius: 5px;
               font-size: 20px;
               cursor: pointer;
               transition: all 0.3s ease;
               display: block;
               margin: 0 auto;
               max-width: 200px;
               text-align: center;
               font-weight: bold;
           }
           button:hover {
               background-color: #0056b3;
           }
           .image {
               position: absolute;
               top: -100px;
               left: 50%;
               transform: translateX(-50%);
               z-index: -1;
               
           }
           .image img {
               max-width: 100%;
               height: auto;
           }
           .moggyboi{
               margin-bottom: 10px;
           }
           .footer {
               margin-top: 50px;
               text-align: center;
               font-size: 16px;
               color: #777;
               padding-bottom: 20px;
           }
           .footer a {
               color: #0081ff;
               text-decoration: none;
           }
       </style>
   </head>
   <body>
       <div class="container ">
           <div class="moggyboi">
           <h1>Request has been Raised</h1>
           <div class="image">
               <img src="./image 128.png" alt="Background Image">
           </div>
       </div>
       <center>
           <p>Password : ${random4DigitNumber} </p>
       </center>
           <p>We're glad to have you on board! This is a sample email template created using Bootstrap and HTML.</p>
           <p>Feel free to customize this template according to your needs.</p>
           <center>
             <button class="btn btn-success ">Approve</button>  &nbsp; &nbsp;  <button class="btn btn-danger">Rejected</button>
           </center>
           <!-- <div class="footer">
               <p>You received this email because you signed up on our website. If you no longer wish to receive emails from us, please <a href="#">unsubscribe</a>.</p>
               <p>© 2023 VEETECH, All Rights Reserved</p>
           </div> -->
       </div>
   </body>
   </html>
   `;
   var mailOptions = {
    from: emailFrom,
    to: emailTo,
    subject: emailSubject,
    html: emailContent
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("Error sending email"+error.message);
    } else {
      console.log('Email sent: ' + info.response);
      const sendmailquery=`SELECT  id,company_id FROM employee_table WHERE employee_id=?`
      connection.query(sendmailquery,[employeeId],(err, result1) => {
        if(err){
          console.log(err);
        }
        const eid=result1[0].id;
        const cid=result1[0].company_id;
        const employee_insert=`INSERT INTO login_table(email,password,employee_id,company_id) VALUES(?,?,?,?)`;
        const insertvalues=[
          employeeMail,
          random4DigitNumber,
          eid,
          cid,
        ];
        
        connection.query(employee_insert,insertvalues,(err, result)=>{
          if(err){
            console.log(err);
          }
          res.send("Email sent successfully and data was sent successfully");
        });
      });
    }
  });
  });
  app.post('/changePassword',function(req,res){
    var email = req.body.email;
    let random4DigitNumber = generateRandom4DigitNumber();
    
    var transporter = nodemailer.createTransport({
      service: 'Outlook365',
      auth: {
        user: "mahishkannam.20it@sonatech.ac.in",
        pass: 'Mahish@123'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    let emailTo = email;
    let emailFrom = 'mahishkannam.20it@sonatech.ac.in';
    let emailSubject = "Email Subject";
     let emailContent = `
     <html>
     <head>
         <title>Email Template</title>
         <!-- Bootstrap CSS -->
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
       
         <!-- Custom CSS -->
         <style type="text/css">
             @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
             body {
                 
                 background-color: #383636;
             }
             .container {
                 background-color:#FFD300;
                 padding: 40px;
                 margin: 100px auto;
                 border-radius: 5px;
                 box-shadow: 0 0 20px rgba(0,0,0,0.2);
                 max-width: 600px;
                 position: relative;
                 
             }
             h1 {
                 font-size: 28px;
                 color: #000000;
                 text-transform: uppercase;
                 text-align: center;
                 margin-bottom: 40px;
                 font-weight: bold;
             }
             p {
                 font-size: 18px;
                 line-height: 1.5;
                 margin-bottom: 30px;
                 color: #2c2a2a;
             }
             button {
                 background-color: #000000;
                 color: #fff;
                 border: none;
                 padding: 15px 30px;
                 border-radius: 5px;
                 font-size: 20px;
                 cursor: pointer;
                 transition: all 0.3s ease;
                 display: block;
                 margin: 0 auto;
                 max-width: 200px;
                 text-align: center;
                 font-weight: bold;
             }
             button:hover {
                 background-color: #0056b3;
             }
             .image {
                 position: absolute;
                 top: -100px;
                 left: 50%;
                 transform: translateX(-50%);
                 z-index: -1;
                 
             }
             .image img {
                 max-width: 100%;
                 height: auto;
             }
             .moggyboi{
                 margin-bottom: 10px;
             }
             .footer {
                 margin-top: 50px;
                 text-align: center;
                 font-size: 16px;
                 color: #777;
                 padding-bottom: 20px;
             }
             .footer a {
                 color: #0081ff;
                 text-decoration: none;
             }
         </style>
     </head>
     <body>
         <div class="container ">
             <div class="moggyboi">
             <h1>Request has been Raised</h1>
             <div class="image">
                 <img src="./image 128.png" alt="Background Image">
             </div>
         </div>
         <center>
             <p>Password : ${random4DigitNumber} </p>
         </center>
             <p>We're glad to have you on board! This is a sample email template created using Bootstrap and HTML.</p>
             <p>Feel free to customize this template according to your needs.</p>
             <center>
               <button class="btn btn-success ">Approve</button>  &nbsp; &nbsp;  <button class="btn btn-danger">Rejected</button>
             </center>
             <!-- <div class="footer">
                 <p>You received this email because you signed up on our website. If you no longer wish to receive emails from us, please <a href="#">unsubscribe</a>.</p>
                 <p>© 2023 VEETECH, All Rights Reserved</p>
             </div> -->
         </div>
     </body>
     </html>
     `;
     var mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: emailSubject,
      html: emailContent
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send("Error sending email: " + error.message);
      } else {
        console.log('Email sent: ');
        // Send the random4DigitNumber to the frontend
        res.status(200).send(random4DigitNumber.toString());
      }
    });
  });
  app.post('/updatePassword', function (req, res) {
    const email = req.body.email;
    const newPassword = req.body.password;
    
    // Check if the email exists in the login_table
    connection.query('SELECT * FROM login_table WHERE email = ?', [email], (error, results, fields) => {
      if (error) {
        res.status(500).json({ message: 'Database error' });
        return;
      }
      
      if (results.length === 0) {
        res.status(404).json({ message: 'Email not found' });
        return;
      }
      
      // Update the password for the matching email
      connection.query('UPDATE login_table SET password = ? WHERE email = ?', [newPassword, email], (error, results, fields) => {
        if (error) {
          res.status(500).json({ message: 'Database error' });
          return;
        }
        
        res.send('Password updated successfully');
      });
    });
  });

  const CountriesApi = require('./CountriesApi.json'); 
  app.post('/addCompany', (req, res) => {
    const formData = req.body;
    const {
      companyAddress,
      companyId,
      companyLogo,
      companyMail,
      companyName,
      selectedCity,
      selectedCountry,
      selectedState,
      isActive,
      adminName,
      adminMail,
    } = formData;
  
    const selectedCountryObj = CountriesApi.find((country) => country.name === selectedCountry);
  
    if (selectedCountryObj) {
      const country_id = selectedCountryObj.id;
      const selectedStateObj = selectedCountryObj.states.find((state) => state.name === selectedState);
      if (selectedStateObj) {
        const state_id = selectedStateObj.id;
        const selectedCityObj = selectedStateObj.cities.find((city) => city.name === selectedCity);
        if (selectedCityObj) {
          const city_id = selectedCityObj.id;
  
          console.log(`Selected Country ID: ${country_id}, State ID: ${state_id}, City ID: ${city_id}`);
          const countryInsertQuery = `INSERT IGNORE INTO country_table (country_id, country_name) VALUES (?, ?)`;
          connection.query(countryInsertQuery, [country_id, selectedCountry], (countryInsertErr, countryInsertResult) => {
            if (countryInsertErr) {
              console.log('Existing data into country_table:', countryInsertErr); 
            }
            const stateInsertQuery = `INSERT IGNORE INTO state_table (state_id, state, country_id) VALUES (?, ?, ?)`;
            connection.query(stateInsertQuery, [state_id, selectedState, country_id], (stateInsertErr, stateInsertResult) => {
              if (stateInsertErr) {
                console.log('Error inserting data into state_table:', stateInsertErr);
              }
              const cityInsertQuery = `INSERT INTO city_table (city_id, city_name, state_id) VALUES (?, ?, ?)`;
              connection.query(cityInsertQuery, [city_id, selectedCity, state_id], (cityInsertErr, cityInsertResult) => {
                if (cityInsertErr) {
                  console.log('Error inserting data into city_table:', cityInsertErr);
                }
                res.send('success');
                companydetails.push(country_id);
                companydetails.push(state_id);
                companydetails.push(city_id);
              });
            });
          });

        } else {
          res.send("City not found");
        }
      } else {
        res.send("State not found");
      }
    } else {
      console.log('Selected country not found in the JSON data.');
      res.send("Country not found");
    }
  });
  
  app.post("/insertCompany", function(req, res) {
    const formData = req.body;
    const {
      companyAddress,
      companyId,
      companyLogo,
      companyMail,
      companyName,
      isActive,
      adminName,
      adminMail,
      selectedCountry,
      selectedState,
      selectedCity,
    } = formData;
    console.log("adminName:", adminName);
    // Define queries to retrieve IDs from the country, state, and city tables.
    const countryQuery = "SELECT id FROM country_table WHERE country_name = ?";
    const stateQuery = "SELECT id FROM state_table WHERE state = ?";
    const cityQuery = "SELECT id FROM city_table WHERE city_name = ?";
  
    let country_id, state_id, city_id;
  
    // Execute queries to retrieve the IDs.
  
    connection.query(countryQuery, [selectedCountry], (err, countryResult) => {
      if (err) {
        console.error("Error retrieving country ID:", err);
        return res.status(500).send("Error retrieving country ID");
      }
      if (countryResult.length > 0) {
        country_id = countryResult[0].id;
        connection.query(stateQuery, [selectedState], (err, stateResult) => {
          if (err) {
            console.error("Error retrieving state ID:", err);
            return res.status(500).send("Error retrieving state ID");
          }
          if (stateResult.length > 0) {
            state_id = stateResult[0].id;
            connection.query(cityQuery, [selectedCity], (err, cityResult) => {
              if (err) {
                console.error("Error retrieving city ID:", err);
                return res.status(500).send("Error retrieving city ID");
              }
              if (cityResult.length > 0) {
                city_id = cityResult[0].id;
                // Now that you have all the IDs, you can insert them into the company_table.
                const insertQuery = `INSERT INTO company_table (company_id, company_name, company_mail_id, company_logo, company_address, is_active, country_id, state_id, city_id,admin_name, admin_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
                connection.query(
                  insertQuery,
                  [
                    companyId,
                    companyName,
                    companyMail,
                    companyLogo,
                    companyAddress,
                    isActive,
                    country_id,
                    state_id,
                    city_id,
                    adminName,
                    adminMail,
                  ],
                  (err, result) => {
                    if (err) {
                      console.error("Error inserting data:" + err);
                      return res.status(500).send("Error inserting data");
                    } else {
                      res.send("Company inserted successfully");
                    }
                  }
                );
              } else {
                return res.status(404).send("City not found");
              }
            });
          } else {
            return res.status(404).send("State not found");
          }
        });
      } else {
        return res.status(404).send("Country not found");
      }
    });
  });
  
  app.post("/insertCompanyAdmin", function (req, res) {
    const formData = req.body;
    const { companyId, companyName,adminName, adminMail, designation } = formData;
  
    let cid = null;
    let des_id = null;
  
    const companyid = `SELECT id FROM company_table WHERE company_id = ?`;
    connection.query(companyid, [companyId], function (err, rest) {
      if (err) {
        console.log(err);
      } else {
        cid = rest[0].id;
  
        // Now, add a query to retrieve the designation_id based on the designation name
        const designationQuery = "SELECT id FROM designation_table WHERE designation_name = ?";
        connection.query(designationQuery, [designation], function (err, desResult) {
          if (err) {
            console.log(err);
          } else {
            if (desResult.length > 0) {
              des_id = desResult[0].id;
  
              const Empid = generateRandom2DigitNumber();
              const adminquery = `INSERT INTO employee_table (employee_id, employee_name, mail, company_id, designation_id) VALUES(?,?,?,?,?)`;
              connection.query(
                adminquery,
                [Empid, adminName, adminMail, cid, des_id],
                (err, ress) => {
                  if (err) {
                    console.log(err);
                  } else {
                    const password = generateRandom4DigitNumber();
                    const eidquery = `SELECT id FROM employee_table WHERE employee_id = ?`;
                    connection.query(eidquery, [Empid], function (err, res1) {
                      if (err) {
                        console.log(err);
                      } else {
                        const eid = res1[0].id;
                        const login_query = `INSERT INTO login_table(email, password, employee_id, company_id) VALUES(?,?,?,?)`;
                        connection.query(
                          login_query,
                          [adminMail, password, Empid, cid],
                          (err, res2) => {
                            if (err) {
                              console.log(err);
                            } else {
                              console.log(res2);
  
                              var transporter = nodemailer.createTransport({
                                service: "Outlook365",
                                auth: {
                                  user: "mahishkannam.20it@sonatech.ac.in",
                                  pass: "Mahish@123",
                                },
                                tls: {
                                  rejectUnauthorized: false,
                                },
                              });
                              let emailTo = adminMail;
                              let emailFrom = "mahishkannam.20it@sonatech.ac.in";
                              let emailSubject = "Email Subject";
                              let emailContent = `
                              <html>
                              <head>
                                  <title>Email Template</title>
                                  <!-- Bootstrap CSS -->
                                  <link
                                    rel="stylesheet"
                                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                                  />
                        
                                  <!-- Custom CSS -->
                                  <style type="text/css">
                                    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
                                    body {
                                      background-color: #383636;
                                    }
                                    .container {
                                      background-color: #FFD300;
                                      padding: 40px;
                                      margin: 100px auto;
                                      border-radius: 5px;
                                      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                                      max-width: 600px;
                                      position: relative;
                                    }
                                    h1 {
                                      font-size: 28px;
                                      color: #000000;
                                      text-transform: uppercase;
                                      text-align: center;
                                      margin-bottom: 40px;
                                      font-weight: bold;
                                    }
                                    p {
                                      font-size: 18px;
                                      line-height: 1.5;
                                      margin-bottom: 30px;
                                      color: #2c2a2a;
                                    }
                                    button {
                                      background-color: #000000;
                                      color: #fff;
                                      border: none;
                                      padding: 15px 30px;
                                      border-radius: 5px;
                                      font-size: 20px;
                                      cursor: pointer;
                                      transition: all 0.3s ease;
                                      display: block;
                                      margin: 0 auto;
                                      max-width: 200px;
                                      text-align: center;
                                      font-weight: bold;
                                    }
                                    button:hover {
                                      background-color: #0056b3;
                                    }
                                    .image {
                                      position: absolute;
                                      top: -100px;
                                      left: 50%;
                                      transform: translateX(-50%);
                                      z-index: -1;
                                    }
                                    .image img {
                                      max-width: 100%;
                                      height: auto;
                                    }
                                    .moggyboi {
                                      margin-bottom: 10px;
                                    }
                                    .footer {
                                      margin-top: 50px;
                                      text-align: center;
                                      font-size: 16px;
                                      color: #777;
                                      padding-bottom: 20px;
                                    }
                                    .footer a {
                                      color: #0081ff;
                                      text-decoration: none;
                                    }
                                  </style>
                              </head>
                              <body>
                                  <div class="container ">
                                    <div class="moggyboi">
                                      <h1>Your Company Has been Registered</h1>
                                      <div class="image"></div>
                                    </div>
                                    <center>
                                      <p>Password : ${password} </p>
                                    </center>
                                    <p>Dear [Company Name],</p>
                                    <p>Congratulations! Your company registration is now complete. We are pleased to welcome you to our platform.</p>
                                    <p>Here are your registration details:</p>
                                    <ul>
                                      <li><strong>Company Name:</strong>${companyName}</li>
                                      <li><strong>Admin Email:</strong>${adminMail}</li>
                                    </ul>
                                    <center>
                                      <button class="btn btn-success ">Approve</button> &nbsp; &nbsp; <button class="btn btn-danger">Rejected</button>
                                    </center>
                                  </div>
                              </body>
                              </html>
                            `;
                              var mailOptions = {
                                from: emailFrom,
                                to: emailTo,
                                subject: emailSubject,
                                html: emailContent,
                              };
                              transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                  console.log(error);
                                  res.send("Error sending email" + error.message);
                                } else {
                                  res.send("Admin added successfully");
                                }
                              });
                            }
                          }
                        );
                      }
                    });
                  }
                }
              );
            } else {
              console.log("Designation not found.");
              // Handle the case where the designation was not found in the table
            }
          }
        });
      }
    });
  });
  
  

  app.post('/getemployees', (req, res) => {
    const company_id = req.body.company_id;
    const query = `
      SELECT
        e.employee_id,
        e.mail,
        e.employee_name,
        a.approver_level_id,
        e.designation_id,
        d.department_name,  -- Add department_name
        des.designation_name, -- Add designation_name
        c.company_name
      FROM
        employee_table e  
      LEFT JOIN
        approver_table a ON e.approver_level_id = a.id
      LEFT JOIN
        department_table d ON e.department_id = d.department_id
      LEFT JOIN
        designation_table des ON e.designation_id = des.id
      LEFT JOIN
        company_table c ON e.company_id = c.id
      WHERE 
        e.company_id = ?
    `;
  
    connection.query(query, [company_id],(error, results) => {
      if (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.send(results);
        console.log("Successfully fetched employees");
      }
    });
  });
  app.get("/getCompany", (req, res) => {
  
  const getcompany_query="SELECT company_id,company_name,admin_name,admin_email,is_active FROM company_table";
  connection.query(getcompany_query, (error, results) => {
    if (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.send(results);
      console.log("Successfully fetched employees");
    }
  });
  });

app.post('/get_approver_mapping_range', (req, res) => {
  const uid = req.body.uid;
    // Assuming you have an 'employee_table' with a 'user_id' column
    const getEmployeeIdQuery = "SELECT id FROM employee_table WHERE employee_id = ?";
  
    connection.query(getEmployeeIdQuery, [uid], (err, employeeResults) => {
      if (err) {
        console.error('Error querying the database for employee ID: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      if (employeeResults.length === 0) {
        console.error('Employee not found in the database.');
        res.status(404).json({ error: 'Employee not found' });
        return;
      }
  
      // Assuming the result contains the user_id
      
  // Get the `employee_id` from the request body
  const employeeId = employeeResults[0].id;

  const getCompanyQuery = "SELECT company_id FROM employee_table WHERE id = ?";

  connection.query(getCompanyQuery, [employeeId], (err, companyResults) => {
    if (err) {
      console.error('Error querying the database for company ID: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
  
    if (companyResults.length === 0) {
      console.error('Company ID not found for the employee.');
      res.status(404).json({ error: 'Company ID not found' });
      return;
    }
  
    const companyId = companyResults[0].company_id;
  const getApproverTableRangeQuery = `
  SELECT id, approver_level_id
  FROM approver_table
  WHERE company_id = ?
  AND id NOT IN (
      SELECT MIN(id)
      FROM approver_table
      WHERE company_id = ?
  );
`;

connection.query(getApproverTableRangeQuery, [companyId,companyId], (err, approverTableResults) => {
  if (err) {
    console.error('Error querying approver_table range: ');
    res.status(500).json({ error: 'Database error' });
    return;
  }

  if (approverTableResults.length === 0) {
    console.error('Approver table range not found for the company.');
    res.status(404).json({ error: 'Approver table range not found' });
    return;
  }

  let approverTableStartId = approverTableResults[0].start_id;
  const approverTableEndId = approverTableResults[0].end_id;

  const getStatusTableRangeQuery = `
  SELECT id,status
  FROM status_table
  WHERE company_id=? AND id NOT IN(SELECT MAX(id) 
  FROM status_table 
  WHERE company_id=?);
  `;

  connection.query(getStatusTableRangeQuery, [companyId,companyId], (err, statusTableResults) => {
    if (err) {
      console.error('Error querying status_table range: ');
      res.status(500).json({ error: 'Database error' });
      return;
    }

    if (statusTableResults.length === 0) {
      console.error('Status table range not found for the company.');
      res.status(404).json({ error: 'Status table range not found' });
      return;
    }
    statusTableResults.pop();
    
    //console.log(approverTableResults);
    //console.log(statusTableResults);

    approverToStatusMapping = {};
    let mapping={};
    for (let i = 0; i < approverTableResults.length && i < statusTableResults.length; i++) {
      const approver = approverTableResults[i];
      const status = statusTableResults[i];
  
      if (approver && status) {
          mapping[`${approver.id},${approver.approver_level_id}`] = `${status.id},${status.status}`;
      }
  }
  

    // Log the mapping
    //console.log('Mapping: ', mapping);
    for (let i = 0; i < approverTableResults.length; i++) {
      const approver = approverTableResults[i];
      if (mapping[`${approver.id},${approver.approver_level_id}`]) {
        const statusId = mapping[`${approver.id},${approver.approver_level_id}`].split(',')[0];
        approverToStatusMapping[approver.id] = Number(statusId);
      }
    }
    
    //console.log('approverToStatusMapping: ',approverToStatusMapping);
  
  // Send the first and last values as JSON response
  res.send(mapping);
});
});
});

});
});

app.post("/travel_approve_reject", (req, res) => {
  const uid = req.body.uid;
  const approverLevelId = req.body.approverLevelId;
  // Step 1: Find employee_id using the provided uid
  const getEmployeeIdQuery = "SELECT id FROM employee_table WHERE employee_id = ?";
  
  connection.query(getEmployeeIdQuery, [uid], (err, employeeResults) => {
    if (err) {
      console.error('Error querying the database for employee ID: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    if (employeeResults.length === 0) {
      console.error('Employee not found in the database.');
      res.status(404).json({ error: 'Employee not found' });
      return;
    }

    // Get the `employee_id` from the request body
    const employeeId = employeeResults[0].id;

    // Step 2: Find employee_ids from approver_mapping_table
    const findEmployeeIdsQuery = "SELECT employee_id FROM approver_mapping_table WHERE approver_employee_id = ?";

    connection.query(findEmployeeIdsQuery, [employeeId], (err, employeeIdsResults) => {
      if (err) {
        console.error('Error querying the database for employee IDs: ' + err.stack);
        res.status(500).json({ error: 'Database error' });
        return;
      }

      // Extract employee IDs from the results
      const employeeIds = employeeIdsResults.map((row) => row.employee_id);

      if (employeeIds.length === 0) {
        console.error('No eligible employees found.');
        res.status(404).json({ error: 'No eligible employees found' });
        return;
      }
      const status_value = approverToStatusMapping[approverLevelId];
      const status_values = [];
      for (const key in approverToStatusMapping) {
        if (approverToStatusMapping[key] > status_value) {
          status_values.push(approverToStatusMapping[key]);
        }
      }
      const nextValue = status_values[status_values.length - 1] + 1;
      status_values.push(nextValue);
      //console.log('status_value'+status_value);
      //console.log('employeeIds'+employeeIds);


      // Step 3: Retrieve trip_id and status for the selected employee IDs
      const getTravelRequestDetailsQuery = `
        SELECT travel_request_table.trip_id, status_table.status, employee_table.employee_id
        FROM travel_request_table
        LEFT JOIN status_table ON travel_request_table.status_id = status_table.id
        LEFT JOIN employee_table ON travel_request_table.employee_id = employee_table.id
        WHERE travel_request_table.employee_id IN (?) AND travel_request_table.status_id IN (?);
      `;

      connection.query(getTravelRequestDetailsQuery, [employeeIds,status_values], (err, travelResults) => {
        if (err) {
          console.error('Error querying the database for travel request details: ' + err.stack);
          res.status(500).json({ error: 'Database error' });
          return;
        }
        connection.query(getTravelRequestDetailsQuery, [employeeIds, status_values], (err, travelResults) => {
          if (err) {
            console.error('Error querying the database for travel request details: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
          }
        
          const getTravelRequestRejectedDetailsQuery=`
          SELECT travel_request_table.trip_id, status_table.status, employee_table.employee_id
          FROM travel_request_table
          LEFT JOIN status_table ON travel_request_table.status_id = status_table.id
          LEFT JOIN employee_table ON travel_request_table.employee_id = employee_table.id
          WHERE travel_request_table.employee_id IN (?) AND travel_request_table.rejector_id=?;
          `;
          connection.query(getTravelRequestRejectedDetailsQuery, [employeeIds, employeeId], (err, rejectedResults) => {
            if (err) {
              console.error('Error querying the database for rejected travel request details: ' + err.stack);
              res.status(500).json({ error: 'Database error' });
              return;
            }

            const travelData = travelResults.map(result => ({ ...result }));
            const rejectedData = rejectedResults.map(result => ({ ...result }));
          
            // Concatenate travelData and rejectedData
            const combinedResults = travelData.concat(rejectedData);
            res.json(combinedResults);
      });
    });
  });
    });
  });
});

app.post('/designationapprover', (req, res) => {
  const additionalData = req.body;

  // Start a database transaction
  connection.beginTransaction(function (err) {
    if (err) {
      console.error('Error starting transaction:', err);
      res.status(500).json({ message: 'Error starting transaction' });
      return;
    }

    // Query to fetch the company_id based on companyId
    const getCompanyIdQuery = 'SELECT id FROM company_table WHERE company_id = ?';

    // Execute the query to get the company_id
    connection.query(getCompanyIdQuery, [additionalData.companyId], (err, results) => {
      if (err) {
        // Handle the error and roll back the transaction
        connection.rollback(function () {
          console.error('Error fetching company_id from company_table:', err);
          res.status(500).json({ message: 'Error fetching company_id' });
        });
      } else if (results.length === 0) {
        // If no matching company_id is found, handle the error and roll back
        connection.rollback(function () {
          console.error('No matching company_id found in company_table');
          res.status(500).json({ message: 'No matching company_id found' });
        });
      } else {
        // Extract the company_id from the result
        const companyId = results[0].id;
        const designationQuery = 'INSERT INTO designation_table (designation_id, designation_name, company_id) VALUES ?';
        const designationValues = [];

        additionalData.designationLevels.forEach((designationLevel) => {
          const designation_id = generateUniqueDesignationId(); // Implement a function to generate a unique designation_id
          designationValues.push([designation_id, designationLevel, companyId]);
        });

        connection.query(designationQuery, [designationValues], (err, result) => {
          if (err) {
            connection.rollback(function () {
              console.error('Error inserting into designation_table:', err);
              res.status(500).json({ message: 'Error inserting data' });
            });
          } else {
        // Use a map to store generated department IDs for each department name
        const departmentIdsMap = new Map();

        // Insert department data
        const departmentQuery = 'INSERT INTO department_table (department_id,department_name, created_date, last_updated_date, created_time, last_updated_time, company_id) VALUES ?';
        const departmentValues = [];

        additionalData.departmentNames.forEach((departmentName) => {
          const department_id=generateRandomDepartmentId();
          departmentValues.push([department_id,departmentName, new Date(), null, new Date(), new Date(), companyId]);
        });

        connection.query(departmentQuery, [departmentValues], (err, result) => {
          if (err) {
            connection.rollback(function () {
              console.error('Error inserting into department_table:', err);
              res.status(500).json({ message: 'Error inserting department data' });
            });
          } else {
            // Fetch department IDs for each department name
            const selectDepartmentIdsQuery = 'SELECT id, department_name FROM department_table WHERE department_name IN (?) AND company_id = ?';

            connection.query(selectDepartmentIdsQuery, [additionalData.departmentNames, companyId], (err, departmentIdResults) => {
              if (err) {
                connection.rollback(function () {
                  console.error('Error fetching department IDs:', err);
                  res.status(500).json({ message: 'Error fetching department IDs' });
                });
              } else {
                // Map department names to their corresponding IDs
                departmentIdResults.forEach((row) => {
                  departmentIdsMap.set(row.department_name, row.id);
                });

                // Prepare data for the approver_table
                const approverQuery = 'INSERT INTO approver_table (approver_level_id, department_id, company_id, created_date, last_updated_date, created_time, last_updated_time) VALUES ?';
                const approverValues = [];

                additionalData.departmentNames.forEach((departmentName) => {
                  additionalData.approverLevels.forEach((approverLevel) => {
                    const department_id = departmentIdsMap.get(departmentName);
                    approverValues.push([approverLevel, department_id, companyId, new Date(), new Date(), new Date(), new Date()]);
                  });
                });

                connection.query(approverQuery, [approverValues], (err, result) => {
                  if (err) {
                    connection.rollback(function () {
                      console.error('Error inserting into approver_table:', err);
                      res.status(500).json({ message: 'Error inserting data' });
                    });
                  } else {
                    // Prepare data for the status_table
                    const statusQuery = 'INSERT INTO status_table (status_id, status, department_id, company_id) VALUES ?';
                    const statusValues = [];

                    const approverLevels = additionalData.approverLevels;
                    const statusDescriptions = [];
                    let statusValue = 'Under Consideration';
                    statusDescriptions.push(statusValue);
                    for (let i = 1; i < approverLevels.length - 1; i++) {
                      statusDescriptions.push(`${approverLevels[i]} Approved`);
                    }

                    statusDescriptions.push('Approved');
                    statusDescriptions.push('Rejected');

                    for (const description of statusDescriptions) {
                      additionalData.departmentNames.forEach((departmentName) => {
                        const department_id = departmentIdsMap.get(departmentName);
                        const status_id = generateUniqueStatusId(); // Implement a function to generate a unique status_id
                        statusValue = description; // Update statusValue for the next entry
                        statusValues.push([status_id, statusValue, department_id, companyId]);
                      });
                    }

                    connection.query(statusQuery, [statusValues], (err, result) => {
                      if (err) {
                        connection.rollback(function () {
                          console.error('Error inserting into status_table:', err);
                          res.status(500).json({ message: 'Error inserting data' });
                        });
                      } else {
                        connection.commit(function (err) {
                          if (err) {
                            connection.rollback(function () {
                              console.error('Error committing transaction:', err);
                              res.status(500).json({ message: 'Error committing transaction' });
                            });
                          } else {
                            res.status(200).json({ message: 'Data inserted successfully' });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
          }
        });
        }
    });
  });
});




app.post('/viewCompanyData', (req, res) => {
  const { userId } = req.body;
  console.log(userId);

  // Query to get company_id based on userId from the employee_table
  const companyIdQuery = 'SELECT company_id FROM employee_table WHERE employee_id = ?';

  // Execute the query to get company_id
  connection.query(companyIdQuery, [userId], (err, companyResult) => {
    if (err) {
      console.error('Error fetching company_id:', err);
      res.status(500).json({ message: 'Error fetching company_id' });
      return;
    }

    if (companyResult.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const companyId = companyResult[0].company_id;

    // Define queries to fetch data from each table
    const companyQuery = 'SELECT * FROM company_table WHERE id = ?';
    const approverQuery = 'SELECT * FROM approver_table WHERE company_id = ?';
    const designationQuery = 'SELECT * FROM designation_table WHERE company_id = ?';
    const departmentQuery = 'SELECT * FROM department_table WHERE company_id = ?';
    const purposeOfVisitQuery = 'SELECT * FROM purpose_of_visit_table WHERE company_id = ?';
    const statusQuery = 'SELECT * FROM status_table WHERE company_id = ?';
    const billingEntityQuery = 'SELECT * FROM billing_entity_table WHERE company_id = ?'; // Query for billing_entity_table

    const queries = [
      companyQuery,
      approverQuery,
      designationQuery,
      departmentQuery,
      purposeOfVisitQuery,
      statusQuery,
      billingEntityQuery, // Add the billing_entity_table query to the array
    ];

    const results = {};

    // Execute each query and push the result into the results object
    queries.forEach((query) => {
      connection.query(query, [companyId], (err, result) => {
        if (err) {
          console.error('Error fetching data:', err);
          res.status(500).json({ message: 'Error fetching data' });
        } else {
          results[query] = result;
          // Check if all queries have completed
          if (Object.keys(results).length === queries.length) {
            // All queries have completed
            res.status(200).json(results);
          }
        }
      });
    });
  });
});

app.post('/updateCompany', (req, res) => {
  const updatedCompanyData = req.body;

  // Construct the SQL query to update the company_table with timestamps
  const sql = `
    UPDATE company_table
    SET
      company_name = ?,
      company_mail_id = ?,
      company_logo = ?,
      company_address = ?,
      is_active = ?,
      last_updated_date = NOW(),
      last_updated_time = NOW(),
      country_id = ?,
      state_id = ?,
      city_id = ?,
      admin_name = ?,
      admin_email = ?
    WHERE company_id = ?
  `;

  // Extract data from the request body
  const {
    company_name,
    company_mail_id,
    company_logo,
    company_address,
    is_active,
    country_id,
    state_id,
    city_id,
    admin_name,
    admin_email,
    company_id,
  } = updatedCompanyData;

  // Execute the SQL query with the data
  connection.query(
    sql,
    [
      company_name,
      company_mail_id,
      company_logo,
      company_address,
      is_active,
      country_id,
      state_id,
      city_id,
      admin_name,
      admin_email,
      company_id,
    ],
    (error, results) => {
      if (error) {
        console.error('Error updating company data:', error);
        res.status(500).send('Error updating company data');
      } else {
        console.log('Company data updated successfully');
        res.send('Success');
      }
    }
  );
});

app.post('/addApprover', (req, res) => {
  const{formData,company_id} = req.body;
  console.log(formData);
  const {approver_level_id}=formData;
  console.log(approver_level_id+ company_id);
  const addApproverQuery=`INSERT into approver_table (approver_level_id,company_id) VALUES(?,?)`;
  connection.query(addApproverQuery,[approver_level_id,company_id],(err,results)=>{
    if(err){
      console.log("error");
    }
    else{
      console.log(results);
      res.send('success');
    }
  })
  //res.send('success');
   
  
})
app.post('/updateApporver', (req, res) => {
  const{formData,company_id} = req.body;
  const {approver_level_id}=formData;
  const {id}=formData;
  console.log(approver_level_id+" "+id);;
  
  const updateapproveryquery=`UPDATE approver_table SET approver_level_id=? WHERE id=?`;
  connection.query(updateapproveryquery,[approver_level_id,id],(err,results)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(results);
      res.send('success');
    }
  })
 // res.send('success');
});
app.post('/removeApprover', (req, res) => {
  const approver_id = req.body.approverId;
  const company_id = req.body.company_id;
  console.log(approver_id);

  // Specify the condition for deletion using WHERE clause
  const removeQuery = 'DELETE FROM approver_table WHERE company_id=? AND approver_level_id=?';

  connection.query(removeQuery, [company_id, approver_id], (err, results) => {
    if (err) {
      console.log(err);
      // Handle the error, e.g., return an error response to the client
      res.status(500).send('Error deleting approver');
    } else {
      console.log(results);
      console.log('Delete completed successfully');
      res.send('success');
    }
  });
});
app.post('/addDesignation', (req, res) => {
  const { formData, company_id } = req.body;
  const { designation_name } = formData;
  
  // Generate a unique designation_id
  const designation_id = generateUniqueDesignationId();

  const addDesignationQuery = 'INSERT INTO designation_table (designation_id, designation_name, company_id) VALUES (?, ?, ?)';
  connection.query(addDesignationQuery, [designation_id, designation_name, company_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding designation');
    } else {
      console.log(results);
      res.send('success');
    }
  });
});
app.post('/updateDesignation', (req, res) => {
  const { formData, company_id } = req.body;
  const { designation_name, designation_id } = formData;

  const updateDesignationQuery = 'UPDATE designation_table SET designation_name = ? WHERE designation_id = ? AND company_id = ?';
  connection.query(updateDesignationQuery, [designation_name, designation_id, company_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating designation');
    } else {
      console.log(results);
      res.send('success');
    }
  });
});
app.post('/removeDesignation', (req, res) => {
  const designation_id = req.body.designationId;
  const company_id = req.body.company_id;

  const removeQuery = 'DELETE FROM designation_table WHERE company_id = ? AND designation_id = ?';
  connection.query(removeQuery, [company_id, designation_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting designation');
    } else {
      console.log(results);
      console.log('Delete completed successfully');
      res.send('success');
    }
  });
});

app.post('/addBillingEntity', (req, res) => {
  const { formData, company_id } = req.body;
  console.log("form")
  const { billing_entity, created_date, last_updated_date, created_time, last_updated_time } = formData;
  
  // Generate a unique billing_entity_id
  const billing_entity_id = generateUniqueBillingEntityId();
  
  const addBillingEntityQuery = 'INSERT INTO billing_entity_table (billing_entity_id, billing_entity, created_date, last_updated_date, created_time, last_updated_time, company_id) VALUES (?, ?, CURDATE(), CURDATE(), CURTIME(), CURTIME(), ?)';
  connection.query(addBillingEntityQuery, [billing_entity_id, billing_entity, company_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding billing entity');
    } else {
      console.log(results);
      res.send('success');
    }
  });  
});

app.post('/updateBillingEntity', (req, res) => {
  const { formData, company_id } = req.body;
  const { billing_entity_id, billing_entity } = formData;

  const updateBillingEntityQuery = 'UPDATE billing_entity_table SET billing_entity = ?, last_updated_date = CURDATE(), last_updated_time = CURTIME() WHERE billing_entity_id = ? AND company_id = ?';
  connection.query(updateBillingEntityQuery, [billing_entity, billing_entity_id, company_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating billing entity');
    } else {
      console.log(results);
      res.send('success');
    }
  });
});

app.post('/removeBillingEntity', (req, res) => {
  const billing_entity_id = req.body.billing_entity_id;
  const company_id = req.body.company_id;
  console.log(billing_entity_id+" "+company_id);
  const removeQuery = 'DELETE FROM billing_entity_table WHERE company_id = ? AND billing_entity_id = ?';
  connection.query(removeQuery, [company_id, billing_entity_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting billing entity');
    } else {
      console.log('Delete completed successfully');
      res.send('success');
    }
  });
});


app.post('/addDepartment', (req, res) => {
  const { formData, company_id } = req.body;
  const { department_name, employee_id } = formData;
  const department_id = generateUniqueDepartmentId();

  // Check if employee_id is provided, if not, set it to NULL
  const employeeIdValue = employee_id || null;

  const addDepartmentQuery = 'INSERT INTO department_table (department_id, department_name, created_date, last_updated_date, created_time, last_updated_time, employee_id, company_id) VALUES (?, ?, CURDATE(), CURDATE(), CURTIME(), CURTIME(), ?, ?)';
  connection.query(addDepartmentQuery, [department_id, department_name, employeeIdValue, company_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding department');
    } else {
      console.log(results);
      res.send('success');
    }
  });
});
app.post('/updateDepartment', (req, res) => {
  const { formData, company_id } = req.body;
  const { department_id, department_name, employee_id } = formData;
  console.log()
  const updateDepartmentQuery = 'UPDATE department_table SET department_name = ?, employee_id = ?, last_updated_date = CURDATE(), last_updated_time = CURTIME() WHERE department_id = ? AND company_id = ?';
  connection.query(updateDepartmentQuery, [department_name, employee_id, department_id,company_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating department');
    } else {
      console.log(results);
      res.send('success');
    }
  });
});
app.post('/removeDepartment', (req, res) => {
  const department_id = req.body.department_id;
  const company_id = req.body.company_id;
  console.log("During post request department id is :",department_id);
  const removeQuery = 'DELETE FROM department_table WHERE company_id = ? AND department_id = ?';
  connection.query(removeQuery, [company_id, department_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting department');
    } else {
      console.log('Delete completed successfully');
      res.send('success');
    }
  });
});

app.post('/addPurposeOfVisit', (req, res) => {
  const { formData, company_id } = req.body;
  const { purpose_of_visit } = formData;
  const purpose_of_visit_id = generateUniquePurposeOfVisitId(); // Generate a unique purpose_of_visit_id

  const addPurposeOfVisitQuery = 'INSERT INTO purpose_of_visit_table (purpose_of_visit_id, purpose_of_visit, created_date, last_updated_date, created_time, last_updated_time, company_id) VALUES (?, ?, CURDATE(), CURDATE(), CURTIME(), CURTIME(), ?)';
  connection.query(addPurposeOfVisitQuery, [purpose_of_visit_id, purpose_of_visit, company_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding purpose of visit');
    } else {
      console.log(results);
      res.send('success');
    }
  });
});

app.post('/updatePurposeOfVisit', (req, res) => {
  const { formData, company_id } = req.body;
  const { purpose_of_visit_id, purpose_of_visit } = formData;

  const updatePurposeOfVisitQuery = 'UPDATE purpose_of_visit_table SET purpose_of_visit = ?, last_updated_date = CURDATE(), last_updated_time = CURTIME() WHERE purpose_of_visit_id = ? AND company_id = ?';
  connection.query(updatePurposeOfVisitQuery, [purpose_of_visit, purpose_of_visit_id, company_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating purpose of visit');
    } else {
      console.log(results);
      res.send('success');
    }
  });
});

app.post('/removePurposeOfVisit', (req, res) => {
  const purpose_of_visit_id = req.body.purpose_of_visit_id;
  const company_id = req.body.company_id;

  const removeQuery = 'DELETE FROM purpose_of_visit_table WHERE company_id = ? AND purpose_of_visit_id = ?';
  connection.query(removeQuery, [company_id, purpose_of_visit_id], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting purpose of visit');
    } else {
      console.log('Delete completed successfully');
      res.send('success');
    }
  });
});


app.listen(3002, () => {
    console.log('Server is running');
});