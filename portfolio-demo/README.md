# Configurador Visual de Muebles — Portfolio Demo

Demo interactiva de un sistema de configuración visual para muebles.

Este proyecto fue desarrollado originalmente como un MVP full-stack para un negocio real de fabricación de muebles y posteriormente reducido y adaptado como demostración técnica para portfolio.

## Objetivo

El objetivo de esta demo es mostrar cómo una interfaz puede permitir al usuario configurar un producto mediante diferentes dimensiones de personalización:

- Colección de telas
- Tela específica
- Tipo de pata
- Render visual asociado
- Medidas del producto
- Solicitud de cotización por WhatsApp

La demo utiliza un único producto para concentrar la experiencia y mostrar claramente la arquitectura de configuración.

## Problema de escalabilidad

El reto principal del proyecto no era solamente construir una página de productos, sino diseñar una estructura capaz de manejar múltiples combinaciones visuales.

Un catálogo más grande podría llegar a representar:

```text
40 productos
× 5 colecciones
× 9 telas
× 3 tipos de pata
= 5.400 combinaciones visuales
```

Agregar nuevas configuraciones, como cojines, tipos de brazos o materiales adicionales, incrementaría todavía más el número de combinaciones.

Por este motivo, la arquitectura separa:

```text
Producto
+
Colección
+
Tela
+
Pata
=
Render
```

en lugar de crear una página independiente para cada combinación.

## Arquitectura de esta demo

Esta versión está diseñada específicamente para funcionar como sitio estático.

```text
HTML
│
├── CSS
├── JavaScript
├── catalogo.json
└── Assets WebP
```

El proyecto utiliza:

- HTML5
- CSS
- Vanilla JavaScript
- JSON
- WebP
- Tailwind CSS vía CDN
- Bootstrap Icons

La versión original del proyecto utilizaba además:

- Node.js
- Express
- EJS
- PostgreSQL
- Helmet
- Middleware
- Tests automatizados

La base de datos no forma parte de esta demo porque su objetivo es facilitar una demostración pública estática.

## Configuración visual

### Producto

**Sala Click Clack Jumbo Completa**

### Colecciones

- Suiza
- Boreal

### Telas

- 5 variantes de Suiza
- 9 variantes de Boreal

Total:

**14 telas**

### Patas

- Madera
- Aluminio
- Plástico

### Combinaciones objetivo

```text
14 telas × 3 patas = 42 combinaciones
```

Los renders que todavía no existen se representan mediante `null` en `catalogo.json`.

Esto permite ampliar el sistema progresivamente sin modificar la lógica de la aplicación.

## Funcionalidades

La demo permite:

- visualizar el producto;
- navegar por las vistas;
- abrir una colección;
- explorar las telas disponibles;
- seleccionar una tela;
- seleccionar el tipo de pata;
- cambiar dinámicamente el render cuando existe;
- utilizar un fallback cuando un render todavía no está disponible;
- visualizar las medidas;
- generar un enlace de cotización por WhatsApp.

## Estructura

```text
portfolio-demo/
│
├── css/
│   └── styles.css
│
├── data/
│   └── catalogo.json
│
├── images/
│   ├── productos/
│   │   └── sala-click-clack-jumbo-completa/
│   │
│   └── telas/
│       ├── boreal/
│       └── suiza/
│
├── js/
│   └── main.js
│
├── index.html
├── .gitignore
└── README.md
```

## Decisiones de diseño

### Datos separados de la interfaz

Las colecciones, telas, patas y renders no están definidos directamente dentro de la interfaz.

La información vive en:

```text
data/catalogo.json
```

Esto permite modificar o ampliar el catálogo sin reconstruir la estructura HTML.

### Renders opcionales

No todas las combinaciones requieren existir desde el comienzo.

Por ejemplo:

```json
{
  "Madera": "images/.../muestra-02.webp",
  "Aluminio": null,
  "Plástico": null
}
```

La interfaz detecta automáticamente si existe un render y utiliza la imagen principal como fallback cuando todavía no está disponible.

### Assets

Los assets finales utilizados por la demo están optimizados en formato WebP.

Los archivos fuente utilizados durante el proceso de producción visual no forman parte de la demo pública.

## Demo

Esta carpeta está preparada para ser desplegada como sitio estático.

El objetivo es poder alojar la demostración en una plataforma como GitHub Pages sin depender de:

- PostgreSQL
- Node.js
- Express
- variables de entorno
- servicios externos de backend

## Proyecto original

El proyecto original fue desarrollado como una aplicación full-stack para un negocio real.

La versión completa incluyó:

```text
Node.js
Express
PostgreSQL
EJS
Vanilla JavaScript
Tailwind CSS
Helmet
Rate limiting
Validación
Tests
Persistencia de carrito
Catálogo
Cotización por WhatsApp
Configuración visual
```

Esta demo es una reducción intencional del proyecto original para facilitar su publicación y evaluación técnica.

## Estado actual

### Implementado

- [x] Configuración por colección
- [x] Configuración por tela
- [x] Configuración por tipo de pata
- [x] Cambio dinámico de renders
- [x] Fallback de renders
- [x] Medidas
- [x] WhatsApp
- [x] Responsive
- [x] Galería
- [x] Modal de telas

### Producción visual actual

- [x] 5 renders Suiza / Madera
- [x] 9 renders Boreal / Madera
- [x] 1 render Boreal / Aluminio
- [x] 1 render Boreal / Plástico

Total de renders actualmente disponibles:

**16 / 42**

Pendientes de producción visual:

**26 renders**

## Nota

Esta demo es un proyecto de portfolio desarrollado a partir de un MVP real.

No representa una tienda en producción ni recopila información del visitante.

El objetivo principal es demostrar la arquitectura de configuración visual, manejo de datos y organización de assets.
