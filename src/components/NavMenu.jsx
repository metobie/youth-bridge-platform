import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HomeIcon, UserIcon, CalendarIcon, ShieldIcon, LogInIcon, UserPlusIcon } from "lucide-react";

const NavMenu = () => {
  const location = useLocation();

  const navItems = [
    { title: "Hem", to: "/", icon: <HomeIcon className="h-4 w-4" /> },
    { title: "Profil", to: "/profile", icon: <UserIcon className="h-4 w-4" /> },
    { title: "Boka coaching", to: "/booking", icon: <CalendarIcon className="h-4 w-4" /> },
    { title: "Admin", to: "/admin", icon: <ShieldIcon className="h-4 w-4" /> },
    { title: "Logga in", to: "/login", icon: <LogInIcon className="h-4 w-4" /> },
    { title: "Registrera", to: "/register", icon: <UserPlusIcon className="h-4 w-4" /> },
  ];

  return (
    <nav className="bg-gray-900 bg-opacity-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="https://i.imgur.com/Z8YkO4R.png" alt="Rider Logo" className="w-24" />
        </Link>
        <div className="flex space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.to}
              asChild
              variant={location.pathname === item.to ? "default" : "ghost"}
              className={`
                ${location.pathname === item.to ? "bg-blue-800 text-white" : "text-white hover:bg-gray-800"}
                hover:text-white transition-colors duration-200
              `}
            >
              <Link to={item.to} className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;