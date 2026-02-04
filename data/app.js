// data/app.js - LÓGICA DE LA INTERFAZ WEB (COMPATIBILIDAD RESTAURADA)

// --- Base de Datos de Modelos Makita (Valores Nominales) ---
const MAKITA_MODELS = {
  "BL1815": { cap: "1.5Ah", cells: "5x 18650", config: "5S1P", v_nom: "18V" },
  "BL1815N": { cap: "1.5Ah", cells: "5x 18650", config: "5S1P", v_nom: "18V" },
  "BL1820": { cap: "2.0Ah", cells: "5x 18650", config: "5S1P", v_nom: "18V" },
  "BL1830": { cap: "3.0Ah", cells: "10x 18650", config: "5S2P", v_nom: "18V" },
  "BL1840": { cap: "4.0Ah", cells: "10x 18650", config: "5S2P", v_nom: "18V" },
  "BL1850": { cap: "5.0Ah", cells: "10x 18650", config: "5S2P", v_nom: "18V" },
  "BL1850B": { cap: "5.0Ah", cells: "10x 18650", config: "5S2P", v_nom: "18V" },
  "BL1860B": { cap: "6.0Ah", cells: "10x 18650", config: "5S2P", v_nom: "18V" }
};

// --- Traducciones (ES, EN) ---
const TRANSLATIONS = {
  es: {
    subtitle: "Diagnóstico de Batería",
    sectionTitle: "Operaciones",
    section_overview: "Estado del Paquete",
    rawTitle: "Consola de Sistema",
    footerText: "Versión 1.1 • ESP32 Control",
    btn_read: "Leer Información",
    btn_dynamic: "Leer Voltajes",
    btn_clear_err: "Resetear Errores",
    btn_led_test: "Test LED",
    msg_wait: "Por favor, espere...",
    cell: "Celda",
    status_connecting: "Conectando...",
    status_online: "Sistema en línea",
    status_offline: "Desconectado",
    locked: "BLOQUEADA",
    unlocked: "DESBLOQUEADA",
    model: "Modelo",
    cycles: "Ciclos de carga",
    state: "Estado",
    mfg_date: "Fecha fabricación",
    capacity: "Capacidad",
    rom_id: "ID de la ROM",
    status_sim: "MODO SIMULACIÓN (Sin Hardware)",
    sum_total: "Voltaje Total",
    sum_diff: "Diferencia",
    log_waiting: "Esperando conexión...",
    log_req_static: "Solicitando datos maestros...",
    log_req_dynamic: "Actualizando voltajes...",
    log_clear_confirm: "¿Borrar errores del BMS?",
    log_sim_local: "Detectado entorno local (FILE://). Activando modo simulación...",
    log_sim_fail: "No se pudo conectar al hardware. Activando modo simulación...",
    log_sim_exc: "Excepción al intentar conectar. Activando modo simulación...",
    log_ws_error: "Error de conexión WebSocket.",
    log_sim_recv: "Recibido comando: ",
    log_sim_success: "Operación simulada con éxito.",
    log_evt_config: "Configurando manejadores de eventos...",
    lbl_auto: "Lectura Real-time",
    lbl_temp: "Temperaturas",
    lbl_fatigue: "Fatiga Química",
    lbl_imbalance: "Desbalanceo (HUD)",
    lbl_report: "Generar informe",
    health_good: "Excelente",
    health_fair: "Regular",
    health_poor: "Degradada",
    health_dead: "Agotada",
    fatigue_low: "Baja (Nueva)",
    fatigue_med: "Media (Uso)",
    fatigue_high: "Alta (Fatiga)",
    report_title: "INFORME TÉCNICO DE BATERÍA",
    lbl_balance_title: "⚠️ Asistente de Balanceo Manual",
    lbl_model_compare: "Comparativa de Modelo (Nominal)",
    lbl_nominal_cap: "Cap. Nominal:",
    lbl_config: "Config:",
    lbl_cells: "Celdas:",
    lbl_current_state: "Estado actual:",
    lbl_imbalance_detected: "Desviación detectada:",
    lbl_action_charge: "Cargar",
    lbl_action_discharge: "Descargar",
    lbl_soh: "SOH (Salud)",
    lbl_history: "Gráfico de Historial (Tiempo Real)",
    lbl_system_title: "Sistema & FW Update",
    lbl_wifi_config: "Configuración WiFi (Modo Estación)",
    lbl_wifi_ssid: "Nombre de red (SSID)",
    lbl_wifi_pass: "Contraseña",
    btn_save_wifi: "Conectar al WiFi",
    lbl_wifi_hint: "El ESP32 se reiniciará para conectar. Mantendrá el AP Makita como respaldo.",
    msg_presence_detected: " (Batería detectada)",
    msg_presence_empty: " (Bus vacío)",
    lbl_total_voltage: "Voltaje Pack",
    bal_ok: "Equilibrado",
    bal_warn: "Desviación",
    bal_crit: "Crítico"
  },
  en: {
    subtitle: "Battery Diagnostics",
    sectionTitle: "Operations",
    section_overview: "Pack Overview",
    rawTitle: "System Console",
    footerText: "Version 1.1 • ESP32 Control",
    btn_read: "Read Info",
    btn_dynamic: "Read Voltages",
    btn_clear_err: "Reset Errors",
    btn_led_test: "Test LED",
    msg_wait: "Please wait...",
    cell: "Cell",
    status_connecting: "Connecting...",
    status_online: "System online",
    status_offline: "Offline",
    locked: "LOCKED",
    unlocked: "UNLOCKED",
    model: "Model",
    cycles: "Charge cycles",
    state: "Status",
    mfg_date: "Mfg Date",
    capacity: "Capacity",
    rom_id: "ROM ID",
    status_sim: "SIMULATION MODE (No Hardware)",
    sum_total: "Total Voltage",
    sum_diff: "Difference",
    log_waiting: "Waiting for connection...",
    log_req_static: "Requesting master data...",
    log_req_dynamic: "Updating voltages...",
    log_clear_confirm: "Clear BMS errors?",
    log_sim_local: "Local environment detected (FILE://). Enabling simulation mode...",
    log_sim_fail: "Could not connect to hardware. Enabling simulation mode...",
    log_sim_exc: "Exception while connecting. Enabling simulation mode...",
    log_ws_error: "WebSocket connection error.",
    log_sim_recv: "Received command: ",
    log_sim_success: "Simulated operation successful.",
    log_evt_config: "Configuring event handlers...",
    lbl_auto: "Real-time Updates",
    lbl_temp: "Temperatures",
    lbl_fatigue: "Chemical Fatigue",
    lbl_imbalance: "Cell Imbalance (HUD)",
    lbl_report: "Export Report",
    health_good: "Excellent",
    health_fair: "Fair",
    health_poor: "Degraded",
    health_dead: "Worn Out",
    fatigue_low: "Low (Fresh)",
    fatigue_med: "Medium (Used)",
    fatigue_high: "High (Wear)",
    report_title: "BATTERY TECHNICAL REPORT",
    lbl_balance_title: "⚠️ Manual Balancing Assistant",
    lbl_model_compare: "Model Comparison (Nominal)",
    lbl_nominal_cap: "Nominal Cap:",
    lbl_config: "Config:",
    lbl_cells: "Cells:",
    lbl_current_state: "Current state:",
    lbl_imbalance_detected: "Imbalance detected:",
    lbl_action_charge: "Charge",
    lbl_action_discharge: "Discharge",
    lbl_soh: "SOH (Health)",
    lbl_history: "History Graph (Real-Time)",
    lbl_system_title: "System & FW Update",
    lbl_wifi_config: "WiFi Configuration (Station Mode)",
    lbl_wifi_ssid: "Network Name (SSID)",
    lbl_wifi_pass: "Password",
    btn_save_wifi: "Connect to WiFi",
    lbl_wifi_hint: "The ESP32 will restart to connect. It will keep the Makita AP as backup.",
    msg_presence_detected: " (Battery detected)",
    msg_presence_empty: " (Empty Bus)",
    lbl_total_voltage: "Pack Voltage",
    bal_ok: "Balanced",
    bal_warn: "Imbalanced",
    bal_crit: "Critical"
  }
};

