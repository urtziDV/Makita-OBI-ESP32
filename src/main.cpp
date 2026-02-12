// src/main.cpp - VERSIÓN FINAL DOCUMENTADA

#include <Arduino.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <DNSServer.h>
#include <ESPmDNS.h>
#include <ArduinoJson.h>
#include "FS.h"
#include "LittleFS.h"
#include <Update.h>
#include "MakitaBMS.h"

// --- Declaraciones Forward (Prototipos) ---
void saveConfig(const String& lang, const String& theme, const String& ssid = "", const String& pass = "");
void loadConfig(String& lang, String& theme, String& wifi_ssid, String& wifi_pass);
String statusToString(BMSStatus status); 

// --- Configuraciones y objetos globales ---
// Pin GPIO para la comunicación de un solo hilo (OneWire)
#define ONEWIRE_PIN 4
// Pin GPIO para controlar el transistor NPN que alimenta el BMS (Cambiado al 5 para compatibilidad mini)
#define ENABLE_PIN  5

// SSID del Punto de Acceso WiFi que creará el ESP32
const char* ssid = "Makita_OBI_ESP32";

// Servidor DNS para soportar el portal cautivo (redirección automática)
DNSServer dnsServer;
// Servidor Web asíncrono en el puerto estándar 80
AsyncWebServer server(80);
// Canal WebSocket para comunicación en tiempo real con la interfaz web
AsyncWebSocket ws("/ws");
// SSID del Punto de Acceso WiFi que creará el ESP32
const char* ssid_ap = "Makita_OBI_ESP32";

// Instancia de la clase controladora del BMS de Makita
MakitaBMS bms(ONEWIRE_PIN, ENABLE_PIN);

// Caché global de datos para mantener la información estática al solicitar actualizaciones dinámicas
static BatteryData cached_data;
// Configuración persistente (WiFi Station)
static String current_lang = "es";
static String current_theme = "light";
static String current_wifi_ssid = "";
static String current_wifi_pass = "";

// Variables para control de intervalos
unsigned long lastPresenceCheck = 0;
bool lastPresenceState = false;
const unsigned long PRESENCE_INTERVAL = 4000; // 4 segundos entre chequeos

// --- Funciones de Comunicación ---

/**
 * Envía la información de la batería formateada en JSON a todos los clientes conectados.
 * @param type Tipo de mensaje (static_data o dynamic_data)
 * @param data Estructura con los valores leídos de la batería
 * @param features Puntero a las funciones soportadas (opcional)
 */
void sendJsonResponse(const String& type, const BatteryData& data, const SupportedFeatures* features) {
    if (ws.count() == 0) return;
    DynamicJsonDocument doc(2048);
    doc["type"] = type;

    JsonObject dataObj = doc.createNestedObject("data");
    dataObj["model"] = data.model;
    dataObj["charge_cycles"] = data.charge_cycles;
    dataObj["lock_status"] = data.lock_status;
    dataObj["status_code"] = data.status_code;
    dataObj["mfg_date"] = data.mfg_date;
    dataObj["capacity"] = data.capacity;
    dataObj["battery_type"] = data.battery_type;
    dataObj["pack_voltage"] = data.pack_voltage;
    JsonArray cellV = dataObj.createNestedArray("cell_voltages");
    for(int i=0; i<data.cell_count; i++) cellV.add(data.cell_voltages[i]);
    dataObj["cell_diff"] = data.cell_diff;
    dataObj["temp1"] = data.temp1;
    dataObj["temp2"] = data.temp2;
    dataObj["rom_id"] = data.rom_id;

    if (features) {
        JsonObject featuresObj = doc.createNestedObject("features");
        featuresObj["read_dynamic"] = features->read_dynamic;
        featuresObj["led_test"] = features->led_test;
        featuresObj["clear_errors"] = features->clear_errors;
    }

    String output;
    serializeJson(doc, output);
    ws.textAll(output);
}

/**
 * Envía un mensaje de éxito, error o informativo a la interfaz web.
 */
void sendFeedback(const String& type, const String& message) {
    if (ws.count() == 0) return;
    DynamicJsonDocument doc(512);
    doc["type"] = type;
    doc["message"] = message;
    String output;
    serializeJson(doc, output);
    ws.textAll(output);
}

/**
 * Notifica a los clientes si hay una batería físicamente detectada en el bus.
 */
void sendPresence(bool is_present) {
    if (ws.count() == 0) return;
    DynamicJsonDocument doc(64);
    doc["type"] = "presence";
    doc["present"] = is_present;
    String output;
    serializeJson(doc, output);
    ws.textAll(output);
}

