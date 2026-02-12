// src/MakitaBMS.h - VERSIÓN OPTIMIZADA Y DOCUMENTADA

#ifndef MAKITA_BMS_H
#define MAKITA_BMS_H

#include <Arduino.h>
#include <functional>
#include "OneWireMakita.h"

// --- Enumeraciones y Tipos ---

// Niveles de log para una depuración flexible
enum LogLevel { 
    LOG_LEVEL_NONE,  // No mostrar ningún mensaje de depuración
    LOG_LEVEL_INFO,  // Mostrar solo eventos principales y errores críticos
    LOG_LEVEL_DEBUG  // Salida detallada con volcados de datos hexadecimales (HEX-dumps)
};

// Estados de operación y códigos de error del BMS
enum class BMSStatus {
    OK,                        // Operación completada con éxito
    ERROR_NOT_PRESENT,         // La batería no responde al pulso de presencia
    ERROR_NOT_IDENTIFIED,      // Se intentó una acción sin haber leído primero los datos estáticos
    ERROR_MODEL_NOT_SUPPORTED, // Se detectó una batería pero su protocolo es desconocido
    ERROR_COMMUNICATION,       // Fallo de integridad o tiempo en el bus de datos
    ERROR_NOT_AVAILABLE        // La función solicitada no existe para este modelo de batería
};

// Función auxiliar para convertir el estado interno a un mensaje legible para el usuario
String statusToString(BMSStatus status);

// Callback para redirigir los logs (por ejemplo, a Serial o a WebSocket)
using LogCallback = std::function<void(const String&, LogLevel)>;

// --- Estructuras de Datos ---

// Estructura para almacenar la información técnica "limpia" de la batería
struct BatteryData {
    String model = "N/A";           // Nombre del modelo (ej: BL1830)
    int charge_cycles = 0;          // Contador total de ciclos de carga
    String lock_status = "N/A";     // Estado de bloqueo del controlador
    String status_code = "00";      // Código de estado interno en HEX
    float pack_voltage = 0.0;       // Voltaje total sumado del paquete (V)
    int cell_count = 5;             // Número de celdas en serie (5 para 18V, 4 para 14.4V)
    float cell_voltages[5] = {0.0}; // Voltaje individual de cada una de las 5 celdas
    float cell_diff = 0.0;          // Diferencia máxima entre la celda más alta y más baja
    float temp1 = 0.0, temp2 = 0.0; // Temperaturas medidas por los sensores internos (°C)
    String mfg_date = "N/A";        // Fecha de fabricación formateada
    String capacity = "N/A";        // Capacidad nominal (ej: 5.0Ah)
    String battery_type = "";       // Identificador del tipo de química/generación
    String rom_id = "";             // Identificación de 8 bytes de la ROM del BMS
};

// Estructura para saber qué comandos permite ejecutar el modelo detectado
struct SupportedFeatures {
    bool read_dynamic = false; // ¿Permite leer voltajes de celdas?
    bool led_test = false;     // ¿Permite controlar los LEDs manualmente?
    bool clear_errors = false; // ¿Permite borrar errores/bloqueos?
};

// --- Clase Controladora Principal ---

/**
 * Clase que encapsula toda la lógica de bajo nivel y protocolo para interactuar
 * con los diferentes sistemas de gestión de baterías (BMS) de Makita.
 */
class MakitaBMS {
public:
    // Comandos constantes del protocolo Makita (definidos en HEX)
    static constexpr byte CMD_READ_STATIC[]     = {0xAA, 0x00}; // Leer tabla de datos maestros
    static constexpr byte CMD_READ_DYNAMIC[]    = {0xD7, 0x00, 0x00, 0xFF}; // Leer voltajes/temp
    static constexpr byte CMD_LED_TEST_INIT[]   = {0xD9, 0x96, 0xA5}; // Iniciar modo test LED
    static constexpr byte CMD_LED_ON[]          = {0xDA, 0x31}; // Encender LEDs
    static constexpr byte CMD_LED_OFF[]         = {0xDA, 0x34}; // Apagar LEDs
    static constexpr byte CMD_CLEAR_ERR_INIT[]  = {0xD9, 0x96, 0xA5}; // Iniciar reseteo de errores
    static constexpr byte CMD_CLEAR_ERR_EXEC[]  = {0xDA, 0x04}; // Ejecutar borrado
    static constexpr byte CMD_GET_MODEL[]       = {0xDC, 0x0C}; // Consultar nombre del modelo

    /**
     * @param onewire_pin Pin GPIO para datos
     * @param enable_pin Pin GPIO para habilitar la alimentación del BMS
     */
    MakitaBMS(uint8_t onewire_pin, uint8_t enable_pin);
    
    // Configuración del sistema de registro de eventos
    void setLogCallback(LogCallback callback);
    void setLogLevel(LogLevel level);

    // Operaciones principales
    bool isPresent(); // Verifica si hay conexión física
    BMSStatus readStaticData(BatteryData &data, SupportedFeatures &features); // Identifica el modelo
    BMSStatus readDynamicData(BatteryData &data); // Lee voltajes en tiempo real
    BMSStatus ledTest(bool on); // Prueba visual de LEDs
    BMSStatus clearErrors();    // Intenta restaurar baterías "muertas" (solo modelos compatibles)

private:
    OneWireMakita makita; // Capa de abstracción del bus físico
    uint8_t _enable_pin;   // Pin de control de alimentación
    
    // Tipos de controladores detectados
    enum class ControllerType { UNKNOWN, STANDARD, F0513 } _controller = ControllerType::UNKNOWN;
    bool _is_identified = false; // Flag para asegurar el flujo correcto de comandos
    
    LogCallback _log;
    LogLevel _logLevel = LOG_LEVEL_DEBUG;
    
    // Funciones internas de comunicación por el bus
    void cmd_and_read_33(const byte* cmd, uint8_t cmd_len, byte* rsp, uint8_t rsp_len);
    void cmd_and_read_cc(const byte* cmd, uint8_t cmd_len, byte* rsp, uint8_t rsp_len);
    
    // Utilidad para corregir el orden de los bits/nibbles en algunos campos
    byte nibble_swap(byte b) { return (b >> 4) | (b << 4); }
    
    // Métodos específicos de identificación por tipo de hardware
    String getModel();
    String getF0513Model();

    // Gestión interna de logs y volcado de datos
    void logger(const String& message, LogLevel level); 
    void log_hex(const String& prefix, const byte* data, int len);
};

#endif
