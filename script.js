// ============================================================
//  PALAVRA DO DIA — PIOR RACHA
//  Lógica principal: data em Brasília + lista de palavras
// ============================================================

/**
 * Lista de palavras por data.
 * Formato da chave: "YYYY-MM-DD" (horário de Brasília).
 * Adicione quantas datas quiser — palavras futuras não aparecem.
 *
 * DICA: para cadastrar mais palavras, basta adicionar linhas
 * seguindo o padrão abaixo.
 */
const palavrasPorData = {
  "2025-01-01": "RACHA",
  "2025-01-02": "PIVÔ",
  "2025-01-03": "FINTA",

  /* ── Semana de exemplo a partir de hoje ── */
   "2026-06-14": "BAGRICE",
  "2026-06-16": "BAGRICE",
"2026-06-17": "CANELA",
"2026-06-18": "DM",
"2026-06-19": "CHUTEIRA",
"2026-06-20": "BAND-AID",
"2026-06-21": "RESENHA",
"2026-06-22": "PEREBA",
"2026-06-23": "AQUECIMENTO",
"2026-06-24": "CALANGO",
"2026-06-25": "IMPEDIMENTO",
"2026-06-26": "VÁRZEA",
"2026-06-27": "TORNOZELO",
"2026-06-28": "FRANGO",
"2026-06-29": "GOLEIRO",
"2026-06-30": "CÃIBRA",
"2026-07-01": "LOMBRA",
"2026-07-02": "TRIVELA",
"2026-07-03": "RACHÃO",
"2026-07-04": "BICUDA",
"2026-07-05": "CANETA",
"2026-07-06": "VARANDA",
"2026-07-07": "MIGUÉ",
"2026-07-08": "CARRINHO",
"2026-07-09": "FOMINHA",
"2026-07-10": "CASCUDO",
"2026-07-11": "PÉ-DE-RATO",
"2026-07-12": "BOLA-MURCHA",
"2026-07-13": "SEM-FREIO",
"2026-07-14": "LATERAL",
"2026-07-15": "PELOTA",
"2026-07-16": "MALÍCIA",
"2026-07-17": "GAMBETA",
"2026-07-18": "CANELADA",
"2026-07-19": "TAPETÃO",
"2026-07-20": "CHUVEIRINHO",
"2026-07-21": "BAGRE",
"2026-07-22": "CATIMBA",
"2026-07-23": "MASSAGISTA",
"2026-07-24": "PANCADA",
"2026-07-25": "SOCIETY",
"2026-07-26": "ESCANTEIO",
"2026-07-27": "REBATIDA",
"2026-07-28": "ZAGUEIRO",
"2026-07-29": "CAMISA",
"2026-07-30": "SUADOR",
"2026-07-31": "FÔLEGO",
"2026-08-01": "RASTEIRA",
"2026-08-02": "LENDA",
"2026-08-03": "QUEIMADO",
"2026-08-04": "PLACAR",
"2026-08-05": "BOTECO",
"2026-08-06": "MURALHA",
"2026-08-07": "PERNA",
"2026-08-08": "CRUZAMENTO",
"2026-08-09": "ESTALEIRO",
"2026-08-10": "FALTA",
"2026-08-11": "VESTIÁRIO",
"2026-08-12": "GRAMADO",
"2026-08-13": "PIPOQUEIRO",
"2026-08-14": "CHUTE"
};


// ── Obtém a data atual no fuso de Brasília ───────────────────
function getDataBrasilia() {
  const agora = new Date();

  // Formata como "YYYY-MM-DD" usando o fuso de Brasília
  const partes = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year:  'numeric',
    month: '2-digit',
    day:   '2-digit',
  }).formatToParts(agora);

  const dia  = partes.find(p => p.type === 'day').value;
  const mes  = partes.find(p => p.type === 'month').value;
  const ano  = partes.find(p => p.type === 'year').value;

  return { chave: `${ano}-${mes}-${dia}`, dia, mes, ano };
}


// ── Formata a data para exibição amigável ────────────────────
function formatarDataExibicao(dia, mes, ano) {
  const meses = [
    'janeiro','fevereiro','março','abril','maio','junho',
    'julho','agosto','setembro','outubro','novembro','dezembro'
  ];
  const nomeMes = meses[parseInt(mes, 10) - 1];
  return `${parseInt(dia, 10)} de ${nomeMes} de ${ano}`;
}


// ── Renderiza a palavra do dia na página ─────────────────────
function renderizarPagina() {
  const { chave, dia, mes, ano } = getDataBrasilia();

  // Exibe a data
  document.getElementById('datahoje').textContent =
    formatarDataExibicao(dia, mes, ano);

  const palavra = palavrasPorData[chave];

  const wordDisplay = document.getElementById('wordDisplay');
  const noWord      = document.getElementById('noWord');
  const btnCopy     = document.getElementById('btnCopy');

  if (palavra) {
    wordDisplay.textContent = palavra;
    noWord.classList.add('hidden');
    wordDisplay.classList.remove('hidden');
    btnCopy.classList.remove('disabled');
  } else {
    wordDisplay.classList.add('hidden');
    noWord.classList.remove('hidden');
    btnCopy.classList.add('disabled');
  }
}


// ── Copia a palavra atual para a área de transferência ───────
function copiarPalavra() {
  const { chave } = getDataBrasilia();
  const palavra = palavrasPorData[chave];

  if (!palavra) return;

  const feedback = document.getElementById('copyFeedback');

  // API moderna (HTTPS) com fallback para execCommand
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(palavra).then(() => mostrarFeedback(feedback));
  } else {
    // Fallback para ambientes sem HTTPS (ex: abrir o .html direto do disco)
    const el = document.createElement('textarea');
    el.value = palavra;
    el.style.position = 'fixed';
    el.style.opacity  = '0';
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      mostrarFeedback(feedback);
    } catch (err) {
      console.warn('Não foi possível copiar:', err);
    }
    document.body.removeChild(el);
  }
}

function mostrarFeedback(el) {
  el.classList.remove('hidden');
  clearTimeout(el._timeout);
  el._timeout = setTimeout(() => el.classList.add('hidden'), 2200);
}


// ── Inicia ───────────────────────────────────────────────────
renderizarPagina();


// ── Atualiza automaticamente quando o dia vira (Brasília) ────
(function agendarViradaDia() {
  const agora = new Date();

  // Calcula quantos ms faltam para meia-noite em Brasília
  const brasiliaOffset = -3 * 60; // UTC-3 em minutos
  const utcMs = agora.getTime() + agora.getTimezoneOffset() * 60 * 1000;
  const brasiliaMs = utcMs + brasiliaOffset * 60 * 1000;
  const brasilia = new Date(brasiliaMs);

  const meiaNeiteBrasilia = new Date(brasilia);
  meiaNeiteBrasilia.setHours(24, 0, 0, 0); // próxima meia-noite local

  const msAteVirada = meiaNeiteBrasilia - brasilia;

  setTimeout(() => {
    renderizarPagina();   // atualiza ao virar o dia
    agendarViradaDia();   // reagenda para o próximo dia
  }, msAteVirada + 500);  // +500ms de margem
})();
