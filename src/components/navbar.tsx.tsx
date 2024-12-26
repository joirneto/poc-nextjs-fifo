import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'


export default function Navbar() {
  return (
    <nav className="bg-background shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold">PONTOSPRAVOCÊ</Link>
            <Link href="/" className="text-sm">Home</Link>
            <Link href="/about" className="text-sm">Sobre</Link>
            <Link href="/loyalty-programs" className="text-sm">Programas de Pontos</Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

