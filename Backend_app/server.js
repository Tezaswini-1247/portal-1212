const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const XLSX = require("xlsx");
const upload = multer({ storage: multer.memoryStorage() });

///////////////////////
const app = express();
const port = 5000;

// Middleware

app.use(bodyParser.json());
app.use(cors());




// PostgreSQL Pool setup
const pool = new Pool({
  user: "visys_dev",
  host: "52.66.196.233", // Or your database host
  database: "devdb",
  password: "dev@123",
  port: 5432, // Default PostgreSQL port
});
//////////////////////


// Helper function to query the database
const queryDatabase = async (queryText, res) => {
  try {
    const result = await pool.query(queryText);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Database query error' });
  }
};
//////////////////////////////////////////


////loginform
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

if (result.rows.length === 0) {
  return res.json({ success: false, message: 'User not found.' });
}
const user = result.rows[0];
if (user.password === password) {
  res.json({ success: true });
} else {
  res.json({ success: false, message: 'Invalid password.' });
}
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
});
///////////////////////////////////////



// Institution Update & Retrieve //
// institutionupdate
app.post('/api/institutions', upload.single('photo'), async (req, res) => {
  const {
    institutionName,
    contactPerson,
    phoneNumber,
    email,
    city,
    state,
    numberOfStudents,
    response,
    description,
    datetime
     // New field for comments or description
  } = req.body;

  // Check if the file is present in the request
  const photoPath = req.file ? req.file.path : null;

  try {
    // Insert the form data, including the description and photoPath, into the database
    await pool.query(
      `INSERT INTO institutions (
        institution_name, 
        contact_person, 
        phone_number, 
        email, 
        city, 
        state, 
        number_of_students, 
        response, 
        description,
        datetime, 
        photo_path
        
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [institutionName, contactPerson, phoneNumber, email, city, state, numberOfStudents, response, description, datetime, photoPath]
    );

    res.send('Institution data, photo, and description submitted successfully');
  } catch (err) {
    console.error('Error submitting institution data:', err);
    res.status(500).send('Error submitting institution data');
  }
});

//Retrieveinstitutions
app.get('/api/institutions/retrieve', async (req, res) => {
  const { searchField, searchValue } = req.query;

  if (!searchField || !searchValue) {
    return res.status(400).send('Missing search parameters.');
  }

  try {
    const validFields = ['institution_name', 'contact_person', 'phone_number', 'email', 'city', 'state', 'number_of_students', 'response','description', 'datetime','photo_path'];
    if (!validFields.includes(searchField)) {
      return res.status(400).send('Invalid search field.');
    }

    const query = `SELECT * FROM institutions WHERE ${searchField} ILIKE $1`;
    const result = await pool.query(query, [`%${searchValue}%`]);

    if (result.rows.length === 0) {
      res.status(404).send('No matching records found.');
    } else {
      res.json(result.rows);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Server error while retrieving data.');
  }
});



////////////////////////////


////Institution Update and Retrieve//////
// businessopportunityupdate
app.post('/api/business-opportunity', async (req, res) => {
  const {
    personName,
    email,
    phoneNumber,
    address,
    agreedIncentive,
    leadsGenerated,
    totalIncentiveOnDate,
    totalIncentiveSoFar,
  } = req.body;

  try {
    await pool.query(
      'INSERT INTO business_opportunity (person_name, email, phone_number, address, agreed_incentive, leads_generated, total_incentive_on_date, total_incentive_so_far) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [personName, email, phoneNumber, address, agreedIncentive, leadsGenerated, totalIncentiveOnDate, totalIncentiveSoFar]
    );
    res.send('Business opportunity data submitted successfully');
  } catch (err) {
    console.error('Error submitting business opportunity data:', err);
    res.status(500).send('Error submitting business opportunity data');
  }
});

//businessopportunitiesRetrieve
app.get('/api/business-opportunities', async (req, res) => {
  const { searchField, searchValue } = req.query;

  if (!searchField) {
    return res.status(400).send('Search field is required.');
  }

  // Validate search field
  const validFields = ['person_name', 'email', 'phone_number', 'address', 'agreed_incentive', 'leads_generated', 'total_incentive_on_date', 'total_incentive_so_far'];
  if (!validFields.includes(searchField)) {
    return res.status(400).send('Invalid search field.');
  }

  try {
    // Build the query
    let query = `SELECT * FROM business_opportunity`;
    let queryParams = [];

    if (searchValue) {
      query += ` WHERE ${searchField} ILIKE $1`;
      queryParams.push(`%${searchValue}%`);
    }

    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      res.status(404).send('No matching records found.');
    } else {
      res.json(result.rows);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Server error while retrieving data.');
  }
});

////////////////////////////////


//// server update and Retrieve ////
// Endpoint to insert new server data
app.post('/api/servers', async (req, res) => {
  const { serverId, serverName, active, studentName, studentEmail } = req.body;

  // Validate input data
  if (!serverId || !serverName) {
      return res.status(400).send('Server ID and Server Name are required.');
  }

  try {
      // Insert new server data into the database
      await pool.query(
          'INSERT INTO servers (server_id, server_name, active, student_name, student_email) VALUES ($1, $2, $3, $4, $5)',
          [serverId, serverName, active, studentName, studentEmail]
      );
      res.send('Server data inserted successfully');
  } catch (err) {
      console.error('Error inserting server data:', err);
      res.status(500).send('Error inserting server data');
  }
});

// Server Retrieve endpoint
app.get('/api/servers/:serverId', async (req, res) => {
  const { serverId } = req.params;
  try {
      const result = await pool.query('SELECT * FROM servers WHERE server_id = $1', [serverId]);
      if (result.rows.length === 0) {
          return res.status(404).send('Server not found');
      }
      res.json(result.rows[0]);
  } catch (err) {
      console.error('Error retrieving server data:', err);
      res.status(500).send('Error retrieving server data');
  }
});


///////////ALL REPORTS/////////

// Retrieve data from the business_opportunity table
app.get('/api/business', async (req, res) => {
  const queryText = 'SELECT * FROM business_opportunity';
  await queryDatabase(queryText, res);
});

// Retrieve data from the institutions table
app.get('/api/institution', async (req, res) => {
  const queryText = 'SELECT * FROM institutions';
  await queryDatabase(queryText, res);
});

// Retrieve data from the servers table
app.get('/api/server', async (req, res) => {
  const queryText = 'SELECT * FROM servers';
  await queryDatabase(queryText, res);
});
///////////////////////////////////////



// Student Update & retrieve
//student update
app.post("/api/student", async (req, res) => {
  const {
    studentName,
    batchId,
    location,
    country,
    presentAbsent,
    tutorName,
    date,
    classDate,
  } = req.body;

  console.log(req.body);  // Log the incoming form data
  
  try {
    const result = await pool.query(
      `INSERT INTO student_attendance 
        (student_name, batch_id, location, country, present_absent, tutor_name, date, class_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        studentName,
        batchId,
        location,
        country,
        presentAbsent,
        tutorName,
        date,
        classDate,
      ]
    );

    res.status(201).json({
      message: "Form submitted successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({
      message: "Error submitting form",
      error: error.message,
    });
  }
});

