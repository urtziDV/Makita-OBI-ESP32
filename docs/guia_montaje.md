# Guía de Montaje - Fabricación del Dispositivo

Sigue estos pasos para construir tu propia herramienta de diagnóstico **Makita OBI ESP32**.

## Fase 1: Preparación del Hardware

### 1. Preparar el Conector de la Batería

- Necesitas tres contactos: **V+** (Positivo), **V-** (Negativo) y el **Pin de Datos** (central pequeño).

### 2. Montaje en Placa

- Conecta el **GND** del ESP32 al carril negativo (V-).
- Conecta el **GPIO 4** al pin de datos de la batería.
- **Pull-up**: Pon una resistencia de 4.7kΩ entre el **GPIO 4** y el pin **3.3V** del ESP32.

### 3. Circuito de Habilitación

- Conecta el **GPIO 5** a la base de un transistor NPN (o gate de un MOSFET) a través de una resistencia de 4.7kΩ.
- Conecta **dos resistencias de 4.7kΩ en paralelo** desde el pin de **5V** al colector del transistor para alimentar al BMS.
- El transistor debe actuar como un interruptor para activar el BMS.

## Fase 2: Configuración del Software

### 1. Carga del Firmware

- Abre el proyecto en **PlatformIO** y pulsa **Upload**.

### 2. Carga de la Interfaz Web (LittleFS)

- Busca en el menú de PlatformIO la opción **Upload Filesystem Image**. ¡Este paso es obligatorio!

## Fase 3: Pruebas Finales

1. Conecta el ESP32 al USB o fuente de 5V.
2. Busca la red WiFi `Makita_OBI_ESP32`.
3. Entra en `http://makita.local` o `http://192.168.4.1`.
4. Conecta una batería y pulsa "Leer Info".

> [!TIP]
> Si vas a alimentar el ESP32 directamente desde los 18V de la batería Makita, usa siempre un **Buck Converter** de 5V.
