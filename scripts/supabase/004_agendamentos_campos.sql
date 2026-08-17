-- ============================================================
-- AutoPulse — Ajuste tabela agendamentos: campos do fluxo de orcamento.
-- O app (saveAgendamentoOrcamento) grava origem e orcamentoId, mas a
-- tabela 001 so criou id/tenant_id/data/hora/cliente_info/servico.
-- Sem essas colunas, o upsert falha (PGRST204) silenciosamente.
-- Rode no Supabase: SQL Editor -> New query -> cole -> Run.
-- ============================================================

alter table if exists public.agendamentos add column if not exists origem text;
alter table if exists public.agendamentos add column if not exists "orcamentoId" text;
