import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reading & Notes',
  description: 'Track what you read and write what you think',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geist.className} bg-stone-50 text-stone-800 min-h-full`}>
        <nav className="border-b border-stone-200 bg-white">
          <div className="max-w-2xl mx-auto px-4 py-3 flex gap-6 text-sm">
            <Link href="/" className="font-medium text-stone-800">Reading & Notes</Link>
            <Link href="/readings" className="text-stone-500 hover:text-stone-800 transition-colors">Readings</Link>
            <Link href="/notes" className="text-stone-500 hover:text-stone-800 transition-colors">Notes</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
