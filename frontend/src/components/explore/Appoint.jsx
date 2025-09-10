// src/components/explore/Appoint.jsx
import {useState} from "react";
import {Calendar, Clock} from "lucide-react";
import {useNavigate} from "react-router";
import {pb} from "@/lib/pocketbase";

export default function Appoint({service, onCancel}) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [date, setDate] = useState(tomorrow.toISOString().split("T")[0]);
    const [quantity, setQuantity] = useState(1);
    const [startTime, setStartTime] = useState("15:00");
    const [endTime, setEndTime] = useState("16:30");
    const [comments, setComments] = useState("");

    const navigate = useNavigate();

    if (!service) return null;
    console.log("Servicio en Appoint:", service);

    // --- Datos del servicio ---
    const name = service.name || "Servicio";
    const price = service.price || 0;
    const business = service.business || "Negocio";
    const logo = service.logo || "https://placehold.co/64";
    const address = "Guatemala"; // Placeholder si no hay dirección
    const description = service.description || "Descripción no disponible";

    // --- Cálculo duración dinámica ---
    function getDuration(start, end) {
        if (!start || !end) return "";
        const [sh, sm] = start.split(":").map(Number);
        const [eh, em] = end.split(":").map(Number);
        let startMinutes = sh * 60 + sm;
        let endMinutes = eh * 60 + em;
        if (endMinutes < startMinutes) endMinutes += 24 * 60; // Soporta cruces de medianoche
        const diff = endMinutes - startMinutes;
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        let res = "";
        if (hours > 0) res += `${hours}h `;
        if (minutes > 0) res += `${minutes}m`;
        return res.trim() || "0m";
    }

    const durationToHours = (duration) => {
        // del resultado de getDuration, obtener un número en horas (decimal)
        // 1h 30m -> 1.5
        const parts = duration.split(" ");
        let hours = 0;
        parts.forEach((part) => {
            if (part.endsWith("h")) {
                hours += parseInt(part) || 0;
            } else if (part.endsWith("m")) {
                hours += (parseInt(part) || 0) / 60;
            }
        });
        return hours;

    }

    const duration = getDuration(startTime, endTime);

    const total = quantity * (service.price || 0);

    const handleAdd = async () => {
        const customer = localStorage.getItem("user");
        if (!customer) {
            alert("No se encontró el usuario. Inicie sesión.");
            return;
        }

        // Construir fecha y hora de inicio
        const schedule = `${date}T${startTime}`;
        const duration = getDuration(startTime, endTime);
        const serviceId = service.id;
        const scheduleDate = new Date(schedule);

        try {
            await pb.collection("appointments").create({
                customer: JSON.parse(customer).id,
                schedule: scheduleDate,
                duration: durationToHours(duration),
                service: serviceId,
            });
            if (onCancel) onCancel();

            // Redirigir a "home"
            navigate("/home");

        } catch (e) {
            alert("Error al agendar la cita");
            console.error(e);
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow md:p-6 flex flex-col gap-6">
            {/* Encabezado */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
                {/*<div className="flex items-center gap-2">*/}
                {/*    <button*/}
                {/*        className="px-3 py-1 border rounded-full"*/}
                {/*        onClick={() => setQuantity((q) => Math.max(1, q - 1))}*/}
                {/*    >*/}
                {/*        –*/}
                {/*    </button>*/}
                {/*    <span className="px-2">{quantity}</span>*/}
                {/*    <button*/}
                {/*        className="px-3 py-1 border rounded-full"*/}
                {/*        onClick={() => setQuantity((q) => q + 1)}*/}
                {/*    >*/}
                {/*        +*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>

            {/* Descripción */}
            <p className="text-sm text-gray-600">{description}</p>

            {/* Duración y precio unitario */}
            <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#F3F0FF] text-[#311B92] font-medium">
                    <Clock className="w-4 h-4"/>
                    {duration}
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium">
                    Q{service.price || 0}
                </div>
            </div>

            {/* Requisitos */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900">Requisitos</h3>
                <p className="text-sm text-gray-600">
                    Indicar en comentarios si necesita personalización adicional
                </p>
            </div>

            {/* Detalles de la cita */}
            <div className="border-t pt-4">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                    DETALLES DE LA CITA
                </h3>

                <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-600">
                    {quantity} x {name}
                    </span>
                    <span className="font-semibold">Q {total}</span>
                </div>

                <div className="mb-3">
                    <label className="text-sm font-semibold">Lugar</label>
                    <p className="text-sm text-gray-700">
                        {business} <br/>
                        {address}
                    </p>
                </div>

                <div className="flex items-center gap-2 text-sm mb-3">
                    <Calendar className="w-4 h-4 text-gray-500"/>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>

                {/*Horas*/}
                <div className="flex flex-col md:flex-row gap-4 my-6 items-start md:items-center">
                    {/* Hora de inicio */}
                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500"/>
                        <span>Inicio:</span>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                        />
                    </div>

                    {/* Hora de fin */}
                    <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500"/>
                        <span>Fin:</span>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                        />
                    </div>
                </div>

                <textarea
                    placeholder="Comentarios"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    rows={3}
                />
            </div>

            {/* Acciones */}
            <div className="flex gap-3 mt-6">
                <button
                    onClick={onCancel}
                    className="flex-1 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleAdd}
                    className="flex-1 py-2 bg-[#311B92] text-white rounded-lg hover:bg-[#4527A0]"
                >
                    Agregar a calendario
                </button>
            </div>
        </div>
    );
}
