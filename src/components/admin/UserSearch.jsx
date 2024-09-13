import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const UserSearch = ({ searchTerm, setSearchTerm, debouncedSearchTerm, onUserSelect }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Simulating API call for user search
      const fetchedUsers = [
        { id: 1, firstName: 'Tobias', lastName: 'Karlsson', email: 'tobias@mail.se', phoneNumber: '0701234567' },
        { id: 2, firstName: 'Robert', lastName: 'Nesta Nuhu', email: 'robert@mail.se', phoneNumber: '0709876543' }
      ].filter(user => 
        user.firstName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        user.lastName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        user.phoneNumber.includes(debouncedSearchTerm)
      );
      setSearchResults(fetchedUsers);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sök användare</h2>
      <div className="flex items-center mb-4">
        <Search className="mr-2" />
        <Input 
          placeholder="Sök på namn, e-post eller telefonnummer..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white bg-opacity-20 text-white placeholder-gray-300"
        />
      </div>
      {searchResults.length > 0 && (
        <ul className="space-y-2">
          {searchResults.map(user => (
            <li key={user.id}>
              <Button onClick={() => onUserSelect(user)} variant="outline" className="w-full text-left bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30">
                {user.firstName} {user.lastName} - {user.email} - {user.phoneNumber}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearch;