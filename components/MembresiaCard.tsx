'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CalendarIcon, StarIcon } from '@heroicons/react/24/solid';

interface Props {
    membresia: {
        id: number;
        nombre: string;
        precio: number;
        duracion: number; // número de meses
        descripcion?: string;
        beneficios: string[];
        popular?: boolean; // Opcional: badge popular
        tipo?: string;     // premium, anual, etc. para icono (opcional)
        ahorro?: string;   // Opcional: "Ahorra 2 meses", etc.
    };
}

export default function MembresiaCard({ membresia }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSeleccionar = () => {
        setLoading(true);
        localStorage.setItem('membresiaSeleccionada', JSON.stringify(membresia));
        router.push('/pago');
    };

    // Icono según tipo (opcional)
    const icon = membresia.tipo === 'premium'
        ? <StarIcon className="w-7 h-7 text-[#bb8856]" />
        : <CalendarIcon className="w-7 h-7 text-[#bb8856]" />;

    return (
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col h-full transition hover:shadow-[0_6px_32px_0_rgba(187,136,86,0.22)] hover:border-[#bb8856]">
            <div className="absolute top-5 right-5">{icon}</div>
            {/* Badge popular */}
            {membresia.popular && (
                <span className="absolute top-5 left-5 bg-[#bb8856] text-white text-xs px-2 py-1 rounded font-semibold shadow">
          POPULAR
        </span>
            )}

            {/* Nombre y precio */}
            <div className="mb-1">
                <div className="text-lg font-bold text-[#bb8856] mb-1">{membresia.nombre}</div>
                <div className="text-2xl font-extrabold text-[#bb8856]">
                    {membresia.precio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                    <span className="text-base font-medium ml-2 text-gray-700">
            / {membresia.duracion > 1 ? `${membresia.duracion} meses` : 'mes'}
          </span>
                </div>
                {membresia.ahorro && (
                    <div className="text-green-700 text-sm font-semibold">{membresia.ahorro}</div>
                )}
            </div>
            {/* Descripción opcional */}
            {membresia.descripcion && (
                <div className="text-sm text-gray-600 mb-1">{membresia.descripcion}</div>
            )}
            {/* Beneficios */}
            <div className="mb-3 mt-2">
                <span className="font-semibold text-sm text-gray-700 block mb-1">Incluye:</span>
                <ul className="mb-2 space-y-1">
                    {membresia.beneficios?.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
              <span className="inline-block w-4 h-4 text-[#bb8856]">
                {/* Check personalizado */}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
                            {b}
                        </li>
                    ))}
                </ul>
            </div>
                {/* Duración */}
                <div className="mt-auto">
                    <div className="flex items-center justify-between gap-2 pt-3">
                        {/* Duración */}
                        <div className="flex items-center text-base md:text-lg font-semibold text-gray-700">
                            <CalendarIcon className="w-5 h-5 mr-2 text-[#bb8856]" />
                            Duración:
                            <span className="ml-2">{membresia.duracion > 1 ? `${membresia.duracion} meses` : '1 mes'}</span>
                        </div>
                        {/* Botón */}
                        <button
                            disabled={loading}
                            onClick={handleSeleccionar}
                            className="bg-[#bb8856] hover:bg-[#9A6D42] transition text-white font-semibold py-2 px-6 rounded-lg text-base"
                            style={{ minWidth: 140 }}
                        >
                            {loading ? 'Cargando...' : 'Seleccionar'}
                        </button>
                    </div>
                </div>

        </div>
    );
}
