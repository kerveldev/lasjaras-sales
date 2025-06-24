// lib/api.ts
export async function postCliente(form: any, foto: File | null) {
  const formData = new FormData();

  // Campos principales
  formData.append('nombre', form.nombre);
  formData.append('apellido', form.apellido);
  formData.append('nacimiento', form.nacimiento);
  formData.append('correo', form.correo);
  formData.append('telefono', form.telefono);

  // Dirección
  formData.append('calle', form.direccion.calle);
  formData.append('numero', form.direccion.numero);
  formData.append('ciudad', form.direccion.ciudad);
  formData.append('estado', form.direccion.estado);
  formData.append('pais', form.direccion.pais);
  formData.append('cp', form.direccion.cp);

  // Foto (solo si hay)
  if (foto) {
    formData.append('foto', foto); // El campo debe llamarse igual en el backend
  }

  const res = await fetch('https://lasjaras-api.kerveldev.com/api/clientes', {
    method: 'POST',
    body: formData, // NO PONGAS HEADERS, fetch lo hace por ti con FormData
  });

  if (!res.ok) throw new Error('Error al registrar cliente');
  return res.json();
}

export async function getMembresias() {
  const res = await fetch('https://lasjaras-api.kerveldev.com/api/membresias');
  if (!res.ok) throw new Error('Error al obtener membresías');
  return res.json();
}
