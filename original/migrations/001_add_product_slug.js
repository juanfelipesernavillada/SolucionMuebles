require('dotenv').config();

const pool = require('../db/pool');

function createSlug(text) {
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/ñ/g, 'n')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function migrate() {
    const client = await pool.connect();

    try {

        console.log('\nIniciando migración 001_add_product_slug...');

        await client.query('BEGIN');

        // ============================================================
        // 1. Crear columna slug si todavía no existe
        // ============================================================

        await client.query(`
            ALTER TABLE productos
            ADD COLUMN IF NOT EXISTS slug VARCHAR(150)
        `);

        console.log('✓ Columna slug preparada');


        // ============================================================
        // 2. Obtener productos existentes
        // ============================================================

        const productosResult = await client.query(`
            SELECT
                id,
                nombre
            FROM productos
            ORDER BY id
        `);


        // ============================================================
        // 3. Generar slugs y comprobar duplicados
        // ============================================================

        const slugs = new Map();

        for (const producto of productosResult.rows) {

            const slugBase = createSlug(producto.nombre);

            if (!slugBase) {
                throw new Error(
                    `No se pudo generar slug para producto ${producto.id}`
                );
            }

            let slug = slugBase;
            let suffix = 2;

            while (slugs.has(slug)) {
                slug = `${slugBase}-${suffix}`;
                suffix += 1;
            }

            slugs.set(slug, producto.id);

            await client.query(
                `
                UPDATE productos
                SET slug = $1
                WHERE id = $2
                `,
                [slug, producto.id]
            );

            console.log(
                `✓ Producto ${producto.id}: "${producto.nombre}" → ${slug}`
            );
        }


        // ============================================================
        // 4. Comprobar que todos tienen slug
        // ============================================================

        const nullResult = await client.query(`
            SELECT COUNT(*) AS total
            FROM productos
            WHERE slug IS NULL
        `);

        const pendientes = Number(nullResult.rows[0].total);

        if (pendientes > 0) {
            throw new Error(
                `Existen ${pendientes} productos sin slug`
            );
        }


        // ============================================================
        // 5. Crear índice UNIQUE
        // ============================================================

        await client.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS
                productos_slug_key
            ON productos(slug)
        `);

        console.log('✓ Índice UNIQUE productos_slug_key preparado');


        // ============================================================
        // 6. Confirmar migración
        // ============================================================

        await client.query('COMMIT');

        console.log('\n✅ Migración completada correctamente.');

    } catch (error) {

        await client.query('ROLLBACK');

        console.error('\n❌ Migración fallida.');
        console.error(error);

        process.exitCode = 1;

    } finally {

        client.release();
        await pool.end();

    }
}

migrate();