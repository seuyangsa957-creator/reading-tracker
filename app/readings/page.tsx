'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Reading } from '@/lib/supabase'

export default function ReadingsPage() {
  const [readings, setReadings] = useState<Reading[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const delay = setTimeout(() => fetchReadings(), search ? 300 : 0)
    return () => clearTimeout(delay)
  }, [search])

  async function fetchReadings() {
    setLoading(true)
    const res = await fetch(`/api/readings?search=${encodeURIComponent(search)}`)
    const data = await res.json()
    setReadings(data)
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Readings</h1>
        <Link
          href="/readings/new"
          className="text-sm bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
        >
          + Add reading
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by title, author, publisher…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border border-stone-200 rounded-lg text-sm bg-white focus:outline-none focus:border-stone-400"
      />

      {loading ? (
        <p className="text-stone-400 text-sm">Loading…</p>
      ) : readings.length === 0 ? (
        <p className="text-stone-400 text-sm">No readings yet. Add your first one.</p>
      ) : (
        <ul className="space-y-3">
          {readings.map(r => (
            <li key={r.id} className="bg-white border border-stone-200 rounded-xl p-4">
              <div className="font-medium text-stone-800">
                {r.link ? (
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {r.title}
                  </a>
                ) : r.title}
              </div>
              <div className="text-sm text-stone-500 mt-1 space-x-2">
                {r.author && <span>{r.author}</span>}
                {r.publisher && <span>· {r.publisher}</span>}
                {r.published_date && <span>· {r.published_date}</span>}
              </div>
              <div className="mt-3">
                <Link
                  href={`/notes/new?reading_id=${r.id}&reading_title=${encodeURIComponent(r.title)}`}
                  className="text-xs text-stone-400 hover:text-stone-700 transition-colors"
                >
                  + Add note
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
