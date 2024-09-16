# API Endpoints

## User Management

### Register User
- **POST** `/api/register`
- **Body**: `{ firstName, lastName, email, password, phoneNumber, city, school, studyAreas, interests, skills, desiredIndustry, about }`
- **Response**: `{ id, token }`

### Login User
- **POST** `/api/login`
- **Body**: `{ email, password }`
- **Response**: `{ token, userId }`

### Get User Profile
- **GET** `/api/users/:userId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User object

### Update User Profile
- **PUT** `/api/users/:userId`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Updated user object
- **Response**: Updated user object

## Booking Management

### Create Booking
- **POST** `/api/bookings`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ coachEmail, date, time, message }`
- **Response**: Created booking object

### Get User Bookings
- **GET** `/api/bookings/user/:userId`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of booking objects

### Update Booking Status (Admin)
- **PUT** `/api/bookings/:bookingId/status`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: `{ status }`
- **Response**: Updated booking object

## Admin Functionalities

### Search Users (Admin)
- **GET** `/api/admin/users/search?term=<searchTerm>`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of user objects

### Get All Bookings (Admin)
- **GET** `/api/admin/bookings`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of booking objects

Implement these endpoints in your Express.js backend, ensuring proper authentication and authorization.