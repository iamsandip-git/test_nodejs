const express = require('express');
const mysql = require('mysql');
const app = express();
const config = require('./config/config.json'); // Import the configuration

let db;

function connectToDatabase() {
  db = mysql.createConnection(config.db);

  db.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(connectToDatabase, 2000); // Retry connection every 2 seconds
      return;
    }
    console.log('Connected to MySQL database');
    createTableAndInsertData(); // Call this function after successful connection
  });

  db.on('error', err => {
    console.error('MySQL connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connectToDatabase(); // Reconnect if connection is lost
    } else {
      throw err;
    }
  });
}

function createTableAndInsertData() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      publication_year INT,
      genre VARCHAR(50)
    )
  `;

  const insertDataQuery = `
    INSERT INTO books (title, author, publication_year, genre)
    VALUES
      ('Book 1', 'Author 1', 2020, 'Fiction'),
      ('Book 2', 'Author 2', 2018, 'Mystery'),
      ('Book 3', 'Author 3', 2015, 'Science Fiction')
  `;

  db.query(createTableQuery, err => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created');
      db.query(insertDataQuery, err => {
        if (err) {
          console.error('Error inserting data:', err);
        } else {
          console.log('Data inserted');
        }
      });
    }
  });
}

connectToDatabase(); // Initial connection

// Main endpoint to fetch a list of books
app.get('/books', (req, res) => {
  if (!db) {
    return res.status(500).json({ error: 'Database not initialized. Install the database at /install.' });
  }

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

// Endpoint to create the table and insert data
app.get('/install', (req, res) => {
  createTableAndInsertData();
  res.send('Installation completed');
});

// ... Rest of the code ...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
