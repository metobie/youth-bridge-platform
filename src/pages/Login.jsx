import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: { 
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  },
  exit: { y: -20, opacity: 0 }
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement backend logic for user login
    // Example backend function:
    // async function loginUser(credentials) {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(credentials)
    //   });
    //   if (!response.ok) throw new Error('Login failed');
    //   return response.json();
    // }

    // TODO: Call the backend function and handle the response
    // try {
    //   const result = await loginUser({ email, password });
    //   console.log('User logged in:', result);
    //   // Store the token in localStorage or a secure cookie
    //   localStorage.setItem('token', result.token);
    //   navigate('/profile');
    // } catch (error) {
    //   console.error('Login error:', error);
    //   // Handle error (e.g., show error message to user)
    // }

    // TODO: Remove this temporary navigation after implementing backend logic
    navigate('/profile');
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;

// TODO: Create backend API endpoint for user login
// Example Express.js route:
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (result.rows.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     const user = result.rows[0];
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, userId: user.id });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Login failed' });
//   }
// });
