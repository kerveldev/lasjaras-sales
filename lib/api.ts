// lib/api.ts
export async function postCliente(form: any, foto: File | null) {
  try {
    console.log("foto file:", foto);
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

    // 👇 NO pongas headers aquí, fetch los gestiona con FormData
    const res = await fetch('https://lasjaras-api.kerveldev.com/api/clientes', {
      method: 'POST',
      body: formData,
      // credentials: 'include', // SOLO si usas cookies de sesión/autenticación
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error('Error al registrar cliente: ' + errorBody);
    }
    return await res.json();
  } catch (error) {
    console.log("Error en postCliente:", error);
    throw error; // Opcional, puedes manejarlo arriba o mostrar alerta al usuario
  }
}


export async function getMembresias() {
  const res = await fetch('https://lasjaras-api.kerveldev.com/api/membresias');
  if (!res.ok) throw new Error('Error al obtener membresías');
  return res.json();
}

// lib/api.ts

export async function postSuscripcion(client_id: string | number, membership_id: string | number) {
  try {
    const body = JSON.stringify({
      client_id,
      membership_id,
    });

    const res = await fetch('https://lasjaras-api.kerveldev.com/api/suscripciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error('Error al registrar suscripción: ' + errorBody);
    }
    return await res.json();
  } catch (error) {
    console.log("Error en postSuscripcion:", error);
    throw error;
  }
}
