<h1 align="center">🛋️ SolucionMuebles 

</h1>

<h1 align="center">

🚧 Portfolio / Case Study

</h1>

<p align="center">
  <strong>Full-Stack Furniture Configurator & Digital Catalog System</strong>
</p>

<h1 align="center">
  <a href="https://juanfelipesernavillada.github.io/SolucionMuebles/portfolio-demo/">
    <img src="https://img.shields.io/badge/LIVE_DEMO-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white" alt="View Demo" width="220" />
  </a>
</h1>

 <p align="center">🛠️ Technologies</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

---

# 📌 Project Overview

> SolucionMuebles is an interactive furniture catalog system designed to enable customers to customize fabrics, leg options, and request quotations via WhatsApp. This repository serves as a technical case study demonstrating how to architect a scalable configuration matrix for customizable physical products.

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
   ↓
Quotation
```

The key architectural challenge was not merely displaying products. It was creating a structure that could accommodate an increasing number of visual combinations without turning every combination into an independent hardcoded implementation.

# 💼 Business Context & Scalability Challenge
The project was developed for a furniture manufacturing business whose products can be upholstered using shared fabric collections.

This means that a fabric collection is not inherently tied to one product.
The same collection may be available across multiple furniture models, while the final visual result depends on the selected:

* product;

* collection;

* fabric;

* leg configuration;

* and, potentially in the future, additional configuration dimensions.

This requirement influenced the data model and the frontend configuration architecture from the beginning.

# 🧮The Scalability Challenge

A larger implementation could potentially involve:

# **40 products × 5 fabric collections × 9 fabrics × 3 leg types = 5,400 potential visual combinations**

Additional configuration dimensions, such as cushion styles or other components, would increase the number of possible combinations even further.

This made it important to separate:

Product + Collection + Fabric + Leg Type

from the visual asset itself.
Instead of building a separate page for every possible combination, the system resolves the appropriate render from the current configuration.

<div align="center">

# ⚡ Key Features

</div>

## 🛍️Product Catalog

* Product catalog organized by category.

* Product detail pages.

* Human-readable product URLs.

* Structured product information.

* Product measurements stored independently from presentation.

## 🎨Visual Configuration

* Dynamic configuration: Real-time preview of supported fabric and leg combinations, with fallback handling for unavailable visual assets.

* Shared fabric collections.

* Image-based fabric swatches instead of simple hexadecimal color circles.

* Interactive fabric selection.

* Leg-type selection.

* Dynamic render resolution.

* Fallback behavior for unavailable assets.

## 📱Quotation Flow

* Persistent quotation bag.

* WhatsApp quotation flow.

* Configuration-aware quotation messages.

* Direct access to the selected product page.

## ✅Responsive Experience

* Responsive layouts.

* Mobile-oriented interaction.

* Touch/swipe behavior.

* Responsive product gallery.

* Responsive fabric catalog modal.

## 💽Backend

* Node.js.

*Express.

* PostgreSQL.

* EJS.

* API routes.

* Centralized error handling.

## 🔒Security & Reliability

* Helmet.

* Content Security Policy.

* Rate limiting.

* Input validation.

* Environment-based configuration.

## 🧪Testing

* Vitest.

* Supertest.

* Automated API testing.

## 🖼️Asset Pipeline

* Source image organization.

* AI-assisted render workflow.

* Image alignment and cleanup.

* Sharp-based WebP optimization.

<div align="center">

# 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Runtime** | Node.js |
| **Backend** | Express |
| **Templates** | EJS |
| **Database** | PostgreSQL |
| **Frontend** | HTML, Tailwind CSS, Vanilla JavaScript |
| **Icons** | Bootstrap Icons |
| **Security** | Helmet, CSP, rate limiting |
| **Testing** | Vitest, Supertest |
| **Image processing** | Sharp |
| **Containerization** | Docker |

</div>

# 🏗️ Architecture

At a high level:

```text
                     Browser
                        │
                        ▼
                 Express / EJS
                        │
          ┌─────────────┼─────────────┐
          │             │             │
     Product Routes   API Routes   Middleware
          │                           │
          └──────────────┬────────────┘
                         ▼
                    PostgreSQL
                         │
           ┌─────────────┼─────────────┐
           │             │             │
        Products     Categories    Measurements
```

The configuration layer sits on top of the product data:

```text
Product
   +
Collection
   +
Fabric
   +
Leg Type
        ↓
Render Resolution
        ↓
Frontend Image
```

## 📁 Repository Structure

```text
SolucionMuebles/
│
├── 📂 original/                 # ⚙️ Full-stack backend & dynamic rendering implementation
│   ├── 📂 assets-source/        # Raw source images and unoptimized assets
│   ├── 📂 db/                   # PostgreSQL connection pool and queries
│   ├── 📂 middleware/           # 🛡️ Custom Express middleware, including centralized error handling
│   ├── 📂 migrations/           # Database schema setup and migration scripts
│   ├── 📂 public/               # Served static files (optimized WebP images, CSS, client JS)
│   ├── 📂 routes/               # Express route handlers (API endpoints and Web pages)
│   ├── 📂 scripts/              # Build utilities (e.g., Sharp image optimization pipeline)
│   ├── 📂 src/                  # Tailwind source styles
│   ├── 📂 tests/                # 🧪 Automated test suites (Vitest + Supertest)
│   ├── 📂 views/                # EJS server-side rendering templates
│   ├── 📄 .dockerignore         # Docker exclusion rules to optimize image size
│   ├── 📄 Dockerfile            # 🐳 Containerization instructions for deployment
│   ├── 📄 README.md             # Original project documentation
│   ├── 📄 catalogo-colores.json # Static configuration mapping for fabric colors
│   ├── 📄 catalogo-maestro.json # Main product and combination matrix data
│   ├── 📄 package-lock.json     # Locked dependency tree for deterministic installs
│   ├── 📄 package.json          # Node.js dependencies and npm run scripts
│   ├── 📄 server.js             # 🚀 Application entry point and server initialization
│   └── 📄 tailwind.config.js    # Tailwind CSS configuration and custom theme rules
│
├── 📂 portfolio-demo/           # 🎨 Static, decoupled frontend for GitHub Pages
│   ├── 📂 css/                  # Compiled styles for the demo interface
│   ├── 📂 data/                 # 🗂️ Static JSON data simulating the backend API response
│   ├── 📂 images/               # Optimized image assets for the UI components
│   ├── 📂 js/                   # Client-side logic, state management, and DOM manipulation
│   ├── 📄 index.html            # 🌟 Main entry point for the interactive catalog demo
│   └── 📄 README.md             # Demo-specific documentation and deployment instructions
│
├── 📄 .env.example              # ⚠️ Environment variables template (Security best practices)
├── 📄 .gitignore                # Git exclusion rules for node_modules and secrets
└── 📄 README.md                 # 📖 Main repository documentation (You are here)
```


# 🔄 Original Implementation

The `original/` directory contains the sanitized version of the complete full-stack application developed for the original business use case.

It preserves the engineering work performed during the project, including:

* backend architecture;

* PostgreSQL integration;

* EJS views;

* product and category routes;

* configuration logic;

* security middleware;

* testing;

* image-processing scripts;

* asset organization;

* and the original application structure.

Private credentials and sensitive environment information were removed before publication.

# 🎮 Portfolio Demo

The portfolio-demo/ directory contains a deliberately reduced static version of the project designed for public evaluation.

The demo focuses on a single furniture model and exposes the most representative part of the system:

> **1 product
× 14 fabrics
× 3 leg types
= 42 target configuration combinations**

The backend and database are intentionally removed from this version so the configurator can be hosted as a static site and tested immediately by a recruiter.

The demo preserves the same configuration model while replacing the database layer with a static dataset.

## 🤔 Why Two Versions Exist❔

The repository separates the complete engineering implementation from the public-facing demonstration.

* `original/` → Complete full-stack implementation

* `portfolio-demo/` → Focused static demonstration

This separation preserves the integrity of the original architecture while making the most interesting part of the application easy to evaluate.

# 📝 Project Outcome

After the MVP was demonstrated, the business decided not to proceed with the production deployment.
The reason was not a technical failure. The existing sales workflow was already performing well, and the business did not consider the additional operational overhead of launching and maintaining the digital catalog necessary at that stage.
The completed implementation is therefore preserved as a software engineering case study and portfolio project.

# 🖼️ What This Project Demonstrates
This project demonstrates the ability to:

* translate business requirements into software architecture;

* design reusable configuration systems;

* model shared product attributes;

* work with PostgreSQL and JSONB;

* build a Node.js / Express backend;

* implement security middleware;

* write automated API tests;

* build responsive Vanilla JavaScript interactions;

* manage image-processing workflows;

* reason about combinatorial growth;

* and reduce a full-stack application into a focused public demonstration.

# ⚠️⚠️⚠️ Disclaimer

This repository is a sanitized portfolio representation of a project originally developed for a real furniture business.
Private credentials, secrets, and other sensitive information are intentionally excluded.
The public demo is intended for portfolio and technical evaluation purposes only.

## 📫 References

🤝 Professional references are available upon request. Connect via LinkedIn or explore additional software & cybersecurity repositories on my profile.
