'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCliente } from '../../context/ClienteContext';
import { CheckCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import Header from "@/components/Header";
import Image from "next/image";

export default function ExitoPage() {
    const router = useRouter();
    const { cliente } = useCliente();
    const [membresia, setMembresia] = useState<any>(null);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const downloadLinkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const storedMembresia = localStorage.getItem('membresiaSeleccionada');
        if (!storedMembresia) {
            router.push('/membresias');
        } else {
            setMembresia(JSON.parse(storedMembresia));
        }

        const qr = localStorage.getItem('qr_code');
        setQrCode(qr);
    }, [router]);

    const handleDescargarQR = () => {
        if (qrCode && downloadLinkRef.current) {
            downloadLinkRef.current.download = `qr_membresia_${cliente?.id || 'cliente'}.png`;
            downloadLinkRef.current.click();
        }
    };

    return (
        <>
            <Header />
            <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f5e6da] via-[#fff9f3] to-[#f8f6f3] py-10 px-2">
                <div className="
                    w-full max-w-lg rounded-3xl shadow-2xl
                    border border-[#dfc7ad] bg-white/90
                    p-0 sm:p-0 relative overflow-hidden
                    flex flex-col items-center
                ">
                    {/* ICONO ÉXITO */}
                    <div className="w-full flex flex-col items-center pt-12 pb-4 bg-gradient-to-r from-[#fff3e0] to-[#fbeee0]">
                        <CheckCircleIcon className="w-24 h-24 text-green-500 drop-shadow-lg" />
                        <h1 className="text-4xl font-extrabold text-[#2d2d2d] mt-3">¡Registro exitoso!</h1>
                        <div className="text-[#73563e] mb-2 text-lg font-medium">Tu membresía ha sido registrada correctamente</div>
                    </div>

                    {/* CARD DE DATOS */}
                    <div className="w-full px-8 pt-8 pb-3 flex flex-col items-center">
                        <div className="w-full max-w-md space-y-4 text-[#32261a] text-base mb-3">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#bb8856]">Cliente:</span>
                                <span className="ml-2">{cliente?.name} {cliente?.lastname}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#bb8856]">Membresía:</span>
                                <span className="ml-2">{membresia?.nombre}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#bb8856]">Duración:</span>
                                <span className="ml-2">{membresia?.duracion} mes(es)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#bb8856]">Total:</span>
                                <span className="ml-2">{Number(membresia?.precio).toLocaleString('es-MX', {
                                    style: 'currency',
                                    currency: 'MXN'
                                })}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#bb8856]">Estatus:</span>
                                <span className="ml-2 text-green-600 font-semibold">
                                    Pendiente de pago en taquilla
                                </span>
                            </div>
                        </div>
                        {/* QR */}
                        {qrCode &&
                            <div className="flex flex-col items-center py-4 w-full">
                                <div className="bg-white rounded-2xl border-2 border-[#e9d1b3] shadow-lg p-3 flex flex-col items-center">
                                    <Image
                                        src={qrCode}
                                        alt="Código QR"
                                        className="w-44 h-44 sm:w-52 sm:h-52 object-contain"
                                        width={208}
                                        height={208}
                                        priority
                                    />
                                    <button
                                        onClick={handleDescargarQR}
                                        className="mt-4 flex items-center gap-2 px-6 py-2 rounded-lg bg-[#bb8856] hover:bg-[#9A6D42] text-white font-semibold shadow transition"
                                    >
                                        <ArrowDownTrayIcon className="w-5 h-5" />
                                        Descargar QR
                                    </button>
                                    <a
                                        ref={downloadLinkRef}
                                        href={qrCode}
                                        style={{ display: 'none' }}
                                    >
                                        Descargar QR
                                    </a>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="w-full border-t border-[#f5e7c9] px-8 py-6 bg-[#f7f3ef] flex flex-col sm:flex-row items-center justify-between gap-3">

                    </div>
                </div>
            </main>
        </>
    );
}
