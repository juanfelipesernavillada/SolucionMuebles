// scripts/actualizar-imagenes.js
const fs = require('fs');
const path = require('path');
const pool = require('../db/pool');

const CATALOGO_PATH = path.join(__dirname, '../catalogo-maestro.json');

async function actualizarImagenes() {
    try {
        const data = JSON.parse(fs.readFileSync(CATALOGO_PATH, 'utf8'));
        const productos = data.productos;

        for (const prod of productos) {
            if (prod.imagen_principal && prod.slug) {
                await pool.query(
                    'UPDATE productos SET imagen_url = $1 WHERE slug = $2',
                    [prod.imagen_principal, prod.slug]
                );
                console.log(`✅ Actualizado: ${prod.slug} → ${prod.imagen_principal}`);
            }
        }
        console.log('🎉 ¡Todas las imágenes se actualizaron correctamente en la base de datos!');
    } catch (error) {
        console.error('❌ Error al actualizar las imágenes:', error);
    } finally {
        await pool.end();
    }
}

actualizarImagenes();