//student Retrieve
app.get("/api/students", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT student_name, batch_id, location, country, present_absent, tutor_name, date, class_date FROM student_attendance`
    );

    res.status(200).json({
      message: "Students data retrieved successfully!",
      data: result.rows, // This will contain the list of student records
    });
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({
      message: "Error retrieving student data",
      error: error.message,
    });
  }
});

////////////////////////////////


/// Batch update & Retrieve
//Batch update
app.post("/api/batches", async (req, res) => {
  const { batchId, selectSubject, nextClassDate, studentName, studentEmail } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO batches (batch_id, select_subject, next_class_date, student_name, student_email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [batchId, selectSubject, nextClassDate, studentName, studentEmail]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting batch data:", error);
    res.status(500).json({ error: "Database insertion error" });
  }
});

//batch Retrieve
app.get("/api/batches", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM batches");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching batch data:", error);
    res.status(500).json({ error: "Database retrieval error" });
  }
});

//////////////////////////////////


//Tutor update & Retrieve
//tutor update
app.post("/submit", async (req, res) => {
  const { batchId,tutorDetails, countryLocation, tutorId, phone, startDate } = req.body;

  if (!batchId || !tutorDetails || !countryLocation || !tutorId || !phone || !startDate) {
    return res.status(400).json({ error: "All form fields are required" });
  }

  try {
    await pool.query(
      "INSERT INTO tutor_form (batchId, tutorDetails, countryLocation, tutorId, phone, startDate) VALUES ($1,$2, $3, $4, $5, $6)",
      [batchId,tutorDetails, countryLocation, tutorId, phone, startDate]
    );
    res.status(201).json({ message: "Form data submitted successfully" });
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/retrieve/tutor', async (req, res) => {
  const { field, value } = req.query;
  if (!field || !value) {
    return res.status(400).json({ error: "Both field and value are required." });
  }

  const validFields = ['batchId', 'tutorDetails', 'countryLocation', 'tutorId', 'phone', 'startDate'];
  if (!validFields.includes(field)) {
    return res.status(400).json({ error: "Invalid field parameter." });
  }

  try {
    const result = await pool.query(`SELECT * FROM tutor_form WHERE ${field} = $1`, [value]);
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: "No data found." });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Server error." });
  }
});

/////////////ALL RECORDS/////////////

// Retrieve data from the business_opportunity table
app.get('/api/all/students', async (req, res) => {
  const queryText = 'SELECT * FROM student_attendance';
  await queryDatabase(queryText, res);
});

// Retrieve data from the institutions table
app.get('/api/all/batchs', async (req, res) => {
  const queryText = 'SELECT * FROM batches';
  await queryDatabase(queryText, res);
});

// Retrieve data from the servers table
app.get('/api/all/tutor', async (req, res) => {
  const queryText = 'SELECT * FROM tutor_form';
  await queryDatabase(queryText, res);
});
///////////////////////////////////////
/////////////////////////////////////////////////////






/////followip schools update & retrieve
////followup updade
app.post('/api/followups/school', async (req, res) => {
  const { studentName, parentName, email, phoneNumber, collegeName, salesRefName, startDate } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO followups (student_name, parent_name, email, phone_number, college_name, sales_reference_name, start_date) 
       VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *`,
      [studentName, parentName, email, phoneNumber, collegeName, salesRefName, startDate]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting follow-up data:', error);
    res.status(500).json({ success: false, message: 'Error inserting data' });
  }
});
////followup retrieve
app.get('/retrieve-followups', async (req, res) => {
  const { field, value } = req.query;

  // Check for missing parameters
  if (!field || !value) {
    return res.status(400).send('Missing search parameters.');
  }

  try {
    const validFields = ['student_name', 'parent_name', 'email', 'phone_number', 'college_name', 'sales_reference_name', 'start_date'];
    if (!validFields.includes(field)) {
      return res.status(400).send('Invalid search field.');
    }

    let query = '';
    let queryParams = [];

    if (field === 'start_date') {
      // Special handling for date field
      query = `SELECT * FROM followups WHERE ${field} = $1`;  // Exact match for date
      queryParams = [value];  // Ensure value is in date format YYYY-MM-DD
    } else {
      // For text-based fields use ILIKE for case-insensitive search
      query = `SELECT * FROM followups WHERE ${field} ILIKE $1`;
      queryParams = [`%${value}%`];
    }

    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      return res.status(404).send('No matching records found.');
    } 

    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Server error while retrieving data.');
  }
});

