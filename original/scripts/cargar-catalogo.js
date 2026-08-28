const fs = require('fs');
const path = require('path');
const pool = require('../db/pool');

const INVENTARIO_PATH = path.join(__dirname, '../catalogo-maestro.json');

// Función auxiliar para generar slugs de categorías si hay que crear nuevas
function generarSlug(texto) {
  return texto.toLowerCase().trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Quitar acentos
    .replace(/[^a-z0-9 -]/g, '')     // Quitar caracteres especiales
    .replace(/\s+/g, '-')           // Reemplazar espacios por guiones
    .replace(/-+/g, '-');           // Limpiar guiones dobles
}

async function cargarCatalogo() {
  const client = await pool.connect();

  try {
    console.log('📦 Iniciando carga segura del catálogo maestro a PostgreSQL...\n');
    await client.query('BEGIN'); // Iniciar transacción atómica

    // 1. Leer el JSON
    const data = JSON.parse(fs.readFileSync(INVENTARIO_PATH, 'utf8'));
    const productosJSON = data.productos;

    console.log(`📄 Se detectaron ${productosJSON.length} productos en catalogo-maestro.json`);

    // 2. Desactivar el catálogo anterior (los mock)
    await client.query('UPDATE productos SET activo = false');
    console.log('✅ Catálogo anterior (mocks) desactivado exitosamente.');

    // 3. Obtener categorías existentes
    const { rows: dbCategorias } = await client.query('SELECT id, nombre FROM categorias');
    const mapaCategorias = {};
    for (const cat of dbCategorias) {
      mapaCategorias[cat.nombre.toLowerCase()] = cat.id;
    }

    let insertados = 0;
    let actualizados = 0;

    // 4. Procesar cada producto del JSON
    for (const prod of productosJSON) {
      const nombreCat = prod.categoria;
      let catId = mapaCategorias[nombreCat.toLowerCase()];

      // 4.1 Si la categoría no existe, la creamos usando SÓLO nombre y slug
      if (!catId) {
        const catSlug = generarSlug(nombreCat);
        const nuevaCat = await client.query(
          'INSERT INTO categorias (nombre, slug) VALUES ($1, $2) RETURNING id',
          [nombreCat, catSlug]
        );
        catId = nuevaCat.rows[0].id;
        mapaCategorias[nombreCat.toLowerCase()] = catId;
        console.log(`📁 Nueva categoría creada en BD: "${nombreCat}"`);
      }

      // 4.2 Preparar los datos
      const imagenUrl = `/images/productos/${prod.slug}/principal.webp`;
      const subcategoria = prod.subcategoria || null;

      // 4.3 UPSERT aprovechando la restricción UNIQUE del slug
      // Nota: No tocamos "stock" (se queda con su default) y forzamos "precio = NULL"
      const upsertQuery = `
        INSERT INTO productos (
          nombre, descripcion, precio, categoria_id, imagen_url, subcategoria, slug, activo
        ) 
        VALUES (
          $1, $2, NULL, $3, $4, $5, $6, true
        )
        ON CONFLICT (slug) DO UPDATE SET
          nombre = EXCLUDED.nombre,
          descripcion = EXCLUDED.descripcion,
          precio = NULL,
          categoria_id = EXCLUDED.categoria_id,
          imagen_url = EXCLUDED.imagen_url,
          subcategoria = EXCLUDED.subcategoria,
          activo = true
        RETURNING (xmax = 0) AS insertado;
      `;

      const result = await client.query(upsertQuery, [
        prod.nombre_comercial,
        prod.descripcion,
        catId,
        imagenUrl,
        subcategoria,
        prod.slug
      ]);

      if (result.rows[0].insertado) {
        console.log(`  ✅ Insertado: ${prod.slug}`);
        insertados++;
      } else {
        console.log(`  🔄 Actualizado: ${prod.slug}`);
        actualizados++;
      }
    }

    await client.query('COMMIT'); // Guardar cambios permanentemente

    console.log('\n--- Resumen de Base de Datos ---');
    console.log(`Productos insertados:  ${insertados}`);
    console.log(`Productos actualizados: ${actualizados}`);
    console.log('--------------------------------');
    console.log('🎉 ¡Catálogo sincronizado con éxito!');

  } catch (error) {
    await client.query('ROLLBACK'); // Revertir todo si hay un error
    console.error('❌ Error durante la carga:', error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

cargarCatalogo();