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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center" style={{ backgroundImage: "url('https://i.imgur.com/1Wk8orw.jpeg')" }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Boka online coaching</h2>
        <div className="space-y-4">
          <Select onValueChange={setSelectedCoach}>
            <SelectTrigger>
              <SelectValue placeholder="Välj coach" />
            </SelectTrigger>
            <SelectContent>
              {coaches.map(coach => (
                <SelectItem key={coach.email} value={coach.email}>{coach.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedDate}>
            <SelectTrigger>
              <SelectValue placeholder="Välj datum" />
            </SelectTrigger>
            <SelectContent>
              {availableDates.map(date => (
                <SelectItem key={date} value={date}>{date}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedTime}>
            <SelectTrigger>
              <SelectValue placeholder="Välj tid" />
            </SelectTrigger>
            <SelectContent>
              {availableTimes.map(time => (
                <SelectItem key={time} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleBooking} className="w-full bg-white text-blue-600 hover:bg-gray-100">Boka tid</Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;