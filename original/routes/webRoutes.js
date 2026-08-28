const express = require('express');
const pool = require('../db/pool');

const router = express.Router();


// ============================================================
// PÁGINA PRINCIPAL
// ============================================================

router.get('/', async (req, res, next) => {

    try {

        const productosResult = await pool.query(`
            SELECT
                p.id,
                p.nombre,
                p.descripcion,
                p.imagen_url AS img,
                c.nombre AS categoria,
                p.subcategoria,
                p.slug
            FROM productos p
            JOIN categorias c
                ON p.categoria_id = c.id
            WHERE p.activo = true
            ORDER BY p.id
        `);


        const categoriasResult = await pool.query(`
            SELECT
                nombre,
                slug
            FROM categorias
            ORDER BY id
        `);


        res.render('index', {
            productos: productosResult.rows,
            categorias: categoriasResult.rows
        });

    } catch (error) {

        next(error);

    }

});


// ============================================================
// DETALLE DE PRODUCTO
// GET /producto/:slug
// ============================================================

router.get('/producto/:slug', async (req, res, next) => {

    try {

        const { slug } = req.params;


        // ------------------------------------------------------
        // Producto
        // ------------------------------------------------------

        const productoResult = await pool.query(`
            SELECT
                p.id,
                p.nombre,
                p.descripcion,
                p.imagen_url,
                p.subcategoria,
                p.slug,
                p.medidas_estructuradas,
                c.nombre AS categoria,
                c.slug AS categoria_slug
            FROM productos p
            JOIN categorias c
                ON p.categoria_id = c.id
            WHERE p.slug = $1
              AND p.activo = true
            LIMIT 1
        `, [slug]);


        // ------------------------------------------------------
        // Producto inexistente
        // ------------------------------------------------------

        if (productoResult.rows.length === 0) {

            return res.status(404).send(
                'Producto no encontrado'
            );

        }


        const producto = productoResult.rows[0];


        // ------------------------------------------------------
        // Colores / variantes
        // ------------------------------------------------------

        const coloresResult = await pool.query(`
            SELECT
                id,
                nombre,
                hex,
                imagen_url,
                orden
            FROM producto_colores
            WHERE producto_id = $1
            ORDER BY
                orden NULLS LAST,
                id
        `, [producto.id]);


        // ------------------------------------------------------
        // Productos similares
        // ------------------------------------------------------

        const relacionadosResult = await pool.query(`
            SELECT
                p.id,
                p.nombre,
                p.slug,
                p.imagen_url
            FROM productos p
            WHERE p.activo = true
              AND p.id != $1
            ORDER BY p.id
            LIMIT 8
        `, [producto.id]);


        // ------------------------------------------------------
        // Cargar catálogo de telas (todas las colecciones)
        // ------------------------------------------------------

        const fs = require('fs');
        const path = require('path');

        const catalogoTelasPath = path.join(
            __dirname,
            '../catalogo-colores.json'
        );

        const catalogoTelas = JSON.parse(
            fs.readFileSync(catalogoTelasPath, 'utf8')
        );


        // Pasamos TODAS las colecciones
        const colecciones =
            catalogoTelas.colecciones || [];


        // ------------------------------------------------------
        // Renderizar detalle
        // ------------------------------------------------------

        res.render('producto', {
            producto,
            colores: coloresResult.rows,
            relacionados: relacionadosResult.rows,
            colecciones
        });

    } catch (error) {

        next(error);

    }

});


// ============================================================
// CATEGORÍA: LISTA COMPLETA DE PRODUCTOS
// GET /categoria/:slug
// ============================================================

router.get('/categoria/:slug', async (req, res, next) => {

    try {

        const { slug } = req.params;


        // ------------------------------------------------------
        // Obtener categoría por slug
        // ------------------------------------------------------

        const categoriaResult = await pool.query(
            `
            SELECT
                id,
                nombre,
                slug
            FROM categorias
            WHERE slug = $1
            `,
            [slug]
        );


        // ------------------------------------------------------
        // Categoría inexistente
        // ------------------------------------------------------

        if (categoriaResult.rows.length === 0) {

            return res.status(404).send(
                'Categoría no encontrada'
            );

        }


        const categoria =
            categoriaResult.rows[0];


        // ------------------------------------------------------
        // Obtener todas las categorías
        // ------------------------------------------------------

        const categoriasResult = await pool.query(`
            SELECT
                nombre,
                slug
            FROM categorias
            ORDER BY id
        `);


        // ------------------------------------------------------
        // Obtener productos de la categoría
        // ------------------------------------------------------

        const productosResult = await pool.query(`
            SELECT
                p.id,
                p.nombre,
                p.descripcion,
                p.imagen_url AS img,
                p.slug AS product_slug
            FROM productos p
            WHERE p.categoria_id = $1
              AND p.activo = true
            ORDER BY p.id
        `, [categoria.id]);


        // ------------------------------------------------------
        // Renderizar vista
        // ------------------------------------------------------

        res.render('categoria', {
            categoria,
            categorias: categoriasResult.rows,
            productos: productosResult.rows
        });

    } catch (error) {

        next(error);

    }

});


module.exports = router;