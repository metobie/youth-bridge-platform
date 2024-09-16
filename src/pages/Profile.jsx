import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { X } from 'lucide-react';

// TODO: Implement backend logic for fetching and updating user profile
// Example backend function:
// async function fetchUserProfile(userId) {
//   const response = await fetch(`/api/users/${userId}`);
//   if (!response.ok) throw new Error('Failed to fetch user profile');
//   return response.json();
// }

// async function updateUserProfile(userId, profileData) {
//   const response = await fetch(`/api/users/${userId}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(profileData)
//   });
//   if (!response.ok) throw new Error('Failed to update user profile');
//   return response.json();
// }

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
    // TODO: Fetch user profile from backend
    // Example:
    // const userId = localStorage.getItem('userId');
    // fetchUserProfile(userId)
    //   .then(userData => setUser(userData))
    //   .catch(error => console.error('Error fetching user profile:', error));

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

  const handleSave = async () => {
    setIsEditing(false);
    // TODO: Update user profile in backend
    // Example:
    // try {
    //   const userId = localStorage.getItem('userId');
    //   await updateUserProfile(userId, user);
    //   console.log('Profile updated successfully');
    // } catch (error) {
    //   console.error('Error updating profile:', error);
    //   // Handle error (e.g., show error message to user)
    // }
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
            <ProfileSection title="Om mig" content={user.about} isEditing={isEditing} handleChange={handleChange} />
            <EducationSection educations={user.educations} isEditing={isEditing} handleEducationChange={handleEducationChange} handleRemoveEducation={handleRemoveEducation} handleAddEducation={handleAddEducation} />
            <SkillsSection skills={user.skills} isEditing={isEditing} handleRemoveSkill={handleRemoveSkill} handleAddSkill={handleAddSkill} />
            <InterestsSection interests={user.interests} isEditing={isEditing} handleRemoveInterest={handleRemoveInterest} handleAddInterest={handleAddInterest} />
            <IndustriesSection industries={user.desiredIndustries} isEditing={isEditing} handleRemoveIndustry={handleRemoveIndustry} handleAddIndustry={handleAddIndustry} />
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

const ProfileSection = ({ title, content, isEditing, handleChange }) => (
  <motion.section variants={itemVariants}>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    {isEditing ? (
      <Textarea
        name="about"
        value={content}
        onChange={handleChange}
        className="w-full bg-white bg-opacity-20 text-white border-white border-opacity-20"
      />
    ) : (
      <p>{content}</p>
    )}
  </motion.section>
);

const EducationSection = ({ educations, isEditing, handleEducationChange, handleRemoveEducation, handleAddEducation }) => (
  <motion.section variants={itemVariants}>
    <h2 className="text-2xl font-bold mb-2">Utbildning</h2>
    {educations.map((education, index) => (
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
);

const SkillsSection = ({ skills, isEditing, handleRemoveSkill, handleAddSkill }) => (
  <motion.section variants={itemVariants}>
    <h2 className="text-2xl font-bold mb-2">Färdigheter</h2>
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
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
);

const InterestsSection = ({ interests, isEditing, handleRemoveInterest, handleAddInterest }) => (
  <motion.section variants={itemVariants}>
    <h2 className="text-2xl font-bold mb-2">Intressen</h2>
    <div className="flex flex-wrap gap-2">
      {interests.map(interest => (
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
);

const IndustriesSection = ({ industries, isEditing, handleRemoveIndustry, handleAddIndustry }) => (
  <motion.section variants={itemVariants}>
    <h2 className="text-2xl font-bold mb-2">Önskade branscher</h2>
    <div className="flex flex-wrap gap-2">
      {industries.map(industry => (
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
);

export default Profile;

// TODO: Create or update PostgreSQL table for user profiles
// Example SQL:
// ALTER TABLE users ADD COLUMN profile_image VARCHAR(255);
// ALTER TABLE users ADD COLUMN educations JSONB[];
// ALTER TABLE users ADD COLUMN interests TEXT[];
// ALTER TABLE users ADD COLUMN desired_industries TEXT[];

// TODO: Create backend API endpoints for fetching and updating user profiles
// Example Express.js routes:
// app.get('/api/users/:userId', authenticateToken, async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     const user = result.rows[0];
//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ error: 'Failed to fetch user profile' });
//   }
// });

// app.put('/api/users/:userId', authenticateToken, async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { firstName, lastName, email, phoneNumber, city, educations, interests, skills, desiredIndustries, about } = req.body;
//     const result = await db.query(
//       'UPDATE users SET first_name = $1, last_name = $2, email = $3, phone_number = $4, city = $5, educations = $6, interests = $7, skills = $8, desired_industries = $9, about = $10 WHERE id = $11 RETURNING *',
//       [firstName, lastName, email, phoneNumber, city, JSON.stringify(educations), interests, skills, desiredIndustries, about, userId]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error updating user profile:', error);
//     res.status(500).json({ error: 'Failed to update user profile' });
//   }
// });
