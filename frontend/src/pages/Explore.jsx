// src/pages/Explore.jsx
import React from "react";
import SearchBar from "../components/explore/searchbar";

export default function Explore() {
  const handleSearch = (data) => {
    // Aquí podrías hacer un fetch a tu backend o filtrar servicios
    console.log("📌 Datos de búsqueda recibidos:", data);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-8">
      <SearchBar onSearch={handleSearch} />

      <h1 className="text-3xl font-bold mb-4 mt-6" style={{ color: "#311B92" }}>
        Explorar Servicios
      </h1>
      <p className="text-gray-600 text-lg text-center">
        Aquí podrás descubrir y reservar servicios ofrecidos por diferentes negocios.
      </p>
    </div>
  );
}
