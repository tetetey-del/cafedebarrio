# Cafedebarrio

Construye la web de "Café del Barrio": una landing de una sola página (scroll) para una cafetería de barrio que presenta el local e invita a contactar. Todo el contenido en español. Los datos del local son ficticios (proyecto de prueba).

PANTALLAS (una sola página con scroll):
1. Cabecera fija con el nombre "Café del Barrio" y enlaces de navegación con scroll suave: "Inicio", "Carta", "Nosotros", "Contacto". En móvil la navegación es colapsable (menú hamburguesa).
2. Hero: imagen de fondo de la cafetería, titular "Tu café de barrio de siempre", subtítulo "Granos recién tostados, repostería casera y buen ambiente", botón "Ver la carta" (hace scroll a la carta).
3. Sección "Nuestra carta": tarjetas con 6 productos (nombre, descripción breve, precio) leídos de la base de datos.
4. Sección "Sobre nosotros": texto corto y cercano sobre el local y una foto.
5. Sección "Horario y ubicación": horario por días (inventado, p. ej. lunes a viernes 7:30–20:00, sábados 8:30–21:00, domingos 9:00–15:00), dirección inventada y mapa embebido (Google Maps iframe).
6. Sección "Contacto": formulario con campos "Nombre", "Email", "Mensaje" y botón "Enviar mensaje".
7. Pie de página con dirección, teléfono (inventado) y enlaces a redes sociales (Instagram, Facebook).

DATOS (Lovable Cloud / base de datos):
- Tabla productos: id (uuid), nombre (texto), descripcion (texto), precio (decimal), categoria (texto).
- Tabla mensajes_contacto: id (uuid), nombre (texto), email (texto), mensaje (texto), creado_en (timestamp, por defecto now()).
- Políticas RLS: lectura pública de productos; inserción pública (anónima) en mensajes_contacto, sin lectura pública.
- Datos de ejemplo (con descripción breve inventada y categoría: bebida o comida): Café solo 1,40 €; Café con leche 1,80 €; Cappuccino 2,20 €; Croissant 1,60 €; Tostada con tomate 2,50 €; Tarta de queso 3,50 €. Mostrar precios con formato español (1,40 €).

DISEÑO:
Estética acogedora y cálida de cafetería de barrio: tonos marrón café, crema y verde, tipografía legible (titulares con una serif cálida, texto en sans), fotografía apetecible. Limpio y cercano, nada corporativo. Usa imágenes de stock de cafetería/café/repostería.

CRITERIOS DE ACEPTACIÓN:
- Totalmente responsive; se ve correctamente en móvil (navegación colapsable, secciones apiladas, imágenes adaptadas). Debe funcionar bien como web y como app móvil (PWA-friendly: meta viewport, theme-color).
- El formulario valida los campos (nombre obligatorio, email con formato válido, mensaje obligatorio con longitud mínima), guarda el mensaje en la base de datos y muestra una confirmación visible al usuario (y errores claros si falla).
- Imágenes con carga optimizada (loading="lazy", tamaños adaptados) salvo la imagen del hero.
- El proyecto debe poder desplegarse con una URL de previsualización pública.

STACK: React + TypeScript + Tailwind + shadcn/ui con Lovable Cloud (Supabase) para la base de datos.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://cafedebarrio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/653637a9-8d98-4fb8-be46-601be7139635).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
