// src/pages/ExploreResult.jsx
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { pb } from "@/lib/pocketbase.js";

export default function ExploreResult() {
    const { state } = useLocation();
    const [searchParams] = useSearchParams();

    // si viene por state:
    const stateCategory = state?.category || null;
    const stateServices = state?.services || null;
    const meta = state?.searchMeta || null;

    const [category, setCategory] = useState(
        stateCategory || searchParams.get("category") || ""
    );
    const [services, setServices] = useState(stateServices || []);
    const [loading, setLoading] = useState(!stateServices);

    // fallback: si entran directo por URL sin state, carga acá
    useEffect(() => {
        const fetchIfNeeded = async () => {
            if (services.length || !category) return;
            setLoading(true);
            try {
                const res = await pb.collection("services").getFullList(500, {
                    filter: `category="${category}"`,
                    sort: "-created",
                });
                setServices(res);
            } finally {
                setLoading(false);
            }
        };
        fetchIfNeeded();
    }, [category, services.length]);

    

    return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-[#311B92]">
        {category}
      </h1>

      {/* ✅ Muestra hora/fecha si viene de búsqueda */}
      {meta && (
        <div className="text-sm text-gray-500 mt-1">
          Fecha buscada: <strong>{meta.date}</strong> a las <strong>{meta.time}</strong> en <strong>{meta.location}</strong>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-2">
        {services.length} resultado{services.length === 1 ? "" : "s"} encontrado{services.length === 1 ? "" : "s"}
      </p>

      <ul className="mt-4 space-y-2">
        {services.map((s) => (
          <li key={s.id}>
            <span className="font-semibold text-[#311B92]">{s.title || "Servicio"}</span> —{" "}
            <span className="text-sm text-gray-600">
              {Array.isArray(s.category) ? s.category.join(", ") : s.category}
            </span>
            <div className="text-xs text-gray-400">ID: {s.id}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
