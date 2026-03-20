'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Note } from '@/lib/supabase'

const ExportButton = dynamic(() => import('./ExportButton'), { ssr: false })

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const delay = setTimeout(() => fetchNotes(), search ? 300 : 0)
    return () => clearTimeout(delay)
  }, [search])

  async function fetchNotes() {
    setLoading(true)
    const res = await fetch(`/api/notes?search=${encodeURIComponent(search)}`)
    const data = await res.json()
    setNotes(data)
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <div className="flex gap-2">
          <ExportButton notes={notes} />
          <Link
            href="/notes/new"
            className="text-sm bg-stone-800 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition-colors"
          >
            + Add note
          </Link>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search notes…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border border-stone-200 rounded-lg text-sm bg-white focus:outline-none focus:border-stone-400"
      />

      {loading ? (
        <p className="text-stone-400 text-sm">Loading…</p>
      ) : notes.length === 0 ? (
        <p className="text-stone-400 text-sm">No notes yet. Write your first one.</p>
      ) : (
        <ul className="space-y-3">
          {notes.map(note => (
            <li key={note.id} className="bg-white border border-stone-200 rounded-xl p-4">
              {note.reading && (
                <div className="text-xs text-stone-400 mb-2">
                  Re: {note.reading.title}
                  {note.reading.author && ` · ${note.reading.author}`}
                </div>
              )}
              <p className="text-stone-800 text-sm whitespace-pre-wrap">{note.content}</p>
              <div className="text-xs text-stone-400 mt-3">
                {new Date(note.created_at).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
