import React, { useState, useCallback } from 'react';
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
  const [bookings, setBookings] = useState([
    { id: 1, userName: 'Anna Andersson', coachEmail: 'tim@bearider.se', date: '2024-03-20', time: '10:00' },
    { id: 2, userName: 'Erik Eriksson', coachEmail: 'coach2@example.com', date: '2024-03-21', time: '14:00' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleUserSelect = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const handleBookingAccept = useCallback((bookingId) => {
    console.log('Accepted booking:', bookingId);
    // Here you would typically update the booking status in your backend
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