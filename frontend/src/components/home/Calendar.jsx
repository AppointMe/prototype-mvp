import React, {useState} from "react";

export default function Calendar({appointments = []}) {
    // Helper para obtener el rango de la semana actual
    function getCurrentWeekRange(date) {
        const dayOfWeek = date.getDay(); // 0 (domingo) - 6 (sábado)
        const start = new Date(date);
        start.setDate(date.getDate() - dayOfWeek);
        const end = new Date(date);
        end.setDate(date.getDate() + (6 - dayOfWeek));
        return [start, end];
    }

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    // Número de días en el mes
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = domingo

    // Agrupar citas por día
    const appointmentsByDay = appointments.reduce((acc, app) => {
        const date = new Date(app.schedule);
        if (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        ) {
            const day = date.getDate();
            if (!acc[day]) acc[day] = [];
            acc[day].push({
                ...app,
                serviceTitle: app.service?.title || "Servicio",
                serviceBusiness: app.service?.business || "Negocio",
            });
        }
        return acc;
    }, {});

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    // Calcular rango de la semana actual (solo si el mes/año coincide)
    let currentWeekRange = null;
    if (
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()
    ) {
        currentWeekRange = getCurrentWeekRange(today);
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full flex-1 h-full flex flex-col">
            {/* Header calendario */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={prevMonth}
                    className="px-2 py-1 rounded-lg hover:bg-gray-100"
                >
                    ◀
                </button>
                <h2 className="font-semibold text-lg">
                    {monthNames[currentMonth]}, {currentYear}
                </h2>
                <button
                    onClick={nextMonth}
                    className="px-2 py-1 rounded-lg hover:bg-gray-100"
                >
                    ▶
                </button>
            </div>

            {/* Encabezados de semana */}
            <div className="grid grid-cols-7 text-center font-medium text-gray-600">
                {weekDays.map((day) => (
                    <div key={day} className="py-1">
                        {day}
                    </div>
                ))}
            </div>

            {/* Días */}
            <div className="grid grid-cols-7 grid-rows-6 gap-1 flex-1 h-full min-h-0">
                {/* Espacios vacíos antes del primer día */}
                {Array.from({length: firstDay}).map((_, i) => (
                    <div
                        key={`empty-${i}`}
                        className="py-4 text-color-border"
                    />
                ))}

                {/* Días del mes */}
                {Array.from({length: daysInMonth}).map((_, dayIndex) => {
                    const day = dayIndex + 1;
                    const dayAppointments = appointmentsByDay[day] || [];

                    const isToday =
                        day === today.getDate() &&
                        currentMonth === today.getMonth() &&
                        currentYear === today.getFullYear();

                    // Determinar si el día está en la semana actual
                    let isCurrentWeek = false;
                    if (currentWeekRange) {
                        const date = new Date(currentYear, currentMonth, day);
                        isCurrentWeek =
                            date >= currentWeekRange[0] && date <= currentWeekRange[1];
                    }

                    // Estilos de color y tamaño según condición
                    let dayTextClass = "";
                    if (isCurrentWeek) {
                        dayTextClass = "text-color-text text-[24px]";
                    } else {
                        dayTextClass = "text-color-stext text-[20px]";
                    }

                    return (
                        <div
                            key={day}
                            className="flex flex-col items-center justify-start p-1 h-full min-h-0 cursor-pointer hover:bg-gray-100 rounded-lg"
                        >
                            <span
                                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                    isToday
                                        ? "bg-purple-100 text-purple-700 font-bold"
                                        : ""
                                } ${dayTextClass}`}
                            >
                                {day}
                            </span>

                            {/* Puntos de citas */}
                            <div className="flex space-x-0.5 mt-1">
                                {dayAppointments.slice(0, 4).map((app, i) => (
                                    <span
                                        key={i}
                                        className="w-1.5 h-1.5 bg-purple-600 rounded-full"
                                        title={`${app.serviceTitle} - ${app.serviceBusiness}`}
                                    />
                                ))}
                                {dayAppointments.length > 4 && (
                                    <span className="text-xs text-purple-600 font-bold">
                                        +
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
