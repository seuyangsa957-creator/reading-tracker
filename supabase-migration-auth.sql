-- Run this in your Supabase SQL editor to add auth to existing tables

-- Add user_id columns
alter table readings add column if not exists user_id uuid references auth.users(id) on delete cascade;
alter table notes add column if not exists user_id uuid references auth.users(id) on delete cascade;

-- Enable Row Level Security
alter table readings enable row level security;
alter table notes enable row level security;

-- Policies for readings
create policy "Users can view own readings" on readings for select using (auth.uid() = user_id);
create policy "Users can insert own readings" on readings for insert with check (auth.uid() = user_id);
create policy "Users can update own readings" on readings for update using (auth.uid() = user_id);
create policy "Users can delete own readings" on readings for delete using (auth.uid() = user_id);

-- Policies for notes
create policy "Users can view own notes" on notes for select using (auth.uid() = user_id);
create policy "Users can insert own notes" on notes for insert with check (auth.uid() = user_id);
create policy "Users can update own notes" on notes for update using (auth.uid() = user_id);
create policy "Users can delete own notes" on notes for delete using (auth.uid() = user_id);
