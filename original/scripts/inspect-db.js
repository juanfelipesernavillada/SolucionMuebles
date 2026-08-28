require('dotenv').config();

const pool = require('../db/pool');

async function inspectDatabase() {
    try {

        // ============================================================
        // TABLAS
        // ============================================================

        const tablas = await pool.query(`
            SELECT
                table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name
        `);

        console.log('\nTABLAS:');

        for (const row of tablas.rows) {
            console.log(`- ${row.table_name}`);
        }


        // ============================================================
        // ESTRUCTURA DE LAS TABLAS
        // ============================================================

        const columnas = await pool.query(`
            SELECT
                table_name,
                column_name,
                data_type,
                is_nullable
            FROM information_schema.columns
            WHERE table_schema = 'public'
            ORDER BY table_name, ordinal_position
        `);

        console.log('\nESTRUCTURA:');

        let tablaActual = null;

        for (const row of columnas.rows) {

            if (row.table_name !== tablaActual) {

                tablaActual = row.table_name;

                console.log(`\n[${tablaActual}]`);
            }

            console.log(
                `- ${row.column_name} | ${row.data_type} | nullable=${row.is_nullable}`
            );
        }


        // ============================================================
        // CONTEOS
        // ============================================================

        const conteos = await pool.query(`
            SELECT
                'categorias' AS tabla,
                COUNT(*) AS total
            FROM categorias

            UNION ALL

            SELECT
                'productos' AS tabla,
                COUNT(*) AS total
            FROM productos

            UNION ALL

            SELECT
                'producto_colores' AS tabla,
                COUNT(*) AS total
            FROM producto_colores

            UNION ALL

            SELECT
                'usuarios_admin' AS tabla,
                COUNT(*) AS total
            FROM usuarios_admin

            ORDER BY tabla
        `);

        console.log('\nCONTEOS:');

        for (const row of conteos.rows) {
            console.log(`- ${row.tabla}: ${row.total}`);
        }


        // ============================================================
        // PRODUCTOS
        // ============================================================

        const productos = await pool.query(`
            SELECT
                p.id,
                p.nombre,
                p.descripcion,
                p.precio,
                p.stock,
                p.imagen_url,
                p.activo,
                p.subcategoria,
                c.nombre AS categoria,
                c.slug AS categoria_slug
            FROM productos p
            JOIN categorias c
                ON p.categoria_id = c.id
            ORDER BY p.id
        `);

        console.log('\nPRODUCTOS:');

        for (const producto of productos.rows) {
            console.log(producto);
        }

    } catch (error) {

        console.error('Error inspeccionando la BD:', error);

    } finally {

        await pool.end();

    }
}

inspectDatabase();