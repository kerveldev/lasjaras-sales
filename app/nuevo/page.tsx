// app/nuevo/page.tsx
import Header from '../../components/Header';     // ← Importa el Header
import ClienteForm from '../../components/ClienteForm';

export default function AltaClientePage() {
    return (
        <>
            <Header />

            <main className="max-w-7xl mx-auto py-8 px-4">

                <ClienteForm />
            </main>
        </>
    );
}
