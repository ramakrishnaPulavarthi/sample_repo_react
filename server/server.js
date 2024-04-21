const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

const port = 5000;

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sai1997@@@#',
    database: 'sample_pro'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1); // Exit the process if unable to connect to the database
    }
    console.log('Connected to database');
});

// Add a new user
app.post('/add_student', (req, res) => {
    const { name, email, age, gender } = req.body;
    const sql = "INSERT INTO student_details (`name`, `email`, `age`, `gender`) VALUES (?, ?, ?, ?)";
    const values = [name, email, age, gender];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            return res.status(500).json({ message: 'Something unexpected has occurred' });
        }
        return res.json({ success: "Student added successfully" });
    });
});

// Get all students
app.get('/studentList', (req, res) => {
    const sql = "SELECT * FROM student_details";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            return res.status(500).json({ message: 'Something unexpected has occurred' });
        }
        return res.json(result);
    });
});

// Get a specific student by ID
app.get('/get_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student_details WHERE `id` = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            return res.status(500).json({ message: 'Something unexpected has occurred' });
        }
        return res.json(result);
    });
});

// Update a user
app.post('/edit_student/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, age, gender } = req.body;
    const sql = "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE `id`=?";
    const values = [name, email, age, gender, id];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            return res.status(500).json({ error: 'Something unexpected has occurred' });
        }
        return res.json({ success: "Student updated successfully" });
    });
});

// Delete a user
app.delete('/delete_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM student_details WHERE `id` = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            return res.status(500).json({ error: 'Something unexpected has occurred' });
        }
        if (result.affectedRows === 0) {
            // If no rows were affected, it means the record with the given ID doesn't exist
            return res.status(404).json({ error: 'Record not found' });
        }
        return res.json({ success: "Student deleted successfully" });
    });
});


// Start the server
app.listen(port, () => {
    console.log('Server listening on port', port);
});
