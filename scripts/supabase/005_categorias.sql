-- ============================================================
-- AutoPulse — Tabela de categorias de servico (multi-tenant).
-- Antes as categorias eram fixas no HTML. Agora sao dinamicas:
-- o usuario cria/remove e o catalogo agrupa por categoria.
-- Rode no Supabase: SQL Editor -> New query -> cole -> Run.
-- ============================================================

create table if not exists public.categorias (
  id text primary key,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  nome text not null
);

alter table if exists public.categorias enable row level security;

drop policy if exists "categorias_tenant" on public.categorias;
create policy "categorias_tenant" on public.categorias
  for all using (tenant_id = auth.uid()) with check (tenant_id = auth.uid());

-- Semea as categorias padrao para tenants ja existentes (que nao tem ainda).
insert into public.categorias (id, tenant_id, nome)
select 'cat-' || gen_random_uuid(), t.id, c.nome
from public.tenants t
cross join (values ('Lavagens'),('Polimentos'),('Proteção'),('Higienização'),('Restauração'),('Geral')) as c(nome)
where not exists (
  select 1 from public.categorias cc where cc.tenant_id = t.id
);
