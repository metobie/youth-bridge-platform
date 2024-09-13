import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-fixed bg-center" style={{ backgroundImage: "url('https://i.imgur.com/1Wk8orw.jpeg')" }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Välkommen till</h1>
        <img src="https://i.imgur.com/Z8YkO4R.png" alt="Rider Logo" className="mx-auto w-64 mb-6" />
        <p className="text-xl mb-8">Fixa ditt CV och boka online coaching - din väg till drömjobbet börjar här!</p>
        <div className="space-x-4">
          <Button asChild>
            <Link to="/login">Logga in</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register">Registrera</Link>
          </Button>
        </div>
      </div>
      <footer className="mt-8 text-white">
        <div className="flex space-x-4">
          <a href="https://www.instagram.com/bearider.se/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/company/rider-by-wikan-personal/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:hej@bearider.se">Email</a>
        </div>
      </footer>
    </div>
  );
};

export default Index;