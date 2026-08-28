const express = require('express');
const { rateLimit } = require('express-rate-limit');

const {
    body,
    param,
    query,
    validationResult
} = require('express-validator');

const router = express.Router();


// ============================================================
// RATE LIMITING — PRUEBA TEMPORAL
// ============================================================

const testRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        error: 'Demasiadas solicitudes. Intenta nuevamente más tarde.'
    }
});


// ============================================================
// RUTA TEMPORAL — PRUEBA DE VALIDACIÓN
// ============================================================

router.post(
    '/prueba-validacion/:id',

    testRateLimiter,

    [
        param('id')
            .isInt({ min: 1 })
            .withMessage(
                'El id debe ser un entero positivo.'
            ),

        body('nombre')
            .isString()
            .isLength({ min: 2, max: 100 })
            .withMessage(
                'El nombre debe tener entre 2 y 100 caracteres.'
            ),

        body('cantidad')
            .isInt({ min: 1, max: 10 })
            .withMessage(
                'La cantidad debe ser un entero entre 1 y 10.'
            ),

        query('modo')
            .optional()
            .isIn(['normal', 'urgente'])
            .withMessage(
                'El modo debe ser normal o urgente.'
            )
    ],

    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        res.status(200).json({
            mensaje: 'Datos válidos.',
            datos: {
                id: req.params.id,
                nombre: req.body.nombre,
                cantidad: req.body.cantidad,
                modo: req.query.modo || 'normal'
            }
        });
    }
);


// ============================================================
// EXPORTAR ROUTER
// ============================================================

module.exports = router;