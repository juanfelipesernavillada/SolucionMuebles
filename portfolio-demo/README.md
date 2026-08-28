# Furniture Configurator — Portfolio Demo

[![VIEW DEMO](https://img.shields.io/badge/VIEW_DEMO-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white)](https://juanfelipesernavillada.github.io/SolucionMuebles/portfolio-demo/)

A focused static demonstration of the visual configurator originally developed as part of a full-stack furniture catalog.

This version isolates the most representative interaction of the original project so it can be evaluated directly in a browser without requiring a database or backend server.

---

## Purpose

The original application evolved from a conventional furniture catalog into an interactive product configurator.

This demo focuses exclusively on that configuration experience:

```text
Product
   ↓
Collection
   ↓
Fabric
   ↓
Leg Type
   ↓
Visual Render
```

The objective is to demonstrate how a product can be modeled as a combination of reusable configuration dimensions rather than as a collection of unrelated product pages.

## Why This Demo Exists
The original implementation uses a complete full-stack architecture: Node.js, Express, EJS, PostgreSQL, Security middleware, API routes, and Automated tests.

That architecture is appropriate for a real application.
For portfolio evaluation, however, requiring a recruiter to configure a database and start a backend server just to test the configurator would create unnecessary friction.
The `portfolio-demo` directory therefore provides a deliberately simplified static version.

* `original/` → Full-stack implementation
* `portfolio-demo/` → Static interactive demonstration

The demo does not attempt to replace the original architecture.
It exists to make the most interesting part of the project immediately testable.

## The Scalability Problem
A furniture manufacturer can support many combinations of products and materials.
A representative configuration space could be:

40 products × 5 fabric collections × 9 fabrics × 3 leg types = 5,400 potential visual combinations

Additional dimensions such as cushion configurations or other components would increase this number further.

The challenge is therefore not simply: "How do I display another image?"
The more important question is: "How do I represent a large configuration space without hardcoding every possible combination?"

## Configuration Model
The demo uses the following conceptual model:

Product + Collection + Fabric + Leg Type = Visual Render

Each dimension is represented independently in the data layer.
The frontend then resolves the visual asset based on the selected state.

## Featured Product
The demo currently focuses on: **Sala Click Clack Jumbo Completa**
Using one product keeps the experience focused while still exposing a meaningful configuration matrix.

## Fabric Collections
**Suiza (Five fabric variants):**
* Blanco
* Beige
* Gris claro
* Gris oscuro
* Negro

**Boreal (Nine fabric variants):**
* Lila Sutil
* Niebla Grisal
* Mármol Arena
* Rojo Borgoña
* Violeta Púrpura
* Azul Cobalto Profundo
* Lino Pétreo
* Mármol Ahumado
* Ópalo Profundo

Total: 14 fabrics

## Leg Types
The configurator supports three leg options:
* Wood
* Aluminum
* Plastic

This creates the following target configuration matrix: 14 fabrics × 3 leg types = 42 target combinations

## Render Coverage
At the current visual production stage, the demo contains:
* Suiza / Wood: 5 renders
* Boreal / Wood: 9 renders
* Boreal / Aluminum: 1 render
* Boreal / Plastic: 1 render

Total: 16 / 42 target combinations.
The remaining visual assets can be added without changing the configuration architecture.

## Missing Renders and Fallback Behavior
Not every visual combination needs to exist at the same time.
The dataset can represent unavailable assets explicitly:

```json
{
  "Wood": "images/.../muestra-02.webp",
  "Aluminum": null,
  "Plastic": null
}
```

When the selected combination does not have a render, the interface falls back to the neutral product image.
This makes the application independent from the exact timing of visual asset production.

## Interaction Flow
The intended user journey is:

```text
Open product
      ↓
Choose collection
      ↓
Open fabric catalog
      ↓
Select fabric
      ↓
Choose leg type
      ↓
Resolve render
      ↓
Review measurements
      ↓
Generate WhatsApp quotation
```

## Features
The demo includes:
* responsive product presentation;
* product gallery interaction;
* mobile touch/swipe behavior;
* collection selection;
* image-based fabric catalog;
* fabric selection;
* leg selection;
* dynamic render resolution;
* fallback behavior;
* product measurements;
* WhatsApp quotation generation.

## Technical Architecture
The demo is intentionally dependency-light.

```text
Browser
   │
   ├── index.html
   ├── css/styles.css
   ├── js/main.js
   ├── data/catalogo.json
   └── images/
```

There is no runtime dependency on PostgreSQL, Express, EJS, Node.js, authentication, server-side sessions, or a private backend.
This makes the demo suitable for static hosting.

## Data-Driven Design
The configuration data lives in: `data/catalogo.json`

The file defines product metadata, measurements, collections, fabric variants, leg types, render mappings, and WhatsApp configuration.
This separation allows the interface to remain stable while the dataset changes.

## Client-Side State
The JavaScript maintains the current configuration state: `collection`, `fabric`, `leg`, `view`.

The state is then used to determine which visual render should be displayed.
The conceptual resolution flow is:

```text
product.slug
      ↓
collection
      ↓
fabric
      ↓
leg
      ↓
render URL
```

## Why Vanilla JavaScript?
The original project uses a Node.js / Express / EJS architecture.
For the static portfolio version, Vanilla JavaScript was intentionally retained because the required interaction model does not justify introducing a frontend framework.
This keeps the demo lightweight while demonstrating DOM manipulation, event handling, client-side state management, dynamic rendering, responsive interaction, and touch/swipe behavior.

## Asset Organization
The demo uses optimized browser-ready assets.

```text
images/
├── productos/
│   └── sala-click-clack-jumbo-completa/
│       ├── suiza/
│       └── boreal/
│           └── patas/
│               ├── madera/
│               ├── aluminio/
│               └── plastico/
│
└── telas/
    ├── suiza/
    └── boreal/
```

Product render paths reflect the configuration they represent.
For example: `boreal` → `patas` → `madera` → `muestra-01.webp`

## Visual Asset Pipeline
The visual production workflow is separated from the application logic:

```text
Base furniture image
        ↓
Fabric / material reference
        ↓
AI-assisted render production
        ↓
Alignment / cleanup
        ↓
WebP optimization
        ↓
Catalog mapping
        ↓
Interactive frontend
```

This means the frontend does not need to be redesigned whenever additional render assets are produced.

## Project Structure
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

## Relationship to the Original Project
This demo is derived from the original full-stack implementation but intentionally uses a different runtime model.

* **Original:** Node.js, Express, EJS, PostgreSQL, Backend routes, Security middleware, Tests → Complete application
* **Portfolio Demo:** HTML, CSS, Vanilla JavaScript, JSON, WebP → Static interactive showcase

The distinction is intentional.
The original repository demonstrates the complete engineering implementation, while this directory demonstrates the core configurable frontend with minimal infrastructure requirements.

## Limitations
This version intentionally does not include the complete production stack.
It excludes PostgreSQL, Express, EJS, backend APIs, authentication, administration tooling, production monitoring, CI/CD, and the complete business catalog.
These omissions are deliberate and exist to keep the public demonstration lightweight.

## Future Extensions
The configuration model can be expanded with additional dimensions such as:
Fabric + Leg Type + Cushion configuration + Material + Additional components

The same approach could also support richer visual experiences such as 360-degree product presentation.

## Portfolio Context
This demo is based on an MVP developed for a real furniture manufacturing business.
The business ultimately decided not to proceed with production deployment because its existing sales workflow did not currently require the additional operational overhead.
The implementation is therefore presented as a technical portfolio case study rather than as a production storefront.

## Deployment
This directory is designed to be compatible with static hosting platforms such as GitHub Pages.
The published demo requires only the files contained within this directory and does not require a database or private server-side infrastructure.

## Usage Note
This is a portfolio demonstration derived from an original project.
Private business credentials and sensitive configuration are excluded.
The demo is intended for technical evaluation and portfolio purposes only.
