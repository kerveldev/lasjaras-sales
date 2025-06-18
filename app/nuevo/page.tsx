// app/nuevo/page.tsx
import ClienteForm from '../../components/ClienteForm';

export default function AltaClientePage() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Alta de Cliente</h1>
      <ClienteForm />
    </main>
  );
}
