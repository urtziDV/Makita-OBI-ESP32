# Electrical Schematic - Makita OBI ESP32

This document describes the connections needed to build the diagnostic hardware.

## Connection Diagram

```mermaid
graph TD
    subgraph "ESP32 DevKit"
        GND[GND]
        3V3[3V3]
        G4[GPIO 4 - DATA]
        G5[GPIO 5 - ENABLE]
        5V[5V / VIN]
    end

    subgraph "Interface Circuit"
        R1["2x 4.7kΩ Resistors (Parallel)"]
        Q1[NPN Transistor / MOSFET]
        R2[4.7kΩ Resistor]
    end

    subgraph "Makita Battery (Yellow Port)"
        B_GND[- Terminal]
        B_DATA[Center Pin Data]
        B_VCC[+ Terminal]
    end

    %% Power Connections
    B_GND --- GND
    5V --- R1
    R1 --- G4
    G4 --- B_DATA

    %% Activation Circuit (Optional depending on BMS)
    G5 --- R2
    R2 --- Q1
    B_VCC --- Q1
    Q1 --- B_GND
```

## Connection List (Pinout)

| Source (ESP32) | Destination | Notes |
| :--- | :--- | :--- |
| **GND** | **-** Battery Terminal | Common ground required. |
| **GPIO 4** | **DATA (OneWire)** | Bidirectional communication with the battery's BMS. |
| **GPIO 4** | **4.7kΩ** Resistor to **3.3V** | External pull-up (Recommended for stability). |
| **GPIO 5** | Transistor Base (Via 4.7kΩ R) | Enable pin (ENABLE). |

## Bill of Materials (BOM)

1. **Microcontroller**: ESP32 DevKit V1 or ESP32 Mini.
2. **Resistors**:
    - 1x 4.7kΩ (Data pull-up to 3.3V).
    - 2x 4.7kΩ in parallel (Power pull-up from 5V to transistor).
    - 1x 4.7kΩ (Transistor base).
3. **Semiconductor**:
    - 1x NPN Transistor (BC547) or N-channel MOSFET (2N7000) for enabling.
4. **Connector**: 3D printed adapter or spade terminals.
5. **Power Supply**: USB or 5V Buck Converter from the battery.

> [!IMPORTANT]
> Make sure the ESP32 ground (GND) is connected to the battery's negative terminal.
