'use client'

import { Note } from '@/lib/supabase'

export default function ExportButton({ notes }: { notes: Note[] }) {
  async function exportPDF() {
    const { default: jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    let y = 20

    doc.setFontSize(18)
    doc.text('My Notes', 20, y)
    y += 10

    notes.forEach((note, i) => {
      if (y > 270) { doc.addPage(); y = 20 }

      doc.setFontSize(10)
      doc.setTextColor(120)
      const date = new Date(note.created_at).toLocaleDateString()
      const source = note.reading ? ` · ${note.reading.title}` : ''
      doc.text(`${date}${source}`, 20, y)
      y += 6

      doc.setFontSize(12)
      doc.setTextColor(30)
      const lines = doc.splitTextToSize(note.content, 170)
      lines.forEach((line: string) => {
        if (y > 270) { doc.addPage(); y = 20 }
        doc.text(line, 20, y)
        y += 6
      })

      if (i < notes.length - 1) {
        doc.setDrawColor(200)
        doc.line(20, y + 2, 190, y + 2)
        y += 8
      }
    })

    doc.save('notes.pdf')
  }

  return (
    <button
      onClick={exportPDF}
      className="text-sm border border-stone-300 text-stone-600 px-4 py-2 rounded-lg hover:bg-stone-100 transition-colors"
    >
      Export PDF
    </button>
  )
}
