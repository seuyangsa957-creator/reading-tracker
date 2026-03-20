'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Reading } from '@/lib/supabase'
import { Suspense } from 'react'

function NewNoteForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [content, setContent] = useState('')
  const [readingId, setReadingId] = useState(params.get('reading_id') || '')
  const [readings, setReadings] = useState<Reading[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/readings').then(r => r.json()).then(setReadings)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload: Record<string, string> = { content }
    if (readingId) payload.reading_id = readingId

    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const { error } = await res.json()
      setError(error)
      setSaving(false)
      return
    }

    router.push('/notes')
  }

  const prefilledTitle = params.get('reading_title')

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Add note</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Link to a reading (optional)
          </label>
          <select
            value={readingId}
            onChange={e => setReadingId(e.target.value)}
            className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400 bg-white"
          >
            <option value="">— none —</option>
            {readings.map(r => (
              <option key={r.id} value={r.id}>
                {r.title}{r.author ? ` · ${r.author}` : ''}
              </option>
            ))}
          </select>
          {prefilledTitle && !readingId && (
            <p className="text-xs text-stone-400 mt-1">Pre-linking to: {prefilledTitle}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Note *</label>
          <textarea
            required
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={10}
            placeholder="Write your thoughts, takeaways, or observations…"
            className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400 resize-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-stone-800 text-white px-5 py-2 rounded-lg text-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-stone-500 px-5 py-2 rounded-lg text-sm hover:text-stone-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default function NewNotePage() {
  return (
    <Suspense>
      <NewNoteForm />
    </Suspense>
  )
}
