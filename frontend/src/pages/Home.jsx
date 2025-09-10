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
                expand: "service",
            })
            .then((records) => setAppointments(records))
            .catch((err) => console.error("Error cargando citas:", err));
    }, []);

    const now = new Date();

    const pastAppointments = appointments.filter(
        (app) => new Date(app.schedule) < now
    );
    const upcomingAppointments = appointments.filter(
        (app) => new Date(app.schedule) >= now
    );

    return (
        <div className="flex flex-col w-full h-full p-4 gap-6">
            {/* Layout responsive */}
            <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 items-center">
                {/* Calendar: todas */}
                <Calendar appointments={appointments} />

                {/* Upcoming: futuras */}
                <Upcoming appointments={upcomingAppointments} />
            </div>

            {/* Past: pasadas */}
            <PastAppointments appointments={pastAppointments} />
        </div>
    );
}
