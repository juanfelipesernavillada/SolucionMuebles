const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ============================================================
// CONFIGURACIÓN (Actualizada para Boreal)
// ============================================================

// Apuntamos a la nueva carpeta boreal
const SOURCE_DIR = path.join(__dirname, '../public/images/telas/boreal');
const WEBP_OPTIONS = { quality: 80 };

// Mapeamos los 9 archivos originales a sus nombres finales en WebP
const archivos = [
    { input: 'tela-01-original.png', output: 'tela-negro.webp' },
    { input: 'tela-02-original.png', output: 'tela-gris-oscuro.webp' },
    { input: 'tela-03-original.png', output: 'tela-gris-claro.webp' },
    { input: 'tela-04-original.png', output: 'tela-azul.webp' },
    { input: 'tela-05-original.png', output: 'tela-morado.webp' },
    { input: 'tela-06-original.png', output: 'tela-vino.webp' },
    { input: 'tela-07-original.png', output: 'tela-cafe.webp' },
    { input: 'tela-08-original.png', output: 'tela-beige.webp' },
    { input: 'tela-09-original.png', output: 'tela-rosa.webp' }
];

// ============================================================
// PROCESAMIENTO
// ============================================================

async function convertirTelas() {
    console.log('🔄 Convirtiendo imágenes de tela Boreal a WebP...\n');

    let procesadas = 0;
    let errores = 0;

    for (const archivo of archivos) {
        const inputPath = path.join(SOURCE_DIR, archivo.input);
        const outputPath = path.join(SOURCE_DIR, archivo.output);

        if (!fs.existsSync(inputPath)) {
            console.log(`❌ No se encontró: ${archivo.input}`);
            errores++;
            continue;
        }

        try {
            await sharp(inputPath)
                .webp(WEBP_OPTIONS)
                .toFile(outputPath);

            console.log(`✅ Convertido: ${archivo.input} → ${archivo.output}`);
            procesadas++;
        } catch (error) {
            console.log(`❌ Error convirtiendo ${archivo.input}:`, error.message);
            errores++;
        }
    }

    console.log(`\n📊 Resumen Boreal:`);
    console.log(`   ✅ Exitosas: ${procesadas}`);
    console.log(`   ❌ Errores: ${errores}`);
    console.log(`   📁 Archivos en: ${SOURCE_DIR}`);
}

convertirTelas();