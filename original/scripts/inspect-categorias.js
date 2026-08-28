const pool = require('../db/pool');

async function inspectCategorias() {
    try {
        const result = await pool.query(`
            SELECT
                column_name,
                data_type,
                is_nullable,
                column_default
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = 'categorias'
            ORDER BY ordinal_position
        `);

        console.table(result.rows);

    } catch (error) {
        console.error(
            'Error consultando la estructura de categorias:',
            error.message
        );
        process.exitCode = 1;

    } finally {
        await pool.end();
    }
}

inspectCategorias();