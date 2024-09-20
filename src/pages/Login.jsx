import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '../contexts/AuthContext';
import { containerVariants, itemVariants } from '../utils/animationVariants';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(email, password);
      navigate(`/profile/${user.id}`);
    } catch (error) {
      setError('Invalid email or password');
    }
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
          <motion.h2 className="text-2xl font-bold mb-6 text-center" variants={itemVariants}>Logga in</motion.h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <motion.form onSubmit={handleSubmit} className="space-y-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Input
                type="email"
                placeholder="E-post"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white bg-opacity-20 text-white placeholder-gray-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input
                type="password"
                placeholder="Lösenord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white bg-opacity-20 text-white placeholder-gray-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full bg-white text-blue-900 hover:bg-gray-100">Logga in</Button>
            </motion.div>
          </motion.form>
          <motion.p className="mt-4 text-center" variants={itemVariants}>
            Har du inget konto? <Link to="/register" className="text-blue-300 hover:underline">Registrera dig här</Link>
          </motion.p>
          <motion.p className="mt-2 text-center text-sm text-gray-400" variants={itemVariants}>
            Statisk inloggning: metobie@icloud.com / Start123
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
