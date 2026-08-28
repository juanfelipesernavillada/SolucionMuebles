require('dotenv').config();

const express = require('express');
const path = require('path');
const helmet = require('helmet');

const errorHandler = require('./middleware/errorHandler');

const webRoutes = require('./routes/webRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();


// ============================================================
// CONFIGURACIÓN
// ============================================================

app.set('view engine', 'ejs');

app.set(
    'views',
    path.join(__dirname, 'views')
);


// ============================================================
// SEGURIDAD
// ============================================================

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],

                scriptSrc: [
                    "'self'"
                ],
                styleSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://cdn.jsdelivr.net"
                ],

                imgSrc: [
                    "'self'",
                    "data:",
                    "https://images.unsplash.com",
                    "https://images.pexels.com"
                ],

                fontSrc: [
                    "'self'",
                    "https://cdn.jsdelivr.net"
                ],

                connectSrc: [
                    "'self'"
                ],

                objectSrc: [
                    "'none'"
                ],

                baseUri: [
                    "'self'"
                ],

                frameAncestors: [
                    "'self'"
                ]
            }
        }
    })
);


// ============================================================
// ARCHIVOS ESTÁTICOS
// ============================================================

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
);


// ============================================================
// PARSEO DE JSON
// ============================================================

app.use(
    express.json({
        limit: '10kb'
    })
);

// ============================================================
// HEALTH CHECK
// ============================================================

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok'
    });
});

// ============================================================
// RUTAS WEB
// ============================================================

app.use('/', webRoutes);


// ============================================================
// RUTAS API
// ============================================================

app.use('/api', apiRoutes);


// ============================================================
// MANEJO CENTRALIZADO DE ERRORES
// ============================================================

app.use(errorHandler);


// ============================================================
// SERVIDOR
// ============================================================

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(
            `Servidor corriendo en http://localhost:${PORT}`
        );
    });
}

module.exports = app;