import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search') || ''

  let query = supabase
    .from('notes')
    .select('*, reading:readings(id, title, author)')
    .order('created_at', { ascending: false })

  if (search) {
    query = query.ilike('content', `%${search}%`)
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { data, error } = await supabase
    .from('notes')
    .insert([body])
    .select('*, reading:readings(id, title, author)')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
