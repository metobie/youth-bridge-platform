import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { itemVariants } from '../utils/animationVariants';
import { Check } from 'lucide-react';

const skills = [
  'Kommunikation', 'Ledarskap', 'Problemlösning', 'Kreativitet', 'Teamwork', 
  'Analytisk förmåga', 'Projektledning', 'Språkkunskaper', 'Teknisk kompetens', 
  'Kundservice', 'Sociala medier', 'Dataanalys', 'Grafisk design', 
  'Skriftlig kommunikation', 'Presentationsteknik', 'Tidshantering', 
  'Adaptionsförmåga', 'Kritiskt tänkande', 'Stresshantering', 'Multitasking',
  'Försäljning', 'Marknadsföring', 'Ekonomi', 'Programmering', 'Fotografering',
  'Videoredigering', 'Eventplanering', 'Konflikthantering', 'Förhandling', 'Coaching'
];

const SkillSelector = ({ skills: selectedSkills, onChange }) => {
  const handleSkillChange = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill].slice(0, 7);
    onChange(updatedSkills);
  };

  return (
    <motion.div variants={itemVariants}>
      <p className="mb-2 text-white">Välj upp till 7 färdigheter: <span className="font-bold">{selectedSkills.length}/7</span></p>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <Button
            key={skill}
            type="button"
            variant={selectedSkills.includes(skill) ? "default" : "outline"}
            onClick={() => handleSkillChange(skill)}
            className={`text-sm ${
              selectedSkills.includes(skill)
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-gray-900 hover:bg-gray-100"
            } relative`}
            disabled={selectedSkills.length >= 7 && !selectedSkills.includes(skill)}
          >
            {skill}
            {selectedSkills.includes(skill) && (
              <Check className="w-4 h-4 absolute top-1 right-1" />
            )}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillSelector;