// Variables globales
let currentLang = localStorage.getItem('makita_lang') || 'es';
let socket;
let isConnected = false;
let isSimulation = false;
let lastData = null;
let lastPresence = false;
let pollInterval = null;
let historyChart = null;
const MAX_HISTORY = 40; // Puntos máximos en el gráfico
let historyData = {
  labels: [],
  datasets: [1, 2, 3, 4, 5].map(i => ({
    label: `Celda ${i}`,
    data: [],
    borderColor: `hsl(${i * 60}, 70%, 50%)`,
    backgroundColor: `hsla(${i * 60}, 70%, 50%, 0.1)`,
    borderWidth: 2,
    pointRadius: 0,
    tension: 0.3,
    fill: false
  }))
};

// Helpers para acceso rápido al DOM
const el = id => document.getElementById(id);
const t = key => (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
const savePref = (k, v) => localStorage.setItem(`makita_${k}`, v);

/**
 * Punto de entrada: inicializa la app.
 */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang();
  setupEventListeners();
  connect();

  if (localStorage.getItem('makita_auto') === 'true') {
    const bAuto = el('checkAuto');
    if (bAuto) bAuto.checked = true;
  }

  initChart();
});

/**
 * Gestiona el Modo Oscuro.
 */
function initTheme() {
  const isDark = localStorage.getItem('makita_theme') === 'dark';
  setTheme(isDark ? 'dark' : 'light');
}

