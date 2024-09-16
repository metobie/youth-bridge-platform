const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, ...otherFields } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, phone_number, city, school, study_areas, interests, skills, desired_industry, about) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
      [firstName, lastName, email, hashedPassword, otherFields.phoneNumber, otherFields.city, otherFields.school, otherFields.studyAreas, otherFields.interests, otherFields.skills, otherFields.desiredIndustry, otherFields.about]
    );
    const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET);
    res.status(201).json({ id: result.rows[0].id, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user.id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get user profile
app.get('/api/users/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = result.rows[0];
    delete user.password; // Don't send password to client
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update user profile
app.put('/api/users/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, email, phoneNumber, city, educations, interests, skills, desiredIndustries, about } = req.body;
    const result = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, email = $3, phone_number = $4, city = $5, educations = $6, interests = $7, skills = $8, desired_industries = $9, about = $10 WHERE id = $11 RETURNING *',
      [firstName, lastName, email, phoneNumber, city, JSON.stringify(educations), interests, skills, desiredIndustries, about, userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = result.rows[0];
    delete updatedUser.password; // Don't send password to client
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
});

// Create booking
app.post('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const { coachEmail, date, time, message } = req.body;
    const userId = req.user.userId;
    const result = await pool.query(
      'INSERT INTO bookings (user_id, coach_email, booking_date, booking_time, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, coachEmail, date, time, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Booking failed' });
  }
});

// Get user bookings
app.get('/api/bookings/user/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query('SELECT * FROM bookings WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ error: 'Failed to fetch user bookings' });
  }
});

// Admin: Search users
app.get('/api/admin/users/search', authenticateToken, async (req, res) => {
  try {
    const { term } = req.query;
    const result = await pool.query(
      'SELECT id, first_name, last_name, email, phone_number FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1 OR phone_number ILIKE $1',
      [`%${term}%`]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

// Admin: Get all bookings
app.get('/api/admin/bookings', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT b.*, u.first_name, u.last_name FROM bookings b JOIN users u ON b.user_id = u.id ORDER BY b.booking_date, b.booking_time'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    res.status(500).json({ error: 'Failed to fetch all bookings' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
