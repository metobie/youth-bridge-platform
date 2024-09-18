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
    try {
      // TODO: Implement backend API call
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

      // const result = await registerUser(formData);
      // console.log('User registered:', result);
      console.log('Form submitted:', formData);
      navigate('/profile');
    } catch (error) {
      console.error('Registration error:', error);
      // TODO: Handle registration error (e.g., show error message to user)
    }
  };

  const inputClass = "bg-white text-gray-900 placeholder-gray-500";

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
          <motion.p className="text-lg mb-6 text-center text-blue-300" variants={itemVariants}>
            Yo! 🚀 Redo att kicka igång din karriär? Registrera dig nu för att låsa upp alla våra coola tjänster! 
            Det är som att få VIP-access till din framtid. Let's go! 🎉
          </motion.p>
          <motion.form onSubmit={handleSubmit} className="space-y-4" variants={containerVariants}>
            <InputGroup>
              <Input name="firstName" placeholder="Förnamn *" onChange={handleChange} required className={inputClass} />
              <Input name="lastName" placeholder="Efternamn *" onChange={handleChange} required className={inputClass} />
            </InputGroup>
            <Input name="email" type="email" placeholder="E-post *" onChange={handleChange} required className={inputClass} />
            <Input name="password" type="password" placeholder="Lösenord * (minst 8 tecken)" onChange={handleChange} required className={inputClass} />
            <Input name="phoneNumber" placeholder="Telefonnummer *" onChange={handleChange} required className={inputClass} />
            <Input name="city" placeholder="Ort *" onChange={handleChange} required className={inputClass} />
            <Input name="school" placeholder="Skola/Universitet" onChange={handleChange} className={inputClass} />
            <Input name="studyAreas" placeholder="Studieområden" onChange={handleChange} className={inputClass} />
            <Input name="interests" placeholder="Intressen" onChange={handleChange} className={inputClass} />
            <IndustrySelect value={formData.desiredIndustry} onChange={handleChange} />
            <SkillSelector skills={formData.skills} onChange={(skills) => setFormData(prev => ({ ...prev, skills }))} />
            <Textarea 
              name="about" 
              placeholder="Berätta mer om dig själv, dina drömmar och mål" 
              onChange={handleChange} 
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

const IndustrySelect = ({ value, onChange }) => {
  const industries = [
    'Administration', 'Detaljhandel', 'E-handel', 'Eventplanering', 'Finans', 
    'Försäljning', 'IT', 'Kreativa yrken', 'Kundservice', 'Logistik', 
    'Marknadsföring', 'Restaurang', 'Sjukvård', 'Sociala medier', 'Utbildning'
  ].sort();

  return (
    <motion.div variants={itemVariants}>
      <Select name="desiredIndustry" onValueChange={(value) => onChange({ target: { name: 'desiredIndustry', value } })}>
        <SelectTrigger className="bg-white text-gray-900 border-white border-opacity-20">
          <SelectValue placeholder="Önskad bransch" />
        </SelectTrigger>
        <SelectContent>
          {industries.map(industry => (
            <SelectItem key={industry.toLowerCase()} value={industry.toLowerCase()}>{industry}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default Register;

// TODO: Update backend to handle user registration
// Example Express.js route:
// app.post('/api/register', async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, phoneNumber, city, school, studyAreas, interests, skills, desiredIndustry, about } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const result = await db.query(
//       'INSERT INTO users (first_name, last_name, email, password, phone_number, city, school, study_areas, interests, skills, desired_industry, about) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
//       [firstName, lastName, email, hashedPassword, phoneNumber, city, school, studyAreas, interests, JSON.stringify(skills), desiredIndustry, about]
//     );
//     const userId = result.rows[0].id;
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET);
//     res.status(201).json({ userId, token });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });

// TODO: Update PostgreSQL table for users
// Example SQL:
// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   first_name VARCHAR(50) NOT NULL,
//   last_name VARCHAR(50) NOT NULL,
//   email VARCHAR(100) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   phone_number VARCHAR(20) NOT NULL,
//   city VARCHAR(50) NOT NULL,
//   school VARCHAR(100),
//   study_areas TEXT,
//   interests TEXT[],
//   skills TEXT[],
//   desired_industry VARCHAR(50),
//   about TEXT,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );
