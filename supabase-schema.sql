-- Run this in your Supabase SQL editor

create table readings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  publisher text,
  link text,
  published_date date,
  created_at timestamptz default now()
);

create table notes (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  reading_id uuid references readings(id) on delete set null,
  created_at timestamptz default now()
);

-- Enable full-text search
create index readings_search_idx on readings using gin(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(author, '') || ' ' || coalesce(publisher, '')));
create index notes_search_idx on notes using gin(to_tsvector('english', content));