function setTheme(theme, skipSync = false) {
  const isDark = (theme === 'dark');
  document.body.classList.toggle('dark-mode', isDark);
  savePref('theme', theme);

  const bLight = el('themeLight');
  const bDark = el('themeDark');
  if (bLight) bLight.classList.toggle('active', !isDark);
  if (bDark) bDark.classList.toggle('active', isDark);

  if (!skipSync && isConnected) {
    sendCommand('save_config', { lang: currentLang, theme: theme });
  }
}

/**
 * Configura el idioma inicial.
 */
function initLang() {
  if (!localStorage.getItem('makita_lang')) {
    const navLang = navigator.language.split('-')[0];
    currentLang = (navLang === 'es') ? 'es' : 'en';
  }
  applyTranslations();
}

/**
 * Actualiza todos los textos de la UI usando data-i18n.
 */
function applyTranslations() {
  const data = TRANSLATIONS[currentLang];
  savePref('lang', currentLang);

  // Traducción universal mediante atributos data-i18n
  document.querySelectorAll('[data-i18n]').forEach(item => {
    const key = item.getAttribute('data-i18n');
    if (data[key]) item.textContent = data[key];
  });

  // Traducción de placeholders
  document.querySelectorAll('[data-i18n-hold]').forEach(item => {
    const key = item.getAttribute('data-i18n-hold');
    if (data[key]) item.placeholder = data[key];
  });

  // Actualiza botones de idioma activos
  document.querySelectorAll('.lang').forEach(btn => {
    btn.classList.toggle('active', btn.id === `btn${currentLang.toUpperCase()}`);
  });

  // Actualizamos la barra de estado completa (Simulación, Presencia, etc.)
  refreshStatus();

  // Actualizamos etiquetas del gráfico si existe
  if (historyChart) {
    historyChart.data.datasets.forEach((ds, i) => {
      ds.label = `${t('cell')} ${i + 1}`;
    });
    historyChart.update('none');
  }

  // Re-renderizamos los datos dinámicos si existen para aplicar el nuevo idioma
  if (lastData) {
    renderStaticTable(lastData);
    renderCells(lastData);
  }
}

/**
 * Actualiza la barra de estado (color y texto) con traducciones vigentes.
 */
function refreshStatus() {
  const statusWidget = el('statusWidget');
  const statusText = el('statusText');
  if (!statusText || !statusWidget) return;

  if (isSimulation) {
    statusText.textContent = t('status_sim');
    statusWidget.style.background = '#fff3e0'; // Naranja suave
    statusText.style.color = '#e65100';
    return;
  }

  if (!isConnected) {
    statusText.textContent = t('status_offline');
    statusWidget.style.background = '#ffebee';
    statusText.style.color = '#c62828';
    return;
  }

  // Estamos conectados (Online)
  if (lastPresence) {
    statusText.textContent = t('status_online') + t('msg_presence_detected');
    statusWidget.style.background = '#e8f5e9';
    statusText.style.color = '#2e7d32';
  } else {
    statusText.textContent = t('status_online') + t('msg_presence_empty');
    statusWidget.style.background = '#fff3e0';
    statusText.style.color = '#e65100';
  }
}

/**
 * Inicializa el gráfico de historial usando Chart.js
 */
function initChart() {
  try {
    if (typeof Chart === 'undefined') {
      log("⚠️ Chart.js no cargado. Revisa chart.min.js");
      return;
    }
    const canvas = el('historyChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    historyChart = new Chart(ctx, {
      type: 'line',
      data: historyData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
          x: { display: false },
          y: {
            min: 2.5,
            max: 4.3,
            ticks: { color: 'rgba(128,128,128,0.8)' },
            grid: { color: 'rgba(128,128,128,0.1)' }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: { boxWidth: 10, font: { size: 10 }, color: 'rgba(128,128,128,0.8)' }
          }
        }
      }
    });
    log("📊 Gráfico de historial inicializado.");
  } catch (e) {
    log("❌ Error inicializando gráfico: " + e.message);
  }
}

