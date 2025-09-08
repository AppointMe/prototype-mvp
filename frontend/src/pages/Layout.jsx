// src/components/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/navbar.jsx";

export default function Layout() {
  return (
    <div className="flex flex-col w-full h-screen">
      {/* Navbar siempre visible */}
      <Navbar />

      {/* Aquí se renderizan las páginas */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
