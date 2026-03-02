# Assembly Guide - Building the Device

Follow these steps to build your own **Makita OBI ESP32** diagnostic tool.

## Phase 1: Hardware Preparation

### 1. Prepare the Battery Connector

- You need three contacts: **V+** (Positive), **V-** (Negative), and the **Data Pin** (small center one).

### 2. Board Assembly

- Connect the ESP32's **GND** to the negative rail (V-).
- Connect **GPIO 4** to the battery's data pin.
- **Pull-up**: Place a 4.7kΩ resistor between **GPIO 4** and the ESP32's **3.3V** pin.

### 3. Enable Circuit

- Connect **GPIO 5** to the base of an NPN transistor (or the gate of a MOSFET) through a 4.7kΩ resistor.
- Connect **two 4.7kΩ resistors in parallel** from the **5V** pin to the collector of the transistor to power the BMS.
- The transistor must act as a switch to activate the BMS.

## Phase 2: Software Configuration

### 1. Firmware Upload

- Open the project in **PlatformIO** and click **Upload**.

### 2. Web Interface Upload (LittleFS)

- Find the **Upload Filesystem Image** option in the PlatformIO menu. This step is mandatory!

## Phase 3: Final Testing

1. Connect the ESP32 to USB or a 5V power source.
2. Look for the `Makita_OBI_ESP32` WiFi network.
3. Go to `http://makita.local` or `http://192.168.4.1`.
4. Connect a battery and click "Read Info".

> [!TIP]
> If you are going to power the ESP32 directly from the Makita battery's 18V, always use a 5V **Buck Converter**.
