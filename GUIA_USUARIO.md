# Guía del Usuario

## 1. Primer encendido y conexión

1. **Conecta la batería Makita** al dispositivo de diagnóstico.
2. **Suministra energía** al dispositivo (a través del puerto USB del ESP32).
3. **Toma tu smartphone o portátil** y abre la lista de redes Wi-Fi disponibles.
4. Busca y conéctate a la red llamada **`OpenMakita-ESP`**. No se requiere contraseña.
5. Tras conectarte a esta red, es posible que se abra automáticamente una página de inicio de sesión en tu dispositivo. Si esto no ocurre, abre el navegador y dirígete a la dirección **`http://192.168.4.1`**.

## 2. Uso de la interfaz web

Verás la pantalla principal del programa.

### Paso 1: Lectura de información de la batería

* Presiona el botón azul grande **"1. Leer Info"**.
* El dispositivo detectará el modelo de tu batería y mostrará la información básica: ciclos de carga, fecha de fabricación, etc.
* Después de esto, el resto de los botones se activarán.

### Paso 2: Visualización de datos en tiempo real

* Debajo de la tabla con la información básica aparecerá un **esquema gráfico de tu batería**.
* Cada rectángulo representa una celda. Dentro de él se indica su voltaje exacto.
* El **color de la celda** indica su estado:
  * **Verde:** Celda completamente cargada (cerca de 4.2V).
  * **Amarillo/Verde claro:** Voltaje de funcionamiento normal.
  * **Rojo:** Celda muy descargada (cerca de 2.8V).
* Debajo del esquema se muestra el **voltaje total** de todo el conjunto y el **nivel de carga en porcentaje (SOC)**.
* Para actualizar estos datos, presiona el botón **"2. Actualizar datos"**.

### Paso 3: Diagnóstico y advertencias

* **Desequilibrio:** Si una de las celdas en el esquema aparece resaltada en **color gris y con una línea punteada**, significa que tiene un nivel significativamente inferior a las demás. Aparecerá una **advertencia amarilla** debajo del esquema indicando la necesidad de equilibrado (balaceo).
* **Descarga crítica:** Si el voltaje de una celda cae demasiado, aparecerá una **advertencia roja** bajo el esquema indicando que el elemento podría estar defectuoso.
* **Soporte limitado:** Para algunos modelos de batería (por ejemplo, con controlador F0513), las funciones de servicio no están disponibles. En este caso, verás un **mensaje informativo azul** al respecto, y los botones "Test LED" y "Limpiar errores" permanecerán inactivos.

### Paso 4: Funciones de servicio (para baterías compatibles)

* **"Limpiar errores"**: Presiona este botón si en la tabla "Código de estado" aparece un error, para intentar restablecerlo.
* **"Test LED"**: Presiona este botón para encender los LEDs en el cuerpo de la batería. Al presionarlo de nuevo se apagarán.
