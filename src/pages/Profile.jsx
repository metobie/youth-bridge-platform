import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [xpLevel, setXpLevel] = useState(0);

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
      profileImage: 'https://i.imgur.com/IPwR5md.png' // Placeholder image
    };
    setUser(fetchedUser);

    // Calculate XP level based on profile completeness
    const totalFields = Object.keys(fetchedUser).length;
    const filledFields = Object.values(fetchedUser).filter(value => value && value.length > 0).length;
    const completionPercentage = (filledFields / totalFields) * 100;
    setXpLevel(Math.floor(completionPercentage));
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
    <div className="min-h-screen bg-cover bg-fixed bg-center p-8" style={{ backgroundImage: "url('https://i.imgur.com/1Wk8orw.jpeg')" }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <img src={user.profileImage} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
          <div>
            <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-600">{user.email} | {user.phoneNumber}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">XP Level: {xpLevel}</h2>
          <Progress value={xpLevel} className="w-full" />
        </div>

        <div id="cv-content" className="space-y-4">
          <section>
            <h2 className="text-2xl font-bold mb-2">Om mig</h2>
            <p>{user.about}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-2">Utbildning</h2>
            <p>{user.school} - {user.studyAreas}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-2">Färdigheter</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map(skill => (
                <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{skill}</span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-2">Intressen</h2>
            <p>{user.interests}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-2">Önskad bransch</h2>
            <p>{user.desiredIndustry}</p>
          </section>
        </div>

        <Button onClick={generatePDF} className="mt-6">Ladda ner CV som PDF</Button>
      </div>
    </div>
  );
};

export default Profile;