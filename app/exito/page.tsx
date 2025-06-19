'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCliente } from '../../context/ClienteContext';
import { CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import Header from "@/components/Header";

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
        <>
            <Header/>
            <main className="max-w-lg mx-auto px-4 py-10 flex flex-col items-center">
                {/* Ícono grande de éxito */}
                <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4 drop-shadow-lg" />
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">¡Registro Exitoso!</h1>
                <div className="text-gray-500 mb-6 text-lg">Tu membresía ha sido registrada correctamente.</div>

                <div className="bg-white shadow-lg border-2 border-[#bb8856] p-7 rounded-2xl w-full max-w-md mb-8">
                    <div className="space-y-2 text-gray-800">
                        <p>
                            <span className="font-semibold text-[#bb8856]">Cliente:</span>{' '}
                            {cliente?.name} {cliente?.lastname}
                        </p>
                        <p>
                            <span className="font-semibold text-[#bb8856]">Membresía:</span>{' '}
                            {membresia?.nombre}
                        </p>
                        <p>
                            <span className="font-semibold text-[#bb8856]">Duración:</span>{' '}
                            {membresia?.duracion} mes(es)
                        </p>
                        <p>
                            <span className="font-semibold text-[#bb8856]">Total:</span>{' '}
                            {Number(membresia?.precio).toLocaleString('es-MX', {
                                style: 'currency',
                                currency: 'MXN'
                            })}
                        </p>
                        <p>
                            <span className="font-semibold text-[#bb8856]">Estatus:</span>{' '}
                            <span className="text-green-600 font-semibold">Pendiente de pago en taquilla</span>
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleRegresar}
                    className="
          flex items-center gap-2 px-8 py-3 rounded-[15px]
          bg-[#bb8856] hover:bg-[#9A6D42]
          text-white font-semibold text-lg shadow transition
        "
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Registrar otro cliente
                </button>
            </main>
        </>
    );
}
