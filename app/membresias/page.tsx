// app/membresias/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMembresias } from '../../lib/api';
import { useCliente } from '../../context/ClienteContext';
import MembresiaCard from '../../components/MembresiaCard';
import Header from "@/components/Header";

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
      <>
        <Header />

        <main className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-1">Membresías Disponibles</h1>
          <div className="text-gray-500 text-sm mb-6">
            Selecciona la membresía que mejor se adapte a tus necesidades
          </div>
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
        </>
  );
}
