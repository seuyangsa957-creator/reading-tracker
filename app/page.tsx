import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-semibold text-stone-800 mb-2">Reading & Notes</h1>
        <p className="text-stone-500 mb-10">Track what you read. Write what you think.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      </div>
    </main>
  )
}
