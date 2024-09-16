import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Instagram, Linkedin, Mail } from 'lucide-react';

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

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.main className="flex-grow flex flex-col items-center justify-center px-4 text-center relative" variants={containerVariants}>
        <motion.h1 className="text-5xl font-bold mb-6" variants={itemVariants}>Välkommen till Rider</motion.h1>
        <motion.p className="text-xl mb-8 max-w-2xl" variants={itemVariants}>Din väg till drömjobbet börjar här. Få hjälp med ditt CV och boka online coaching med våra experter.</motion.p>
        
        <motion.div className="space-y-4 mb-12" variants={containerVariants}>
          <FeatureItem text="Skapa ett professionellt CV" />
          <FeatureItem text="Boka online coaching" />
          <FeatureItem text="Få personlig feedback" />
          <FeatureItem text="Hitta ditt drömjobb" />
        </motion.div>
        
        <motion.div className="space-x-4" variants={itemVariants}>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            <Link to="/register">Kom igång <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            <Link to="/login">Logga in</Link>
          </Button>
        </motion.div>

        <motion.div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-6" variants={itemVariants}>
          <SocialIcon href="https://www.instagram.com/bearider.se/" icon={<Instagram className="h-6 w-6" />} label="Instagram" />
          <SocialIcon href="https://www.linkedin.com/company/rider-by-wikan-personal/" icon={<Linkedin className="h-6 w-6" />} label="LinkedIn" />
          <SocialIcon href="mailto:hej@bearider.se" icon={<Mail className="h-6 w-6" />} label="Email" />
        </motion.div>
      </motion.main>
    </motion.div>
  );
};

const FeatureItem = ({ text }) => (
  <motion.div className="flex items-center" variants={itemVariants}>
    <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
    <span>{text}</span>
  </motion.div>
);

const SocialIcon = ({ href, icon, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
    {icon}
    <span className="sr-only">{label}</span>
  </a>
);

export default Index;
