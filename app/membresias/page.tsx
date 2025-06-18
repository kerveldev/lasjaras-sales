// app/membresias/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMembresias } from '../../lib/api';
import { useCliente } from '../../context/ClienteContext';
import MembresiaCard from '../../components/MembresiaCard';

export default function MembresiasPage() {
  const { cliente } = useCliente();
  const router = useRouter();
  const [membresias, setMembresias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cliente) {
      router.push('/nuevo');
      return;
    }

    getMembresias()
      .then(setMembresias)
      .catch(() => alert('Error al cargar membresías'))
      .finally(() => setLoading(false));
  }, [cliente, router]);

  return (
    <main className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Membresías Disponibles</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {membresias.map((membresia) => (
            <MembresiaCard key={membresia.id} membresia={membresia} />
          ))}
        </div>
      )}
    </main>
  );
}
