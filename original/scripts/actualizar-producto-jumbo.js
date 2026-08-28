// scripts/actualizar-producto-jumbo.js
const fs = require('fs');
const path = require('path');
const pool = require('../db/pool');

const CATALOGO_PATH = path.join(__dirname, '../catalogo-maestro.json');

async function actualizarProducto() {
    const data = JSON.parse(fs.readFileSync(CATALOGO_PATH, 'utf8'));
    const productos = data.productos;

    // Buscar el producto Jumbo por slug en el JSON
    const productoJumbo = productos.find(p => p.slug === 'sala-click-clack-jumbo-completa');
    
    if (!productoJumbo) {
        console.error('❌ Producto Jumbo no encontrado en catalogo-maestro.json');
        process.exit(1);
    }

    try {
        // Paso 1: Verificar y crear columna medidas_estructuradas si no existe
        const checkColumnQuery = `
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'productos' AND column_name = 'medidas_estructuradas'
        `;
        const colRes = await pool.query(checkColumnQuery);
        
        if (colRes.rows.length === 0) {
            console.log('🔧 Creando columna medidas_estructuradas (JSONB)...');
            await pool.query(`ALTER TABLE productos ADD COLUMN medidas_estructuradas JSONB`);
        }

        // Paso 2: Obtener el ID del producto (buscamos por el viejo o el nuevo por si ya se actualizó a medias)
        const oldSlug = 'sala-completa-click-clack-poltronas-puff';
        const res = await pool.query(
            'SELECT id FROM productos WHERE slug = $1 OR slug = $2', 
            [oldSlug, productoJumbo.slug]
        );

        if (res.rows.length === 0) {
            console.error(`❌ Producto no encontrado en BD. Revisa que exista el registro original.`);
            await pool.end();
            process.exit(1);
        }

        const id = res.rows[0].id;

        // Paso 3: Preparar los datos para la actualización (SIN categoria ni subcategoria)
        const query = `
            UPDATE productos 
            SET 
                nombre = $1,
                slug = $2,
                descripcion = $3,
                imagen_url = $4,
                activo = $5,
                medidas_estructuradas = $6
            WHERE id = $7
        `;

        // Se usa JSON.stringify para evitar errores de parseo en la columna JSONB
        const values = [
            productoJumbo.producto, // nombre
            productoJumbo.slug, // slug
            productoJumbo.descripcion || null, // descripcion
            productoJumbo.imagen_principal || '/images/productos/sala-jumbo/principal.webp', // imagen_url
            true, // activo
            productoJumbo.medidas_estructuradas ? JSON.stringify(productoJumbo.medidas_estructuradas) : null, // medidas_estructuradas
            id
        ];

        const result = await pool.query(query, values);

        if (result.rowCount > 0) {
            console.log(`✅ Producto actualizado: ${productoJumbo.producto} (slug: ${productoJumbo.slug})`);
        } else {
            console.log('⚠️ Producto no actualizado (verificar)');
        }

        await pool.end();
    } catch (error) {
        console.error('❌ Error actualizando producto:', error);
        await pool.end();
        process.exit(1);
    }
}

actualizarProducto();