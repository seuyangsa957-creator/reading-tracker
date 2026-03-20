'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewReadingPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    author: '',
    publisher: '',
    link: '',
    published_date: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload: Record<string, string> = { title: form.title }
    if (form.author) payload.author = form.author
    if (form.publisher) payload.publisher = form.publisher
    if (form.link) payload.link = form.link
    if (form.published_date) payload.published_date = form.published_date

    const res = await fetch('/api/readings', {
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

    router.push('/readings')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Add reading</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Title *</label>
          <input
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Author</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Publisher</label>
          <input
            name="publisher"
            value={form.publisher}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Link</label>
          <input
            name="link"
            type="url"
            value={form.link}
            onChange={handleChange}
            placeholder="https://…"
            className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Published date</label>
          <input
            name="published_date"
            type="date"
            value={form.published_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400"
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
