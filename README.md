# AutoPulse — Gestão Automotiva (SaaS Multi-Tenant)

Sistema de gestão (CRM) completo para estéticas automotivas: lavagens detalhadas, polimentos, vitrificação e proteção de pintura. Roda como **SaaS multi-tenant** — cada estética tem seu próprio login (Supabase Auth) e seus dados isolados na nuvem (Supabase Postgres). Frontend 100% estático (Vercel) + backend Supabase. Otimizado para **celular** e desktop.

> Template neutro, pronto para revenda a múltiplos clientes (white-label). Cada cliente configura o **próprio nome de estética** e a cor de marca. Criado por **Freze**.

## O que o sistema faz

- **Orçamentos inteligentes** — monte o orçamento por tipo de veículo (Hatch, Sedan, SUV, Caminhonete) com cálculo automático de preço e geração de PDF profissional.
- **Aprovação com 1 clique** — ao aprovar, registra o faturamento e abre o agendamento na Agenda.
- **Catálogo de Serviços & Checklists** — biblioteca com variação de preço por veículo e procedimentos de execução.
  - **Categorias de serviço dinâmicas** — crie/remova categorias (ex: Lavagens, Polimentos, Vitrificação) no botão **"Gerenciar Categorias"** (aba Serviços). O catálogo é exibido **agrupado por categoria**. Ao remover uma categoria, os serviços nela são movidos para "Geral" (não somem).
- **CRM de Clientes & Veículos** — histórico completo, múltiplos veículos por cliente, edição de dados.
- **Lembretes de Manutenção (Fase 1)** — serviços de **Polimento** geram lembrete preventivo (~75 dias, prazo limite 90 dias). Na aba Recorrências cada lembrete tem 3 ações:
  - **WhatsApp** — abre o zap do cliente já com a mensagem redigida.
  - **Enviar E-mail** — abre o Gmail redigido para o cliente (inclui o e-mail do cliente).
  - **Agenda (Google)** — salva um evento no **seu** Google Agenda (para VOCÊ se lembrar de acionar o cliente); o evento já traz o e-mail do cliente nos detalhes.
- **Agenda expandida** — calendário por dia, semana, mês ou período.
- **Controle Financeiro** — entradas, saídas e resumo de caixa.
- **Identidade por estética** — o badge lateral mostra as **iniciais do nome da sua estética** (ex: "Daderio Estética Automotiva" → **DE**) e o nome configurado em **Configurações**.
- **Otimizado para celular** — navegação inferior, telas em cartão e botões de toque confortável.

## Arquitetura

- **Frontend:** `index.html` + `app.js` + `styles.css` (estático, hospedado na Vercel).
- **Backend:** Supabase (Postgres + Auth), acessado via `supabase-js` (CDN).
- **Multi-tenant:** `tenant_id = auth.uid()` em todas as tabelas; RLS isola os dados de cada estética.
- **Persistência:** tudo é salvo no banco (upsert + sincronização completa: adicionar, editar, excluir individual e em massa).

## Setup do banco (Supabase)

Os scripts em `scripts/supabase/` são executados **uma vez** no SQL Editor do Supabase:

| Arquivo | O que faz |
|---|---|
| `001_schema.sql` | Schema multi-tenant (tabelas + RLS + trigger de tenant). |
| `002_ajuste_colunas.sql` | Renomeia colunas para camelCase (bate com o app). |
| `003_grants.sql` | Concede acesso às roles anon/authenticated. |
| `004_agendamentos_campos.sql` | Adiciona `origem`/`orcamentoId` em `agendamentos`. |
| `005_categorias.sql` | Tabela `categorias` (multi-tenant) + seed das categorias padrão. |

> Atenção: rode os scripts **uma única vez**, na ordem. Coloque o **conteúdo** do arquivo no SQL Editor (não o caminho do arquivo).

## Como usar

1. Acesse a URL da Vercel (ex: `https://auto-pulse-crm-eight.vercel.app`).
2. **Cadastre-se** (cria sua estética/tenant automaticamente) ou faça login.
3. Em **Configurações**, informe o **Nome da Estética** (aparece no badge e na assinatura dos e-mails).
4. Cadastre clientes, veículos e serviços.
5. Monte e aprove orçamentos. O resto é automático.

