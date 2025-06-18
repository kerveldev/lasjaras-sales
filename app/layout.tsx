// app/layout.tsx
import './globals.css'
import { ClienteProvider } from '../context/ClienteContext'

export const metadata = {
  title: 'Las Jaras - Ventas',
  description: 'Registro de clientes y membresías',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ClienteProvider>{children}</ClienteProvider>
      </body>
    </html>
  )
}
