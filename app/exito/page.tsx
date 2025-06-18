'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCliente } from '../../context/ClienteContext';

export default function ExitoPage() {
  const router = useRouter();
  const { cliente } = useCliente();
  const [membresia, setMembresia] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('membresiaSeleccionada');
    if (!stored) {
      router.push('/membresias');
    } else {
      setMembresia(JSON.parse(stored));
    }
  }, [router]);

  const handleRegresar = () => {
    router.push('/nuevo');
  };

  return (
    <main className="max-w-lg mx-auto px-4 py-10 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">✅ Registro Exitoso</h1>

      <div className="bg-white shadow p-6 rounded border border-gray-200 text-left space-y-2">
        <p><strong>Cliente:</strong> {cliente?.nombre} {cliente?.apellido}</p>
        <p><strong>Membresía:</strong> {membresia?.nombre}</p>
        <p><strong>Duración:</strong> {membresia?.duracion} mes(es)</p>
        <p><strong>Total:</strong> {Number(membresia?.precio).toLocaleString('es-MX', {
          style: 'currency',
          currency: 'MXN'
        })}</p>
        <p><strong>Estatus:</strong> pendiente de pago en taquilla</p>
      </div>

      <button
        onClick={handleRegresar}
        className="mt-6 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded"
      >
        Registrar otro cliente
      </button>
    </main>
  );
}
