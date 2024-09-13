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

  const coaches = [
    { name: 'Eyobel Samson', email: 'eyobel@bearider.se' },
    { name: 'Tim Omorogieva', email: 'tim@bearider.se' }
  ];

  const availableDates = ['2024-03-18', '2024-03-19', '2024-03-20']; // Monday to Wednesday
  const availableTimes = ['09:00', '09:45', '10:15'];

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleBooking = () => {
    console.log('Booking:', { selectedCoach, selectedDate, selectedTime, message, files });
    // Here you would typically send the booking data to your backend
    // You'd need to use FormData to send files along with other data
    const formData = new FormData();
    formData.append('coach', selectedCoach);
    formData.append('date', selectedDate);
    formData.append('time', selectedTime);
    formData.append('message', message);
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

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
          <motion.h2 className="text-2xl font-bold mb-6 text-center" variants={itemVariants}>Boka online coaching</motion.h2>
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Select onValueChange={setSelectedCoach}>
                <SelectTrigger className="bg-white bg-opacity-20 text-white border-white border-opacity-20">
                  <SelectValue placeholder="Välj coach" />
                </SelectTrigger>
                <SelectContent>
                  {coaches.map(coach => (
                    <SelectItem key={coach.email} value={coach.email}>{coach.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Select onValueChange={setSelectedDate}>
                <SelectTrigger className="bg-white bg-opacity-20 text-white border-white border-opacity-20">
                  <SelectValue placeholder="Välj datum" />
                </SelectTrigger>
                <SelectContent>
                  {availableDates.map(date => (
                    <SelectItem key={date} value={date}>{date}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Select onValueChange={setSelectedTime}>
                <SelectTrigger className="bg-white bg-opacity-20 text-white border-white border-opacity-20">
                  <SelectValue placeholder="Välj tid" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

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

export default Booking;