import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  },
  exit: { 
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 }
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

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    city: '',
    school: '',
    studyAreas: '',
    interests: '',
    skills: [],
    desiredIndustry: '',
    about: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSkillChange = (skill) => {
    setFormData(prevState => {
      const updatedSkills = prevState.skills.includes(skill)
        ? prevState.skills.filter(s => s !== skill)
        : [...prevState.skills, skill].slice(0, 7);
      return { ...prevState, skills: updatedSkills };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to your backend
    navigate('/profile');
  };

  const skills = ['Kommunikation', 'Ledarskap', 'Problemlösning', 'Kreativitet', 'Teamwork', 'Analytisk förmåga', 'Projektledning', 'Språkkunskaper', 'Teknisk kompetens', 'Kundservice'];

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
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <Input name="firstName" placeholder="Förnamn (t.ex. Anna)" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300 placeholder-opacity-70" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Input name="lastName" placeholder="Efternamn (t.ex. Andersson)" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300 placeholder-opacity-70" />
              </motion.div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input name="email" type="email" placeholder="E-post (t.ex. anna.andersson@example.com)" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300 placeholder-opacity-70" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input name="password" type="password" placeholder="Lösenord (minst 8 tecken)" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300 placeholder-opacity-70" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input name="phoneNumber" placeholder="Telefonnummer (t.ex. 0701234567)" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300 placeholder-opacity-70" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input name="city" placeholder="Ort (t.ex. Stockholm)" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300 placeholder-opacity-70" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input name="school" placeholder="Skola/Universitet (t.ex. Stockholms universitet)" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300 placeholder-opacity-70" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input name="studyAreas" placeholder="Studieområden (t.ex. Datavetenskap, Ekonomi)" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300 placeholder-opacity-70" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input name="interests" placeholder="Intressen (t.ex. Programmering, Musik, Resor)" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300 placeholder-opacity-70" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Select name="desiredIndustry" onValueChange={(value) => handleChange({ target: { name: 'desiredIndustry', value } })}>
                <SelectTrigger className="bg-white bg-opacity-20 text-white border-white border-opacity-20">
                  <SelectValue placeholder="Önskad bransch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="finance">Finans</SelectItem>
                  <SelectItem value="healthcare">Sjukvård</SelectItem>
                  <SelectItem value="education">Utbildning</SelectItem>
                  <SelectItem value="marketing">Marknadsföring</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="mb-2">Välj upp till 7 färdigheter:</p>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <Button
                    key={skill}
                    type="button"
                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                    onClick={() => handleSkillChange(skill)}
                    className="text-sm bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30"
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Textarea 
                name="about" 
                placeholder="Berätta mer om dig själv, dina drömmar och mål (t.ex. Jag är en passionerad programmerare med stort intresse för AI...)" 
                onChange={handleChange} 
                required 
                className="bg-white bg-opacity-20 text-white placeholder-gray-300 placeholder-opacity-70" 
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full bg-white text-blue-900 hover:bg-gray-100">Registrera</Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;