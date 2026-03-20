'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function NavBar() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="border-b border-stone-200 bg-white">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex gap-6 text-sm">
          <Link href="/" className="font-medium text-stone-800">Reading & Notes</Link>
          <Link href="/readings" className="text-stone-500 hover:text-stone-800 transition-colors">Readings</Link>
          <Link href="/notes" className="text-stone-500 hover:text-stone-800 transition-colors">Notes</Link>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-stone-400 hover:text-stone-700 transition-colors"
        >
          Sign out
        </button>
      </div>
    </nav>
  )
}
