import React from "react";

export default function Upcoming({ appointments = [] }) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Próximas Citas</h2>
                <button className="text-sm border px-3 py-1 rounded-lg text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-accent)] transition">
                    Nueva cita +
                </button>
            </div>

            {appointments.length === 0 ? (
                <p className="text-gray-500 text-sm">No tienes citas programadas.</p>
            ) : (
                <ul className="space-y-3">
                    {appointments.map((app) => (
                        <li
                            key={app.id}
                            className="p-3 rounded-xl border bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <div className="text-sm text-gray-500">
                                {new Date(app.schedule).toLocaleDateString("es-ES", {
                                    weekday: "short",
                                    day: "numeric",
                                    month: "short",
                                })}
                            </div>

                            <div className="font-medium text-gray-800">
                                {(() => {
                                    const start = new Date(app.schedule);
                                    const end = new Date(start);

                                    end.setMinutes(start.getMinutes() + app.duration * 60);

                                    return (
                                        <>
                                            {start.toLocaleTimeString("es-ES", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}{" "}
                                            -{" "}
                                            {end.toLocaleTimeString("es-ES", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </>
                                    );
                                })()}
                            </div>


                            <div className="text-gray-700 text-sm">{app.title}</div>
                            <div className="text-xs text-gray-500">{app.business}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
