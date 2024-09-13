import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="p-4 text-center text-white">
      <div className="flex justify-center space-x-6">
        <a href="https://www.instagram.com/bearider.se/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
          <Instagram className="h-6 w-6" />
          <span className="sr-only">Instagram</span>
        </a>
        <a href="https://www.linkedin.com/company/rider-by-wikan-personal/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
          <Linkedin className="h-6 w-6" />
          <span className="sr-only">LinkedIn</span>
        </a>
        <a href="mailto:hej@bearider.se" className="hover:text-gray-300 transition-colors">
          <Mail className="h-6 w-6" />
          <span className="sr-only">Email</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;