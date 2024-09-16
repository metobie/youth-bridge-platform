import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

const Booking = () => {
  const [selectedCoach, setSelectedCoach] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);

  // TODO: Fetch coaches, available dates, and times from the backend
  const coaches = [
    { name: 'Eyobel Samson', email: 'eyobel@bearider.se' },
    { name: 'Tim Omorogieva', email: 'tim@bearider.se' }
  ];

  const availableDates = ['2024-03-18', '2024-03-19', '2024-03-20']; // Monday to Wednesday
  const availableTimes = ['09:00', '09:45', '10:15'];

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleBooking = async () => {
    // TODO: Implement backend logic for booking
    // Example backend function:
    // async function createBooking(bookingData) {
    //   const response = await fetch('/api/bookings', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(bookingData)
    //   });
    //   if (!response.ok) throw new Error('Booking failed');
    //   return response.json();
    // }

    const formData = new FormData();
    formData.append('coach', selectedCoach);
    formData.append('date', selectedDate);
    formData.append('time', selectedTime);
    formData.append('message', message);
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    // TODO: Call the backend function and handle the response
    // try {
    //   const result = await createBooking(formData);
    //   console.log('Booking created:', result);
    //   alert('Bokning skickad!');
    // } catch (error) {
    //   console.error('Booking error:', error);
    //   alert('Det uppstod ett fel vid bokningen. Försök igen senare.');
    // }

    // Simulating an API call
    setTimeout(() => {
      alert('Bokning skickad!');
    }, 1000);
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
        <motion.div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-md" variants={itemVariants}>
          <motion.h2 className="text-2xl font-bold mb-6  text-center" variants={itemVariants}>Boka online coaching</motion.h2>
          <motion.div className="space-y-4" variants={containerVariants}>
            <SelectField
              value={selectedCoach}
              onChange={setSelectedCoach}
              options={coaches.map(coach => ({ value: coach.email, label: coach.name }))}
              placeholder="Välj coach"
            />
            <SelectField
              value={selectedDate}
              onChange={setSelectedDate}
              options={availableDates.map(date => ({ value: date, label: date }))}
              placeholder="Välj datum"
            />
            <SelectField
              value={selectedTime}
              onChange={setSelectedTime}
              options={availableTimes.map(time => ({ value: time, label: time }))}
              placeholder="Välj tid"
            />
            <motion.div variants={itemVariants}>
              <Textarea
                placeholder="Lämna ett meddelande (valfritt)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-white bg-opacity-20 text-white border-white border-opacity-20 placeholder-gray-400"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input
                type="file"
                onChange={handleFileChange}
                multiple
                className="bg-white bg-opacity-20 text-white border-white border-opacity-20 file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:hover:bg-blue-700 cursor-pointer"
              />
              <p className="text-sm mt-2 text-gray-300">Du kan bifoga en eller flera filer (valfritt)</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button onClick={handleBooking} className="w-full bg-white text-blue-900 hover:bg-gray-100">Boka tid</Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SelectField = ({ value, onChange, options, placeholder }) => (
  <motion.div variants={itemVariants}>
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="bg-white bg-opacity-20 text-white border-white border-opacity-20">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </motion.div>
);

export default Booking;

// TODO: Create PostgreSQL table for bookings
// Example SQL:
// CREATE TABLE bookings (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER REFERENCES users(id),
//   coach_email VARCHAR(100) NOT NULL,
//   booking_date DATE NOT NULL,
//   booking_time TIME NOT NULL,
//   message TEXT,
//   status VARCHAR(20) DEFAULT 'pending',
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// TODO: Create table for storing file information
// CREATE TABLE booking_files (
//   id SERIAL PRIMARY KEY,
//   booking_id INTEGER REFERENCES bookings(id),
//   file_name VARCHAR(255) NOT NULL,
//   file_path VARCHAR(255) NOT NULL,
//   uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// TODO: Create backend API endpoint for creating bookings
// Example Express.js route:
// app.post('/api/bookings', authenticateToken, upload.array('files'), async (req, res) => {
//   try {
//     const { coach, date, time, message } = req.body;
//     const userId = req.user.id; // Assuming you have user information in the token
//     const result = await db.query(
//       'INSERT INTO bookings (user_id, coach_email, booking_date, booking_time, message) VALUES ($1, $2, $3, $4, $5) RETURNING id',
//       [userId, coach, date, time, message]
//     );
//     const bookingId = result.rows[0].id;
    
//     // Handle file uploads
//     if (req.files && req.files.length > 0) {
//       for (const file of req.files) {
//         await db.query(
//           'INSERT INTO booking_files (booking_id, file_name, file_path) VALUES ($1, $2, $3)',
//           [bookingId, file.originalname, file.path]
//         );
//       }
//     }
    
//     res.status(201).json({ id: bookingId, message: 'Booking created successfully' });
//   } catch (error) {
//     console.error('Booking error:', error);
//     res.status(500).json({ error: 'Booking failed' });
//   }
// });

// TODO: Create backend API endpoints for fetching available coaches, dates, and times
// Example Express.js routes:
// app.get('/api/coaches', async (req, res) => {
//   try {
//     const result = await db.query('SELECT name, email FROM coaches WHERE is_active = true');
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching coaches:', error);
//     res.status(500).json({ error: 'Failed to fetch coaches' });
//   }
// });

// app.get('/api/available-dates', async (req, res) => {
//   // Implement logic to fetch available dates based on coach schedules and existing bookings
//   // This might involve complex queries and business logic
// });

// app.get('/api/available-times', async (req, res) => {
//   // Implement logic to fetch available times for a specific date and coach
//   // This might involve checking the coach's schedule and existing bookings
// });