/**
 * Envía mensajes de log del sistema a la interfaz web para depuración remota.
 */
void logToClients(const String& message, LogLevel level) {
    Serial.println(message);
    String prefix = (level == LOG_LEVEL_DEBUG) ? "[DBG] " : "";
    sendFeedback("debug", prefix + message);
}

/**
 * Manejador principal de eventos WebSocket: procesa comandos desde la interfaz web.
 */
void onWebSocketEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
    if (type == WS_EVT_CONNECT) {
        Serial.printf("Cliente WS #%u conectado\n", client->id());
        sendPresence(bms.isPresent());
    } else if (type == WS_EVT_DISCONNECT) {
        Serial.printf("Cliente WS #%u desconectado\n", client->id());
    } else if (type == WS_EVT_DATA) {
        DynamicJsonDocument doc(256);
        if (deserializeJson(doc, (char*)data) != DeserializationError::Ok) return;
        
        String command = doc["command"];

        if (command == "presence") {
            sendPresence(bms.isPresent());
        } else if (command == "read_static") {
            // Lectura única de datos maestros de la batería
            BatteryData fresh_data;
            SupportedFeatures fresh_features;
            BMSStatus status = bms.readStaticData(fresh_data, fresh_features);
            if (status == BMSStatus::OK) {
                cached_data = fresh_data;
                sendJsonResponse("static_data", cached_data, &fresh_features);
                sendPresence(true);
            } else {
                sendFeedback("error", statusToString(status));
            }
        } else if (command == "read_dynamic") {
            // Lectura de voltajes y temperaturas actuales
            BMSStatus status = bms.readDynamicData(cached_data);
            if (status == BMSStatus::OK) {
                sendJsonResponse("dynamic_data", cached_data, nullptr);
            } else {
                sendFeedback("error", statusToString(status));
            }
        } else if (command == "led_on") {
            // Enciende los LEDs de la batería (solo modelos STANDARD)
            BMSStatus status = bms.ledTest(true);
            if (status == BMSStatus::OK) sendFeedback("success", "Comando LED ON enviado.");
            else sendFeedback("error", statusToString(status));
        } else if (command == "led_off") {
            // Apaga los LEDs de la batería
            BMSStatus status = bms.ledTest(false);
            if (status == BMSStatus::OK) sendFeedback("success", "Comando LED OFF enviado.");
            else sendFeedback("error", statusToString(status));
        } else if (command == "clear_errors") {
            // Intenta resetear contadores de error del controlador
            BMSStatus status = bms.clearErrors();
            if (status == BMSStatus::OK) sendFeedback("success", "Comando Limpiar Errores enviado.");
            else sendFeedback("error", statusToString(status));
        } else if (command == "set_logging") {
            // Activa o desactiva la depuración detallada
            bool enabled = doc["enabled"];
            bms.setLogLevel(enabled ? LOG_LEVEL_DEBUG : LOG_LEVEL_INFO);
            logToClients(String("Nivel de log: ") + (enabled ? "DEBUG" : "INFO"), LOG_LEVEL_INFO);
        } else if (command == "get_config") {
            DynamicJsonDocument configDoc(256);
            configDoc["type"] = "config";
            configDoc["lang"] = current_lang;
            configDoc["theme"] = current_theme;
            String out;
            serializeJson(configDoc, out);
            client->text(out);
        } else if (command == "save_config") {
            current_lang = doc["lang"].as<String>();
            current_theme = doc["theme"].as<String>();
            saveConfig(current_lang, current_theme, current_wifi_ssid, current_wifi_pass);
            logToClients(current_lang == "es" ? "Configuración guardada." : "Settings saved.", LOG_LEVEL_INFO);
        } else if (command == "set_wifi") {
            current_wifi_ssid = doc["ssid"].as<String>();
            current_wifi_pass = doc["pass"].as<String>();
            saveConfig(current_lang, current_theme, current_wifi_ssid, current_wifi_pass);
            logToClients(current_lang == "es" ? "WiFi configurado. Reiniciando..." : "WiFi configured. Restarting...", LOG_LEVEL_INFO);
            delay(1000);
            ESP.restart();
        }
    }
}

// Clase para forzar la redirección del Portal Cautivo hacia index.html
class CaptiveRequestHandler : public AsyncWebHandler {
public:
    CaptiveRequestHandler() {}
    virtual ~CaptiveRequestHandler() {}
    bool canHandle(AsyncWebServerRequest *request){ return true; }
    void handleRequest(AsyncWebServerRequest *request) {
        request->send(LittleFS, "/index.html", "text/html");
    }
};

