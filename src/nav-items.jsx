import { HomeIcon, UserIcon, CalendarIcon, ShieldIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Profile from "./pages/Profile.jsx";
import Booking from "./pages/Booking.jsx";
import AdminPortal from "./pages/AdminPortal.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

export const navItems = [
  {
    title: "Hem",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Profil",
    to: "/profile",
    icon: <UserIcon className="h-4 w-4" />,
    page: <Profile />,
  },
  {
    title: "Boka coaching",
    to: "/booking",
    icon: <CalendarIcon className="h-4 w-4" />,
    page: <Booking />,
  },
  {
    title: "Admin",
    to: "/admin",
    icon: <ShieldIcon className="h-4 w-4" />,
    page: <AdminPortal />,
  },
  {
    title: "Logga in",
    to: "/login",
    page: <Login />,
  },
  {
    title: "Registrera",
    to: "/register",
    page: <Register />,
  },
];