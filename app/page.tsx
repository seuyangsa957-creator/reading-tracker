import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold text-stone-800 mb-2">Reading & Notes</h1>
        <p className="text-stone-500 mb-10">Track what you read. Write what you think.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-10">
          <Link
            href="/readings"
            className="block p-6 bg-white rounded-xl border border-stone-200 hover:border-stone-400 transition-colors"
          >
            <div className="text-lg font-medium text-stone-800 mb-1">Readings</div>
            <div className="text-sm text-stone-500">Books, articles, news — everything you read</div>
          </Link>

          <Link
            href="/notes"
            className="block p-6 bg-white rounded-xl border border-stone-200 hover:border-stone-400 transition-colors"
          >
            <div className="text-lg font-medium text-stone-800 mb-1">Notes</div>
            <div className="text-sm text-stone-500">Thoughts, takeaways, and free-form writing</div>
          </Link>
        </div>

        <div className="border-t border-stone-200 pt-8">
          <p className="text-sm text-stone-500 mb-3">Backup your data</p>
          <a
            href="/api/export"
            download
            className="inline-block text-sm border border-stone-300 text-stone-600 px-4 py-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            Export to Markdown (.md)
          </a>
          <p className="text-xs text-stone-400 mt-2">
            Downloads all your readings and notes as a Markdown file you can save to iCloud or Obsidian.
          </p>
        </div>
      </div>
    </main>
  )
}
