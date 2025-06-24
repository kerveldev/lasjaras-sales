"use client";

import { useCliente } from "@/context/ClienteContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Header from "@/components/Header";
import toast from "react-hot-toast";
import { postSuscripcion } from "@/lib/api";

const METODOS = [
  {
    key: "openpay",
    label: "Openpay",
    desc: "Paga con tarjeta de crédito o débito a través de Openpay de forma segura.",
    icons: ["/visa.png", "/mastercard.png", "/amex.png"],
    btn: "Pagar con Openpay",
  },
  {
    key: "mercado",
    label: "Mercado Pago",
    desc: "Paga con tu cuenta de Mercado Pago o genera un código para pagar en tiendas físicas.",
    icons: ["/mercadopago.png", "/oxxo.png", "/transferencia.png", "/tarjetas.png"],
    btn: "Pagar con Mercado Pago",
  },
  {
    key: "efectivo",
    label: "Efectivo",
    desc: "Paga en efectivo directamente en nuestras instalaciones.",
    icons: [],
    btn: "Generar recibo para pago en efectivo",
  },
];

export default function PagoPage() {
  const { cliente } = useCliente();
  const router = useRouter();
  const [membresia, setMembresia] = useState<any>(null);
  const [metodo, setMetodo] = useState("openpay");

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

  // Refactor: función auxiliar para registrar la suscripción
  async function saveSuscripcion(clienteId: string | number, membresiaId: string | number) {
    try {
      const response = await postSuscripcion(clienteId, membresiaId);
      return response;
    } catch (error) {
      console.error("Error al guardar la suscripción:", error);
      throw error;
    }
  }

  // Aquí pones tu lógica real según el método elegido
  const handlePagar = async () => {
    if (!cliente || !membresia) return;

    if (metodo === "efectivo") {
      try {
        const result = await saveSuscripcion(cliente.id, membresia.id);
        toast.success("Suscripción registrada correctamente");
        router.push("/exito");
        console.log("Resultado de suscripción:", result);
      } catch (err: any) {
        toast.error("Error al registrar suscripción: " + (err?.message ?? err));
      }
      return;
    }

    // Lógica para Openpay/MercadoPago (simulada)
    toast.success(
        `Simulando pago con ${metodo === "openpay" ? "Openpay" : "Mercado Pago"}...`
    );
    // Si quieres que después de simular redirija:
    // router.push("/exito");
  };

  return (
      <>
        <Header />
        <main className="max-w-5xl mx-auto py-8 px-2 md:px-0">
          <h1 className="text-2xl font-bold mb-2">Opciones de Pago</h1>
          <p className="text-gray-500 mb-6">
            Selecciona el método de pago para completar tu membresía
          </p>
          {/* Resumen de compra */}
          {cliente && membresia ? (
              <>
                <div className="bg-white border rounded-xl shadow-sm p-5 mb-8 relative">
              <span
                  className="absolute top-4 right-4 text-[#bb8856] font-medium cursor-pointer text-sm underline"
                  onClick={() => router.push("/membresias")}
              >
                Cambiar
              </span>
                  <h1 className="text-2xl font-bold mb-2">Resumen de Compra</h1>
                  <div className="border-b mb-2 pb-2 text-sm grid grid-cols-2 gap-2">
                    <span className="text-gray-600">Membresía</span>
                    <span className="font-semibold">{membresia.nombre}</span>
                    <span className="text-gray-600">Duración</span>
                    <span>{membresia.duracion} mese(s)</span>
                    <span className="text-gray-600">Cliente</span>
                    <span>
                  {cliente.name} {cliente.lastname} ({cliente.email})
                </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-semibold">Total a pagar</span>
                    <span className="text-[#bb8856] text-xl font-bold">{total}</span>
                  </div>
                </div>

                {/* Métodos de pago */}
                <div className="mb-8 space-y-5">
                  <div className="text-lg font-semibold mb-1">
                    Selecciona un método de pago
                  </div>
                  {METODOS.map((m) => (
                      <label
                          key={m.key}
                          className={`
                    flex flex-col border-2 rounded-xl p-4 cursor-pointer bg-white
                    transition shadow-sm
                    ${metodo === m.key ? "border-[#bb8856] shadow-md" : "border-gray-200"}
                  `}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <input
                              type="radio"
                              name="metodo"
                              value={m.key}
                              checked={metodo === m.key}
                              onChange={() => setMetodo(m.key)}
                              className="accent-[#bb8856] w-4 h-4"
                          />
                          <span className="text-base font-semibold">{m.label}</span>
                        </div>
                        <span className="text-gray-600 text-sm mb-2">{m.desc}</span>
                        {/* Iconos de método */}
                        {m.icons.length > 0 && (
                            <div className="flex gap-3 items-center mb-3">
                              {m.icons.map((icon, i) => (
                                  <Image
                                      src={icon}
                                      key={i}
                                      alt=""
                                      className="w-10 h-7"
                                      width={200}
                                      height={200}
                                  />
                              ))}
                            </div>
                        )}
                        <button
                            className="
                      mt-2 w-full h-12 rounded-[15px] bg-[#bb8856] hover:bg-[#9A6D42]
                      text-white font-semibold text-lg transition
                    "
                            type="button"
                            onClick={handlePagar}
                            disabled={metodo !== m.key}
                        >
                          {m.btn}
                        </button>
                      </label>
                  ))}
                </div>
                {/* Botones abajo */}
                <div className="flex justify-between items-center gap-4 mb-6">
                  <button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#bb8856] border border-[#bb8856] bg-white font-semibold hover:bg-[#f7ede0] transition"
                      onClick={() => router.back()}
                      type="button"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Regresar
                  </button>
                  <button
                      className="px-8 py-2 rounded-lg text-white font-semibold bg-[#bb8856] hover:bg-[#9A6D42] transition"
                      onClick={handlePagar}
                      type="button"
                  >
                    Continuar
                  </button>
                </div>
                {/* Info de seguridad */}
                <div className="bg-orange-50 border-l-4 border-orange-400 flex items-center gap-2 px-4 py-3 rounded text-orange-700 text-sm">
                  <ExclamationCircleIcon className="w-6 h-6 mr-1" />
                  Todos los pagos son procesados de forma segura. Tus datos están protegidos con encriptación de nivel bancario.
                </div>
              </>
          ) : (
              <p className="text-center text-gray-500">Cargando resumen...</p>
          )}
        </main>
      </>
  );
}
