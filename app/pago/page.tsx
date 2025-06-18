"use client";

import { useCliente } from "../../context/ClienteContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PagoPage() {
  const { cliente } = useCliente();
  const router = useRouter();
  const [membresia, setMembresia] = useState<any>(null);

  useEffect(() => {
    if (!cliente) {
      router.push("/nuevo");
      return;
    }

    const stored = localStorage.getItem("membresiaSeleccionada");
    if (!stored) {
      router.push("/membresias");
      return;
    }

    setMembresia(JSON.parse(stored));
  }, [cliente, router]);

  const total = membresia?.precio?.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  const handlePagoEfectivo = async () => {
    if (!cliente || !membresia) return;

    try {
      const res = await fetch(
        "https://lasjaras-api.kerveldev.com/api/suscripciones",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: cliente.id,
            membership_id: membresia.id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error en suscripción");

      alert("Recibo generado correctamente. Status: pendiente");
      // Redirigir a recibo o dashboard si quieres
      router.push('/exito');
    } catch (error: any) {
      console.error("Error al generar suscripción:", error);
      alert("Error al generar el recibo");
    }
  };

  const handlePago = (tipo: string) => {
    alert(`Simulando pago con ${tipo}...`);
    // Aquí llamarías a un endpoint tipo /api/pagar con datos de cliente + membresía
    // y después rediriges a un resumen o dashboard.
  };

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Opciones de Pago</h1>

      {cliente && membresia ? (
        <>
          <div className="bg-gray-100 p-4 rounded mb-6">
            <h2 className="font-semibold mb-2">Resumen de Compra</h2>
            <p>
              <strong>Membresía:</strong> {membresia.nombre}
            </p>
            <p>
              <strong>Duración:</strong> {membresia.duracion} mes(es)
            </p>
            <p>
              <strong>Cliente:</strong> {cliente.nombre} {cliente.apellido}
            </p>
            <p className="text-xl mt-2 font-bold text-amber-700">
              Total: {total}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handlePagoEfectivo()}
              className="bg-gray-800 hover:bg-gray-900 text-white w-full py-3 rounded"
            >
              Generar recibo para pago en efectivo 💵
            </button>
            <button
              onClick={() => handlePago("Openpay")}
              className="bg-amber-600 hover:bg-amber-700 text-white w-full py-3 rounded"
            >
              Pagar con Openpay 💳
            </button>
            <button
              onClick={() => handlePago("Mercado Pago")}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded"
            >
              Pagar con Mercado Pago 🧾
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Cargando resumen...</p>
      )}
    </main>
  );
}
