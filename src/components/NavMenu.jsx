import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { HomeIcon, UserIcon, CalendarIcon, ShieldIcon, LogInIcon, LogOutIcon, UserPlusIcon, MenuIcon, XIcon } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';

const NavMenu = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { title: "Hem", to: "/", icon: <HomeIcon className="h-4 w-4" />, alwaysShow: true },
    { title: "Profil", to: `/profile/${user?.id || ''}`, icon: <UserIcon className="h-4 w-4" />, requireAuth: true },
    { title: "Boka coaching", to: "/booking", icon: <CalendarIcon className="h-4 w-4" />, requireAuth: true },
    { title: "Admin", to: "/admin", icon: <ShieldIcon className="h-4 w-4" />, requireAdmin: true },
    { title: "Logga in", to: "/login", icon: <LogInIcon className="h-4 w-4" />, guestOnly: true },
    { title: "Registrera", to: "/register", icon: <UserPlusIcon className="h-4 w-4" />, guestOnly: true },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const filteredNavItems = navItems.filter(item => {
    if (item.alwaysShow) return true;
    if (item.requireAuth && !user) return false;
    if (item.requireAdmin && (!user || !user.isAdmin)) return false;
    if (item.guestOnly && user) return false;
    return true;
  });

  return (
    <nav className="bg-gray-900 bg-opacity-50 p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="https://i.imgur.com/Z8YkO4R.png" alt="Rider Logo" className="w-24" />
        </Link>
        <div className="hidden md:flex space-x-2">
          {filteredNavItems.map((item) => (
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
          {user && (
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-gray-800 hover:text-white transition-colors duration-200"
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logga ut
            </Button>
          )}
        </div>
        <div className="md:hidden">
          <Button onClick={toggleMenu} variant="ghost" className="text-white">
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 bg-opacity-95 shadow-lg">
          {filteredNavItems.map((item) => (
            <Button
              key={item.to}
              asChild
              variant={location.pathname === item.to ? "default" : "ghost"}
              className={`
                ${location.pathname === item.to ? "bg-blue-800 text-white" : "text-white hover:bg-gray-800"}
                hover:text-white transition-colors duration-200 w-full justify-start mb-2
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to={item.to} className="flex items-center p-4">
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Link>
            </Button>
          ))}
          {user && (
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-white hover:bg-gray-800 hover:text-white transition-colors duration-200 w-full justify-start mb-2 p-4"
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logga ut
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavMenu;
