const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INVENTARIO_PATH = path.join(__dirname, '../catalogo-maestro.json');
const ASSETS_DIR = path.join(__dirname, '../assets-source/productos');
const PUBLIC_DIR = path.join(__dirname, '../public/images/productos');

async function procesarCatalogo() {
    console.log('Iniciando procesamiento de imágenes a formato WebP...\n');

    const data = JSON.parse(
        fs.readFileSync(INVENTARIO_PATH, 'utf8')
    );

    if (!Array.isArray(data.productos)) {
        throw new Error('catalogo-maestro.json no contiene un arreglo productos válido.');
    }

    const productos = data.productos;

    let procesadas = 0;
    let errores = 0;

    for (const prod of productos) {
        const slug = prod.slug;

        const inputPath = path.join(
            ASSETS_DIR,
            slug,
            'original.png'
        );

        const outputDir = path.join(
            PUBLIC_DIR,
            slug
        );

        const outputPath = path.join(
            outputDir,
            'principal.webp'
        );

        if (!fs.existsSync(inputPath)) {
            console.error(`❌ FALTA ORIGINAL: ${slug}`);
            errores++;
            continue;
        }

        fs.mkdirSync(outputDir, {
            recursive: true
        });

        try {
            await sharp(inputPath)
                .webp({
                    quality: 80
                })
                .toFile(outputPath);

            console.log(
                `✅ PROCESADA: ${slug} -> principal.webp`
            );

            procesadas++;

        } catch (error) {
            console.error(
                `❌ ERROR procesando ${slug}:`,
                error.message
            );

            errores++;
        }
    }

    console.log('\n--- Resumen de Procesamiento ---');
    console.log(
        `Imágenes convertidas exitosamente: ${procesadas}/${productos.length}`
    );

    if (errores > 0) {
        console.log(
            `Errores encontrados: ${errores}`
        );
    }

    console.log('--------------------------------');

    if (errores > 0) {
        process.exitCode = 1;
    }
}

procesarCatalogo().catch(error => {
    console.error('\n❌ Error fatal:', error.message);
    process.exitCode = 1;
});