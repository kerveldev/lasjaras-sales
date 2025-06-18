// context/ClienteContext.tsx
'use client';
import { createContext, useContext, useState } from 'react';

interface Cliente {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: {
    calle: string;
    numero: string;
    ciudad: string;
    estado: string;
    pais: string;
    cp: string;
  };
  foto?: string;
  [key: string]: any;
}

const ClienteContext = createContext<{
  cliente: Cliente | null;
  setCliente: (data: Cliente) => void;
}>({
  cliente: null,
  setCliente: () => {},
});

export const useCliente = () => useContext(ClienteContext);

export const ClienteProvider = ({ children }: { children: React.ReactNode }) => {
  const [cliente, setCliente] = useState<Cliente | null>(null);

  return (
    <ClienteContext.Provider value={{ cliente, setCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};
