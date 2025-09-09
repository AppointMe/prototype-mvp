import React from "react";

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

function getImageUrl(appointment) {
    if (!appointment?.expand.service?.logo) return null;
    return `${pocketbaseUrl}/api/files/services/${appointment.expand.service.id}/${appointment.expand.service.logo}`;
}

export default function PastAppointments({ appointments = [] }) {
    if (appointments.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-md p-4 w-full">
                <h2 className="text-lg font-semibold mb-4">Citas recientes</h2>
                <p className="text-gray-500 text-sm">No tienes citas anteriores.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full">
            <h2
                className="text-lg mb-4 rounded-2xl bg-[var(--color-primary)] text-white inline-block px-8 py-1"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                CITAS RECIENTES
            </h2>

            <ul className="flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap">
                {appointments.map((appointment) => {
                    const date = new Date(appointment.schedule);
                    const formattedDate = date.toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    const imgUrl = getImageUrl(appointment);

                    return (
                        <li
                            key={appointment.id}
                            className="flex flex-row items-center w-full max-w-lg lg:min-w-[200px] lg:max-w-xs bg-white rounded-xl p-4 border border-[var(--color-border)] transition"
                        >
                            {imgUrl ? (
                                <img
                                    src={imgUrl}
                                    alt={appointment.expand.service.title}
                                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                                    📌
                                </div>
                            )}
                            <div className="flex-1 w-full text-left ml-4">
                                <p className="font-medium text-gray-800 truncate">
                                    {appointment.expand.service.title}
                                </p>
                                <p className="text-xs text-[var(--color-text)] mb-2">{formattedDate}</p>
                                <p className="text-sm text-[var(--color-stext)] truncate">
                                    {appointment.expand.service.business}
                                </p>
                                <button
                                    className="mt-2 text-xs border px-2 py-1 rounded-lg text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-accent)] transition"
                                    onClick={() =>
                                        alert("Funcionalidad de calificación no implementada.")
                                    }
                                >
                                    Calificar Servicio
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
