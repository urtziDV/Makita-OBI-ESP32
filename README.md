# Makita OBI ESP32 🔋

Herramienta avanzada de diagnóstico para baterías Makita LXT (18V) basada en ESP32.

## ✨ Características de la Versión 1.1

- **Triple Verificación de Presencia**: Eliminación de falsos positivos (baterías fantasma).
- **WiFi Dual y mDNS**: Acceso simultáneo vía AP/Station y URL amigable **<http://makita.local>**.
- **Gráficos en Tiempo Real**: Historial de voltajes celda por celda para diagnóstico de fatiga.
- **HUD Dinámico**: Indicador visual inteligente de salud del pack (Equilibrado/Crítico).
- **Asistente de Balanceo**: Indicaciones precisas para equilibrar packs descompensados.
- **Interfaz Web Premium**: Con modo oscuro, bilingüe (ES/EN) y Mobile Friendly.
- **Compatibilidad**: Diseñado para funcionar en cualquier ESP32 (incluido Mini/SuperMini).

## 📱 Capturas de Pantalla

| Vista Principal | Salud y Celdas | Gráficos e Historial |
| :---: | :---: | :---: |
| ![Main](docs/img/Salud_Balanceo) | ![Details](docs/img/Estado_Bateria) | ![Graph](docs/img/Grafico_Historial) |

> [!TIP]
> Accede a la configuración avanzada y actualización OTA desde el icono de engranaje ⚙️.

## 📂 Estructura del Proyecto

- `/src`: Código fuente del firmware (C++).
- `/data`: Interfaz web (HTML/JS/CSS).
- `/lib`: Librerías personalizadas para el protocolo OneWire de Makita.
- `/docs`: Documentación técnica, manuales y esquemas eléctricos.

## 🛠️ Requisitos de Hardware

- **ESP32** (Cualquier variante).
- Transistor NPN (BC547 o similar) + Resistencia 1kΩ (para el pin ENABLE).
- Resistencia Pull-up 4.7kΩ (para el pin DATA).
- [Ver Esquema Eléctrico](./docs/esquema_electrico.md)

## 🚀 Instalación rápida

1. Abre el proyecto en **VS Code** con **PlatformIO**.
2. Conecta tu ESP32.
3. Ejecuta **Upload** (Firmware).
4. Ejecuta **Upload Filesystem Image** (Interfaz Web).

## ⚖️ Licencia y Uso

Este proyecto ha sido basado en el trabajo original de **Belik1982** (https://github.com/Belik1982/esp32-makita-bms-reader).

- **Licencia**: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es) (Atribución-NoComercial-CompartirIgual).
- **Uso Comercial**: Queda estrictamente prohibida la venta de este software o de dispositivos que lo incluyan sin autorización expresa.
- **Créditos**: Se debe mantener siempre la referencia a los autores originales.

---
*Desarrollado para la comunidad de amantes de las herramientas y la electrónica.*
