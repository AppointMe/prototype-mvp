import React, { useEffect, useState } from "react";
import { pb } from "@/lib/pocketbase.js";
import Upcoming from "@/components/Home/Upcoming";

export default function Home() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) return;

        pb.collection("appointments")
            .getFullList(200, {
                filter: `customer="${user.id}"`,
                sort: "schedule",
            })
            .then((records) => setAppointments(records))
            .catch((err) => console.error("Error cargando citas:", err));
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row justify-between items-center w-full p-4">
                {/*Temp div covering 60% of width*/}
                <div></div>

                {/*Upcoming widget*/}
                <Upcoming appointments={appointments} />
            </div>
        </div>
    );
}
