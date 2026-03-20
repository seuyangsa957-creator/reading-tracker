import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search') || ''

  let query = supabase
    .from('readings')
    .select('*')
    .order('created_at', { ascending: false })

  if (search) {
    query = query.or(
      `title.ilike.%${search}%,author.ilike.%${search}%,publisher.ilike.%${search}%`
    )
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { data, error } = await supabase.from('readings').insert([body]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
