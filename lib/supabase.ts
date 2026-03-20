import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Reading = {
  id: string
  title: string
  author: string | null
  publisher: string | null
  link: string | null
  published_date: string | null
  created_at: string
}

export type Note = {
  id: string
  content: string
  reading_id: string | null
  created_at: string
  reading?: Reading
}
