const pool = require('../db/pool');

async function verColumnas() {
  try {
    const res = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'productos'
      ORDER BY ordinal_position;
    `);
    console.table(res.rows);
  } catch (error) {
    console.error("❌ Error consultando la base de datos:", error.message);
  } finally {
    pool.end();
  }
}

verColumnas();