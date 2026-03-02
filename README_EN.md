# Makita OBI ESP32 🔋

Advanced diagnostic tool for Makita LXT 18V (BL18) and 14.4V (BL14) batteries based on ESP32.

🇪🇸 [Versión en Español del proyecto (Spanish Version)](./README.md)

## ✨ Version 1.3 Features

- **Triple Presence Verification**: Elimination of false positives (ghost batteries).
- **Dual WiFi and mDNS**: Simultaneous access via AP/Station and user-friendly URL **<http://makita.local>**.
- **Real-Time Charts**: Cell-by-cell voltage history for fatigue diagnosis.
- **Dynamic HUD**: Intelligent visual pack health indicator (Balanced/Critical).
- **Balancing Assistant**: Precise instructions for balancing uncompensated packs.
- **Premium Web Interface**: With dark mode, bilingual (EN/ES), and Mobile-Friendly design.
- **Compatibility**: Designed to run on any ESP32 (including Mini/SuperMini).

## 📱 Screenshots

| Main View | Health and Cells | Charts and History |
| :---: | :---: | :---: |
| ![Main](docs/img/Salud_Balanceo) | ![Details](docs/img/Estado_Bateria) | ![Graph](docs/img/Grafico_Historial) |

> [!TIP]
> Access advanced settings and OTA updates from the gear icon ⚙️.

## 📂 Project Structure

- `/src`: Firmware source code (C++).
- `/data`: Web Interface (HTML/JS/CSS).
- `/lib`: Custom libraries for the Makita OneWire protocol.
- `/docs`: Technical documentation, user manuals, and electrical schematics.

## 🛠️ Hardware Requirements

- **ESP32** (Any variant).
- NPN Transistor (BC547 or similar) + 4.7kΩ Resistor (for the ENABLE pin).
- 2x 4.7kΩ Resistors in parallel (from the 5V pin to the transistor collector).
- 4.7kΩ Pull-up Resistor (for the DATA pin).
- [View Electrical Schematic](./docs/en/electrical_schematic.md)

## 🚀 Quick Setup

1. Open the project in **VS Code** with **PlatformIO**.
2. Connect your ESP32.
3. Run **Upload** (Firmware).
4. Run **Upload Filesystem Image** (Web Interface).

## 📝 Version History (Changelog)

- **v1.3** (Current):
  - Added support for battery models **BL1460A**, **BL1850B-D**, and BMS boards with STM32/RL78 microcontrollers (**LIPW014**, **LIPW015**, **LIPW017**).
  - Documentation updated (ENABLE pin corrected to GPIO 5 and resistor schematics improved).
- **v1.2**:
  - Implemented automatic support and dynamic rendering for **Makita BL14** batteries (14.4V - 4 cells).
- **v1.1**:
  - Added **mDNS** connection support (`http://makita.local`).
  - **Dynamic HUD** for status and **offline** history chart (local Chart.js imported).
  - New premium interface for OTA updates and UI/UX improvements.
- **v1.0**:
  - Initial stable release (Refactored for ESP32 based on Belik1982's project).

## ⚖️ License and Usage

This project is based on the original work by **Belik1982** (<https://github.com/Belik1982/esp32-makita-bms-reader>).

- **License**: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) (Attribution-NonCommercial-ShareAlike).
- **Commercial Use**: The sale of this software or devices incorporating it is strictly prohibited without explicit authorization.
- **Credits**: Reference to the original authors must always be maintained.

---
*Developed for the community of tool and electronics enthusiasts.*
