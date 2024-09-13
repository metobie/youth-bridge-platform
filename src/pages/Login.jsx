import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically authenticate the user
    // For now, we'll just navigate to the profile page
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Logga in</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="E-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white bg-opacity-20 text-white placeholder-gray-300"
            />
            <Input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-white bg-opacity-20 text-white placeholder-gray-300"
            />
            <Button type="submit" className="w-full bg-white text-blue-900 hover:bg-gray-100">Logga in</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;