import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

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

  useEffect(() => {
    // Simulating fetching user data
    const fetchedUser = {
      firstName: 'Tobias',
      lastName: 'Karlsson',
      email: 'tobias@mail.se',
      phoneNumber: '0701234567',
      city: 'Stockholm',
      school: 'Stockholms universitet',
      studyAreas: 'Datavetenskap',
      interests: 'Programmering, AI, Musik',
      skills: ['Kommunikation', 'Problemlösning', 'Teamwork', 'Analytisk förmåga', 'Teknisk kompetens'],
      desiredIndustry: 'IT',
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
              <p>{user.about}</p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-2">Utbildning</h2>
              <p>{user.school} - {user.studyAreas}</p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-2">Färdigheter</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(skill => (
                  <span key={skill} className="bg-blue-600 text-white px-2 py-1 rounded">{skill}</span>
                ))}
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-2">Intressen</h2>
              <p>{user.interests}</p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-2">Önskad bransch</h2>
              <p>{user.desiredIndustry}</p>
            </motion.section>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button onClick={generatePDF} className="mt-6 bg-white text-blue-900 hover:bg-gray-100">Ladda ner CV som PDF</Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;