/**
 * Persistencia de configuración en Flash.
 */
void saveConfig(const String& lang, const String& theme, const String& wifi_ssid, const String& wifi_pass) {
    File file = LittleFS.open("/config.json", "w");
    if (!file) return;
    DynamicJsonDocument doc(512);
    doc["lang"] = lang;
    doc["theme"] = theme;
    doc["wifi_ssid"] = wifi_ssid;
    doc["wifi_pass"] = wifi_pass;
    serializeJson(doc, file);
    file.close();
}

void loadConfig(String& lang, String& theme, String& wifi_ssid, String& wifi_pass) {
    if (!LittleFS.exists("/config.json")) return;
    File file = LittleFS.open("/config.json", "r");
    if (!file) return;
    DynamicJsonDocument doc(512);
    deserializeJson(doc, file);
    lang = doc["lang"] | "es";
    theme = doc["theme"] | "light";
    wifi_ssid = doc["wifi_ssid"] | "";
    wifi_pass = doc["wifi_pass"] | "";
    file.close();
}

void setup() {
    Serial.begin(115200);
    Serial.println("\nIniciando Makita BMS Tool...");
    
    // Inicialización del sistema de archivos LittleFS
    if(!LittleFS.begin(true)){ 
        Serial.println("Error al montar LittleFS");
        return; 
    }
    Serial.println("LittleFS montado correctamente.");
    
    // Cargar configuración guardada
    loadConfig(current_lang, current_theme, current_wifi_ssid, current_wifi_pass);
    Serial.printf("Configuración cargada: Lang=%s, Theme=%s\n", current_lang.c_str(), current_theme.c_str());

    bms.setLogCallback(logToClients);

    // Modo WiFi Dual: SoftAP + Station
    WiFi.mode(WIFI_AP_STA);
    WiFi.softAP(ssid_ap);
    Serial.print("Punto de Acceso iniciado: ");
    Serial.println(WiFi.softAPIP());

    if (current_wifi_ssid.length() > 0) {
        Serial.printf("Intentando conectar a WiFi: %s\n", current_wifi_ssid.c_str());
        WiFi.begin(current_wifi_ssid.c_str(), current_wifi_pass.c_str());
        // No bloqueamos el setup; la conexión se gestionará de fondo
    }
    
    ws.onEvent(onWebSocketEvent);
    server.addHandler(&ws);

    // Endpoint OTA
    server.on("/update", HTTP_POST, [](AsyncWebServerRequest *request){
        bool updateFailed = Update.hasError();
        AsyncWebServerResponse *response = request->beginResponse(200, "text/plain", updateFailed ? "FAIL" : "OK");
        response->addHeader("Connection", "close");
        request->send(response);
        if(!updateFailed) ESP.restart();
    }, [&](AsyncWebServerRequest *request, String filename, size_t index, uint8_t *data, size_t len, bool final){
        if (!index) {
            Serial.printf("Actualización iniciada: %s\n", filename.c_str());
            if (!Update.begin(UPDATE_SIZE_UNKNOWN)) {
                Update.printError(Serial);
            }
        }
        if (!Update.hasError()) {
            if (Update.write(data, len) != len) {
                Update.printError(Serial);
            }
        }
        if (final) {
            if (Update.end(true)) {
                Serial.printf("Actualización completada: %u bytes\n", index + len);
            } else {
                Update.printError(Serial);
            }
        }
    });

    // Servir archivos estáticos
    server.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");
    
    dnsServer.start(53, "*", WiFi.softAPIP());
    server.addHandler(new CaptiveRequestHandler());
    
    if (MDNS.begin("makita")) {
        Serial.println("mDNS iniciado: http://makita.local");
    }

    server.begin();
    Serial.println("Servidor HTTPS/WS listo.");
}

void loop() {
    // Procesamiento de peticiones DNS para el Portal Cautivo
    dnsServer.processNextRequest();

    // Limpieza de clientes WebSocket inactivos
    ws.cleanupClients();

    // Ticker de Presencia: Notifica cambios de estado automáticamente
    unsigned long now = millis();
    if (now - lastPresenceCheck > PRESENCE_INTERVAL) {
        lastPresenceCheck = now;
        bool currentPresence = bms.isPresent();
        if (currentPresence != lastPresenceState) {
            lastPresenceState = currentPresence;
            sendPresence(currentPresence);
            
            // Si la batería desaparece, informamos por el log
            if (!currentPresence) {
                logToClients("Batería desconectada.", LOG_LEVEL_INFO);
            }
        }
    }
}
