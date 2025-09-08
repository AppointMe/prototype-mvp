import React, {useEffect, useState} from "react";
import {pb} from "@/lib/pocketbase.js";

import Upcoming from "@/components/Home/Upcoming";
import Calendar from "@/components/Home/Calendar";

export default function Home() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointmentsWithServices = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user?.id) return;

                // 1. Traer todas las citas
                const records = await pb.collection("appointments").getFullList(200, {
                    filter: `customer="${user.id}"`,
                    sort: "schedule",
                });

                if (!records.length) {
                    setAppointments([]);
                    setLoading(false);
                    return;
                }

                // 2. Extraer los IDs únicos de servicios
                const serviceIds = [...new Set(records.map((r) => r.service))];

                // 3. Consultar servicios relacionados
                const services = await pb.collection("services").getFullList(200, {
                    filter: serviceIds.map((id) => `id="${id}"`).join(" || "),
                });

                // 4. Crear un diccionario { id: service }
                const serviceMap = services.reduce((acc, svc) => {
                    acc[svc.id] = svc;
                    return acc;
                }, {});

                // 5. Combinar citas con su servicio
                const enrichedAppointments = records.map((appt) => ({
                    ...appt,
                    service: serviceMap[appt.service] || null,
                }));

                setAppointments(enrichedAppointments);

                console.log(enrichedAppointments);
            } catch (err) {
                console.error("Error cargando citas con servicios:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointmentsWithServices();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                Cargando...
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-between items-stretch w-full p-4 gap-6">
                {/* Calendar */}
                <Calendar appointments={appointments}/>

                {/* Upcoming */}
                <Upcoming appointments={appointments}/>
            </div>
        </div>
    );
}
