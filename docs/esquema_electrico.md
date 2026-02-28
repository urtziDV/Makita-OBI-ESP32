# Esquema Eléctrico - Makita OBI ESP32

Este documento describe las conexiones necesarias para construir el hardware de diagnóstico.

## Diagrama de Conexiones

```mermaid
graph TD
    subgraph "ESP32 DevKit"
        GND[GND]
        3V3[3V3]
        G4[GPIO 4 - DATA]
        G5[GPIO 5 - ENABLE]
    end

    subgraph "Circuito Interfaz"
        R1[Resistencia 4.7kΩ]
        Q1[Transistor NPN / MOSFET]
        R2[Resistencia 4.7kΩ]
    end

    subgraph "Batería Makita (Puerto Amarillo)"
        B_GND[Terminal -]
        B_DATA[Pin Central Data]
        B_VCC[Terminal +]
    end

    %% Conexiones de Alimentación
    B_GND --- GND
    3V3 --- R1
    R1 --- G4
    G4 --- B_DATA

    %% Circuito de Activación (Opcional según BMS)
    G5 --- R2
    R2 --- Q1
    B_VCC --- Q1
    Q1 --- B_GND
```

## Listado de Conexiones (Pinout)

| Origen (ESP32) | Destino | Notas |
| :--- | :--- | :--- |
| **GND** | Terminal **-** Batería | Masa común obligatoria. |
| **GPIO 4** | **DATA (OneWire)** | Comunicación bidireccional con el BMS de la batería. |
| **GPIO 4** | Resistencia **4.7kΩ** a **3.3V** | Pull-up externo (Recomendado para estabilidad). |
| **GPIO 5** | Base Transistor (Vía R 4.7kΩ) | Pin de habilitación (ENABLE). |

## Componentes Necesarios (BOM)

1. **Microcontrolador**: ESP32 DevKit V1 o ESP32 Mini.
2. **Resistencias**:
    - 1x 4.7kΩ (Pull-up datos).
    - 1x 4.7kΩ (Base transistor).
3. **Semiconductor**:
    - 1x Transistor NPN (BC547) o MOSFET canal N (2N7000) para habilitación.
4. **Conector**: Adaptador impreso en 3D o terminales de pala.
5. **Alimentación**: USB o Buck Converter 5V desde la batería.

> [!IMPORTANT]
> Asegúrate de que la masa (GND) del ESP32 esté unida al terminal negativo de la batería.
