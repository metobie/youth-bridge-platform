import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Booking = () => {
  const [selectedCoach, setSelectedCoach] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const coaches = [
    { name: 'Eyobel Samson', email: 'eyobel@bearider.se' },
    { name: 'Tim Omorogieva', email: 'tim@bearider.se' }
  ];

  const availableDates = ['2024-03-18', '2024-03-19', '2024-03-20']; // Monday to Wednesday
  const availableTimes = ['09:00', '09:45', '10:15'];

  const handleBooking = () => {
    console.log('Booking:', { selectedCoach, selectedDate, selectedTime });
    // Here you would typically send the booking data to your backend
    alert('Bokning skickad!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white">
      <header className="p-4">
        <img src="https://i.imgur.com/Z8YkO4R.png" alt="Rider Logo" className="w-32" />
      </header>
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Boka online coaching</h2>
          <div className="space-y-4">
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

            <Button onClick={handleBooking} className="w-full bg-white text-blue-900 hover:bg-gray-100">Boka tid</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;