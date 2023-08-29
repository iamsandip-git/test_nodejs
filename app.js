const express = require('express');
const mysql = require('mysql');
const app = express();
const config = require('./config/config.json'); // Import the configuration

// MySQL Connection Setup
const db = mysql.createConnection(config.db);

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// ... Rest of the code ...

// Create a route for fetching a list of books
app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Error fetching data' });
    } else {
      res.json(results);
    }
  });
});

// ... Rest of the code ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
