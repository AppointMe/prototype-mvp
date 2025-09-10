// src/pages/Explore.jsx
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {pb} from "@/lib/pocketbase.js";

import SearchBar from "../components/explore/searchbar";
import CategoriesCarousel from "../components/explore/CategoriesCarousel";
import ServicesCarousel from "../components/explore/ServicesCarousel";


export default function Explore() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    // services.
    const [allServices, setAllServices] = useState([]);
    const [loading, setLoading] = useState(true);

    // services categories.
    const [ofertas_semanales, setOfertas_semanales] = useState([]);
    const [servicios_populares, setServicios_populares] = useState([]);
    const [empresas_populares, setEmpresas_populares] = useState([]);

    const navigate = useNavigate();

    // use effect for services.
    useEffect(() => {
        const loadAllServices = async () => {
            try {
                setLoading(true);
                console.log("Iniciando carga de servicios...");
                const services = await pb.collection("services").getFullList(500, {
                    sort: "-created",
                });

                setAllServices(services);
                console.log(`✅ Cargados ${services.length} servicios.`);
                console.log(services);

                if (services.length > 0) {
                    console.log("🔍 Primer servicio:", services[0]);
                    console.log("🏷️ Campos disponibles:", Object.keys(services[0]));
                }

                // Cargar categorías específicas
                // randomiza de allServices hacia ofertas_semanales, servicios_populares, empresas_populares.
                // que vaya el mismo numero a cada una. haz el calculo tomando la longitud de allServices.

                // Mezclar los servicios y repartirlos en tres categorías iguales
                const shuffleArray = (array) => {
                    return [...array].sort(() => Math.random() - 0.5); // copia para no mutar
                };

                const shuffledServices = shuffleArray(services);
                const numServices = Math.floor(shuffledServices.length / 3);

                // para ofertas obtner todos los que tengan discount > 0.
                const ofertas = shuffledServices.filter(s => s.discount > 0).slice(0, numServices);
                const populares = shuffledServices.slice(numServices, numServices * 2);
                const empresas = shuffledServices.slice(numServices * 2, numServices * 3);

                setOfertas_semanales(ofertas);
                setServicios_populares(populares);
                setEmpresas_populares(empresas);

                console.log("Ofertas Semanales:", ofertas);
                console.log("Servicios Populares:", populares);
                console.log("Empresas Populares:", empresas);

            } catch (e) {
                console.error("❌ Error cargando servicios:", e);
                alert("Error cargando servicios. Revisa consola.");
            } finally {
                setLoading(false);
            }
        };
        loadAllServices();
    }, []);


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

            navigate("/explore_result", {state: {category: cat, services}});
        } catch (e) {
            console.error("❌ error:", e);
            alert("Error al cargar servicios. Revisa consola.");
        }
    };

    const handleSearch = async ({query, location, date, time}) => {
        try {
            if (!query.trim()) {
                alert("Escribe un término de búsqueda.");
                return;
            }

            const safe = query.replace(/"/g, '\\"');
            const services = await pb.collection("services").getFullList(500, {
                filter: `title ~ "${safe}"`,
                sort: "-created",
            });

            console.log("🔍 Buscando por:", query);
            console.log("🕒 Hora solicitada:", date, time);
            console.log("✅ Resultados:", services.length);

            if (!services.length) {
                alert(`No se encontraron servicios con el término "${query}".`);
                return;
            }

            // ✅ Pasar también la hora, fecha y lugar como parte del `state`
            navigate("/explore_result", {
                state: {
                    category: `Resultado de: "${query}"`,
                    services,
                    searchMeta: {
                        query,
                        location,
                        date,
                        time,
                    },
                },
            });
        } catch (e) {
            console.error("❌ Error en búsqueda:", e);
            alert("Ocurrió un error al buscar servicios.");
        }
    };

    const handleSelectService = (service) => {
        navigate("/explore_result", { state: { services: [service] } });
    };


    return (
        <div className="flex flex-col items-center justify-start w-full h-full md:p-8 p-2">
            <SearchBar onSearch={handleSearch}/>

            {/* Carrusel de rubros (debajo del buscador) */}
            <CategoriesCarousel
                selected={selectedCategory}
                onSelect={handleSelectCategory}
                onSelectService={handleSelectService}
            />

            {/* Carruseles de servicios */}
            <ServicesCarousel
                title="Ofertas Semanales"
                services={ofertas_semanales}
                loading={loading}
                onSelectService={handleSelectService}
            />
            <ServicesCarousel
                title="Servicios Populares"
                services={servicios_populares}
                loading={loading}
                onSelectService={handleSelectService}
            />
            <ServicesCarousel
                title="Empresas Populares"
                services={empresas_populares}
                loading={loading}
                onSelectService={handleSelectService}
            />

        </div>
    );
}
