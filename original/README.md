<div align="center">

# SolucionMuebles — Original Full-Stack Implementation

</div>

This directory contains the sanitized version of the original full-stack implementation developed for a real furniture manufacturing business.

It preserves the project's architecture, implementation decisions, development utilities, and application logic while excluding private credentials and sensitive environment configuration.

---

## 1. Project Context

The application began as a digital furniture catalog and gradually evolved into a configurable product experience.

The intended customer journey was:

```text
Browse catalog
      ↓
Open product
      ↓
Explore collections
      ↓
Select fabric
      ↓
Select leg type
      ↓
Resolve visual render
      ↓
Request quotation through WhatsApp
```

The application was designed for a furniture manufacturer whose upholstery collections are shared across multiple product models.
That requirement led to a configuration model in which fabrics and collections are treated as reusable data rather than as product-specific duplicated content.

## 2. Core Configuration Model
The central conceptual model is:

Product + Collection + Fabric + Leg Type = Visual Render

This structure allows the application to support multiple configuration dimensions without generating an entirely separate product implementation for each combination.
The same collection can therefore be reused across different furniture models.

The architecture was also designed with additional future configuration dimensions in mind, including elements such as:
* cushion configurations;
* additional materials;
* alternative components;
* and richer visual presentation.

## 3. Backend Architecture
The backend is built with:
* Node.js;
* Express;
* PostgreSQL;
* EJS;
* custom middleware.

The application follows a conventional separation between routing, database access, middleware, views, and public assets.

**Main Web Routes**
* `GET /`
* `GET /producto/:slug`
* `GET /categoria/:slug`

The product route retrieves the information required to render the product detail page, including:
* product metadata;
* category information;
* product colors;
* related products;
* collection data.

API functionality is separated into `apiRoutes.js`.

## 4. Database Layer
PostgreSQL provides the persistent data layer.
The application uses relational tables for core entities such as products, categories, and product-level color definitions.

The project also uses a JSONB field for structured product measurements: `medidas_estructuradas`

For the Jumbo product, the stored structure was:
```json
{
  "Largo del Sofá": "1.80 m",
  "Ancho de las Sillas": "70 cm"
}
```
Using JSONB provides flexibility for product-specific measurement sets without requiring a separate nullable column for every conceivable measurement.

## 5. Product Model
Products contain information including:
* identifier;
* name;
* slug;
* description;
* category;
* subcategory;
* image URL;
* active status;
* structured measurements.

Product slugs provide human-readable URLs such as: `/producto/sala-click-clack-jumbo-completa`
This also allows the frontend and render-resolution logic to reference the product consistently.

## 6. Category Model
Categories provide the primary organizational layer for product discovery.
The application retrieves category information from PostgreSQL and exposes category routes such as: `/categoria/:slug`

The category view lists all active products assigned to the corresponding category.

## 7. Fabric Collection Architecture
One of the most important design decisions was separating a fabric collection from an individual product.
The business requirement is that manufacturers may upholster multiple furniture models using the same collection.

Therefore:
```text
Collection
    │
    ├── Fabric
    ├── Fabric
    └── ...
```
is conceptually independent from:
```text
Product
    │
    ├── Model A
    ├── Model B
    └── Model C
```
This avoids duplicating the same collection definitions for every product.
During the MVP validation stage, collection data was intentionally maintained in JSON while the visual model was being validated.

## 8. Fabric Representation
The original implementation initially contained a conventional color-selection model based on hexadecimal colors.
That representation was insufficient for real upholstery because fabric is a material rather than merely a color value.

A realistic swatch can contain:
* weave;
* grain;
* highlights;
* shadows;
* material response;
* texture;
* pattern.

The frontend was therefore redesigned around image-based fabric samples.
This allows the interface to communicate material characteristics more accurately than a simple circular color selector.

## 9. Render Resolution
During the validation phase, render mappings were intentionally kept in the frontend while the configuration architecture was being tested.

The conceptual lookup process is:
```text
Product slug
      ↓
Collection
      ↓
Fabric
      ↓
Leg type
      ↓
Render URL
```
The current implementation can gracefully handle missing renders.
When the requested combination is unavailable, the product can fall back to its neutral image.
This decouples the software architecture from the visual production schedule.

## 10. Product Gallery
The product page includes a multi-view gallery supporting:
* thumbnail navigation;
* previous / next controls;
* mobile swipe interaction;
* visual state management;
* restoration of the configured render when returning to the main view.

An important implementation decision was to separate **Gallery state** from **Configuration state**.
Changing the current product view should not implicitly erase the user's selected fabric or leg configuration.

## 11. Collection Selector
Collections are displayed as compact visual controls in the product sidebar.
Selecting a collection opens the fabric catalog modal.
This interaction provides a more realistic representation of a physical upholstery sample book.

The product page therefore moves through two levels:
```text
Collection
     ↓
Fabric samples
```
rather than displaying every fabric directly in the product sidebar.

## 12. Fabric Modal
The fabric modal dynamically constructs its content from collection data.
Each fabric card includes:
* fabric image;
* fabric name;
* selection state.

Selecting a fabric updates:
* active collection;
* active fabric;
* visible product render when available;
* WhatsApp quotation state.

The modal was deliberately designed to keep the main product sidebar compact while still allowing the user to explore an entire collection.

## 13. Leg Configuration
The configuration model was later extended with a second visual dimension: Wood, Aluminum, Plastic.

The leg selection participates in render resolution alongside fabric and collection.
Conceptually: Product + Collection + Fabric + Leg Type = Render

This provides a foundation for additional configuration dimensions in the future.

