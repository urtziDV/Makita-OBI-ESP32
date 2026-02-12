# Reporte de Pines (Pinout) - Makita OBI ESP32

Resumen de la asignación de pines del ESP32 para este proyecto.

| Pin (GPIO) | Función | Descripción |
| :--- | :--- | :--- |
| **GPIO 4** | **DATA (OneWire)** | Comunicación con el BMS de la batería. |
| **GPIO 5** | **ENABLE (BMS Power)** | Control del transistor de alimentación del BMS. |
| **GPIO 1 (TX0)** | **DEBUG (Serial)** | Salida de log por puerto serie. |
| **GPIO 3 (RX0)** | **DEBUG (Serial)** | Entrada de datos serie. |

## Notas de Hardware

- **Compatibilidad**: Se han seleccionado pines <= 12 (GPIO 4 y 5) para asegurar la compatibilidad con placas **ESP32 Mini** y **SuperMini**, donde los pines superiores a menudo no están disponibles.
- **ENABLE**: El cable que va al circuito de activación de la batería debe estar en el **Pin 5**.
- **ONEWIRE**: El cable de datos central de la batería debe estar en el **Pin 4**.

---
Configuración optimizada para Versión 1.2
