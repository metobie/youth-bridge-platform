import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserEdit = ({ user }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    console.log('Updated user:', editedUser);
    alert('Användare uppdaterad!');
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Redigera användare</h2>
      <Input 
        name="firstName"
        value={editedUser.firstName}
        onChange={handleChange}
        placeholder="Förnamn"
        className="bg-white bg-opacity-20 text-white placeholder-gray-300"
      />
      <Input 
        name="lastName"
        value={editedUser.lastName}
        onChange={handleChange}
        placeholder="Efternamn"
        className="bg-white bg-opacity-20 text-white placeholder-gray-300"
      />
      <Input 
        name="email"
        value={editedUser.email}
        onChange={handleChange}
        placeholder="E-post"
        className="bg-white bg-opacity-20 text-white placeholder-gray-300"
      />
      <Input 
        name="phoneNumber"
        value={editedUser.phoneNumber}
        onChange={handleChange}
        placeholder="Telefonnummer"
        className="bg-white bg-opacity-20 text-white placeholder-gray-300"
      />
      <Button onClick={handleSave} className="bg-white text-blue-900 hover:bg-gray-100">Uppdatera användare</Button>
    </form>
  );
};

export default UserEdit;