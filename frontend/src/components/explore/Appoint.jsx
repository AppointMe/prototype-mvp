// src/components/explore/Appoint.jsx
import { useState } from "react";
import { Calendar, Clock } from "lucide-react";

export default function Appoint({ service, business, onCancel }) {
    const [quantity, setQuantity] = useState(1);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [comments, setComments] = useState("");


    if (!service || !business) return null;

    console.log('Service:', service);
    console.log('Business:', business);

    const handleAdd = () => {
        alert(`Agendado ${quantity} x ${service.name} en ${business.name}`);
    };

    return (
        <div className="w-full h-full bg-white rounded-2xl shadow p-6 flex flex-col">
            {/* Servicio seleccionado */}
            <h2 className="text-lg font-semibold text-gray-900">
                {service.name}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
                {business.name} – {business.address}
            </p>

            {/* Cantidad */}
            <div className="flex items-center gap-2 mb-4">
                <button
                    className="px-3 py-1 border rounded-full"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                    –
                </button>
                <span className="px-2">{quantity}</span>
                <button
                    className="px-3 py-1 border rounded-full"
                    onClick={() => setQuantity((q) => q + 1)}
                >
                    +
                </button>
            </div>

            {/* Detalles */}
            <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>
                <textarea
                    placeholder="Comentarios (ej. retiro previo de esmalte)"
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
                    className="flex-1 py-2 border rounded-lg text-gray-600"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleAdd}
                    className="flex-1 py-2 bg-[#311B92] text-white rounded-lg"
                >
                    Agregar a calendario
                </button>
            </div>
        </div>
    );
}