/////followups update
app.put('/update/followups/:id', async (req, res) => {
  const { id } = req.params;
  const followupId = parseInt(id, 10);

  if (isNaN(followupId)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const {
    student_name,
    parent_name = '', // Provide a default value or handle it
    email,
    phone_number,
    college_name,
    sales_reference_name,
    start_date,
    description_1,
    description_2,
    description_3,
    description_4,
    description_5,
    description_6,
    description_7,
    description_8,
    description_9,
    description_10,
  } = req.body;

  if (!student_name || !college_name || !phone_number || !parent_name || !sales_reference_name || !email || !start_date ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const query = `
      UPDATE followups
      SET student_name = $1,
          parent_name = $2,
          email = $3,
          phone_number = $4,
          college_name = $5,
          sales_reference_name = $6,
          start_date = $7,
          description_1 = $8,
          description_2 = $9,
          description_3 = $10,
          description_4 = $11,
          description_5 = $12,
          description_6 = $13,
          description_7 = $14,
          description_8 = $15,
          description_9 = $16,
          description_10 = $17
      WHERE id = $18
      RETURNING *;
    `;

    const values = [
      student_name,
      parent_name,
      email,
      phone_number,
      college_name,
      sales_reference_name,
      start_date,
      description_1,
      description_2,
      description_3,
      description_4,
      description_5,
      description_6,
      description_7,
      description_8,
      description_9,
      description_10,
      followupId,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No follow-up found with that ID' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating followup:', error);
    res.status(500).json({ error: 'Failed to update followup' });
  }
});
// Function to insert data into the database
async function insertDataIntoDatabase(data) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start transaction

    for (const item of data) {
      await client.query(
        `INSERT INTO followups (student_name, parent_name, email, phone_number, college_name, sales_reference_name, start_date) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          item.studentName,
          item.parentName,
          item.email,
          item.phoneNumber,
          item.collegeName,
          item.salesRefName,
          new Date(item.startDate * 1000).toISOString(), // Convert Excel date to ISO format
        ]
      );
    }

    await client.query('COMMIT'); // Commit transaction
  } catch (error) {
    await client.query('ROLLBACK'); // Roll back transaction on error
    console.error("Database insertion error:", error);
    throw error; // Rethrow the error to handle it in the caller
  } finally {
    client.release(); // Release the client back to the pool
  }
}

// Route to handle bulk upload of follow-ups from Excel
app.post("/api/followups/bulk", upload.single("file"), async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet); // Parse the sheet to JSON

    // Log parsed data for debugging
    


    await insertDataIntoDatabase(data); // Call the insert function

    res.status(200).json({ success: true, message: "Data inserted successfully." });
  } catch (error) {
    console.error("Error processing Excel file:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

//////////////////////////////////////







//////payment update and retrieve//////
////payment update
app.post('/api/payment/school', async (req, res) => {
  const { studentName, phoneNumber, paymentType, installmentsRequired, installmentsDone } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO payments (student_name, phone_number, payment_type, installments_required, installments_done) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [studentName, phoneNumber, paymentType, installmentsRequired, installmentsDone]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting payment data:', error);
    res.status(500).json({ success: false, message: 'Error inserting data' });
  }
});
//////retrieve payment
// retrieve payments school
app.get('/retrieve-payments/school', async (req, res) => {
  const { field, value } = req.query;

  if (!field || !value) {
    return res.status(400).send('Missing search parameters.');
  }

  try {
    const validFields = ['student_name', 'phone_number', 'payment_type', 'installments_required', 'installments_done'];
    if (!validFields.includes(field)) {
      return res.status(400).send('Invalid search field.');
    }

    const query = `SELECT * FROM payments WHERE ${field} ILIKE $1`;
    const result = await pool.query(query, [`%${value}%`]);

    if (result.rows.length === 0) {
      return res.status(404).send('No matching records found.');
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Server error while retrieving data.');
  }
});

// Retrieve data from the institutions table
app.get('/api/all/followups/school', async (req, res) => {
  const queryText = 'SELECT * FROM followups';
  await queryDatabase(queryText, res);
});

// Retrieve data from the servers table
app.get('/api/all/payments/school', async (req, res) => {
  const queryText = 'SELECT * FROM payments';
  await queryDatabase(queryText, res);
});
/////////////////////////////////////////////////




////followup update and retrieve engineering
// followup-engi update
app.post('/api/followups/eng', async (req, res) => {
  const { studentName, parentName, email, phoneNumber, collegeName, salesRefName, startDate } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO followups_eng (student_name, parent_name, email, phone_number, college_name, sales_reference_name, start_date) 
       VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *`,
      [studentName, parentName, email, phoneNumber, collegeName, salesRefName, startDate]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting follow-up data:', error);
    res.status(500).json({ success: false, message: 'Error inserting data' });
  }
});
////followup retrieve eng
app.get('/retrieve-followups/eng', async (req, res) => {
  const { field, value } = req.query;

  // Check for missing parameters
  if (!field || !value) {
    return res.status(400).send('Missing search parameters.');
  }

  try {
    const validFields = ['student_name', 'parent_name', 'email', 'phone_number', 'college_name', 'sales_reference_name', 'start_date'];
    if (!validFields.includes(field)) {
      return res.status(400).send('Invalid search field.');
    }

    let query = '';
    let queryParams = [];

    if (field === 'start_date') {
      // Special handling for date field
      query = `SELECT * FROM followups_eng WHERE ${field} = $1`;  // Exact match for date
      queryParams = [value];  // Ensure value is in date format YYYY-MM-DD
    } else {
      // For text-based fields use ILIKE for case-insensitive search
      query = `SELECT * FROM followups_eng WHERE ${field} ILIKE $1`;
      queryParams = [`%${value}%`];
    }

    const result = await pool.query(query, queryParams);

    if (result.rows.length === 0) {
      return res.status(404).send('No matching records found.');
    } 

    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Server error while retrieving data.');
  }
});

