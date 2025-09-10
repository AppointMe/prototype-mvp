// src/components/explore/ServicesCarousel.jsx
import React, { useRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ServiceCard from "./ServiceCard";

export default function ServicesCarousel({ 
    title, 
    services = [], 
    loading = false 
}) {
    const scrollRef = useRef(null);

    const scrollBy = (direction) => {
        if (!scrollRef.current) return;
        const scrollAmount = 340; // Ajusta según el ancho de tu tarjeta
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    if (loading) {
        return (
            <div className="w-full">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
                <div className="flex gap-4 overflow-hidden">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="min-w-[320px] h-32 bg-gray-200 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (!services.length) {
        return (
            <div className="w-full">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
                <p className="text-gray-500">No hay servicios disponibles en este momento.</p>
            </div>
        );
    }

    return (
        <div className="w-full mb-8">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scrollBy("left")}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                        aria-label="Scroll left"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        onClick={() => scrollBy("right")}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                        aria-label="Scroll right"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar"
                style={{ scrollBehavior: "smooth" }}
            >
                {services.map((service) => (
                    <div key={service.id} className="min-w-[320px]">
                        <ServiceCard service={service} />
                    </div>
                ))}
            </div>
        </div>
    );
}