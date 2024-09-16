import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDebounce } from '../hooks/useDebounce';
import UserSearch from '../components/admin/UserSearch';
import UserEdit from '../components/admin/UserEdit';
import BookingList from '../components/admin/BookingList';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: { 
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  },
  exit: { y: -20, opacity: 0 }
};

const AdminPortal = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // TODO: Implement backend logic for fetching users and bookings
  // Example backend functions:
  // async function searchUsers(term) {
  //   const response = await fetch(`/api/users/search?term=${encodeURIComponent(term)}`);
  //   if (!response.ok) throw new Error('Failed to search users');
  //   return response.json();
  // }

  // async function fetchBookings() {
  //   const response = await fetch('/api/bookings');
  //   if (!response.ok) throw new Error('Failed to fetch bookings');
  //   return response.json();
  // }

  useEffect(() => {
    // TODO: Fetch bookings from backend
    // fetchBookings()
    //   .then(fetchedBookings => setBookings(fetchedBookings))
    //   .catch(error => console.error('Error fetching bookings:', error));

    // Simulating fetching bookings
    setBookings([
      { id: 1, userName: 'Anna Andersson', coachEmail: 'tim@bearider.se', date: '2024-03-20', time: '10:00' },
      { id: 2, userName: 'Erik Eriksson', coachEmail: 'eyobel@bearider.se', date: '2024-03-21', time: '14:00' },
    ]);
  }, []);

  const handleUserSelect = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const handleBookingAccept = useCallback(async (bookingId) => {
    // TODO: Implement backend logic for accepting bookings
    // Example:
    // try {
    //   const response = await fetch(`/api/bookings/${bookingId}/accept`, { method: 'POST' });
    //   if (!response.ok) throw new Error('Failed to accept booking');
    //   const updatedBooking = await response.json();
    //   setBookings(prevBookings => 
    //     prevBookings.map(booking => 
    //       booking.id === bookingId ? { ...booking, status: 'accepted' } : booking
    //     )
    //   );
    //   alert('Bokning accepterad!');
    // } catch (error) {
    //   console.error('Error accepting booking:', error);
    //   alert('Det uppstod ett fel vid accepterandet av bokningen. Försök igen senare.');
    // }

    // Simulating booking acceptance
    console.log('Accepted booking:', bookingId);
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'accepted' } : booking
      )
    );
    alert('Bokning accepterad!');
  }, []);

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex-grow flex items-center justify-center px-4" variants={containerVariants}>
        <motion.div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg max-w-4xl w-full" variants={itemVariants}>
          <motion.h1 className="text-3xl font-bold mb-6" variants={itemVariants}>Admin Portal</motion.h1>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants}>
            <UserSearch 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              debouncedSearchTerm={debouncedSearchTerm}
              onUserSelect={handleUserSelect}
            />
            {selectedUser && <UserEdit user={selectedUser} />}
          </motion.div>

          <BookingList bookings={bookings} onBookingAccept={handleBookingAccept} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminPortal;

// TODO: Create backend API endpoints for admin functionalities
// Example Express.js routes:

// Search users
// app.get('/api/users/search', authenticateAdmin, async (req, res) => {
//   try {
//     const { term } = req.query;
//     const result = await db.query(
//       'SELECT id, first_name, last_name, email, phone_number FROM users WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR email ILIKE $1 OR phone_number ILIKE $1',
//       [`%${term}%`]
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error searching users:', error);
//     res.status(500).json({ error: 'Failed to search users' });
//   }
// });

// Fetch all bookings
// app.get('/api/bookings', authenticateAdmin, async (req, res) => {
//   try {
//     const result = await db.query(
//       'SELECT b.id, u.first_name || \' \' || u.last_name AS user_name, b.coach_email, b.booking_date, b.booking_time, b.status FROM bookings b JOIN users u ON b.user_id = u.id ORDER BY b.booking_date, b.booking_time'
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({ error: 'Failed to fetch bookings' });
//   }
// });

// Accept a booking
// app.post('/api/bookings/:id/accept', authenticateAdmin, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await db.query(
//       'UPDATE bookings SET status = \'accepted\' WHERE id = $1 RETURNING *',
//       [id]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Booking not found' });
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error accepting booking:', error);
//     res.status(500).json({ error: 'Failed to accept booking' });
//   }
// });

// TODO: Implement authentication middleware for admin routes
// function authenticateAdmin(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     if (!user.isAdmin) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }
