## Diagnóstico de baterías Makita con ESP32 e interfaz web
Este proyecto consiste en un dispositivo autónomo basado en el ESP32 para el diagnóstico completo de baterías de Li-ion Makita LXT. El dispositivo crea un servidor web al que se puede acceder desde cualquier smartphone o computadora vía Wi-Fi para visualizar el voltaje de las celdas, la temperatura, los ciclos de carga y ejecutar funciones de servicio.

## Capacidades clave
* Compatibilidad total: Soporte tanto para controladores estándar como para los modelos F0513, menos comunes.
* Interfaz web interactiva: Diseño adaptativo para dispositivos móviles y de escritorio.
* Visualización en tiempo real: Representación gráfica del paquete de baterías con indicación de color según el estado de cada celda.
* Cálculo de SOC: Cálculo automático del nivel de carga (State of Charge) basado en el voltaje promedio.
* Funciones de servicio: Posibilidad de ejecutar pruebas de LED y restablecer errores del BMS (para modelos compatibles).
* Multilingüe: Soporte para idioma Español.

## Componentes de hardware
* Microcontrolador ESP32 (Por ejemplo, Wemos D1 Mini ESP32 o NodeMCU-32S).
* Transistor NPN 2SD882 (o equivalente, como el BC547, aunque se prefiere el D882 por fiabilidad).
* Resistencia de 1 kΩ (para la base del transistor).
* Resistencia de 4.7 kΩ (resistencia pull-up; para compatibilidad con baterías antiguas, se recomienda ajustar el valor hasta 2.2 kΩ o menos para asegurar el encendido de la batería).
* Conector para la interfaz de la batería Makita.

## Esquema de conexión
El circuito utiliza un interruptor de transistor para adaptar los niveles lógicos entre 3.3V (ESP32) y 5V (BMS).

* Pin ON de la batería -> al Colector del transistor.
* Colector del transistor -> a través del resistor de 4.7 kΩ -> a +5V en el ESP32.
* Base del transistor -> a través del resistor de 1 kΩ -> al pin GPIO de control en el ESP32.
* Emisor del transistor -> a GND.
* Pin de datos (Data) de la batería -> al pin GPIO correspondiente en el ESP32.

## Firmware
El proyecto ha sido desarrollado en el entorno PlatformIO.
Abre el proyecto en VS Code con el plugin PlatformIO instalado.
Conecta el ESP32 a tu computadora.
Haz clic en PlatformIO: Upload and Monitor para compilar, grabar el firmware e iniciar el monitor serie.

## Licencia
Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
