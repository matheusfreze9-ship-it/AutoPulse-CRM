-- ============================================================
-- AutoPulse — Esquema multi-tenant (1 estetica compradora = 1 tenant)
-- Execute este SQL no Supabase: SQL Editor -> New query -> cole -> Run
-- Nao e necessario usar a service_role; rode com seu usuario do dashboard.
-- ============================================================

-- Extensao para gerar UUIDs (caso precise no futuro)
create extension if not exists "pgcrypto";

-- ============================================================
-- TABELA: tenants (cada dono de estetica = 1 tenant)
-- O id do tenant EH o auth.uid() do dono (1 login = 1 estetica).
-- ============================================================
create table if not exists public.tenants (
  id uuid primary key references auth.users(id) on delete cascade,
  nome_estetica text not null default 'Minha Estetica',
  dono_email text,
  criado_em timestamptz not null default now()
);

-- Trigger: todo usuario que se cadastra vira um tenant automaticamente.
create or replace function public.handle_new_tenant()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.tenants (id, dono_email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_tenant();

-- ============================================================
-- TABELAS DE DADOS (todas com tenant_id)
-- Mantemos veiculos/servicos/agendamento como jsonb para fidelidade
-- com o modelo atual do AutoPulse (simplicidade na migracao).
-- ============================================================

create table if not exists public.clientes (
  id text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  nome text not null,
  whatsapp text,
  email text,
  endereco text,
  observacoes text default '',
  veiculos jsonb default '[]'::jsonb,
  total_gasto numeric default 0
);

create table if not exists public.servicos (
  id text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  nome text not null,
  categoria text,
  precos jsonb default '{}'::jsonb,
  checklist jsonb default '[]'::jsonb,
  gera_recorrencia boolean default false,
  renova_recorrencia boolean default false
);

create table if not exists public.orcamentos (
  id text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  cliente_id text,
  cliente_nome text,
  cliente_whats text,
  cliente_email text,
  veiculo_info text,
  categoria_veiculo text,
  servicos_ids jsonb default '[]'::jsonb,
  itens_extras jsonb default '[]'::jsonb,
  valor_total numeric default 0,
  status text default 'PENDENTE',
  observacoes text,
  data text,
  agendamento jsonb
);

create table if not exists public.recorrencias (
  id text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  cliente_id text,
  cliente_nome text,
  cliente_whats text,
  cliente_email text,
  veiculo_info text,
  servico_original text,
  ciclo_atual text,
  data_aplicacao text,
  data_gatilho_alerta text,
  data_limite90d text,
  status text,
  aviso_enviado boolean default false
);

create table if not exists public.agendamentos (
  id text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  data text,
  hora text,
  cliente_info text,
  servico text
);

create table if not exists public.financeiro (
  id text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  descricao text,
  tipo text,
  valor numeric default 0,
  data text
);

-- ============================================================
-- ROW LEVEL SECURITY (isolamento por tenant)
-- Cada tenant so enxerga os proprios dados.
-- ============================================================
alter table public.tenants      enable row level security;
alter table public.clientes     enable row level security;
alter table public.servicos     enable row level security;
alter table public.orcamentos   enable row level security;
alter table public.recorrencias enable row level security;
alter table public.agendamentos enable row level security;
alter table public.financeiro   enable row level security;

-- Tenant so acessa a si mesmo
drop policy if exists tenants_select_own on public.tenants;
create policy tenants_select_own on public.tenants
  for all using (id = auth.uid()) with check (id = auth.uid());

-- Helpers: todas as tabelas filtram por tenant_id = auth.uid()
drop policy if exists clientes_tenant on public.clientes;
create policy clientes_tenant on public.clientes
  for all using (tenant_id = auth.uid()) with check (tenant_id = auth.uid());

drop policy if exists servicos_tenant on public.servicos;
create policy servicos_tenant on public.servicos
  for all using (tenant_id = auth.uid()) with check (tenant_id = auth.uid());

drop policy if exists orcamentos_tenant on public.orcamentos;
create policy orcamentos_tenant on public.orcamentos
  for all using (tenant_id = auth.uid()) with check (tenant_id = auth.uid());

drop policy if exists recorrencias_tenant on public.recorrencias;
create policy recorrencias_tenant on public.recorrencias
  for all using (tenant_id = auth.uid()) with check (tenant_id = auth.uid());

drop policy if exists agendamentos_tenant on public.agendamentos;
create policy agendamentos_tenant on public.agendamentos
  for all using (tenant_id = auth.uid()) with check (tenant_id = auth.uid());

drop policy if exists financeiro_tenant on public.financeiro;
create policy financeiro_tenant on public.financeiro
  for all using (tenant_id = auth.uid()) with check (tenant_id = auth.uid());
