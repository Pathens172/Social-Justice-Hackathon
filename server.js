const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// Middleware
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('Justice Access App API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const mysql = require('mysql2');

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    console.log('Connected to the MySQL database');
  }
});

// Find legal aid by location
app.get('/api/legalaid', (req, res) => {
    const { location } = req.query;
  
    const query = `SELECT * FROM legal_aid WHERE location LIKE ?`;
    db.query(query, [`%${location}%`], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving legal aid services', error: err });
      }
  
      res.json(results);
    });
  });

  // Track court case by case number
app.get('/api/courtcase', (req, res) => {
    const { case_number } = req.query;
  
    const query = `SELECT * FROM court_cases WHERE case_number = ?`;
    db.query(query, [case_number], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error retrieving court case', error: err });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Case not found' });
      }
  
      res.json(results[0]);
    });
  });

  // Know your rights (static information)
app.get('/api/rights', (req, res) => {
    const rightsInfo = {
      laborRights: "You are entitled to fair wages, safe working conditions, and protection from unfair dismissal.",
      civilRights: "You have the right to freedom of speech, assembly, and equal protection under the law.",
      propertyRights: "You have the right to own property and to be protected from unlawful seizure."
    };
  
    res.json(rightsInfo);
  });

  if (results.length === 0) {
    return res.status(404).json({ message: 'No data found' });
  }

  // Track court case by case number
app.get('/api/courtcase', (req, res) => {
    const { case_number } = req.query;
  
    if (!case_number) {
        // Check if the case number is provided in the query
        return res.status(400).json({ message: 'Case number is required' });
    }
  
    const query = `SELECT * FROM court_cases WHERE case_number = ?`;
    db.query(query, [case_number], (err, results) => {
        if (err) {
            // Handling database connection or query errors
            return res.status(500).json({ message: 'Error retrieving court case', error: err });
        }
  
        if (results.length === 0) {
            // If no results are found, send a 404 response
            return res.status(404).json({ message: 'Case not found' });
        }
  
        // If data is found, send it in the response
        res.json(results[0]);
    });
});

const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied, token missing' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Example protected route
app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});