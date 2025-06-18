'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCliente } from '../context/ClienteContext'; // ← Importa tu contexto
import { postCliente } from '../lib/api'; // ← Importa tu función para guardar en backend
import { UserIcon, EnvelopeIcon, PhoneIcon, PhotoIcon } from '@heroicons/react/24/outline';

const ESTADOS_MEXICO = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
  'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero',
  'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
  'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas',
  'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas',
];

export default function ClienteForm() {
  const router = useRouter();
  const { setCliente } = useCliente();

  const [form, setForm] = useState({
    nombre: '', apellido: '', nacimiento: '', correo: '', telefono: '',
    direccion: { calle: '', numero: '', ciudad: '', estado: '', pais: 'México', cp: '' },
  });
  const [foto, setFoto] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name in form.direccion) {
      setForm(f => ({ ...f, direccion: { ...f.direccion, [name]: value } }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const validate = () => {
    const err: any = {};
    if (!form.nombre) err.nombre = 'Requerido';
    if (!form.apellido) err.apellido = 'Requerido';
    if (!form.nacimiento) err.nacimiento = 'Requerido';
    if (!form.correo || !/\S+@\S+\.\S+/.test(form.correo)) err.correo = 'Correo inválido';
    if (!form.telefono || form.telefono.length < 10) err.telefono = 'Teléfono inválido';
    const dir = form.direccion;
    if (!dir.calle) err.calle = 'Requerido';
    if (!dir.numero) err.numero = 'Requerido';
    if (!dir.ciudad) err.ciudad = 'Requerido';
    if (!dir.estado) err.estado = 'Requerido';
    if (!dir.pais) err.pais = 'Requerido';
    if (!dir.cp) err.cp = 'Requerido';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      // Prepara data para enviar (puedes enviar foto si lo implementas en tu backend)
      const cliente = await postCliente(form); // ← AQUÍ guardas en backend
      setCliente(cliente); // ← Guarda en contexto global
      router.push('/membresias');
    } catch (err) {
      console.error('Error:', err);
      alert('Ocurrió un error al registrar al cliente.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <form
          onSubmit={handleSubmit}
          className="
        w-full
        bg-white
        rounded-2xl
        p-4
        md:p-8
        shadow-lg
        shadow-gray-500
        mx-auto
        max-w-[98vw]
        md:max-w-6xl
        lg:max-w-8xl
        my-6
      "
      >
        <h1 className="text-2xl font-bold mb-1">Alta de Cliente</h1>
        <div className="text-gray-500 text-sm mb-6">
          Ingresa los datos del nuevo cliente para registrarlo en el sistema
        </div>
        {/* Foto y datos */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start w-full">
          {/* Foto */}
          <div className="flex flex-col items-center w-full md:w-1/4 mb-2 md:mb-0">
            <div className="w-28 h-28 rounded-xl border-2 border-dashed flex items-center justify-center bg-gray-50 mb-2 relative">
              {foto ? (
                  <img src={URL.createObjectURL(foto)} alt="Foto" className="w-full h-full object-cover rounded-xl" />
              ) : (
                  <UserIcon className="w-14 h-14 text-gray-400" />
              )}
              <label className="absolute -bottom-2 -right-2 bg-brown-400 rounded-full p-1 cursor-pointer shadow-md">
                <PhotoIcon className="w-6 h-6 text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={handleFoto} />
              </label>
            </div>
            <span className="text-xs text-gray-500">Foto del cliente</span>
          </div>
          {/* Inputs básicos */}
          <div className="flex-1 grid grid-cols-1 gap-4 w-full">
            <div>
              <label className="font-semibold">Nombre*</label>
              <input
                  name="nombre" placeholder="Ingresa el nombre"
                  value={form.nombre} onChange={handleInput}
                  className={`input-form ${errors.nombre && 'border-red-400'}`}
              />
              {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
            </div>
            <div>
              <label className="font-semibold">Apellido*</label>
              <input
                  name="apellido" placeholder="Ingresa el apellido"
                  value={form.apellido} onChange={handleInput}
                  className={`input-form ${errors.apellido && 'border-red-400'}`}
              />
              {errors.apellido && <p className="text-xs text-red-500">{errors.apellido}</p>}
            </div>
            <div>
              <label className="font-semibold">Fecha de Nacimiento*</label>
              <input
                  name="nacimiento" type="date"
                  value={form.nacimiento} onChange={handleInput}
                  className={`input-form ${errors.nacimiento && 'border-red-400'}`}
              />
              {errors.nacimiento && <p className="text-xs text-red-500">{errors.nacimiento}</p>}
            </div>
          </div>
        </div>
        {/* Correo y Tel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="font-semibold">Correo Electrónico*</label>
            <div className="relative">
              <input
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={handleInput}
                  className={`input-form pl-12 ${errors.correo && 'border-red-400'}`}
              />
              <EnvelopeIcon className="left-4 top-1/2 -translate-y-1/2 w-5 h-5 absolute text-gray-400 pointer-events-none" />
            </div>
            {errors.correo && <p className="text-xs text-red-500">{errors.correo}</p>}
          </div>
          <div>
            <label className="font-semibold">Teléfono*</label>
            <div className="relative">
              <input
                  name="telefono"
                  value={form.telefono}
                  onChange={handleInput}
                  className={`input-form pl-12 ${errors.telefono && 'border-red-400'}`}
              />
              <PhoneIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.telefono && <p className="text-xs text-red-500">{errors.telefono}</p>}
          </div>
        </div>
        <hr className="my-7" />
        <h3 className="font-bold text-lg mb-3">Dirección</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Calle*</label>
            <input name="calle" placeholder="Nombre de la calle"
                   value={form.direccion.calle} onChange={handleInput}
                   className={`input-form ${errors.calle && 'border-red-400'}`} />
            {errors.calle && <p className="text-xs text-red-500">{errors.calle}</p>}
          </div>
          <div>
            <label>Número*</label>
            <input name="numero" placeholder="Número exterior e interior"
                   value={form.direccion.numero} onChange={handleInput}
                   className={`input-form ${errors.numero && 'border-red-400'}`} />
            {errors.numero && <p className="text-xs text-red-500">{errors.numero}</p>}
          </div>
          <div>
            <label>Ciudad*</label>
            <input name="ciudad" placeholder="Ciudad"
                   value={form.direccion.ciudad} onChange={handleInput}
                   className={`input-form ${errors.ciudad && 'border-red-400'}`} />
            {errors.ciudad && <p className="text-xs text-red-500">{errors.ciudad}</p>}
          </div>
          <div>
            <label>Estado*</label>
            <select
                name="estado"
                value={form.direccion.estado}
                onChange={handleInput}
                className={`input-form ${errors.estado && 'border-red-400'}`}
            >
              <option value="">Selecciona un estado</option>
              {ESTADOS_MEXICO.map(e => (
                  <option key={e} value={e}>{e}</option>
              ))}
            </select>
            {errors.estado && <p className="text-xs text-red-500">{errors.estado}</p>}
          </div>
          <div>
            <label>País*</label>
            <select
                name="pais"
                value={form.direccion.pais}
                onChange={handleInput}
                className={`input-form ${errors.pais && 'border-red-400'}`}
            >
              <option value="México">México</option>
              {/* Puedes agregar más países aquí */}
            </select>
          </div>
          <div>
            <label>Código Postal*</label>
            <input name="cp" placeholder="Código postal"
                   value={form.direccion.cp} onChange={handleInput}
                   className={`input-form ${errors.cp && 'border-red-400'}`} />
            {errors.cp && <p className="text-xs text-red-500">{errors.cp}</p>}
          </div>
        </div>
        {/* Botones */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 w-full">
          <button
              type="submit"
              disabled={loading}
              className="w-full h-20 rounded-[15px] bg-[#9A6D42] hover:bg-[#85582a] text-white text-2xl font-normal flex items-center justify-center transition-colors"
          >
            {loading ? 'Guardando...' : 'Guardar Cliente'}
          </button>
          <button
              type="button"
              className="w-full h-20 rounded-[15px] bg-gray-100 border border-gray-300 text-gray-700 text-xl font-normal flex items-center justify-center"
              onClick={() => router.push('/')}
          >
            Cancelar
          </button>
          <button
              type="button"
              className="w-full h-20 rounded-[15px] bg-[#9A6D42] hover:bg-[#85582a] text-white text-xl font-normal flex items-center justify-center"
              onClick={() => alert('Seleccionar membresía')}
          >
            Seleccionar Membresía
          </button>
          <button
              type="button"
              className="w-full h-20 rounded-[15px] bg-[#9A6D42] hover:bg-[#85582a] text-white text-xl font-normal flex items-center justify-center"
              onClick={() => alert('Opciones de pago')}
          >
            Opciones de Pago
          </button>
        </div>
      </form>
  );
}

// Puedes agregar esto en tu archivo global.css si lo necesitas:
export const inputFormClass = `
  input-form
  block w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 
  focus:outline-none focus:border-[#9A6D42] transition
  bg-white placeholder-gray-400
`;
