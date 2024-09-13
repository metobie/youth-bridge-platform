import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { X } from 'lucide-react';

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

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Simulating fetching user data
    const fetchedUser = {
      firstName: 'Tobias',
      lastName: 'Karlsson',
      email: 'tobias@mail.se',
      phoneNumber: '0701234567',
      city: 'Stockholm',
      educations: [{ school: 'Stockholms universitet', studyAreas: 'Datavetenskap' }],
      interests: ['Programmering', 'AI', 'Musik'],
      skills: ['Kommunikation', 'Problemlösning', 'Teamwork', 'Analytisk förmåga', 'Teknisk kompetens'],
      desiredIndustries: ['IT'],
      about: 'Jag är en passionerad programmerare med stort intresse för AI och maskininlärning. Mitt mål är att bidra till utvecklingen av innovativa teknologiska lösningar som kan förbättra människors liv.',
      profileImage: 'https://github.com/shadcn.png'
    };
    setUser(fetchedUser);
  }, []);

  const generatePDF = () => {
    const input = document.getElementById('cv-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("cv.pdf");
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically send the updated user data to your backend
    console.log('Updated user:', user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleAddEducation = () => {
    setUser(prevUser => ({
      ...prevUser,
      educations: [...prevUser.educations, { school: '', studyAreas: '' }]
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      educations: prevUser.educations.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleRemoveEducation = (index) => {
    setUser(prevUser => ({
      ...prevUser,
      educations: prevUser.educations.filter((_, i) => i !== index)
    }));
  };

  const handleAddSkill = (skill) => {
    if (skill && !user.skills.includes(skill)) {
      setUser(prevUser => ({
        ...prevUser,
        skills: [...prevUser.skills, skill]
      }));
    }
  };

  const handleRemoveSkill = (skill) => {
    setUser(prevUser => ({
      ...prevUser,
      skills: prevUser.skills.filter(s => s !== skill)
    }));
  };

  const handleAddInterest = (interest) => {
    if (interest && !user.interests.includes(interest)) {
      setUser(prevUser => ({
        ...prevUser,
        interests: [...prevUser.interests, interest]
      }));
    }
  };

  const handleRemoveInterest = (interest) => {
    setUser(prevUser => ({
      ...prevUser,
      interests: prevUser.interests.filter(i => i !== interest)
    }));
  };

  const handleAddIndustry = (industry) => {
    if (industry && !user.desiredIndustries.includes(industry)) {
      setUser(prevUser => ({
        ...prevUser,
        desiredIndustries: [...prevUser.desiredIndustries, industry]
      }));
    }
  };

  const handleRemoveIndustry = (industry) => {
    setUser(prevUser => ({
      ...prevUser,
      desiredIndustries: prevUser.desiredIndustries.filter(i => i !== industry)
    }));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="flex-grow flex items-center justify-center px-4" variants={containerVariants}>
        <motion.div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg max-w-4xl w-full" variants={itemVariants}>
          <motion.div className="flex items-center mb-6" variants={itemVariants}>
            <img src={user.profileImage} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
            <div>
              <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
              <p className="text-gray-200">{user.email} | {user.phoneNumber}</p>
            </div>
          </motion.div>

          <motion.div id="cv-content" className="space-y-4" variants={containerVariants}>
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-2">Om mig</h2>
              {isEditing ? (
                <Textarea
                  name="about"
                  value={user.about}
                  onChange={handleChange}
                  className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-20"
                />
              ) : (
                <p>{user.about}</p>
              )}
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-2">Utbildning</h2>
              {user.educations.map((education, index) => (
                <div key={index} className="mb-2">
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        value={education.school}
                        onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                        placeholder="Skola"
                        className="bg-white bg-opacity-20 text-white border-white border-opacity-20"
                      />
                      <Input
                        value={education.studyAreas}
                        onChange={(e) => handleEducationChange(index, 'studyAreas', e.target.value)}
                        placeholder="Studieområden"
                        className="bg-white bg-opacity-20 text-white border-white border-opacity-20"
                      />
                      <Button onClick={() => handleRemoveEducation(index)} variant="destructive">Ta bort</Button>
                    </div>
                  ) : (
                    <p>{education.school} - {education.studyAreas}</p>
                  )}
                </div>
              ))}
              {isEditing && (
                <Button onClick={handleAddEducation} className="mt-2">Lägg till utbildning</Button>
              )}
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-2">Färdigheter</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <span key={skill} className="bg-blue-600 text-white px-2 py-1 rounded flex items-center">
                    {skill}
                    {isEditing && (
                      <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-xs">
                        <X size={12} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="mt-2">
                  <Input
                    placeholder="Lägg till färdighet"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddSkill(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="bg-white bg-opacity-20 text-white border-white border-opacity-20"
                  />
                </div>
              )}
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-2">Intressen</h2>
              <div className="flex flex-wrap gap-2">
                {user.interests.map(interest => (
                  <span key={interest} className="bg-green-600 text-white px-2 py-1 rounded flex items-center">
                    {interest}
                    {isEditing && (
                      <button onClick={() => handleRemoveInterest(interest)} className="ml-2 text-xs">
                        <X size={12} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="mt-2">
                  <Input
                    placeholder="Lägg till intresse"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddInterest(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="bg-white bg-opacity-20 text-white border-white border-opacity-20"
                  />
                </div>
              )}
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-2">Önskade branscher</h2>
              <div className="flex flex-wrap gap-2">
                {user.desiredIndustries.map(industry => (
                  <span key={industry} className="bg-purple-600 text-white px-2 py-1 rounded flex items-center">
                    {industry}
                    {isEditing && (
                      <button onClick={() => handleRemoveIndustry(industry)} className="ml-2 text-xs">
                        <X size={12} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="mt-2">
                  <Input
                    placeholder="Lägg till önskad bransch"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddIndustry(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="bg-white bg-opacity-20 text-white border-white border-opacity-20"
                  />
                </div>
              )}
            </motion.section>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 space-x-4">
            {isEditing ? (
              <Button onClick={handleSave} className="bg-white text-blue-900 hover:bg-gray-100">Spara ändringar</Button>
            ) : (
              <Button onClick={handleEdit} className="bg-white text-blue-900 hover:bg-gray-100">Redigera profil</Button>
            )}
            <Button onClick={generatePDF} className="bg-white text-blue-900 hover:bg-gray-100">Ladda ner CV som PDF</Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;