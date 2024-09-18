import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { containerVariants, itemVariants } from '../utils/animationVariants';
import { sendPasswordResetEmail } from '../utils/emailService';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // TODO: Implement the actual password reset logic here
      // This should include:
      // 1. Checking if the email exists in the database
      // 2. Generating a unique reset token
      // 3. Saving the token in the database with an expiration time
      // 4. Sending the reset email
      
      // For now, we'll just simulate sending the email
      const resetToken = 'simulated-reset-token';
      await sendPasswordResetEmail(email, resetToken);
      
      setMessage('Kolla din inbox! Vi har skickat instruktioner för att återställa ditt lösenord.');
    } catch (error) {
      console.error('Error in password reset:', error);
      setMessage('Något gick fel. Försök igen senare.');
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
          <motion.h2 className="text-2xl font-bold mb-6 text-center" variants={itemVariants}>Återställ lösenord</motion.h2>
          {message && <p className="text-green-400 mb-4 text-center">{message}</p>}
          <motion.form onSubmit={handleSubmit} className="space-y-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Input
                type="email"
                placeholder="Ange din e-postadress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white bg-opacity-20 text-white placeholder-gray-300"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full bg-white text-blue-900 hover:bg-gray-100">Skicka återställningslänk</Button>
            </motion.div>
          </motion.form>
          <motion.div className="mt-4 text-center" variants={itemVariants}>
            <Button onClick={() => navigate('/login')} variant="link" className="text-blue-300">Tillbaka till inloggning</Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResetPassword;