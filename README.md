# AutoPulse — Gestão Automotiva

Sistema de gestão (CRM) completo para estéticas automotivas, lavagens detalhadas, polimentos, vitrificação e proteção de pintura. Desenvolvido para rodar **100% no navegador** (computador ou celular), sem servidor e sem banco de dados externo — os dados ficam salvos localmente no próprio dispositivo.

> Template neutro, pronto para demonstração e revenda a múltiplos clientes. Para usar em uma estética específica, basta ajustar o nome da empresa e a cor de marca (ver seção **Personalização**). Criado por **Freze**.

## O que o sistema faz

- **Orçamentos inteligentes** — monte o orçamento por tipo de veículo (Hatch, Sedan, SUV, Caminhonete) com cálculo automático de preço e geração de PDF profissional.
- **Aprovação com 1 clique** — ao aprovar, o sistema registra o faturamento e abre o agendamento do serviço na Agenda.
- **Catálogo de Serviços & Checklists** — biblioteca de serviços com variação de preço por veículo e procedimentos de execução. Adicione e **edite** serviços a qualquer momento (nome, categoria, valores e checklist).
- **CRM de Clientes & Veículos** — histórico completo de atendimentos, múltiplos veículos por cliente e edição de dados.
- **Lembretes de Manutenção** — todo serviço de **Polimento** gera automaticamente um lembrete preventivo (cerca de 30 dias após o serviço, com prazo limite de 45 dias). Disparo de WhatsApp e evento no Google Agenda em 1 clique, com renovação automática de ciclos (1ª → 2ª → 3ª manutenção).
- **Agenda expandida** — calendário por dia, semana, mês ou período.
- **Controle Financeiro** — entradas, saídas e resumo de caixa.
- **Otimizado para celular** — navegação inferior, telas em formato de cartão e botões de toque confortável.

## Como usar

1. Abra o arquivo `index.html` em qualquer navegador (duplo clique, ou hospede em qualquer servidor estático / GitHub Pages).
2. Cadastre clientes, veículos e serviços.
3. Monte e aprove orçamentos. O resto é automático.

### Backup dos dados

Na aba **Configurações & Backup** é possível:
- Baixar um backup completo em JSON.
- Restaurar um backup.
- Recarregar os dados demonstrativos.

## Personalização (por cliente)

Para adaptar o sistema a cada estética:

| O que ajustar | Onde |
|---|---|
| **Nome da empresa** | `app.js` → constante `NOME_EMPRESA` (linha near o topo) |
| **Cor de marca** | `styles.css` → variáveis `--primary`, `--primary-hover`, `--primary-glow` em `:root` |
| **Dados de contato no PDF** | `index.html` (seção de PDF, bloco "DADOS DA EMPRESA") |

Opcional: substitua o ícone `favicon.svg` pela marca do cliente.

## Estrutura de arquivos

```
index.html        → telas e modais do sistema
app.js            → toda a lógica, armazenamento e motor de lembretes
styles.css        → design system (tema escuro, cor de marca via variáveis)
manual.html       → manual do usuário (abre pelo botão "Manual" no topo)
favicon.svg       → ícone
dados/            → exportações e dados de apoio
saidas/           → PDFs de orçamentos gerados
scripts/          → scripts auxiliares
```

## Requisitos

- Navegador moderno (Chrome, Edge, Firefox, Safari) em desktop ou celular.
- Nenhuma instalação, dependência ou servidor necessário.

---

Sistema AutoPulse (Gestão Automotiva) — template de demonstração e revenda. Criado por **Freze**.
