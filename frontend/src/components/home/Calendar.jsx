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

    // Número de días en el mes anterior y siguiente
    const prevMonthDate = new Date(currentYear, currentMonth, 0);
    const prevMonthDays = prevMonthDate.getDate();
    const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);

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
    const weekDays = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];

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

    // Calcular celdas para el calendario (6 filas de 7 días = 42)
    const totalCells = 42;
    const days = [];

    // Días del mes anterior
    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({
            day: prevMonthDays - i,
            type: "prev",
        });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            day: i,
            type: "current",
        });
    }

    // Días del mes siguiente
    const nextDays = totalCells - days.length;
    for (let i = 1; i <= nextDays; i++) {
        days.push({
            day: i,
            type: "next",
        });
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full flex-1 h-full flex flex-col">
            {/* Header calendario */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={prevMonth}
                    className="px-2 py-1 rounded-lg hover:bg-gray-100 text-3xl"
                >
                    {"<"}
                </button>
                <h2 className="font-semibold text-lg">
                    {monthNames[currentMonth]}, {currentYear}
                </h2>
                <button
                    onClick={nextMonth}
                    className="px-2 py-1 rounded-lg hover:bg-gray-100 text-3xl"
                >
                    {">"}
                </button>
            </div>

            {/* Encabezados de semana */}
            <div className="grid grid-cols-7 text-center font-medium px-8">
                {weekDays.map((day, idx) => {
                    // Determinar si este header es el día actual
                    const isTodayHeader = today.getDay() === idx;
                    return (
                        <div
                            key={day}
                            className={`py-1 ${isTodayHeader ? "text-[var(--color-primary)] font-semibold" : "text-[var(--color-stext)]"}`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>

            {/* Línea separadora */}
            <div className="border-b border border-[var(--color-secondary)] my-4 mx-4" />

            {/* Días */}
            <div className="grid grid-cols-7 grid-rows-6 gap-1 flex-1 h-full min-h-0 px-8">
                {days.map((cell, idx) => {
                    if (cell.type !== "current") {
                        // Días de otros meses
                        return (
                            <div
                                key={`other-${idx}`}
                                className="flex flex-col items-center justify-start p-1 h-full min-h-0"
                            >
                                <span className="flex items-center justify-center w-8 h-8 rounded-full text-[var(--color-border)] text-[28px] font-medium cursor-default">
                                    {cell.day}
                                </span>
                            </div>
                        );
                    }

                    // Días del mes actual
                    const day = cell.day;
                    const dayAppointments = appointmentsByDay[day] || [];

                    const isToday =
                        day === today.getDate() &&
                        currentMonth === today.getMonth() &&
                        currentYear === today.getFullYear();

                    // Determinar si el día está en la semana current
                    let isCurrentWeek = false;
                    if (currentWeekRange) {
                        const date = new Date(currentYear, currentMonth, day);
                        isCurrentWeek =
                            date >= currentWeekRange[0] && date <= currentWeekRange[1];
                    }

                    // Estilos de color y tamaño según condición
                    let dayTextClass = "";
                    if (isCurrentWeek) {
                        dayTextClass = "text-[var(--color-text)] text-[32px]";
                    } else {
                        dayTextClass = "text-[var(--color-stext)] text-[28px]";
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
                                        : "font-medium"
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
