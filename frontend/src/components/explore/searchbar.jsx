// src/components/SearchBar.jsx
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  const today = new Date().toISOString().split("T")[0];

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Guatemala");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("15:00");

  const handleSearch = () => {
    const searchData = { query, location, date, time };
    console.log("🔍 Buscando con:", searchData);

    if (onSearch) {
      onSearch(searchData);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Encuentra el servicio que necesitas y agenda ahora
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-5xl">
        {/* Input de búsqueda */}
        <div className="flex items-center border rounded px-3 py-2 flex-1">
          <SearchIcon className="text-gray-500 mr-2" fontSize="small" />
          <input
            type="text"
            placeholder="¿Qué servicio estás buscando?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
        </div>

        {/* Select ubicación */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded px-3 py-2 flex-1 outline-none text-sm"
        >
          <option>Guatemala</option>
          <option>El Salvador</option>
          <option>Honduras</option>
        </select>

        {/* Fecha */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-3 py-2 flex-1 outline-none text-sm"
        />

        {/* Hora */}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border rounded px-3 py-2 flex-1 outline-none text-sm"
        />

        {/* Botón */}
        <button
          onClick={handleSearch}
          className="px-6 py-2 text-white rounded text-sm hover:opacity-90"
          style={{ backgroundColor: "#311B92" }}
        >
          Buscar Servicio
        </button>
      </div>
    </div>
  );
}
