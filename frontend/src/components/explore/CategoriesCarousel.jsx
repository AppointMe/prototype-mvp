// src/components/explore/CategoriesCarousel.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CategoryCard from "./CategoryCard";
import { pb } from "@/lib/pocketbase.js";

export default function CategoriesCarousel({ selected, onSelect }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const scrollRef = useRef(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                // Trae hasta 500 servicios; ajusta si necesitas paginar
                const data = await pb.collection("services").getFullList(500, {
                    fields: "category", // solo necesitamos category
                });
                if (!mounted) return;

                // capitaliza la primera letra de cada categoría
                data.forEach(s => {
                    if (s.category) {
                        if (Array.isArray(s.category)) {
                            s.category = s.category.map(c => c.charAt(0).toUpperCase() + c.slice(1));
                        } else if (typeof s.category === 'string') {
                            s.category = s.category.charAt(0).toUpperCase() + s.category.slice(1);
                        }
                    }
                });

                setServices(data || []);
            } catch (e) {
                console.error("Error cargando servicios:", e);
                setErr("No se pudieron cargar los rubros.");
            } finally {
                setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    // Saca categorías únicas, quita nulos y blanks, ordena alfabéticamente
    const categories = useMemo(() => {
        const set = new Set();
        for (const s of services) {
            const arr = Array.isArray(s?.category) ? s.category : [s?.category];
            arr
                .filter(Boolean)
                .map((c) => c.toString().trim())
                .forEach((c) => set.add(c));
        }
        return Array.from(set).sort((a, b) =>
            a.localeCompare(b, "es", { sensitivity: "base" })
        );
    }, [services]);

    const scrollBy = (px) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: px, behavior: "smooth" });
    };

    if (loading) {
        return (
            <div className="w-full max-w-6xl mt-6">
                <p className="text-sm text-gray-500">Cargando rubros…</p>
            </div>
        );
    }

    if (err) {
        return (
            <div className="w-full max-w-6xl mt-6">
                <p className="text-sm text-red-600">{err}</p>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="w-full max-w-6xl mt-6">
                <p className="text-sm text-gray-500">No hay rubros disponibles.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mt-6">
            <div className="flex items-center gap-2">
                {/* Flecha izquierda */}
                <button
                    onClick={() => scrollBy(-300)}
                    className="p-2 rounded-full border border-gray-200 text-gray-600 hover:text-[#311B92] hover:border-[#311B92]"
                    aria-label="Anterior"
                >
                    <ChevronLeftIcon />
                </button>

                {/* Carrusel horizontal */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-x-auto no-scrollbar scroll-smooth"
                >
                    <div className="flex gap-4 min-h-[112px] px-1">
                        {categories.map((cat) => (
                            <CategoryCard
                                key={cat}
                                label={cat}
                                selected={selected === cat}
                                onClick={() => onSelect?.(cat)}
                            />
                        ))}
                    </div>
                </div>

                {/* Flecha derecha */}
                <button
                    onClick={() => scrollBy(300)}
                    className="p-2 rounded-full border border-gray-200 text-gray-600 hover:text-[#311B92] hover:border-[#311B92]"
                    aria-label="Siguiente"
                >
                    <ChevronRightIcon />
                </button>
            </div>
        </div>
    );
}
