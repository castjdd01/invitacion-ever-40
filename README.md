# Invitación galáctica de Ever Adilson

Invitación estática en HTML, CSS y JavaScript vanilla. Está diseñada primero para móvil y lista para alojarse gratis en GitHub Pages, sin cuentas, formularios, analítica ni servicios de pago.

## Vista previa local

Abre `index.html` en un navegador o sirve esta carpeta con un servidor estático local. La experiencia inicia con **Iniciar misión** y luego permite desplazarse por la presentación, los datos del evento, la búsqueda de ubicación en Google Maps y la despedida animada.

## Publicar en GitHub Pages

Después de aprobar el diseño:

1. Crea el repositorio público `invitacion-ever-40`.
2. Sube el contenido de esta carpeta a la raíz de la rama `main`.
3. En GitHub, abre **Settings → Pages** y selecciona despliegue desde `main` y `/ (root)`.
4. Cuando GitHub indique la URL pública, reemplaza `TU-USUARIO` en `og:url` y `og:image` dentro de `index.html` por el nombre de usuario real. La imagen social final es `assets/og-invitacion.png` (1200 × 630).
5. Comparte la URL HTTPS generada por GitHub Pages. La vista previa de WhatsApp solo podrá confirmarse después de publicar.

El enlace de Maps usa una búsqueda por nombre y dirección, sin coordenadas inventadas.

## Música opcional

El botón de música activa una fanfarria espacial original sintetizada en el navegador con Web Audio. No descarga pistas ni se reproduce automáticamente; la persona controla el sonido con el botón **Música apagada / Música activada**. La invitación sigue funcionando si el dispositivo no ofrece Web Audio.

## Cambiar datos

Edita el nombre, la edad, la fecha, la hora y la dirección en `index.html`. Actualiza también la descripción Open Graph y el arte de `assets/og-invitacion.png` si cambian los datos.
