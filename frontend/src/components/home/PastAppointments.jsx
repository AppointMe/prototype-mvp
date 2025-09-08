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
                <h2 className="text-lg font-semibold mb-4">Citas pasadas</h2>
                <p className="text-gray-500 text-sm">No tienes citas anteriores.</p>
            </div>
        );
    }

    console.log(appointments);

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full">
            <h2 className="text-lg font-semibold mb-4">Citas pasadas</h2>

            <ul className="divide-y divide-gray-100">
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
                            className="flex items-center gap-4 py-3"
                        >
                            {imgUrl ? (
                                <img
                                    src={imgUrl}
                                    alt={appointment.expand.service.title}
                                    className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                                    📌
                                </div>
                            )}
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">
                                    {appointment.expand.service.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {appointment.expand.service.business}
                                </p>
                                <p className="text-xs text-gray-400">{formattedDate}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
