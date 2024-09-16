import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { containerVariants, itemVariants } from '../utils/animationVariants';
import SkillSelector from '../components/SkillSelector';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', phoneNumber: '', city: '',
    school: '', studyAreas: '', interests: '', skills: [], desiredIndustry: '', about: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement backend logic for user registration
    // Example backend function:
    // async function registerUser(userData) {
    //   const response = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(userData)
    //   });
    //   if (!response.ok) throw new Error('Registration failed');
    //   return response.json();
    // }

    // TODO: Call the backend function and handle the response
    // try {
    //   const result = await registerUser(formData);
    //   console.log('User registered:', result);
    //   navigate('/profile');
    // } catch (error) {
    //   console.error('Registration error:', error);
    //   // Handle error (e.g., show error message to user)
    // }

    // TODO: Remove this temporary navigation after implementing backend logic
    console.log(formData);
    navigate('/profile');
  };

  const inputClass = "bg-white bg-opacity-20 text-white placeholder-white";

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex-grow flex items-center justify-center px-4 py-8" variants={containerVariants}>
        <motion.div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-2xl" variants={itemVariants}>
          <motion.h2 className="text-2xl font-bold mb-6 text-center" variants={itemVariants}>Registrera dig</motion.h2>
          <motion.form onSubmit={handleSubmit} className="space-y-4" variants={containerVariants}>
            <InputGroup>
              <Input name="firstName" placeholder="Förnamn (t.ex. Anna)" onChange={handleChange} required className={inputClass} />
              <Input name="lastName" placeholder="Efternamn (t.ex. Andersson)" onChange={handleChange} required className={inputClass} />
            </InputGroup>
            <Input name="email" type="email" placeholder="E-post (t.ex. anna.andersson@example.com)" onChange={handleChange} required className={inputClass} />
            <Input name="password" type="password" placeholder="Lösenord (minst 8 tecken)" onChange={handleChange} required className={inputClass} />
            <Input name="phoneNumber" placeholder="Telefonnummer (t.ex. 0701234567)" onChange={handleChange} required className={inputClass} />
            <Input name="city" placeholder="Ort (t.ex. Stockholm)" onChange={handleChange} required className={inputClass} />
            <Input name="school" placeholder="Skola/Universitet (t.ex. Stockholms universitet)" onChange={handleChange} required className={inputClass} />
            <Input name="studyAreas" placeholder="Studieområden (t.ex. Datavetenskap, Ekonomi)" onChange={handleChange} required className={inputClass} />
            <Input name="interests" placeholder="Intressen (t.ex. Programmering, Musik, Resor)" onChange={handleChange} required className={inputClass} />
            <IndustrySelect value={formData.desiredIndustry} onChange={handleChange} />
            <SkillSelector skills={formData.skills} onChange={(skills) => setFormData(prev => ({ ...prev, skills }))} />
            <Textarea 
              name="about" 
              placeholder="Berätta mer om dig själv, dina drömmar och mål (t.ex. Jag är en passionerad programmerare med stort intresse för AI...)" 
              onChange={handleChange} 
              required 
              className={inputClass}
            />
            <Button type="submit" className="w-full bg-white text-blue-900 hover:bg-gray-100">Registrera</Button>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const InputGroup = ({ children }) => (
  <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={containerVariants}>
    {React.Children.map(children, child => (
      <motion.div variants={itemVariants}>{child}</motion.div>
    ))}
  </motion.div>
);

const IndustrySelect = ({ value, onChange }) => (
  <motion.div variants={itemVariants}>
    <Select name="desiredIndustry" onValueChange={(value) => onChange({ target: { name: 'desiredIndustry', value } })}>
      <SelectTrigger className="bg-white bg-opacity-20 text-white border-white border-opacity-20">
        <SelectValue placeholder="Önskad bransch" />
      </SelectTrigger>
      <SelectContent>
        {['IT', 'Finans', 'Sjukvård', 'Utbildning', 'Marknadsföring'].map(industry => (
          <SelectItem key={industry.toLowerCase()} value={industry.toLowerCase()}>{industry}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </motion.div>
);

export default Register;

// TODO: Create PostgreSQL table for users
// Example SQL:
// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   first_name VARCHAR(50) NOT NULL,
//   last_name VARCHAR(50) NOT NULL,
//   email VARCHAR(100) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   phone_number VARCHAR(20),
//   city VARCHAR(50),
//   school VARCHAR(100),
//   study_areas TEXT,
//   interests TEXT,
//   skills TEXT[],
//   desired_industry VARCHAR(50),
//   about TEXT,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );

// TODO: Create backend API endpoint for user registration
// Example Express.js route:
// app.post('/api/register', async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, ...otherFields } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await db.query(
//       'INSERT INTO users (first_name, last_name, email, password, ...) VALUES ($1, $2, $3, $4, ...) RETURNING id',
//       [firstName, lastName, email, hashedPassword, ...]
//     );
//     res.status(201).json({ id: result.rows[0].id, message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });
