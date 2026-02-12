# Manual de Usuario - Operación del Sistema

Bienvenido a la herramienta de diagnóstico **Makita OBI ESP32**. Este manual explica cómo sacar el máximo provecho a la interfaz.

## 1. Conexión Inicial

1. Conecta el dispositivo a la batería o fuente de alimentación.
2. Desde tu smartphone o PC, conéctate a la red WiFi: **`Makita_OBI_ESP32`**.
3. Abre el navegador y accede a: **`http://makita.local`** o **`http://192.168.4.1`**.

## 2. Lectura de Datos

- **Botón "Leer Info"**: Realiza una lectura completa de la batería (Modelo, Ciclos, Estado de Bloqueo, Voltajes iniciales).
- **Botón "Leer Voltajes"**: Actualiza solo los voltajes de las celdas (Uso rápido).
- **Botón "Resetear Errores"**: Intenta borrar errores persistentes y desbloquear el controlador.
- **Auto-lectura**: Si activas el interruptor "Auto-lectura", el sistema refrescará los datos cada 3 segundos automáticamente.
- **HUD de Desbalanceo**: En la cabecera verás un distintivo (Badge) que indica si el pack está **Equilibrado**, tiene **Desviación** o está en estado **Crítico**.

## 3. Gráficos de Historial

- Debajo del estado de las celdas verás un gráfico en tiempo real.
- Cada línea representa una celda (1 a 5). En baterías BL14 se mostrarán automáticamente solo 4 líneas.
- Este gráfico es útil para ver si una celda cae de voltaje más rápido que las demás cuando la batería está en uso.

## 4. Configuración WiFi (Modo Taller)

Para que el dispositivo se conecte a tu red WiFi habitual:

1. Pulsa el icono del engranaje (**⚙️**).
2. En la sección "Configuración WiFi", introduce el **SSID** (Nombre de tu red) y la **Contraseña**.
3. Pulsa "Conectar al WiFi".
4. El ESP32 se reiniciará. Ahora podrás acceder a él desde cualquier dispositivo de tu red local mediante **`http://makita.local`**.

## 5. Interpretación de Salud (SOH)

- **Excelente**: Batería nueva o con muy poco uso.
- **Regular**: Uso normal, capacidad ligeramente reducida.
- **Cuidado / Degradada**: Se recomienda un ciclo de balanceo o revisar celdas individuales.
- **Bloqueada**: El BMS ha detectado un fallo crítico y ha bloqueado la batería.

## 6. Resolución de Problemas

| Problema | Causa Probable | Solución |
| :--- | :--- | :--- |
| No aparece el WiFi | Pin en corto o conflicto Serial. | Asegúrate de haber movido el ENABLE al Pin 5. |
| Sale "(Bus vacío)" | Mala conexión física. | Revisa que el cable de datos toque bien el pin central. |
| La web no carga | Falta cargar el Filesystem. | Ejecuta "Upload Filesystem Image" desde PlatformIO. |
| Voltajes en 0.00V | Batería dormida o celda inexistente. | Pulsa "Leer Info". En BL14 la 5ª celda siempre está vacía. |

---
Generado por Makita OBI ESP32 • Versión 1.2
