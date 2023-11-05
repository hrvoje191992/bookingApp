const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hospitality'
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
  connection.query('SELECT * FROM guests ORDER BY check_in_date DESC', (error, results) => {
    if (error) throw error;
    res.render('index', { guests: results });
  });
});

// Add guest route
app.post('/add-guest', (req, res) => {
  const { name, room_number, check_in_date, check_out_date } = req.body;
  connection.query('INSERT INTO guests SET ?', { name, room_number, check_in_date, check_out_date }, (error, results) => {
    if (error) throw error;
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
