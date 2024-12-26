import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Inter } from 'next/font/google'

import Navbar from '~/components/navbar.tsx'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pontos pra você',
  description: 'A modern web application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

