import React from 'react';
import { Button } from "@/components/ui/button";

const BookingList = ({ bookings, onBookingAccept }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Bokningar</h2>
      {bookings.length === 0 ? (
        <p>Inga bokningar tillgängliga.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map(booking => (
            <li key={booking.id} className="bg-white bg-opacity-20 p-4 rounded">
              <p>Användare: {booking.userName}</p>
              <p>Coach: {booking.coachEmail}</p>
              <p>Datum: {booking.date}</p>
              <p>Tid: {booking.time}</p>
              <p>Status: {booking.status || 'Väntande'}</p>
              <Button 
                onClick={() => onBookingAccept(booking.id)} 
                className="mt-2 bg-white text-blue-900 hover:bg-gray-100"
                disabled={booking.status === 'accepted'}
              >
                {booking.status === 'accepted' ? 'Accepterad' : 'Acceptera bokning'}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;