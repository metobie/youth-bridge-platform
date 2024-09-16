# Backend Implementation Guide

## Setup

1. Install required packages:
   ```
   npm install express pg bcrypt jsonwebtoken cors
   ```

2. Create a `.env` file for environment variables:
   ```
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   ```

3. Set up the PostgreSQL database using the schema in `database_schema.md`.

## Implementation Steps

1. Create a database connection pool:

```javascript
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
```

2. Implement authentication middleware:

```javascript
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
```

3. Implement API endpoints as described in `api_endpoints.md`.

4. Example implementation for user registration:

```javascript
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
```

5. Implement error handling and logging throughout the application.

6. Set up CORS to allow requests from your frontend:

```javascript
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
```

7. Create separate route files for different functionalities (e.g., `userRoutes.js`, `bookingRoutes.js`, `adminRoutes.js`) to keep the main server file clean.

8. Implement file upload functionality for bookings using a library like `multer`.

9. Create scheduled jobs (e.g., for sending reminders) using a library like `node-cron`.

Remember to thoroughly test all endpoints and implement proper input validation and sanitization.