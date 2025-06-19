'use client';
import Image from 'next/image';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Logo from  '@/public/Isotipo.png';
export default function Header() {
    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-40">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-20">
                {/* Logo y título */}
                <div className="flex items-center gap-4">
                    {/* Logo (reemplaza el src con el tuyo o usa SVG directo) */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[#bb8856] bg-white">
                        {/* Puedes poner aquí tu SVG, emoji o img */}
                        <span className="text-2xl">
                         <Image
                             src={Logo}
                             alt="Foto"
                             width={112}   // igual a w-28
                             height={112}  // igual a h-28
                             className="w-full h-full object-cover rounded-xl"
                         />
                        </span>
                    </div>
                    <span className="font-semibold text-lg md:text-xl text-gray-700">
            Alta de Cliente
          </span>
                </div>
                {/* Menú y acciones */}
                <div className="hidden md:flex items-center gap-2">
                    <a href="/membresias" className="px-4 py-2 text-gray-800 font-medium hover:text-[#bb8856] transition">Membresías</a>
                    <a href="/pago" className="px-4 py-2 text-gray-800 font-medium hover:text-[#bb8856] transition">Pagos</a>
                    <a href="#" className="px-4 py-2 text-gray-800 font-medium hover:text-[#bb8856] transition">Clientes</a>
                    <button
                        className="ml-6 px-5 py-2 rounded-md text-white bg-[#bb8856] hover:bg-[#a77449] transition font-medium shadow"
                        onClick={() => window.location.href = '/nuevo'}
                    >
                        Nuevo Cliente
                    </button>
                </div>
                {/* Menú hamburguesa solo en móvil */}
                <button className="md:hidden flex items-center justify-center w-10 h-10">
                    <Bars3Icon className="w-7 h-7 text-gray-700" />
                </button>
            </nav>
        </header>
    );
}
