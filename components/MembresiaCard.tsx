'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  membresia: {
    id: number;
    nombre: string;
    precio: number;
    duracion: number;
    descripcion: string;
    beneficios: string[];
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

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{membresia.nombre}</h2>
      <p className="text-amber-700 font-bold mb-2">
        ${membresia.precio} MXN / {membresia.duracion > 1 ? `${membresia.duracion} meses` : 'mes'}
      </p>
      <ul className="text-sm mb-4 list-disc pl-4 text-gray-700">
        {membresia.beneficios?.map((b: string, idx: number) => (
          <li key={idx}>{b}</li>
        ))}
      </ul>
      <button
        disabled={loading}
        onClick={handleSeleccionar}
        className="bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700 w-full"
      >
        {loading ? 'Cargando...' : 'Seleccionar'}
      </button>
    </div>
  );
}
