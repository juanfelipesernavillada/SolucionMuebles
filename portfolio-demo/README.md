<div align="center">

# 🛋️ Furniture Configurator — Portfolio Demo

## Static interactive demonstration of a full-stack furniture configurator

<a href="https://juanfelipesernavillada.github.io/SolucionMuebles/portfolio-demo/">
  <img src="https://img.shields.io/badge/LIVE_DEMO-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white" alt="View Demo" width="220" />
</a>

## 

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/GitHub_Pages-181717?style=for-the-badge&logo=github&logoColor=white" />
</p>

</div>

TL;DR: This is a static, backend-free version of a furniture configurator originally developed as a full-stack application. It demonstrates how a product can be modeled as a combination of reusable configuration dimensions (collection × fabric × leg type) without hardcoding every possible combination. The demo runs entirely in the browser using HTML, CSS, Vanilla JavaScript, and a JSON data file — no database, no server, no build step.

### 📌 Purpose

The original application evolved from a conventional furniture catalog into an interactive product configurator.

This demo focuses exclusively on that configuration experience:

Product
   ↓
Collection
   ↓
Fabric
   ↓
Leg Type
   ↓
Visual Render
       ↓
WhatsApp Quotation

The objective is to demonstrate how a product can be modeled as a combination of reusable configuration dimensions rather than as a collection of unrelated product pages.

### 🎯 Why This Demo Exists

The original implementation uses a complete full-stack architecture: Node.js, Express, EJS, PostgreSQL, security middleware, API routes, and automated tests.

That architecture is appropriate for a real application. For portfolio evaluation, however, requiring a recruiter to configure a database and start a backend server just to test the configurator would create unnecessary friction.

The portfolio-demo/ directory therefore provides a deliberately simplified static version:

Directory

Purpose

original/

Full-stack implementation (engineering inspection)

portfolio-demo/

Static interactive demonstration (recruiter-facing)

The demo does not attempt to replace the original architecture. It exists to make the most interesting part of the project immediately testable.

The demo preserves the same configuration model while replacing the database layer with a static dataset.

### 🧮 The Scalability Problem

A furniture manufacturer can support many combinations of products and materials. A representative configuration space could be:

40 products × 5 fabric collections × 9 fabrics × 3 leg types = 5,400 potential visual combinations

Additional dimensions such as cushion configurations or other components would increase this number further.

The challenge is therefore not simply: "How do I display another image?"

The more important question is: "How do I represent a large configuration space without hardcoding every possible combination?"

### 🧩 Configuration Model

The demo uses the following conceptual model:

Product + Collection + Fabric + Leg Type = Visual Render

Each dimension is represented independently in the data layer. The frontend then resolves the visual asset based on the selected state.

### 🛍️ Featured Product

The demo currently focuses on:

Sala Click Clack Jumbo Completa

Using one product keeps the experience focused while still exposing a meaningful configuration matrix.

### 🎨 Fabric Collections

Suiza (5 variants)

Blanco

Beige

Gris claro

Gris oscuro

Negro

Boreal (9 variants)

Lila Sutil

Niebla Grisal

Mármol Arena

Rojo Borgoña

Violeta Púrpura

Azul Cobalto Profundo

Lino Pétreo

Mármol Ahumado

Ópalo Profundo

Total: 14 fabrics

### 🪑 Leg Types

The configurator supports 3 leg options:

Wood

Aluminum

Plastic

This creates the following target configuration matrix:

14 fabrics × 3 leg types = 42 target configuration combinations

### 📊 Render Coverage

At the current visual production stage, the demo contains:

Collection

Leg Type

Renders

Suiza

Wood

5

Boreal

Wood

9

Boreal

Aluminum

1

Boreal

Plastic

1

Total



16 / 42

The remaining visual assets can be added without changing the configuration architecture.

### 🔄 Missing Renders and Fallback Behavior

Not every visual combination needs to exist at the same time. The dataset can represent unavailable assets explicitly:

{
  "Wood": "images/.../muestra-02.webp",
  "Aluminum": null,
  "Plastic": null
}

When the selected combination does not have a render, the interface falls back to the neutral product image. This makes the application independent from the exact timing of visual asset production.

### 🚀 Interaction Flow

The intended user journey is:

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

### ⚡ Features

The demo includes:

📱 Responsive product presentation

🖼️ Product gallery interaction

👆 Mobile touch / swipe behavior

🎨 Collection selection

🔄 Dynamic configuration with fallback handling for unavailable visual assets

🧵 Image-based fabric catalog

✨ Fabric selection

🪑 Leg selection

🔄 Dynamic render resolution

🛡️ Fallback behavior for missing assets

📏 Product measurements

💬 WhatsApp quotation generation

### 🛠️ Technical Architecture

The demo is intentionally dependency-light:

