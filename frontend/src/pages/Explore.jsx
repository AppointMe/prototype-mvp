// src/pages/Explore.jsx
import React, {useState} from "react";
import SearchBar from "../components/explore/searchbar";
import CategoriesCarousel from "../components/explore/CategoriesCarousel";

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearch = (data) => {
    console.log("📌 Datos de búsqueda recibidos:", data);
    // Aquí podrías filtrar con selectedCategory también
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-8">
      <SearchBar onSearch={handleSearch} />

      {/* Carrusel de rubros (debajo del buscador) */}
      <CategoriesCarousel
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Título / placeholder debajo */}
      <h1 className="text-2xl font-bold mt-8" style={{ color: "#311B92" }}>
        {selectedCategory ? `Servicios: ${selectedCategory}` : "Explorar Servicios"}
      </h1>
      <p className="text-gray-600 text-base text-center mt-2">
        {selectedCategory
          ? "Mostrando resultados para el rubro seleccionado."
          : "Selecciona un rubro para explorar servicios disponibles."}
      </p>
    </div>
  );
}
