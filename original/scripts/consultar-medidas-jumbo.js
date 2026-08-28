const pool = require('../db/pool');

async function main() {
    try {
        const result = await pool.query(
            `
            SELECT
                slug,
                nombre,
                medidas_estructuradas
            FROM productos
            WHERE slug = $1
            `,
            ['sala-click-clack-jumbo-completa']
        );

        console.dir(result.rows, { depth: null });
    } catch (error) {
        console.error(error);
    } finally {
        await pool.end();
    }
}

main();