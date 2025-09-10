// src/components/explore/ServiceCard.jsx
import React from "react";

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

// Función para generar URL de imagen desde PocketBase
function getImageUrl(service) {
    if (!service?.logo) return null;
    return `${pocketbaseUrl}/api/files/services/${service.id}/${service.logo}`;
}

export default function ServiceCard({ service }) {
    const imageUrl = getImageUrl(service);
    const originalPrice = service.price || 0;
    const discount = service.discount || 0;
    const hasDiscount = discount > 0;
    const discountedPrice = hasDiscount
        ? Math.round(originalPrice * (1 - discount / 100))
        : originalPrice;

    return (
      <div className="w-full max-w-lg h-auto md:h-48 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col md:flex-row gap-4 md:gap-6">
        {/* LA PUTA FOTO */}
        <div className="md:basis-2/5 h-32 md:h-full flex items-center justify-center overflow-hidden rounded-xl">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">Sin imagen disponible</span>
          )}
        </div>
        {/* LAS DEMAS ESTUPIDECES */}
        <div className="md:basis-3/5 flex-1 h-full flex flex-col justify-center px-4 py-3 md:px-6 md:py-4">
          <h2 className="text-base md:text-xl font-bold text-gray-900 mb-1">{service.title}</h2>
          <div className="text-gray-700 text-sm md:text-base mb-2">{service.business}</div>
          <div className="flex items-center gap-2 mb-0">
            <span className="text-base md:text-lg font-semibold text-gray-900">
              GTQ {discountedPrice}
            </span>
            {hasDiscount && (
              <>
                <span className="text-gray-400 line-through text-sm md:text-base">
                  GTQ {originalPrice}
                </span>
              </>
            )}
          </div>
          {hasDiscount && (
            <span className="bg-indigo-700 text-white text-xs font-semibold px-2 py-1 rounded mt-2 w-fit self-end">
              {discount}% descuento
            </span>
          )}
        </div>
      </div>
    );
}