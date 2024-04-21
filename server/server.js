const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sai1997@@@#',
    database: "sample_pro"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.post('/add_user', (req, res) => {
    console.log(req.body);
    const sql = "INSERT INTO student_details (`name`, `email`, `age`, `gender`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            return res.json({ message: 'Something unexpected has occurred' + err });
        }
        return res.json({ success: "Student added successfully" });
    });
});

app.get('/student', (req, res)=>{
    const sql = "SELECT * FROM student_details";
    db.query(sql, (err, result)=>{
        if(err) res.json({message:"Server error"});
        return res.json(result);
    })
})

app.get('/get_student/:id', (req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM student_details where `id` = ?";
    db.query(sql,[id], (err, result)=>{
        if(err) res.json({message:"Server error"});
        return res.json(result);
    })
})

app.post('/edit_user/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, age, gender } = req.body;
    const sql = "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE `id`=?";
    const values = [name, email, age, gender, id];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating student:", err);
            return res.status(500).json({ error: "Server error" });
        }
        
        return res.json({ success: "Student updated successfully" });
    });
});


app.listen(port, () => {
    console.log('Server listening on port', port);
});
