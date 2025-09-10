import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { pb } from "@/lib/pocketbase.js";
import BusinessCard from "../components/explore/BusinessCard.jsx";

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

function getImageUrl(service) {
    if (!service?.logo) return null;
    return `${pocketbaseUrl}/api/files/services/${service.id}/${service.logo}`;
}

export default function ExploreResult() {
    const { state } = useLocation();
    const [searchParams] = useSearchParams();

    const stateCategory = state?.category || null;
    const stateServices = state?.services || null;
    const meta = state?.searchMeta || null;

    const [category, setCategory] = useState(
        stateCategory || searchParams.get("category") || ""
    );
    const [services, setServices] = useState(stateServices || []);
    const [loading, setLoading] = useState(!stateServices);

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
            <h1 className="text-xl font-bold text-[var(--color-text)]">
                {category}
            </h1>

            {meta && (
                <div className="text-sm text-gray-500 mt-1">
                    Fecha buscada: <strong>{meta.date}</strong> a las <strong>{meta.time}</strong> en <strong>{meta.location}</strong>
                </div>
            )}

            <p className="text-sm text-gray-500 mt-2">
                {services.length} resultado{services.length === 1 ? "" : "s"} encontrado{services.length === 1 ? "" : "s"}
            </p>

            <div className="mt-6 space-y-6">
                {services.map((s) => (
                    <BusinessCard
                        key={s.id}
                        logo={getImageUrl(s) || "https://placehold.co/56x56"}
                        name={s.title || "Servicio"}
                        address={
                            Array.isArray(s.category)
                                ? s.category.join(", ")
                                : s.category || "Sin categoría"
                        }
                        rating={5}
                        services={[
                            {
                                name: s.title || "Servicio",
                                price: s.price || 0
                            }
                        ]}
                        onViewAll={() => alert(`Ver todos los servicios de ${s.title}`)}
                        onSchedule={(service) =>
                            alert(`Agendar ${service.name} en ${s.title}`)
                        }
                    />
                ))}
            </div>
        </div>
    );
}