/////followups update eng
app.put('/update/eng/followups/:id', async (req, res) => {
  const { id } = req.params;
  const followupId = parseInt(id, 10);

  if (isNaN(followupId)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const {
    student_name,
    parent_name = '', // Provide a default value or handle it
    email,
    phone_number,
    college_name,
    sales_reference_name,
    start_date,
    description_1,
    description_2,
    description_3,
    description_4,
    description_5,
    description_6,
    description_7,
    description_8,
    description_9,
    description_10,
  } = req.body;

  if (!student_name || !college_name || !phone_number || !parent_name || !sales_reference_name || !email || !start_date ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const query = `
      UPDATE followups_eng
      SET student_name = $1,
          parent_name = $2,
          email = $3,
          phone_number = $4,
          college_name = $5,
          sales_reference_name = $6,
          start_date = $7,
          description_1 = $8,
          description_2 = $9,
          description_3 = $10,
          description_4 = $11,
          description_5 = $12,
          description_6 = $13,
          description_7 = $14,
          description_8 = $15,
          description_9 = $16,
          description_10 = $17
      WHERE id = $18
      RETURNING *;
    `;

    const values = [
      student_name,
      parent_name,
      email,
      phone_number,
      college_name,
      sales_reference_name,
      start_date,
      description_1,
      description_2,
      description_3,
      description_4,
      description_5,
      description_6,
      description_7,
      description_8,
      description_9,
      description_10,
      followupId,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No follow-up found with that ID' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating followup:', error);
    res.status(500).json({ error: 'Failed to update followup' });
  }
});
// Function to insert data into the database
async function insertDataIntoDatabase(data) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start transaction

    for (const item of data) {
      await client.query(
        `INSERT INTO followups_eng (student_name, parent_name, email, phone_number, college_name, sales_reference_name, start_date) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          item.studentName,
          item.parentName,
          item.email,
          item.phoneNumber,
          item.collegeName,
          item.salesRefName,
          new Date(item.startDate * 1000).toISOString(), // Convert Excel date to ISO format
        ]
      );
    }

    await client.query('COMMIT'); // Commit transaction
  } catch (error) {
    await client.query('ROLLBACK'); // Roll back transaction on error
    console.error("Database insertion error:", error);
    throw error; // Rethrow the error to handle it in the caller
  } finally {
    client.release(); // Release the client back to the pool
  }
}

// Route to handle bulk upload of follow-ups from Excel
app.post("/api/followups/bulk/eng", upload.single("file"), async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet); // Parse the sheet to JSON

    // Log parsed data for debugging
    

    await insertDataIntoDatabase(data); // Call the insert function

    res.status(200).json({ success: true, message: "Data inserted successfully." });
  } catch (error) {
    console.error("Error processing Excel file:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});
//////////////////////////////////////

////payment update & retrieve
// payments-eng

app.post('/api/payment/eng', async (req, res) => {
  const { studentName, phoneNumber, paymentType, installmentsRequired, installmentsDone } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO payments_engineering (student_name, phone_number, payment_type, installments_required, installments_done) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [studentName, phoneNumber, paymentType, installmentsRequired, installmentsDone]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting payment data:', error);
    res.status(500).json({ success: false, message: 'Error inserting data' });
  }
});

// retrieve payments eng
app.get('/retrieve-payments/eng', async (req, res) => {
  const { field, value } = req.query;

  if (!field || !value) {
    return res.status(400).send('Missing search parameters.');
  }

  try {
    const validFields = ['student_name', 'phone_number', 'payment_type', 'installments_required', 'installments_done'];
    if (!validFields.includes(field)) {
      return res.status(400).send('Invalid search field.');
    }

    const query = `SELECT * FROM payments_engineering WHERE ${field} ILIKE $1`;
    const result = await pool.query(query, [`%${value}%`]);

    if (result.rows.length === 0) {
      return res.status(404).send('No matching records found.');
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Server error while retrieving data.');
  }
});

// Retrieve data from the institutions table
app.get('/api/all/followups/school/eng', async (req, res) => {
  const queryText = 'SELECT * FROM followups_eng';
  await queryDatabase(queryText, res);
});

// Retrieve data from the servers table
app.get('/api/all/payments/school/eng', async (req, res) => {
  const queryText = 'SELECT * FROM payments_engineering';
  await queryDatabase(queryText, res);
});

//////////





// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

