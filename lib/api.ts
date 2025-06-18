// lib/api.ts
export async function postCliente(data: any) {
  const res = await fetch('https://lasjaras-api.kerveldev.com/api/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Error al registrar cliente');
  return res.json();
}

export async function getMembresias() {
  const res = await fetch('https://lasjaras-api.kerveldev.com/api/membresias');
  if (!res.ok) throw new Error('Error al obtener membresías');
  return res.json();
}
