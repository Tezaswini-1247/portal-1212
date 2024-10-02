const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

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

// API endpoint to handle form submission
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


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// API endpoint to fetch student data
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

// Route to handle form submission
app.post("/submit", async (req, res) => {
  const { batchId, countryLocation, tutorId, phone, startDate } = req.body;

  if (!batchId || !countryLocation || !tutorId || !phone || !startDate) {
    return res.status(400).json({ error: "All form fields are required" });
  }

  try {
    await pool.query(
      "INSERT INTO tutor_form (batchId, countryLocation, tutorId, phone, startDate) VALUES ($1, $2, $3, $4, $5)",
      [batchId, countryLocation, tutorId, phone, startDate]
    );
    res.status(201).json({ message: "Form data submitted successfully" });
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to retrieve form data
app.get("/retrieve", async (req, res) => {
  const { field, value } = req.query;

  // Whitelist the fields that are allowed for querying
  const validFields = ['batchId', 'countryLocation', 'tutorId', 'phone', 'startDate'];

  if (!field || !value) {
    return res.status(400).json({ error: "Both field and value query parameters are required" });
  }

  if (!validFields.includes(field)) {
    return res.status(400).json({ error: `Invalid field: ${field}` });
  }

  try {
    const query = `
      SELECT batchId, countryLocation, tutorId, phone, 
      to_char(startDate, 'YYYY-MM-DD') as startDate 
      FROM tutor_form 
      WHERE ${field} = $1
    `;
    const result = await pool.query(query, [value]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No data found for the selected criteria" });
    }
  } catch (err) {
    console.error("Error retrieving form data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to insert new batch data
app.post("/api/batches", async (req, res) => {
  const { batchId, nextClassDate, studentName, studentEmail } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO batches (batch_id, next_class_date, student_name, student_email) VALUES ($1, $2, $3, $4) RETURNING *",
      [batchId, nextClassDate, studentName, studentEmail]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting batch data:", error);
    res.status(500).json({ error: "Database insertion error" });
  }
});

// Route to retrieve all batch data
app.get("/api/batches", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM batches");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching batch data:", error);
    res.status(500).json({ error: "Database retrieval error" });
  }
});


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


// businessopportunity
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

// followup scholl/degree
app.post('/api/followup/school', async (req, res) => {
  const { studentName, collegeName, phoneNumber, followupNumber, description, acceptancePercentage } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO followups (student_name, college_name, phone_number, followup_number, description, acceptance_percentage) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [studentName, collegeName, phoneNumber, followupNumber, description, acceptancePercentage]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting follow-up data:', error);
    res.status(500).json({ success: false, message: 'Error inserting data' });
  }
});


// Example backend endpoint for follow-ups
app.get('/retrieve-followups', async (req, res) => {
  const { field, value } = req.query;

  // Check for missing parameters
  if (!field || !value) {
    return res.status(400).send('Missing search parameters.');
  }

  try {
    const validFields = ['student_name', 'college_name', 'phone_number', 'followup_number', 'description', 'acceptance_percentage'];
    if (!validFields.includes(field)) {
      return res.status(400).send('Invalid search field.');
    }

    const query = `SELECT * FROM followups WHERE ${field} ILIKE $1`;
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

// followup-engi
app.post('/api/followup/eng', async (req, res) => {
  const { studentName, collegeName, phoneNumber, followupNumber, description, acceptancePercentage } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO followups_engineering (student_name, college_name, phone_number, followup_number, description, acceptance_percentage) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [studentName, collegeName, phoneNumber, followupNumber, description, acceptancePercentage]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting follow-up data:', error);
    res.status(500).json({ success: false, message: 'Error inserting data' });
  }
});
// feedback form engineering
app.post('/feedback/school', async (req, res) => {
  const { studentName, fatherDetails, motherDetails, contactNumber, address, schoolname, interestedOnline, demoDate, salesRefName } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO parents (student_name, father_details, mother_details, contact_number, address, school_name, interested_online, demo_date, sales_ref_name) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [studentName, fatherDetails, motherDetails, contactNumber, address, schoolname, interestedOnline, demoDate, salesRefName]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting parent data:', error);
    res.status(500).json({ success: false, message: 'Error inserting data' });
  }
});

// feedbackform engineering
app.post('/feedback/eng', async (req, res) => {
  const { studentName, fatherDetails, motherDetails, contactNumber, address, schoolname, interestedOnline, demoDate, salesRefName } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO parents_engineering (student_name, father_details, mother_details, contact_number, address, school_name, interested_online, demo_date, sales_ref_name) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [studentName, fatherDetails, motherDetails, contactNumber, address, schoolname, interestedOnline, demoDate, salesRefName]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting parent data:', error);
    res.status(500).json({ success: false, message: 'Error inserting data' });
  }
});

// institutionupdate


app.post('/api/institutions', async (req, res) => {
  const {
      institutionName,
      contactPerson,
      phoneNumber,
      email,
      city,
      state,
      numberOfStudents,
      response,
      datetime
  } = req.body;

  try {
      await pool.query(
          'INSERT INTO institutions (institution_name, contact_person, phone_number, email, city, state, number_of_students,response, datetime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
          [institutionName, contactPerson, phoneNumber, email, city, state, numberOfStudents,response, datetime]
      );
      res.send('Institution data submitted');
  } catch (err) {
      console.error('Error submitting institution data:', err);
      res.status(500).send('Error submitting institution data');
  }
});

// payments schools

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

// retrieve businnes

// Endpoint to retrieve business opportunities with search functionality
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

// Example backend endpoint for follow-ups
app.get('/retrieve-followups/school', async (req, res) => {
  const { field, value } = req.query;

  // Check for missing parameters
  if (!field || !value) {
    return res.status(400).send('Missing search parameters.');
  }

  try {
    const validFields = ['student_name', 'college_name', 'phone_number', 'followup_number', 'description', 'acceptance_percentage'];
    if (!validFields.includes(field)) {
      return res.status(400).send('Invalid search field.');
    }

    const query = `SELECT * FROM followups WHERE ${field} ILIKE $1`;
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

// Example backend endpoint for follow-ups
app.get('/retrieve-followups/eng', async (req, res) => {
  const { field, value } = req.query;

  // Check for missing parameters
  if (!field || !value) {
    return res.status(400).send('Missing search parameters.');
  }

  try {
    const validFields = ['student_name', 'college_name', 'phone_number', 'followup_number', 'description', 'acceptance_percentage'];
    if (!validFields.includes(field)) {
      return res.status(400).send('Invalid search field.');
    }

    const query = `SELECT * FROM followups_engineering WHERE ${field} ILIKE $1`;
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

// Endpoint to retrieve institutions
app.get('/api/institutions/retrieve', async (req, res) => {
  const { searchField, searchValue } = req.query;

  if (!searchField || !searchValue) {
    return res.status(400).send('Missing search parameters.');
  }

  try {
    const validFields = ['institution_name', 'contact_person', 'phone_number', 'email', 'city', 'state', 'number_of_students', 'response', 'datetime'];
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

// retrieve feedbackschools

app.get('/retrieve/feedback/school', async (req, res) => {
  const { field, value } = req.query;

  // Check for missing parameters
  if (!field || !value) {
    return res.status(400).json({ message: 'Missing search parameters.' });
  }

  try {
    const validFields = [
      'student_name',
      'father_details',
      'mother_details',
      'contact_number',
      'address',
      'school_name',
      'interested_online',
      'demo_date',
      'sales_ref_name'
    ];

    // Ensure the search field is valid
    if (!validFields.includes(field)) {
      return res.status(400).json({ message: 'Invalid search field.' });
    }

    // Use ILIKE for case-insensitive search with wildcard pattern
    const query = `SELECT * FROM parents WHERE ${field} ILIKE $1`;
    const result = await pool.query(query, [`%${value}%`]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No matching records found.' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ message: 'Server error while retrieving data.' });
  }
});

// retrieve feedbback eng

app.get('/retrieve-parents/eng', async (req, res) => {
  const { field, value } = req.query;

  // Check for missing parameters
  if (!field || !value) {
    return res.status(400).json({ message: 'Missing search parameters.' });
  }

  try {
    const validFields = [
      'student_name',
      'father_details',
      'mother_details',
      'contact_number',
      'address',
      'school_name',
      'interested_online',
      'demo_date',
      'sales_ref_name'
    ];

    // Ensure the search field is valid
    if (!validFields.includes(field)) {
      return res.status(400).json({ message: 'Invalid search field.' });
    }

    // Use ILIKE for case-insensitive search with wildcard pattern
    const query = `SELECT * FROM parents_engineering WHERE ${field} ILIKE $1`;
    const result = await pool.query(query, [`%${value}%`]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No matching records found.' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ message: 'Server error while retrieving data.' });
  }
});

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
