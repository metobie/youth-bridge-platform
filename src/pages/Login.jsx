import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MotionContainer = ({ children }) => (
  <motion.div 
    className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

const MotionItem = ({ children }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -20, opacity: 0 }}
    transition={{ type: 'spring', stiffness: 100 }}
  >
    {children}
  </motion.div>
);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <MotionContainer>
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-md">
          <MotionItem>
            <h2 className="text-2xl font-bold mb-6 text-center">Logga in</h2>
          </MotionItem>
          <form onSubmit={handleSubmit} className="space-y-4">
            <MotionItem>
              <Input
                type="email"
                placeholder="E-post (t.ex. anna.andersson@example.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white bg-opacity-20 text-white placeholder-gray-300"
              />
            </MotionItem>
            <MotionItem>
              <Input
                type="password"
                placeholder="Lösenord (t.ex. SecurePass123!)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white bg-opacity-20 text-white placeholder-gray-300"
              />
            </MotionItem>
            <MotionItem>
              <Button type="submit" className="w-full bg-white text-blue-900 hover:bg-gray-100">Logga in</Button>
            </MotionItem>
          </form>
        </div>
      </div>
    </MotionContainer>
  );
};

export default Login;