'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCliente } from '../context/ClienteContext';
import { postCliente } from '../lib/api';

export default function ClienteForm() {
  const router = useRouter();
  const { setCliente } = useCliente();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: {
      calle: '',
      numero: '',
      ciudad: '',
      estado: '',
      pais: 'México',
      cp: '',
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: any = {};

    if (!formData.nombre) newErrors.nombre = 'Requerido';
    if (!formData.apellido) newErrors.apellido = 'Requerido';
    if (!formData.correo || !/\S+@\S+\.\S+/.test(formData.correo)) newErrors.correo = 'Correo inválido';
    if (!formData.telefono || formData.telefono.length < 10) newErrors.telefono = 'Teléfono inválido';
    const dir = formData.direccion;
    if (!dir.calle) newErrors.calle = 'Requerido';
    if (!dir.numero) newErrors.numero = 'Requerido';
    if (!dir.ciudad) newErrors.ciudad = 'Requerido';
    if (!dir.estado) newErrors.estado = 'Requerido';
    if (!dir.cp) newErrors.cp = 'Requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name in formData.direccion) {
      setFormData(prev => ({
        ...prev,
        direccion: { ...prev.direccion, [name]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const cliente = await postCliente(formData);
      setCliente(cliente);
      router.push('/membresias');
    } catch (err) {
      console.error('Error:', err);
      alert('Ocurrió un error al registrar al cliente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block">Nombre*</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="input"
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
        </div>
        <div>
          <label className="block">Apellido*</label>
          <input
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="input"
          />
          {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido}</p>}
        </div>
        <div>
          <label className="block">Correo Electrónico*</label>
          <input
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            type="email"
            className="input"
          />
          {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
        </div>
        <div>
          <label className="block">Teléfono*</label>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="input"
          />
          {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Dirección</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Calle*</label>
            <input name="calle" value={formData.direccion.calle} onChange={handleChange} className="input" />
            {errors.calle && <p className="text-red-500 text-sm">{errors.calle}</p>}
          </div>
          <div>
            <label>Número*</label>
            <input name="numero" value={formData.direccion.numero} onChange={handleChange} className="input" />
            {errors.numero && <p className="text-red-500 text-sm">{errors.numero}</p>}
          </div>
          <div>
            <label>Ciudad*</label>
            <input name="ciudad" value={formData.direccion.ciudad} onChange={handleChange} className="input" />
            {errors.ciudad && <p className="text-red-500 text-sm">{errors.ciudad}</p>}
          </div>
          <div>
            <label>Estado*</label>
            <input name="estado" value={formData.direccion.estado} onChange={handleChange} className="input" />
            {errors.estado && <p className="text-red-500 text-sm">{errors.estado}</p>}
          </div>
          <div>
            <label>Código Postal*</label>
            <input name="cp" value={formData.direccion.cp} onChange={handleChange} className="input" />
            {errors.cp && <p className="text-red-500 text-sm">{errors.cp}</p>}
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded"
        >
          {loading ? 'Guardando...' : 'Guardar Cliente'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="border px-6 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
