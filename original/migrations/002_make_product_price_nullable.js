const pool = require('../db/pool');

async function migrate() {
    const client = await pool.connect();

    try {
        console.log('Iniciando migración 002...');

        await client.query('BEGIN');

        await client.query(`
            ALTER TABLE productos
            ALTER COLUMN precio DROP NOT NULL
        `);

        await client.query('COMMIT');

        console.log('✓ productos.precio ahora acepta NULL');
        console.log('✅ Migración 002 completada correctamente.');

    } catch (error) {
        await client.query('ROLLBACK');

        console.error(
            '❌ Error en migración 002:',
            error.message
        );

        process.exitCode = 1;

    } finally {
        client.release();
        await pool.end();
    }
}

migrate();