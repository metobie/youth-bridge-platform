import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Upload } from 'lucide-react';

const BookingList = ({ bookings, onBookingAccept }) => {
  const [bookingResponses, setBookingResponses] = useState({});
  const [bookingFiles, setBookingFiles] = useState({});

  const handleResponseChange = (bookingId, response) => {
    setBookingResponses({...bookingResponses, [bookingId]: response});
  };

  const handleFileUpload = (bookingId, files) => {
    setBookingFiles({...bookingFiles, [bookingId]: files});
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Bokningar</h2>
      <ul className="space-y-4">
        {bookings.map(booking => (
          <li key={booking.id} className="bg-white bg-opacity-20 p-4 rounded">
            <p>Användare: {booking.userName}</p>
            <p>Coach: {booking.coachEmail}</p>
            <p>Datum: {booking.date}</p>
            <p>Tid: {booking.time}</p>
            <Textarea
              placeholder="Lägg till svar..."
              value={bookingResponses[booking.id] || ''}
              onChange={(e) => handleResponseChange(booking.id, e.target.value)}
              className="mt-2 bg-white bg-opacity-20 text-white placeholder-gray-300"
            />
            <div className="mt-2 flex items-center">
              <Upload className="mr-2" />
              <Input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(booking.id, e.target.files)}
                className="bg-white bg-opacity-20 text-white"
              />
            </div>
            <Button 
              onClick={() => onBookingAccept(booking.id, bookingResponses[booking.id], bookingFiles[booking.id])} 
              className="mt-2 bg-white text-blue-900 hover:bg-gray-100"
            >
              Acceptera bokning
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;