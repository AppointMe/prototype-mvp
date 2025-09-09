import React, { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase.js";

import Upcoming from "@/components/Home/Upcoming";
import Calendar from "@/components/Home/Calendar";
import PastAppointments from "@/components/Home/PastAppointments";
import Navbar from "@/components/navbar/navbar.jsx";

export default function Home() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) return;

        pb.collection("appointments")
            .getFullList(200, {
                filter: `customer="${user.id}"`,
                sort: "schedule",
                expand: "service", // 👈 asegúrate que venga con los datos del servicio
            })
            .then((records) => setAppointments(records))
            .catch((err) => console.error("Error cargando citas:", err));
    }, []);

    const now = new Date();

    // Citas pasadas: fecha < hoy
    const pastAppointments = appointments.filter(
        (app) => new Date(app.schedule) < now
    );

    // Citas futuras: fecha >= hoy
    const upcomingAppointments = appointments.filter(
        (app) => new Date(app.schedule) >= now
    );

    return (
        <div className="flex flex-col w-full h-full">
            
            {/* Contenido principal */}
            <div className="flex flex-row justify-between items-stretch w-full p-4 gap-6 h-full">
                {/* Calendar → todas */}
                <Calendar appointments={appointments} />

                {/* Upcoming → solo futuras */}
                <Upcoming appointments={upcomingAppointments} />
            </div>

            {/* Past → solo pasadas */}
            <PastAppointments appointments={pastAppointments} />
        </div>
    );
}
