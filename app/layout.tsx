import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import NavBar from './components/NavBar'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reading & Notes',
  description: 'Track what you read and write what you think',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geist.className} bg-stone-50 text-stone-800 min-h-full`}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
