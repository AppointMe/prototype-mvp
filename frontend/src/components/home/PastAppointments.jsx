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

    console.log(appointments);

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full">
            <h2 className="text-lg font-semibold mb-4 rounded-2xl bg-[var(--color-primary)] text-white inline-block px-8 py-1">
                Citas recientes
            </h2>

            <ul className="flex flex-row overflow-x-auto">
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
                            className="flex flex-row items-center flex-1 min-w-[180px] max-w-xs mr-4 last:mr-0 bg-gray-50 rounded-xl p-4 shadow-sm"
                        >
                            {imgUrl ? (
                                <img
                                    src={imgUrl}
                                    alt={appointment.expand.service.title}
                                    className="w-12 h-12 rounded-xl object-cover border border-gray-200 mb-2"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 mb-2">
                                    📌
                                </div>
                            )}
                            <div className="flex-1 w-full text-left ml-4">
                                <p className="font-medium text-gray-800 truncate">
                                    {appointment.expand.service.title}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    {appointment.expand.service.business}
                                </p>
                                <p className="text-xs text-gray-400">{formattedDate}</p>
                                <button
                                    className="mt-2 text-xs border px-2 py-1 rounded-lg text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-accent)] transition"
                                    onClick={() => alert('Funcionalidad de calificación no implementada.')}
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
