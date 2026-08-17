-- ============================================================
-- AutoPulse — Concede acesso as roles do Supabase (anon/authenticated)
-- Tabelas criadas via SQL Editor NAO recebem GRANT automatico,
-- causando "permission denied for table <tabela>". Este script corrige.
-- Rode no Supabase: SQL Editor -> New query -> cole -> Run.
-- ============================================================

grant usage on schema public to anon, authenticated;
grant all on all tables in schema public to anon, authenticated;
grant all on all sequences in schema public to anon, authenticated;
grant all on all routines in schema public to anon, authenticated;
