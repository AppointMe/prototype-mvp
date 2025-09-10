import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
      <div className="w-full flex flex-col items-center mt-4 px-4">
        <h2 className="hidden md:block text-lg font-semibold mb-4 text-center md:text-left">
          Encuentra el servicio que necesitas y agenda ahora
        </h2>

        <form
          className="flex flex-col md:flex-row items-center justify-center gap-3 w-full md:max-w-5xl"
          onSubmit={e => {
            e.preventDefault();
            handleSearch();
          }}
        >
          {/* Input de búsqueda */}
          <div className="flex items-center border rounded px-3 py-2 flex-1 w-full md:max-w-xl">
            <SearchIcon className="text-gray-500 mr-2" fontSize="small" />
            <input
                type="text"
                placeholder="¿Qué servicio estás buscando?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-sm"
            />

            {/* Solo en mobile: ícono ubicación */}
            <button
                type="button"
                className="ml-2 block lg:hidden text-gray-500 hover:text-[var(--color-primary)]"
                onClick={() => alert("Funcionalidad no implementada")}
            >
              <LocationOnIcon fontSize="small" />
            </button>
          </div>

          {/* Select ubicación - oculto en mobile */}
          <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="hidden lg:block border rounded px-3 py-2 flex-1 outline-none text-sm"
          >
            <option>Guatemala</option>
            <option>El Salvador</option>
            <option>Honduras</option>
          </select>

          {/* Fecha - oculta en mobile */}
          <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="hidden lg:block border rounded px-3 py-2 flex-1 outline-none text-sm"
          />

          {/* Hora - oculta en mobile */}
          <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="hidden lg:block border rounded px-3 py-2 flex-1 outline-none text-sm"
          />

          {/* Botón */}
          <button
              type="submit"
              className="hidden lg:block px-6 py-2 text-white rounded text-sm hover:opacity-90"
              style={{ backgroundColor: "#311B92" }}
          >
            Buscar Servicio
          </button>
        </form>
      </div>
  );
}
