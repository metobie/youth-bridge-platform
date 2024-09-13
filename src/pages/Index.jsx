import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white">
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">Välkommen till Rider</h1>
        <p className="text-xl mb-8 max-w-2xl">Din väg till drömjobbet börjar här. Få hjälp med ditt CV och boka online coaching med våra experter.</p>
        
        <div className="space-y-4 mb-12">
          <FeatureItem text="Skapa ett professionellt CV" />
          <FeatureItem text="Boka online coaching" />
          <FeatureItem text="Få personlig feedback" />
          <FeatureItem text="Hitta ditt drömjobb" />
        </div>
        
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            <Link to="/register">Kom igång <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            <Link to="/login">Logga in</Link>
          </Button>
        </div>
      </main>
      
      <footer className="p-4 text-center">
        <div className="flex justify-center space-x-4">
          <a href="https://www.instagram.com/bearider.se/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
          <a href="https://www.linkedin.com/company/rider-by-wikan-personal/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          <a href="mailto:hej@bearider.se" className="hover:underline">Email</a>
        </div>
      </footer>
    </div>
  );
};

const FeatureItem = ({ text }) => (
  <div className="flex items-center">
    <CheckCircle className="h-6 w-6 mr-2 text-green-400" />
    <span>{text}</span>
  </div>
);

export default Index;