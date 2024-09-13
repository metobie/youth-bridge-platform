import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { itemVariants } from '../utils/animationVariants';

const skills = ['Kommunikation', 'Ledarskap', 'Problemlösning', 'Kreativitet', 'Teamwork', 'Analytisk förmåga', 'Projektledning', 'Språkkunskaper', 'Teknisk kompetens', 'Kundservice'];

const SkillSelector = ({ skills: selectedSkills, onChange }) => {
  const handleSkillChange = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill].slice(0, 7);
    onChange(updatedSkills);
  };

  return (
    <motion.div variants={itemVariants}>
      <p className="mb-2">Välj upp till 7 färdigheter:</p>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <Button
            key={skill}
            type="button"
            variant={selectedSkills.includes(skill) ? "default" : "outline"}
            onClick={() => handleSkillChange(skill)}
            className="text-sm bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30"
          >
            {skill}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillSelector;