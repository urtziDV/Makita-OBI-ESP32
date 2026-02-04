# Resumen de Puesta en Marcha

¡Objetivo conseguido! El ESP32 ya tiene el firmware y la web funcionando en su **Versión 1.1**.

![Interfaz Principal](img/app_main.jpg)

## Logros

- **Proyecto Base**: Refactorización completa del lector de BMS Makita para ESP32, basado en el proyecto original de Belik1982.
- **Carga Exitosa**: Se superó el error de drivers CH340 y se optimizó la velocidad de carga.
- **Web Operativa**: Interfaz moderna con Modo Oscuro, Multi-idioma (ES/EN) y Mobile Friendly.
- **Modo WiFi Station**: Conexión al router del taller y acceso simplificado vía **makita.local**.
- **Gráficos de Historial**: Visualización en tiempo real de la evolución de las celdas.
- **HUD Dinámico**: Indicador visual inteligente de salud del pack (Equilibrado/Crítico).
- **OTA Rediseñado**: Nueva interfaz premium para la actualización de firmware con barra de progreso detallada.
- **Sincronización GitHub**: Repositorio profesional con documentación completa y archivos optimizados.

## Galería del Proyecto

````carousel
![Estado del Paquete y Celdas](img/app_details.jpg)
<!-- slide -->
![Gráfico de Historial en Tiempo Real](img/app_graph.jpg)
<!-- slide -->
![Configuración de Sistema y OTA](img/app_system.jpg)
````

## Cómo usar las nuevas funciones

### 1. Cambio físico (Crítico)

El cable que controla el encendido de la batería debe ir conectado al **Pin 5** (GPIO 5). Esto asegura compatibilidad con placas ESP32 Mini.

### 2. Acceso mDNS

Ya no necesitas buscar la IP. Simplemente conéctate al WiFi y entra en:
**`http://makita.local`**

### 3. Diagnóstico de Celdas

Usa el gráfico de historial para detectar celdas que caen de voltaje bajo carga. Si el **HUD Dinámico** se pone en rojo, el pack necesita balanceo o reparación.

## Cómo usar la herramienta

1. **Acceso**: Conéctate al WiFi `Makita_OBI_ESP32`.
2. **Navegador**: Entra en `http://makita.local`.
3. **Lectura**: Conecta una batería Makita y pulsa "Leer Info".

## Notas Técnicas Finales

- **Versión**: 1.1
- **Pin Enable**: GPIO 5
- **Pin OneWire**: GPIO 4
- **Velocidad Serial**: 115200 baudios

---
Generado por Makita OBI ESP32 • Final Build