### Backup dos dados
Na aba **Configurações & Backup** é possível baixar/restaurar backup em JSON e recarregar dados demonstrativos.

## Fluxo de Lembretes de Manutenção (Fase 1)

1. Ao **aprovar um orçamento de Polimento** (ou serviço com flag de recorrência), o sistema cria automaticamente um lembrete na aba **Recorrências** (~75 dias, prazo limite 90 dias).
2. Na aba Recorrências, cada lembrete tem 3 ações: WhatsApp (abre zap redigido), Enviar E-mail (abre Gmail redigido), Agenda (salva evento no seu Google Agenda para você se lembrar).
3. **Concluir** gera o próximo ciclo (1ª → 2ª → 3ª manutenção) automaticamente.

> O disparo é **manual** (1 clique). A Fase 2 (envio 100% automático via cron + gateway) é o próximo passo.

## Categorias de Serviço (Dinâmicas)

- Aba **Serviços** → botão **"Gerenciar Categorias"**: crie (ex: Vitrificação) ou remova categorias.
- O catálogo é exibido **agrupado por categoria**.
- Ao remover uma categoria, os serviços nela são movidos para **"Geral"** (não são apagados).
- O nome da categoria no cadastro/edição de serviço é um `<select>` populado das categorias cadastradas.

## Identidade da Estética (Badge)

- O círculo no canto inferior esquerdo mostra as **iniciais do nome da estética** (ex: "Daderio Estética Automotiva" → **DE**) e o nome configurado.
- Configure em **Configurações → Nome da Estética** (usado também na assinatura dos e-mails de lembrete).
- O placeholder de exemplo é **"AutoPulse Estética Automotiva"** (neutro, não expõe o nome de outros clientes).

## Personalização (white-label)

| O que ajustar | Onde |
|---|---|
| **Nome da estética** | Aba **Configurações** → "Nome da Estética" (salvo por dispositivo; aparece no badge e na assinatura de e-mails). |
| **Cor de marca** | `styles.css` → variáveis `--primary`, `--primary-hover`, `--primary-glow`. |
| **Dados de contato no PDF** | `index.html` (seção de PDF, bloco "DADOS DA EMPRESA"). |

> O nome "AutoPulse" é o **produto** (template revendável). "Freze" é a empresa criadora (crédito "Criado por Freze"). O **nome da estética** é o do seu cliente final — configurado em Configurações e usado na assinatura dos e-mails de lembrete.

## Estrutura de arquivos

```
index.html        → telas e modais
app.js            → lógica, banco (Supabase) e motor de lembretes
styles.css        → design system (tema escuro/claro, cor de marca)
manual.html       → manual do usuário (abre pelo botão "Manual" no topo)
supabase-config.js→ URL + anon key do Supabase (públicos por design; RLS protege)
scripts/supabase/ → scripts de criação/ajuste do banco
```

## Requisitos

- Navegador moderno (Chrome, Edge, Firefox, Safari) em desktop ou celular.
- Conta Supabase (plano gratuito) e deploy estático (Vercel).

## Troubleshooting — Setup do Banco (Supabase)

**Erros comuns:**
- `PGRST204: column does not exist` → rode o `002` (colunas em camelCase).
- `permission denied for table` → rode o `003` (GRANT).
- Agendamentos não salvam → rode o `004` (campos do fluxo de orçamento).
- Categorias não aparecem → rode o `005`.
- **Comando "rodando sem parar" no SQL Editor:** a aba pode ter perdido conexão; atualize a aba. Confirme com `select count(*) from public.categorias;` (esperado: 6). Se duplicou (ex: 12), rode:
  ```sql
  delete from public.categorias a
  using public.categorias b
  where a.id <> b.id and a.tenant_id = b.tenant_id and a.nome = b.nome;
  ```
  e confirme `count(*) = 6`.

## Deploy

- **Frontend:** Vercel (conectado ao repo `AutoPulse-CRM` no GitHub). Empurrar pro `main` reimplanta sozinho.
- **Domínio da Vercel** deve ser autorizado no Supabase (Authentication → URL Configuration: Site URL + Redirect URLs) para o login funcionar.
- **Anon key** em `supabase-config.js` é pública por design (a RLS protege os dados).
