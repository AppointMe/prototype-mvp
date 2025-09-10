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

    const durationToText = (duration) => {
        // 1.5 a 1h 30m
        const hours = Math.floor(duration);
        const minutes = Math.round((duration - hours) * 60);
        return `${hours > 0 ? hours + "h " : ""}${minutes > 0 ? minutes + "m" : ""}`.trim();
    }

    const total = quantity * (service.price || 0);

    const handleAdd = async () => {
        const customer = localStorage.getItem("user");
        if (!customer) {
            alert("No se encontró el usuario. Inicie sesión.");
            return;
        }

        // Construir fecha y hora de inicio
        const schedule = `${date}T${startTime}`;
        const serviceId = service.id;
        const scheduleDate = new Date(schedule);

        try {
            await pb.collection("appointments").create({
                customer: JSON.parse(customer).id,
                schedule: scheduleDate,
                duration: service.duration || 1,
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
                    {durationToText(service.duration || 1)}
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-medium">
                    Q{service.price || 0}
                </div>
            </div>

            {/* Detalles de la cita */}
            <div className="pt-4">
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
                    <p className="text-sm text-gray-700 border-b pb-1 border-[var(--color-border)]">
                        {business} <br/>
                        {address}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-2 text-sm mb-3">
                    <div className="flex items-center gap-2 w-full">
                        {/*<Calendar className="w-4 h-4 text-gray-500"/>*/}
                        <label className="text-sm font-semibold">Fecha</label>
                    </div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border-b w-full pb-1 border-[var(--color-border)]"
                    />
                </div>

                {/* Hora de inicio */}
                <div className="flex flex-col items-center gap-2 text-sm mb-3">
                    <div className="flex items-center gap-2 w-full">
                        {/*<Clock className="w-4 h-4 text-gray-500"/>*/}
                        <label className="text-sm font-semibold">Hora</label>
                    </div>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="border-b w-full pb-1 border-[var(--color-border)]"
                    />
                </div>

                <textarea
                    placeholder="Comentarios"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full border rounded text-sm"
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
