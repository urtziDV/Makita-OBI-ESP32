# Pinout Report - Makita OBI ESP32

Summary of the ESP32 pin assignment for this project.

| Pin (GPIO) | Function | Description |
| :--- | :--- | :--- |
| **GPIO 4** | **DATA (OneWire)** | Communication with the battery's BMS. |
| **GPIO 5** | **ENABLE (BMS Power)** | Control of the BMS power transistor. |
| **GPIO 1 (TX0)** | **DEBUG (Serial)** | Serial port log output. |
| **GPIO 3 (RX0)** | **DEBUG (Serial)** | Serial data input. |

## Hardware Notes

- **Compatibility**: Pins <= 12 (GPIO 4 and 5) have been selected to ensure compatibility with **ESP32 Mini** and **SuperMini** boards, where higher pins are often unavailable.
- **ENABLE**: The wire going to the battery activation circuit must be on **Pin 5**.
- **ONEWIRE**: The central battery data wire must be on **Pin 4**.

---
Configuration optimized for Version 1.3