## 14. WhatsApp Quotation Flow
The quotation system dynamically builds a WhatsApp message from the current product state.
The intended message contains:
* Product
* Collection
* Fabric
* Leg Type
* Product URL

This allows the sales team to receive meaningful configuration information immediately rather than a generic product inquiry.

## 15. Quotation Bag
The application includes a client-side quotation bag using browser storage.
Its purpose is not online payment processing.
Instead, it allows customers to collect products that they are interested in and proceed toward a quotation.
Product prices were intentionally excluded from the public frontend.

## 16. Security
Security considerations were incorporated into the MVP architecture.
The implementation includes:
* Helmet;
* Content Security Policy;
* rate limiting;
* validation;
* centralized error handling;
* environment-based configuration.

The MVP retained a small amount of CSP-related technical debt around inline styling and would require further refactoring for a stricter production security policy.

## 17. Environment Configuration
Environment-specific configuration is kept outside the source code.
The published repository does not contain the original `.env` file.
A non-secret `.env.example` template may be included for documentation purposes.

Real passwords, API keys, database connection strings, tokens, and secrets must never be committed to the repository.

## 18. Testing
The backend includes automated tests built with Vitest and Supertest.

The project reached a validated MVP state with its available automated test suite passing during development.
The test suite was intentionally focused on backend/API behavior during the MVP stage.
More extensive browser-level coverage for features such as the quotation bag and configuration interactions was considered future work.

## 19. Image Processing Pipeline
Visual asset production was treated as a separate engineering concern.

The general workflow was:
```text
Source furniture image
        ↓
AI-assisted / manually prepared visual
        ↓
Image cleanup and alignment
        ↓
Sharp processing
        ↓
WebP
        ↓
public/images/
        ↓
Frontend render mapping
```
This separation allows new visual assets to be added or regenerated without fundamentally changing the application logic.

## 20. Asset Organization
Source assets and browser-ready assets are separated.
* `assets-source/` → Working / source files
* `public/images/` → Optimized browser assets

Product-specific renders are organized by product, collection, and configuration dimension.
For example:
```text
public/images/productos/
└── sala-click-clack-jumbo-completa/
    └── boreal/
        └── patas/
            ├── madera/
            ├── aluminio/
            └── plastico/
```
This naming hierarchy makes the asset path itself descriptive of the configuration it represents.

## 21. Development Utilities
The project contains development scripts for tasks including:
* loading catalog data;
* updating product records;
* inspecting database structure;
* inspecting categories;
* converting fabrics;
* processing images;
* querying product measurements.

These utilities are part of the development workflow and are preserved as part of the original implementation.

## 22. Docker
The original project includes Docker configuration to support reproducible development environments.
Docker is intentionally not required by the static portfolio demo.

## 23. Tailwind CSS
Tailwind CSS is used as the primary utility-first styling system.
The frontend uses responsive utility classes for layout, spacing, typography, interaction states, responsive breakpoints, modal behavior, and mobile adaptation.
The project also contains a compiled CSS output used by the server-rendered application.

## 24. Frontend JavaScript Architecture
The product page logic is primarily organized in `public/js/producto.js` while broader site and cart behavior is handled by `public/js/main.js`.

The product-specific logic includes Gallery, Collection selection, Fabric selection, Render resolution, Leg selection, WhatsApp state, Related products, Modal interaction, and Responsive behavior.

A central state object is used to keep configuration information synchronized across those interactions.

## 25. Project Structure
```text
original/
├── assets-source/
│
├── db/
│   └── pool.js
│
├── middleware/
│   └── errorHandler.js
│
├── migrations/
│
├── public/
│   ├── css/
│   ├── images/
│   └── js/
│
├── routes/
│   ├── apiRoutes.js
│   └── webRoutes.js
│
├── scripts/
│
├── src/
│   └── input.css
│
├── tests/
│
├── views/
│   ├── partials/
│   ├── categoria.ejs
│   ├── index.ejs
│   └── producto.ejs
│
├── .dockerignore
├── .gitignore
├── catalogo-colores.json
├── catalogo-maestro.json
├── Dockerfile
├── package-lock.json
├── package.json
├── server.js
└── tailwind.config.js
```

## 26. Architectural Decisions
Several implementation decisions were deliberate responses to the real business constraints.

* **Data before presentation:** Shared product configuration should be represented as data rather than duplicated UI markup.
* **Configuration state before asset assumptions:** The software should be able to represent a configuration even when its corresponding image has not yet been produced.
* **Graceful fallback behavior:** Missing visual assets should not make the product unusable.
* **Gallery state and configuration state are independent:** Changing the visible product angle should not discard the selected fabric or leg configuration.
* **Static mappings during validation:** Hardcoded render mappings were acceptable during the MVP validation stage because the goal was to validate the experience before migrating the complete render model into a persistent database structure.

## 27. Project Outcome
The original business engagement ended after the MVP was demonstrated and reviewed.
The business ultimately decided that its existing sales workflow did not currently justify the additional operational overhead of launching and maintaining the digital catalog.
The system therefore remains as a completed implementation and engineering case study rather than an active production storefront.

## 28. Sanitization for Publication
This directory is a sanitized representation of the original project.
Before publication, private credentials were removed, environment secrets were excluded, sensitive configuration was removed, and the `.env` file was not committed.
The purpose of sanitization is to preserve the engineering work without exposing private business infrastructure.

## 29. Technical Takeaways
This project reinforced several important engineering principles:
* Separate business data from presentation.
* Model reusable configuration dimensions explicitly.
* Treat visual assets as part of a production pipeline.
* Design for incomplete asset coverage.
* Keep frontend state predictable.
* Preserve a clear path from MVP architecture to future scalability.
* Distinguish application architecture from portfolio presentation requirements.
