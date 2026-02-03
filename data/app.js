// data/app.js - VERSIÓN CORREGIDA (TRADUCCIÓN AL ESPAÑOL)

const LANGS = {
  es: {
    subtitle: "Diagnóstico de Batería",
    sectionTitle: "Parámetros de la Batería",
    rawTitle: "Registro (Log)",
    footerText: "Versión: ESP-OBI Web UI",
    readStatic: "1. Leer Info",
    readDynamic: "2. Actualizar Datos",
    hintReadStatic: "Identificar modelo y leer datos estáticos",
    hintReadDynamic: "Leer voltajes y temperaturas",
    clearErrors: "Limpiar Errores",
    hintClear: "Restablecer errores del BMS",
    ledTest: "Prueba LED",
    hintLed: "Encender/Apagar LEDs de la batería",
    refresh: "Actualizar estado",
    logPreamble: "Inicializando...",
    uiReady: "Interfaz lista",
    batteryConnected: "Batería: Conectada",
    batteryNot: "Batería: No detectada",
    reading: "Leyendo...",
    ledOn: "LED Encendido",
    ledOff: "LED Apagado",
    cell: "Celda",
    alertImbalanceTitle: "<b>⚠️ ¡Desequilibrio!</b>",
    alertImbalanceBody: "La diferencia entre celdas supera los 0.1 V. Se recomienda balanceo.",
    alertCritLowTitle: "<b>❌ ¡Voltaje crítico bajo!</b>",
    alertCritLowBody: "El voltaje en una de las celdas es inferior a 2.5 V. Es probable que la celda esté degradada.",
    alertLimitedSupportTitle: "<b>ℹ️ Soporte Limitado</b>",
    alertLimitedSupportBody: "Las funciones de servicio no son compatibles con este modelo de batería, por lo que el bloque está oculto.",
    alertAllGood: "Todos los parámetros son normales",
    packSummary: "Voltaje total:",
    soc: "Nivel de carga:",
    delta: "Desequilibrio:",
    locked: "Bloqueada",
    unlocked: "Desbloqueada",
    model: "Modelo",
    cycles: "Ciclos de carga",
    state: "Estado",
    statusCode: "Código de estado",
    mfg_date: "Fecha de fabricación",
    capacity: "Capacidad",
    connecting: "Conectando...",
    reconnecting: "Conexión perdida. Reconectando...",
    tempBMS: "Temperatura BMS",
    tempCell1: "Temperatura 1",
    tempCell2: "Temperatura 2",
    alertCritZeroV: "<b>¡Fallo de batería!</b> Una o más celdas tienen 0 V. El diagnóstico posterior no tiene sentido.",
    alertAllLowV: "<b>¡Voltaje crítico bajo!</b> Todas las celdas están por debajo de 0.5 V. Las celdas probablemente han degradado.",
  },
  ua: { /* ... datos en ucraniano ... */ },
  ru: { /* ... datos en ruso ... */ },
  en: { /* ... datos en inglés ... */ }
};

let LANG = 'es'; // Idioma por defecto
// ... (resto de las variables globales se mantienen igual)

function setLang(lang){
  if (!LANGS[lang]) lang = 'en'; 
  LANG = lang;
  document.documentElement.lang = lang;
  
  // Actualizar clases de botones de idioma
  document.querySelectorAll('.lang').forEach(b=>b.classList.remove('active'));
  const activeBtn = el(`btn${lang.toUpperCase()}`);
  if (activeBtn) activeBtn.classList.add('active');
  
  // Traducción de elementos estáticos
  const elements = {
    'subtitle': 'subtitle', 'sectionTitle': 'sectionTitle', 'rawTitle': 'rawTitle',
    'footerText': 'footerText', 'btnReadStatic': 'readStatic', 'btnReadDynamic': 'readDynamic', 
    'hintReadStatic': 'hintReadStatic', 'hintReadDynamic': 'hintReadDynamic', 
    'btnClearErrors': 'clearErrors', 'hintClear': 'hintClear', 
    'btnLed': 'ledTest', 'hintLed': 'hintLed'
  };
  
  for(const id in elements) {
    const element = el(id);
    if(element && !element.querySelector('.spinner')) {
      element.textContent = t(elements[id]);
    }
  }
  
  // Re-renderizar datos si existen
  if (lastData) {
      renderData(lastData); 
      const area = el('cellsArea');
      if (area && area.style.display === 'flex') {
          renderCells(lastData);
          renderAlerts(lastData, lastFeatures);
      }
  }
  if (lastFeatures) updateButtonStates(lastFeatures);
  if (lastStatus) updateStatusText(lastStatus);
}

// ... (las funciones lógicas como connect, sendCommand, getSoC, etc., permanecen iguales)

// Lógica de inicialización actualizada para detectar español
window.addEventListener('load', ()=>{
    updateButtonStates({ read_dynamic: false, led_test: false, clear_errors: false });
    
    // Configurar listeners de botones (añadir el de ES si existe en tu HTML)
    ['EN', 'UA', 'RU', 'ES'].forEach(l => {
        const btn = el(`btn${l}`);
        if (btn) btn.addEventListener('click', () => setLang(l.toLowerCase()));
    });

    // ... (listeners de botones de comando)

    // Detección automática de idioma
    const navLang = (navigator.language || '').toLowerCase();
    let defaultLang = 'en'; 
    if (navLang.startsWith('es')) {
        defaultLang = 'es';
    } else if (navLang.startsWith('ua')) {
        defaultLang = 'ua';
    } else if (navLang.startsWith('ru')) {
        defaultLang = 'ru';
    }
    
    setLang(defaultLang);
    if(logEl) logEl.textContent = t('logPreamble');
    connect();
});
