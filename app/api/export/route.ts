import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [{ data: readings }, { data: notes }] = await Promise.all([
    supabase.from('readings').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
    supabase.from('notes').select('*, reading:readings(id, title, author)').eq('user_id', user.id).order('created_at', { ascending: false }),
  ])

  const lines: string[] = []

  lines.push('# Reading & Notes Export')
  lines.push(`Exported: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`)
  lines.push('')

  lines.push('---')
  lines.push('')
  lines.push('## Readings')
  lines.push('')

  if (readings && readings.length > 0) {
    for (const r of readings) {
      lines.push(`### ${r.title}`)
      if (r.author) lines.push(`**Author:** ${r.author}`)
      if (r.publisher) lines.push(`**Publisher:** ${r.publisher}`)
      if (r.published_date) lines.push(`**Published:** ${r.published_date}`)
      if (r.link) lines.push(`**Link:** ${r.link}`)
      lines.push(`**Added:** ${new Date(r.created_at).toLocaleDateString()}`)
      lines.push('')
    }
  } else {
    lines.push('No readings yet.')
    lines.push('')
  }

  lines.push('---')
  lines.push('')
  lines.push('## Notes')
  lines.push('')

  if (notes && notes.length > 0) {
    for (const n of notes) {
      if (n.reading) {
        lines.push(`### Note on: ${n.reading.title}`)
      } else {
        lines.push('### Note')
      }
      lines.push(`*${new Date(n.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}*`)
      lines.push('')
      lines.push(n.content)
      lines.push('')
    }
  } else {
    lines.push('No notes yet.')
    lines.push('')
  }

  const markdown = lines.join('\n')
  const date = new Date().toISOString().split('T')[0]

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown',
      'Content-Disposition': `attachment; filename="reading-notes-${date}.md"`,
    },
  })
}
