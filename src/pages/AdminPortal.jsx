import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Simulating fetching users and bookings
    setUsers([
      { id: 1, firstName: 'Tobias', lastName: 'Karlsson', email: 'tobias@mail.se' },
      { id: 2, firstName: 'Robert', lastName: 'Nesta Nuhu', email: 'robert@mail.se' }
    ]);
    setBookings([
      { id: 1, userId: 1, coachEmail: 'tim@bearider.se', date: '2024-03-18', time: '09:00' },
      { id: 2, userId: 2, coachEmail: 'eyobel@bearider.se', date: '2024-03-19', time: '10:15' }
    ]);
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();
    console.log('Updated user:', selectedUser);
    // Here you would typically send the updated user data to your backend
    alert('Användare uppdaterad!');
  };

  const handleBookingAccept = (bookingId) => {
    console.log('Accepted booking:', bookingId);
    // Here you would typically update the booking status in your backend
    alert('Bokning accepterad!');
  };

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
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">Användare</h2>
              <ul className="space-y-2">
                {users.map(user => (
                  <motion.li key={user.id} variants={itemVariants}>
                    <Button onClick={() => handleUserSelect(user)} variant="outline" className="w-full text-left bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30">
                      {user.firstName} {user.lastName}
                    </Button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              {selectedUser && (
                <motion.form onSubmit={handleUserUpdate} className="space-y-4" variants={containerVariants}>
                  <h2 className="text-2xl font-bold mb-4">Redigera användare</h2>
                  <Input 
                    value={selectedUser.firstName}
                    onChange={(e) => setSelectedUser({...selectedUser, firstName: e.target.value})}
                    placeholder="Förnamn"
                    className="bg-white bg-opacity-20 text-white placeholder-gray-300"
                  />
                  <Input 
                    value={selectedUser.lastName}
                    onChange={(e) => setSelectedUser({...selectedUser, lastName: e.target.value})}
                    placeholder="Efternamn"
                    className="bg-white bg-opacity-20 text-white placeholder-gray-300"
                  />
                  <Input 
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                    placeholder="E-post"
                    className="bg-white bg-opacity-20 text-white placeholder-gray-300"
                  />
                  <Button type="submit" className="bg-white text-blue-900 hover:bg-gray-100">Uppdatera användare</Button>
                </motion.form>
              )}
            </motion.div>
          </motion.div>

          <motion.div className="mt-8" variants={containerVariants}>
            <h2 className="text-2xl font-bold mb-4">Bokningar</h2>
            <ul className="space-y-4">
              {bookings.map(booking => (
                <motion.li key={booking.id} className="bg-white bg-opacity-20 p-4 rounded" variants={itemVariants}>
                  <p>Användare: {users.find(u => u.id === booking.userId)?.firstName} {users.find(u => u.id === booking.userId)?.lastName}</p>
                  <p>Coach: {booking.coachEmail}</p>
                  <p>Datum: {booking.date}</p>
                  <p>Tid: {booking.time}</p>
                  <Button onClick={() => handleBookingAccept(booking.id)} className="mt-2 bg-white text-blue-900 hover:bg-gray-100">Acceptera bokning</Button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AdminPortal;