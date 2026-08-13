/**
 * AutoPulse (Gestão Automotiva) — CORE CRM ENGINE
 * Single Page Application Logic, Storage & Recurrence Engine (Manutenção Preventiva)
 */

const NOME_EMPRESA = 'AutoPulse';

// Cores de marca disponíveis no seletor de tema (Configurações).
const THEME_KEY = 'ESTETICA_CRM_THEME';
const THEMES = {
  azul:    { primary: '#2563eb', hover: '#1d4ed8', glow: 'rgba(37, 99, 235, 0.25)' },
  verde:   { primary: '#16a34a', hover: '#15803d', glow: 'rgba(22, 163, 74, 0.25)' },
  vermelho:{ primary: '#dc2626', hover: '#b91c1c', glow: 'rgba(220, 38, 38, 0.25)' },
  roxo:    { primary: '#7c3aed', hover: '#6d28d9', glow: 'rgba(124, 58, 237, 0.25)' },
  laranja: { primary: '#ea580c', hover: '#c2410c', glow: 'rgba(234, 88, 12, 0.25)' },
  grafite: { primary: '#475569', hover: '#334155', glow: 'rgba(71, 85, 105, 0.25)' }
};

const STORAGE_KEY = 'ESTETICA_CRM_DATA_V1';

// Seed Initial Data if empty
const DEFAULT_DATA = {
  clientes: [
    {
      id: 'cli-1',
      nome: 'João Silva',
      whatsapp: '5516997293434',
      email: 'joao.silva@email.com',
      endereco: 'Av. Paulista, 1500 - São Paulo/SP',
      veiculos: [
        { id: 'vei-1', modelo: 'Toyota Corolla', placa: 'ABC-1D23', categoria: 'Sedan', anoCor: '2022 / Preto Carbono', km: '38000' },
        { id: 'vei-2', modelo: 'Jeep Compass', placa: 'XYZ-9876', categoria: 'SUV', anoCor: '2023 / Prata', km: '22000' }
      ],
      totalGasto: 1850.00
    },
    {
      id: 'cli-2',
      nome: 'Mariana Costa',
      whatsapp: '5516976543210',
      email: 'mariana.costa@gmail.com',
      endereco: 'Rua Oscar Freire, 400 - São Paulo/SP',
      veiculos: [
        { id: 'vei-3', modelo: 'BMW X3', placa: 'BMW-7777', categoria: 'SUV', anoCor: '2024 / Branco Pérola', km: '12000' }
      ],
      totalGasto: 2200.00
    }
  ],
  servicos: [
    {
      id: 'srv-1',
      nome: 'Lavagem Automotiva Nível 1',
      categoria: 'Lavagens',
      precos: { Hatch: 90, Sedan: 90, SUV: 110, Caminhonete: 120 },
      checklist: ['Pré-lavagem rápida', 'Lavagem de rodas', 'Secagem técnica com microfibra', 'Pretinho nos pneus']
    },
    {
      id: 'srv-2',
      nome: 'Lavagem Automotiva Nível 2',
      categoria: 'Lavagens',
      precos: { Hatch: 190, Sedan: 190, SUV: 220, Caminhonete: 240 },
      checklist: [
        'Pré-lavagem com Snow Foam pH neutro',
        'Lavagem detalhada das rodas e caixas de roda',
        'Limpeza técnica de entradas de portas e porta-malas',
        'Segunda lavagem manual com luva de microfibra',
        'Secagem com soprador e toalha de alto peso',
        'Aplicação de selante sintético ou cera premium',
        'Pretinho alta durabilidade nos pneus',
        'Higienização de vidros e aspiração interna completa'
      ]
    },
    {
      id: 'srv-3',
      nome: 'Lavagem Automotiva Nível 3 (Detalhamento Técnico)',
      categoria: 'Lavagens',
      precos: { Hatch: 350, Sedan: 350, SUV: 420, Caminhonete: 480 },
      checklist: ['Lavagem técnica de chassi e caixa de rodas', 'Limpeza detalhada de motor', 'Descontaminação de pintura com Clay Bar', 'Aplicação de cera de carnaúba pura']
    },
    {
      id: 'srv-4',
      nome: 'Higienização e Hidratação de Bancos de Couro',
      categoria: 'Higienização',
      precos: { Hatch: 220, Sedan: 220, SUV: 260, Caminhonete: 280 },
      checklist: ['Limpeza profunda com APC neutro e escova de cerdas macias', 'Remoção de oleosidade e sujeira impregnada', 'Hidratação com condicionador de couro fosco original']
    },
    {
      id: 'srv-5',
      nome: 'Polimento Técnico com Vitrificação de Pintura',
      categoria: 'Polimentos',
      precos: { Hatch: 1200, Sedan: 1200, SUV: 1500, Caminhonete: 1800 },
      geraRecorrencia: true,
      checklist: ['Descontaminação química e mecânica da pintura', 'Polimento corretivo em 3 etapas (Corte, Refino, Lustro)', 'Eliminação de riscos e marcas de boina', 'Aplicação de Vitrificador de Pintura (Proteção de até 3 anos)', 'Criação de camada vitrificada hidrofóbica e alto brilho']
    },
    {
      id: 'srv-6',
      nome: 'Manutenção de Vitrificação',
      categoria: 'Proteção',
      precos: { Hatch: 280, Sedan: 280, SUV: 350, Caminhonete: 390 },
      renovaRecorrencia: true,
      checklist: ['Lavagem técnica desengraxante suave', 'Descontaminação da camada vitrificada', 'Aplicação de Booster de SiO2 / Dióxido de Silício', 'Revitalização do brilho e repelência de água']
    },
    {
      id: 'srv-7',
      nome: 'Restauração de Faróis',
      categoria: 'Restauração',
      precos: { Hatch: 160, Sedan: 160, SUV: 160, Caminhonete: 160 },
      checklist: ['Lixamento técnico d\'água sequencial (800 a 3000)', 'Polimento de alta abrasão para transparência cristalina', 'Aplicação de verniz de proteção UV']
    }
  ],
  orcamentos: [
    {
      id: 'ORC-1001',
      clienteId: 'cli-1',
      clienteNome: 'João Silva',
      clienteWhats: '5516997293434',
      veiculoInfo: 'Toyota Corolla (Sedan)',
      categoriaVeiculo: 'Sedan',
      servicosIds: ['srv-2', 'srv-4'],
      itensExtras: [{ nome: 'Cristalização de para-brisa', preco: 80 }],
      valorTotal: 490.00,
      status: 'APROVADO',
      observacoes: 'Veículo com manchas de água nos vidros. Entregar no final da tarde.',
      data: '2026-08-01'
    }
  ],
  recorrencias: [
    {
      id: 'rec-1',
      clienteId: 'cli-1',
      clienteNome: 'João Silva',
      clienteWhats: '5516997293434',
      clienteEmail: 'joao.silva@email.com',
      veiculoInfo: 'Toyota Corolla (ABC-1D23)',
      servicoOriginal: 'Polimento Técnico com Vitrificação',
      cicloAtual: '1ª Manutenção de Vitrificação',
      dataAplicacao: '2026-07-15',
      dataGatilhoAlerta: '2026-08-14',
      dataLimite90d: '2026-08-29',
      status: 'EM ANDAMENTO',
      avisoEnviado: false
    }
  ],
  agendamentos: [
    {
      id: 'agd-1',
      data: new Date().toISOString().split('T')[0],
      hora: '09:00',
      clienteInfo: 'Mariana Costa — BMW X3',
      servico: 'Polimento Técnico com Vitrificação'
    }
  ],
  financeiro: [
    { id: 'fin-1', descricao: 'Orçamento #ORC-1001 — João Silva', tipo: 'Receita', valor: 490.00, data: '2026-08-01' },
    { id: 'fin-2', descricao: 'Compra de Insumos (Coating + APC)', tipo: 'Despesa', valor: 350.00, data: '2026-08-03' }
  ]
};

// Application Class
class EsteticaCRM {
  constructor() {
    this.data = this.loadData();
    this.aplicarTemaSalvo();
    this.currentCategory = 'Hatch';
    this.selectedServiceIds = [];
    this.extraItems = [];
    this.agendaFilterMode = 'day';
    this.agendaCalendarMonth = new Date();
    this.agendaRangeStart = '';
    this.agendaRangeEnd = '';
    this.init();
  }