function updateChart(cellVoltages) {
  if (!historyChart) return;

  const now = new Date().toLocaleTimeString();

  if (historyData.labels.length > MAX_HISTORY) {
    historyData.labels.shift();
    historyData.datasets.forEach(ds => ds.data.shift());
  }

  historyData.labels.push(now);
  cellVoltages.forEach((v, i) => {
    if (historyData.datasets[i]) {
      historyData.datasets[i].data.push(v);
    }
  });

  historyChart.update('none'); // Update sin animación para rendimiento
}

/**
 * Comunicación WebSocket con modo simulación.
 */
function connect() {
  const statusText = el('statusText');
  if (statusText) statusText.textContent = t('status_connecting');

  // Si estamos abriendo el archivo localmente (sin servidor web), activamos simulación directamente
  if (window.location.protocol === 'file:') {
    log(t('log_sim_local'));
    enableSimulation();
    return;
  }

  try {
    socket = new WebSocket(`ws://${window.location.host}/ws`);

    socket.onopen = () => {
      isConnected = true;
      if (statusText) {
        statusText.textContent = t('status_online');
        el('statusWidget').style.background = '#e8f5e9'; // Verde suave
        statusText.style.color = '#2e7d32';
      }
      sendCommand('presence');
      sendCommand('get_config');
    };

    socket.onclose = () => {
      isConnected = false;
      refreshStatus();
      // Si el socket se cierra, esperamos un poco para intentar reconectar o pasar a simulación
      setTimeout(() => {
        if (!isConnected) {
          log(t('log_sim_fail'));
          enableSimulation();
        }
      }, 1500); // 1.5s de margen para evitar saltos por micro-cortes
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      handleMessage(msg);
    };

    socket.onerror = () => {
      log(t('log_ws_error'));
    };
  } catch (e) {
    log(t('log_sim_exc'));
    enableSimulation();
  }
}

/**
 * Activa un entorno de datos simulados para pruebas de UI.
 */
function enableSimulation() {
  isConnected = true;
  isSimulation = true; // Marcamos el estado como simulación
  const statusText = el('statusText');
  if (statusText) {
    statusText.textContent = t('status_sim');
    el('statusWidget').style.background = '#fff3e0'; // Naranja suave
    statusText.style.color = '#e65100';
  }

  let simScenario = 0;
  const scenarios = [
    { // 1. Saludable
      model: "BL1850B", cycles: 42, lock: "DESBLOQUEADA", cap: "5.0Ah", date: "15/05/2023",
      volts: [4.01, 3.98, 3.95, 3.92, 3.99], diff: 0.12, pack: 19.85
    },
    { // 2. Batería Baja (Necesita carga)
      model: "BL1830", cycles: 120, lock: "DESBLOQUEADA", cap: "3.0Ah", date: "10/01/2022",
      volts: [3.35, 3.32, 3.30, 3.34, 3.31], diff: 0.05, pack: 16.62
    },
    { // 3. Desbalanceada / Celda Dañada (Aviso)
      model: "BL1850", cycles: 210, lock: "DESBLOQUEADA", cap: "5.0Ah", date: "22/11/2021",
      volts: [4.05, 4.02, 3.15, 3.98, 4.01], diff: 0.90, pack: 19.21
    },
    { // 4. Bloqueada (BMS Error)
      model: "BL1860B", cycles: 450, lock: "BLOQUEADA", cap: "6.0Ah", date: "05/06/2020",
      volts: [3.85, 3.82, 3.79, 3.81, 3.84], diff: 0.06, pack: 19.11
    }
  ];

  // Sobrescribimos sendCommand para interceptar comandos y responder con fakes
  const originalSend = sendCommand;
  window.sendCommand = (cmd, params) => {
    log(t('log_sim_recv') + cmd);

    setTimeout(() => {
      if (cmd === 'presence') {
        handleMessage({ type: 'presence', present: true });
      } else if (cmd === 'read_static') {
        const s = scenarios[simScenario];
        handleMessage({
          type: 'static_data',
          features: { read_dynamic: true, led_test: true, clear_errors: true },
          data: {
            model: s.model,
            charge_cycles: s.cycles,
            lock_status: s.lock,
            capacity: s.cap,
            mfg_date: s.date,
            pack_voltage: s.pack,
            rom_id: "28 AF B1 04 00 00 00 E2",
            cell_voltages: s.volts,
            cell_diff: s.diff,
            temp1: 24.5 + (simScenario * 2),
            temp2: 25.1 + (simScenario * 2)
          }
        });
        // Rotamos para la próxima lectura
        simScenario = (simScenario + 1) % scenarios.length;
      } else if (cmd === 'read_dynamic') {
        // Usamos el último escenario cargado para simular fluctuación
        const lastBase = scenarios[(simScenario + scenarios.length - 1) % scenarios.length];
        const jitter = () => (Math.random() * 0.05) - 0.025;
        const newVolts = lastBase.volts.map(v => v + jitter());

        handleMessage({
          type: 'dynamic_data',
          data: {
            pack_voltage: newVolts.reduce((a, b) => a + b, 0),
            cell_voltages: newVolts,
            cell_diff: Math.max(...newVolts) - Math.min(...newVolts),
            temp1: 25.4 + Math.random() * 5,
            temp2: 24.8 + Math.random() * 5
          }
        });
      } else if (cmd === 'led_on' || cmd === 'led_off' || cmd === 'clear_errors') {
        handleMessage({ type: 'success', message: t('log_sim_success') });
      }
    }, 300);
  };
}

