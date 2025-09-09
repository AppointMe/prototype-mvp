// src/pages/Explore.jsx
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "@/lib/pocketbase.js";
import SearchBar from "../components/explore/searchbar";
import CategoriesCarousel from "../components/explore/CategoriesCarousel";

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate();

  const handleSelectCategory = async (cat) => {
  try {
    const safe = cat.replace(/"/g, '\\"');

    // 👇 importantísimo: ?= para "array CONTAINS"
    const services = await pb.collection("services").getFullList(500, {
      filter: `category ~ "${safe}"`,
      sort: "-created",
    });


    if (!services.length) {
      alert(`No se encontraron servicios para "${cat}".`);
      return;
    }

    navigate("/explore_result", { state: { category: cat, services } });
  } catch (e) {
    console.error("❌ error:", e);
    alert("Error al cargar servicios. Revisa consola.");
  }
};

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
        onSelect={handleSelectCategory}
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
