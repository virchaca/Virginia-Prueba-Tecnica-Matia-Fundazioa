# Virginia-Prueba-Técnica-Matia-Fundazioa

Este proyecto consiste en un formulario de registro de usuarios que añade los datos ingresados a una tabla en la misma pantalla. Se ha desarrollado utilizando **HTML, CSS y JavaScript puro**, sin frameworks.

## 📌 Características

- **Formulario de registro** con validaciones y mejoras de accesibilidad.
- **Validación de datos** en los campos de nombre, apellidos, email y teléfono.
- **Integración con API** para la carga dinámica de países y provincias.
- **Almacenamiento local** de los usuarios registrados mediante `localStorage`.
- **Búsqueda y filtrado** de usuarios por nombre, apellidos y país.
- **Mensajes de error y éxito** con retroalimentación visual para el usuario.
- **Diseño responsive** con adaptabilidad para escritorio, tablet y móvil.
- **Tabla con desplazamiento lateral** para mejor navegación en dispositivos pequeños.

## 🛠️ Tecnologías utilizadas

- **HTML5** para la estructura del contenido.
- **CSS3** con variables y media queries para el diseño responsivo.
- **JavaScript** para la funcionalidad y gestión de datos.
- **Fetch API** para la integración con servicios externos.

## 📋 Instalación y ejecución

1. Clona este repositorio en tu máquina local:
   ```sh
   git clone https://github.com/tuusuario/tu-repositorio.git
   ```
2. Abre el archivo `index.html` en tu navegador.

## 📝 Uso

1. Rellena los campos obligatorios (nombre, apellidos y email).
2. Si lo deseas, introduce el teléfono y selecciona un país.
3. Al seleccionar un país, se habilitará el select de provincias.
4. Presiona el botón **Añadir** o la tecla **Enter** para registrar el usuario.
5. Los usuarios aparecerán en la tabla y se guardarán en `localStorage`.
6. Utiliza el buscador para filtrar usuarios por nombre/apellidos o país.
7. Puedes enviar un email o llamar por teléfono directamente desde la tabla o lista de filtrado.

## 📌 API utilizada

- **Países:** `GET https://countriesnow.space/api/v0.1/countries/flag/unicode`
- **Provincias:** `POST https://countriesnow.space/api/v0.1/countries/states`

## 📱 Diseño responsivo

- **Escritorio:** Formulario con tres campos por fila.
- **Tablet:** Formulario con dos campos por fila.
- **Móvil:** Formulario con un campo por fila.
- La tabla tiene **scroll lateral** para facilitar la navegación en pantallas pequeñas, tanto con teclado como con ratón.

## 🏆 Mejoras implementadas

✅ Mensajes de error en rojo y resaltado de campos con errores.  
✅ Mensajes de usuario ya existente para no repetir regitros.  
✅ Mensaje de éxito al agregar un usuario, que desaparece en 5 segundos.  
✅ Scroll lateral en la tabla para mejorar la usabilidad.  
✅ Filtrado de usuarios en una lista separada sin modificar la tabla principal.  



## 📄 Licencia

Este proyecto ha sido desarrollado para la prueba técnica de **Matia Fundazioa** y no posee una licencia específica.

---
_Desarrollado por [Virginia Álvarez Pérez](https://github.com/virchaca) ✨_