# Uploading to ESP32 Guide

This project uses **PlatformIO**. For it to work correctly, you must perform two different uploads: the **firmware** (C++ code) and the **filesystem** (HTML/CSS/JS files in the `/data` folder).

## 1. Upload the Firmware (Code)

This compiles and uploads the `main.cpp` file and the libraries.

- **In VS Code (Interface):**
    1. Click on the **PlatformIO** icon (the ant) in the left sidebar.
    2. In the `Project Tasks` menu, find `esp32-wroom-32`.
    3. Select **General** -> **Upload**.
- **Via Command Line (CLI):**

    ```powershell
    pio run --target upload
    ```

## 2. Upload the Filesystem (LittleFS)

**IMPORTANT!** If you do not do this step, the web interface will not load because the ESP32 won't find the `index.html` file.

- **In VS Code (Interface):**
    1. Go to the **PlatformIO** icon -> `Project Tasks` -> `esp32-wroom-32`.
    2. Look for the **Platform** section.
    3. Click on **Upload Filesystem Image**.
- **Via Command Line (CLI):**

    ```powershell
    pio run --target uploadfs
    ```

## 3. Monitoring

To see debugging messages (such as the IP assigned to the ESP32):

- Click the "plug" icon in the bottom bar of VS Code or:
- **PlatformIO** -> `Project Tasks` -> **Monitor**.

---

### Additional Notes

- Make sure your ESP32 is connected via USB.
- If the upload fails, try holding down the **BOOT** button on the board just when "Connecting..." appears in the terminal.
- The port and speed are configured in the [platformio.ini](file:///d:/GITHUB/Makita-OBI-ESP32/platformio.ini) file.