  loadData() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
      return DEFAULT_DATA;
    }
    try {
      const parsed = JSON.parse(raw);
      // Garantir compatibilidade com orçamentos antigos
      if (parsed.orcamentos) {
        parsed.orcamentos.forEach(o => {
          if (!o.status) o.status = 'PENDENTE';
        });
      }
      if (parsed.clientes) {
        parsed.clientes.forEach(c => {
          if (!c.observacoes) c.observacoes = '';
        });
      }
      return parsed;
    } catch (e) {
      console.error('Erro ao ler localStorage', e);
      return DEFAULT_DATA;
    }
  }

  saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    this.updateBadgesAndMetrics();
  }

  // Aplica uma cor de marca e salva a preferência no dispositivo.
  aplicarTema(nome) {
    const t = THEMES[nome];
    if (!t) return;
    const root = document.documentElement;
    root.style.setProperty('--primary', t.primary);
    root.style.setProperty('--primary-hover', t.hover);
    root.style.setProperty('--primary-glow', t.glow);
    try { localStorage.setItem(THEME_KEY, nome); } catch (e) {}
    document.querySelectorAll('.theme-swatch').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-theme') === nome);
    });
  }

  // Restaura a cor de marca salva (ou azul, padrão) ao abrir o sistema.
  aplicarTemaSalvo() {
    let nome = 'azul';
    try { nome = localStorage.getItem(THEME_KEY) || 'azul'; } catch (e) {}
    this.aplicarTema(nome);
    // Restaura também a preferência de modo claro/escuro.
    this.aplicarModoSalvo();
  }

  // Alterna entre modo escuro (padrão) e claro, trocando o fundo da interface.
  alternarModoClaroEscuro() {
    const claro = document.body.classList.toggle('light-mode');
    try { localStorage.setItem('ESTETICA_CRM_LIGHT', claro ? '1' : '0'); } catch (e) {}
    this.atualizarIconeModo(claro);
  }

  // Aplica a preferência de modo (claro/escuro) salva no dispositivo.
  aplicarModoSalvo() {
    let claro = false;
    try { claro = localStorage.getItem('ESTETICA_CRM_LIGHT') === '1'; } catch (e) {}
    if (claro) document.body.classList.add('light-mode');
    this.atualizarIconeModo(claro);
  }

  // Atualiza o rótulo/ícone do botão de acordo com o modo ativo.
  atualizarIconeModo(claro) {
    const icon = document.getElementById('icon-modo-escuro');
    const label = document.querySelector('#btn-toggle-theme .btn-label-hide-mobile');
    if (icon) {
      icon.className = claro ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    if (label) {
      label.textContent = claro ? ' Modo Escuro' : ' Modo Claro';
    }
  }

  init() {
    this.bindEvents();
    this.checkRecurrenceStatuses();
    this.renderDashboard();
    this.renderOrcamentoForm();
    this.renderOrcamentosList();
    this.renderServicesCatalog();
    this.renderCRM();
    this.renderRecorrencias();
    this.renderAgenda();
    this.renderFinanceiro();
    this.updateBadgesAndMetrics();
    this.initMobileUX();
  }

  initMobileUX() {
    // Bloqueia zoom por pinça (comportamento app-like)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) e.preventDefault();
      lastTouchEnd = now;
    }, { passive: false });

    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
    document.addEventListener('gestureend', (e) => e.preventDefault());
  }

  bindEvents() {
    // Navigation Tabs
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // New Buttons Header
    document.getElementById('btn-novo-orcamento')?.addEventListener('click', () => this.switchTab('orcamentos'));
    document.getElementById('btn-novo-cliente')?.addEventListener('click', () => this.openModal('modal-cliente'));
    document.getElementById('btn-novo-agendamento')?.addEventListener('click', () => this.openModal('modal-agendamento'));
    document.getElementById('btn-nova-transacao')?.addEventListener('click', () => this.openModal('modal-transacao'));

    // Category Selector in Orçamento
    document.querySelectorAll('input[name="categoria_veiculo"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.currentCategory = e.target.value;
        document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        e.target.closest('.cat-btn').classList.add('active');
        this.recalculateOrcamento();
      });
    });

    // Client select change in Orçamento
    const cliSelect = document.getElementById('orc-cliente-select');
    if (cliSelect) {
      cliSelect.addEventListener('change', (e) => {
        const clienteId = e.target.value;
        this.populateVeiculosSelect(clienteId);
      });
    }

    // Add extra item
    document.getElementById('btn-add-extra')?.addEventListener('click', () => {
      const nomeInput = document.getElementById('extra-nome');
      const precoInput = document.getElementById('extra-preco');
      const nome = nomeInput.value.trim();
      const preco = parseFloat(precoInput.value);
      if (nome && !isNaN(preco) && preco > 0) {
        this.extraItems.push({ nome, preco });
        nomeInput.value = '';
        precoInput.value = '';
        this.renderExtraItems();
        this.recalculateOrcamento();
      }
    });

    // Add new service modal
    document.getElementById('btn-novo-servico-modal')?.addEventListener('click', () => {
      this.abrirModalNovoServico();
    });

    // Submit Forms
    document.getElementById('form-orcamento')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveOrcamento();
    });

    document.getElementById('form-cliente')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveCliente();
    });

    document.getElementById('form-editar-cliente')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveEditarCliente();
    });

    document.getElementById('form-veiculo')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveVeiculo();
    });

    document.getElementById('form-editar-lembrete')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveEditarLembrete();
    });

    document.getElementById('form-agendamento')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveAgendamento();
    });

    document.getElementById('form-agendamento-orcamento')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveAgendamentoOrcamento();
    });

    document.getElementById('form-editar-servico')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveEditarServico();
    });

    document.getElementById('form-novo-servico')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.salvarNovoServico();
    });

    document.getElementById('form-transacao')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveTransacao();
    });

    // Search CRM
    document.getElementById('search-cliente')?.addEventListener('input', (e) => {
      this.renderCRM(e.target.value.toLowerCase());
    });

    // Date picker agenda
    document.getElementById('agenda-date-picker')?.addEventListener('change', (e) => {
      const parts = e.target.value.split('-');
      if (parts.length === 3) {
        this.agendaCalendarMonth = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1);
      }
      this.renderAgenda();
    });

    document.getElementById('agenda-range-start')?.addEventListener('change', () => this.renderAgenda());
    document.getElementById('agenda-range-end')?.addEventListener('change', () => this.renderAgenda());

    // Mobile bottom nav
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchTab(item.getAttribute('data-tab'));
      });
    });

    // Backup buttons
    document.getElementById('btn-export-backup')?.addEventListener('click', () => this.exportBackup());
    document.getElementById('input-import-backup')?.addEventListener('change', (e) => this.importBackup(e));
    document.getElementById('btn-reset-demo')?.addEventListener('click', () => {
      if (confirm('Deseja restaurar os dados demonstrativos padrão da ' + NOME_EMPRESA + '?')) {
        this.data = DEFAULT_DATA;
        this.saveData();
        location.reload();
      }
    });

    // Seletor de tema (cor de marca)
    document.querySelectorAll('.theme-swatch').forEach(btn => {
      btn.addEventListener('click', () => this.aplicarTema(btn.getAttribute('data-theme')));
    });
  }

  switchTab(tabId) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('active'));

    const navEl = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
    const paneEl = document.getElementById(`tab-${tabId}`);

    if (navEl) navEl.classList.add('active');
    if (paneEl) paneEl.classList.add('active');

    document.querySelectorAll('.mobile-nav-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`.mobile-nav-item[data-tab="${tabId}"]`)?.classList.add('active');

    if (tabId === 'agenda') {
      this.renderAgendaCalendar();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update Topbar Title
    const titles = {
      dashboard: { title: 'Dashboard Executivo', sub: 'Visão geral do negócio e alertas operacionais' },
      orcamentos: { title: 'Orçamentos', sub: 'Montagem rápida de propostas e aprovação de serviços' },
      servicos: { title: 'Serviços', sub: 'Catálogo de serviços, checklists e tabela de preços' },
      crm: { title: 'Clientes & Veículos', sub: 'Histórico de clientes e frota cadastrada' },
      recorrencia: { title: 'Lembretes & Manutenções', sub: 'Acompanhamento preventivo de manutenção' },
      agenda: { title: 'Agenda', sub: 'Agendamentos organizados por data e período' },
      financeiro: { title: 'Financeiro', sub: 'Entradas, saídas e controle de caixa' },
      configuracoes: { title: 'Configurações & Backup', sub: 'Gestão de dados e cópias de segurança' }
    };

    if (titles[tabId]) {
      document.getElementById('page-title').innerText = titles[tabId].title;
      document.getElementById('page-subtitle').innerText = titles[tabId].sub;
    }
  }

  openModal(modalId) {
    document.getElementById(modalId)?.classList.add('open');
    // Trava o scroll do body e esconde a bottom-nav enquanto o modal está aberto (mobile)
    document.body.classList.add('modal-open');
    if (modalId === 'modal-agendamento') {
      this.populateAgendamentoSelect();
    }
    if (modalId === 'modal-transacao') {
      const finData = document.getElementById('fin-data');
      if (finData) finData.value = new Date().toISOString().split('T')[0];
    }
  }

  closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('open');
    // Só libera o body se não restar nenhum modal aberto
    const algumAberto = document.querySelector('.modal-backdrop.open');
    if (!algumAberto) document.body.classList.remove('modal-open');
  }

  // ==========================================
  // EXCLUSÃO E EDIÇÃO GERAL (Delete & Edit Handlers)
  // ==========================================
  deleteOrcamento(id) {
    if (confirm(`Tem certeza que deseja excluir o orçamento ${id}?`)) {
      this.data.orcamentos = this.data.orcamentos.filter(o => o.id !== id);
      this.saveData();
      this.renderOrcamentosList();
      this.renderDashboard();
    }
  }

  deleteCliente(id) {
    if (confirm('Tem certeza que deseja excluir este cliente? Todos os veículos e registros associados serão removidos.')) {
      this.data.clientes = this.data.clientes.filter(c => c.id !== id);
      this.saveData();
      this.renderCRM();
      this.renderOrcamentoForm();
      const body = document.getElementById('crm-client-detail-body');
      if (body) {
        body.innerHTML = `
          <div class="empty-state">
            <i class="fa-solid fa-user-gear"></i>
            <p>Selecione um cliente da lista para visualizar seus veículos e histórico.</p>
          </div>
        `;
      }
    }
  }

  editarCliente(cliId) {
    const c = this.data.clientes.find(item => item.id === cliId);
    if (!c) return;

    document.getElementById('edit-cli-id').value = c.id;
    document.getElementById('edit-cli-nome').value = c.nome;
    document.getElementById('edit-cli-whatsapp').value = c.whatsapp;
    document.getElementById('edit-cli-email').value = c.email || '';
    document.getElementById('edit-cli-endereco').value = c.endereco || '';
    document.getElementById('edit-cli-observacoes').value = c.observacoes || '';

    this.openModal('modal-editar-cliente');
  }

  saveEditarCliente() {
    const id = document.getElementById('edit-cli-id').value;
    const c = this.data.clientes.find(item => item.id === id);
    if (!c) return;

    c.nome = document.getElementById('edit-cli-nome').value;
    c.whatsapp = document.getElementById('edit-cli-whatsapp').value.replace(/\D/g, '');
    c.email = document.getElementById('edit-cli-email').value;
    c.endereco = document.getElementById('edit-cli-endereco').value;
    c.observacoes = document.getElementById('edit-cli-observacoes').value;

    this.saveData();
    this.closeModal('modal-editar-cliente');
    this.renderCRM();
    this.viewClientDetails(id);
    this.renderOrcamentoForm();
    alert('Dados do cliente atualizados com sucesso!');
  }

  abrirModalVeiculo(cliId, veiId = null) {
    const cli = this.data.clientes.find(c => c.id === cliId);
    if (!cli) return;

    document.getElementById('vei-cli-id').value = cliId;
    document.getElementById('vei-edit-id').value = veiId || '';

    const titleEl = document.getElementById('modal-veiculo-title');

    if (veiId) {
      const v = cli.veiculos.find(vei => vei.id === veiId);
      if (v) {
        titleEl.innerText = `Editar Veículo — ${v.modelo}`;
        document.getElementById('mvei-modelo').value = v.modelo;
        document.getElementById('mvei-placa').value = v.placa;
        document.getElementById('mvei-categoria').value = v.categoria;
        document.getElementById('mvei-anocor').value = v.anoCor || '';
        document.getElementById('mvei-km').value = v.km || '';
      }
    } else {
      titleEl.innerText = `Adicionar Novo Veículo para ${cli.nome}`;
      document.getElementById('mvei-modelo').value = '';
      document.getElementById('mvei-placa').value = '';
      document.getElementById('mvei-categoria').value = 'Hatch';
      document.getElementById('mvei-anocor').value = '';
      document.getElementById('mvei-km').value = '';
    }

    this.openModal('modal-veiculo');
  }

  saveVeiculo() {
    const cliId = document.getElementById('vei-cli-id').value;
    const veiId = document.getElementById('vei-edit-id').value;
    const cli = this.data.clientes.find(c => c.id === cliId);
    if (!cli) return;

    const modelo = document.getElementById('mvei-modelo').value;
    const placa = document.getElementById('mvei-placa').value.toUpperCase();
    const categoria = document.getElementById('mvei-categoria').value;
    const anoCor = document.getElementById('mvei-anocor').value;
    const km = document.getElementById('mvei-km').value;

    if (veiId) {
      const v = cli.veiculos.find(vei => vei.id === veiId);
      if (v) {
        v.modelo = modelo;
        v.placa = placa;
        v.categoria = categoria;
        v.anoCor = anoCor;
        v.km = km;
      }
    } else {
      cli.veiculos.push({
        id: 'vei-' + Date.now(),
        modelo, placa, categoria, anoCor, km
      });
    }

    this.saveData();
    this.closeModal('modal-veiculo');
    this.renderCRM();
    this.viewClientDetails(cliId);
    this.renderOrcamentoForm();
    alert('Veículo salvo com sucesso!');
  }

  deleteVeiculo(cliId, veiId) {
    if (confirm('Deseja excluir este veículo do cliente?')) {
      const cli = this.data.clientes.find(c => c.id === cliId);
      if (cli) {
        cli.veiculos = cli.veiculos.filter(v => v.id !== veiId);
        this.saveData();
        this.viewClientDetails(cliId);
        this.renderCRM();
        this.renderOrcamentoForm();
      }
    }
  }

  deleteServico(id) {
    if (confirm('Tem certeza que deseja excluir este serviço do catálogo?')) {
      this.data.servicos = this.data.servicos.filter(s => s.id !== id);
      this.saveData();
      this.renderServicesCatalog();
      this.renderServicesCheckboxes();
    }
  }

  // Abre o modal de edição já preenchido com os dados do serviço.
  abrirModalEditarServico(id) {
    const s = this.data.servicos.find(x => x.id === id);
    if (!s) return;

    document.getElementById('edit-srv-id').value = s.id;
    document.getElementById('edit-srv-nome').value = s.nome;
    document.getElementById('edit-srv-categoria').value = s.categoria;
    document.getElementById('edit-srv-hatch').value = s.precos.Hatch;
    document.getElementById('edit-srv-sedan').value = s.precos.Sedan;
    document.getElementById('edit-srv-suv').value = s.precos.SUV;
    document.getElementById('edit-srv-caminhonete').value = s.precos.Caminhonete;
    document.getElementById('edit-srv-checklist').value = (s.checklist || []).join(', ');

    this.openModal('modal-editar-servico');
  }

  // Salva as alterações do serviço (nome, categoria, preços e checklist).
  saveEditarServico() {
    const id = document.getElementById('edit-srv-id').value;
    const s = this.data.servicos.find(x => x.id === id);
    if (!s) return;

    const nome = document.getElementById('edit-srv-nome').value.trim();
    const categoria = document.getElementById('edit-srv-categoria').value;
    const hatch = parseFloat(document.getElementById('edit-srv-hatch').value) || 0;
    const sedan = parseFloat(document.getElementById('edit-srv-sedan').value) || 0;
    const suv = parseFloat(document.getElementById('edit-srv-suv').value) || 0;
    const caminhonete = parseFloat(document.getElementById('edit-srv-caminhonete').value) || 0;
    const checklistStr = document.getElementById('edit-srv-checklist').value;

    if (!nome) {
      alert('Informe o nome do serviço!');
      return;
    }

    s.nome = nome;
    s.categoria = categoria;
    s.precos = { Hatch: hatch, Sedan: sedan, SUV: suv, Caminhonete: caminhonete };
    s.checklist = checklistStr.split(',').map(t => t.trim()).filter(Boolean);

    this.saveData();
    this.closeModal('modal-editar-servico');
    this.renderServicesCatalog();
    this.renderServicesCheckboxes();
    this.recalculateOrcamento();
    alert('Serviço atualizado com sucesso!');
  }

  // Abre o modal de novo serviço com os campos limpos.
  abrirModalNovoServico() {
    document.getElementById('novo-srv-nome').value = '';
    document.getElementById('novo-srv-categoria').value = 'Geral';
    document.getElementById('novo-srv-hatch').value = '';
    document.getElementById('novo-srv-sedan').value = '';
    document.getElementById('novo-srv-suv').value = '';
    document.getElementById('novo-srv-caminhonete').value = '';
    document.getElementById('novo-srv-checklist').value = '';
    this.openModal('modal-novo-servico');
  }

  // Cria um novo serviço a partir dos dados do formulário.
  salvarNovoServico() {
    const nome = document.getElementById('novo-srv-nome').value.trim();
    const categoria = document.getElementById('novo-srv-categoria').value;
    const hatch = parseFloat(document.getElementById('novo-srv-hatch').value) || 0;
    const sedan = parseFloat(document.getElementById('novo-srv-sedan').value) || 0;
    const suv = parseFloat(document.getElementById('novo-srv-suv').value) || 0;
    const caminhonete = parseFloat(document.getElementById('novo-srv-caminhonete').value) || 0;
    const checklistStr = document.getElementById('novo-srv-checklist').value;

    if (!nome) {
      alert('Informe o nome do serviço!');
      return;
    }

    const novoServico = {
      id: 'srv-' + Date.now(),
      nome,
      categoria,
      precos: { Hatch: hatch, Sedan: sedan, SUV: suv, Caminhonete: caminhonete },
      checklist: checklistStr.split(',').map(t => t.trim()).filter(Boolean)
    };

    this.data.servicos.push(novoServico);
    this.saveData();
    this.closeModal('modal-novo-servico');
    this.renderServicesCatalog();
    this.renderServicesCheckboxes();
    this.recalculateOrcamento();
    alert('Serviço adicionado com sucesso!');
  }

  deleteAgendamento(id) {
    if (confirm('Deseja cancelar/excluir este agendamento?')) {
      this.data.agendamentos = this.data.agendamentos.filter(a => a.id !== id);
      this.saveData();
      this.renderAgenda();
      this.renderDashboard();
    }
  }

  deleteTransacao(id) {
    if (confirm('Deseja excluir este lançamento financeiro?')) {
      this.data.financeiro = this.data.financeiro.filter(f => f.id !== id);
      this.saveData();
      this.renderFinanceiro();
      this.renderDashboard();
    }
  }

  // ==========================================
  // MOTOR DE LEMBRETES & MANUTENÇÕES
  // ==========================================
  checkRecurrenceStatuses() {
    const hoje = new Date();
    this.data.recorrencias.forEach(rec => {
      if (rec.status === 'CONCLUÍDO') return;

      const appDate = new Date(rec.dataAplicacao);
      const diffTime = Math.abs(hoje - appDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Janela de lembrete: alerta a partir de 75 dias, vencido após 90 dias.
      let novoStatus;
      if (diffDays >= 90) {
        novoStatus = 'VENCIDO';
      } else if (diffDays >= 75) {
        novoStatus = 'ALERTA MANUTENÇÃO';
      } else {
        novoStatus = 'EM ANDAMENTO';
      }

      // Transição para ALERTA/VENCIDO: dispara lembrete por e-mail (1 vez).
      const entrouEmAviso = (novoStatus === 'ALERTA MANUTENÇÃO' || novoStatus === 'VENCIDO')
        && rec.status !== novoStatus
        && !rec.avisoEnviado;
      rec.status = novoStatus;
      if (entrouEmAviso) {
        this.dispararLembreteEmail(rec);
      }
    });
  }

  // Retorna o e-mail mais atual do cliente do lembrete.
  // Busca no cadastro do cliente (via clienteId) e usa fallback para a cópia do lembrete,
  // evitando e-mail "stale" quando o cliente teve o e-mail cadastrado depois.
  getEmailAtualCliente(rec) {
    if (rec && rec.clienteId) {
      const cli = this.data.clientes.find(c => c.id === rec.clienteId);
      if (cli && cli.email) return cli.email;
    }
    return (rec && rec.clienteEmail) || '';
  }

  // Monta o link mailto: com a mensagem de lembrete (disparo simplificado por e-mail).
  // Não depende de backend: abre o cliente de e-mail do usuário já preenchido.
  // Monta a URL de compose do Gmail com destinatário e mensagem prontos.
  // Abre direto no navegador/Gmail (evita o seletor de aplicativo do SO do mailto:).
  getRecurrenceEmailUrl(rec) {
    const assunto = encodeURIComponent(`Lembrete de Manutenção — ${rec.clienteNome} (${rec.veiculoInfo})`);
    const corpo = encodeURIComponent(
      `Olá ${rec.clienteNome}!\n\n` +
      `Tudo bem? Passando para lembrar que seu veículo ${rec.veiculoInfo} realizou a ${rec.servicoOriginal} na ${NOME_EMPRESA} e está na hora de fazer a sua ${rec.cicloAtual}!\n\n` +
      `A manutenção preventiva é essencial para proteger o brilho e a camada de proteção da pintura.\n\n` +
      `Podemos agendar o seu horário para esta semana?\n\n` +
      `Atenciosamente,\nFreze`
    );
    const destino = this.getEmailAtualCliente(rec);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(destino)}&su=${assunto}&body=${corpo}`;
  }

  // Dispara (abre o cliente de e-mail) o lembrete de um lembrete específico.
  dispararLembreteEmail(rec) {
    const email = this.getEmailAtualCliente(rec);
    if (!rec || !email) {
      alert(`O cliente ${rec ? rec.clienteNome : ''} não possui e-mail cadastrado. Cadastre o e-mail do cliente para enviar o lembrete.`);
      return;
    }
    // Atualiza a cópia do lembrete com o e-mail atual (mantém consistência p/ disparo em lote).
    if (rec) rec.clienteEmail = email;
    // Abre o Gmail (compose) em NOVA ABA, com destinatário e mensagem prontos.
    // Assim o AutoPulse não fecha e não aparece o seletor de aplicativo do SO.
    const url = this.getRecurrenceEmailUrl(rec);
    const novaAba = window.open(url, '_blank');
    if (!novaAba) window.location.href = url; // fallback se o popup for bloqueado
    // Marca como enviado para não disparar de novo ao recarregar (igual à Daderio).
    rec.avisoEnviado = true;
    this.saveData();
  }

  // Dispara em lote todos os lembretes pendentes por e-mail (botão manual).
  dispararLembretesPendentes() {
    const pendentes = this.data.recorrencias.filter(r =>
      (r.status === 'ALERTA MANUTENÇÃO' || r.status === 'VENCIDO') && !r.avisoEnviado
    );
    if (pendentes.length === 0) {
      alert('Nenhum lembrete pendente para disparar.');
      return;
    }
    const comEmail = pendentes.filter(r => this.getEmailAtualCliente(r));
    const semEmail = pendentes.filter(r => !this.getEmailAtualCliente(r));
    if (comEmail.length === 0) {
      alert('Nenhum dos lembretes pendentes possui e-mail cadastrado. Cadastre o e-mail dos clientes para enviar.');
      return;
    }
    if (!confirm(`Disparar ${comEmail.length} lembrete(s) por e-mail?\n\nO sistema abre o 1º e-mail agora. Os demais (${comEmail.length - 1}) serão marcados como enviados para não abrir várias janelas de uma vez — se preferir, dispare um a um na lista de lembretes.`)) return;
    // Abre o primeiro e-mail; os demais ficam marcados como enviados para
    // evitar abrir dezenas de janelas de e-mail de uma vez.
    this.dispararLembreteEmail(comEmail[0]);
    for (let i = 1; i < comEmail.length; i++) {
      comEmail[i].avisoEnviado = true;
    }
    if (semEmail.length > 0) {
      alert(`1º e-mail aberto. ${comEmail.length - 1} lembrete(s) marcado(s) como enviado(s).\n${semEmail.length} foi(ram) pulado(s) por não ter(em) e-mail cadastrado.`);
    } else {
      alert(`1º e-mail aberto. ${comEmail.length - 1} lembrete(s) marcado(s) como enviado(s) (dispare um a um se quiser reenviar).`);
    }
    this.saveData();
    this.renderRecorrencias();
    this.renderDashboard();
  }

  getRecurrenceWhatsAppUrl(rec) {
    const msg = `Olá *${rec.clienteNome}*! Tudo bem?%0A%0APassando para lembrar que seu veículo *${rec.veiculoInfo}* realizou a *${rec.servicoOriginal}* na *${NOME_EMPRESA}* e está na hora de fazer a sua *${rec.cicloAtual}*!%0A%0AA manutenção preventiva é essencial para proteger o brilho e a camada de proteção da pintura.%0A%0APodemos agendar o seu horário para esta semana?`;
    return `https://api.whatsapp.com/send?phone=${rec.clienteWhats}&text=${msg}`;
  }

  getGoogleCalendarUrl(rec) {
    const dateStr = rec.dataGatilhoAlerta ? rec.dataGatilhoAlerta.replace(/-/g, '') : new Date().toISOString().split('T')[0].replace(/-/g, '');
    const title = encodeURIComponent(`🔔 LEMBRETE DE MANUTENÇÃO: ${rec.clienteNome} (${rec.veiculoInfo})`);
    const details = encodeURIComponent(`Lembrete de manutenção para a ${rec.cicloAtual} do veículo ${rec.veiculoInfo}.%0ACliente: ${rec.clienteNome}%0AWhatsApp: ${rec.clienteWhats}%0A%0AAcessar o CRM para disparar a mensagem no WhatsApp.`);
    const dates = `${dateStr}T090000/${dateStr}T100000`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}`;
  }

  editarLembrete(recId) {
    const r = this.data.recorrencias.find(item => item.id === recId);
    if (!r) return;

    document.getElementById('edit-rec-id').value = r.id;
    document.getElementById('edit-rec-cliente').value = r.clienteNome;
    document.getElementById('edit-rec-veiculo').value = r.veiculoInfo;
    document.getElementById('edit-rec-ciclo').value = r.cicloAtual;
    document.getElementById('edit-rec-status').value = r.status;
    document.getElementById('edit-rec-data-app').value = r.dataAplicacao;
    document.getElementById('edit-rec-data-75').value = r.dataGatilhoAlerta;
    document.getElementById('edit-rec-data-90').value = r.dataLimite90d;

    this.openModal('modal-editar-lembrete');
  }

  saveEditarLembrete() {
    const id = document.getElementById('edit-rec-id').value;
    const r = this.data.recorrencias.find(item => item.id === id);
    if (!r) return;

    r.clienteNome = document.getElementById('edit-rec-cliente').value;
    r.veiculoInfo = document.getElementById('edit-rec-veiculo').value;
    r.cicloAtual = document.getElementById('edit-rec-ciclo').value;
    r.status = document.getElementById('edit-rec-status').value;
    r.dataAplicacao = document.getElementById('edit-rec-data-app').value;
    r.dataGatilhoAlerta = document.getElementById('edit-rec-data-75').value;
    r.dataLimite90d = document.getElementById('edit-rec-data-90').value;

    this.saveData();
    this.closeModal('modal-editar-lembrete');
    this.renderRecorrencias();
    this.renderDashboard();
    alert('Lembrete atualizado com sucesso!');
  }

  deleteLembrete(recId) {
    if (confirm('Tem certeza que deseja excluir este lembrete de manutenção?')) {
      this.data.recorrencias = this.data.recorrencias.filter(r => r.id !== recId);
      this.saveData();
      this.renderRecorrencias();
      this.renderDashboard();
    }
  }

  concluirManutencao(recId) {
    const rec = this.data.recorrencias.find(r => r.id === recId);
    if (!rec) return;

    const dataConclusao = prompt(`Confirmar conclusão da ${rec.cicloAtual} para ${rec.clienteNome}? Informe a data da realização:`, new Date().toISOString().split('T')[0]);
    if (!dataConclusao) return;

    rec.status = 'CONCLUÍDO';

    let proximoCiclo = '2ª Manutenção de Vitrificação';
    if (rec.cicloAtual.includes('1ª')) proximoCiclo = '2ª Manutenção de Vitrificação';
    else if (rec.cicloAtual.includes('2ª')) proximoCiclo = '3ª Manutenção de Vitrificação';
    else if (rec.cicloAtual.includes('3ª')) proximoCiclo = '4ª Manutenção de Vitrificação';

    const dataApp = new Date(dataConclusao);
    const dataAlerta = new Date(dataApp);
    dataAlerta.setDate(dataAlerta.getDate() + 75); // próximo lembrete em 75 dias
    const dataLimite = new Date(dataApp);
    dataLimite.setDate(dataLimite.getDate() + 90); // prazo limite em 90 dias

    const novoCiclo = {
      id: 'rec-' + Date.now(),
      clienteId: rec.clienteId,
      clienteNome: rec.clienteNome,
      clienteWhats: rec.clienteWhats,
      veiculoInfo: rec.veiculoInfo,
      servicoOriginal: rec.servicoOriginal,
      cicloAtual: proximoCiclo,
      dataAplicacao: dataConclusao,
      dataGatilhoAlerta: dataAlerta.toISOString().split('T')[0],
      dataLimite90d: dataLimite.toISOString().split('T')[0],
      status: 'EM ANDAMENTO'
    };

    this.data.recorrencias.push(novoCiclo);
    this.saveData();
    alert(`Manutenção concluída! Novo ciclo registrado: ${proximoCiclo} agendada para daqui a 30 dias.`);
    this.renderRecorrencias();
    this.renderDashboard();
  }

  // ==========================================
  // DASHBOARD
  // ==========================================
  renderDashboard() {
    const totalFat = this.data.financeiro
      .filter(f => f.tipo === 'Receita')
      .reduce((sum, item) => sum + item.valor, 0);

    document.getElementById('dash-faturamento').innerText = `R$ ${totalFat.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    
    // Contar orçamentos finalizados como atendimentos reais
    const orcFinalizados = this.data.orcamentos.filter(o => this.isOrcamentoFinalizado(o.status));
    document.getElementById('dash-veiculos').innerText = orcFinalizados.length;

    const ticket = orcFinalizados.length ? totalFat / orcFinalizados.length : 0;
    document.getElementById('dash-ticket').innerText = `R$ ${ticket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    const alertas = this.data.recorrencias.filter(r => r.status === 'ALERTA MANUTENÇÃO' || r.status === 'VENCIDO');
    document.getElementById('dash-alertas-count').innerText = alertas.length;

    const tbody = document.getElementById('dash-alertas-tbody');
    if (tbody) {
      if (alertas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 20px;">Nenhum lembrete de manutenção pendente no momento.</td></tr>`;
      } else {
        tbody.innerHTML = alertas.map(rec => `
          <tr>
            <td><strong>${rec.clienteNome}</strong></td>
            <td>${rec.veiculoInfo}</td>
            <td>${rec.servicoOriginal} (${rec.cicloAtual})</td>
            <td>${this.formatDate(rec.dataAplicacao)}</td>
            <td>
              <span class="badge ${rec.status === 'VENCIDO' ? 'badge-danger' : 'badge-warning'}">
                <i class="fa-solid fa-triangle-exclamation"></i> ${rec.status}
              </span>
            </td>
            <td>${this.formatDate(rec.dataLimite90d)}</td>
            <td>
              <button class="btn btn-sm btn-email" onclick="app.dispararLembreteEmail(app.data.recorrencias.find(x=>x.id==='${rec.id}'))">
                <i class="fa-solid fa-envelope"></i> Enviar E-mail
              </button>
              <a href="${this.getGoogleCalendarUrl(rec)}" target="_blank" class="btn btn-sm btn-secondary" title="Salvar no Google Agenda">
                <i class="fa-solid fa-calendar-plus text-primary"></i> Agenda
              </a>
              <button class="btn btn-sm btn-primary" onclick="app.concluirManutencao('${rec.id}')">
                <i class="fa-solid fa-check"></i> Concluir
              </button>
            </td>
          </tr>
        `).join('');
      }
    }

    // Today's Appointments
    const hojeStr = new Date().toISOString().split('T')[0];
    const agdToday = this.data.agendamentos.filter(a => a.data === hojeStr);
    const agdContainer = document.getElementById('dash-agenda-today');

    if (agdContainer) {
      if (agdToday.length === 0) {
        agdContainer.innerHTML = `<p class="text-muted">Nenhum agendamento marcado para hoje (${this.formatDate(hojeStr)}).</p>`;
      } else {
        agdContainer.innerHTML = agdToday.map(a => `
          <div class="agenda-item-card mb-2">
            <div class="agenda-item-main">
              <span class="agenda-item-time">${a.hora}</span>
              <div class="agenda-item-info">
                <h4>${a.clienteInfo}</h4>
                <p>${a.servico}</p>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // Recent Orçamentos
    const recOrcContainer = document.getElementById('dash-orcamentos-recientes');
    if (recOrcContainer) {
      recOrcContainer.innerHTML = this.data.orcamentos.slice(-3).map(o => `
        <div class="summary-line mb-2" style="border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
          <div>
            <strong>${o.id}</strong> — ${o.clienteNome}<br>
            <small class="text-muted">${o.veiculoInfo}</small>
            <span class="badge ${this.getOrcamentoStatusBadge(o.status)}" style="font-size:0.7rem; margin-left:6px;">${this.getOrcamentoStatusLabel(o.status)}</span>
          </div>
          <div class="text-right">
            <strong class="text-primary">R$ ${o.valorTotal.toFixed(2)}</strong><br>
            <button class="btn btn-sm btn-secondary" onclick="app.imprimirPDF('${o.id}')"><i class="fa-solid fa-print"></i> PDF</button>
          </div>
        </div>
      `).join('');
    }
  }

  // ==========================================
  // ORÇAMENTOS & PDF (NOVO FLUXO DE APROVAÇÃO)
  // ==========================================
  renderOrcamentoForm() {
    const cliSelect = document.getElementById('orc-cliente-select');
    const veiSelect = document.getElementById('orc-veiculo-select');
    
    const selectedCliId = cliSelect ? cliSelect.value : '';
    const selectedVeiVal = veiSelect ? veiSelect.value : '';

    if (cliSelect) {
      const optionsHtml = '<option value="">-- Selecione o Cliente --</option>' +
        this.data.clientes.map(c => `<option value="${c.id}">${c.nome} (${c.whatsapp})</option>`).join('');
      
      cliSelect.innerHTML = optionsHtml;
      if (selectedCliId) {
        cliSelect.value = selectedCliId;
      }
    }

    if (selectedCliId && veiSelect) {
      const cliente = this.data.clientes.find(c => c.id === selectedCliId);
      if (cliente && cliente.veiculos.length) {
        veiSelect.disabled = false;
        veiSelect.innerHTML = cliente.veiculos.map(v =>
          `<option value="${v.modelo} (${v.placa})" data-cat="${v.categoria}">${v.modelo} — Placa ${v.placa} (${v.categoria})</option>`
        ).join('');
        if (selectedVeiVal) {
          veiSelect.value = selectedVeiVal;
        }
      }
    }

    this.renderServicesCheckboxes();
  }

  renderServicesCheckboxes() {
    const container = document.getElementById('orc-services-checkboxes');
    if (!container) return;

    container.innerHTML = this.data.servicos.map(s => {
      const preco = s.precos[this.currentCategory] || 0;
      return `
        <div class="service-chk-item" data-id="${s.id}" onclick="app.toggleServiceSelection('${s.id}')">
          <div class="service-chk-left">
            <input type="checkbox" value="${s.id}" id="chk-${s.id}" ${this.selectedServiceIds.includes(s.id) ? 'checked' : ''}>
            <div class="service-chk-info">
              <h5>${s.nome}</h5>
              <p>${s.checklist.slice(0, 2).join(', ')}...</p>
            </div>
          </div>
          <div class="service-chk-price">
            R$ ${preco.toFixed(2)}
          </div>
        </div>
      `;
    }).join('');
  }

  populateVeiculosSelect(clienteId) {
    const veiSelect = document.getElementById('orc-veiculo-select');
    if (!veiSelect) return;

    const cliente = this.data.clientes.find(c => c.id === clienteId);
    if (!cliente || !cliente.veiculos.length) {
      veiSelect.innerHTML = '<option value="">-- Nenhum veículo cadastrado --</option>';
      veiSelect.disabled = true;
      return;
    }

    veiSelect.disabled = false;
    veiSelect.innerHTML = cliente.veiculos.map(v =>
      `<option value="${v.modelo} (${v.placa})" data-cat="${v.categoria}">${v.modelo} — Placa ${v.placa} (${v.categoria})</option>`
    ).join('');

    if (cliente.veiculos.length > 0) {
      const cat = cliente.veiculos[0].categoria;
      this.setCategoryRadio(cat, false);
    }
  }

  setCategoryRadio(cat, updateCheckboxesOnly = true) {
    this.currentCategory = cat;
    document.querySelectorAll('input[name="categoria_veiculo"]').forEach(radio => {
      radio.checked = (radio.value === cat);
      const label = radio.closest('.cat-btn');
      if (label) {
        if (radio.value === cat) label.classList.add('active');
        else label.classList.remove('active');
      }
    });

    if (updateCheckboxesOnly) {
      this.renderServicesCheckboxes();
    }
    this.recalculateOrcamento();
  }

  toggleServiceSelection(srvId) {
    const idx = this.selectedServiceIds.indexOf(srvId);
    if (idx >= 0) {
      this.selectedServiceIds.splice(idx, 1);
    } else {
      this.selectedServiceIds.push(srvId);
    }
    this.renderServicesCheckboxes();
    this.recalculateOrcamento();
  }

  renderExtraItems() {
    const ul = document.getElementById('extra-items-ul');
    if (!ul) return;
    ul.innerHTML = this.extraItems.map((item, idx) => `
      <li class="summary-line">
        <span>${item.nome}</span>
        <strong>R$ ${item.preco.toFixed(2)} <i class="fa-solid fa-trash text-danger" style="cursor:pointer;" onclick="app.removeExtra(${idx})"></i></strong>
      </li>
    `).join('');
  }

  removeExtra(idx) {
    this.extraItems.splice(idx, 1);
    this.renderExtraItems();
    this.recalculateOrcamento();
  }

  recalculateOrcamento() {
    let valorTotal = 0;

    this.selectedServiceIds.forEach(id => {
      const s = this.data.servicos.find(srv => srv.id === id);
      if (s) {
        valorTotal += (s.precos[this.currentCategory] || 0);
      }
    });

    this.extraItems.forEach(item => {
      valorTotal += item.preco;
    });

    const elTotal = document.getElementById('orc-valor-total');
    if (elTotal) elTotal.innerText = `R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  }

  // NOVO: Criar Orçamento como PENDENTE (NÃO gera lembrete ainda)
  saveOrcamento() {
    const cliId = document.getElementById('orc-cliente-select').value;
    const cliente = this.data.clientes.find(c => c.id === cliId);
    const veiInfo = document.getElementById('orc-veiculo-select').value;

    if (!cliente || !veiInfo || this.selectedServiceIds.length === 0) {
      alert('Por favor selecione o Cliente, Veículo e ao menos 1 Serviço!');
      return;
    }

    let valorTotal = 0;

    this.selectedServiceIds.forEach(id => {
      const s = this.data.servicos.find(srv => srv.id === id);
      const price = s.precos[this.currentCategory] || 0;
      valorTotal += price;
    });

    this.extraItems.forEach(item => valorTotal += item.preco);

    const novoOrc = {
      id: 'ORC-' + Math.floor(1000 + Math.random() * 9000),
      clienteId: cliente.id,
      clienteNome: cliente.nome,
      clienteWhats: cliente.whatsapp,
      clienteEmail: cliente.email || '',
      veiculoInfo: veiInfo,
      categoriaVeiculo: this.currentCategory,
      servicosIds: [...this.selectedServiceIds],
      itensExtras: [...this.extraItems],
      valorTotal: valorTotal,
      status: 'PENDENTE', // NOVO: Inicia como Pendente!
      observacoes: document.getElementById('orc-observacoes').value,
      data: new Date().toISOString().split('T')[0]
    };

    this.data.orcamentos.unshift(novoOrc);
    this.saveData();

    // Reset Form
    this.selectedServiceIds = [];
    this.extraItems = [];
    this.renderExtraItems();
    this.renderOrcamentoForm();
    this.recalculateOrcamento();
    this.renderOrcamentosList();
    this.renderDashboard();

    alert(`Orçamento ${novoOrc.id} criado com sucesso! Status: PENDENTE.\nEnvie o PDF ao cliente para aprovação.`);
    this.imprimirPDF(novoOrc.id);
  }

  // APROVAR ORÇAMENTO: marca como Aprovado e abre o agendamento do serviço.
  // O agendamento é criado automaticamente a partir da data/horário escolhidos.
  aprovarOrcamento(orcId) {
    const orc = this.data.orcamentos.find(o => o.id === orcId);
    if (!orc) return;

    // Se já estiver aprovado/concluído, não abre o fluxo de agendamento de novo.
    if (orc.status === 'APROVADO' || orc.status === 'CONCLUÍDO') {
      alert(`O orçamento ${orc.id} já está com status "${orc.status}".`);
      return;
    }

    if (!confirm(`Aprovar o Orçamento ${orc.id} de ${orc.clienteNome}?\n\nNa próxima etapa você escolherá a Data e o Horário do serviço, que serão adicionados automaticamente à Agenda.`)) {
      return;
    }

    // Marca como aprovado e registra financeiro/lembretes (1ª vez saindo de Pendente).
    const cliente = this.data.clientes.find(c => c.id === orc.clienteId);
    if (cliente) cliente.totalGasto = (cliente.totalGasto || 0) + orc.valorTotal;

    this.data.financeiro.unshift({
      id: 'fin-' + Date.now(),
      descricao: `Orçamento ${orc.id} — ${orc.clienteNome} (Aprovado)`,
      tipo: 'Receita',
      valor: orc.valorTotal,
      data: new Date().toISOString().split('T')[0]
    });

    orc.status = 'APROVADO';
    this.criarLembretesDoOrcamento(orc);

    this.saveData();
    this.renderOrcamentosList();
    this.renderDashboard();
    this.renderRecorrencias();
    this.renderFinanceiro();

    // Abre o modal para agendar o serviço recém-aprovado.
    this.abrirModalAgendamentoOrcamento(orcId);
  }

  // Concluir o serviço (após a execução). Apenas atualiza o status.
  concluirOrcamento(orcId) {
    const orc = this.data.orcamentos.find(o => o.id === orcId);
    if (!orc) return;

    if (orc.status === 'CONCLUÍDO') {
      alert(`O orçamento ${orc.id} já está marcado como Serviço Concluído.`);
      return;
    }

    if (!confirm(`Marcar o serviço do Orçamento ${orc.id} (${orc.clienteNome}) como CONCLUÍDO?\nUse esta opção somente após o atendimento ser realizado.`)) {
      return;
    }

    orc.status = 'CONCLUÍDO';
    this.saveData();
    this.renderOrcamentosList();
    this.renderDashboard();
    alert(`Serviço do orçamento ${orc.id} concluído!`);
  }

  // Abre o modal de agendamento já pré-preenchido com os dados do orçamento aprovado.
  abrirModalAgendamentoOrcamento(orcId) {
    const orc = this.data.orcamentos.find(o => o.id === orcId);
    if (!orc) return;

    document.getElementById('agd-orc-id').value = orcId;

    // Data sugerida: hoje; Horário padrão: 09:00
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('agd-orc-data').value = hoje;
    document.getElementById('agd-orc-hora').value = '09:00';

    // Pré-seleciona cliente/veículo no select (formato "Nome — Modelo (Placa)")
    const sel = document.getElementById('agd-orc-cliente-veiculo');
    this.populateAgendamentoSelect(sel);
    const match = `${orc.clienteNome} — ${orc.veiculoInfo}`;
    if ([...sel.options].some(opt => opt.value === match)) {
      sel.value = match;
    }

    // Pré-preenche o serviço com os nomes dos serviços do orçamento
    const nomes = orc.servicosIds.map(id => {
      const s = this.data.servicos.find(x => x.id === id);
      return s ? s.nome : '';
    }).filter(Boolean);
    document.getElementById('agd-orc-servico').value = nomes.join(' + ') || orc.veiculoInfo;

    this.openModal('modal-agendamento-orcamento');
  }

  // Salva o agendamento vindo da aprovação do orçamento e o vincula ao mesmo.
  saveAgendamentoOrcamento() {
    const orcId = document.getElementById('agd-orc-id').value;
    const data = document.getElementById('agd-orc-data').value;
    const hora = document.getElementById('agd-orc-hora').value;
    const clienteInfo = document.getElementById('agd-orc-cliente-veiculo').value;
    const servico = document.getElementById('agd-orc-servico').value;

    if (!data || !hora || !clienteInfo || !servico) {
      alert('Preencha Data, Horário, Cliente/Veículo e Serviço!');
      return;
    }

    const novoTipo = 'agendamento-orcamento';
    this.data.agendamentos.push({
      id: 'agd-' + Date.now(),
      data, hora, clienteInfo, servico,
      origem: novoTipo,
      orcamentoId: orcId
    });

    const orc = this.data.orcamentos.find(o => o.id === orcId);
    if (orc) {
      orc.agendamento = { data, hora };
    }

    this.saveData();
    this.closeModal('modal-agendamento-orcamento');
    this.renderAgenda();
    this.renderDashboard();
    this.renderOrcamentosList();
    // Passo 7 do fluxo: só depois de confirmar o agendamento, oferece envio de confirmação pelo WhatsApp.
    if (orc) {
      this.abrirModalConfirmarAgendamento(orc, { data, hora, clienteInfo, servico });
    } else {
      alert(`Serviço agendado com sucesso!\n\n${clienteInfo}\n${this.formatDate(data)} às ${hora}\n\nO agendamento foi adicionado à Agenda.`);
    }
  }

  // Abre o modal de confirmação de agendamento com a mensagem de WhatsApp pré-preenchida (editável).
  abrirModalConfirmarAgendamento(orc, ag) {
    document.getElementById('conf-orc-id').value = orc.id;
    const texto =
      `✅ Agendamento confirmado!\n\n` +
      `*Cliente:* ${orc.clienteNome}\n` +
      `*Veículo:* ${orc.veiculoInfo}\n` +
      `*Serviço:* ${ag.servico}\n` +
      `*Data:* ${this.formatDate(ag.data)}\n` +
      `*Horário:* ${ag.hora}\n\n` +
      `Aguardamos você! 🚗\nQualquer dúvida, estamos à disposição.`;
    document.getElementById('conf-msg').value = texto;
    this.openModal('modal-confirma-agendamento');
  }

  // Abre o WhatsApp do cliente com a mensagem de confirmação (já editada no textarea).
  // Abre em NOVA ABA (window.open) para não fechar/substituir o sistema na aba atual.
  enviarConfirmacaoWhatsApp() {
    const orcId = document.getElementById('conf-orc-id').value;
    const orc = this.data.orcamentos.find(o => o.id === orcId);
    if (!orc) return;
    const texto = document.getElementById('conf-msg').value;
    const url = this.montarWhatsAppUrl(orc.clienteWhats, texto);
    const novaAba = window.open(url, '_blank');
    // Fallback caso o navegador bloqueie o popup: troca a aba atual.
    if (!novaAba) window.location.href = url;
  }

  criarLembretesDoOrcamento(orc) {
    orc.servicosIds.forEach(id => {
      const srv = this.data.servicos.find(s => s.id === id);
      // Gera lembrete para todo serviço de Polimento (categoria "Polimentos")
      // ou para qualquer serviço que tenha a flag explícita geraRecorrencia.
      if (!srv) return;
      const ehPolimento = srv.categoria === 'Polimentos';
      if (!ehPolimento && !srv.geraRecorrencia) return;

      const duplicado = this.data.recorrencias.some(r =>
        r.clienteId === orc.clienteId &&
        r.veiculoInfo === orc.veiculoInfo &&
        r.servicoOriginal === srv.nome &&
        r.status !== 'CONCLUÍDO'
      );
      if (duplicado) return;

      const dataApp = new Date();
      const dataAlerta = new Date(dataApp);
      dataAlerta.setDate(dataAlerta.getDate() + 75); // disparo do lembrete (75 dias)
      const dataLimite = new Date(dataApp);
      dataLimite.setDate(dataLimite.getDate() + 90); // prazo limite (90 dias)

      this.data.recorrencias.push({
        id: 'rec-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        clienteId: orc.clienteId,
        clienteNome: orc.clienteNome,
        clienteWhats: orc.clienteWhats,
        clienteEmail: orc.clienteEmail || '',
        veiculoInfo: orc.veiculoInfo,
        servicoOriginal: srv.nome,
        cicloAtual: '1ª Manutenção de Vitrificação',
        dataAplicacao: dataApp.toISOString().split('T')[0],
        dataGatilhoAlerta: dataAlerta.toISOString().split('T')[0],
        dataLimite90d: dataLimite.toISOString().split('T')[0],
        status: 'EM ANDAMENTO'
      });
    });
  }

  // Retorna o texto amigável do status (clareza para o usuário)
  getOrcamentoStatusLabel(status) {
    if (status === 'APROVADO') return 'Aprovado';
    if (status === 'CONCLUÍDO') return 'Serviço Concluído';
    return 'Pendente';
  }

  getOrcamentoStatusBadge(status) {
    if (status === 'APROVADO') return 'badge-approved';
    if (status === 'CONCLUÍDO') return 'badge-concluded';
    return 'badge-pending';
  }

  getOrcamentoStatusIcon(status) {
    if (status === 'APROVADO') return 'fa-check';
    if (status === 'CONCLUÍDO') return 'fa-flag-checkered';
    return 'fa-clock';
  }

  isOrcamentoFinalizado(status) {
    return status === 'APROVADO' || status === 'CONCLUÍDO';
  }

  // Texto curto exibido no botão de agendamento quando já aprovado
  getTemAgendamento(orc) {
    return !!(orc && orc.agendamento && orc.agendamento.data);
  }

  renderOrcamentosList() {
    const tbody = document.getElementById('orcamentos-list-tbody');
    if (!tbody) return;

    if (this.data.orcamentos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding:20px;">Nenhum orçamento salvo.</td></tr>`;
      return;
    }

    tbody.innerHTML = this.data.orcamentos.map(o => `
      <tr class="orc-row">
        <td data-label="Código"><strong>${o.id}</strong></td>
        <td data-label="Cliente / Veículo">
          <strong>${o.clienteNome}</strong><br>
          <small class="text-muted">${o.veiculoInfo}</small>
        </td>
        <td data-label="Status">
          <span class="badge ${this.getOrcamentoStatusBadge(o.status)}">
            <i class="fa-solid ${this.getOrcamentoStatusIcon(o.status)}"></i> ${this.getOrcamentoStatusLabel(o.status)}
          </span>
          ${this.getTemAgendamento(o) ? `<div class="orc-agendamento-info text-muted" style="font-size:0.72rem; margin-top:4px;"><i class="fa-solid fa-calendar-check text-success"></i> ${this.formatDate(o.agendamento.data)} ${o.agendamento.hora}</div>` : ''}
        </td>
        <td data-label="Valor" class="text-primary font-weight-bold">R$ ${o.valorTotal.toFixed(2)}</td>
        <td data-label="Data">${this.formatDate(o.data)}</td>
        <td data-label="Ações" class="table-actions">
          ${!this.isOrcamentoFinalizado(o.status) ? `
            <button class="btn btn-sm btn-primary" onclick="app.aprovarOrcamento('${o.id}')" title="Aprovar Orçamento e agendar serviço">
              <i class="fa-solid fa-check"></i> Aprovar
            </button>
          ` : `
            ${!this.getTemAgendamento(o) ? `
              <button class="btn btn-sm btn-secondary" onclick="app.abrirModalAgendamentoOrcamento('${o.id}')" title="Agendar serviço do orçamento aprovado">
                <i class="fa-solid fa-calendar-plus"></i> Agendar
              </button>
            ` : ''}
            <button class="btn btn-sm btn-success" onclick="app.concluirOrcamento('${o.id}')" title="Marcar serviço como concluído (após execução)">
              <i class="fa-solid fa-flag-checkered"></i> Concluir
            </button>
          `}
          <button class="btn btn-sm btn-secondary" onclick="app.imprimirPDF('${o.id}')" title="Gerar PDF">
            <i class="fa-solid fa-file-pdf text-danger"></i> PDF
          </button>
          <a href="${this.getWhatsAppOrcamentoUrl(o)}" target="_blank" class="btn btn-sm btn-whatsapp" title="Enviar no WhatsApp">
            <i class="fa-brands fa-whatsapp"></i> Enviar
          </a>
          <button class="btn btn-sm btn-danger" onclick="app.deleteOrcamento('${o.id}')" title="Excluir Orçamento">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  // Monta link do WhatsApp (wa.me) com o texto já codificado.
  montarWhatsAppUrl(telefone, texto) {
    const num = String(telefone || '').replace(/\D/g, '');
    return `https://wa.me/${num}?text=${encodeURIComponent(texto)}`;
  }

  // Mensagem de envio do orçamento ao cliente (passo 2 do fluxo).
  getWhatsAppOrcamentoUrl(orc) {
    const texto =
      `Olá, ${orc.clienteNome}! Tudo bem?\n\n` +
      `Conforme conversamos, estou enviando seu orçamento referente ao veículo ${orc.veiculoInfo}.\n\n` +
      `O orçamento completo está em anexo (use o botão "PDF" na lista para anexá-lo).\n\n` +
      `Qualquer dúvida, estou à disposição!`;
    return this.montarWhatsAppUrl(orc.clienteWhats, texto);
  }

  imprimirPDF(orcId) {
    const o = this.data.orcamentos.find(item => item.id === orcId);
    if (!o) return;

    document.getElementById('pdf-codigo').innerText = `#${o.id}`;
    document.getElementById('pdf-data').innerText = this.formatDate(o.data);
    document.getElementById('pdf-cliente-nome').innerText = o.clienteNome;
    document.getElementById('pdf-cliente-whats').innerText = o.clienteWhats;
    document.getElementById('pdf-veiculo-info').innerText = o.veiculoInfo;
    document.getElementById('pdf-veiculo-cat').innerText = o.categoriaVeiculo;
    document.getElementById('pdf-observacoes-txt').innerText = o.observacoes || 'Nenhuma observação informada.';
    document.getElementById('pdf-valor-total').innerText = `R$ ${o.valorTotal.toFixed(2)}`;

    const container = document.getElementById('pdf-servicos-container');
    if (!container) return;

    let cardsHtml = '';

    o.servicosIds.forEach(id => {
      const s = this.data.servicos.find(srv => srv.id === id);
      if (s) {
        const preco = s.precos[o.categoriaVeiculo] || 0;
        cardsHtml += `
          <div class="pdf-service-card">
            <div class="pdf-service-card-header">
              <span class="pdf-service-title">${s.nome}</span>
              <span class="pdf-service-price">R$ ${preco.toFixed(2)}</span>
            </div>
            <ul class="pdf-checklist-bullets">
              ${s.checklist.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `;
      }
    });

    (o.itensExtras || []).forEach(item => {
      cardsHtml += `
        <div class="pdf-service-card">
          <div class="pdf-service-card-header">
            <span class="pdf-service-title">Item Extra: ${item.nome}</span>
            <span class="pdf-service-price">R$ ${item.preco.toFixed(2)}</span>
          </div>
          <ul class="pdf-checklist-bullets">
            <li>Item ou serviço adicional personalizado</li>
          </ul>
        </div>
      `;
    });

    container.innerHTML = cardsHtml;
    window.print();
  }

  // ==========================================
  // SERVIÇOS
  // ==========================================
  renderServicesCatalog() {
    const container = document.getElementById('services-cards-container');
    if (!container) return;

    container.innerHTML = this.data.servicos.map(s => `
      <div class="service-card">
        <div>
          <div class="service-card-header">
            <h4>${s.nome}</h4>
            <span class="badge badge-info">${s.categoria}</span>
          </div>
          
          <div class="checklist-box">
            <strong>Checklist de Execução:</strong>
            <ul>
              ${s.checklist.map(item => `<li><i class="fa-solid fa-check"></i> ${item}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div style="border-top:1px solid var(--border-color); padding-top:12px; margin-top:8px;">
          <small class="text-muted">Preços por Categoria:</small>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:0.8rem; margin-top:4px;">
            <div>Hatch: <strong class="text-primary">R$ ${s.precos.Hatch}</strong></div>
            <div>Sedan: <strong class="text-primary">R$ ${s.precos.Sedan}</strong></div>
            <div>SUV: <strong class="text-primary">R$ ${s.precos.SUV}</strong></div>
            <div>Caminhonete: <strong class="text-primary">R$ ${s.precos.Caminhonete}</strong></div>
          </div>
          <div style="margin-top:12px; text-align:right;">
            <button class="btn btn-sm btn-secondary" onclick="app.abrirModalEditarServico('${s.id}')" title="Editar Serviço">
              <i class="fa-solid fa-pen-to-square"></i> Editar
            </button>
            <button class="btn btn-sm btn-danger" onclick="app.deleteServico('${s.id}')">
              <i class="fa-solid fa-trash"></i> Excluir
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ==========================================
  // CRM CLIENTES & MÚLTIPLOS VEÍCULOS
  // ==========================================
  renderCRM(query = '') {
    const tbody = document.getElementById('crm-clientes-tbody');
    if (!tbody) return;

    const filtered = this.data.clientes.filter(c =>
      c.nome.toLowerCase().includes(query) ||
      c.whatsapp.includes(query) ||
      c.veiculos.some(v => v.placa.toLowerCase().includes(query) || v.modelo.toLowerCase().includes(query))
    );

    tbody.innerHTML = filtered.map(c => `
      <tr>
        <td data-label="Cliente"><strong>${c.nome}</strong><br><small class="text-muted">${c.email || ''}</small></td>
        <td data-label="WhatsApp"><i class="fa-brands fa-whatsapp text-success"></i> ${c.whatsapp}</td>
        <td data-label="Veículos">${c.veiculos.map(v => `<span class="badge badge-secondary" style="margin-bottom:2px; display:inline-block;">${v.modelo} (${v.placa})</span>`).join(' ')}</td>
        <td data-label="Total" class="text-primary font-weight-bold">R$ ${(c.totalGasto || 0).toFixed(2)}</td>
        <td data-label="Ações">
          <button class="btn btn-sm btn-secondary" onclick="app.viewClientDetails('${c.id}')" title="Ver Detalhes e Frota">
            <i class="fa-solid fa-eye"></i> Detalhes
          </button>
          <button class="btn btn-sm btn-secondary" onclick="app.editarCliente('${c.id}')" title="Editar Cliente">
            <i class="fa-solid fa-pen-to-square"></i> Editar
          </button>
          <button class="btn btn-sm btn-danger" onclick="app.deleteCliente('${c.id}')" title="Excluir Cliente">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  viewClientDetails(cliId) {
    const c = this.data.clientes.find(item => item.id === cliId);
    const body = document.getElementById('crm-client-detail-body');
    if (!c || !body) return;

    const orcs = this.data.orcamentos.filter(o => o.clienteId === c.id);

    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <h4>${c.nome}</h4>
        <div class="btn-group gap-1">
          <button class="btn btn-sm btn-secondary" onclick="app.editarCliente('${c.id}')">
            <i class="fa-solid fa-pen-to-square"></i> Editar Cliente
          </button>
          <button class="btn btn-sm btn-primary" onclick="app.abrirModalVeiculo('${c.id}')">
            <i class="fa-solid fa-car-tunnel"></i> + Adicionar Veículo
          </button>
          <button class="btn btn-sm btn-danger" onclick="app.deleteCliente('${c.id}')">
            <i class="fa-solid fa-trash"></i> Excluir
          </button>
        </div>
      </div>
      <p class="text-muted" style="margin-top:6px;"><i class="fa-solid fa-phone"></i> ${c.whatsapp} | <i class="fa-solid fa-envelope"></i> ${c.email || 'N/A'}</p>
      <p class="text-muted"><i class="fa-solid fa-location-dot"></i> ${c.endereco || 'Endereço não cadastrado'}</p>
      ${c.observacoes ? `<p class="text-muted" style="margin-top:8px;"><i class="fa-solid fa-note-sticky"></i> <strong>Obs:</strong> ${c.observacoes}</p>` : ''}
      <hr class="my-3">

      <h5>Frota Cadastrada (${c.veiculos.length} Veículos)</h5>
      <ul style="list-style:none; padding:0;" class="mb-3">
        ${c.veiculos.map(v => `
          <li class="vehicle-card">
            <div>
              <strong class="vehicle-model">${v.modelo}</strong> — Placa <code class="vehicle-placa">${v.placa}</code> (${v.categoria})<br>
              <small class="text-muted">Ano/Cor: ${v.anoCor || 'N/A'} | KM: ${v.km || 'N/A'}</small>
            </div>
            <div class="btn-group gap-1">
              <button class="btn btn-sm btn-secondary" onclick="app.abrirModalVeiculo('${c.id}', '${v.id}')" title="Editar Veículo">
                <i class="fa-solid fa-pen"></i> Editar
              </button>
              <button class="btn btn-sm btn-danger" onclick="app.deleteVeiculo('${c.id}', '${v.id}')" title="Excluir Veículo">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </li>
        `).join('')}
      </ul>

      <h5>Histórico de Atendimentos (${orcs.length})</h5>
      ${orcs.length === 0 ? '<p class="text-muted">Nenhum atendimento registrado ainda.</p>' : `
        <table class="table">
          <thead>
            <tr><th>Código</th><th>Data</th><th>Status</th><th>Valor</th></tr>
          </thead>
          <tbody>
            ${orcs.map(o => `
              <tr>
                <td>${o.id}</td>
                <td>${this.formatDate(o.data)}</td>
                <td><span class="badge ${this.getOrcamentoStatusBadge(o.status)}">${this.getOrcamentoStatusLabel(o.status)}</span></td>
                <td class="text-primary">R$ ${o.valorTotal.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `}
    `;
  }

  saveCliente() {
    const nome = document.getElementById('cli-nome').value;
    const whats = document.getElementById('cli-whatsapp').value.replace(/\D/g, '');
    const email = document.getElementById('cli-email').value;
    const endereco = document.getElementById('cli-endereco').value;
    const observacoes = document.getElementById('cli-observacoes')?.value || '';

    const modelo = document.getElementById('vei-modelo').value;
    const placa = document.getElementById('vei-placa').value.toUpperCase();
    const categoria = document.getElementById('vei-categoria').value;
    const anoCor = document.getElementById('vei-anocor').value;
    const km = document.getElementById('vei-km').value;

    const novoCli = {
      id: 'cli-' + Date.now(),
      nome,
      whatsapp: whats,
      email,
      endereco,
      observacoes,
      veiculos: [
        { id: 'vei-' + Date.now(), modelo, placa, categoria, anoCor, km }
      ],
      totalGasto: 0
    };

    this.data.clientes.push(novoCli);
    this.saveData();
    this.closeModal('modal-cliente');
    this.renderCRM();
    this.renderOrcamentoForm();
    alert(`Cliente ${nome} e veículo ${modelo} cadastrados!`);
  }

  // ==========================================
  // LEMBRETES & MANUTENÇÕES (EDIÇÃO E EXCLUSÃO)
  // ==========================================
  renderRecorrencias() {
    this.checkRecurrenceStatuses();
    const tbody = document.getElementById('recorrencia-table-tbody');
    if (!tbody) return;

    const ativas = this.data.recorrencias.filter(r => r.status !== 'CONCLUÍDO');

    document.getElementById('rec-stat-alerta').innerText = this.data.recorrencias.filter(r => r.status === 'ALERTA MANUTENÇÃO').length;
    document.getElementById('rec-stat-vencido').innerText = this.data.recorrencias.filter(r => r.status === 'VENCIDO').length;
    document.getElementById('rec-stat-concluidos').innerText = this.data.recorrencias.filter(r => r.status === 'CONCLUÍDO').length;

    if (ativas.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" class="text-center text-muted" style="padding: 20px;">Nenhum lembrete de manutenção ativo no momento.</td></tr>`;
      return;
    }

    tbody.innerHTML = ativas.map(r => `
      <tr>
        <td data-label="Cliente"><strong>${r.clienteNome}</strong><br><small class="text-muted">${r.clienteWhats}</small></td>
        <td data-label="Veículo">${r.veiculoInfo}</td>
        <td data-label="Serviço">${r.servicoOriginal}</td>
        <td data-label="Ciclo"><span class="badge badge-info">${r.cicloAtual}</span></td>
        <td data-label="Data Aplicação">${this.formatDate(r.dataAplicacao)}</td>
        <td data-label="Lembrete"><strong class="text-warning">${this.formatDate(r.dataGatilhoAlerta)}</strong></td>
        <td data-label="Prazo Limite"><strong class="text-danger">${this.formatDate(r.dataLimite90d)}</strong></td>
        <td data-label="Lembrete por E-mail">
          <button class="btn btn-sm btn-email" onclick="app.dispararLembreteEmail(app.data.recorrencias.find(x=>x.id==='${r.id}'))">
            <i class="fa-solid fa-envelope"></i> Enviar E-mail
          </button>
          <a href="${this.getGoogleCalendarUrl(r)}" target="_blank" class="btn btn-sm btn-secondary" title="Adicionar Lembrete no Google Agenda">
            <i class="fa-solid fa-calendar-plus text-primary"></i> Agenda
          </a>
        </td>
        <td data-label="Ações">
          <button class="btn btn-sm btn-primary" onclick="app.concluirManutencao('${r.id}')" title="Concluir e gerar próximo ciclo">
            <i class="fa-solid fa-check"></i> Concluir
          </button>
          <button class="btn btn-sm btn-secondary" onclick="app.editarLembrete('${r.id}')" title="Editar Lembrete">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="app.deleteLembrete('${r.id}')" title="Excluir Lembrete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  getGoogleCalendarUrlForAppointment(a) {
    const dateStr = a.data ? a.data.replace(/-/g, '') : new Date().toISOString().split('T')[0].replace(/-/g, '');
    const horaClean = a.hora ? a.hora.replace(':', '') : '0900';
    const title = encodeURIComponent(`🚘 AGENDAMENTO: ${a.clienteInfo}`);
    const details = encodeURIComponent(`Serviço: ${a.servico}\nData: ${a.data} às ${a.hora}\n\n${NOME_EMPRESA}`);
    const dates = `${dateStr}T${horaClean}00/${dateStr}T${parseInt(horaClean)+100}00`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}`;
  }

  // ==========================================
  // AGENDA EXPANDIDA (DIA, SEMANA, MÊS, PERÍODO, CALENDÁRIO)
  // ==========================================
  setAgendaFilterMode(mode) {
    this.agendaFilterMode = mode;
    ['btn-agenda-dia', 'btn-agenda-semana', 'btn-agenda-mes', 'btn-agenda-todos', 'btn-agenda-range'].forEach(id => {
      document.getElementById(id)?.classList.remove('active');
    });
    const btnMap = {
      day: 'btn-agenda-dia',
      week: 'btn-agenda-semana',
      month: 'btn-agenda-mes',
      all: 'btn-agenda-todos',
      range: 'btn-agenda-range'
    };
    document.getElementById(btnMap[mode])?.classList.add('active');

    const rangeEl = document.getElementById('agenda-range-filters');
    if (rangeEl) rangeEl.style.display = mode === 'range' ? 'flex' : 'none';

    this.renderAgenda();
  }

  goToAgendaToday() {
    const hoje = new Date().toISOString().split('T')[0];
    const picker = document.getElementById('agenda-date-picker');
    if (picker) picker.value = hoje;
    this.agendaCalendarMonth = new Date();
    this.setAgendaFilterMode('day');
  }

  navigateAgendaMonth(delta) {
    const d = new Date(this.agendaCalendarMonth);
    d.setMonth(d.getMonth() + delta);
    this.agendaCalendarMonth = d;
    this.renderAgendaCalendar();
  }

  selectAgendaDate(dateStr) {
    const picker = document.getElementById('agenda-date-picker');
    if (picker) picker.value = dateStr;
    this.setAgendaFilterMode('day');
  }

  getWeekBounds(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    const day = d.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const start = new Date(d);
    start.setDate(d.getDate() + mondayOffset);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  }

  getMonthBounds(dateStr) {
    const parts = dateStr.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    return { start, end };
  }

  dateInRange(dateStr, start, end) {
    const d = new Date(dateStr + 'T12:00:00');
    return d >= start && d <= end;
  }

  renderAgendaCalendar() {
    const container = document.getElementById('agenda-calendar-grid');
    if (!container) return;

    const monthDate = this.agendaCalendarMonth;
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const labelEl = document.getElementById('agenda-calendar-label');
    if (labelEl) labelEl.innerText = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPad = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const datesWithAgenda = new Set(this.data.agendamentos.map(a => a.data));
    const hojeStr = new Date().toISOString().split('T')[0];
    const selectedStr = document.getElementById('agenda-date-picker')?.value || hojeStr;

    let html = '<div class="cal-weekdays"><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span></div><div class="cal-days">';

    for (let i = 0; i < startPad; i++) {
      html += '<button type="button" class="cal-day cal-day-empty" disabled></button>';
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasAgenda = datesWithAgenda.has(dateStr);
      const isToday = dateStr === hojeStr;
      const isSelected = dateStr === selectedStr;
      html += `<button type="button" class="cal-day${hasAgenda ? ' has-events' : ''}${isToday ? ' is-today' : ''}${isSelected ? ' is-selected' : ''}" onclick="app.selectAgendaDate('${dateStr}')">${day}</button>`;
    }

    html += '</div>';
    container.innerHTML = html;
  }

  getAgendaPeriodLabel() {
    const picker = document.getElementById('agenda-date-picker');
    const selectedDate = picker?.value || new Date().toISOString().split('T')[0];

    if (this.agendaFilterMode === 'day') return this.formatDate(selectedDate);
    if (this.agendaFilterMode === 'week') {
      const { start, end } = this.getWeekBounds(selectedDate);
      return `${this.formatDate(start.toISOString().split('T')[0])} — ${this.formatDate(end.toISOString().split('T')[0])}`;
    }
    if (this.agendaFilterMode === 'month') {
      const { start } = this.getMonthBounds(selectedDate);
      const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      return `${monthNames[start.getMonth()]} ${start.getFullYear()}`;
    }
    if (this.agendaFilterMode === 'range') {
      const rs = document.getElementById('agenda-range-start')?.value;
      const re = document.getElementById('agenda-range-end')?.value;
      if (rs && re) return `${this.formatDate(rs)} — ${this.formatDate(re)}`;
      return 'Selecione o período';
    }
    return 'Todos os agendamentos';
  }

  renderAgenda() {
    const picker = document.getElementById('agenda-date-picker');
    if (!picker) return;
    if (!picker.value) picker.value = new Date().toISOString().split('T')[0];

    this.renderAgendaCalendar();

    const container = document.getElementById('agenda-list-container');
    const periodLabel = document.getElementById('agenda-period-label');
    if (periodLabel) periodLabel.innerText = this.getAgendaPeriodLabel();
    if (!container) return;

    let agdsFiltered = [];
    const selectedDate = picker.value;

    if (this.agendaFilterMode === 'day') {
      agdsFiltered = this.data.agendamentos.filter(a => a.data === selectedDate);
    } else if (this.agendaFilterMode === 'week') {
      const { start, end } = this.getWeekBounds(selectedDate);
      agdsFiltered = this.data.agendamentos.filter(a => this.dateInRange(a.data, start, end));
    } else if (this.agendaFilterMode === 'month') {
      const { start, end } = this.getMonthBounds(selectedDate);
      agdsFiltered = this.data.agendamentos.filter(a => this.dateInRange(a.data, start, end));
    } else if (this.agendaFilterMode === 'range') {
      const rs = document.getElementById('agenda-range-start')?.value;
      const re = document.getElementById('agenda-range-end')?.value;
      if (rs && re) {
        const start = new Date(rs + 'T00:00:00');
        const end = new Date(re + 'T23:59:59');
        agdsFiltered = this.data.agendamentos.filter(a => this.dateInRange(a.data, start, end));
      }
    } else {
      agdsFiltered = [...this.data.agendamentos];
    }

    agdsFiltered.sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora));

    const countEl = document.getElementById('agenda-count-label');
    if (countEl) countEl.innerText = `${agdsFiltered.length} agendamento${agdsFiltered.length !== 1 ? 's' : ''}`;

    if (agdsFiltered.length === 0) {
      container.innerHTML = `<div class="agenda-empty-state"><i class="fa-solid fa-calendar-xmark"></i><p>Nenhum agendamento encontrado para este período.</p></div>`;
      return;
    }

    container.innerHTML = agdsFiltered.map(a => `
      <div class="agenda-item-card">
        <div class="agenda-item-main">
          <span class="agenda-item-time">${a.hora}</span>
          <div class="agenda-item-info">
            <h4>${a.clienteInfo}</h4>
            <p>${a.servico} | <strong>${this.formatDate(a.data)}</strong></p>
          </div>
        </div>
        <div class="agenda-item-actions">
          <a href="${this.getGoogleCalendarUrlForAppointment(a)}" target="_blank" class="btn btn-sm btn-secondary" title="Salvar no Google Agenda">
            <i class="fa-solid fa-calendar-plus text-primary"></i> <span class="btn-label-hide-mobile">Google</span>
          </a>
          <button class="btn btn-sm btn-danger" onclick="app.deleteAgendamento('${a.id}')" title="Excluir Agendamento">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  populateAgendamentoSelect(targetSel) {
    const sel = targetSel || document.getElementById('agd-cliente-veiculo');
    if (!sel) return;
    sel.innerHTML = this.data.clientes.flatMap(c =>
      c.veiculos.map(v => `<option value="${c.nome} — ${v.modelo} (${v.placa})">${c.nome} — ${v.modelo} (${v.placa})</option>`)
    ).join('');
  }

  saveAgendamento() {
    const data = document.getElementById('agd-data').value;
    const hora = document.getElementById('agd-hora').value;
    const clienteInfo = document.getElementById('agd-cliente-veiculo').value;
    const servico = document.getElementById('agd-servico').value;

    this.data.agendamentos.push({
      id: 'agd-' + Date.now(),
      data, hora, clienteInfo, servico
    });

    this.saveData();
    this.closeModal('modal-agendamento');
    this.renderAgenda();
    this.renderDashboard();
    alert('Atendimento agendado com sucesso!');
  }

  // ==========================================
  // FINANCEIRO
  // ==========================================
  renderFinanceiro() {
    const finTbody = document.getElementById('financeiro-tbody');
    if (finTbody) {
      if (this.data.financeiro.length === 0) {
        finTbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted" style="padding:20px;">Nenhum lançamento financeiro registrado.</td></tr>`;
        return;
      }

      finTbody.innerHTML = this.data.financeiro.map(f => `
        <tr>
          <td data-label="Descrição">${f.descricao}</td>
          <td data-label="Tipo"><span class="badge ${f.tipo === 'Receita' ? 'badge-success' : 'badge-danger'}">${f.tipo}</span></td>
          <td data-label="Valor" class="font-weight-bold ${f.tipo === 'Receita' ? 'text-success' : 'text-danger'}">
            ${f.tipo === 'Receita' ? '+' : '-'} R$ ${f.valor.toFixed(2)}
          </td>
          <td data-label="Data">${this.formatDate(f.data)}</td>
          <td data-label="Ações">
            <button class="btn btn-sm btn-danger" onclick="app.deleteTransacao('${f.id}')" title="Excluir Lançamento">
              <i class="fa-solid fa-trash"></i> Excluir
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  saveTransacao() {
    const descricao = document.getElementById('fin-descricao').value;
    const tipo = document.getElementById('fin-tipo').value;
    const valor = parseFloat(document.getElementById('fin-valor').value);
    const data = document.getElementById('fin-data').value;

    if (!descricao || isNaN(valor) || valor <= 0 || !data) {
      alert('Preencha os campos corretamente!');
      return;
    }

    this.data.financeiro.unshift({
      id: 'fin-' + Date.now(),
      descricao,
      tipo,
      valor,
      data
    });

    this.saveData();
    this.closeModal('modal-transacao');
    this.renderFinanceiro();
    this.renderDashboard();
    alert('Lançamento financeiro salvo!');
  }

  // Backup & Utilities
  updateBadgesAndMetrics() {
    this.checkRecurrenceStatuses();
    const count = this.data.recorrencias.filter(r => r.status === 'ALERTA MANUTENÇÃO' || r.status === 'VENCIDO').length;
    const badge = document.getElementById('recorrencia-badge');
    if (badge) badge.innerText = count;
  }

  exportBackup() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-estetica-crm-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }

  importBackup(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (imported.clientes && imported.servicos) {
          this.data = imported;
          this.saveData();
          alert('Backup importado com sucesso!');
          location.reload();
        } else {
          alert('Arquivo JSON inválido.');
        }
      } catch (err) {
        alert('Erro ao importar backup JSON.');
      }
    };
    reader.readAsText(file);
  }

  formatDate(dateStr) {
    if (!dateStr) return '--';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
}

// Global App Instance
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new EsteticaCRM();
});
