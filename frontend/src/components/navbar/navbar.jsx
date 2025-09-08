// src/components/navbar/Navbar.jsx
import { NavLink } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logo from "@/assets/logo-purple.svg";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-sm bg-white">
      {/* Logo + título */}
      <div className="flex items-center space-x-3">
        <img src={Logo} alt="AppointMe" className="h-10 w-auto" />
        <span className="font-bold text-2xl" style={{ color: "#311B92" }}>
          AppointMe
        </span>
      </div>

      {/* Menú */}
      <div className="hidden md:flex items-center space-x-8">
        <ul className="flex space-x-8 font-medium">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive
                    ? "border-b-2"
                    : "text-gray-500 hover:text-[#311B92]"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { color: "#311B92", borderColor: "#311B92" }
                  : { color: "#6B7280" } // gris
              }
            >
              INICIO
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `cursor-pointer ${
                  isActive
                    ? "border-b-2"
                    : "text-gray-500 hover:text-[#311B92]"
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? { color: "#311B92", borderColor: "#311B92" }
                  : { color: "#6B7280" }
              }
            >
              EXPLORAR SERVICIOS
            </NavLink>
          </li>
        </ul>

        {/* Íconos */}
        <div className="flex items-center space-x-4">
          <NotificationsIcon className="cursor-pointer text-gray-500 hover:text-[#311B92]" />
          <AccountCircleIcon className="cursor-pointer text-gray-500 hover:text-[#311B92]" />
        </div>
      </div>
    </nav>
  );
}
