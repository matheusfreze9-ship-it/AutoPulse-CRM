-- ============================================================
-- AutoPulse — Ajuste de colunas: snake_case -> camelCase
-- O app (app.js) grava/le os campos em camelCase. O esquema 001
-- criou em snake_case, e o PostgREST nao acha as colunas (PGRST204).
-- Este script renomeia as colunas para bater com o app.
-- Rode no Supabase: SQL Editor -> New query -> cole -> Run.
-- ============================================================

-- clientes
alter table if exists public.clientes rename column total_gasto to "totalGasto";

-- servicos
alter table if exists public.servicos rename column gera_recorrencia to "geraRecorrencia";
alter table if exists public.servicos rename column renova_recorrencia to "renovaRecorrencia";

-- orcamentos
alter table if exists public.orcamentos rename column cliente_id to "clienteId";
alter table if exists public.orcamentos rename column cliente_nome to "clienteNome";
alter table if exists public.orcamentos rename column cliente_whats to "clienteWhats";
alter table if exists public.orcamentos rename column cliente_email to "clienteEmail";
alter table if exists public.orcamentos rename column veiculo_info to "veiculoInfo";
alter table if exists public.orcamentos rename column categoria_veiculo to "categoriaVeiculo";
alter table if exists public.orcamentos rename column servicos_ids to "servicosIds";
alter table if exists public.orcamentos rename column itens_extras to "itensExtras";
alter table if exists public.orcamentos rename column valor_total to "valorTotal";

-- recorrencias
alter table if exists public.recorrencias rename column cliente_id to "clienteId";
alter table if exists public.recorrencias rename column cliente_nome to "clienteNome";
alter table if exists public.recorrencias rename column cliente_whats to "clienteWhats";
alter table if exists public.recorrencias rename column cliente_email to "clienteEmail";
alter table if exists public.recorrencias rename column veiculo_info to "veiculoInfo";
alter table if exists public.recorrencias rename column servico_original to "servicoOriginal";
alter table if exists public.recorrencias rename column ciclo_atual to "cicloAtual";
alter table if exists public.recorrencias rename column data_aplicacao to "dataAplicacao";
alter table if exists public.recorrencias rename column data_gatilho_alerta to "dataGatilhoAlerta";
alter table if exists public.recorrencias rename column data_limite90d to "dataLimite90d";
alter table if exists public.recorrencias rename column aviso_enviado to "avisoEnviado";

-- agendamentos
alter table if exists public.agendamentos rename column cliente_info to "clienteInfo";

-- financeiro: colunas ja estao em snake simples (descricao, tipo, valor, data)
-- e batem com o app; nenhum rename necessario.
