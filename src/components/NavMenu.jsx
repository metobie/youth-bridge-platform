import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HomeIcon, UserIcon, CalendarIcon, ShieldIcon, LogInIcon, LogOutIcon, UserPlusIcon, MenuIcon, XIcon } from "lucide-react";

const NavMenu = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { title: "Hem", to: "/", icon: <HomeIcon className="h-4 w-4" /> },
    { title: "Profil", to: "/profile", icon: <UserIcon className="h-4 w-4" /> },
    { title: "Boka coaching", to: "/booking", icon: <CalendarIcon className="h-4 w-4" /> },
    { title: "Admin", to: "/admin", icon: <ShieldIcon className="h-4 w-4" /> },
    { 
      title: isAuthenticated ? "Logga ut" : "Logga in", 
      to: isAuthenticated ? "/" : "/login", 
      icon: isAuthenticated ? <LogOutIcon className="h-4 w-4" /> : <LogInIcon className="h-4 w-4" />,
      onClick: isAuthenticated ? onLogout : null
    },
    { title: "Registrera", to: "/register", icon: <UserPlusIcon className="h-4 w-4" /> },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    navigate(item.to);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 bg-opacity-50 p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="https://i.imgur.com/Z8YkO4R.png" alt="Rider Logo" className="w-24" />
        </Link>
        <div className="hidden md:flex space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.to}
              onClick={() => handleNavItemClick(item)}
              variant={location.pathname === item.to ? "default" : "ghost"}
              className={`
                ${location.pathname === item.to ? "bg-blue-800 text-white" : "text-white hover:bg-gray-800"}
                hover:text-white transition-colors duration-200
              `}
            >
              <span className="flex items-center">
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </span>
            </Button>
          ))}
        </div>
        <div className="md:hidden">
          <Button onClick={toggleMenu} variant="ghost" className="text-white">
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 bg-opacity-95 shadow-lg">
          {navItems.map((item) => (
            <Button
              key={item.to}
              onClick={() => handleNavItemClick(item)}
              variant={location.pathname === item.to ? "default" : "ghost"}
              className={`
                ${location.pathname === item.to ? "bg-blue-800 text-white" : "text-white hover:bg-gray-800"}
                hover:text-white transition-colors duration-200 w-full justify-start mb-2
              `}
            >
              <span className="flex items-center p-4">
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </span>
            </Button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavMenu;