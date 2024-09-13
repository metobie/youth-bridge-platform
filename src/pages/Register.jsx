import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-500 to-purple-600 text-white">
      <header className="p-4">
        <img src="https://i.imgur.com/Z8YkO4R.png" alt="Rider Logo" className="w-32" />
      </header>
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Registrera dig</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="firstName" placeholder="Förnamn" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300" />
              <Input name="lastName" placeholder="Efternamn" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300" />
            </div>
            <Input name="email" type="email" placeholder="E-post" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300" />
            <Input name="password" type="password" placeholder="Lösenord" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300" />
            <Input name="phoneNumber" placeholder="Telefonnummer" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300" />
            <Input name="city" placeholder="Ort" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300" />
            <Input name="school" placeholder="Skola/Universitet" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300" />
            <Input name="studyAreas" placeholder="Studieområden" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300" />
            <Input name="interests" placeholder="Intressen" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300" />
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
            <div>
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
            </div>
            <Textarea name="about" placeholder="Berätta mer om dig själv, dina drömmar och mål" onChange={handleChange} required className="bg-white bg-opacity-20 text-white placeholder-gray-300" />
            <Button type="submit" className="w-full bg-white text-blue-600 hover:bg-gray-100">Registrera</Button>
          </form>
          <div className="mt-4 text-center">
            <p>Eller registrera med:</p>
            <Button variant="outline" className="mt-2 bg-white text-blue-600 hover:bg-gray-100">
              Apple-konto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;