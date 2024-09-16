# Database Schema

## Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  city VARCHAR(50),
  school VARCHAR(100),
  study_areas TEXT,
  interests TEXT[],
  skills TEXT[],
  desired_industry VARCHAR(50),
  about TEXT,
  profile_image VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Bookings Table

```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  coach_email VARCHAR(100) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Booking Files Table

```sql
CREATE TABLE booking_files (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id),
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

To create these tables in PostgreSQL, connect to your database and run the SQL commands above.