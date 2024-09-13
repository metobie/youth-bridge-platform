import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="min-h-screen bg-cover bg-fixed bg-center p-8" style={{ backgroundImage: "url('https://i.imgur.com/1Wk8orw.jpeg')" }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Portal</h1>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Användare</h2>
            <ul className="space-y-2">
              {users.map(user => (
                <li key={user.id}>
                  <Button onClick={() => handleUserSelect(user)} variant="outline" className="w-full text-left">
                    {user.firstName} {user.lastName}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            {selectedUser && (
              <form onSubmit={handleUserUpdate} className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Redigera användare</h2>
                <Input 
                  value={selectedUser.firstName}
                  onChange={(e) => setSelectedUser({...selectedUser, firstName: e.target.value})}
                  placeholder="Förnamn"
                />
                <Input 
                  value={selectedUser.lastName}
                  onChange={(e) => setSelectedUser({...selectedUser, lastName: e.target.value})}
                  placeholder="Efternamn"
                />
                <Input 
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                  placeholder="E-post"
                />
                <Button type="submit" className="bg-white text-blue-600 hover:bg-gray-100">Uppdatera användare</Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Bokningar</h2>
          <ul className="space-y-4">
            {bookings.map(booking => (
              <li key={booking.id} className="bg-gray-100 p-4 rounded">
                <p>Användare: {users.find(u => u.id === booking.userId)?.firstName} {users.find(u => u.id === booking.userId)?.lastName}</p>
                <p>Coach: {booking.coachEmail}</p>
                <p>Datum: {booking.date}</p>
                <p>Tid: {booking.time}</p>
                <Button onClick={() => handleBookingAccept(booking.id)} className="mt-2 bg-white text-blue-600 hover:bg-gray-100">Acceptera bokning</Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;