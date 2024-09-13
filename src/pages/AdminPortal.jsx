import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Upload } from 'lucide-react';
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

  const handleUserSelect = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const handleBookingAccept = useCallback((bookingId, response, files) => {
    console.log('Accepted booking:', bookingId, 'Response:', response, 'Files:', files);
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