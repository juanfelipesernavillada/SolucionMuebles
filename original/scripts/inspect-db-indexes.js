require('dotenv').config();

const pool = require('../db/pool');

async function inspectDatabase() {
    try {

        // ============================================================
        // VERSION DE POSTGRESQL
        // ============================================================

        const versionResult = await pool.query(`
            SELECT version()
        `);

        console.log('\nPOSTGRESQL:');
        console.log(versionResult.rows[0].version);


        // ============================================================
        // ÍNDICES
        // ============================================================

        const indexesResult = await pool.query(`
            SELECT
                tablename,
                indexname,
                indexdef
            FROM pg_indexes
            WHERE schemaname = 'public'
            ORDER BY tablename, indexname
        `);

        console.log('\nÍNDICES:');

        let tablaActual = null;

        for (const row of indexesResult.rows) {

            if (row.tablename !== tablaActual) {

                tablaActual = row.tablename;

                console.log(`\n[${tablaActual}]`);
            }

            console.log(`- ${row.indexname}`);
            console.log(`  ${row.indexdef}`);
        }

    } catch (error) {

        console.error('Error inspeccionando PostgreSQL:', error);

    } finally {

        await pool.end();

    }
}

inspectDatabase();