function handleMessage(msg) {
  if (msg.type === 'static_data') {
    lastData = msg.data;
    renderStaticTable(msg.data);
    renderCells(msg.data);
    if (msg.features) updateButtonStates(msg.features);
    el('overviewCard').classList.remove('hidden');
    if (msg.data.cell_voltages) updateChart(msg.data.cell_voltages);
  } else if (msg.type === 'dynamic_data') {
    if (lastData) {
      Object.assign(lastData, msg.data);
      renderCells(lastData);
      renderStaticTable(lastData); // Para actualizar voltajes en la tabla si existen
      if (msg.data.cell_voltages) updateChart(msg.data.cell_voltages);
    }
  } else if (msg.type === 'presence') {
    updatePresence(msg.present);
  } else if (msg.type === 'success' || msg.type === 'error') {
    showNotification(msg.message, msg.type === 'success' ? 'success' : 'danger');
  } else if (msg.type === 'debug') {
    log(msg.message);
  } else if (msg.type === 'config') {
    // Sincronizar con el servidor si es diferente
    if (msg.lang && msg.lang !== currentLang) {
      currentLang = msg.lang;
      applyTranslations();
    }
    if (msg.theme) {
      setTheme(msg.theme, true);
    }
  }
}

function sendCommand(cmd, params = {}) {
  if (!isConnected) return;
  socket.send(JSON.stringify({ command: cmd, ...params }));
}

/**
 * Renderiza la tabla de datos clave.
 */
function renderStaticTable(d) {
  const table = el('data-table');
  if (!table) return;

  const rows = [
    [t('model'), d.model],
    [t('cycles'), d.charge_cycles],
    [t('state'), d.lock_status === "BLOQUEADA" ? `<span class="badge badge-danger">${t('locked')}</span>` : `<span class="badge badge-success">${t('unlocked')}</span>`],
    [t('capacity'), d.capacity],
    [t('mfg_date'), d.mfg_date],
    [t('lbl_total_voltage'), d.pack_voltage.toFixed(2) + " V"],
    [t('rom_id'), d.rom_id]
  ];

  table.innerHTML = rows.map(r => `
        <div class="kv-row">
            <span class="k">${r[0]}</span>
            <span class="v">${r[1]}</span>
        </div>
    `).join('');
}

/**
 * Renderiza los gráficos de las celdas.
 */
function renderCells(d) {
  const area = el('cellsArea');
  const nums = el('cellsNumbers');
  if (!area) return;
  area.innerHTML = d.cell_voltages.map((v, i) => {
    const pct = Math.min(100, Math.max(0, (v - 2.5) / (4.2 - 2.5) * 100));
    let colorClass = 'bg-ok';
    if (v < 0.5) colorClass = 'dead-cell';
    else if (v < 3.0) colorClass = 'crit-low-animated'; // Muy bajo -> Rojo pulsante
    else if (v < 3.3) colorClass = 'bg-error';          // Bajo -> Rojo fijo
    else if (v < 3.6) colorClass = 'bg-warning';        // Regular -> Naranja

    return `
            <div class="cell-container">
                <div class="cell-cap"></div>
                <div class="cell-gfx">
                    <div class="cell-gfx-content">
                        <span class="cell-pole">+</span>
                        <span class="cell-gfx-vol">${v.toFixed(2)}V</span>
                        <span class="cell-pole">-</span>
                    </div>
                    <div class="cell-level-bar ${colorClass}" style="height:${pct}%;"></div>
                </div>
                <div class="cell-number">${t('cell')} ${i + 1}</div>
            </div>
        `;
  }).join('');

  if (nums) nums.innerHTML = ''; // Limpiamos el área antigua

  if (el('packSummary')) {
    el('packSummary').innerHTML = `${t('sum_total')}: <strong>${d.pack_voltage.toFixed(2)}V</strong> | ${t('sum_diff')}: <span style="color:red">${d.cell_diff.toFixed(3)}V</span>`;
  }

  renderAdvancedDiagnostics(d);
}

