// src/components/Navbar.jsx
import { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "@/assets/logo-purple.svg"; // o { ReactComponent as Logo } si usas svgr

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-sm bg-white">
      {/* Logo + título */}
      <div className="flex items-center space-x-3">
        <img src={Logo} alt="AppointMe" className="h-10 w-auto" />
        {/* Texto más pequeño en móvil */}
        <span className="font-bold text-xl md:text-2xl" style={{ color: "#311B92" }}>
          AppointMe
        </span>
      </div>

      {/* Menú en pantallas grandes */}
      <div className="hidden md:flex items-center space-x-8">
        <ul className="flex space-x-8 font-medium">
          <li
            className="cursor-pointer border-b-2"
            style={{ color: "#311B92", borderColor: "#311B92" }}
          >
            INICIO
          </li>
          <li className="cursor-pointer text-gray-500 hover:text-[#311B92]">
            EXPLORAR SERVICIOS
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <NotificationsIcon
            className="cursor-pointer text-gray-500 hover:text-[#311B92]"
            sx={{ transition: "color 0.2s" }}
          />
          <AccountCircleIcon
            className="cursor-pointer text-gray-500 hover:text-[#311B92]"
            sx={{ transition: "color 0.2s" }}
          />
        </div>
      </div>

      {/* Hamburguesa en pantallas pequeñas */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <CloseIcon className="text-gray-500 hover:text-[#311B92]" fontSize="large" />
          ) : (
            <MenuIcon className="text-gray-500 hover:text-[#311B92]" fontSize="large" />
          )}
        </button>
      </div>

      {/* Menú desplegable en móvil */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col items-start p-4 space-y-4">
          <ul className="flex flex-col w-full font-medium space-y-4">
            <li
              className="cursor-pointer border-b-2 w-fit"
              style={{ color: "#311B92", borderColor: "#311B92" }}
            >
              INICIO
            </li>
            <li className="cursor-pointer text-gray-500 hover:text-[#311B92]">
              EXPLORAR SERVICIOS
            </li>
          </ul>
          <div className="flex space-x-6 mt-4">
            <NotificationsIcon
              className="cursor-pointer text-gray-500 hover:text-[#311B92]"
              sx={{ transition: "color 0.2s" }}
            />
            <AccountCircleIcon
              className="cursor-pointer text-gray-500 hover:text-[#311B92]"
              sx={{ transition: "color 0.2s" }}
            />
          </div>
        </div>
      )}
    </nav>
  );
}