Browser
   │
   ├── index.html
   ├── css/styles.css
   ├── js/main.js
   ├── data/catalogo.json
   └── images/

There is no runtime dependency on:

❌ PostgreSQL

❌ Express

❌ EJS

❌ Node.js

❌ Authentication

❌ Server-side sessions

❌ Private backend

This makes the demo suitable for static hosting (GitHub Pages, Netlify, Vercel, etc.).

### 📦 Data-Driven Design

The configuration data lives in:

data/catalogo.json

The file defines:

Product metadata

Measurements

Collections

Fabric variants

Leg types

Render mappings

WhatsApp configuration

This separation allows the interface to remain stable while the dataset changes.

### 🧠 Client-Side State

The JavaScript maintains the current configuration state:

{
  collection: '',
  fabric: '',
  leg: 'Wood',
  view: 'frontal'
}

The state is then used to determine which visual render should be displayed. The conceptual resolution flow is:

product.slug
      ↓
collection
      ↓
fabric
      ↓
leg
      ↓
render URL

### 💡 Why Vanilla JavaScript?

The original project uses a Node.js / Express / EJS architecture. For the static portfolio version, Vanilla JavaScript was intentionally retained because:

The required interaction model does not justify introducing a frontend framework.

It keeps the demo lightweight and easy to host.

It demonstrates core frontend skills:

DOM manipulation

Event handling

Client-side state management

Dynamic rendering

Responsive interaction

Touch / swipe behavior

### 📁 Asset Organization

The demo uses optimized browser-ready assets:

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

Product render paths reflect the configuration they represent. For example:

boreal → patas → madera → muestra-01.webp

### 🖼️ Visual Asset Pipeline

The visual production workflow is separated from the application logic:

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

This means the frontend does not need to be redesigned whenever additional render assets are produced.

### 📂 Project Structure

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

### 🔗 Relationship to the Original Project

This demo is derived from the original full-stack implementation but intentionally uses a different runtime model.

Aspect

original/

portfolio-demo/

Runtime

Node.js, Express, EJS

HTML, CSS, Vanilla JS

Database

PostgreSQL

Local JSON

Backend

API routes + middleware

None (static)

Testing

Vitest + Supertest

Manual browser testing

Deployment

Docker / Node host

GitHub Pages

Target audience

Engineering inspection

Recruiter evaluation

The distinction is intentional. The original/ repository demonstrates the complete engineering implementation, while this directory demonstrates the core configurable frontend with minimal infrastructure requirements.

### ⚠️ Limitations

This version intentionally does not include the complete production stack. It excludes:

PostgreSQL

Express

EJS

Backend APIs

Authentication

Administration tooling

Production monitoring

CI/CD

The complete business catalog

These omissions are deliberate and exist to keep the public demonstration lightweight and instantly accessible.

### 🔮 Future Extensions

The configuration model can be expanded with additional dimensions such as:

Fabric + Leg Type + Cushion configuration + Material + Additional components

The same approach could also support richer visual experiences such as 360-degree product presentation.

### 📖 Portfolio Context

This demo is based on an MVP developed for a real furniture manufacturing business. The business ultimately decided not to proceed with production deployment because its existing sales workflow did not currently require the additional operational overhead.

The implementation is therefore presented as a technical portfolio case study rather than as a production storefront.

### 🚀 Deployment

This directory is designed to be compatible with static hosting platforms such as:

GitHub Pages (currently deployed)

Netlify

Vercel

Cloudflare Pages

The published demo requires only the files contained within this directory and does not require a database or private server-side infrastructure.

### 🧪 How to Test Locally

Option 1: Direct browser access

Clone the repository.

Navigate to portfolio-demo/.

Open index.html in your browser.

### ⚠️ Note: Due to CORS restrictions, opening the file directly via file:// may block the JSON fetch. Use a local server instead.

Option 2: Local server (recommended)

# Using Node.js
npx http-server -p 8080

# Or using Python
python -m http.server 8080

Then open: http://localhost:8080

### 📊 Key Metrics

Metric

Value

Products in demo

1

Fabric collections

2

Fabric variants

14

Leg types

3

Target configuration combinations

42

Renders available

16

Dependencies (runtime)

0

Build steps required

0

### 🔄 What I Would Do Differently

If I were to rebuild this demo today, I would:

Add more products to better demonstrate the scalability of the configuration model.

Implement a 360° viewer for a richer product experience.

Add a comparison mode allowing users to see two configurations side-by-side.

Include a print/PDF export of the selected configuration for in-store use.

Add analytics to track which fabric/leg combinations are most viewed.

### 📄 Usage Note

This is a portfolio demonstration derived from an original project. Private business credentials and sensitive configuration are excluded. The demo is intended for technical evaluation and portfolio purposes only.