/**
 * Calcula y dibuja temperatura y Salud.
 */
function renderAdvancedDiagnostics(d) {
  // Salud y Fatiga
  let fatigueLevel = 'fatigue_low';
  if (d.charge_cycles > 150 || d.cell_diff > 0.15) fatigueLevel = 'fatigue_med';
  if (d.charge_cycles > 300 || d.cell_diff > 0.25) fatigueLevel = 'fatigue_high';

  // Solo para diagnóstico SOH: calculamos un SOH más agresivo que incluya desbalanceo permanente
  let health = 100 - (d.charge_cycles / 10);
  health -= (d.cell_diff * 40); // Penalización dinámica: 0.1V = -4% adicional
  health = Math.max(0, Math.round(health));

  const ring = el('sohRing');
  const label = el('sohLabel');
  if (ring && label) {
    ring.textContent = health + '%';
    ring.className = 'soh-ring ' + (health > 80 ? 'good' : (health > 50 ? 'fair' : 'poor'));

    let hLabel = 'health_good';
    if (health <= 80) hLabel = 'health_fair';
    if (health <= 50) hLabel = 'health_poor';
    if (health <= 20) hLabel = 'health_dead';
    label.innerHTML = `${t(hLabel)}<br><small style="font-size:10px; opacity:0.7">${t(fatigueLevel)}</small>`;
  }

  // Expert: Comparativa de Modelo
  renderModelComparison(d);

  // Expert: Asistente de Balanceo
  renderBalancingAssistant(d);

  // Temperaturas
  if (d.temp1 !== undefined && d.temp2 !== undefined) {
    const tValues = el('tempValues');
    if (tValues) tValues.textContent = `${d.temp1.toFixed(1)}°C | ${d.temp2.toFixed(1)}°C`;

    // Asumimos rango 0-60°C para la barra
    if (el('tempBar1')) el('tempBar1').style.height = Math.min(100, (d.temp1 / 60) * 100) + '%';
    if (el('tempBar2')) el('tempBar2').style.height = Math.min(100, (d.temp2 / 60) * 100) + '%';
  }

  // HUD de Desbalanceo
  renderImbalanceHUD(d);

  // Badge de Desbalanceo Dinámico (Top)
  updateImbalanceBadge(d.cell_diff);
}

let lastSentSoh = -1;

function renderModelComparison(d) {
  const container = el('modelComparison');
  const section = el('modelSection');
  if (!container || !d.model) return;

  const modelKey = d.model.split('/')[0].split(' ')[0].trim();
  const nominal = MAKITA_MODELS[modelKey];

  if (nominal) {
    section.classList.remove('hidden');
    container.innerHTML = `
      <div class="kv-row"><span>${t('lbl_nominal_cap')}</span><strong>${nominal.cap}</strong></div>
      <div class="kv-row"><span>${t('lbl_config')}</span><strong>${nominal.config}</strong></div>
      <div class="kv-row"><span>${t('lbl_cells')}</span><strong>${nominal.cells}</strong></div>
      <div class="kv-row"><span>${t('lbl_current_state')}</span><strong>${d.capacity}</strong></div>
    `;
  } else {
    section.classList.add('hidden');
  }
}

function renderBalancingAssistant(d) {
  const container = el('balanceAssistant');
  const section = el('balanceSection');
  if (!container) return;

  if (d.cell_diff > 0.05) {
    section.classList.remove('hidden');
    const avgV = d.cell_voltages.reduce((a, b) => a + b, 0) / d.cell_voltages.length;

    let html = `<p>${t('lbl_imbalance_detected')} <strong>${d.cell_diff.toFixed(3)}V</strong></p>`;

    d.cell_voltages.forEach((v, i) => {
      const diff = v - avgV;
      if (Math.abs(diff) > 0.02) {
        const action = diff > 0 ? t('lbl_action_discharge') : t('lbl_action_charge');
        const color = diff > 0 ? 'var(--error)' : 'var(--accent)';
        html += `
          <div class="balance-step">
            <span style="color:${color}">●</span>
            <span>${t('cell')} ${i + 1}: <strong>${action}</strong> (~${(Math.abs(diff) * 500).toFixed(0)} mAh)</span>
          </div>
        `;
      }
    });
    container.innerHTML = html;
  } else {
    section.classList.add('hidden');
  }
}

function generateReport() {
  if (!lastData) return;
  const d = lastData;
  const date = new Date().toLocaleString();

  let report = `==========================================\n`;
  report += `   ${t('report_title')}\n`;
  report += `==========================================\n\n`;
  report += `FECHA: ${date}\n`;
  report += `MODELO: ${d.model}\n`;
  report += `ID ROM: ${d.rom_id}\n`;
  report += `ESTADO: ${d.lock_status}\n\n`;
  report += `------------------------------------------\n`;
  report += `DIAGNÓSTICO DE CELDAS\n`;
  report += `------------------------------------------\n`;
  d.cell_voltages.forEach((v, i) => {
    report += `${t('cell')} ${i + 1}: ${v.toFixed(3)}V\n`;
  });
  report += `\nVOLTAJE TOTAL: ${d.pack_voltage.toFixed(2)}V\n`;
  report += `DESBALANCEO: ${d.cell_diff.toFixed(3)}V\n`;
  report += `CICLOS: ${d.charge_cycles}\n\n`;
  report += `------------------------------------------\n`;
  report += `ESTADO DE SALUD (SOH): ${el('sohRing').textContent}\n`;
  report += `TEMPERATURAS: ${el('tempValues').textContent}\n`;
  report += `==========================================\n`;
  report += `Generado por Makita OBI ESP32\n`;

  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Reporte_Makita_${d.model.replace(/\s/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  log("Reporte generado con éxito.");
}


/**
 * Dibuja el HUD de desviación de celdas.
 */
function renderImbalanceHUD(d) {
  const container = el('imbalanceHUD');
  if (!container) return;

  const avg = d.cell_voltages.reduce((a, b) => a + b, 0) / d.cell_voltages.length;

  container.innerHTML = d.cell_voltages.map((v, i) => {
    const diff = v - avg;
    const absDiff = Math.abs(diff);
    // Escalamiento visual: 0.2V de diferencia = 100% de la barra
    const width = Math.min(100, (absDiff / 0.2) * 100);
    const color = absDiff > 0.1 ? 'var(--error)' : (absDiff > 0.05 ? 'var(--warning)' : 'var(--success)');

    return `
            <div class="hud-row">
                <span class="hud-label">${t('cell')} ${i + 1}</span>
                <div class="hud-bar-bg">
                    <div class="hud-bar-fill" style="width: ${width}%; background: ${color}; ${diff < 0 ? 'right: 0' : 'left: 0'}"></div>
                </div>
                <span class="hud-val" style="color: ${color}">${diff > 0 ? '+' : ''}${diff.toFixed(3)}</span>
            </div>
        `;
  }).join('');
}

/**
 * Actualiza el badge visual de desbalanceo en la cabecera.
 */
function updateImbalanceBadge(diff) {
  const badge = el('imbalanceBadge');
  if (!badge) return;

  badge.classList.remove('hidden');
  badge.classList.remove('bal-ok', 'bal-warn', 'bal-crit');

  let text = '';
  let icon = '';

  if (diff < 0.05) {
    badge.classList.add('bal-ok');
    text = t('bal_ok');
    icon = '✅';
  } else if (diff < 0.15) {
    badge.classList.add('bal-warn');
    text = t('bal_warn');
    icon = '⚠️';
  } else {
    badge.classList.add('bal-crit');
    text = t('bal_crit');
    icon = '🚨';
  }

  badge.innerHTML = `<span>${icon}</span> <span>${text}</span>`;
}

function updateButtonStates(f) {
  el('btnReadDynamic').disabled = !f.read_dynamic;
  el('btnClearErrors').disabled = !f.clear_errors;
  el('btnLed').disabled = !f.led_test;
  el('serviceActions').classList.toggle('hidden', !(f.clear_errors || f.led_test));

  // Iniciar auto-polling si está el switch activo
  toggleAutoPolling(el('checkAuto').checked);
}

function toggleAutoPolling(active) {
  clearInterval(pollInterval);
  pollInterval = null;
  savePref('auto', active);

  if (active && isConnected && !el('btnReadDynamic').disabled) {
    pollInterval = setInterval(() => {
      sendCommand('read_dynamic');
    }, 3000);
  }
}

function updatePresence(present) {
  lastPresence = present;
  refreshStatus();

  if (!present && isConnected) {
    el('overviewCard').classList.add('hidden');
    el('serviceActions').classList.add('hidden');
    lastData = null; // Limpiar datos previos
  }
}

function showNotification(msg, type) {
  const n = el('notification');
  if (!n) return;
  n.textContent = msg;
  n.className = type;
  n.classList.remove('hidden');
  setTimeout(() => n.classList.add('hidden'), 4000);
}

function log(msg) {
  const logEl = el('log');
  if (logEl) {
    const d = new Date();
    const ts = d.getHours().toString().padStart(2, '0') + ":" + d.getMinutes().toString().padStart(2, '0') + ":" + d.getSeconds().toString().padStart(2, '0');
    logEl.textContent += `\n[${ts}] ${msg}`;
    logEl.scrollTop = logEl.scrollHeight;
  }
}

function setupEventListeners() {
  log(t('log_evt_config'));

  const bStatic = el('btnReadStatic');
  const bDynamic = el('btnReadDynamic');
  const bClear = el('btnClearErrors');
  const bLed = el('btnLed');
  const bEN = el('btnEN');
  const bES = el('btnES');

  if (bStatic) bStatic.addEventListener('click', () => { log(t('log_req_static')); sendCommand('read_static'); });
  if (bDynamic) bDynamic.addEventListener('click', () => { log(t('log_req_dynamic')); sendCommand('read_dynamic'); });
  if (bClear) bClear.addEventListener('click', () => { if (confirm(t('log_clear_confirm'))) sendCommand('clear_errors'); });

  let ledOn = false;
  if (bLed) bLed.addEventListener('click', () => {
    ledOn = !ledOn;
    sendCommand(ledOn ? 'led_on' : 'led_off');
  });

  // Botones de idioma
  const setLang = (lang) => {
    currentLang = lang;
    applyTranslations();
    log(t('log_evt_config').replace('...', ': ' + lang.toUpperCase()));
    if (isConnected) {
      const isDark = document.body.classList.contains('dark-mode');
      sendCommand('save_config', { lang: lang, theme: isDark ? 'dark' : 'light' });
    }
  };

  if (bEN) bEN.addEventListener('click', () => setLang('en'));
  if (bES) bES.addEventListener('click', () => setLang('es'));

  // Toggle Auto-Polling
  const bAuto = el('checkAuto');
  if (bAuto) bAuto.addEventListener('change', (e) => toggleAutoPolling(e.target.checked));

  // Toggle Theme
  const bLight = el('themeLight');
  const bDark = el('themeDark');
  if (bLight) bLight.addEventListener('click', () => setTheme('light'));
  if (bDark) bDark.addEventListener('click', () => setTheme('dark'));

  // Export Report
  const bExp = el('btnExport');
  if (bExp) bExp.addEventListener('click', generateReport);

  // Toggle System Section
  const bSys = el('btnSystem');
  if (bSys) bSys.addEventListener('click', () => el('systemSection').classList.toggle('hidden'));

  const bOta = el('btnOta');
  const fOta = el('otaFile');
  if (bOta && fOta) {
    bOta.addEventListener('click', () => fOta.click());
    fOta.addEventListener('change', () => uploadFirmware(fOta.files[0]));
  }

  // WiFi Config
  const bWifi = el('btnSaveWifi');
  if (bWifi) {
    bWifi.addEventListener('click', () => {
      const ssid = el('wifiSSID').value;
      const pass = el('wifiPass').value;
      if (!ssid) return alert("Introduce un nombre de red (SSID)");
      if (confirm(`¿Configurar WiFi y reiniciar?\nRed: ${ssid}`)) {
        sendCommand('set_wifi', { ssid: ssid, pass: pass });
      }
    });
  }
}

/**
 * Gestiona la subida de firmware al ESP32.
 */
function uploadFirmware(file) {
  if (!file) return;
  if (!confirm(currentLang === 'es' ? '¿Desea actualizar el firmware del ESP32?' : 'Update ESP32 firmware?')) return;

  const formData = new FormData();
  formData.append('update', file);

  const xhr = new XMLHttpRequest();
  const bar = el('otaBar');
  const container = el('otaProgress');

  container.classList.remove('hidden');
  xhr.open('POST', '/update', true);

  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const pct = (e.loaded / e.total) * 100;
      bar.style.width = pct + '%';
    }
  };

  xhr.onload = () => {
    if (xhr.status === 200) {
      log("Actualización exitosa. Reiniciando...");
      showNotification("Success! Rebooting...", "success");
      setTimeout(() => window.location.reload(), 5000);
    } else {
      log("Error en la actualización.");
      showNotification("Update Failed", "danger");
      container.classList.add('hidden');
    }
  };

  xhr.send(formData);
}
